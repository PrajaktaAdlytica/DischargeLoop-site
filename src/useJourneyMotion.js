import {useLayoutEffect} from 'react';
import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Motion follows the evidence: an input arrives, its context assembles, then
// the responsible role is revealed. No animation changes a seeded case state.
export function useJourneyMotion(ref,still){
 useLayoutEffect(()=>{
  if(still)return;
  const ctx=gsap.context(()=>{
   const compact=matchMedia('(max-width:800px)').matches;
   const groups=[
    '.instrument-rail','.source-pair','.referral-stages','.packet-timeline',
    '.input-contract','.principle-list','.readiness-contract','.learning-routes',
    '.oversight-principles','.pilot-path','.review-steps','.alternative-ledger',
    '.resource-directory','.readiness-numbers','.full-scorecard tbody'
   ];
   gsap.utils.toArray(groups.join(',')).forEach(group=>{
    const children=[...group.children];
    gsap.from(children,{y:compact?12:22,opacity:.4,duration:.65,stagger:Math.min(.11,.55/Math.max(1,children.length)),ease:'power3.out',scrollTrigger:{trigger:group,start:'top 88%',once:true}});
   });
   gsap.utils.toArray('.instrument-rail,.packet-timeline').forEach(el=>{
    gsap.fromTo(el,{'--rail-reveal':0},{'--rail-reveal':1,duration:1.4,ease:'power2.inOut',scrollTrigger:{trigger:el,start:'top 86%',once:true}});
   });
   // A bounded perspective shift while a product frame enters; reading areas
   // and controls stay still. Mobile gets a smaller, purely vertical movement.
   gsap.utils.toArray('.page-hero-visual').forEach(el=>{
    gsap.fromTo(el,{y:compact?12:32,scale:compact?1:.975},{y:compact?-8:-22,scale:1,ease:'none',scrollTrigger:{trigger:el,start:'top bottom',end:'bottom top',scrub:.7}});
   });
   gsap.utils.toArray('.scatter-note').forEach((el,i)=>{
    gsap.from(el,{x:(i%2?1:-1)*(compact?15:45),y:18,opacity:.3,duration:.9,delay:.12*i,ease:'power3.out',scrollTrigger:{trigger:el.closest('.scattered-handoffs'),start:'top 88%',once:true}});
   });
   gsap.utils.toArray('.loop-seal').forEach(el=>{
    gsap.from(el.querySelectorAll('.seal-label,p'),{y:12,opacity:.2,duration:.65,stagger:.15,scrollTrigger:{trigger:el,start:'top 86%',once:true}});
   });
   gsap.utils.toArray('.source-strip,.article-evidence,.evidence-status>div').forEach(el=>{
    gsap.from(el,{x:compact?10:24,duration:.7,ease:'power3.out',scrollTrigger:{trigger:el,start:'top 90%',once:true}});
   });
   // The home episode's branches remain measured against stationary anchors.
   if(ref.current.querySelector('.hero-copy')){gsap.from('.hero-copy h1',{y:18,opacity:.65,duration:.8,ease:'power3.out'});
   gsap.from('.hero-copy .lead,.hero-copy .hero-actions,.hero-shortcuts',{y:14,opacity:.5,duration:.65,stagger:.1,delay:.12,ease:'power3.out'});}
  },ref);
  return()=>ctx.revert();
 },[ref,still]);
}
