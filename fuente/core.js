/* ===== Estado, almacenamiento y cálculos ===== */
const LS_KEY = 'delta_crs_v1';
const POR_DEFINIR = '[POR DEFINIR]';
const ESTADOS = ['Por validar con distribuidor Dell', 'Validado', 'Descartado'];
const GVAL = { alta: 0, media: 1, baja: 2 };

function blank() {
  return { v: 2, despachos: {}, participantes: {}, diagnostico: {}, proceso: {}, equipos: {}, kit: {}, encuesta: {}, hids: {}, estados: {}, plan30: {}, efirma: {}, ti: {}, propuesta: {},
    config: { rangos: '', distribuidor: '', precios: {} }, ui: { modo: 'despacho', did: null, pid: null } };
}
let memStore = null;
function load() {
  try { const t = localStorage.getItem(LS_KEY); if (t) return Object.assign(blank(), JSON.parse(t)); } catch (e) {}
  return memStore ? JSON.parse(memStore) : blank();
}
/* ¿Este navegador guarda datos? (modo privado o sin espacio = no) */
const ALMACEN_OK = (() => { try { const k = LS_KEY + '_t'; localStorage.setItem(k, '1'); localStorage.removeItem(k); return true; } catch (e) { return false; } })();
/* Migración de datos guardados con versiones anteriores de la app */
function migrar(x) {
  ['despachos', 'participantes', 'diagnostico', 'proceso', 'equipos', 'kit', 'encuesta', 'hids', 'estados', 'plan30', 'efirma', 'ti', 'propuesta'].forEach(k => { if (!x[k] || typeof x[k] !== 'object') x[k] = {}; });
  x.config = Object.assign({ rangos: '', distribuidor: '', precios: {} }, x.config || {}); if (!x.config.precios) x.config.precios = {};
  x.ui = Object.assign({ modo: 'despacho', did: null, pid: null }, x.ui || {});
  Object.values(x.participantes).forEach(p => { if (!Array.isArray(p.avance)) p.avance = []; });
  x.v = 2; return x;
}
let S = migrar(load());
const T = { mod: null, quiz: null, ph: null, rs: null, ia: null, dl: null, confirm: null }; // estado temporal de pantalla
function save() {
  const t = JSON.stringify(S);
  memStore = t;
  try { localStorage.setItem(LS_KEY, t); } catch (e) {}
}

const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const nl2br = s => esc(s).replace(/\n/g, '<br>');
const num = v => { const n = parseFloat(v); return isFinite(n) ? n : 0; };
const mxn = n => new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 }).format(n);
const avg = a => a.length ? a.reduce((x, y) => x + y, 0) / a.length : null;
const r1 = n => n == null ? '—' : (Math.round(n * 10) / 10).toString();
const hoy = () => { const d = new Date(); return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); };
const fechaMx = s => { if (!s) return '—'; const [y, m, d] = s.split('-'); return d + '/' + m + '/' + y; };
const rid = p => p + Math.random().toString(36).slice(2, 8);
const codigo = () => { const a = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; let c = ''; for (let i = 0; i < 4; i++) c += a[Math.floor(Math.random() * a.length)]; return 'D-' + c; };

/* --- Lectura y escritura por ruta ("kit.D-AB12.plan.resp") --- */
function getPath(path) { return path.split('.').reduce((o, k) => (o == null ? undefined : o[k]), S); }
function setPath(path, val) {
  const ks = path.split('.'); let o = S;
  for (let i = 0; i < ks.length - 1; i++) { if (o[ks[i]] == null || typeof o[ks[i]] !== 'object') o[ks[i]] = {}; o = o[ks[i]]; }
  o[ks[ks.length - 1]] = val;
  const depth = ks[0] === 'kit' ? 3 : (['despachos', 'participantes', 'diagnostico', 'proceso', 'equipos', 'encuesta', 'plan30', 'efirma', 'ti', 'propuesta'].includes(ks[0]) ? 2 : 0);
  if (depth && ks.length > depth) { let c = S; for (let i = 0; i < depth; i++) c = c[ks[i]]; if (c && typeof c === 'object') c.ts = Date.now(); }
  save();
}

/* --- Acceso del Equipo DELTA: código verificado por su huella SHA-256 (no se guarda el código en el archivo).
   Es una barrera de uso, no seguridad: la app es estática y los datos viven en cada dispositivo. --- */
