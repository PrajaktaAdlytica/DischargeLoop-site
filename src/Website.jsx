import React from 'react';
import {Router,useSite} from './router';
import {App} from './App';
import {modules,articleData} from './siteData';
import {ProductsPage,ProductPage} from './ProductPages';
import {WhyPage,PlatformPage,HowPage,SolutionsPage,BuyerPage,PilotPage,EvidencePage,OversightPage,IntegrationPage,CompanyPage} from './StoryPages';
import {DemoPage} from './DemoPage';
import {RequestPage,SignInPage} from './RequestPages';
import {ResourcesPage,ArticlePage,LegalPage,AccessibilityPage,NotFoundPage} from './ReadingPages';
const pages={'/why-handoffs-break':WhyPage,'/products':ProductsPage,'/platform':PlatformPage,'/how-it-works':HowPage,'/solutions':SolutionsPage,'/pilot':PilotPage,'/evidence':EvidencePage,'/oversight':OversightPage,'/integration-readiness':IntegrationPage,'/company':CompanyPage,'/demo':DemoPage,'/resources':ResourcesPage,'/accessibility':AccessibilityPage};
function RouteView(){const{path}=useSite();let page;if(path==='/')page=<App/>;else if(pages[path]){const Page=pages[path];page=<Page/>}else if(path.startsWith('/products/discharge-')&&modules.some(m=>path==='/products/discharge-'+m.id))page=<ProductPage id={path.split('discharge-')[1]}/>;else if(path==='/solutions/hospital-transitions')page=<BuyerPage/>;else if(path==='/solutions/aco-population-health')page=<BuyerPage aco/>;else if(path==='/request-audit')page=<RequestPage type="audit"/>;else if(path==='/request-demo')page=<RequestPage type="demo"/>;else if(path==='/request-pilot')page=<RequestPage type="pilot"/>;else if(path==='/contact')page=<RequestPage type="contact"/>;else if(path==='/sign-in')page=<SignInPage/>;else if(path==='/sign-in/help')page=<SignInPage help/>;else if(path==='/legal/privacy')page=<LegalPage kind="privacy"/>;else if(path==='/legal/terms')page=<LegalPage kind="terms"/>;else if(path.startsWith('/resources/')&&articleData[path.split('/')[2]])page=<ArticlePage id={path.split('/')[2]}/>;else page=<NotFoundPage/>;return <React.Fragment key={path}>{page}</React.Fragment>}
export function Website(){return <Router><RouteView/></Router>}
