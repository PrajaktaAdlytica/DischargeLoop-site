import React,{useLayoutEffect,useRef,useState} from 'react';

// Every chapter sits on this shared canvas. Scroll changes the whole canvas,
// rather than exposing independently painted section rectangles.
const chapterColors=[
 ['#intro','#174D50',0],
 ['#discharge','#102D3A',0],['#handoffs','#174D50',.2],
 ['#owners','#1D5555',.3],['#review','#102D3A',.3],
 ['.suite-bridge','#102D3A',.3],['#products','#2A6260',.2],
 ['#platform','#B8CFC3',.25],['#teams','#174D50',.25],
 ['#oversight','#102D3A',.2],['#evaluation','#285D5B',.1],
 ['#pilot','#173F47',.25],['#company','#214F50',.25],
 ['#faq','#ACC7BB',.25],['#next','#174D50',.2],['.hp-footer','#102D3A',.2]
];
const rgb=hex=>[1,3,5].map(i=>parseInt(hex.slice(i,i+2),16));
const luminance=c=>c.reduce((s,v,i)=>{v/=255;return s+(v<=.04045?v/12.92:((v+.055)/1.055)**2.4)*[.2126,.7152,.0722][i]},0);
const contrast=(a,b)=>(Math.max(luminance(a),luminance(b))+.05)/(Math.min(luminance(a),luminance(b))+.05);
// Layout offsets ignore reveal transforms and sticky displacement.
function position(el,main){let x=0,y=0;for(let n=el;n&&n!==main;n=n.offsetParent){x+=n.offsetLeft;y+=n.offsetTop}return{x,y}}
function roundPath(points,radius=38){if(!points.length)return '';let d=`M${points[0].x} ${points[0].y}`;for(let i=1;i<points.length-1;i++){const a=points[i-1],b=points[i],c=points[i+1],ab=Math.hypot(b.x-a.x,b.y-a.y),bc=Math.hypot(c.x-b.x,c.y-b.y);const r=Math.min(radius,ab/2,bc/2);const before={x:b.x+(a.x-b.x)*r/ab,y:b.y+(a.y-b.y)*r/ab};const after={x:b.x+(c.x-b.x)*r/bc,y:b.y+(c.y-b.y)*r/bc};d+=` L${before.x} ${before.y} Q${b.x} ${b.y} ${after.x} ${after.y}`;}const end=points.at(-1);return d+` L${end.x} ${end.y}`}