const ACCESO_H = 'e59a804a14310ae011859287d552c51f2fcf9676302c6ee281d970de11588313', ACCESO_K = 'delta_crs_acceso';
function sha256(txt) {
  const K = [0x428a2f98,0x71374491,0xb5c0fbcf,0xe9b5dba5,0x3956c25b,0x59f111f1,0x923f82a4,0xab1c5ed5,0xd807aa98,0x12835b01,0x243185be,0x550c7dc3,0x72be5d74,0x80deb1fe,0x9bdc06a7,0xc19bf174,0xe49b69c1,0xefbe4786,0x0fc19dc6,0x240ca1cc,0x2de92c6f,0x4a7484aa,0x5cb0a9dc,0x76f988da,0x983e5152,0xa831c66d,0xb00327c8,0xbf597fc7,0xc6e00bf3,0xd5a79147,0x06ca6351,0x14292967,0x27b70a85,0x2e1b2138,0x4d2c6dfc,0x53380d13,0x650a7354,0x766a0abb,0x81c2c92e,0x92722c85,0xa2bfe8a1,0xa81a664b,0xc24b8b70,0xc76c51a3,0xd192e819,0xd6990624,0xf40e3585,0x106aa070,0x19a4c116,0x1e376c08,0x2748774c,0x34b0bcb5,0x391c0cb3,0x4ed8aa4a,0x5b9cca4f,0x682e6ff3,0x748f82ee,0x78a5636f,0x84c87814,0x8cc70208,0x90befffa,0xa4506ceb,0xbef9a3f7,0xc67178f2];
  const b = Array.from(new TextEncoder().encode(txt)), l = b.length * 8; b.push(0x80); while (b.length % 64 !== 56) b.push(0);
  for (let i = 7; i >= 0; i--) b.push(i > 3 ? 0 : (l >>> (i * 8)) & 255);
  let H = [0x6a09e667,0xbb67ae85,0x3c6ef372,0xa54ff53a,0x510e527f,0x9b05688c,0x1f83d9ab,0x5be0cd19]; const r = (x, n) => (x >>> n) | (x << (32 - n)), W = new Array(64);
  for (let o = 0; o < b.length; o += 64) {
    for (let t = 0; t < 16; t++) W[t] = (b[o + 4 * t] << 24) | (b[o + 4 * t + 1] << 16) | (b[o + 4 * t + 2] << 8) | b[o + 4 * t + 3];
    for (let t = 16; t < 64; t++) { const s0 = r(W[t - 15], 7) ^ r(W[t - 15], 18) ^ (W[t - 15] >>> 3), s1 = r(W[t - 2], 17) ^ r(W[t - 2], 19) ^ (W[t - 2] >>> 10); W[t] = (W[t - 16] + s0 + W[t - 7] + s1) | 0; }
    let [a, bb, c, d, e, f, g, h] = H;
    for (let t = 0; t < 64; t++) { const t1 = (h + (r(e, 6) ^ r(e, 11) ^ r(e, 25)) + ((e & f) ^ (~e & g)) + K[t] + W[t]) | 0, t2 = ((r(a, 2) ^ r(a, 13) ^ r(a, 22)) + ((a & bb) ^ (a & c) ^ (bb & c))) | 0; h = g; g = f; f = e; e = (d + t1) | 0; d = c; c = bb; bb = a; a = (t1 + t2) | 0; }
    H = H.map((x, i) => (x + [a, bb, c, d, e, f, g, h][i]) | 0);
  }
  return H.map(x => (x >>> 0).toString(16).padStart(8, '0')).join('');
}
let accesoMem = false;
const accesoOk = () => { if (accesoMem) return true; try { return localStorage.getItem(ACCESO_K) === ACCESO_H; } catch (e) { return false; } };
function abrirAcceso(cod) { if (sha256(String(cod || '').trim()) !== ACCESO_H) return false; accesoMem = true; try { localStorage.setItem(ACCESO_K, ACCESO_H); } catch (e) {} return true; }
function cerrarAcceso() { accesoMem = false; try { localStorage.removeItem(ACCESO_K); } catch (e) {} }

/* --- Accesos rápidos --- */
const D = () => S.despachos[S.ui.did] || null;
const P = () => { const p = S.participantes[S.ui.pid]; return p && p.despachoId === S.ui.did ? p : null; };
const participantesDe = did => Object.values(S.participantes).filter(p => p.despachoId === did);
function kit(did) {
  if (!S.kit[did]) S.kit[did] = {};
  const k = S.kit[did];
  k.accesos = k.accesos || { filas: [{ puesto: '', s: {} }], key: '', pass: '' };
  k.restauracion = k.restauracion || { info: {}, donde: '', ok: false, fecha: '', tiempo: '', obs: '', rpo: '', rto: '' };
  k.plan = k.plan || { resp: '', sup: '', soporte: '', soporteTel: '', avisar: '', respaldos: '', prioridad: '', listo: false };
  k.calculadora = k.calculadora || { empleados: '', costoHora: '', horasDia: '', ingresosDia: '', recuperacion: '', clientesRiesgo: '', recargoCliente: '', fecha: '', diasHoy: '', diasMeta: '' };
  k.politica = k.politica || { herramientas: '', responsable: '', informa: '', revision: '', listo: false };
  return k;
}
function proceso(did) {
  if (!S.proceso[did]) S.proceso[did] = { pasos: PASOS_PROCESO.map(() => ({ canales: {}, acceso: '', cifrado: '', respaldo: '', obs: '', riesgos: {} })) };
  return S.proceso[did];
}
function equipos(did) { if (!S.equipos[did]) S.equipos[did] = { items: [] }; return S.equipos[did]; }
/* Plan de 30 días: compromisos del dueño sobre hallazgos concretos */
function plan30(did) { if (!S.plan30[did]) S.plan30[did] = { items: {}, seguimiento: '' }; if (!S.plan30[did].items) S.plan30[did].items = {}; return S.plan30[did]; }
const masDias = n => { const d = new Date(); d.setDate(d.getDate() + n); return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); };
function compromisos(did) { const pl = plan30(did); return ordenGravedad(hallazgos(did)).filter(h => pl.items[h.key] && pl.items[h.key].on).map(h => Object.assign({}, h, { c: pl.items[h.key] })); }
function proponerPlan(did) {
  const pl = plan30(did), hs = ordenGravedad(hallazgos(did)).slice(0, 3);
  hs.forEach(h => { const c = pl.items[h.key] || (pl.items[h.key] = {}); c.on = true; if (!c.fecha) c.fecha = masDias(30); });
  if (!pl.seguimiento) pl.seguimiento = masDias(30);
  pl.ts = Date.now(); save(); return hs.length;
}
function diag(did) { if (!S.diagnostico[did]) S.diagnostico[did] = { resp: Array(DIAG.length).fill(null) }; return S.diagnostico[did]; }

