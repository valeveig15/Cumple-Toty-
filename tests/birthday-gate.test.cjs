'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const { OPEN_AT, getCountdown } = require('../birthday-gate.js');

// Uruguay's midnight is 03:00 UTC, independent of a visitor's timezone.
assert.equal(new Date(OPEN_AT).toISOString(), '2026-10-30T03:00:00.000Z');
assert.equal(getCountdown(Date.parse('2026-10-30T02:59:59.999Z')).ready, false);
assert.equal(getCountdown(OPEN_AT - 1).milliseconds, 1);
assert.equal(getCountdown(OPEN_AT - 1).seconds, 0);
assert.equal(getCountdown(OPEN_AT - 86400000 * 2).hours, 48);
assert.equal(getCountdown(OPEN_AT - 1234).milliseconds, 234);
assert.deepEqual(getCountdown(OPEN_AT), { hours: 0, minutes: 0, seconds: 0, milliseconds: 0, ready: true });
assert.deepEqual(getCountdown(OPEN_AT + 86400000), getCountdown(OPEN_AT));
assert.deepEqual(getCountdown(OPEN_AT - 90061000), { hours: 25, minutes: 1, seconds: 1, milliseconds: 0, ready: false });

function browserAt(startTime) {
  let now = startTime;
  let interval;
  let initialized = 0;
  let scrolls = 0;
  const events = {};
  const nodes = Object.fromEntries(['birthday-gate','gift-root','birthday-gift','count-hours','count-minutes','count-seconds','count-milliseconds'].map(id => [id, { hidden: id === 'gift-root', textContent: '' }]));
  nodes['gift-root'].appendChild = () => initialized++;
  nodes['gift-root'].querySelector = () => ({ setAttribute() {}, focus() {} });
  nodes['birthday-gift'].content = { cloneNode: () => ({}) };
  nodes['birthday-gift'].remove = () => {};
  const scripts = [];
  const document = {
    getElementById: id => nodes[id], hidden: false,
    body: { classList: { remove() {} }, appendChild: script => scripts.push(script) },
    createElement: () => ({}),
    addEventListener: (type, cb) => events[type] = cb
  };
  const window = { addEventListener: (type, cb) => events[type] = cb, scrollTo: () => scrolls++ };
  vm.runInNewContext(fs.readFileSync(require.resolve('../birthday-gate.js'), 'utf8'), {
    document, window, Date: class extends Date { static now() { return now; } },
    setInterval: cb => { interval = cb; return 1; }, clearInterval: () => { interval = null; }
  });
  return { nodes, scripts, events, document, setNow: value => { now = value; }, tick: () => interval?.(), initialized: () => initialized, scrolls: () => scrolls };
}
const before = browserAt(OPEN_AT - 1000);
assert.equal(before.nodes['gift-root'].hidden, true);
assert.equal(before.nodes['birthday-gate'].hidden, false);
assert.equal(before.scripts.length, 0, 'Do not initialize quizzes or music early');
assert.equal(before.nodes['count-milliseconds'].textContent, '000');
before.setNow(OPEN_AT - 7);
before.tick();
assert.equal(before.nodes['count-milliseconds'].textContent, '007');
assert.equal(before.nodes['gift-root'].hidden, true);
before.setNow(OPEN_AT);
before.tick();
assert.equal(before.nodes['gift-root'].hidden, false);
assert.equal(before.nodes['birthday-gate'].hidden, true);
assert.equal(before.scripts[0].src, 'app.js');
assert.equal(before.scripts[1].src, 'celebration.js', 'Opening loads the celebration');
assert.equal(before.initialized(), 1);
before.events.pageshow();
before.events.visibilitychange();
assert.equal(before.initialized(), 1, 'Opening is idempotent');
const after = browserAt(OPEN_AT + 1000);
assert.equal(after.scripts.length, 2, 'Arriving after midnight loads gift and celebration');
const asleep = browserAt(OPEN_AT - 5000);
asleep.setNow(OPEN_AT + 600000);
asleep.events.visibilitychange();
assert.equal(asleep.nodes['gift-root'].hidden, false, 'Returning to a suspended tab rechecks time');
console.log('Cuenta regresiva: límites de medianoche, apertura única y pestaña suspendida OK.');
