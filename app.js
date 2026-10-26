'use strict';
const Q=(q,a,c,e)=>({q,a,c,e});
const worlds=[
{id:'empyrean',title:'El cuadrante',tag:'EMPÍREO',icon:'♜',desc:'Dragones, vínculos y una pregunta que va a doler. Spoilers de Alas de sangre y Alas de hierro.',questions:[
Q('¿Quién escribió la saga Empíreo?',['Holly Black','Rebecca Yarros','Suzanne Collins'],1,'Rebecca Yarros es la autora de Alas de sangre y Alas de hierro.'),
Q('¿Cómo se llama la protagonista?',['Violet Sorrengail','Jude Duarte','Katniss Everdeen'],0,'Violet Sorrengail entra al Cuadrante de Jinetes en Basgiath.'),
Q('Un jinete sin su dragón está muerto. ¿Qué representa un dragón sin su jinete?',['Una tragedia','Una coronación','Una fiesta'],0,'La idea del lema es esa asimetría: el jinete depende de su dragón para sobrevivir. La redacción cambia según la traducción.'),
Q('¿Quién se despide con «Fue un honor»?',['Dain','Liam','Jack'],1,'Liam. Sí, vinimos a celebrar tu cumple y también a sufrir un poquito. La formulación exacta puede variar entre ediciones.'),
Q('¿Cuáles son los dos dragones vinculados a Violet?',['Tairn y Andarna','Sgaeyl y Deigh','Codagh y Tairn'],0,'Tairn y Andarna: dos vínculos para una protagonista extraordinaria.'),
Q('¿Qué libro sigue a Alas de sangre?',['Alas de hierro','La reina de nada','El rey malvado'],0,'Alas de hierro continúa la historia de Violet. Un buen momento para respirar antes de seguir leyendo.') ]},
{id:'elfhame',title:'La corte feérica',tag:'LOS HABITANTES DEL AIRE',icon:'♛',desc:'Intriga, coronas y el talento de Jude para no quedarse quieta.',questions:[
Q('¿Quién escribió El príncipe cruel?',['Rebecca Yarros','Holly Black','Leigh Bardugo'],1,'Holly Black creó el mundo de Los habitantes del aire.'),
Q('¿Cómo se llama la protagonista humana?',['Jude Duarte','Violet Sorrengail','Andarna'],0,'Jude Duarte, una humana que busca su lugar y poder en el mundo feérico.'),
Q('¿Qué príncipe está en el centro de la historia de Jude?',['Cardan','Peeta','Xaden'],0,'Cardan es el príncipe feérico de El príncipe cruel.'),
Q('¿Cuál es el orden de la trilogía principal?',['El príncipe cruel → El rey malvado → La reina de nada','La reina de nada → El príncipe cruel → El rey malvado','El rey malvado → La reina de nada → El príncipe cruel'],0,'La trilogía principal sigue ese orden. Hay otros libros relacionados con Elfhame.'),
Q('¿Qué puede hacer Jude que los feéricos no pueden hacer directamente?',['Mentir','Escuchar','Leer'],0,'Los feéricos no pueden mentir directamente, aunque son expertos en engañar con verdades y ambigüedades.') ]},
{id:'bio',title:'El gabinete vivo',tag:'BIOLÓGICO',icon:'⚘',desc:'Huesos, músculos, órganos y hongos. El universo también está adentro tuyo.',questions:[
Q('¿Cuál es el hueso más largo del cuerpo humano?',['Húmero','Fémur','Radio'],1,'El fémur está en el muslo y participa en el soporte del peso corporal.'),
Q('Al flexionar el codo, ¿qué músculo actúa como agonista habitual?',['Bíceps braquial','Tríceps braquial','Glúteo mayor'],0,'El bíceps contribuye a la flexión del codo; el braquial también es un flexor importante.'),
Q('¿Qué músculo es el principal motor de la inspiración tranquila?',['Diafragma','Masetero','Bíceps'],0,'Al contraerse, el diafragma desciende y aumenta el volumen de la cavidad torácica.'),
Q('¿Dónde se inicia la digestión del almidón por una enzima?',['En la boca','En el intestino grueso','En los riñones'],0,'La amilasa salival empieza a degradar el almidón en la boca.'),
Q('¿Cuál de estas sustancias es una enzima digestiva?',['Insulina','Pepsina','Bilis'],1,'La pepsina participa en la digestión de proteínas en el estómago. La insulina es una hormona y la bilis no es una enzima.'),
Q('¿Qué órgano produce bilis?',['Hígado','Vesícula biliar','Bazo'],0,'El hígado produce bilis; la vesícula biliar la almacena y concentra.'),
Q('¿Cuál es la unidad funcional del riñón?',['Neurona','Nefrona','Alvéolo'],1,'La nefrona filtra el plasma y modifica el filtrado mediante reabsorción y secreción para formar orina.'),
Q('¿Cómo obtienen nutrientes los hongos?',['Por fotosíntesis','Por digestión externa y absorción','Todos cazan animales'],1,'Los hongos son heterótrofos: secretan enzimas y absorben nutrientes. No todos son descomponedores; también hay parásitos y mutualistas.'),
Q('¿Qué componente caracteriza la pared celular de los hongos?',['Quitina','Hemoglobina','Glucógeno exclusivamente'],0,'La pared fúngica contiene quitina y otros componentes, como glucanos.'),
Q('¿Dónde se clasifican los hongos?',['En el reino Animalia','En el reino Fungi','Son todos plantas'],1,'Fungi es un reino propio. Animalia agrupa a los animales; no hay varios «reinos animales» en esta clasificación.'),
Q('¿Dónde ocurre principalmente el intercambio gaseoso en los pulmones?',['Alvéolos','Tráquea','Laringe'],0,'Los gases difunden entre los alvéolos y los capilares a través de una barrera muy delgada.'),
Q('¿Qué enzima descompone el peróxido de hidrógeno en agua y oxígeno?',['Catalasa','Lactasa','Amilasa'],0,'La catalasa ayuda a proteger las células frente al peróxido de hidrógeno.') ]},
{id:'poets',title:'La sociedad secreta',tag:'CARPE DIEM',icon:'✒',desc:'Poesía, otra perspectiva y el valor de encontrar tu propia voz.',questions:[
Q('¿Cómo se llama el profesor interpretado por Robin Williams?',['John Keating','John Tolkien','Neil Perry'],0,'John Keating invita a sus alumnos a pensar por sí mismos.'),
Q('¿Qué significa «Carpe diem»?',['Aprovechá el día','Esperá al lunes','No leas poesía'],0,'Aprovechá el día. Hoy, especialmente, el tuyo.'),
Q('¿Para qué propone Keating subirse al escritorio?',['Para cambiar de perspectiva','Para medir la altura','Para evitar un examen'],0,'Para recordar que podemos mirar las cosas desde una perspectiva distinta.'),
Q('¿Quién escribió el poema «¡Oh, capitán! ¡Mi capitán!»?',['Walt Whitman','Pablo Neruda','John Keats'],0,'Walt Whitman. El poema aparece como referencia central en la película.') ]}
];
const $=s=>document.querySelector(s);let completed=new Set();try{completed=new Set(JSON.parse(localStorage.getItem('toty-worlds')||'[]'))}catch{}
function render(){ $('#worlds').replaceChildren();worlds.forEach(w=>{const b=document.createElement('button');b.className='world';b.innerHTML=`<small>${w.tag}</small><span class="icon" aria-hidden="true">${w.icon}</span><h3>${w.title}</h3><p>${w.desc}</p><span class="enter">${completed.has(w.id)?'✓ Volver a explorar':'Entrar al mundo ↗'} · ${w.questions.length} preguntas</span>`;b.onclick=()=>start(w);$('#worlds').append(b)});$('#progress').textContent=`${worlds.filter(w=>completed.has(w.id)).length} de 4 mundos explorados`}
let active,index,score,answered;
function start(w){active=w;index=0;score=0;$('#quiztag').textContent=w.tag;$('#quiz').showModal();question()}
function question(){answered=false;const q=active.questions[index];$('#quizcontent').innerHTML=`<p class="muted">Pregunta ${index+1} de ${active.questions.length} · ${score} aciertos</p><h3 tabindex="-1">${q.q}</h3><div class="answers"></div><p id="feedback" role="status"></p><button id="next" class="button" hidden>Siguiente ↗</button>`;q.a.forEach((a,i)=>{const b=document.createElement('button');b.textContent=a;b.onclick=()=>answer(i);$('.answers').append(b)});$('#next').onclick=()=>{index++;index<active.questions.length?question():finish()};$('#quizcontent h3').focus()}
function answer(i){if(answered)return;answered=true;const q=active.questions[index];const correct=i===q.c;if(correct)score++;[...$('.answers').children].forEach((b,j)=>{b.disabled=true;if(j===q.c)b.classList.add('correct');else if(j===i)b.classList.add('wrong')});$('#feedback').textContent=(correct?'✦ Exacto. ':'Casi. ')+q.e;$('#next').hidden=false;$('#next').focus()}
function finish(){completed.add(active.id);try{localStorage.setItem('toty-worlds',JSON.stringify([...completed]))}catch{}render();$('#quizcontent').innerHTML=`<h3>Un mundo más en tu historia.</h3><p>Acertaste ${score} de ${active.questions.length}.</p><p class="muted">${score===active.questions.length?'Impecable. El altar queda oficialmente justificado.':'Los mejores personajes tampoco lo saben todo. Lo importante es seguir explorando.'}</p><button class="button" id="retry">Volver a jugar</button><button id="done">Volver a la biblioteca</button>`;$('#retry').onclick=()=>{index=0;score=0;question()};$('#done').onclick=()=>$('#quiz').close()}
$('#close').onclick=()=>$('#quiz').close();$('#desk').onclick=()=>{$('#poem').textContent='Que nunca te falten historias que te conmuevan, amigas que te escuchen y el valor de escribir tu propia vida. Carpe diem, Toty. ✦';$('#desk').textContent='Una perspectiva nueva ✓'};
$('#letter').onclick=()=>{const open=$('#letterbody').hidden;$('#letterbody').hidden=!open;$('#letter').setAttribute('aria-expanded',String(open));if(open)$('#letterbody').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'})};
let objectURL=null;const audio=$('#audio');audio.volume=0.45;$('#music').onclick=async()=>{if(!audio.src){$('#audiofile').click();return}if(audio.paused){try{await audio.play();$('#music').textContent='Ⅱ Pausar'}catch{$('#music').textContent='♫ Elegir MP3';$('#audiofile').click()}}else{audio.pause();$('#music').textContent='♫ Música'}};
$('#audiofile').onchange=async e=>{const file=e.target.files[0];if(!file)return;if(objectURL)URL.revokeObjectURL(objectURL);objectURL=URL.createObjectURL(file);audio.src=objectURL;try{await audio.play();$('#music').textContent='Ⅱ Pausar'}catch{$('#music').textContent='♫ No se pudo reproducir'}};
// Pista incorporada; se reproduce cuando se toca Música.
audio.src = 'assets/birds-of-a-feather.mp3';
render();
