
const songs=[
{title:'Night Drive',artist:'Sargam',src:''},
{title:'Dream Echo',artist:'Studio',src:''},
{title:'Moonlight',artist:'Player',src:''}
];
let index=0,repeat=false;
const a=audio;

function load(){
title.textContent=songs[index].title;
artist.textContent=songs[index].artist;
a.src=songs[index].src;
draw(search.value||'');
}
function togglePlay(){
if(a.paused){a.play().catch(()=>{});playBtn.textContent='⏸'}
else{a.pause();playBtn.textContent='▶'}
}
function next(){index=(index+1)%songs.length;load();if(autoplay.checked)a.play().catch(()=>{})}
function prev(){index=(index+songs.length-1)%songs.length;load()}
function shuffle(){index=Math.floor(Math.random()*songs.length);load()}
function toggleRepeat(){repeat=!repeat}
function toggleTheme(){document.body.classList.toggle('light')}
a.onended=()=>repeat?a.play():autoplay.checked&&next();

volume.oninput=e=>a.volume=e.target.value;
a.ontimeupdate=()=>{
progress.value=(a.currentTime/(a.duration||1))*100;
current.textContent=f(a.currentTime);
duration.textContent=f(a.duration||0);
}
progress.oninput=e=>a.currentTime=(e.target.value/100)*(a.duration||0);

function f(s){return `${Math.floor(s/60)}:${String(Math.floor(s%60)).padStart(2,'0')}`}

function draw(q=''){
playlist.innerHTML='';
songs.filter(s=>s.title.toLowerCase().includes(q.toLowerCase()))
.forEach((s,i)=>{
const d=document.createElement('div');
d.className='song';
d.textContent=`${s.title} • ${s.artist}`;
d.onclick=()=>{index=i;load()};
playlist.appendChild(d);
});
}
search.oninput=e=>draw(e.target.value);
load();
