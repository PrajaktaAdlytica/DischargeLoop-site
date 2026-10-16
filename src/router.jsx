import React,{createContext,useContext,useEffect,useLayoutEffect,useState} from 'react';
const Routing=createContext(null);
const aliases={'/pricing':'/pilot#commercial-model','/results':'/evidence','/about':'/company','/integrations':'/integration-readiness','/trust':'/oversight','/security':'/oversight','/privacy':'/legal/privacy','/terms':'/legal/terms'};
export function Router({children}){
 const [location,setLocation]=useState(()=>({path:window.location.pathname.replace(/\/$/,'')||'/',search:window.location.search,hash:window.location.hash}));const [motion,setMotion]=useState(true),[reduced,setReduced]=useState(()=>matchMedia('(prefers-reduced-motion: reduce)').matches);
 useEffect(()=>{const media=matchMedia('(prefers-reduced-motion: reduce)');const update=()=>setReduced(media.matches);update();media.addEventListener('change',update);return()=>media.removeEventListener('change',update)},[]);
 const read=()=>setLocation({path:window.location.pathname.replace(/\/$/,'')||'/',search:window.location.search,hash:window.location.hash});
 useEffect(()=>{window.addEventListener('popstate',read);return()=>window.removeEventListener('popstate',read)},[]);
 function navigate(to,{replace=false}={}){to=aliases[to]||to;const url=new URL(to,window.location.origin);if(url.origin!==window.location.origin){window.location.assign(to);return}history[replace?'replaceState':'pushState'](null,'',url.pathname+url.search+url.hash);read()}
 useLayoutEffect(()=>{if(aliases[location.path]){navigate(aliases[location.path],{replace:true});return}const id=location.hash.slice(1);const target=id&&document.getElementById(id);if(target)target.scrollIntoView({behavior:'instant',block:'start'});else window.scrollTo({top:0,behavior:'instant'});document.querySelector('main')?.focus({preventScroll:true})},[location.path,location.search]);
 return <Routing.Provider value={{...location,navigate,motion,setMotion,reduced,still:!motion||reduced}}>{children}</Routing.Provider>
}
export function useSite(){return useContext(Routing)}
export function SiteLink({to,href,children,onClick,...props}){const site=useSite();const destination=to||href||'/';return <a href={destination} {...props} onClick={e=>{onClick?.(e);if(e.defaultPrevented||e.button!==0||e.metaKey||e.ctrlKey||e.altKey||e.shiftKey||props.target==='_blank')return;if(destination.startsWith('http')&&!destination.startsWith(window.location.origin))return;e.preventDefault();if(destination.startsWith('#')){document.getElementById(destination.slice(1))?.scrollIntoView({behavior:site.still?'instant':'smooth'});history.replaceState(null,'',destination)}else site.navigate(destination)}}>{children}</a>}