/* --- Diagnóstico --- */
function semaforo(p) { return p == null ? 'gris' : p < 40 ? 'rojo' : p <= 70 ? 'amarillo' : 'verde'; }
const SEM_TXT = { rojo: 'Rojo', amarillo: 'Amarillo', verde: 'Verde', gris: 'Sin datos' };
function diagStats(did) {
  const r = (S.diagnostico[did] || { resp: [] }).resp || [];
  const dom = DOMINIOS.map((d, di) => {
    const v = r.slice(di * 5, di * 5 + 5).filter(x => x === 0 || x === 1 || x === 2);
    const p = v.length ? v.reduce((a, b) => a + b, 0) / (v.length * 2) * 100 : null;
    return { n: d.n, nist: d.nist, pct: p, resp: v.length, sem: semaforo(p) };
  });
  const all = r.filter(x => x === 0 || x === 1 || x === 2);
  const total = all.length ? all.reduce((a, b) => a + b, 0) / (all.length * 2) * 100 : null;
  return { dom, total, contestadas: all.length, sem: semaforo(total) };
}

/* --- Hallazgos (derivados de diagnóstico, proceso e inventario) con identificador estable --- */
function reglasEquipo(e) {
  const out = [];
  if (num(e.anios) > 4) out.push('viejo');
  if (e.resp === 'No') out.push('sinresp');
  if (e.av === 'No' || e.act === 'No') out.push('sinprot');
  if (e.comp === 'Sí' && e.pass === 'No') out.push('compartido');
  return out;
}
function hallazgos(did) {
  const out = [];
  const dg = S.diagnostico[did];
  if (dg) DIAG.forEach((x, i) => { const v = dg.resp[i]; if (v === 0 || v === 1) out.push({ key: 'D' + (i + 1), origen: 'Diagnóstico', det: DOMINIOS[Math.floor(i / 5)].n, titulo: x.h, riesgo: x.r, g: x.g, a0: x.a0, a1: x.a1, d: x.d || null, f: x.f, resp: v }); });
  const pr = S.proceso[did];
  if (pr) pr.pasos.forEach((p, pi) => RIESGOS_PROCESO.forEach(x => { if (p.riesgos && p.riesgos[x.k]) out.push({ key: 'P' + (pi + 1) + '-' + x.k, origen: 'Proceso', det: PASOS_PROCESO[pi], titulo: x.h + ' (paso: ' + PASOS_PROCESO[pi].toLowerCase() + ')', riesgo: x.r, g: x.g, a0: x.a0, a1: x.a1, d: x.d || null, f: x.f, resp: 0 }); }));
  const eq = S.equipos[did];
  if (eq) eq.items.forEach(e => reglasEquipo(e).forEach(k => { const x = REGLAS_EQ[k]; out.push({ key: 'E' + e.id + '-' + k, origen: 'Inventario', det: e.nombre || 'Equipo sin nombre', titulo: x.h + ': ' + (e.nombre || 'equipo sin nombre'), riesgo: x.r, g: x.g, a0: x.a0, a1: x.a1, d: x.d || null, f: x.f, resp: 0 }); }));
  hallazgosExtra(did, out);
  if (!S.hids[did]) S.hids[did] = { n: 0, m: {} };
  const map = S.hids[did]; let nuevo = false;
  out.forEach(o => {
    if (!map.m[o.key]) { map.m[o.key] = ++map.n; nuevo = true; }
    o.num = map.m[o.key]; o.id = 'H' + o.num;
    o.estado = (S.estados[did] || {})[o.key] || ESTADOS[0];
  });
  if (nuevo) save();
  return out;
}
const ordenGravedad = hs => hs.slice().sort((a, b) => GVAL[a.g] - GVAL[b.g] || a.resp - b.resp || a.num - b.num);
const oportunidades = did => hallazgos(did).filter(h => h.d);
const oportunidadesVivas = did => oportunidades(did).filter(h => h.estado !== 'Descartado');

