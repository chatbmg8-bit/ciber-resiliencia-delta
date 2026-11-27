/* ===== Eventos, archivos y arranque ===== */
const ETQ = { quizInicial: 'quiz inicial', quizFinal: 'quiz final', diag: 'diagnóstico', efirma: 'e.firmas y sellos', ti: 'cuestionario de TI', calc: 'calculadora', encuesta: 'encuesta' };
const EMBEBIDO = (() => { try { return window.self !== window.top; } catch (e) { return true; } })();
const DLP = (window.claude && typeof window.claude.use === 'function') ? window.claude.use('downloads').catch(() => null) : Promise.resolve(null);

function toast(msg) {
  const t = document.getElementById('toast'); t.textContent = msg; t.className = 'on';
  clearTimeout(toast.h); toast.h = setTimeout(() => { t.className = ''; }, 4200);
}
function render() {
  const app = document.getElementById('app');
  try {
    if (S.ui.did && !S.despachos[S.ui.did]) { S.ui.did = null; S.ui.pid = null; }
    const r = ruta();
    app.innerHTML = marco(r) + avisos() + `<main class="wrap">${V[r]()}</main>` + pie();
    if (typeof medirTop === 'function') medirTop();
  } catch (e) {
    try { console.error(e); } catch (x) {}
    app.innerHTML = `<main class="wrap"><div class="card aviso"><h1>Algo no salió bien en esta pantalla</h1><p>Tus respuestas guardadas siguen en este dispositivo. Prueba volver al inicio. Si se repite, envía tus resultados al Equipo DELTA y avísales qué estabas haciendo.</p>
      <div class="row"><button class="btn p" data-a="rescate">Volver al inicio</button><button class="btn" data-a="codigo">Enviar mis resultados</button></div><p class="mini">Detalle técnico: ${esc(e && e.message || e)}</p></div></main>`;
  }
}
/* Avisos que dependen del dispositivo: almacenamiento y respaldo del equipo */
function avisos() {
  const out = [];
  if (!ALMACEN_OK) out.push('<div class="banda mal"><div class="wrap">Este navegador no está guardando tu avance (modo privado o sin espacio). Al terminar cada paso, envía tus resultados al Equipo DELTA.</div></div>');
  if (S.ui.modo === 'consultor' && S.ui.ultImport && (!S.ui.ultRespaldo || S.ui.ultRespaldo < S.ui.ultImport)) out.push('<div class="banda"><div class="wrap">Importaste resultados y no has guardado un respaldo desde entonces. <button class="lnk" data-a="exportar">Guardar respaldo (JSON)</button></div></div>');
  return out.join('');
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
function copiaManual(nombre, texto, msg, envio) {
  const m = document.getElementById('modal');
  m.innerHTML = `<div class="mbox" role="dialog" aria-label="Copiar datos"><h2>${esc(nombre)}</h2><p>${msg || 'Este visor no permite descargar archivos. Copia el contenido y pégalo en un archivo de texto con ese nombre.'}</p><textarea id="m-txt" readonly rows="${envio ? 4 : 10}">${esc(texto)}</textarea><div class="row end">${envio ? '<button class="btn" data-a="mcerrar">Cerrar</button><button class="btn" data-a="mcopiar">Copiar</button><button class="btn p wa-btn" data-a="compartir">Enviar por WhatsApp</button>' : '<button class="btn" data-a="mcerrar">Cerrar</button><button class="btn p" data-a="mcopiar">Copiar</button>'}</div></div>`;
  m.className = 'on';
}
function pedirAcceso() {
  const m = document.getElementById('modal');
  m.innerHTML = `<div class="mbox" role="dialog" aria-label="Acceso Equipo DELTA"><h2>Acceso Equipo DELTA</h2><p>Esta sección es para el equipo que acompaña a los despachos. Escribe el código de acceso.</p><input id="in-acceso" type="password" autocomplete="off" aria-label="Código de acceso" placeholder="Código"><p id="m-err" class="nota" role="alert" style="color:var(--rojo)"></p><div class="row end"><button class="btn" data-a="mcerrar">Cancelar</button><button class="btn p" data-a="acceso">Entrar</button></div></div>`;
  m.className = 'on'; setTimeout(() => { const i = document.getElementById('in-acceso'); if (i) i.focus(); }, 30);
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
  modo: v => { if (v === 'consultor' && !accesoOk()) return pedirAcceso(); S.ui.modo = v; save(); T.confirm = null; ir(NAV[v][0][0]); },
  acceso: () => { const i = document.getElementById('in-acceso'); if (!abrirAcceso(i.value)) { i.value = ''; i.focus(); document.getElementById('m-err').textContent = 'El código no es correcto.'; return; } document.getElementById('modal').className = ''; ACC.modo('consultor'); toast('Acceso del Equipo DELTA abierto en este dispositivo.'); },
  bloquear: () => { cerrarAcceso(); S.ui.modo = 'despacho'; save(); ir('inicio'); toast('Acceso del equipo cerrado en este dispositivo.'); },
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
  quiz: v => { const p = P(); if (!p) return; const cual = v === 'quizInicial' ? 'pre' : 'post'; if (!(p.conf && (p.conf[cual] || p.conf[cual + 'Omit']))) { T.conf = { cual, tipo: v }; render(); arriba(); return; } const f = (p.orden || 'AB')[v === 'quizInicial' ? 0 : 1]; T.conf = null; T.quiz = { tipo: v, forma: f, i: 0, resp: [], perm: FORMAS[f].map(q => barajar(q.o.length)) }; render(); arriba(); },
  confsalir: () => { T.conf = null; render(); arriba(); },
  confomitir: () => { const p = P(), z = T.conf; p.conf = p.conf || {}; p.conf[z.cual + 'Omit'] = true; save(); ACC.quiz(z.tipo); },
  confok: () => { const p = P(), z = T.conf, r = {}; let n = 0; CONFIANZA.forEach((t, i) => { const el = document.querySelector(`input[data-cf="${i}"]:checked`); if (el) { r[i] = +el.value; n++; } }); if (n < CONFIANZA.length) return toast('Contesta las ' + CONFIANZA.length + ' afirmaciones, o usa Omitir.'); p.conf = p.conf || {}; p.conf[z.cual] = r; p.ts = Date.now(); save(); ACC.quiz(z.tipo); },
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
    T.mod = T.ph = T.st = null; T.quiz = null; T.repaso = null; T.conf = null;
    if (t === 'r') T.repaso = true;
    else if (t === 'q') { if (x === 'quizFinal' && !p.quizInicial) return toast('Primero contesta el quiz inicial.'); if (location.hash !== '#capacitacion') { location.hash = 'capacitacion'; setTimeout(() => ACC.quiz(x), 0); return; } return ACC.quiz(x); }
    else T.mod = +x;
    if (location.hash === '#capacitacion') { render(); arriba(); } else location.hash = 'capacitacion';
  },
  copiar: v => { try { navigator.clipboard.writeText(v).then(() => toast('Enlace copiado.'), () => copiaManual('Enlace para el personal', v, 'Copia este enlace y envíalo al personal del despacho.')); } catch (e) { copiaManual('Enlace para el personal', v, 'Copia este enlace y envíalo al personal del despacho.'); } },
  mod: v => { T.mod = v ? +v : null; T.st = null; T.ph = null; T.sal = null; T.an = null; render(); arriba(); },
  phini: () => { T.ph = { i: 0, eleg: null, sen: {}, ok: 0, r: [], fin: false }; T.st = null; render(); arriba(); },
  phop: v => { const s = T.ph; s.eleg = v === '1'; s.r[s.i] = s.eleg === CORREOS[s.i].fraude; if (s.r[s.i]) s.ok++; regEj('ph', s.i, { e: s.eleg, s: Object.keys(s.sen).filter(k => s.sen[k]).map(Number) }); render(); },
  phsig: () => {
    const s = T.ph;
    if (s.i < CORREOS.length - 1) { s.i++; s.eleg = null; s.sen = {}; render(); return; }
    s.fin = true; const p = P(); p.phishing = { pct: s.ok / CORREOS.length * 100, fraudes: CORREOS.filter((c, i) => c.fraude && s.r[i]).length, legitimos: CORREOS.filter((c, i) => !c.fraude && s.r[i]).length, fecha: hoy() }; marcar(p, 1); render();
  },
  stop: v => { const s = T.st, it = ITEMS[s.key][s.i]; s.eleg = +v; if (s.eleg === it.c) s.ok++; if (it.h) s.h += it.h[s.eleg]; regEj(s.key, s.i, s.eleg); render(); },
  stsig: () => {
    const s = T.st, n = ITEMS[s.key].length;
    if (s.i < n - 1) { s.i++; s.eleg = null; render(); return; }
    s.fin = true; if (s.key === 'ia') { const p = P(); p.ia = { pct: s.ok / n * 100, fecha: hoy() }; marcar(p, 6); }
    if (s.key === 'reto') guardarReto();
    render();
  },
  strein: () => { T.st = null; render(); },
  rescate: () => { T.mod = T.quiz = T.ph = T.st = T.conf = T.repaso = T.reto = T.vista = null; location.hash = 'inicio'; render(); },
  selrev: v => { const z = T[v]; z.rev = true; regEj(v, null, Object.assign({}, z.m)); render(); },
  selre: v => { T[v] = null; render(); },
  vista: v => { T.vista = v || null; T.capr = null; if (!v) { T.reto = null; T.st = null; } render(); arriba(); },
  reto: v => { if (!P()) return; iniciarReto(v === 'p' ? 'p' : +v); render(); arriba(); },
  ics: () => { const p = P(); if (p && p.quizFinal) guardar('retos-ciberseguridad.ics', icsRetos(p), 'text/calendar'); },
  habok: () => { const p = P(); const hs = [...document.querySelectorAll('input[data-hab]:checked')].map(x => +x.dataset.hab); const pr = (document.getElementById('in-hab') || {}).value || ''; if (!hs.length && !pr.trim()) return toast('Elige al menos un hábito o escribe el tuyo.'); if (hs.length > 2) return toast('Elige como máximo 2: es mejor sostener pocos.'); p.meta = Object.assign(p.meta || {}, { habitos: hs, propio: pr.trim(), fecha: (p.meta && p.meta.fecha) || hoy() }); p.ts = Date.now(); save(); render(); toast('Hábitos guardados. Revísalos en el reto de los 30 días.'); },
  habrev: v => { const p = P(); p.meta = p.meta || {}; p.meta.revision = { r: v, fecha: hoy() }; p.ts = Date.now(); save(); render(); },
  cap: v => { T.vista = 'cap'; T.cap = v; T.capr = null; render(); arriba(); },
  capr: v => { const p = P(), c = CAPSULAS.find(x => x.id === T.cap); T.capr = { eleg: +v }; p.caps = p.caps || {}; if (!p.caps[c.id]) p.caps[c.id] = { fecha: hoy(), ok: +v === c.check.c }; p.ts = Date.now(); save(); render(); },
  constver: () => { T.nomConst = (document.getElementById('in-nom') || {}).value || ''; render(); },
  constpdf: () => { const p = P(); T.nomConst = (document.getElementById('in-nom') || {}).value || T.nomConst || ''; pdf(constanciaHTML(p, T.nomConst), 'constancia-' + slug(T.nomConst || p.alias)); },
  recuperar: async () => { const t = (document.getElementById('in-rec') || {}).value || ''; try { const r = await leerCodigos(t); render(); toast('Avance recuperado (' + r.codigos + ' código). Elige tu alias para continuar.'); } catch (e) { toast(e.message); } },
  rp: v => { T.rp = v || null; if (location.hash === '#resultados') { render(); arriba(); } else location.hash = 'resultados'; },
  pdfres: () => { const did = S.ui.did, p = T.rp && S.participantes[T.rp]; if (!did) return; pdf(p ? repIndividual(p) : repColectivo(did), p ? 'reporte-individual-' + slug(p.alias) + '-' + slug(S.despachos[did].nombre) : 'reporte-colectivo-' + slug(S.despachos[did].nombre)); },
  alinicio: () => { T.mod = null; location.hash = 'inicio'; },
  repsalir: () => { T.repaso = null; render(); arriba(); },
  repfin: () => { const p = P(); p.repaso = true; p.ts = Date.now(); save(); T.repaso = null; if (!p.quizFinal && p.quizInicial) ACC.paso('q:quizFinal'); else { render(); arriba(); } },
  calc: () => { T.mod = 5; T.quiz = T.ph = T.st = T.repaso = null; if (location.hash === '#capacitacion') { render(); arriba(); } else location.hash = 'capacitacion'; },
  salrev: () => { T.sal.rev = true; regEj('sal', null, Object.assign({}, T.sal.m)); render(); },
  salre: () => { T.sal = null; render(); },
  antog: v => { const z = T.an; z.sel[v] = !z.sel[v]; render(); },
  anrev: () => { T.an.rev = true; regEj('an', null, Object.assign({}, T.an.sel)); render(); },
  anre: () => { T.an = null; render(); },
  plan30auto: () => { const n = proponerPlan(S.ui.did); render(); toast(n ? 'Propuesta lista: ajusta responsables y fechas.' : 'Aún no hay hallazgos.'); },
  plantodos: () => { T.planTodos = !T.planTodos; render(); },
  plan: () => { const k = kit(S.ui.did).plan; k.listo = true; k.ts = Date.now(); marcar(P(), 4); render(); toast('Plan de respuesta generado.'); },
  politica: () => { const k = kit(S.ui.did).politica; k.listo = true; k.ts = Date.now(); marcar(P(), 7); render(); toast('Política de uso de IA generada.'); },
  hecho: v => {
    const n = +v, k = kit(S.ui.did);
    if (n === 5) { if (!calcListo(k.calculadora)) return toast('Faltan datos para calcular el costo.'); k.calculadora.fecha = hoy(); k.calculadora.ts = Date.now(); }
    marcar(P(), n); T.mod = null; if (!P()) { location.hash = 'inicio'; if (n === 5) ACC.codigo('calc'); else toast('Guardado.'); return; } render(); arriba(); if (n === 5) ACC.codigo('calc'); else toast('Módulo ' + n + ' completado.');
  },
  accfila: () => { const a = kit(S.ui.did).accesos; a.filas.push({ puesto: '', s: {} }); a.ts = Date.now(); save(); render(); },
  encuesta: () => { const e = S.encuesta[S.ui.did] || {}; if (!e.utilidad) return toast('Falta calificar la utilidad del servicio (1 a 5).'); if (!pagoOrden(e)) return toast('Revisa los cuatro precios: deberían ir de menor a mayor.'); e.ts = Date.now(); e.fecha = hoy(); save(); render(); ACC.codigo('encuesta'); },
  pdf: v => { const did = S.ui.did, n = slug(S.despachos[did].nombre); if (v === 'plan') pdf(planHTML(did), 'plan-de-respuesta-' + n); else if (v === 'efirma') pdf(efirmaProcHTML(did), 'perdida-de-efirma-' + n); else if (v === 'aviso') pdf(avisoHTML(did), 'aviso-de-vulneracion-' + n); else if (v === '69b') pdf(lista69bHTML(did), 'revision-69b-' + n); else if (v === 'propuesta') pdf(propuestaHTML(did), 'propuesta-' + n); else if (v === 'politica') pdf(politicaHTML(did), 'politica-de-ia-' + n); else pdf(reporteHTML(did), 'reporte-' + n); },
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
  codigo: async v => { if (!S.ui.did) return toast('Primero elige tu despacho.'); const c = await codigoResultados(S.ui.did), p = P(); const ant = v === 'quizInicial' ? `<b>Quiz inicial guardado.</b> Ahora envía este código al Equipo DELTA: es lo que permite medir tu avance al final. ` : v === 'quizFinal' ? `<b>Quiz final guardado${p && p.quizInicial ? ': pasaste de ' + r1(p.quizInicial.pct) + '% a ' + r1(p.quizFinal.pct) + '%' : ''}.</b> Envía este código al Equipo DELTA para que tu resultado cuente. ` : v === 'diag' ? `<b>Diagnóstico completo.</b> Envía este código al Equipo DELTA antes de la reunión de entrega: con él preparan tu reporte. ` : v === 'efirma' ? `<b>e.firmas y sellos completo.</b> Envía este código al Equipo DELTA antes de la reunión de entrega. No incluye RFC, nombres ni contraseñas. ` : v === 'ti' ? `<b>Cuestionario de TI completo.</b> Envía este código al Equipo DELTA: con él recomiendan la tecnología adecuada para el despacho. ` : v === 'calc' ? `<b>Calculadora guardada.</b> Envía este código al Equipo DELTA para que tu estimación aparezca en el reporte. ` : v === 'encuesta' ? `<b>Gracias, tu encuesta quedó guardada.</b> Envía este código al Equipo DELTA para que la reciban. ` : ''; const d = D(), txt = 'Resultados para el Equipo DELTA · ' + (p ? p.alias : 'Dueño o socio') + ' · ' + (d ? d.nombre + ' (' + d.id + ')' : '') + (ETQ[v] ? ' · ' + ETQ[v] : '') + '\n' + c; T.envio = txt;
    copiaManual(v ? 'Envía tus resultados' : 'Tus resultados', txt, ant + 'Toca <b>Enviar por WhatsApp</b> y elige el chat del Equipo DELTA. Si no se abre, usa <b>Copiar</b> y pégalo en un mensaje (WhatsApp o correo). Contiene tu alias y tus respuestas; no incluye datos de clientes.', true); },
  compartir: () => {
    const txt = T.envio || (document.getElementById('m-txt') || {}).value || '';
    const wa = () => { const w = window.open('https://wa.me/?text=' + encodeURIComponent(txt), '_blank', 'noopener'); if (!w) toast('No se pudo abrir WhatsApp. Usa Copiar y pégalo en el chat.'); };
    if (navigator.share && !EMBEBIDO) { navigator.share({ text: txt }).then(() => toast('Listo. Gracias por enviar tus resultados.'), e => { if (!e || e.name !== 'AbortError') wa(); }); }
    else wa();
  },
  impcod: async () => { try { const r = await leerCodigos(document.getElementById('in-cod').value); S.ui.ultImport = Date.now(); save(); render(); toast(r.codigos + ' código(s) importado(s): ' + r.n + ' registro(s) nuevos o actualizados.'); } catch (e) { toast('No se pudo importar: ' + e.message); } },
  exportar: () => { S.ui.ultRespaldo = Date.now(); save(); guardar('datos-piloto-' + hoy() + '.json', exportar(), 'application/json'); render(); },
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
  if (/^diagnostico\./.test(el.dataset.bind)) { const dg = diag(S.ui.did); if (!dg.aviso && diagListo(S.ui.did)) { dg.aviso = true; save(); ACC.codigo('diag'); } }
  if (/^efirma\./.test(el.dataset.bind)) { const e = efirma(S.ui.did); if (!e.aviso && efListo(S.ui.did)) { e.aviso = true; save(); ACC.codigo('efirma'); } }
  if (/^ti\./.test(el.dataset.bind)) { const t = tiDe(S.ui.did); if (!t.aviso && tiListo(S.ui.did)) { t.aviso = true; save(); ACC.codigo('ti'); } }
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
  if (t.dataset.sel != null) { const [k, i] = t.dataset.sel.split(':'); if (T[k]) T[k].m[i] = t.checked; return; }
  if (t.dataset.c === 'did') { S.ui.did = t.value || null; S.ui.pid = null; T.mod = T.quiz = T.ph = T.st = null; save(); render(); return; }
  if (t.id === 'in-json' && t.files && t.files[0]) {
    const fr = new FileReader();
    fr.onload = () => { try { const n = combinar(JSON.parse(fr.result)); render(); toast('Datos combinados: ' + n + ' registro(s) nuevos o actualizados.'); } catch (err) { toast('No se pudo importar: ' + err.message); } };
    fr.readAsText(t.files[0]);
  }
});
document.addEventListener('keydown', e => { if (e.key === 'Enter' && e.target.id === 'in-codigo') ACC.unir(); if (e.key === 'Enter' && e.target.id === 'in-alias') ACC.alias(); if (e.key === 'Enter' && e.target.id === 'in-acceso') ACC.acceso(); if (e.key === 'Escape' && document.getElementById('modal').className === 'on') ACC.mcerrar(); });
window.addEventListener('hashchange', () => { T.confirm = null; if (location.hash !== '#aprender') { T.vista = null; } render(); arriba(); });
window.addEventListener('afterprint', () => { document.getElementById('print-area').innerHTML = ''; });
(function entrarPorEnlace() {
  const m = (location.search || '').match(/[?&]d=(D-[A-Z0-9]{4})\b/i); if (!m) return;
  const c = m[1].toUpperCase();
  if (!S.despachos[c]) S.despachos[c] = { id: c, nombre: 'Despacho ' + c, stub: true, ts: Date.now() };
  S.ui.did = c; S.ui.pid = null; S.ui.modo = 'despacho'; save();
  try { history.replaceState(null, '', location.pathname + (/^#(ti|efirmas|diagnostico)$/.test(location.hash) ? location.hash : '#inicio')); } catch (e) {}
})();
function medirTop() { const h = document.querySelector('.top'); if (h) document.documentElement.style.setProperty('--topH', h.offsetHeight + 'px'); }
window.addEventListener('resize', medirTop);
try { if (navigator.storage && navigator.storage.persist) navigator.storage.persist().catch(() => {}); } catch (e) {}
if (location.protocol === 'https:' && /github\.io$/.test(location.hostname) && !EMBEBIDO) { // instalable y sin conexión solo en la dirección publicada
  [['manifest', 'manifest.webmanifest'], ['apple-touch-icon', 'icono-192.png'], ['icon', 'icono.svg']].forEach(([rel, href]) => { const l = document.createElement('link'); l.rel = rel; l.href = href; document.head.appendChild(l); });
  if ('serviceWorker' in navigator) { try { navigator.serviceWorker.register('sw.js').catch(() => {}); } catch (e) {} }
}
render();
