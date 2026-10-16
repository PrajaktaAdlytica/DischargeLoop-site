import React from 'react';
import {AbsoluteFill,Easing,Freeze,Img,Sequence,interpolate,interpolateColors,staticFile,useCurrentFrame,useVideoConfig} from 'remotion';
import {loadFont} from '@remotion/fonts';

loadFont({family:'Ledger Newsreader',url:staticFile('brand/fonts/newsreader-variable.woff2'),weight:'200 800'});
loadFont({family:'Ledger Sans',url:staticFile('brand/fonts/sourcesans3-variable.woff2'),weight:'200 900'});

const serif='"Ledger Newsreader", Georgia, serif';
const sans='"Ledger Sans", Arial, sans-serif';
const colors={paper:'#F5F1E7',muted:'#B7CDC5',orange:'#E77737',ink:'#102D3A',teal:'#174D50'};
const clamp={extrapolateLeft:'clamp',extrapolateRight:'clamp'};
const ease={...clamp,easing:Easing.bezier(.16,1,.3,1)};
export const filmDuration=360;
export const filmFps=30;
export const handoffs=[
 {label:'PCP appointment',status:'Pending',owner:'Care coordinator'},
 {label:'Pharmacy pickup',status:'Unconfirmed',owner:'Transitions pharmacist'},
 {label:'Contact attempt',status:'No answer',owner:'Transitions RN'},
 {label:'Medication-list difference',status:'Pharmacist review',owner:'Clinical pharmacist'},
];

export function ledgerGeometry(width,height){
 const compact=width<850,s=compact?width/780:width/1920;
 const safe=compact?48*s:72*s;
 const railX=compact?48*s:width*.635;
 const firstY=compact?height*.45:height*.29;
 const rowHeight=compact?Math.min(126*s,height*.115):Math.min(144*s,height*.132);
 return {compact,s,safe,railX,firstY,rowHeight,nodeOffset:(compact?26:21)*s,lastY:firstY+rowHeight*3,exitX:compact?12:Math.min(width-25,(width+1440)/2-25)};
}

function rounded(points,r){
 let d=`M${points[0][0]} ${points[0][1]}`;
 for(let i=1;i<points.length-1;i++){
  const a=points[i-1],b=points[i],c=points[i+1],ab=Math.hypot(b[0]-a[0],b[1]-a[1]),bc=Math.hypot(c[0]-b[0],c[1]-b[1]),v=Math.min(r,ab/2,bc/2);
  if(!ab||!bc)continue;
  d+=` L${b[0]+(a[0]-b[0])*v/ab} ${b[1]+(a[1]-b[1])*v/ab} Q${b[0]} ${b[1]} ${b[0]+(c[0]-b[0])*v/bc} ${b[1]+(c[1]-b[1])*v/bc}`;
 }
 return d+` L${points.at(-1)[0]} ${points.at(-1)[1]}`;
}

export function LedgerTitle(){
 const frame=useCurrentFrame(),{fps,width,height}=useVideoConfig(),g=ledgerGeometry(width,height);
 return <div style={{position:'absolute',left:g.safe,top:g.compact?height*.075:height*.22,width:g.compact?width-g.safe*2:width*.57,color:colors.paper,fontFamily:serif}}>
  <div style={{fontFamily:sans,fontSize:(g.compact?18:18)*g.s,letterSpacing:'.18em',textTransform:'uppercase',color:colors.muted,marginBottom:(g.compact?27:42)*g.s}}>One synthetic episode. Four open handoffs.</div>
  <div style={{fontSize:(g.compact?132:234)*g.s,lineHeight:1.03,fontWeight:450,letterSpacing:'-.055em',whiteSpace:'nowrap',translate:`0 ${interpolate(frame,[0,1.3*fps],[48*g.s,0],ease)}px`,opacity:interpolate(frame,[0,.8*fps],[.25,1],ease)}}>Discharged.</div>
  <div style={{fontSize:(g.compact?57:86)*g.s,lineHeight:1.12,fontWeight:450,letterSpacing:'-.035em',marginTop:24*g.s,maxWidth:g.compact?'95%':'96%',translate:`0 ${interpolate(frame,[1.2*fps,2.6*fps],[32*g.s,0],ease)}px`,opacity:interpolate(frame,[1.2*fps,2.4*fps],[0,1],ease)}}>Still four handoffs open.</div>
  {!g.compact&&<div style={{marginTop:44*g.s,display:'flex',gap:24*g.s,alignItems:'center',opacity:interpolate(frame,[2.4*fps,3.2*fps],[0,1],ease)}}><span style={{width:70*g.s,height:2,background:colors.orange}}/><span style={{fontFamily:sans,fontSize:19*g.s,letterSpacing:'.15em',color:colors.muted,textTransform:'uppercase'}}>An event is not a completed handoff.</span></div>}
 </div>;
}

