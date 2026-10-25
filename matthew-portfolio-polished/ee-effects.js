
(()=>{
const get=id=>document.getElementById(id), reduced=matchMedia('(prefers-reduced-motion: reduce)');
let calm=reduced.matches;document.body.classList.toggle('calm-mode',calm);reduced.addEventListener('change',e=>{calm=e.matches;document.body.classList.toggle('calm-mode',calm)});
const progress=get('reading-progress');let scrollQueued=false;
function updateProgress(){const max=document.documentElement.scrollHeight-innerHeight;progress.style.transform='scaleX('+(max>0?scrollY/max:0)+')';scrollQueued=false}
addEventListener('scroll',()=>{if(!scrollQueued){scrollQueued=true;requestAnimationFrame(updateProgress)}},{passive:true});addEventListener('resize',updateProgress);updateProgress();
const sections=[...document.querySelectorAll('main>section[id]')];if('IntersectionObserver'in window){const navObserver=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting)document.querySelectorAll('.desktop-nav a').forEach(link=>{const active=link.hash==='#'+e.target.id;link.classList.toggle('nav-active',active);if(active)link.setAttribute('aria-current','location');else link.removeAttribute('aria-current')})})},{rootMargin:'-15% 0px -55% 0px'});sections.forEach(s=>navObserver.observe(s))}
document.querySelectorAll('.primary,.secondary,.activity-filter').forEach(button=>button.addEventListener('pointerdown',e=>{if(calm)return;const r=button.getBoundingClientRect(),spark=document.createElement('span');spark.className='tap-spark';spark.style.left=e.clientX-r.left+'px';spark.style.top=e.clientY-r.top+'px';button.append(spark);spark.addEventListener('animationend',()=>spark.remove(),{once:true})}));
})();

document.querySelectorAll('.year-timeline .milestone').forEach(milestone=>{
const dot=milestone.querySelector('.milestone-dot');let pinned=false;
const sync=()=>milestone.classList.toggle('is-highlighted',pinned||dot.matches(':hover')||dot===document.activeElement);
dot.addEventListener('pointerenter',sync);dot.addEventListener('pointerleave',sync);dot.addEventListener('focus',sync);dot.addEventListener('blur',sync);
dot.addEventListener('click',()=>{pinned=!pinned;dot.setAttribute('aria-pressed',String(pinned));sync()});
dot.addEventListener('keydown',e=>{if(e.key==='Escape'){pinned=false;dot.setAttribute('aria-pressed','false');dot.blur();sync()}});
});
