window.NexT||(window.NexT={}),function(){const e={};let n={};const t=t=>{var o=document.querySelector(`.next-config[data-name="${t}"]`);o&&(o=o.text,o=JSON.parse(o||"{}"),"main"===t?Object.assign(e,o):n[t]=o)};t("main"),window.CONFIG=new Proxy({},{get(o,c){let i;if(i=(c in e?e:(c in n||t(c),n))[c],c in o||"object"!=typeof i||(o[c]={}),c in o){const e=o[c];return"object"==typeof e&&"object"==typeof i?new Proxy({...i,...e},{set:(n,t,o)=>(n[t]=o,e[t]=o,!0)}):e}return i}}),document.addEventListener("pjax:success",(()=>{n={}}))}();