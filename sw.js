const V="quran-v1",SHELL=["./","index.html","manifest.json","icon.svg"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(SHELL)));self.skipWaiting()});
self.addEventListener("activate",e=>{e.waitUntil(clients.claim())});
self.addEventListener("fetch",e=>{
  if(e.request.method!=="GET")return;
  const u=new URL(e.request.url);
  if(u.origin===location.origin||/alquran\.cloud|fonts\.(googleapis|gstatic)\.com/.test(u.host)){
    e.respondWith(caches.match(e.request).then(hit=>hit||fetch(e.request).then(r=>{
      if(r.ok||r.type==="opaque"){const c=r.clone();caches.open(V).then(x=>x.put(e.request,c))}return r
    }).catch(()=>caches.match("index.html"))));
  }
});
