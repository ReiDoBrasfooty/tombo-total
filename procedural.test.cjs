const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const source = fs.readFileSync('tombo-total.html', 'utf8');
const slice = (a, b) => source.slice(source.indexOf(a), source.indexOf(b, source.indexOf(a)));
const calls = [];
const context = { Math, proceduralSeed: 1, MAPS: [{ id: 'procedural' }], C: {}, sweepers: [] };
for (const name of ['addBlock', 'addRamp', 'addPendulum', 'addPuncher', 'addBelt', 'addBox', 'addDoorRow', 'addMover', 'addTiles', 'addBallLane']) {
  context[name] = (...args) => calls.push([name, ...args]);
}
context.addSweeper = (...args) => { calls.push(['addSweeper', ...args]); context.sweepers.push({}); };
context.buildFinish = (z, top) => ({ z: z - 4, top });
vm.createContext(context);
vm.runInContext(slice('function mulberry32(', 'const net =') + slice('function proceduralPlan(', 'MAPS.push({ id:'), context);
const sequences = new Set();
const kinds = new Set();
for (let seed = 1; seed <= 1000; seed++) {
  context.proceduralSeed = seed;
  const plan = context.proceduralPlan(seed);
  assert.equal(plan.length, 7);
  assert.equal(new Set(plan.map(p => p.kind)).size, 7);
  assert.equal(JSON.stringify(plan), JSON.stringify(context.proceduralPlan(seed)));
  plan.forEach(p => kinds.add(p.kind));
  sequences.add(plan.map(p => p.kind).join(','));
  calls.length = 0;
  const finish = context.buildProcedural({});
  const first = JSON.stringify(calls);
  context.buildProcedural({});
  assert.equal(JSON.stringify(calls.slice(calls.length / 2)), first);
  const map = context.MAPS[0];
  assert.equal(map.cps.length, 8);
  assert.equal(map.sections.length, 9);
  assert.equal(finish.z, -284);
  assert.equal(finish.top, plan.some(p => p.kind === 'escadas') ? 6 : 0);
  for (let i = 1; i < map.cps.length; i++) {
    const cp = map.cps[i];
    assert.equal(cp.z, -49 - (i - 1) * 38);
    assert(calls.some(c => c[0] === 'addBlock' && c[1] === 0 && c[2] === cp.y && c[3] === cp.z && c[4] === 12 && c[5] === 6));
  }
}
assert.equal(kinds.size, 10);
assert(sequences.size > 990);
for (const match of source.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)) if (match[1].trim()) new vm.Script(match[1]);
console.log('OK: 1000 sementes, dez tipos de trecho, repetibilidade, checkpoints e sintaxe.');
