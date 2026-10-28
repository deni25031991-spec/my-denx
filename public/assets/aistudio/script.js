(function(){
/* GANTI tautan di bawah dengan milik Anda */
var CFG={email:'mailto:emailanda@contoh.id',wa:'https://wa.me/6200000000000',yt:'https://www.youtube.com/@namaanda'};
var VERSES=['Mazmur 23:1','Yohanes 3:16','Filipi 4:13','Amsal 3:5','Yosua 1:9','Matius 11:28'];
var SEC=[
 {t:[0,.08],go:0,n:'Beranda',pages:['Selamat datang di jalan merpati! Gulir ke bawah tiang untuk mengenal saya, proyek saya, dan cara menghubungi saya.','Pssst — burung-burungnya jadi gugup kalau kursor Anda mendekat.']},
 {t:[.08,.24],go:.16,n:'Tentang',pages:['Halo, saya Deni Angga Raja, S.Pd.K.! Guru PAK dan Budi Pekerti di SDN Kejuron.','Saya suka membuat media belajar yang bisa dimainkan siswa.']},
 {t:[.24,.44],go:.34,n:'Proyek',pages:['Klik papan nama jalan untuk membuka proyek saya.','Jurnal Alkitab 360 Hari — simulasi media interaktif untuk mengisi jurnal dan menyusun cerita.','Game tanah liat — prototipe game PAK, terinspirasi Claybound.','RPP DEEP PAK — rencana pembelajaran PAK.']},
 {t:[.44,.62],go:.53,n:'Pengalaman',pages:['Sehari-hari saya mengajar PAK, membuat media interaktif, dan merancang game edukasi.']},
 {t:[.62,.80],go:.71,n:'Mampir',pages:['Mampir sebentar! Tekan tombol merah untuk ayat hari ini.','Klik teleponnya, merpatinya lagi menelepon.']},
 {t:[.80,.95],go:.88,n:'Kontak',pages:['Klik papan Email, WhatsApp, atau YouTube untuk menyapa saya.','Main ular di layar hijau: ketuk layar atau tekan W, A, S, D.']},
 {t:[.95,1.01],go:1,n:'Akhir',pages:['Itu ujung jalannya! Terima kasih sudah mampir.']}
];
var api={},reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;
var bub=document.getElementById('bub'),txt=document.getElementById('txt'),dots=document.getElementById('dots'),next=document.getElementById('next');
var menu=document.getElementById('menu'),hb=document.getElementById('hb'),snd=document.getElementById('snd'),bk=document.getElementById('bk'),mas=document.getElementById('mas');
var si=-1,pg=0,target=0,cur=0,closed=false,tw=null;
function maxS(){return Math.max(1,document.documentElement.scrollHeight-innerHeight)}
function go(t){scrollTo({top:t*maxS(),behavior:reduce?'auto':'smooth'})}
function say(t){clearInterval(tw);txt.textContent='';var sr=document.createElement('span');sr.className='sr';sr.textContent=t;txt.appendChild(sr);if(reduce){var p=document.createElement('span');p.textContent=t;p.setAttribute('aria-hidden','true');txt.appendChild(p);return}
 var w=document.createElement('span');w.setAttribute('aria-hidden','true');var g=document.createElement('span'),h=document.createElement('span');h.className='h';h.textContent=t;w.appendChild(g);w.appendChild(h);txt.appendChild(w);var n=0;
 tw=setInterval(function(){n++;g.textContent=t.slice(0,n);h.textContent=t.slice(n);if(n>=t.length)clearInterval(tw)},22)}
function applyClosed(){bub.style.display=closed?'none':''}
function show(){var s=SEC[si],last=pg>=s.pages.length-1;say(s.pages[pg]);
 dots.innerHTML=s.pages.length>1?s.pages.map(function(_,i){return '<b class="'+(i===pg?'on':'')+'"></b>'}).join(''):'';
 next.textContent=!last?'LANJUT ▸':(si===0?'TUTUP ✕':(si<SEC.length-1?'GULIR ▾':'KE AWAL ▴'));
 if(si===2&&pg>=1){if(api.card)api.card(pg-1)}else if(api.hide)api.hide()}
function step(d){if(si!==2)return;pg=((Math.max(pg,1)-1+d+3)%3)+1;show()}
function openProj(i){if(si!==2){go(SEC[2].go);return}pg=i+1;show()}
function setSec(t){var n=0;SEC.forEach(function(s,i){if(t>=s.t[0])n=i});
 if(n!==si){si=n;pg=0;mas.classList.toggle('hand',n===0);show();bub.classList.remove('pop');requestAnimationFrame(function(){bub.classList.add('pop')})}}
next.addEventListener('click',function(){beep(520,.06);var s=SEC[si];if(pg<s.pages.length-1){pg++;show()}else if(si===0){closed=true;applyClosed()}else go(si<SEC.length-1?SEC[si+1].go:0)});
mas.addEventListener('click',function(){closed=!closed;applyClosed();beep(600,.08)});
bk.addEventListener('click',function(){go(0)});
SEC.forEach(function(s){var b=document.createElement('button');b.textContent=s.n;b.addEventListener('click',function(){go(s.go);menu.classList.remove('on');hb.setAttribute('aria-expanded','false')});menu.appendChild(b)});
hb.addEventListener('click',function(){var o=menu.classList.toggle('on');hb.setAttribute('aria-expanded',o)});
function onScroll(){target=Math.min(1,Math.max(0,scrollY/maxS()));setSec(target);bk.classList.toggle('on',target>.965)}
addEventListener('scroll',onScroll,{passive:true});

/* suara */
var AC=null,master=null,on=false;
function beep(f,d){if(!on||!AC)return;var o=AC.createOscillator(),g=AC.createGain();o.type='triangle';o.frequency.value=f;g.gain.value=.07;g.gain.exponentialRampToValueAtTime(.001,AC.currentTime+d);o.connect(g);g.connect(AC.destination);o.start();o.stop(AC.currentTime+d)}
snd.addEventListener('click',function(){on=!on;snd.textContent=on?'🔊':'🔇';snd.setAttribute('aria-pressed',on);
 if(on&&!AC){AC=new (window.AudioContext||window.webkitAudioContext)();master=AC.createGain();master.gain.value=0;master.connect(AC.destination);
  [220,277.2,330].forEach(function(f){var o=AC.createOscillator(),g=AC.createGain();o.type='sine';o.frequency.value=f;g.gain.value=.02;o.connect(g);g.connect(master);o.start()})}
 if(AC){AC.resume();master.gain.setTargetAtTime(on?1:0,AC.currentTime,.3)}beep(660,.1)});

/* halaman pemuatan */
var ld=document.getElementById('ld'),ldt=document.getElementById('ldt'),gob=document.getElementById('go'),isReady=false,started=false;
document.body.style.overflow='hidden';
function ready(){if(isReady)return;isReady=true;setTimeout(function(){ldt.textContent='siap!';gob.hidden=false;gob.focus()},reduce?0:900)}
setTimeout(ready,7000);
gob.addEventListener('click',function(){if(started)return;started=true;beep(600,.1);
 function fin(){ld.style.display='none';document.body.style.overflow='';onScroll()}
 if(reduce){fin();return}
 var t0=performance.now(),R0=75,R1=Math.hypot(innerWidth,innerHeight)*.62,called=false;
 function anim(now){var u=Math.min(1,(now-t0)/950),e=u*u*(3-2*u),r=R0+(R1-R0)*e*e,m='radial-gradient(circle at 50% 44%,transparent '+r+'px,#000 '+(r+2)+'px)';
  ld.style.webkitMaskImage=m;ld.style.maskImage=m;if(u>.5&&!called){called=true;onScroll()}if(u<1)requestAnimationFrame(anim);else fin()}
 requestAnimationFrame(anim)});
Promise.race([document.fonts?document.fonts.load('800 40px Nunito'):0,new Promise(function(r){setTimeout(r,1200)})]).then(init3d,init3d);

function init3d(){
 if(typeof THREE==='undefined'){ready();return}
 var cv=document.getElementById('c'),R;try{R=new THREE.WebGLRenderer({canvas:cv,powerPreference:'high-performance',antialias:false})}catch(e){ready();return}
 var stats=null;if(typeof Stats!=='undefined'){stats=new Stats();stats.showPanel(0);stats.dom.style.top='16px';stats.dom.style.left='80px';stats.dom.style.zIndex='999';document.body.appendChild(stats.dom)}
 var S=new THREE.Scene(),cam=new THREE.PerspectiveCamera(35,1,1,300),zf=1,rt=null;
 var hemi=new THREE.HemisphereLight(0xffffff,0xb7a6f5,1.05);S.add(hemi);
 var dl=new THREE.DirectionalLight(0xfff4d8,.7);dl.position.set(-15,30,40);S.add(dl);
 function M(c){return new THREE.MeshLambertMaterial({color:c})}
 function add(g,geo,c,x,y,z){var m=new THREE.Mesh(geo,M(c));m.position.set(x||0,y||0,z||0);g.add(m);return m}
 function sph(r){return new THREE.SphereGeometry(r,20,14)}
 function cyl(a,b,h,s){return new THREE.CylinderGeometry(a,b,h,s||24)}
 var seed=5;function rnd(){seed=(seed*16807)%2147483647;return seed/2147483647}
 function cvs(w,h,fn){var c=document.createElement('canvas');c.width=w;c.height=h;fn(c.getContext('2d'),w,h);var t=new THREE.CanvasTexture(c);t.anisotropy=4;return t}
 function basic(map,extra){var o=extra||{};o.map=map;return new THREE.MeshBasicMaterial(o)}
 function plate(w,h,cw,ch,fn,x,y,z){var m=new THREE.Mesh(new THREE.PlaneGeometry(w,h),basic(cvs(cw,ch,fn)));m.position.set(x,y,z);S.add(m);return m}
 function openUrl(u){if(u.indexOf('mailto')===0)location.href=u;else window.open(u,'_blank','noopener')}
 var PX=6,i,clk=[],hov=[],doves=[];
 var PAL=['#ff5fa2','#ffd24a','#5fd4ff','#8fe35a','#ff8a3d','#ffffff','#b69cf5'];

 // ikon titik-titik dan layar LED
 var CROSS=[['....X....','....X....','..XXXXX..','....X....','....X....','....X....','....X....','....X....'],'#ff3b4a'];
 var SMILE=[['.........','.XX...XX.','.XX...XX.','.........','X.......X','.X.....X.','..XXXXX..','.........'],'#ffa23a'];
 var CHEV=[['X.......X','.X.....X.','..X...X..','...X.X...','....X....','X.......X','.X.....X.','..X...X..','...X.X...','....X....'],'#6cf03a'];
 var HEART=[['.XX...XX.','XXXX.XXXX','XXXXXXXXX','XXXXXXXXX','.XXXXXXX.','..XXXXX..','...XXX...','....X....'],'#ff5fa2'];
 var STAR=[['....X....','....X....','...XXX...','XXXXXXXXX','.XXXXXXX.','..XXXXX..','..XX.XX..','.XX...XX.','X.......X'],'#ffd24a'];
 function dotTex(ic){var rows=ic[0];return cvs(256,256,function(x,w,h){x.fillStyle='#2b1830';x.fillRect(0,0,w,h);var n=rows.length,m=rows[0].length,s=Math.min(w/(m+2),h/(n+2)),ox=(w-m*s)/2,oy=(h-n*s)/2;
  for(var j=0;j<n;j++)for(var k=0;k<m;k++){x.fillStyle=rows[j][k]==='X'?ic[1]:'rgba(255,255,255,.07)';x.beginPath();x.arc(ox+(k+.5)*s,oy+(j+.5)*s,s*.36,0,6.3);x.fill()}})}
 function led(str,col){return cvs(320,160,function(x,w,h){var o=document.createElement('canvas');o.width=44;o.height=18;var q=o.getContext('2d');q.font='900 17px Nunito,sans-serif';q.textAlign='center';q.textBaseline='middle';q.fillStyle='#fff';q.fillText(str,22,10);var d=q.getImageData(0,0,44,18).data;x.fillStyle='#1b1230';x.fillRect(0,0,w,h);for(var j=0;j<18;j++)for(var k=0;k<44;k++){x.fillStyle=d[(j*44+k)*4+3]>110?col:'rgba(255,255,255,.07)';x.beginPath();x.arc(k*7.1+5,j*8.6+5,2.8,0,6.3);x.fill()}})}
 function bubTex(str){return cvs(128,100,function(x){x.fillStyle='#fff';x.beginPath();x.ellipse(64,44,58,38,0,0,6.3);x.fill();x.beginPath();x.moveTo(30,70);x.lineTo(24,96);x.lineTo(54,78);x.fill();x.fillStyle='#1a1a4a';x.font='800 40px Nunito,sans-serif';x.textAlign='center';x.textBaseline='middle';x.fillText(str,64,46)})}

 // tiang
 var pole=new THREE.Group();pole.position.x=PX;S.add(pole);
 add(pole,cyl(1,1,80),0x9a9cf0,0,-18,0);
 add(pole,cyl(.9,.9,1.4),0x2b1f3d,0,22.7,0);
 add(pole,cyl(1.1,1.1,1.8),0xf5b335,0,19.3,0);
 add(pole,cyl(1.1,1.1,1.7),0x8fe35a,0,10.4,0);
 add(pole,cyl(1.3,1.3,1.6),0x7b5cf0,0,-56.6,0);

 // lengan, lampu sinyal (beranda)
 add(S,cyl(.32,.32,18,16),0x8b90f0,PX-9,17.5,0).rotation.z=Math.PI/2;
 add(S,cyl(.62,.62,3.2,16),0xf5b335,PX-1.8,17.5,0).rotation.z=Math.PI/2;
 add(S,sph(.55),0xff5fa2,-12,17.5,0);
 add(S,cyl(.1,.1,1.7,8),0x8b90f0,-8.5,16.6,0);add(S,cyl(.1,.1,1.7,8),0x8b90f0,-.5,16.6,0);
 add(S,new THREE.BoxGeometry(11,4.4,2.2),0xf5b335,-4.5,13.6,0);
 [CROSS,SMILE,CHEV].forEach(function(ic,k){var cx=-4.5+(k-1)*3.6;
  add(S,cyl(1.65,1.65,.5,28),0x2b1830,cx,13.6,1.15).rotation.x=Math.PI/2;
  var f=new THREE.Mesh(new THREE.CircleGeometry(1.5,32),basic(dotTex(ic)));f.position.set(cx,13.6,1.42);S.add(f);
  add(S,new THREE.TorusGeometry(1.85,.26,10,28,Math.PI),0x5f5499,cx,13.6,1.5)});
 S.add(new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3([new THREE.Vector3(1.2,12.6,.4),new THREE.Vector3(3.4,11.6,.4),new THREE.Vector3(5.2,9.6,.1)]),16,.14,8),M(0xcfd0f8)));

 // merpati (bisa gugup saat kursor mendekat)
 function dove(gl,hat){var g=new THREE.Group();
  var bd=add(g,sph(1),0xffffff);bd.scale.set(1.05,.92,1);bd.userData.d=g;hov.push(bd);
  var wlg=new THREE.Group();wlg.position.set(-.55,.05,-.05);g.add(wlg);
  var wl=add(wlg,sph(.5),0xefeaff,-.4,-.15,0);wl.scale.set(.45,.9,.7);
  var wrg=new THREE.Group();wrg.position.set(.55,.05,-.05);g.add(wrg);
  var wr=add(wrg,sph(.5),0xefeaff,.4,-.15,0);wr.scale.set(.45,.9,.7);
  g.userData.wl=wlg;g.userData.wr=wrg;
  var legs=new THREE.Group();
  add(legs,cyl(.06,.06,.2,8),0xff9a5c,-.28,-.92,.1);add(legs,cyl(.06,.06,.2,8),0xff9a5c,.28,-.92,.1);
  add(legs,new THREE.BoxGeometry(.14,.05,.2),0xff9a5c,-.28,-1.02,.16);add(legs,new THREE.BoxGeometry(.14,.05,.2),0xff9a5c,.28,-1.02,.16);
  g.add(legs);g.userData.legs=legs;
  add(g,new THREE.ConeGeometry(.22,.5,12),0xff9a5c,0,-.05,1.05).rotation.x=Math.PI/2;
  add(g,sph(.12),0x2b1f3d,-.36,.25,.92);add(g,sph(.12),0x2b1f3d,.36,.25,.92);
  add(g,sph(.2),0xffb3c7,-.62,-.1,.8).scale.z=.5;add(g,sph(.2),0xffb3c7,.62,-.1,.8).scale.z=.5;
  add(g,new THREE.ConeGeometry(.35,.9,10),0xefeaff,0,.1,-1.1).rotation.x=-Math.PI/2;
  if(gl){var B=new THREE.BoxGeometry(.55,.3,.1);add(g,B,0x1e1630,-.36,.4,1);add(g,B,0x1e1630,.36,.4,1);add(g,new THREE.BoxGeometry(.3,.07,.08),0x1e1630,0,.45,1)}
  if(hat){add(g,cyl(.85,.85,.1,20),hat,0,.95,0);add(g,cyl(.55,.6,.5,20),hat,0,1.25,0);add(g,cyl(.6,.62,.14,20),0xffffff,0,1.08,0)}
  return g}
 function perch(par,gl,hat,x,y,z,s){var d=dove(gl,hat);d.position.set(x,y,z);d.scale.setScalar(s||1);d.userData.x=x;d.userData.y=y;d.userData.z=z;d.userData.s=s||1;d.userData.r=(rnd()-.5)*.7;d.userData.f=0;par.add(d);doves.push(d);return d}
 [2.4,.9,-.6,-2.1,-3.6,-5.1,-6.6,-8.1].forEach(function(x,k){perch(S,k%2===1,k===2?0x9b8cf5:k===6?0xb69cf5:0,x,18.7,0,1.05)});
 var hs=new THREE.Sprite(new THREE.SpriteMaterial({map:bubTex('💙')}));hs.scale.set(2.8,2.2,1);hs.position.set(1.1,21.4,.5);S.add(hs);

 // stiker di tiang
 var EM=['✝️','🐟','🕊️','📖','⭐','❤️','🌈','🙏','🍞','🔔'];
 var stk=EM.map(function(e,k){return basic(cvs(128,128,function(x){x.fillStyle='#fff';x.beginPath();x.arc(64,64,62,0,6.3);x.fill();x.fillStyle=PAL[k%PAL.length];x.beginPath();x.arc(64,64,54,0,6.3);x.fill();x.font='64px sans-serif';x.textAlign='center';x.textBaseline='middle';x.fillText(e,64,70)}),{transparent:true})});
 var flat=PAL.concat(['#2b1f3d','#7b5cf0']);
 for(i=0;i<75;i++){var th=(rnd()-.5)*2.5,sz=.5+rnd()*.7,m;
  if(i%2)m=new THREE.Mesh(new THREE.PlaneGeometry(sz,sz),stk[i%stk.length]);
  else{m=new THREE.Mesh(new THREE.CircleGeometry(sz*.5,3+Math.floor(rnd()*5)),new THREE.MeshBasicMaterial({color:flat[i%flat.length]}));m.rotation.z=rnd()*6}
  var rr=1.03+rnd()*.04;m.position.set(Math.sin(th)*rr,-56+rnd()*77,Math.cos(th)*rr);m.rotation.y=th;pole.add(m)}

 // ===== TENTANG: papan biru =====
 add(pole,cyl(1.12,1.12,.7),0x2f6fe4,0,3.2,0);add(pole,cyl(1.12,1.12,.7),0x2f6fe4,0,1.9,0);
 plate(7.2,2.25,512,160,function(x,w,h){x.fillStyle='#2f6fe4';x.fillRect(0,0,w,h);x.strokeStyle='#fff';x.lineWidth=10;x.lineJoin='round';x.strokeRect(8,8,w-16,h-16);x.fillStyle='#fff';x.beginPath();x.arc(84,h/2,34,0,6.3);x.fill();x.fillStyle='#2f6fe4';x.font='900 52px Nunito,sans-serif';x.textAlign='center';x.textBaseline='middle';x.fillText('i',84,h/2+3);x.fillStyle='#fff';x.font='900 76px Nunito,sans-serif';x.textAlign='left';x.fillText('TENTANG',140,h/2+5)},PX-4.6,2.6,.3);
 plate(3.8,.95,256,64,function(x,w,h){x.fillStyle='#ffd24a';x.fillRect(0,0,w,h);x.strokeStyle='#1a1a4a';x.lineWidth=5;x.strokeRect(3,3,w-6,h-6);x.fillStyle='#1a1a4a';x.font='900 26px Nunito,sans-serif';x.textAlign='left';x.textBaseline='middle';x.fillText('📍 ANDA DI SINI',14,h/2+2)},PX-4.6,.6,.3);
 add(S,cyl(.04,.04,.5,6),0x1a1a4a,PX-5.7,1.28,.3);add(S,cyl(.04,.04,.5,6),0x1a1a4a,PX-3.5,1.28,.3);
 perch(S,true,0,PX-3.7,4.65,.3,.95);perch(S,false,0,PX-5.6,4.65,.3,.95);
 var tb1=bubTex('hm'),tb2=bubTex('♪'),tbs=new THREE.Sprite(new THREE.SpriteMaterial({map:tb1}));tbs.scale.set(1.9,1.5,1);tbs.position.set(PX-4.6,7.2,.6);S.add(tbs);

 // ===== PROYEK: papan nama jalan + monitor yang meluncur =====
 function street(t,bg,fg){return function(x,w,h){x.fillStyle=bg;x.fillRect(0,0,w,h);x.strokeStyle='#fff';x.lineWidth=8;x.lineJoin='round';x.strokeRect(6,6,w-12,h-12);x.fillStyle=fg;x.font='900 40px Nunito,sans-serif';x.textAlign='center';x.textBaseline='middle';x.fillText(t,w/2-10,h/2+3);x.beginPath();x.moveTo(w-34,h/2-13);x.lineTo(w-16,h/2);x.lineTo(w-34,h/2+13);x.fill()}}
 [['JURNAL ST.','#34c7b8','#1a1a4a',-4.6,5.6,0x8fe35a],['TANAH LIAT AV.','#5fd45f','#1a1a4a',-6.6,5.0,0x2f6fe4],['RPP DEEP LN.','#8a5cf0','#ffffff',-8.6,5.2,0xb04cf0]].forEach(function(s,k){
  var m=plate(s[4],s[4]*.25,448,112,street(s[0],s[1],s[2]),PX-1-s[4]/2,s[3],.3);m.rotation.z=(k%2?1:-1)*.03;m.userData.fn=function(){beep(500+k*80,.08);openProj(k)};clk.push(m);
  add(pole,cyl(1.12,1.12,.9),s[5],0,s[3],0)});
 perch(S,true,0,PX-4.4,-3.05,.3,.95);perch(S,false,0xffd24a,PX-2.8,-3.05,.3,.95);

 function cardTex(n){return cvs(512,320,function(x,w,h){
  var P=[['#5fd8c8','#f4f08a'],['#8fd0ff','#ffd9a8'],['#c9a8ff','#ffc2e0']][n],g=x.createLinearGradient(0,0,w,h);
  g.addColorStop(0,P[0]);g.addColorStop(1,P[1]);x.fillStyle=g;x.fillRect(0,0,w,h);
  for(var s=0;s<40;s++){x.globalAlpha=.13;x.fillStyle=s%2?'#fff':P[0];x.beginPath();x.ellipse(rnd()*w,rnd()*h,30+rnd()*50,6+rnd()*10,rnd()*3,0,6.3);x.fill()}x.globalAlpha=1;
  if(n===0){x.fillStyle='#fff';x.fillRect(110,80,140,160);x.fillRect(262,80,140,160);x.fillStyle='#8b90f0';for(var j=0;j<5;j++){x.fillRect(126,106+j*24,108,7);x.fillRect(278,106+j*24,108,7)}x.fillStyle='#ff6f6f';x.fillRect(250,76,12,168);x.font='56px sans-serif';x.textAlign='center';x.fillText('✝️',350,70)}
  if(n===1){x.fillStyle='#fff';x.beginPath();x.ellipse(130,100,50,22,0,0,6.3);x.fill();x.fillStyle='#c97b4a';x.fillRect(80,230,350,50);x.fillStyle='#7ccf6b';x.fillRect(80,220,350,16);x.fillStyle='#ff9a5c';x.beginPath();x.arc(250,178,42,0,6.3);x.fill();x.fillStyle='#fff';x.beginPath();x.arc(235,170,10,0,6.3);x.arc(266,170,10,0,6.3);x.fill();x.fillStyle='#1a1a4a';x.beginPath();x.arc(237,172,5,0,6.3);x.arc(268,172,5,0,6.3);x.fill();x.font='54px sans-serif';x.textAlign='center';x.fillText('⭐',380,120)}
  if(n===2){x.save();x.translate(256,160);x.rotate(-.06);x.fillStyle='#fff';x.fillRect(-90,-110,180,220);x.fillStyle='#8b90f0';x.fillRect(-90,-110,180,26);x.fillStyle='#1a1a4a';for(var q=0;q<5;q++){x.fillRect(-48,-60+q*34,110,7);x.fillStyle='#4fd05a';x.fillRect(-72,-64+q*34,16,16);x.fillStyle='#1a1a4a'}x.restore()}
  x.fillStyle='#fff';x.fillRect(18,18,100,38);x.fillStyle='#1a1a4a';x.font='900 24px Nunito,sans-serif';x.textAlign='center';x.textBaseline='middle';x.fillText('0'+(n+1)+' / 03',68,38);
  var T=['JURNAL ALKITAB','GAME TANAH LIAT','RPP DEEP PAK'][n];x.font='900 24px Nunito,sans-serif';x.fillStyle='#ffd24a';x.fillRect(18,h-62,x.measureText(T).width+60,42);x.fillStyle='#1a1a4a';x.textAlign='left';x.fillText(T+' ↗',32,h-41)})}
 var texs=[0,1,2].map(cardTex),HOME=PX-10.2,card=new THREE.Group();card.position.set(HOME-22,-6.6,.3);S.add(card);
 add(card,new THREE.BoxGeometry(9.1,6.2,.4),0xff5fa2,0,0,-.12);
 add(card,new THREE.BoxGeometry(8.8,5.9,.6),0x2f6fe4);
 add(card,new THREE.BoxGeometry(8.4,5.5,.62),0x1a1a4a);
 var cm=basic(texs[0]),cp=new THREE.Mesh(new THREE.PlaneGeometry(8,5),cm);cp.position.z=.33;card.add(cp);
 function arrow(x,d){var a=add(card,cyl(.42,.42,.2,20),0x1a1a4a,x,0,.45);a.rotation.x=Math.PI/2;a.userData.fn=function(){step(d);beep(560,.08)};clk.push(a);
  var t=new THREE.Mesh(new THREE.CircleGeometry(.2,3),new THREE.MeshBasicMaterial({color:0xffffff}));t.position.set(x,0,.56);t.rotation.z=d>0?0:Math.PI;card.add(t)}
 arrow(4.95,1);arrow(-4.95,-1);
 var cardIdx=0,flip=null,want=false;
 api.card=function(n){want=true;if(n===cardIdx&&!flip)return;if(reduce){cardIdx=n;cm.map=texs[n];cm.needsUpdate=true;return}flip={to:n,t:0}};
 api.hide=function(){want=false};

 // ===== PENGALAMAN: papan halte =====
 add(S,new THREE.BoxGeometry(2,.3,.3),0x8b90f0,PX-1.8,-15,.3);
 plate(3.4,3.4,256,256,function(x,w,h){x.fillStyle='#34c77a';x.fillRect(0,0,w,h);x.strokeStyle='#fff';x.lineWidth=12;x.lineJoin='round';x.strokeRect(10,10,w-20,h-20);x.font='130px sans-serif';x.textAlign='center';x.textBaseline='middle';x.fillText('📖',w/2,h/2+8)},PX-3.7,-15,.3);
 plate(3.8,2.6,384,264,function(x,w,h){x.fillStyle='#fffaf0';x.fillRect(0,0,w,h);x.fillStyle='#1a1a4a';x.fillRect(0,0,w,46);x.fillStyle='#fff';x.font='900 26px Nunito,sans-serif';x.textAlign='left';x.textBaseline='middle';x.fillText('● PENGALAMAN',16,24);
  ['PAK & BUDI PEKERTI','MEDIA INTERAKTIF','GAME EDUKASI','JURNAL ALKITAB'].forEach(function(t,k){x.fillStyle=PAL[k];x.beginPath();x.arc(26,82+k*50,10,0,6.3);x.fill();x.fillStyle='#1a1a4a';x.font='800 24px Nunito,sans-serif';x.fillText(t,48,83+k*50)});x.strokeStyle='#34c77a';x.lineWidth=8;x.strokeRect(4,4,w-8,h-8)},PX-3.7,-18.2,.3);
 plate(3.8,1.9,320,160,function(x,w,h){var o=led('PAK','#ff5f5f').image;x.drawImage(o,0,0)},PX-3.7,-20.6,.3);
 perch(S,true,0,PX-4.4,-12.45,.3,.95);perch(S,false,0x9b8cf5,PX-3,-12.45,.3,.95);
 var hb2=new THREE.Sprite(new THREE.SpriteMaterial({map:bubTex('hehe')}));hb2.scale.set(2.2,1.7,1);hb2.position.set(PX-3.6,-10,.6);S.add(hb2);

 // ===== MAMPIR: mesin undian ayat + telepon umum =====
 var sl=new THREE.Group();sl.position.set(PX-3,-29,.3);S.add(sl);
 add(sl,new THREE.BoxGeometry(2.7,7.4,1.2),0xf5b335);
 var ics=[CROSS,SMILE,HEART,STAR],icT=ics.map(dotTex),sm=[],spinning=false;
 for(i=0;i<3;i++){var sc3=new THREE.Mesh(new THREE.PlaneGeometry(2,1.7),basic(icT[i]));sc3.position.set(0,2.3-i*1.85,.62);sc3.userData.ic=i;sl.add(sc3);sm.push(sc3)}
 var pb=add(sl,cyl(.55,.55,.3,24),0xff4d5e,0,-3.05,.65);pb.rotation.x=Math.PI/2;clk.push(pb);
 pb.userData.fn=function(){if(spinning)return;spinning=true;var n=0,iv=setInterval(function(){
  sm.forEach(function(m){m.userData.ic=Math.floor(Math.random()*4);m.material.map=icT[m.userData.ic]});beep(300+n*40,.05);
  if(++n>9){clearInterval(iv);spinning=false;var same=sm[0].userData.ic===sm[1].userData.ic&&sm[1].userData.ic===sm[2].userData.ic;
   say((same?'JACKPOT! ':'')+'Ayat hari ini: '+VERSES[Math.floor(Math.random()*VERSES.length)]+'. Buka dan baca di Alkitab Anda.')}},90)};
 var ph=new THREE.Group();ph.position.set(PX+2.9,-28.8,.3);S.add(ph);
 var pbx=add(ph,new THREE.BoxGeometry(3.4,3.8,1.4),0x8fe35a);clk.push(pbx);
 pbx.userData.fn=function(){[523,659,784].forEach(function(f,j){setTimeout(function(){beep(f,.12)},j*130)})};
 var pls=new THREE.Mesh(new THREE.PlaneGeometry(2.6,1),basic(led('TEL','#ff5f5f')));pls.position.set(0,1.1,.72);ph.add(pls);
 var kp=new THREE.Mesh(new THREE.PlaneGeometry(1.8,1.5),basic(cvs(128,110,function(x,w,h){x.fillStyle='#2b1830';x.fillRect(0,0,w,h);x.fillStyle='#ffd24a';for(var r=0;r<4;r++)for(var c=0;c<3;c++){x.beginPath();x.arc(24+c*40,18+r*25,9,0,6.3);x.fill()}})));kp.position.set(0,-.7,.72);ph.add(kp);
 add(ph,cyl(.25,.25,2.2,12),0x5fd4ff,-1.95,0,.4);
 perch(ph,true,0,0,2.85,0,.95);
 var bt1=bubTex('?!'),bt2=bubTex('hehe'),pbs=new THREE.Sprite(new THREE.SpriteMaterial({map:bt1}));pbs.scale.set(2.2,1.7,1);pbs.position.set(1.6,5.2,.5);ph.add(pbs);

 // ===== KONTAK =====
 var SW=32,SH=20,snk=[[10,10],[9,10],[8,10]],dir=[1,0],nd=[1,0],food=[20,10],lastKey=0,acc=0;
 var sc=document.createElement('canvas');sc.width=256;sc.height=160;var sx=sc.getContext('2d'),st=new THREE.CanvasTexture(sc);
 function hit(h){return snk.some(function(p){return p[0]===h[0]&&p[1]===h[1]})}
 function nx(d){return [(snk[0][0]+d[0]+SW)%SW,(snk[0][1]+d[1]+SH)%SH]}
 function snkDraw(){sx.fillStyle='#10201a';sx.fillRect(0,0,256,160);sx.fillStyle='#6cf03a';snk.forEach(function(p){sx.fillRect(p[0]*8+1,p[1]*8+1,6,6)});sx.fillStyle='#ff5fa2';sx.fillRect(food[0]*8+1,food[1]*8+1,6,6);st.needsUpdate=true}
 function ai(){var best=null,bd=1e9;[[1,0],[-1,0],[0,1],[0,-1]].forEach(function(d){if(d[0]===-dir[0]&&d[1]===-dir[1])return;var h=nx(d);if(hit(h))return;var dd=Math.abs(h[0]-food[0])+Math.abs(h[1]-food[1]);if(dd<bd){bd=dd;best=d}});if(best)nd=best}
 function snkTick(){if(Date.now()-lastKey>4000)ai();dir=nd;var h=nx(dir);
  if(hit(h)){snk=[[10,10],[9,10],[8,10]];dir=nd=[1,0]}else{snk.unshift(h);if(h[0]===food[0]&&h[1]===food[1]){beep(880,.06);food=[Math.floor(Math.random()*SW),Math.floor(Math.random()*SH)]}else snk.pop()}snkDraw()}
 function turn(d){if(d[0]===-dir[0]&&d[1]===-dir[1])return;nd=d;lastKey=Date.now()}
 addEventListener('keydown',function(e){var k=e.key.toLowerCase();if(si!==5)return;if(k==='w')turn([0,-1]);if(k==='s')turn([0,1]);if(k==='a')turn([-1,0]);if(k==='d')turn([1,0])});
 snkDraw();
 add(S,new THREE.BoxGeometry(5.4,3.6,.6),0x8fe35a,PX-4.2,-39.5,.2);
 var sg2=new THREE.Mesh(new THREE.PlaneGeometry(4.8,3),basic(st));sg2.position.set(PX-4.2,-39.5,.52);S.add(sg2);clk.push(sg2);
 sg2.userData.fn=function(h){var u=h.uv.x-.5,v=h.uv.y-.5;turn(Math.abs(u)>Math.abs(v)?[u>0?1:-1,0]:[0,v>0?-1:1])};
 [['EMAIL',CFG.email,'#ffffff','#1a1a4a'],['WHATSAPP',CFG.wa,'#8fe35a','#1a1a4a'],['YOUTUBE',CFG.yt,'#2f6fe4','#ffffff']].forEach(function(b,k){
  var m=new THREE.Mesh(new THREE.PlaneGeometry(5.2,1.3),basic(cvs(416,104,function(x,w,h){x.fillStyle=b[2];x.fillRect(0,0,w,h);x.strokeStyle='#1a1a4a';x.lineWidth=8;x.strokeRect(4,4,w-8,h-8);x.fillStyle=b[3];x.font='900 44px Nunito,sans-serif';x.textAlign='left';x.textBaseline='middle';x.fillText(b[0]+' ↗',28,h/2+3)})));
  m.position.set(PX-3.6,-43.2-k*1.7,.35);m.userData.fn=function(){openUrl(b[1])};S.add(m);clk.push(m)});
 var mb=new THREE.Group();mb.position.set(PX-3.4,-51,0);S.add(mb);
 var mbx=add(mb,new THREE.BoxGeometry(4.7,2.6,2.4),0xff6f6f);mbx.userData.fn=function(){beep(660,.1);openUrl(CFG.email)};clk.push(mbx);
 var ml=new THREE.Mesh(new THREE.PlaneGeometry(2.4,.8),basic(cvs(256,86,function(x,w,h){x.fillStyle='#fff';x.fillRect(0,0,w,h);x.fillStyle='#1a1a4a';x.font='900 52px Nunito,sans-serif';x.textAlign='center';x.textBaseline='middle';x.fillText('SURAT',w/2,h/2+3)})));ml.position.set(0,-.4,1.22);mb.add(ml);
 add(mb,new THREE.BoxGeometry(.3,2.2,.3),0xffd24a,-2.5,1.2,0);add(mb,new THREE.BoxGeometry(1.4,.7,.3),0xffd24a,-3.1,2.1,0);
 var env=new THREE.Mesh(new THREE.PlaneGeometry(2.4,1.6),basic(cvs(192,128,function(x,w,h){x.fillStyle='#fff';x.fillRect(0,0,w,h);x.strokeStyle='#8b90f0';x.lineWidth=5;x.strokeRect(4,4,w-8,h-8);x.beginPath();x.moveTo(4,4);x.lineTo(w/2,h*.6);x.lineTo(w-4,4);x.stroke();x.font='34px sans-serif';x.textAlign='center';x.fillText('💙',w/2,h-22)})));
 env.position.set(0,.9,1.3);env.rotation.x=-.25;mb.add(env);
 perch(mb,false,0xff8ab8,.5,2.25,0,.9);perch(mb,true,0xffd24a,1.8,2.25,0,.9);

 // ===== AKHIR =====
 var bc=new THREE.CatmullRomCurve3([new THREE.Vector3(PX-1,-53.4,.3),new THREE.Vector3(PX-5.5,-55,.6),new THREE.Vector3(PX-10,-53.4,.3)]);
 S.add(new THREE.Mesh(new THREE.TubeGeometry(bc,24,.06,6),M(0x2b1f3d)));
 'SELESAI'.split('').forEach(function(ch,k){var p=bc.getPoint((k+.7)/7.4),fl=new THREE.Mesh(new THREE.PlaneGeometry(1.3,1.3),basic(cvs(128,128,function(x){x.fillStyle=PAL[k%PAL.length];x.beginPath();x.moveTo(4,10);x.lineTo(124,10);x.lineTo(64,124);x.closePath();x.fill();x.fillStyle='#1a1a4a';x.font='900 56px Nunito,sans-serif';x.textAlign='center';x.textBaseline='middle';x.fillText(ch,64,48)}),{side:THREE.DoubleSide,transparent:true}));fl.position.set(p.x,p.y-.62,p.z+.1);S.add(fl)});
 add(S,cyl(.12,.12,3.6,8),0x8b90f0,PX-10.2,-55,.3);
 var disco=new THREE.Mesh(new THREE.IcosahedronGeometry(1.3,1),new THREE.MeshLambertMaterial({color:0xe6ecff,flatShading:true}));disco.position.set(PX-10.2,-52.1,.3);S.add(disco);
 var notes=[];['♪','♫','♪','♫'].forEach(function(ch,k){var s=new THREE.Sprite(new THREE.SpriteMaterial({transparent:true,map:cvs(64,64,function(x){x.fillStyle='#ffd24a';x.font='900 52px sans-serif';x.textAlign='center';x.textBaseline='middle';x.fillText(ch,32,34)})}));s.scale.set(1.3,1.3,1);s.userData.k=k;s.position.set(PX-10.2+(k%2?1.7:-1.5),-51,.5);S.add(s);notes.push(s)});

 // ─── KONFIGURASI AWAN ────────────────────────────────────────────────────
 var CLOUD_CFG={
  count:20,          // jumlah awan total di scene
  scaleMin:2.2,      // skala minimum awan
  scaleMax:5.5,      // skala maksimum awan
  speedMin:0.18,     // kecepatan minimum (unit/detik)
  speedMax:0.52,     // kecepatan maksimum
  spheresMin:6,      // sphere minimum per awan
  spheresMax:9,      // sphere maksimum per awan
  colorTop:new THREE.Color(1,1,1),             // putih di puncak
  colorBot:new THREE.Color(0.85,0.77,0.97),    // lavender lembut di bawah
  colorShadow:new THREE.Color(0.78,0.70,0.92), // lavender lebih gelap sisi
  xMin:-34, xMax:30,   // batas posisi X spawn/reset
  yMin:-58, yMax:24,   // batas posisi Y
  zMin:-36, zMax:-5    // kedalaman Z (parallax)
 };
 // ─── MATERIAL AWAN: vertex-color gradient, satu draw call per awan ─────
 var cloudMat=new THREE.ShaderMaterial({
  vertexColors:true,
  transparent:true,
  depthWrite:false,
  vertexShader:[
   'attribute vec3 color;',
   'varying vec3 vCol;',
   'varying vec3 vNorm;',
   'void main(){',
   '  vCol=color;',
   '  vNorm=normalize(normalMatrix*normal);',
   '  gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);',
   '}'
  ].join('\n'),
  fragmentShader:[
   'varying vec3 vCol;',
   'varying vec3 vNorm;',
   'void main(){',
   // soft lambert: wrap lighting so bottom rim still bright
   '  float wrap=dot(vNorm,vec3(-.25,.6,.4))*.5+.5;',
   '  vec3 lit=vCol*(0.72+0.28*wrap);',
   '  gl_FragColor=vec4(lit,1.);',
   '}'
  ].join('\n')
 });
 // ─── PEMBUAT GEOMETRI AWAN (per seed) ──────────────────────────────────
 function cloudGeo(seed){
  // PRNG lokal berbasis seed (LCG)
  var s=seed+1;
  function lr(){s=(s*1664525+1013904223)>>>0;return s/4294967296}
  var nSph=CLOUD_CFG.spheresMin+Math.floor(lr()*(CLOUD_CFG.spheresMax-CLOUD_CFG.spheresMin+1));
  var geos=[];
  var cTop=CLOUD_CFG.colorTop,cBot=CLOUD_CFG.colorBot,cShd=CLOUD_CFG.colorShadow;
  for(var b=0;b<nSph;b++){
   // posisi: tersebar horizontal, bertumpuk vertikal, bola bawah lebih pipih
   var t=b/nSph; // 0=tengah bawah, 1=puncak tepi
   var rx=(lr()-.5)*3.2;   // X acak
   var ry=lr()*1.8;        // Y: bola selalu di atas nol (bagian bawah datar)
   var rz=(lr()-.5)*0.8;   // Z sedikit
   var rad=0.55+lr()*0.75; // radius bola
   var flatY=THREE.MathUtils.lerp(0.52,0.92,lr()); // pipihkan bawah
   // bola tengah-bawah lebih besar
   if(b<3){rx*=0.4;ry*=0.5;rad+=0.3;flatY=Math.min(flatY,0.68)}
   var geo=new THREE.SphereGeometry(rad,10,8);
   // scale Y untuk pipih
   var pos=geo.attributes.position;
   var nrm=geo.attributes.normal;
   var cnt=pos.count;
   var cols=new Float32Array(cnt*3);
   for(var v=0;v<cnt;v++){
    // pipihkan bawah: tekan Y negatif
    var py=pos.getY(v);
    if(py<0){pos.setY(v,py*flatY)}
    // vertex color: lerp berdasarkan Y lokal + normal
    var ny=nrm.getY(v);
    var fTop=Math.max(0,Math.min(1,(pos.getY(v)/rad)*0.5+0.5+ny*0.2));
    var fShd=Math.max(0,1.0-fTop*1.4); // lavender lebih gelap sisi bawah
    var cr=THREE.MathUtils.lerp(cShd.r,cTop.r,fTop);
    var cg2=THREE.MathUtils.lerp(cShd.g,cTop.g,fTop);
    var cb=THREE.MathUtils.lerp(cShd.b,cTop.b,fTop);
    cols[v*3]=cr; cols[v*3+1]=cg2; cols[v*3+2]=cb;
   }
   pos.needsUpdate=true;
   geo.setAttribute('color',new THREE.BufferAttribute(cols,3));
   // pindahkan bola ke posisinya (bake translate ke geo)
   geo.translate(rx,ry,rz);
   geos.push(geo);
  }
  // Merge semua sphere menjadi 1 BufferGeometry → 1 draw call
  var merged=THREE.BufferGeometryUtils
   ?THREE.BufferGeometryUtils.mergeBufferGeometries(geos,false)
   :geos[0]; // fallback jika utils tidak tersedia
  // Hilangkan index untuk kompatibilitas max
  if(!merged)merged=geos[0];
  geos.forEach(function(g){g.dispose()});
  return merged;
 }
 // ─── BUAT 5 TEMPLATE BENTUK AWAN ───────────────────────────────────────
 var cloudShapes=[];
 for(i=0;i<5;i++){cloudShapes.push(cloudGeo(i*731+17))}
 // ─── SEBAR AWAN DI SCENE ───────────────────────────────────────────────
 var clouds=[];
 for(i=0;i<CLOUD_CFG.count;i++){
  var cShape=cloudShapes[i%cloudShapes.length];
  var cMesh=new THREE.Mesh(cShape,cloudMat);
  var cScale=CLOUD_CFG.scaleMin+rnd()*(CLOUD_CFG.scaleMax-CLOUD_CFG.scaleMin);
  cMesh.scale.setScalar(cScale);
  cMesh.position.set(
   CLOUD_CFG.xMin+rnd()*(CLOUD_CFG.xMax-CLOUD_CFG.xMin),
   CLOUD_CFG.yMin+rnd()*(CLOUD_CFG.yMax-CLOUD_CFG.yMin),
   CLOUD_CFG.zMin+rnd()*(CLOUD_CFG.zMax-CLOUD_CFG.zMin));
  cMesh.userData.v=CLOUD_CFG.speedMin+rnd()*(CLOUD_CFG.speedMax-CLOUD_CFG.speedMin);
  cMesh.frustumCulled=true;
  S.add(cMesh);clouds.push(cMesh)}
 // ─── awan, lantai awan, pesawat, bintang (lanjut) ──────────────────────
 add(S,sph(1),0xffffff,PX,-59.2,0).scale.set(45,2.4,40);add(S,sph(1),0xe4bff5,PX,-61.4,0).scale.set(48,2.6,44);
 var pln=new THREE.Group();add(pln,new THREE.ConeGeometry(.42,1.7,3),0xffffff).rotation.z=-Math.PI/2;add(pln,new THREE.BoxGeometry(.5,.08,1.6),0xffd9ec,-.1,0,0);pln.scale.setScalar(1.4);pln.rotation.z=.1;S.add(pln);
 var tr1=add(S,new THREE.BoxGeometry(1,.14,.14),0xffffff),tr2=add(S,new THREE.BoxGeometry(1,.14,.14),0xff8ad0),pl={t:11.8,sx:0,sy:0};
 pln.visible=tr1.visible=tr2.visible=false;
 var sp=new Float32Array(1200);for(i=0;i<400;i++){sp[i*3]=-90+rnd()*180;sp[i*3+1]=-110+rnd()*150;sp[i*3+2]=-70}
 var sgm=new THREE.BufferGeometry();sgm.setAttribute('position',new THREE.BufferAttribute(sp,3));
 var stars=new THREE.Points(sgm,new THREE.PointsMaterial({color:0xffffff,size:.7,transparent:true,opacity:0,depthWrite:false}));S.add(stars);

 // post-process: langit siang-senja-malam, halftone, aberasi kromatik
 var pm=new THREE.ShaderMaterial({uniforms:{tD:{value:null},pr:{value:1},n:{value:0}},
  vertexShader:'varying vec2 vUv;void main(){vUv=uv;gl_Position=vec4(position.xy,0.,1.);}',
  fragmentShader:'uniform sampler2D tD;uniform float pr,n;varying vec2 vUv;void main(){vec2 c=vUv-.5;vec2 o=c*dot(c,c)*.02;vec4 a=texture2D(tD,vUv+o),b=texture2D(tD,vUv),e=texture2D(tD,vUv-o);vec3 col=vec3(a.r,b.g,e.b);float al=max(a.a,max(b.a,e.a));float s=vUv.y;float sn=sin(n*3.14159);vec3 top=mix(vec3(.2,.38,.94),vec3(.1,.05,.3),n),mid=mix(vec3(.42,.66,1.),vec3(.3,.12,.52),n),bot=mix(mix(vec3(.86,.72,.96),vec3(.18,.08,.4),n),vec3(1.,.5,.58),sn*.75);vec3 sky=s>.42?mix(mid,top,smoothstep(.42,1.,s)):mix(bot,mid,smoothstep(0.,.42,s));vec3 r=col+sky*(1.-al);vec2 g=fract(gl_FragCoord.xy/(3.*pr))-.5;r+=(smoothstep(.5,.15,length(g))-.5)*.045;gl_FragColor=vec4(r,1.);}'});
 var ps=new THREE.Scene(),pc=new THREE.OrthographicCamera(-1,1,1,-1,0,1);ps.add(new THREE.Mesh(new THREE.PlaneGeometry(2,2),pm));

 function size(){var pr=Math.min(devicePixelRatio||1,1.5),w=innerWidth,h=innerHeight,a=w/h;
  R.setPixelRatio(pr);R.setSize(w,h,false);pm.uniforms.pr.value=pr;if(rt)rt.dispose();
  rt=new THREE.WebGLRenderTarget(Math.floor(w*pr),Math.floor(h*pr),{format:THREE.RGBAFormat,minFilter:THREE.LinearFilter,magFilter:THREE.LinearFilter});
  pm.uniforms.tD.value=rt.texture;cam.aspect=a;cam.fov=a<1?40:35;cam.updateProjectionMatrix();zf=a<1.3?Math.min(2.2,1.04/a):1}
 addEventListener('resize',size);size();

 // klik, kursor, dan burung gugup (input dipisah dari render loop)
 var rc=new THREE.Raycaster(),mv=new THREE.Vector2(),_wp=new THREE.Vector3();
 var mouseMoved=false,mx=0,my=0,hitsClk=[],hitsHov=[];
 function rayAt(x,y){mv.set(x/innerWidth*2-1,-(y/innerHeight)*2+1);rc.setFromCamera(mv,cam)}
 function fly(d){var u=d.userData;if(u.f||reduce)return;u.f=.001;u.dx=(Math.random()-.5)*6;u.dy=3+Math.random()*2.5}
 function startle(d){fly(d);doves.forEach(function(o){if(o!==d&&o.parent===d.parent&&Math.abs(o.userData.x-d.userData.x)<2.8&&Math.random()<.55)fly(o)})}
 cv.addEventListener('pointermove',function(e){mx=e.clientX;my=e.clientY;mouseMoved=true});
 cv.addEventListener('click',function(e){rayAt(e.clientX,e.clientY);hitsClk.length=0;rc.intersectObjects(clk,false,hitsClk);if(hitsClk[0]&&hitsClk[0].object.userData.fn)hitsClk[0].object.userData.fn(hitsClk[0])});

 function ss(x){x=Math.min(1,Math.max(0,x/.14));return x*x*(3-2*x)}
 var KY=[[0,11.4],[.16,2],[.34,-7],[.53,-16],[.71,-29],[.88,-43],[1,-53]];
 function yk(c){for(var j=1;j<KY.length;j++)if(c<=KY[j][0]){var a=KY[j-1],b=KY[j],u=(c-a[0])/(b[0]-a[0]);u=u*u*(3-2*u);return a[1]+(b[1]-a[1])*u}return -53}
 var last=performance.now(),wingFlap=0;
 function frame(now){
  if(stats)stats.begin();
  var T=now/1000,dt=Math.min(.05,(now-last)/1000);last=now;ready();
  cur=reduce?target:THREE.MathUtils.damp(cur,target,5.2,dt);
  var k=ss(cur),x=-4.4+5.4*k,y=yk(cur),z=(35-11*k)*zf,sw=reduce?0:1;
  cam.position.set(x+Math.sin(T*.35)*.25*sw,y+Math.sin(T*.5)*.2*sw,z);cam.lookAt(x,y,0);
  var tx=want?HOME:HOME-22;card.position.x=reduce?tx:THREE.MathUtils.damp(card.position.x,tx,7.5,dt);
  if(flip){flip.t+=dt*5;if(flip.t>=1&&cardIdx!==flip.to){cardIdx=flip.to;cm.map=texs[cardIdx];cm.needsUpdate=true}
   if(flip.t>=2){flip=null;card.scale.x=1}else card.scale.x=Math.max(.02,flip.t<1?1-flip.t:flip.t-1)}
  acc+=dt;if(si===5&&acc>.13){acc=0;snkTick()}
  if(mouseMoved){
   mouseMoved=false;rayAt(mx,my);hitsClk.length=0;hitsHov.length=0;
   rc.intersectObjects(clk,false,hitsClk);rc.intersectObjects(hov,false,hitsHov);
   cv.style.cursor=hitsClk.length?'pointer':'';
   if(hitsHov.length){startle(hitsHov[0].object.userData.d)}
   else{
    for(var k=0;k<doves.length;k++){
     var dv=doves[k];
     if(!dv.userData.f){
      dv.getWorldPosition(_wp);
      if(rc.ray.distanceToPoint(_wp)<2.5){startle(dv);break}
     }
    }
   }
  }
  if(!reduce){
   wingFlap+=dt*30;var fl=Math.sin(wingFlap)*.9;
   doves.forEach(function(d,j){var u=d.userData,f=u.f;
    if(f>0){f+=dt/2.8;
     if(f>=1){
      u.f=0;
      d.position.set(u.x,u.y,u.z);
      d.rotation.set(0,u.r,0);
      u.wl.rotation.set(0,0,0);
      u.wr.rotation.set(0,0,0);
      if(u.legs)u.legs.rotation.x=0;
     } else {
      u.f=f;var ox,oy,e,a;
      if(f<.3){e=f/.3;e=1-(1-e)*(1-e);ox=u.dx*e;oy=u.dy*e}
      else if(f<.7){a=(f-.3)/.4*6.283;ox=u.dx+(Math.cos(a)-1)*1.3;oy=u.dy+Math.sin(a*2)*.5}
      else{e=(f-.7)/.3;e=e*e*(3-2*e);ox=u.dx*(1-e);oy=u.dy*(1-e)}
      u.wl.rotation.z=fl;u.wr.rotation.z=-fl;
      if(u.legs){u.legs.rotation.x=Math.min(.5,f*2.2)}
      var bank=Math.min(.35,Math.max(-.35,-ox*.06));
      var pitch=f<.3?.2*(1-f/.3):(f>.7?-.15*(f-.7)/.3:0);
      d.position.set(u.x+ox,u.y+oy+Math.sin(f*3.14)*.4,u.z+Math.sin(f*3.14)*1.2);
      d.rotation.set(pitch,u.r+Math.sin(f*6.28)*.5,bank);
     }
    }
    if(!u.f){
     d.position.set(u.x,u.y,u.z);
     d.rotation.set(0,u.r+Math.sin(T*.8+j)*.08,0);
     if(u.legs)u.legs.rotation.x=0;
    }
   });
   clouds.forEach(function(c){c.position.x+=c.userData.v*dt;if(c.position.x>CLOUD_CFG.xMax)c.position.x=CLOUD_CFG.xMin});
   hs.position.y=21.4+Math.sin(T*1.6)*.15;pbs.material.map=(T%5<2.5)?bt1:bt2;tbs.material.map=(T%4<2)?tb1:tb2;disco.rotation.y=T*.8;
   notes.forEach(function(s){var f=((T*.6+s.userData.k*.25)%1);s.position.y=-51+f*5;s.material.opacity=1-f});
   pl.t+=dt;if(pl.t>12){pl.t=0;pl.sx=cam.position.x-24;pl.sy=cam.position.y+2+Math.random()*6}
   var u2=pl.t/5,px=pl.sx+u2*52,py=pl.sy+u2*5.2,len=u2<1?Math.min(16,px-pl.sx):Math.max(0,16-(u2-1)*30),ex=u2<1?px:pl.sx+52,ey=u2<1?py:pl.sy+5.2;
   pln.visible=u2<1;pln.position.set(px,py,-4);tr1.visible=tr2.visible=len>.05;tr1.scale.x=tr2.scale.x=Math.max(.01,len);
   tr1.position.set(ex-len/2,ey-len*.05,-4);tr2.position.set(ex-len/2,ey-len*.05-.18,-4);tr1.rotation.z=tr2.rotation.z=.1}
  var nn=Math.min(1,Math.max(0,(cur-.3)/.6));nn=nn*nn*(3-2*nn);pm.uniforms.n.value=nn;hemi.intensity=1.05-.5*nn;dl.intensity=.7-.35*nn;stars.material.opacity=nn*(reduce?.9:.7+.3*Math.sin(T*3));
  R.setRenderTarget(rt);R.render(S,cam);R.setRenderTarget(null);R.render(ps,pc);
  if(stats)stats.end();
  requestAnimationFrame(frame)}
 requestAnimationFrame(frame);
}
})();