export function EpisodeMeta(){
 const frame=useCurrentFrame(),{fps,width,height}=useVideoConfig(),g=ledgerGeometry(width,height);
 const date='Monday 05 Oct 2026 · 14:00';
 const count=Math.floor(interpolate(frame,[2.5*fps,3.9*fps],[0,date.length],clamp));
 return <div style={{position:'absolute',left:g.compact?g.safe:g.railX,top:g.firstY-(g.compact?109:118)*g.s,color:colors.paper,fontFamily:sans,opacity:interpolate(frame,[2.3*fps,3.1*fps],[0,1],ease)}}>
  <div style={{fontFamily:serif,fontSize:(g.compact?34:34)*g.s,lineHeight:1.2}}>Mira Vale <span style={{fontFamily:sans,fontSize:23*g.s,marginLeft:12*g.s,color:colors.muted}}>/ DL-001</span></div>
  <div style={{fontSize:Math.max(12,(g.compact?25:24)*g.s),color:colors.muted,marginTop:12*g.s,minHeight:32*g.s,fontVariantNumeric:'tabular-nums'}}>{date.slice(0,count)}</div>
 </div>;
}

export function HandoffLedger(){
 const frame=useCurrentFrame(),{fps,width,height}=useVideoConfig(),g=ledgerGeometry(width,height);
 const turnY=height-(g.compact?38:72)*g.s;
 const tail=rounded([[g.railX,g.lastY+g.nodeOffset],[g.railX,turnY],[g.exitX,turnY],[g.exitX,height]],36*g.s);
 return <>
  <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{position:'absolute',inset:0,overflow:'visible'}} aria-hidden="true">
   <path d={`M${g.railX} ${g.firstY+g.nodeOffset} V${g.lastY+g.nodeOffset}`} fill="none" stroke={colors.orange} strokeWidth={g.compact?1.8:2} pathLength="1" strokeDasharray="1" strokeDashoffset={interpolate(frame,[3.1*fps,7.1*fps],[1,0],clamp)}/>
   <path d={tail} fill="none" stroke={colors.orange} strokeWidth={g.compact?1.8:2} pathLength="1" strokeDasharray="1" strokeDashoffset={interpolate(frame,[9.5*fps,11.65*fps],[1,0],ease)}/>
   {handoffs.map((item,i)=><rect key={item.label} x={g.railX-6*g.s} y={g.firstY+i*g.rowHeight+g.nodeOffset-6*g.s} width={12*g.s} height={12*g.s} fill={colors.orange} opacity={interpolate(frame,[(3.5+i*.7)*fps,(3.9+i*.7)*fps],[0,1],ease)}/>)}
  </svg>
  {handoffs.map((item,i)=><div key={item.label} data-film-row={i+1} style={{position:'absolute',left:g.railX+30*g.s,right:g.safe,top:g.firstY+i*g.rowHeight-17*g.s,height:g.rowHeight,display:'grid',gridTemplateColumns:g.compact?`1fr ${170*g.s}px`:'.63fr .37fr',columnGap:24*g.s,borderTop:'1px solid #C4D6D02B',paddingTop:19*g.s,translate:`${interpolate(frame,[(3.4+i*.7)*fps,(4.35+i*.7)*fps],[34*g.s,0],ease)}px 0`,opacity:interpolate(frame,[(3.4+i*.7)*fps,(4.15+i*.7)*fps],[0,1],ease),color:colors.paper,fontFamily:sans}}>
   <div style={{minWidth:0}}><div style={{fontFamily:serif,fontSize:(g.compact?39:34)*g.s,lineHeight:1.12,fontWeight:450,letterSpacing:'-.018em'}}>{item.label}</div>{g.compact?<div style={{fontSize:Math.max(12,27*g.s),lineHeight:1.25,color:colors.muted,marginTop:8*g.s,opacity:interpolate(frame,[(7.1+i*.12)*fps,(7.8+i*.12)*fps],[0,1],ease)}}>{item.owner}</div>:<div style={{fontFamily:serif,fontSize:29*g.s,color:'#F3A16A',lineHeight:1.2,marginTop:8*g.s}}>{item.status}</div>}</div>
   {g.compact?<div style={{fontSize:Math.max(13,28*g.s),color:'#F3A16A',lineHeight:1.25,textAlign:'right',paddingTop:3*g.s}}>{item.status}</div>:<div style={{fontSize:Math.max(12,21*g.s),lineHeight:1.3,color:colors.muted,opacity:interpolate(frame,[(7.1+i*.12)*fps,(7.8+i*.12)*fps],[0,1],ease)}}><span style={{display:'block',fontSize:Math.max(8,13*g.s),textTransform:'uppercase',letterSpacing:'.18em',marginBottom:7*g.s}}>Next owner</span>{item.owner}</div>}
  </div>)}
 </>;
}

