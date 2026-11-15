/* ===== Eventos, archivos y arranque ===== */
const EMBEBIDO = (() => { try { return window.self !== window.top; } catch (e) { return true; } })();
const DLP = (window.claude && typeof window.claude.use === 'function') ? window.claude.use('downloads').catch(() => null) : Promise.resolve(null);

function toast(msg) {
  const t = document.getElementById('toast'); t.textContent = msg; t.className = 'on';
  clearTimeout(toast.h); toast.h = setTimeout(() => { t.className = ''; }, 4200);
}
function render() {
  if (S.ui.did && !S.despachos[S.ui.did]) { S.ui.did = null; S.ui.pid = null; }
  const r = ruta();
  document.getElementById('app').innerHTML = marco(r) + `<main class="wrap">${V[r]()}</main>` + pie();
  if (typeof medirTop === 'function') medirTop();
}
function arriba() { try { window.scrollTo(0, 0); } catch (e) {} }

async function guardar(nombre, data, mime) {
  const DL = await DLP;
  if (DL) {
    try { await DL.save({ filename: nombre, data }); toast('Archivo guardado: ' + nombre); return true; }
    catch (e) { if (e && e.code === 'declined') { toast('No se guardó el archivo.'); return false; } }
  }
  if (EMBEBIDO && typeof data === 'string') { copiaManual(nombre, data); return false; }
  try {
    const blob = data instanceof Blob ? data : new Blob([data], { type: mime || 'text/plain' });
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = nombre;
    document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), 5000);
    toast('Descarga iniciada: ' + nombre); return true;
  } catch (e) { toast('Este visor no permite descargas. Abre la versión de archivo de la app.'); return false; }
}
function copiaManual(nombre, texto, msg) {
  const m = document.getElementById('modal');
  m.innerHTML = `<div class="mbox" role="dialog" aria-label="Copiar datos"><h2>${esc(nombre)}</h2><p>${msg || 'Este visor no permite descargar archivos. Copia el contenido y pégalo en un archivo de texto con ese nombre.'}</p><textarea id="m-txt" readonly rows="10">${esc(texto)}</textarea><div class="row end"><button class="btn" data-a="mcerrar">Cerrar</button><button class="btn p" data-a="mcopiar">Copiar</button></div></div>`;
  m.className = 'on';
}
function cargarLib() {
  return new Promise((ok, no) => {
    if (window.html2pdf) return ok();
    const s = document.createElement('script');
    s.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
    s.onload = () => ok(); s.onerror = () => no(new Error('lib')); document.head.appendChild(s);
  });
}
async function pdf(html, nombre) {
  if (!EMBEBIDO) {
    document.getElementById('print-area').innerHTML = '<div class="doc">' + html + '</div>';
    document.title = nombre; setTimeout(() => { window.print(); document.title = TITULO; }, 50);
    return;
  }
  toast('Generando el PDF…');
  try {
    await cargarLib();
    const blob = await window.html2pdf().set({ margin: [10, 10, 12, 10], image: { type: 'jpeg', quality: 0.95 }, html2canvas: { scale: 2, backgroundColor: '#ffffff' }, jsPDF: { unit: 'mm', format: 'letter', orientation: 'portrait' }, pagebreak: { mode: ['css', 'legacy'], before: '.pb' } })
      .from('<div class="doc pdfdoc">' + html + '</div>').outputPdf('blob');
    await guardar(nombre + '.pdf', blob, 'application/pdf');
  } catch (e) { toast('No se pudo generar el PDF en este visor. Abre la versión de archivo de la app y usa "Guardar en PDF".'); }
}
const TITULO = 'Ciber Resiliencia como Servicio';
const slug = s => String(s).normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-zA-Z0-9]+/g, '-').replace(/^-|-$/g, '').toLowerCase() || 'despacho';

