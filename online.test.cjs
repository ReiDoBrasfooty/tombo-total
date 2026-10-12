const {createGameServer}=require('./server.cjs');const assert=require('node:assert/strict');
(async()=>{const server=createGameServer();await new Promise(r=>server.listen(0,'127.0.0.1',r));const base='http://127.0.0.1:'+server.address().port;
async function api(data){const r=await fetch(base+'/api/room',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)});return [r.status,await r.json()];}
try{
assert.equal((await fetch(base+'/api/health')).status,200);assert((await(await fetch(base)).text()).includes('Tombo Total'));
const [,a]=await api({room:'tt-abcde',action:'join'}),[,b]=await api({room:'tt-abcde',action:'join'});
await api({room:'tt-abcde',action:'sync',token:a.token,presence:{n:'Alice',p:[1,2,3],host:true}});
const [status,state]=await api({room:'tt-abcde',action:'sync',token:b.token,presence:{n:'Bob'}});
assert.equal(status,200);assert.equal(state.peers.length,2);assert.equal(state.peers.find(p=>p.peer===a.peer).presence.n,'Alice');
const [,other]=await api({room:'tt-other',action:'join'});assert.equal((await api({room:'tt-other',action:'sync',token:a.token}))[0],401);
assert.equal((await api({room:'tt-abcde',action:'sync',token:'fake'}))[0],401);
await api({room:'tt-abcde',action:'leave',token:a.token});assert.equal((await api({room:'tt-abcde',action:'sync',token:b.token}))[1].peers.length,1);
assert.equal((await api({room:'../bad',action:'join'}))[0],400);
const cross=await fetch(base+'/api/room',{method:'POST',headers:{Origin:'https://example.com'},body:'{}'});assert.equal(cross.status,403);
console.log('OK: servidor, dois jogadores, presença, saída, isolamento de salas e tokens, validação e origem.');
}finally{await new Promise(r=>server.close(r));}})().catch(e=>{console.error(e);process.exitCode=1});
