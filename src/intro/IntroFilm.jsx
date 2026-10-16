import React,{useEffect,useLayoutEffect,useMemo,useRef,useState} from 'react';
import {Player} from '@remotion/player';
import {ArrowDown,Pause,Play,ArrowCounterClockwise} from '@phosphor-icons/react';
import {LedgerFilm,filmDuration,filmFps,ledgerGeometry} from './LedgerFilm';
import {useSite} from '../router';

export default function IntroFilm({still,onContinue}){
 const {motion,setMotion,reduced}=useSite();
 const root=useRef(null),stage=useRef(null),player=useRef(null),userPaused=useRef(false),complete=useRef(false),visible=useRef(false);
 const[size,setSize]=useState({width:1440,height:760});const[frame,setFrame]=useState(still?359:0),[playing,setPlaying]=useState(false),[ended,setEnded]=useState(still),[ready,setReady]=useState(false);
 const inputProps=useMemo(()=>({embedded:true,still}),[still]);
 useLayoutEffect(()=>{const el=stage.current;const measure=()=>{const width=Math.round(el.clientWidth),height=Math.round(el.clientHeight);if(width&&height)setSize(v=>v.width===width&&v.height===height?v:{width,height});document.dispatchEvent(new Event('dischargeloop:route-ready'))};const ro=new ResizeObserver(measure);ro.observe(el);measure();return()=>ro.disconnect()},[]);
 useEffect(()=>{let disposed=false;document.fonts.ready.then(()=>{if(!disposed)setReady(true)});return()=>{disposed=true}},[]);
 useEffect(()=>{
  const p=player.current;if(!p)return;
  const tick=e=>{setFrame(e.detail.frame);const progress=Math.max(.24,Math.min(1,(e.detail.frame-275)/65));const app=root.current?.closest('.app');app?.style.setProperty('--intro-connected',String(still?1:progress));if(app)app.dataset.introProgress=String(e.detail.frame/359);document.dispatchEvent(new Event('dischargeloop:intro-frame'))};
  const play=()=>setPlaying(true),pause=()=>setPlaying(false),end=()=>{complete.current=true;setEnded(true);setPlaying(false);setFrame(359)};
  p.addEventListener('frameupdate',tick);p.addEventListener('play',play);p.addEventListener('pause',pause);p.addEventListener('ended',end);
  return()=>{p.removeEventListener('frameupdate',tick);p.removeEventListener('play',play);p.removeEventListener('pause',pause);p.removeEventListener('ended',end)};
 },[still]);
 useEffect(()=>{
  const p=player.current;if(!p)return;
  if(still){p.pause();p.seekTo(359);complete.current=true;setEnded(true);setFrame(359);root.current?.closest('.app')?.style.setProperty('--intro-connected','1');return}
  const update=()=>{const canPlay=visible.current&&ready&&!document.hidden&&!userPaused.current&&!complete.current;if(canPlay)p.play();else p.pause()};
  const io=new IntersectionObserver(([entry])=>{visible.current=entry.isIntersecting&&entry.intersectionRatio>.2;update()},{threshold:[0,.2,.5]});io.observe(stage.current);document.addEventListener('visibilitychange',update);update();return()=>{io.disconnect();document.removeEventListener('visibilitychange',update);p.pause()};
 },[ready,still]);
 useEffect(()=>()=>{const app=root.current?.closest('.app');if(app){delete app.dataset.introProgress;app.style.removeProperty('--intro-connected')}},[]);
 function toggle(){const p=player.current;if(!p||still)return;if(ended){p.seekTo(0);complete.current=false;setEnded(false);userPaused.current=false;p.play()}else if(p.isPlaying()){userPaused.current=true;p.pause()}else{userPaused.current=false;p.play()}}
 function seek(e){userPaused.current=true;player.current?.pause();const next=Number(e.target.value);player.current?.seekTo(next);complete.current=next===359;setEnded(next===359);setFrame(next)}
 function skip(){userPaused.current=true;player.current?.pause();player.current?.seekTo(359);complete.current=true;setEnded(true);onContinue();document.getElementById('discharge')?.focus({preventScroll:true})}
 const g=ledgerGeometry(size.width,size.height),seconds=still||ended?12:Math.floor(frame/filmFps);
 return <section id="intro" ref={root} className="intro-film" aria-label="DischargeLoop introduction">
  <p className="sr-only">A 12-second introduction. Mira has been discharged, and four handoffs remain open: appointment confirmation, pharmacy pickup, contact and a source-list difference. Each has a responsible reviewer. No action is performed.</p>
  <div ref={stage} className="intro-film-stage" aria-hidden="true">
   <Player ref={player} component={LedgerFilm} durationInFrames={filmDuration} fps={filmFps} compositionWidth={size.width} compositionHeight={size.height} inputProps={inputProps} initialFrame={still?359:0} controls={false} autoPlay={false} loop={false} moveToBeginningWhenEnded={false} initiallyMuted numberOfSharedAudioTags={0} clickToPlay={false} doubleClickToFullscreen={false} spaceKeyToPlayOrPause={false} style={{width:'100%',height:'100%'}} errorFallback={()=> <div className="intro-load-title">Discharged.<span>Still four handoffs open.</span></div>}/>
   <span className="intro-route-exit" style={{left:g.exitX,top:size.height}}/>
  </div>
  <div className="intro-film-controls">
   <span className="intro-film-caption">{still?'The complete story, at rest.':ended?'Four handoffs. Still open.':frame>210?'Every next step needs an owner.':frame>90?'Four questions stay open.':'A moment in time. A handoff in motion.'}</span>
   <div className="intro-transport"><button className="intro-play" onClick={toggle} disabled={still} aria-label={ended?'Replay intro':playing?'Pause intro':'Play intro'}>{ended?<ArrowCounterClockwise size={15}/>:playing?<Pause size={15}/>:<Play size={15}/>}<span>{still?'Still view':ended?'Replay':playing?'Pause':'Play'}</span></button><input className="intro-timeline" type="range" min="0" max="359" step="1" value={still?359:frame} onChange={seek} disabled={still} aria-label="Intro timeline" aria-valuetext={`${seconds} of 12 seconds`} style={{'--intro-progress':`${(still?1:frame/359)*100}%`}}/><span className="intro-time" aria-hidden="true">00:{String(seconds).padStart(2,'0')} / 00:12</span></div>
   <div className="intro-end-actions"><button className="intro-still" onClick={()=>setMotion(!motion)} disabled={reduced}>{reduced?'Reduced motion':still?'Enable motion':'Use still view'}</button><button className="intro-skip" onClick={skip}>Follow Mira’s journey<ArrowDown size={17}/></button></div>
  </div>
 </section>;
}