export function ContinuationCaption(){
 const frame=useCurrentFrame(),{fps,width,height}=useVideoConfig(),g=ledgerGeometry(width,height);
 if(!g.compact&&height/width<.53)return null;
 return <div style={{position:'absolute',left:g.compact?g.safe+30*g.s:g.safe,bottom:(g.compact?22:87)*g.s,maxWidth:g.compact?width-g.safe*2:width*.5,color:colors.muted,fontFamily:sans,opacity:interpolate(frame,[8.7*fps,10*fps],[0,1],ease),translate:`0 ${interpolate(frame,[8.7*fps,10*fps],[16*g.s,0],ease)}px`}}>
  <div style={{fontFamily:serif,fontSize:(g.compact?31:48)*g.s,lineHeight:1.15,color:colors.paper,fontWeight:450}}>The next step needs an owner.</div>
  {!g.compact&&<div style={{fontSize:18*g.s,marginTop:16*g.s,letterSpacing:'.04em'}}>The evidence stays open. The story continues below.</div>}
 </div>;
}

export function LedgerFilm({embedded=false,still=false}){
 const frame=useCurrentFrame(),{fps,width,height}=useVideoConfig(),g=ledgerGeometry(width,height);
 if(still)return <Freeze frame={359}><LedgerFilm embedded={embedded}/></Freeze>;
 return <AbsoluteFill data-ledger-film="true" style={{backgroundColor:embedded?'transparent':interpolateColors(frame,[0,11.5*fps],[colors.teal,colors.ink]),overflow:'hidden',fontFamily:sans,color:colors.paper}}>
  {!embedded&&<Img src={staticFile('brand/logos/logo-reverse.svg')} style={{position:'absolute',left:g.safe,top:42*g.s,width:(g.compact?280:320)*g.s}}/>}
  <div style={{position:'absolute',right:g.safe,top:43*g.s,fontSize:(g.compact?16:17)*g.s,letterSpacing:'.16em',color:colors.muted}}>CONCEPT PREVIEW · SYNTHETIC DATA</div>
  <Sequence name="The event / kinetic typography" from={0} durationInFrames={12*fps} premountFor={fps}><LedgerTitle/></Sequence>
  <Sequence name="Mira / attributed event" from={0} durationInFrames={12*fps} premountFor={fps}><EpisodeMeta/></Sequence>
  <Sequence name="Four open handoffs / next owners" from={0} durationInFrames={12*fps} premountFor={fps}><HandoffLedger/></Sequence>
  <Sequence name="Continue into the page" from={0} durationInFrames={12*fps} premountFor={fps}><ContinuationCaption/></Sequence>
 </AbsoluteFill>;
}