const ACC = {
  modo: v => { S.ui.modo = v; save(); T.confirm = null; ir(NAV[v][0][0]); },
  unir: () => {
    const c = (document.getElementById('in-codigo').value || '').trim().toUpperCase();
    if (!/^D-[A-Z0-9]{4}$/.test(c)) return toast('El código tiene la forma D-AB12. Revísalo con el Equipo DELTA.');
    if (!S.despachos[c]) S.despachos[c] = { id: c, nombre: 'Despacho ' + c, stub: true, ts: Date.now() };
    S.ui.did = c; S.ui.pid = null; save(); render();
  },
  alias: () => {
    const a = (document.getElementById('in-alias').value || '').trim();
    if (!a) return toast('Escribe un alias, por ejemplo "Auxiliar 1".');
    const id = rid('p_'); S.participantes[id] = { id, alias: a, despachoId: S.ui.did, orden: Math.random() < 0.5 ? 'AB' : 'BA', avance: [], ts: Date.now() };
    S.ui.pid = id; save(); render();
  },
  pid: v => { S.ui.pid = v || null; T.mod = T.quiz = T.ph = T.st = null; save(); render(); },
  quiz: v => { const p = P(), f = (p.orden || 'AB')[v === 'quizInicial' ? 0 : 1]; T.quiz = { tipo: v, forma: f, i: 0, resp: [], perm: FORMAS[f].map(q => barajar(q.o.length)) }; render(); arriba(); },
  qop: v => { T.quiz.resp[T.quiz.i] = +v; render(); },
  qsalir: () => { T.quiz = null; render(); },
  qsig: () => {
    const z = T.quiz; if (z.resp[z.i] == null) return;
    if (z.i < FORMAS[z.forma].length - 1) { z.i++; render(); arriba(); return; }
    const p = P(); p[z.tipo] = { forma: z.forma, resp: z.resp.slice(), pct: calificar(z.resp, z.forma), fecha: hoy() }; p.ts = Date.now(); save();
    T.quiz = null; render(); arriba();
    ACC.codigo(z.tipo);
  },
  paso: v => {
    const [t, x] = v.split(':'), p = P(); if (!p) return;
    T.mod = T.ph = T.st = null; T.quiz = null; T.repaso = null;
    if (t === 'r') T.repaso = true;
    else if (t === 'q') { if (x === 'quizFinal' && !p.quizInicial) return toast('Primero contesta el quiz inicial.'); const f = (p.orden || 'AB')[x === 'quizInicial' ? 0 : 1]; T.quiz = { tipo: x, forma: f, i: 0, resp: [], perm: FORMAS[f].map(q => barajar(q.o.length)) }; }
    else T.mod = +x;
    if (location.hash === '#capacitacion') { render(); arriba(); } else location.hash = 'capacitacion';
  },
  copiar: v => { try { navigator.clipboard.writeText(v).then(() => toast('Enlace copiado.'), () => copiaManual('Enlace para el personal', v, 'Copia este enlace y envíalo al personal del despacho.')); } catch (e) { copiaManual('Enlace para el personal', v, 'Copia este enlace y envíalo al personal del despacho.'); } },
  mod: v => { T.mod = v ? +v : null; T.st = null; T.ph = null; T.sal = null; T.an = null; render(); arriba(); },
  phini: () => { T.ph = { i: 0, eleg: null, sen: {}, ok: 0, r: [], fin: false }; T.st = null; render(); arriba(); },
  phop: v => { const s = T.ph; s.eleg = v === '1'; s.r[s.i] = s.eleg === CORREOS[s.i].fraude; if (s.r[s.i]) s.ok++; render(); },
  phsig: () => {
    const s = T.ph;
    if (s.i < CORREOS.length - 1) { s.i++; s.eleg = null; s.sen = {}; render(); return; }
    s.fin = true; const p = P(); p.phishing = { pct: s.ok / CORREOS.length * 100, fraudes: CORREOS.filter((c, i) => c.fraude && s.r[i]).length, legitimos: CORREOS.filter((c, i) => !c.fraude && s.r[i]).length, fecha: hoy() }; marcar(p, 1); render();
  },
  stop: v => { const s = T.st, it = ITEMS[s.key][s.i]; s.eleg = +v; if (s.eleg === it.c) s.ok++; if (it.h) s.h += it.h[s.eleg]; render(); },
  stsig: () => {
    const s = T.st, n = ITEMS[s.key].length;
    if (s.i < n - 1) { s.i++; s.eleg = null; render(); return; }
    s.fin = true; if (s.key === 'ia') { const p = P(); p.ia = { pct: s.ok / n * 100, fecha: hoy() }; marcar(p, 6); }
    render();
  },
  strein: () => { T.st = null; render(); },
  alinicio: () => { T.mod = null; location.hash = 'inicio'; },
  repsalir: () => { T.repaso = null; render(); arriba(); },
  repfin: () => { const p = P(); p.repaso = true; p.ts = Date.now(); save(); T.repaso = null; if (!p.quizFinal && p.quizInicial) ACC.paso('q:quizFinal'); else { render(); arriba(); } },
  calc: () => { T.mod = 5; T.quiz = T.ph = T.st = T.repaso = null; if (location.hash === '#capacitacion') { render(); arriba(); } else location.hash = 'capacitacion'; },
  salrev: () => { T.sal.rev = true; render(); },
  salre: () => { T.sal = null; render(); },
  antog: v => { const z = T.an; z.sel[v] = !z.sel[v]; render(); },
  anrev: () => { T.an.rev = true; render(); },
  anre: () => { T.an = null; render(); },
  plan30auto: () => { const n = proponerPlan(S.ui.did); render(); toast(n ? 'Propuesta lista: ajusta responsables y fechas.' : 'Aún no hay hallazgos.'); },
  plantodos: () => { T.planTodos = !T.planTodos; render(); },
  plan: () => { const k = kit(S.ui.did).plan; k.listo = true; k.ts = Date.now(); marcar(P(), 4); render(); toast('Plan de respuesta generado.'); },
  politica: () => { const k = kit(S.ui.did).politica; k.listo = true; k.ts = Date.now(); marcar(P(), 7); render(); toast('Política de uso de IA generada.'); },
  hecho: v => {
    const n = +v, k = kit(S.ui.did);
    if (n === 5) { if (!calcListo(k.calculadora)) return toast('Faltan datos para calcular el costo.'); k.calculadora.fecha = hoy(); k.calculadora.ts = Date.now(); }
    marcar(P(), n); T.mod = null; if (!P()) { toast(n === 5 ? 'Calculadora guardada.' : 'Guardado.'); location.hash = 'inicio'; return; } render(); arriba(); toast('Módulo ' + n + ' completado.');
  },
  accfila: () => { const a = kit(S.ui.did).accesos; a.filas.push({ puesto: '', s: {} }); a.ts = Date.now(); save(); render(); },
  encuesta: () => { const e = S.encuesta[S.ui.did] || {}; if (!e.utilidad) return toast('Falta calificar la utilidad del servicio (1 a 5).'); if (!pagoOrden(e)) return toast('Revisa los cuatro precios: deberían ir de menor a mayor.'); e.ts = Date.now(); e.fecha = hoy(); save(); toast('Gracias. Tu encuesta quedó guardada.'); },
  pdf: v => { const did = S.ui.did, n = slug(S.despachos[did].nombre); if (v === 'plan') pdf(planHTML(did), 'plan-de-respuesta-' + n); else if (v === 'politica') pdf(politicaHTML(did), 'politica-de-ia-' + n); else pdf(reporteHTML(did), 'reporte-' + n); },
  nuevo: () => {
    let id = codigo(); while (S.despachos[id]) id = codigo();
    const g = x => document.getElementById(x).value.trim();
    S.despachos[id] = { id, nombre: g('nd-nombre') || POR_DEFINIR, empleados: g('nd-emp'), computadoras: g('nd-pc'), decide: '', responsable: '', fechaSesion: '', fechaEntrega: '', horas: '', ts: Date.now() };
    S.ui.did = id; S.ui.pid = null; save(); render(); toast('Despacho registrado. Código para el personal: ' + id);
  },
  usar: v => { S.ui.did = v; S.ui.pid = null; T.mod = T.quiz = T.ph = T.st = null; save(); render(); },
  conf: v => { T.confirm = v || null; render(); },
  borrar: v => { borrarDespacho(v); T.confirm = null; render(); toast('Despacho eliminado.'); },
  eqadd: () => { const e = equipos(S.ui.did); e.items.push({ id: rid('e'), nombre: '', marca: '', anios: '', so: '', act: '', av: '', resp: '', comp: '', pass: '' }); e.ts = Date.now(); save(); render(); },
  eqdel: v => { const e = equipos(S.ui.did); e.items.splice(+v, 1); e.ts = Date.now(); save(); render(); },
  csv: () => guardar('tablero-piloto-' + hoy() + '.csv', csvTablero(), 'text/csv'),
  codigo: async v => { if (!S.ui.did) return toast('Primero elige tu despacho.'); const c = await codigoResultados(S.ui.did), p = P(); const ant = v === 'quizInicial' ? `<b>Quiz inicial guardado.</b> Ahora envía este código al Equipo DELTA: es lo que permite medir tu avance al final. ` : v === 'quizFinal' ? `<b>Quiz final guardado${p && p.quizInicial ? ': pasaste de ' + r1(p.quizInicial.pct) + '% a ' + r1(p.quizFinal.pct) + '%' : ''}.</b> Envía este código al Equipo DELTA para que tu resultado cuente. ` : ''; copiaManual(v ? 'Envía tus resultados' : 'Tus resultados', c, ant + 'Cópialo y pégalo en un mensaje (WhatsApp o correo). Contiene tu alias y tus respuestas; no incluye datos de clientes.'); try { await navigator.clipboard.writeText(c); toast('Código copiado. Pégalo en un mensaje al Equipo DELTA.'); } catch (e) {} },
  impcod: async () => { try { const n = await leerCodigo(document.getElementById('in-cod').value); render(); toast('Resultados combinados: ' + n + ' registro(s) nuevos o actualizados.'); } catch (e) { toast('No se pudo importar: ' + e.message); } },
  exportar: () => guardar('datos-piloto-' + hoy() + '.json', exportar(), 'application/json'),
  demo: () => { cargarDemo(); render(); toast('Despacho de ejemplo cargado.'); },
  reset: () => { const ui = S.ui; S = blank(); S.ui.modo = ui.modo; T.confirm = null; save(); render(); toast('Datos borrados.'); },
  mcerrar: () => { document.getElementById('modal').className = ''; },
  mcopiar: () => { const t = document.getElementById('m-txt'); t.select(); try { navigator.clipboard.writeText(t.value).then(() => toast('Copiado.'), () => toast('Selecciona el texto y cópialo.')); } catch (e) { toast('Selecciona el texto y cópialo.'); } }
};