export function JourneyCanvas({still,mode='home'}){
 const path=useRef(null),tip=useRef(null),root=useRef(null);const[layout,setLayout]=useState(null);
 useLayoutEffect(()=>{
  const app=document.querySelector('.app'),main=document.querySelector('main');let frame,disposed=false,stops=[],length=0;
  const paint=()=>{
   frame=undefined;if(disposed)return;const scroll=window.scrollY;const progress=Math.min(1,scroll/Math.max(1,main.offsetHeight-innerHeight));app.style.setProperty('--tide-shift',still?'0%':`${Math.sin(progress*Math.PI*4)*13}%`);app.style.setProperty('--tide-rise',still?'0%':`${Math.cos(progress*Math.PI*3)*8}%`);let color=rgb('#102D3A');
   if(!still&&stops.length){let i=0;while(i<stops.length-2&&scroll>stops[i+1].y)i++;const a=stops[i],b=stops[Math.min(i+1,stops.length-1)];const t=Math.max(0,Math.min(1,(scroll-a.y)/Math.max(1,b.y-a.y)));const base=a.intro?a.rgb.map((v,j)=>v+(rgb('#102D3A')[j]-v)*Math.max(0,Math.min(1,Number(app.dataset.introProgress||0)))):a.rgb;color=base.map((v,j)=>Math.round(v+(b.rgb[j]-v)*t));}
   const paper=rgb('#F5F1E7'),ink=rgb('#102D3A');let fg=contrast(paper,color)>contrast(ink,color)?paper:ink;if(contrast(fg,color)<4.5)fg=luminance(color)>.179?[0,0,0]:[255,255,255];const dark=luminance(fg)>.5;const route=rgb('#E77737');let signal=rgb(dark?'#F4AD78':'#A64116');if(contrast(signal,color)<4.5)signal=fg;let muted=rgb(dark?'#C4D6D0':'#526A70');if(contrast(muted,color)<4.5)muted=fg;
   app.style.setProperty('--world-route',`rgb(${route.join(',')})`);app.style.setProperty('--world-bg',`rgb(${color.join(',')})`);app.style.setProperty('--world-ink',`rgb(${fg.join(',')})`);app.style.setProperty('--world-muted',`rgb(${muted.join(',')})`);app.style.setProperty('--world-rule',dark?'#FFFFFF38':'#102D3A35');app.style.setProperty('--world-signal',`rgb(${signal.join(',')})`);app.dataset.worldTone=dark?'dark':'light';
   const p=path.current;if(p){if(!length)length=p.getTotalLength();const mainY=main.getBoundingClientRect().top+scroll;const frontier=still?Infinity:scroll+innerHeight*.82-mainY;let lo=0,hi=length;if(!still)for(let i=0;i<15;i++){const mid=(lo+hi)/2;if(p.getPointAtLength(mid).y<frontier)lo=mid;else hi=mid}const drawn=still?length:(lo+hi)/2;p.style.strokeDasharray=`${length}`;p.style.strokeDashoffset=`${length-drawn}`;const end=p.getPointAtLength(drawn);if(tip.current){tip.current.setAttribute('cx',end.x);tip.current.setAttribute('cy',end.y);tip.current.style.opacity=frontier<Number(p.dataset.startY)?'0':'1'}root.current?.querySelectorAll('[data-node-y]').forEach(n=>{n.style.opacity=still||Number(n.dataset.nodeY)<=frontier?'1':'.15';});}
  };
  const queue=()=>{if(frame===undefined)frame=requestAnimationFrame(paint)};
  const measure=()=>{
   if(disposed)return;
   const sceneNodes=mode==='inner'?[...main.querySelectorAll('[data-scene]')]:[];
   stops=mode==='inner'?sceneNodes.map(el=>({y:Math.max(0,el.getBoundingClientRect().top+scrollY-innerHeight*.22),rgb:rgb(el.dataset.scene)})):chapterColors.map(([selector,hex,offset])=>{const el=document.querySelector(selector);return el?{y:Math.max(0,el.getBoundingClientRect().top+scrollY-innerHeight*offset),rgb:rgb(hex),intro:selector==='#intro'}:null}).filter(Boolean);
   stops.sort((a,b)=>a.y-b.y);
   const origin=document.querySelector(mode==='inner'?'.route-origin':'.hero-route circle:last-child'),bridge=document.querySelector('.suite-bridge'),footer=document.querySelector('.hp-footer');if(!origin||!footer||(mode==='home'&&!bridge)){queue();return}
   const m=main.getBoundingClientRect(),o=origin.getBoundingClientRect(),s={x:o.left+o.width/2-m.left,y:o.top+o.height/2-m.top};const width=main.clientWidth,left=width<801?12:Math.max(28,(width-1440)/2+36),right=width<801?width-12:Math.min(width-25,(width+1440)/2-25);const end=position(footer,main).y+footer.offsetHeight-60;
   let points;if(mode==='inner')points=[s,{x:left,y:s.y},{x:left,y:end}];else{const bp=position(bridge,main),by=bp.y+bridge.offsetHeight-70;points=[s,{x:s.x,y:s.y+100},{x:right,y:s.y+100},{x:right,y:by},{x:left,y:by},{x:left,y:end}];}
   const selectors=mode==='inner'?'[data-route-anchor]':'.hp-section-number,#company .company-layout>div:first-child>.eyebrow,.faq-intro>.eyebrow,.final-topline,.footer-brand-row';
   const anchors=[...main.querySelectorAll(selectors)].map(el=>{const p=position(el,main);return{x:p.x,y:p.y+Math.min(el.offsetHeight,30)/2}});
   const introExit=main.querySelector('.intro-route-exit'),heroOrigin=main.querySelector('.origin-dot');let introD='';
   if(mode==='home'&&introExit&&heroOrigin){const a=introExit.getBoundingClientRect(),b=heroOrigin.getBoundingClientRect(),start={x:a.left-m.left,y:a.top-m.top},finish={x:b.left+b.width/2-m.left,y:b.top+b.height/2-m.top};const prelude=width<801?[start,{x:start.x,y:finish.y},finish]:[start,{x:start.x,y:finish.y-44},{x:finish.x,y:finish.y-44},finish];introD=roundPath(prelude,width<801?12:28)}
   const next={introD,width,height:main.offsetHeight,d:roundPath(points,width<801?24:42),startY:s.y,left,nodes:anchors};setLayout(old=>JSON.stringify(old)===JSON.stringify(next)?old:next);length=0;queue();
  };
  const observer=new ResizeObserver(measure);observer.observe(main);document.querySelectorAll('main>div,main section').forEach(el=>observer.observe(el));window.addEventListener('scroll',queue,{passive:true});window.addEventListener('resize',measure);document.addEventListener('dischargeloop:route-ready',measure);document.addEventListener('dischargeloop:intro-frame',queue);document.fonts.ready.then(measure);measure();
  return()=>{disposed=true;cancelAnimationFrame(frame);observer.disconnect();window.removeEventListener('scroll',queue);window.removeEventListener('resize',measure);document.removeEventListener('dischargeloop:route-ready',measure);document.removeEventListener('dischargeloop:intro-frame',queue);['--world-route','--world-bg','--world-ink','--world-muted','--world-rule','--world-signal','--tide-shift','--tide-rise'].forEach(k=>app.style.removeProperty(k));delete app.dataset.worldTone};
 },[still,mode]);
 useLayoutEffect(()=>{if(layout)window.dispatchEvent(new Event('scroll'))},[layout]);
 return layout?<svg ref={root} className="page-journey-route" width={layout.width} height={layout.height} viewBox={`0 0 ${layout.width} ${layout.height}`} aria-hidden="true">{layout.introD&&<path className="page-intro-route" d={layout.introD}/>}<path className="page-route-track" d={layout.d}/><path ref={path} className="page-route-main" data-start-y={layout.startY} d={layout.d}/>{layout.nodes.map((n,i)=><g key={i} data-node-y={n.y}><path className="page-route-branch" d={`M${layout.left} ${n.y}H${Math.max(layout.left,n.x-8)}`}/><circle className="page-route-node" cx={layout.left} cy={n.y} r="4"/></g>)}<circle ref={tip} className="page-route-tip" r="4"/></svg>:null;
}
