'use strict';
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const { randomUUID } = require('node:crypto');
function createGameServer() {
  const rooms = new Map();
  const ttl = 30000;
  function prune() { for (const [name, room] of rooms) { for (const [token,p] of room) if(Date.now()-p.last>ttl) room.delete(token); if(!room.size)rooms.delete(name); } }
  const server = http.createServer(async (req,res) => {
    const url = new URL(req.url,'http://localhost');
    function send(status,data) { res.writeHead(status,{'Content-Type':'application/json','Cache-Control':'no-store'});res.end(JSON.stringify(data)); }
    if(url.pathname==='/api/health' && req.method==='GET')return send(200,{ok:true});
    if(url.pathname==='/api/room' && req.method==='POST') {
      // Accept only same-origin browser requests; tokens authorize one participant.
      if(req.headers.origin && req.headers.origin !== ((req.headers['x-forwarded-proto']==='https'?'https':'http')+'://'+req.headers.host)) return send(403,{error:'origin'});
      let text='';
      try { for await(const chunk of req) { text+=chunk; if(text.length>65536)return send(413,{error:'payload'}); } } catch { return; }
      let data; try{data=JSON.parse(text);}catch{return send(400,{error:'json'});}
      if(!data || !/^tt-[a-z0-9]{4,6}$/.test(data.room))return send(400,{error:'room'});
      prune(); let room=rooms.get(data.room);
      if(data.action==='join') {
        if(!room) { if(rooms.size>=500)return send(503,{error:'capacity'}); room=new Map();rooms.set(data.room,room); }
        if(room.size>=20)return send(409,{error:'full'});
        const token=randomUUID(), peer=randomUUID();room.set(token,{peer,presence:{},last:Date.now()});
        return send(200,{token,peer});
      }
      const p=room && room.get(data.token);if(!p)return send(401,{error:'expired'});
      if(data.action==='leave'){room.delete(data.token);return send(200,{ok:true});}
      if(data.action!=='sync')return send(400,{error:'action'});
      if(data.presence && typeof data.presence==='object' && !Array.isArray(data.presence)) {
        for(const [k,v] of Object.entries(data.presence)) if(!['__proto__','constructor','prototype'].includes(k)) p.presence[k]=v;
      }
      p.last=Date.now();
      return send(200,{peers:[...room.values()].map(v=>({peer:v.peer,presence:v.presence}))});
    }
    if(req.method==='GET' && ['/', '/tombo-total.html'].includes(url.pathname)) {
      res.writeHead(200,{'Content-Type':'text/html; charset=utf-8','Cache-Control':'no-cache'});
      return fs.createReadStream(path.join(__dirname,'tombo-total.html')).pipe(res);
    }
    send(404,{error:'not_found'});
  });
  return server;
}
if(require.main===module) { const port=Number(process.env.PORT)||8080;createGameServer().listen(port,'0.0.0.0',()=>console.log(`Tombo Total: http://localhost:${port}`)); }
module.exports={createGameServer};
