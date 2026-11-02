// Edit your projects here
const projects=[
 {cat:"Local AI",title:"Journal Analyzer",desc:"Offline journal analysis web app. Flask and Ollama run local LLMs, so entries never leave the machine.",tags:["Flask","Ollama","Python"],c:["#4b2fd1","#1a1060"]},
 {cat:"Full-stack",title:"Flutter Todo App",desc:"Task manager with a Supabase backend, Google sign-in, and Row Level Security so users only see their own data.",tags:["Flutter","Supabase","OAuth"],c:["#6d3df0","#2a1a8f"]},
 {cat:"Data tooling",title:"Past Paper Analyzer",desc:"Reads 54 Islamiyat past-paper PDFs, extracts questions with an LLM API, and counts repeated questions and hadith with pandas.",tags:["Python","pandas","LLM API"],c:["#3c2db8","#140d3b"]},
 {cat:"ML & statistics",title:"Tennis Predictor",desc:"Shot-type win probabilities and a playstyle-based matchup predictor for tennis.",tags:["Python","Statistics","ML"],c:["#7c4dff","#2b1c85"]},
 {cat:"Embedded",title:"ESP32 Smart Door",desc:"An ESP32-C3 device that pauses and resumes media when a reed switch detects the door opening.",tags:["ESP32-C3","C/C++","Sensors"],c:["#5434d6","#1b1163"]},
 {cat:"Imaging",title:"Astrophotography Pipeline",desc:"Automated imaging pipelines driven by an ESP32, built for Lahore's light-polluted skies.",tags:["ESP32","Automation","Imaging"],c:["#4126b8","#0f0830"]}
];
const g=document.getElementById('grid');
projects.forEach(p=>{
 const a=document.createElement('article');a.className='card';
 a.innerHTML=`<div class="thumb" style="background:linear-gradient(135deg,${p.c[0]},${p.c[1]})">${p.title.split(' ').map(w=>w[0]).join('').slice(0,2)}</div>
 <div class="txt"><small>${p.cat}</small><h3>${p.title}</h3><p>${p.desc}</p><div class="tags">${p.tags.map(t=>`<span>${t}</span>`).join('')}</div></div>`;
 g.appendChild(a);
});

// header, back-to-top
const hd=document.getElementById('hd'),toTop=document.getElementById('top');
addEventListener('scroll',()=>{hd.classList.toggle('solid',scrollY>40);toTop.classList.toggle('show',scrollY>600)},{passive:true});
toTop.onclick=()=>scrollTo({top:0});

// mobile menu
const nav=document.getElementById('nav'),menu=document.getElementById('menu');
menu.onclick=()=>{const o=nav.classList.toggle('open');menu.setAttribute('aria-expanded',o)};
nav.querySelectorAll('ul a').forEach(a=>a.onclick=()=>nav.classList.remove('open'));

// stat counters
const io=new IntersectionObserver(es=>es.forEach(e=>{
 if(!e.isIntersecting)return;io.unobserve(e.target);
 const n=+e.target.dataset.n;let i=0;
 const t=setInterval(()=>{e.target.textContent=++i;if(i>=n)clearInterval(t)},600/n);
}),{threshold:.6});
document.querySelectorAll('[data-n]').forEach(el=>io.observe(el));

// hero background: drifting node network
const cv=document.getElementById('bg'),cx=cv.getContext('2d');let pts=[];
function size(){cv.width=cv.offsetWidth;cv.height=cv.offsetHeight;
 pts=Array.from({length:Math.min(60,cv.width/25)},()=>({x:Math.random()*cv.width,y:Math.random()*cv.height,vx:(Math.random()-.5)*.3,vy:(Math.random()-.5)*.3}))}
function draw(){
 cx.clearRect(0,0,cv.width,cv.height);
 pts.forEach(p=>{p.x=(p.x+p.vx+cv.width)%cv.width;p.y=(p.y+p.vy+cv.height)%cv.height;
  cx.fillStyle='#9b7bff';cx.beginPath();cx.arc(p.x,p.y,2,0,7);cx.fill()});
 for(let i=0;i<pts.length;i++)for(let j=i+1;j<pts.length;j++){
  const d=Math.hypot(pts[i].x-pts[j].x,pts[i].y-pts[j].y);
  if(d<140){cx.strokeStyle=`rgba(155,123,255,${.35*(1-d/140)})`;cx.beginPath();cx.moveTo(pts[i].x,pts[i].y);cx.lineTo(pts[j].x,pts[j].y);cx.stroke()}}
 requestAnimationFrame(draw);
}
size();addEventListener('resize',size);
if(!matchMedia('(prefers-reduced-motion: reduce)').matches)draw();
