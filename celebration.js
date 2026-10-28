'use strict';
(() => {
  let stopCurrent = null;
  const colors = ['#c2a04f','#759a72','#e79a9b','#a9a0d4','#7dbcc3','#e9c15d','#f3d8b5','#f0a87e'];
  function start() {
    if (stopCurrent) stopCurrent();
    const canvas = document.createElement('canvas');
    canvas.className = 'toty-celebration';
    canvas.setAttribute('aria-hidden','true');
    document.body.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    if (!ctx) { canvas.remove(); return; }
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const compact = window.innerWidth < 700;
    const duration = reduced ? 1800 : 24000;
    const confetti = [], sparks = [], rockets = [];
    let w, h, frame, stopped = false, startAt = performance.now(), last = startAt;
    let lastRain = 0, lastLaunch = -1000;
    const random = (a,b) => a + Math.random() * (b-a);
    const color = () => colors[Math.floor(Math.random()*colors.length)];
    function resize() {
      w = window.innerWidth; h = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(w*dpr); canvas.height = Math.round(h*dpr);
      ctx.setTransform(dpr,0,0,dpr,0,0);
    }
    resize();
    function addPaper(count, launch) {
      for (let i=0;i<count;i++) {
        const left = i%2===0;
        confetti.push({
          x:launch?(left?-12:w+12):random(0,w),
          y:launch?random(h*.25,h*.8):random(-h*.7,-10),
          vx:launch?(left?1:-1)*random(3,12):random(-1.5,1.5),
          vy:launch?random(-12,-3):random(1,4),
          rot:random(0,Math.PI*2), spin:random(-.12,.12),
          sway:random(0,6.28), size:random(4,10), c:color(), shape:i%3
        });
      }
    }
    function burst(x,y,count=85) {
      const base=color();
      for(let i=0;i<count;i++) {
        const a=(i/count)*Math.PI*2, speed=random(1.6,6);
        sparks.push({x,y,px:x,py:y,vx:Math.cos(a)*speed,vy:Math.sin(a)*speed,
          life:random(52,90),max:90,c:i%5===0?color():base,size:random(1,2.2)});
      }
    }
    function launch() {
      rockets.push({x:random(w*.08,w*.92),y:h+10,target:random(h*.08,h*.43),
        vy:random(-16,-11),c:color()});
    }
    function stop() {
      if(stopped)return;
      stopped=true;cancelAnimationFrame(frame);canvas.remove();
      window.removeEventListener('resize',resize);
      document.removeEventListener('visibilitychange',visibility);
      stopCurrent=null;
    }
    function visibility() { if(document.hidden)stop(); }
    if(reduced) {
      for(let i=0;i<100;i++) {
        ctx.fillStyle=color();ctx.globalAlpha=.8;
        ctx.fillRect(random(0,w),random(0,h),random(3,7),random(3,9));
      }
      window.setTimeout(stop,duration);
      stopCurrent=stop;return;
    }
    addPaper(compact?700:1200,false);
    addPaper(compact?180:360,true);
    for(let i=0;i<7;i++)burst(random(w*.08,w*.92),random(h*.08,h*.45),compact?55:85);
    function draw(now) {
      const elapsed=now-startAt,dt=Math.min((now-last)/16.667,2);
      last=now;
      if(elapsed>=duration){stop();return;}
      ctx.clearRect(0,0,w,h);
      const fade=Math.min(1,(duration-elapsed)/1800);
      if(elapsed<11000&&elapsed-lastRain>220){addPaper(compact?12:24,false);lastRain=elapsed;}
      if(elapsed<19000&&elapsed-lastLaunch>360){launch();launch();lastLaunch=elapsed;}
      for(let i=confetti.length-1;i>=0;i--){
        const p=confetti[i];p.vy+=.038*dt;p.vx*=Math.pow(.988,dt);
        p.sway+=.05*dt;p.x+=(p.vx+Math.sin(p.sway)*.6)*dt;p.y+=p.vy*dt;p.rot+=p.spin*dt;
        if(p.y>h+30||p.x< -80||p.x>w+80){confetti.splice(i,1);continue;}
        ctx.save();ctx.translate(p.x,p.y);ctx.rotate(p.rot);
        ctx.globalAlpha=.92*fade;ctx.fillStyle=p.c;
        const flip=Math.cos(p.sway);
        if(p.shape===0){ctx.beginPath();ctx.ellipse(0,0,p.size*.45,Math.max(.6,p.size*.45*Math.abs(flip)),0,0,6.283);ctx.fill();}
        else{ctx.fillRect(-p.size*.4,-p.size*.6,p.size*.8,Math.max(1,p.size*(p.shape===1?1.4:2.4)*Math.abs(flip)));}
        ctx.restore();
      }
      for(let i=rockets.length-1;i>=0;i--){
        const r=rockets[i];r.y+=r.vy*dt;r.vy+=.055*dt;
        ctx.globalAlpha=.8*fade;ctx.strokeStyle=r.c;ctx.lineWidth=1.8;
        ctx.beginPath();ctx.moveTo(r.x,r.y+25);ctx.lineTo(r.x,r.y);ctx.stroke();
        if(r.y<=r.target){burst(r.x,r.y,compact?65:95);rockets.splice(i,1);}
      }
      for(let i=sparks.length-1;i>=0;i--){
        const s=sparks[i];s.px=s.x;s.py=s.y;s.vx*=Math.pow(.978,dt);s.vy=s.vy*Math.pow(.978,dt)+.026*dt;
        s.x+=s.vx*dt;s.y+=s.vy*dt;s.life-=dt;
        if(s.life<=0){sparks.splice(i,1);continue;}
        ctx.globalAlpha=Math.min(1,s.life/35)*fade;ctx.strokeStyle=s.c;ctx.lineWidth=s.size;
        ctx.beginPath();ctx.moveTo(s.px,s.py);ctx.lineTo(s.x,s.y);ctx.stroke();
      }
      ctx.globalAlpha=1;frame=requestAnimationFrame(draw);
    }
    window.addEventListener('resize',resize);
    document.addEventListener('visibilitychange',visibility);
    stopCurrent=stop;
    frame=requestAnimationFrame(draw);
  }
  window.TotyCelebration={start,stop:()=>{if(stopCurrent)stopCurrent();}};
})();
