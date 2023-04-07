HTMLElement.prototype.wrap=function(e){this.parentNode.insertBefore(e,this),this.parentNode.removeChild(this),e.appendChild(this)},function(){var e=()=>document.dispatchEvent(new Event("page:loaded",{bubbles:!0}));"loading"===document.readyState?document.addEventListener("readystatechange",e,{once:!0}):e(),document.addEventListener("pjax:success",e)}(),NexT.utils={registerExtURL:function(){document.querySelectorAll("span.exturl").forEach(e=>{var t=document.createElement("a");t.href=decodeURIComponent(atob(e.dataset.url).split("").map(e=>"%"+("00"+e.charCodeAt(0).toString(16)).slice(-2)).join("")),t.rel="noopener external nofollow noreferrer",t.target="_blank",t.className=e.className,t.title=e.title,t.innerHTML=e.innerHTML,e.parentNode.replaceChild(t,e)})},registerCopyCode:function(){let e=document.querySelectorAll("figure.highlight");(e=0===e.length?document.querySelectorAll("pre:not(.mermaid)"):e).forEach(n=>{if(n.querySelectorAll(".code .line span").forEach(t=>{t.classList.forEach(e=>{t.classList.replace(e,"hljs-"+e)})}),CONFIG.copycode.enable){let e=n;(e="mac"!==CONFIG.copycode.style?n.querySelector(".table-container")||n:e).insertAdjacentHTML("beforeend",'<div class="copy-btn"><i class="fa fa-copy fa-fw"></i></div>');const o=n.querySelector(".copy-btn");o.addEventListener("click",()=>{var e,t=(n.querySelector(".code")||n.querySelector("code")).innerText;navigator.clipboard?navigator.clipboard.writeText(t).then(()=>{o.querySelector("i").className="fa fa-check-circle fa-fw"},()=>{o.querySelector("i").className="fa fa-times-circle fa-fw"}):((e=document.createElement("textarea")).style.top=window.scrollY+"px",e.style.position="absolute",e.style.opacity="0",e.readOnly=!0,e.value=t,document.body.append(e),e.select(),e.setSelectionRange(0,t.length),e.readOnly=!1,t=document.execCommand("copy"),o.querySelector("i").className=t?"fa fa-check-circle fa-fw":"fa fa-times-circle fa-fw",e.blur(),o.blur(),document.body.removeChild(e))}),n.addEventListener("mouseleave",()=>{setTimeout(()=>{o.querySelector("i").className="fa fa-copy fa-fw"},300)})}})},wrapTableWithBox:function(){document.querySelectorAll("table").forEach(e=>{var t=document.createElement("div");t.className="table-container",e.wrap(t)})},registerVideoIframe:function(){document.querySelectorAll("iframe").forEach(t=>{var e,n,o;["www.youtube.com","player.vimeo.com","player.youku.com","player.bilibili.com","www.tudou.com"].some(e=>t.src.includes(e))&&!t.parentNode.matches(".video-container")&&((e=document.createElement("div")).className="video-container",t.wrap(e),n=Number(t.width),o=Number(t.height),n)&&o&&(e.style.paddingTop=o/n*100+"%")})},updateActiveNav:function(){if(Array.isArray(NexT.utils.sections)){let e=NexT.utils.sections.findIndex(e=>e&&10<e.getBoundingClientRect().top);-1===e?e=NexT.utils.sections.length-1:0<e&&e--,this.activateNavByIndex(e)}},registerScrollPercent:function(){const t=document.querySelector(".back-to-top"),n=document.querySelector(".reading-progress-bar");window.addEventListener("scroll",()=>{var e;(t||n)&&(e=0<(e=document.body.scrollHeight-window.innerHeight)?Math.min(100*window.scrollY/e,100):0,t&&(t.classList.toggle("back-to-top-on",5<=Math.round(e)),t.querySelector("span").innerText=Math.round(e)+"%"),n)&&n.style.setProperty("--progress",e.toFixed(2)+"%"),this.updateActiveNav()},{passive:!0}),t&&t.addEventListener("click",()=>{window.anime({targets:document.scrollingElement,duration:500,easing:"linear",scrollTop:0})})},registerTabsTag:function(){document.querySelectorAll(".tabs ul.nav-tabs .tab").forEach(l=>{l.addEventListener("click",e=>{if(e.preventDefault(),!l.classList.contains("active")){e=l.parentNode;const o=e.nextElementSibling;o.style.overflow="hidden",o.style.transition="height 1s";var t=o.querySelector(".active")||o.firstElementChild,n=parseInt(window.getComputedStyle(t).height.replace("px",""),10)||0;const r=parseInt(window.getComputedStyle(t).paddingTop.replace("px",""),10),i=parseInt(window.getComputedStyle(t.firstElementChild).marginBottom.replace("px",""),10),a=(o.style.height=n+r+i+"px",[...e.children].forEach(e=>{e.classList.toggle("active",e===l)}),document.getElementById(l.querySelector("a").getAttribute("href").replace("#",""))),c=([...a.parentNode.children].forEach(e=>{e.classList.toggle("active",e===a)}),a.dispatchEvent(new Event("tabs:click",{bubbles:!0})),document.body.scrollHeight>(window.innerHeight||document.documentElement.clientHeight));t=parseInt(window.getComputedStyle(o.querySelector(".active")).height.replace("px",""),10);o.style.height=t+r+i+"px",setTimeout(()=>{var e;document.body.scrollHeight>(window.innerHeight||document.documentElement.clientHeight)!=c&&(o.style.transition="height 0.3s linear",e=parseInt(window.getComputedStyle(o.querySelector(".active")).height.replace("px",""),10),o.style.height=e+r+i+"px"),setTimeout(()=>{o.style.transition="",o.style.height=""},250)},1e3),CONFIG.stickytabs&&(n=e.parentNode.getBoundingClientRect().top+window.scrollY+10,window.anime({targets:document.scrollingElement,duration:500,easing:"linear",scrollTop:n}))}})}),window.dispatchEvent(new Event("tabs:register"))},registerCanIUseTag:function(){window.addEventListener("message",({data:e})=>{var t;"string"==typeof e&&e.includes("ciu_embed")&&(t=e.split(":")[1],e=e.split(":")[2],document.querySelector(`iframe[data-feature=${t}]`).style.height=parseInt(e,10)+5+"px")},!1)},registerActiveMenuItem:function(){document.querySelectorAll(".menu-item a[href]").forEach(e=>{var t=e.pathname===location.pathname||e.pathname===location.pathname.replace("index.html",""),n=!CONFIG.root.startsWith(e.pathname)&&location.pathname.startsWith(e.pathname);e.classList.toggle("menu-item-active",e.hostname===location.hostname&&(t||n))})},registerLangSelect:function(){document.querySelectorAll(".lang-select").forEach(e=>{e.value=CONFIG.page.lang,e.addEventListener("change",()=>{const t=e.options[e.selectedIndex];document.querySelectorAll(".lang-select-label span").forEach(e=>{e.innerText=t.text}),window.location.href=t.dataset.href})})},registerSidebarTOC:function(){this.sections=[...document.querySelectorAll(".post-toc:not(.placeholder-toc) li a.nav-link")].map(t=>{const n=document.getElementById(decodeURI(t.getAttribute("href")).replace("#",""));return t.addEventListener("click",e=>{e.preventDefault();e=n.getBoundingClientRect().top+window.scrollY;window.anime({targets:document.scrollingElement,duration:500,easing:"linear",scrollTop:e,complete:()=>{history.pushState(null,document.title,t.href)}})}),n}),this.updateActiveNav()},registerPostReward:function(){var e=document.querySelector(".reward-container button");e&&e.addEventListener("click",()=>{document.querySelector(".post-reward").classList.toggle("active")})},activateNavByIndex:function(n){var o=document.querySelector(".post-toc:not(.placeholder-toc) .nav");if(o){var r=o.querySelectorAll(".nav-item"),n=r[n];if(n&&!n.classList.contains("active-current")){var i=r[r.length-1].offsetHeight;o.querySelectorAll(".active").forEach(e=>{e.classList.remove("active","active-current")}),n.classList.add("active","active-current");let e=n.querySelector(".nav-child")||n.parentElement,t=0;for(;o.contains(e);)e.classList.contains("nav-item")?e.classList.add("active"):(t+=i*e.childElementCount+5,e.style.setProperty("--height",t+"px")),e=e.parentElement;r=document.querySelector("Pisces"===CONFIG.scheme||"Gemini"===CONFIG.scheme?".sidebar-panel-container":".sidebar");document.querySelector(".sidebar-toc-active")&&window.anime({targets:r,duration:200,easing:"linear",scrollTop:r.scrollTop-r.offsetHeight/2+n.getBoundingClientRect().top-r.getBoundingClientRect().top})}}},updateSidebarPosition:function(){if(!(window.innerWidth<1200||"Pisces"===CONFIG.scheme||"Gemini"===CONFIG.scheme)){var t=document.querySelector(".post-toc:not(.placeholder-toc)");let e=CONFIG.page.sidebar;(e="boolean"!=typeof e?"always"===CONFIG.sidebar.display||"post"===CONFIG.sidebar.display&&t:e)&&window.dispatchEvent(new Event("sidebar:show"))}},activateSidebarPanel:function(t){var n=document.querySelector(".sidebar-inner"),o=["sidebar-toc-active","sidebar-overview-active"];if(!n.classList.contains(o[t])){var r=n.querySelector(".sidebar-panel-container"),i=r.firstElementChild,a=r.lastElementChild;let e=i.scrollHeight;i=[e=0===t&&(i=i.querySelector(".nav"))?parseInt(i.style.getPropertyValue("--height"),10):e,a.scrollHeight];r.style.setProperty("--inactive-panel-height",i[1-t]+"px"),r.style.setProperty("--active-panel-height",i[t]+"px"),n.classList.replace(o[1-t],o[t])}},getScript:function(o,e={},t){if("function"==typeof e)return this.getScript(o,{condition:t}).then(e);const{condition:r=!1,attributes:{id:i="",async:a=!1,defer:c=!1,crossOrigin:l="",dataset:s={},...d}={},parentNode:u=null}=e;return new Promise((e,t)=>{if(r)e();else{const n=document.createElement("script");i&&(n.id=i),l&&(n.crossOrigin=l),n.async=a,n.defer=c,Object.assign(n.dataset,s),Object.entries(d).forEach(([e,t])=>{n.setAttribute(e,String(t))}),n.onload=e,n.onerror=t,"object"==typeof o?({url:e,integrity:t}=o,n.src=e,t&&(n.integrity=t,n.crossOrigin="anonymous")):n.src=o,(u||document.head).appendChild(n)}})},loadComments:function(t,e){return e?this.loadComments(t).then(e):new Promise(n=>{var e=document.querySelector(t);CONFIG.comments.lazyload&&e?new IntersectionObserver((e,t)=>{e[0].isIntersecting&&(n(),t.disconnect())}).observe(e):n()})}};