/* --- Capacitación --- */
const forma = z => FORMAS[(z && z.forma) || 'A'];
function calificar(resp, f) { const Q = FORMAS[f || 'A']; let ok = 0; Q.forEach((q, i) => { if (resp[i] === q.c) ok++; }); return Math.round(ok / Q.length * 1000) / 10; }
const acierta = (z, marca) => { const Q = forma(z), i = Q.findIndex(q => q[marca]); return z.resp[i] === Q[i].c; };
const barajar = n => { const a = [...Array(n).keys()]; for (let i = n - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
function capStats(did) {
  const ps = participantesDe(did);
  const par = ps.filter(p => p.quizInicial && p.quizFinal);
  const fin = ps.filter(p => p.quizFinal);
  const ph = ps.filter(p => p.phishing);
  const ini = avg(par.map(p => p.quizInicial.pct)), fi = avg(par.map(p => p.quizFinal.pct));
  return {
    n: ps.filter(p => p.quizInicial || p.quizFinal || p.phishing).length, pares: par.length, conInicial: ps.filter(p => p.quizInicial).length,
    ini, fin: fi, mejora: par.length ? fi - ini : null,
    phishing: avg(ph.map(p => p.phishing.pct)), nPh: ph.length,
    mfa: fin.length ? fin.filter(p => acierta(p.quizFinal, 'mfa')).length / fin.length * 100 : null,
    reporte: fin.length ? fin.filter(p => acierta(p.quizFinal, 'reporte')).length / fin.length * 100 : null
  };
}

/* --- Respuestas por ejercicio: p.ej[clave].r[i] = lo que eligió (último intento). sal y an guardan el conjunto marcado --- */
function regEj(k, i, v) {
  const p = P(); if (!p) return;
  p.ej = p.ej || {}; const o = p.ej[k] || (p.ej[k] = { r: [] });
  if (i == null) o.v = v; else o.r[i] = v;
  o.ts = Date.now(); p.ts = Date.now(); save();
}

/* --- Calculadora de costo de interrupción --- */
function calcListo(c) { return num(c.empleados) > 0 && num(c.costoHora) > 0 && num(c.horasDia) > 0 && c.ingresosDia !== '' && c.ingresosDia != null; }
function calcCosto(c, dias) {
  const horas = num(c.empleados) * num(c.costoHora) * num(c.horasDia) * dias;
  const ingresos = num(c.ingresosDia) * dias;
  const recup = num(c.recuperacion);
  const recargos = num(c.clientesRiesgo) * num(c.recargoCliente);
  return { horas, ingresos, recup, recargos, total: horas + ingresos + recup + recargos };
}

const calcDia = c => num(c.empleados) * num(c.costoHora) * num(c.horasDia) + num(c.ingresosDia); // costo de cada día adicional detenido
/* Disposición a pagar: cuatro precios abiertos en MXN al mes */
const PAGOS = [['pagoBarato', 'Barato'], ['pagoRazonable', 'Razonable'], ['pagoCaro', 'Caro'], ['pagoMuyCaro', 'Demasiado caro']];
function pagoTxt(en) { if (!en) return ''; const r = num(en.pagoRazonable), a = num(en.pagoBarato), c = num(en.pagoCaro); if (!r && !a && !c) return ''; return (r ? 'razonable ' + mxn(r) : '') + (a && c ? (r ? ' ' : '') + '(de ' + mxn(a) + ' a ' + mxn(c) + ')' : ''); }
function pagoOrden(en) { const v = PAGOS.map(x => en[x[0]]).filter(x => x !== '' && x != null).map(num); return v.every((x, i) => i === 0 || x >= v[i - 1]); }

/* --- Tablero --- */
function filaTablero(did) {
  const d = S.despachos[did], c = capStats(did), dg = diagStats(did), hs = hallazgos(did), k = kit(did), en = S.encuesta[did] || {}, cm = compromisos(did);
  const dias = d.fechaSesion && d.fechaEntrega ? Math.round((new Date(d.fechaEntrega) - new Date(d.fechaSesion)) / 864e5) : null;
  return { did, nombre: d.nombre, fechaSesion: d.fechaSesion || '', fechaEntrega: d.fechaEntrega || '', dias, participantes: c.n, pares: c.pares, ini: c.ini, fin: c.fin, mejora: c.mejora,
    madurez: dg.total, contestadas: dg.contestadas, hallazgos: hs.length, oportunidades: oportunidadesVivas(did).length,
    utilidad: en.utilidad || null, contrataria: en.contrataria || '', pago: pagoTxt(en), pagos: PAGOS.map(x => en[x[0]] === '' || en[x[0]] == null ? '' : num(en[x[0]])), pagoInicial: en.pagoInicial === '' || en.pagoInicial == null ? '' : num(en.pagoInicial), horas: d.horas || '', esperados: d.esperados || '',
    comp: cm.length, compHechos: cm.filter(x => x.c.hecho).length, seguimiento: (S.plan30[did] || {}).seguimiento || '',
    efirma: efListo(did), ti: tiListo(did), propuesta: propResumen(did),
    phishing: c.phishing, mfa: c.mfa, reporte: c.reporte, restauracion: !!k.restauracion.ok, plan: !!k.plan.listo, calculadora: calcListo(k.calculadora), politica: !!k.politica.listo };
}
function estadoMeta(vals, ok) { // vals: lista por despacho (null = sin datos)
  const con = vals.filter(v => v != null);
  if (!con.length) return 'pendiente';
  if (!con.every(ok)) return 'no';
  return con.length < vals.length ? 'parcial' : 'si';
}
function tablero() {
  const filas = Object.keys(S.despachos).map(filaTablero);
  const totalOp = filas.reduce((a, f) => a + f.oportunidades, 0);
  const metas = [
    { t: 'Mejora de al menos 20 puntos porcentuales en la evaluación', e: estadoMeta(filas.map(f => f.mejora), v => v >= 20), d: filas.map(f => f.nombre + ': ' + (f.mejora == null ? 'sin datos' : r1(f.mejora) + ' pts (n = ' + f.pares + ')')).join(' · ') },
    { t: 'Utilidad del servicio de al menos 4 de 5 en cada despacho', e: estadoMeta(filas.map(f => f.utilidad), v => v >= 4), d: filas.map(f => f.nombre + ': ' + (f.utilidad == null ? 'sin datos' : f.utilidad + ' de 5')).join(' · ') },
    { t: 'Al menos 1 hallazgo que pueda atenderse con una solución Dell', e: filas.length ? (totalOp >= 1 ? 'si' : 'pendiente') : 'pendiente', d: totalOp + ' oportunidad(es) sin descartar' }
  ];
  const ind = [
    { e: estadoMeta(filas.map(f => f.phishing), v => v >= 80), d: filas.map(f => f.nombre + ': ' + (f.phishing == null ? 'sin datos' : r1(f.phishing) + '%')).join(' · ') },
    { e: estadoMeta(filas.map(f => f.mfa), v => v >= 100), d: filas.map(f => f.nombre + ': ' + (f.mfa == null ? 'sin datos' : r1(f.mfa) + '%')).join(' · ') },
    { e: filas.length ? (filas.every(f => f.restauracion) ? 'si' : 'pendiente') : 'pendiente', d: filas.map(f => f.nombre + ': ' + (f.restauracion ? 'prueba registrada' : 'pendiente')).join(' · ') },
    { e: filas.some(f => f.reporte != null && f.reporte < 100) ? 'no' : (filas.length && filas.every(f => f.reporte != null && f.plan) ? 'si' : 'pendiente'), d: filas.map(f => f.nombre + ': ' + (f.reporte == null ? 'sin quiz final' : r1(f.reporte) + '%') + ', plan ' + (f.plan ? 'completo' : 'pendiente')).join(' · ') },
    { e: filas.length ? (filas.every(f => f.calculadora) ? 'si' : 'pendiente') : 'pendiente', d: filas.map(f => f.nombre + ': ' + (f.calculadora ? 'estimación capturada' : 'pendiente')).join(' · ') },
    { e: filas.length ? (filas.every(f => f.politica) ? 'si' : 'pendiente') : 'pendiente', d: filas.map(f => f.nombre + ': ' + (f.politica ? 'política generada' : 'pendiente')).join(' · ') }
  ];
  return { filas, metas, ind, totalOp };
}
function csvTablero() {
  const t = tablero(); const q = v => '"' + String(v == null ? '' : v).replace(/"/g, '""') + '"';
  const head = ['Despacho', 'Fecha de sesión', 'Fecha de entrega', 'Días entre sesión y entrega', 'Participantes esperados', 'Participantes', 'Participantes con ambos quiz', 'Promedio inicial (%)', 'Promedio final (%)', 'Mejora (puntos porcentuales)', 'Madurez (%)', 'Hallazgos', 'Oportunidades Dell', 'Utilidad (1-5)', 'Contrataría', 'Precio mensual barato (MXN)', 'Precio mensual razonable (MXN)', 'Precio mensual caro (MXN)', 'Precio mensual demasiado caro (MXN)', 'Precio razonable del paquete inicial (MXN)', 'Acciones comprometidas a 30 días', 'Acciones cumplidas', 'Fecha de seguimiento', 'Horas invertidas por el equipo', 'Phishing identificado (%)', 'Sabe dónde activar MFA (%)', 'Identifica a quién reportar (%)', 'Prueba de restauración', 'Plan de respuesta', 'Calculadora', 'Política de IA', 'e.firmas y sellos', 'Cuestionario de TI', 'Propuesta (decisión del dueño)'];
  const rows = t.filas.map(f => [f.nombre, f.fechaSesion, f.fechaEntrega, f.dias, f.esperados, f.participantes, f.pares, f.ini == null ? '' : r1(f.ini), f.fin == null ? '' : r1(f.fin), f.mejora == null ? '' : r1(f.mejora), f.madurez == null ? '' : r1(f.madurez), f.hallazgos, f.oportunidades, f.utilidad, f.contrataria, ...f.pagos, f.pagoInicial, f.comp, f.compHechos, f.seguimiento, f.horas, f.phishing == null ? '' : r1(f.phishing), f.mfa == null ? '' : r1(f.mfa), f.reporte == null ? '' : r1(f.reporte), f.restauracion ? 'Sí' : 'No', f.plan ? 'Sí' : 'No', f.calculadora ? 'Sí' : 'No', f.politica ? 'Sí' : 'No', f.efirma ? 'Sí' : 'No', f.ti ? 'Sí' : 'No', f.propuesta]);
  const ET = { si: 'Cumplido', no: 'No cumplido', pendiente: 'Pendiente', parcial: 'Cumplido con datos parciales' };
  const extra = [[], ['Cumplimiento del objetivo SMART'], ...t.metas.map(m => [m.t, ET[m.e], m.d]), [], ['Aprendizaje aplicado (metas sugeridas, no estándares)'], ...INDICADORES.map((x, i) => [x[0] + ': ' + x[1], ET[t.ind[i].e], t.ind[i].d])];
  return '﻿' + [head, ...rows, ...extra].map(r => r.map(q).join(',')).join('\r\n');
}

/* --- Exportar / importar (combina datos de varios dispositivos) --- */
function exportar() { const c = JSON.parse(JSON.stringify(S)); delete c.ui; c.exportado = new Date().toISOString(); return JSON.stringify(c, null, 1); }
const masNuevo = (a, b) => !a || ((b && b.ts) || 0) > (a.ts || 0);
function combinar(inc) {
  if (!inc || typeof inc !== 'object' || !inc.despachos) throw new Error('El archivo no tiene el formato de esta aplicación.');
  let n = 0;
  Object.entries(inc.despachos || {}).forEach(([id, d]) => { const a = S.despachos[id]; if (!a || (a.stub && !d.stub) || (!!a.stub === !!d.stub && masNuevo(a, d))) { S.despachos[id] = d; n++; } });
  ['participantes', 'diagnostico', 'proceso', 'equipos', 'encuesta', 'plan30', 'efirma', 'ti', 'propuesta'].forEach(col => Object.entries(inc[col] || {}).forEach(([id, x]) => { if (masNuevo(S[col][id], x)) { S[col][id] = x; n++; } }));
  Object.entries(inc.kit || {}).forEach(([did, k]) => { if (!S.kit[did]) S.kit[did] = {}; Object.entries(k).forEach(([sec, x]) => { if (masNuevo(S.kit[did][sec], x)) { S.kit[did][sec] = x; n++; } }); });
  Object.entries(inc.hids || {}).forEach(([did, m]) => {
    if (!S.hids[did]) { S.hids[did] = m; return; }
    const loc = S.hids[did], usados = new Set(Object.values(loc.m));
    Object.entries(m.m || {}).forEach(([k, v]) => { if (loc.m[k]) return; if (usados.has(v)) v = ++loc.n; else loc.n = Math.max(loc.n, v); loc.m[k] = v; usados.add(v); });
  });
  Object.entries(inc.estados || {}).forEach(([did, e]) => { S.estados[did] = Object.assign(S.estados[did] || {}, e); });
  if (inc.config) { if (!S.config.rangos) S.config.rangos = inc.config.rangos || ''; if (!S.config.distribuidor) S.config.distribuidor = inc.config.distribuidor || ''; S.config.precios = Object.assign({}, inc.config.precios || {}, S.config.precios || {}); }
  save();
  return n;
}

/* --- Datos de ejemplo para probar la app --- */
function cargarDemo() {
  const id = 'D-DEMO';
  S.despachos[id] = { id, nombre: 'Despacho de ejemplo (DEMO)', empleados: 6, computadoras: 5, decide: 'Socio director', responsable: '', fechaSesion: hoy(), fechaEntrega: '', horas: '', demo: true, ts: Date.now() };
  const mk = (alias, ini, fin, ph, ord) => { const pid = rid('p_'); const resp = (n, f) => FORMAS[f].map((q, i) => (i < n ? q.c : (q.c + 1) % 4)); S.participantes[pid] = { id: pid, alias, despachoId: id, orden: ord, quizInicial: { forma: ord[0], resp: resp(ini, ord[0]), pct: calificar(resp(ini, ord[0]), ord[0]), fecha: hoy() }, quizFinal: { forma: ord[1], resp: resp(fin, ord[1]), pct: calificar(resp(fin, ord[1]), ord[1]), fecha: hoy() }, phishing: { pct: ph, fecha: hoy() }, avance: [true, true, true, true, false, true, true], ts: Date.now() }; };
  mk('Auxiliar 1 (ejemplo)', 7, 12, 80, 'AB'); mk('Auxiliar 2 (ejemplo)', 8, 13, 90, 'BA'); mk('Titular (ejemplo)', 9, 14, 90, 'AB');
  participantesDe(id).forEach((p, j) => demoEj(p, j));
  S.diagnostico[id] = { resp: [1, 0, 0, 0, 2, 1, 0, 1, 2, 0, 0, 1, 0, 0, 1, 2, 1, 2, 0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 1, 0, 1, 2, 0], ts: Date.now() };
  S.efirma[id] = { c: { efirmas: '11 a 50', csd: '1 a 10', personas: 'Todo el personal' }, resp: [0, 0, 1, 1, 0, 2, 0, 1, 0], ts: Date.now() };
  S.ti[id] = { datos: { soporte: 'Un familiar o conocido', equipos: 5, viejos: 2, datos: 'En cada computadora', contable: 'Instalado en cada computadora', respaldo: 'Un disco externo que alguien conecta' }, so: { 'Windows 10': true, 'Windows 11': true }, resp: [0, 1, 0, 2, 1, 2], ts: Date.now() };
  const pr = proceso(id); pr.pasos[0].canales = { WhatsApp: true, Correo: true }; pr.pasos[0].riesgos = { canal: true }; pr.pasos[1].riesgos = { respaldo: true }; pr.ts = Date.now();
  S.equipos[id] = { items: [
    { id: 'e1', nombre: 'Recepción', marca: 'Genérica', anios: 6, so: 'Sistema operativo sin soporte', act: 'No', av: 'Sí', resp: 'No', comp: 'Sí', pass: 'No' },
    { id: 'e2', nombre: 'Laptop del titular', marca: 'Genérica', anios: 2, so: 'Sistema operativo vigente', act: 'Sí', av: 'Sí', resp: 'Sí', comp: 'No', pass: 'Sí' }], ts: Date.now() };
  const k = kit(id);
  Object.assign(k.plan, { resp: 'Titular del despacho', sup: 'Auxiliar 1', soporte: POR_DEFINIR, soporteTel: POR_DEFINIR, avisar: 'Clientes con información afectada', respaldos: 'Disco externo en la oficina', prioridad: 'Clientes con vencimiento más cercano', listo: true, ts: Date.now() });
  Object.assign(k.calculadora, { empleados: 6, costoHora: 120, horasDia: 8, ingresosDia: 9000, recuperacion: 8000, clientesRiesgo: 4, recargoCliente: 1500, utilidadMes: 120000, fecha: hoy(), ts: Date.now() });
  Object.assign(k.politica, { herramientas: 'Las que apruebe el titular', responsable: 'Titular del despacho', informa: 'En la carta de servicios', revision: 'Cada 6 meses', listo: true, ts: Date.now() });
  Object.assign(k.restauracion, { info: { 0: true, 1: true, 2: true }, donde: 'Disco externo', ok: true, fecha: hoy(), tiempo: '15', obs: 'Archivo de prueba recuperado.', ts: Date.now() });
  S.encuesta[id] = { utilidad: 4, modulo: '4', contrataria: 'Tal vez', comentarios: 'Datos de ejemplo. Los precios se dejan en blanco a propósito.', ts: Date.now() };
  S.ui.did = id; delete S.plan30[id]; proponerPlan(id); Object.values(plan30(id).items).forEach((c, i) => { c.resp = i ? 'Auxiliar 1' : 'Titular del despacho'; c.hecho = i === 0; });
  S.ui.did = id; save();
}
/* Respuestas ficticias y deterministas para revisar los reportes con el despacho de ejemplo */
function demoEj(p, j) {
  let x = 7 + j * 13; const rnd = () => (x = (x * 1103515245 + 12345) % 2147483648) / 2147483648, nivel = 0.62 + j * 0.12;
  const elige = (n, c) => rnd() < nivel ? c : (c + 1 + Math.floor(rnd() * (n - 1))) % n;
  p.ej = {
    ph: { r: CORREOS.map((c, i) => { const ok = rnd() < nivel + (c.fraude ? 0 : 0.15); return { e: ok ? c.fraude : !c.fraude, s: c.s.filter(() => rnd() < nivel) }; }) },
    rs: { r: ITEMS.rs.map(it => elige(it.o.length, it.c)) },
    ia: { r: ITEMS.ia.map(it => elige(3, it.c)) },
    an: { v: Object.fromEntries(ANON.filter(t => typeof t !== 'string').map((t, k) => [k, t.s ? rnd() < nivel : rnd() < 0.15])) }
  };
  if (j > 0) { p.ej.bk = { r: ITEMS.bk.map(it => elige(3, it.c)) }; p.ej.dl = { r: ITEMS.dl.map(it => elige(it.o.length, it.c)) }; p.ej.sal = { v: Object.fromEntries(SALIDA.items.map((t, k) => [k, rnd() < nivel ? t[1] : !t[1]])) }; }
  p.ej.url = { r: ITEMS.url.map(it => elige(2, it.c)) };
  const ph = p.ej.ph.r; p.phishing = { pct: ph.filter((r, i) => r.e === CORREOS[i].fraude).length / CORREOS.length * 100, fraudes: ph.filter((r, i) => CORREOS[i].fraude && r.e).length, legitimos: ph.filter((r, i) => !CORREOS[i].fraude && !r.e).length, fecha: hoy() };
  p.ia = { pct: p.ej.ia.r.filter((v, i) => v === ITEMS.ia[i].c).length / ITEMS.ia.length * 100, fecha: hoy() };
  p.repaso = true;
  p.ej.ej8 = { r: ITEMS.ej8.map(it => elige(2, it.c)) };
  p.ej.lab8 = { v: Object.fromEntries(LAB8.ops.map((o, k) => [k, rnd() < nivel ? o[1] : !o[1]])) };
  p.ej.err8 = { v: Object.fromEntries(ERR8.ops.map((o, k) => [k, rnd() < nivel ? o[1] : !o[1]])) };
  p.avance[7] = true;
  p.conf = { pre: Object.fromEntries(CONFIANZA.map((t, i) => [i, 2 + ((j + i) % 2)])), post: Object.fromEntries(CONFIANZA.map((t, i) => [i, 3 + ((j + i) % 3 === 0 ? 1 : 0) + (j === 2 ? 1 : 0)])) };
  p.meta = { habitos: [[0, 3], [1], [0, 4]][j % 3], propio: j === 1 ? 'Revisar el respaldo cada viernes' : '', fecha: hoy() };
  if (j > 0) p.retos = [{ k: 0, fecha: hoy(), items: [0, 4, 9, 15, 21], resp: [1, 1, j === 1 ? 0 : 1, 1, 1], ok: j === 1 ? 4 : 5, n: 5 }];
  p.caps = Object.fromEntries(CAPSULAS.slice(0, 2 + j * 2).map(c => [c.id, { fecha: hoy(), ok: true }]));
}
function borrarDespacho(did) {
  delete S.despachos[did];
  Object.values(S.participantes).forEach(p => { if (p.despachoId === did) delete S.participantes[p.id]; });
  ['diagnostico', 'proceso', 'equipos', 'kit', 'encuesta', 'hids', 'estados', 'plan30'].forEach(c => delete S[c][did]);
  if (S.ui.did === did) { S.ui.did = Object.keys(S.despachos)[0] || null; S.ui.pid = null; }
  save();
}

/* --- Código de resultados: lo que hay en este dispositivo para un despacho, en un texto que se pega por mensaje --- */
const b64u = { enc: u8 => { let s = ''; for (let i = 0; i < u8.length; i += 8192) s += String.fromCharCode.apply(null, u8.subarray(i, i + 8192)); return btoa(s).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, ''); },
  dec: t => { const b = atob(t.replace(/-/g, '+').replace(/_/g, '/')); const u = new Uint8Array(b.length); for (let i = 0; i < b.length; i++) u[i] = b.charCodeAt(i); return u; } };
async function pasar(u8, Clase, fmt) { const st = new Blob([u8]).stream().pipeThrough(new Clase(fmt)); return new Uint8Array(await new Response(st).arrayBuffer()); }
async function codigoResultados(did) {
  const pk = { v: 1, despachos: { [did]: S.despachos[did] }, participantes: {}, diagnostico: {}, proceso: {}, equipos: {}, encuesta: {}, kit: {}, hids: {}, estados: {}, plan30: {}, efirma: {}, ti: {} };
  participantesDe(did).forEach(p => { pk.participantes[p.id] = p; });
  ['diagnostico', 'encuesta', 'kit', 'hids', 'estados', 'plan30', 'efirma', 'ti'].forEach(c => { if (S[c][did]) pk[c][did] = S[c][did]; });
  const u8 = new TextEncoder().encode(JSON.stringify(pk));
  try { if (typeof CompressionStream === 'function') return 'DELTA1Z.' + b64u.enc(await pasar(u8, CompressionStream, 'deflate-raw')); } catch (e) {}
  return 'DELTA1J.' + b64u.enc(u8);
}
/* Acepta uno o varios códigos pegados tal como llegan por WhatsApp o correo, con su encabezado */
async function leerCodigos(txt) {
  const t = String(txt || ''); let ms = t.match(/DELTA1[ZJ]\.[A-Za-z0-9_-]+/g);
  if (!ms) ms = t.replace(/\s+/g, '').match(/DELTA1[ZJ]\.[A-Za-z0-9_-]+/g);
  if (!ms) throw new Error('No encontré ningún código. Cada código empieza con DELTA1 y debe estar completo.');
  let n = 0; for (const c of ms) n += await leerCodigo(c);
  return { codigos: ms.length, n };
}
async function leerCodigo(txt) {
  const t = String(txt || '').replace(/\s+/g, ''); const m = /^DELTA1([ZJ])\.([A-Za-z0-9_-]+)$/.exec(t);
  if (!m) throw new Error('El texto no es un código de resultados. Debe empezar con DELTA1 y estar completo.');
  let u8 = b64u.dec(m[2]);
  if (m[1] === 'Z') u8 = await pasar(u8, DecompressionStream, 'deflate-raw');
  return combinar(JSON.parse(new TextDecoder().decode(u8)));
}

// Dirección pública de la app: los enlaces para el personal y los recordatorios siempre apuntan aquí,
// aunque la app se esté usando dentro de Claude o desde el archivo HTML de respaldo.
const URL_PUBLICA = 'https://chatbmg8-bit.github.io/ciber-resiliencia-delta/';
function baseURL() {
  try {
    if (/^https?:$/.test(location.protocol) && !EMBEBIDO && !/^(localhost|127\.)/.test(location.hostname)) return location.href.split(/[?#]/)[0];
  } catch (e) {}
  return URL_PUBLICA;
}