function onBind(el) {
  let v;
  if (el.type === 'checkbox') v = el.checked;
  else if (el.type === 'radio') { if (!el.checked) return; v = el.hasAttribute('data-num') ? Number(el.value) : el.value; }
  else v = el.value;
  setPath(el.dataset.bind, v);
  if (el.dataset.upd) el.dataset.upd.split(' ').forEach(k => { const t = document.getElementById('upd-' + k); if (t) t.innerHTML = UPD[k](); });
  if (el.hasAttribute('data-r')) render();
}
const DISCRETO = t => t.type === 'checkbox' || t.type === 'radio' || t.tagName === 'SELECT';
document.addEventListener('click', e => {
  const b = e.target.closest('[data-a]'); if (!b || b.disabled) return;
  e.preventDefault(); const f = ACC[b.dataset.a]; if (f) f(b.dataset.v);
});
document.addEventListener('input', e => { const t = e.target; if (t.dataset && t.dataset.bind && !DISCRETO(t)) onBind(t); });
document.addEventListener('change', e => {
  const t = e.target; if (!t.dataset) return;
  if (t.dataset.bind && DISCRETO(t)) return onBind(t);
  if (t.dataset.sen != null && T.ph) { T.ph.sen[t.dataset.sen] = t.checked; return; }
  if (t.dataset.sal != null && T.sal) { T.sal.m[t.dataset.sal] = t.checked; return; }
  if (t.dataset.c === 'did') { S.ui.did = t.value || null; S.ui.pid = null; T.mod = T.quiz = T.ph = T.st = null; save(); render(); return; }
  if (t.id === 'in-json' && t.files && t.files[0]) {
    const fr = new FileReader();
    fr.onload = () => { try { const n = combinar(JSON.parse(fr.result)); render(); toast('Datos combinados: ' + n + ' registro(s) nuevos o actualizados.'); } catch (err) { toast('No se pudo importar: ' + err.message); } };
    fr.readAsText(t.files[0]);
  }
});
document.addEventListener('keydown', e => { if (e.key === 'Enter' && e.target.id === 'in-codigo') ACC.unir(); if (e.key === 'Enter' && e.target.id === 'in-alias') ACC.alias(); });
window.addEventListener('hashchange', () => { T.confirm = null; render(); arriba(); });
window.addEventListener('afterprint', () => { document.getElementById('print-area').innerHTML = ''; });
(function entrarPorEnlace() {
  const m = (location.search || '').match(/[?&]d=(D-[A-Z0-9]{4})\b/i); if (!m) return;
  const c = m[1].toUpperCase();
  if (!S.despachos[c]) S.despachos[c] = { id: c, nombre: 'Despacho ' + c, stub: true, ts: Date.now() };
  S.ui.did = c; S.ui.pid = null; S.ui.modo = 'despacho'; save();
  try { history.replaceState(null, '', location.pathname + '#inicio'); } catch (e) {}
})();
function medirTop() { const h = document.querySelector('.top'); if (h) document.documentElement.style.setProperty('--topH', h.offsetHeight + 'px'); }
window.addEventListener('resize', medirTop);
render();
