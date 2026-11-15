/* ===== Pantallas ===== */
const NAV = {
  despacho: [['inicio', 'Inicio'], ['capacitacion', 'Capacitación'], ['diagnostico', 'Diagnóstico'], ['reporte', 'Mi reporte'], ['encuesta', 'Encuesta']],
  consultor: [['despachos', 'Despachos'], ['proceso', 'Proceso clave'], ['inventario', 'Inventario'], ['oportunidades', 'Oportunidades'], ['tablero', 'Tablero'], ['datos', 'Datos']]
};
function ruta() {
  const h = (location.hash || '').replace('#', '');
  for (const m of ['despacho', 'consultor']) if (NAV[m].some(x => x[0] === h)) {
    if (m === 'consultor' && !accesoOk()) { S.ui.modo = 'despacho'; save(); setTimeout(pedirAcceso, 0); return 'inicio'; }
    if (S.ui.modo !== m) { S.ui.modo = m; save(); } return h;
  }
  if (S.ui.modo === 'consultor' && !accesoOk()) { S.ui.modo = 'despacho'; save(); }
  return NAV[S.ui.modo][0][0];
}
function ir(r) { if (location.hash === '#' + r) render(); else location.hash = r; }

/* --- Controles enlazados al estado --- */
const idOf = p => 'c_' + p.replace(/[^a-zA-Z0-9]/g, '_');
const val = p => { const v = getPath(p); return v == null ? '' : v; };
function inp(p, o = {}) { return `<input id="${idOf(p)}" data-bind="${p}" type="${o.type || 'text'}" value="${esc(val(p))}" placeholder="${esc(o.ph || '')}"${o.upd ? ` data-upd="${o.upd}"` : ''}${o.min != null ? ` min="${o.min}"` : ''}${o.type === 'number' ? ' inputmode="decimal" step="any"' : ''}>`; }
function area(p, o = {}) { return `<textarea id="${idOf(p)}" data-bind="${p}" rows="${o.rows || 2}" placeholder="${esc(o.ph || '')}">${esc(val(p))}</textarea>`; }
function sel(p, ops, o = {}) { const v = String(val(p)); return `<select id="${idOf(p)}" data-bind="${p}"${o.r ? ' data-r' : ''}${o.upd ? ` data-upd="${o.upd}"` : ''}><option value="">Elige…</option>${ops.map(x => `<option${v === String(x) ? ' selected' : ''}>${esc(x)}</option>`).join('')}</select>`; }
function chk(p, label, o = {}) { return `<label class="chk"><input id="${idOf(p)}" type="checkbox" data-bind="${p}"${val(p) ? ' checked' : ''}${o.upd ? ` data-upd="${o.upd}"` : ''}${o.r ? ' data-r' : ''}><span>${label}</span></label>`; }
const fld = (label, control, hint) => `<div class="f"><label for="${(control.match(/id="([^"]+)"/) || [])[1] || ''}">${label}</label>${control}${hint ? `<small>${hint}</small>` : ''}</div>`;
const lpill = l => pill(l, l.startsWith('Sesión') ? 'pres' : l.startsWith('Auto') ? 'auto' : 'ent');
const pill = (t, c) => `<span class="pill ${c || ''}">${esc(t)}</span>`;
const gpill = g => pill('Gravedad ' + g, 'g-' + g);
const sem = (s, p) => `<span class="sem sem-${s}"><i></i>${SEM_TXT[s]}${p == null ? '' : ' · ' + Math.round(p) + '%'}</span>`;
const pd = v => (v === '' || v == null) ? `<span class="tag-pd">${POR_DEFINIR}</span>` : esc(v);
const blanco = v => (v === '' || v == null) ? '<span class="linea">por capturar</span>' : esc(v);
const fuentesHTML = ks => ks.length ? `<div class="fuentes"><b>Fuentes</b><ul>${ks.map(k => `<li>${esc(FUENTES[k].t)}. <a href="${FUENTES[k].u}" target="_blank" rel="noopener">${FUENTES[k].u}</a></li>`).join('')}</ul><small>Contenido contrastado con estas fuentes el 12 de noviembre de 2026.</small></div>` : '';
const sinDespacho = () => `<div class="card aviso"><h2>Primero elige tu despacho</h2><p>Ve a <a href="#inicio">Inicio</a> y escribe el código que te dio el Equipo DELTA.</p></div>`;

/* --- Marco --- */
const LOGO = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3 4 6v6c0 4.5 3.4 8.2 8 9 4.6-.8 8-4.5 8-9V6l-8-3z"/><path d="m8.5 12 2.5 2.5 4.5-5"/></svg>';
/* Ruta del participante: orden en que se recorren los pasos y en qué momento */
/* Ruta mínima (lo que se mide) y complementaria (a tu ritmo). El Módulo 5 es del dueño o socio. */
const RUTA = [
  ['Antes de la sesión', [['q', 'quizInicial'], ['m', 1]]],
  ['Sesión en vivo', [['m', 4], ['m', 6]]],
  ['Antes de la reunión de entrega', [['r', 'repaso'], ['q', 'quizFinal']]],
  ['Complementario', [['m', 2], ['m', 3], ['m', 7]], true]
];
const PASOS_RUTA = RUTA.flatMap(([et, xs, comp]) => xs.map(x => ({ et, t: x[0], v: x[1], comp: !!comp })));
const MINIMA = PASOS_RUTA.filter(x => !x.comp), COMPL = PASOS_RUTA.filter(x => x.comp);
const pasoHecho = (p, x) => x.t === 'q' ? !!p[x.v] : x.t === 'r' ? !!p.repaso : !!(p.avance || [])[x.v - 1];
const pasoTxt = x => x.t === 'q' ? (x.v === 'quizInicial' ? 'Quiz inicial' : 'Quiz final') : x.t === 'r' ? 'Repaso: lo esencial de los 7 módulos' : 'Módulo ' + x.v + '. ' + MODULOS[x.v - 1].titulo;
const pasoMin = x => x.t === 'q' ? 5 : x.t === 'r' ? 5 : MODULOS[x.v - 1].min;
const pasoDesc = x => x.t === 'q' ? '14 preguntas, unos 5 minutos.' : x.t === 'r' ? 'Los puntos clave de cada módulo, en una sola pantalla. Unos 5 minutos.' : MODULOS[x.v - 1].ejercicio + ' · ' + MODULOS[x.v - 1].min + ' min';
const siguiente = p => MINIMA.find(x => !pasoHecho(p, x)) || COMPL.find(x => !pasoHecho(p, x));
const palabras = m => m.leccion.map(s => s[0] + ' ' + s[1]).join(' ').replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
const minLectura = m => Math.max(1, Math.round(palabras(m) / 180));
function navEstado(id) {
  const d = D(); if (!d) return '';
  if (id === 'capacitacion') { const p = P(); if (!p) return ''; const n = MINIMA.filter(x => pasoHecho(p, x)).length; return `<span class="st ${n === MINIMA.length ? 'ok' : ''}" title="Pasos de la ruta mínima">${n}/${MINIMA.length}</span>`; }
  if (id === 'diagnostico') { const n = diag(d.id).resp.filter(x => x != null).length; return n ? `<span class="st ${n === 30 ? 'ok' : ''}">${n}/30</span>` : ''; }
  if (id === 'encuesta') return (S.encuesta[d.id] || {}).ts ? '<span class="st ok">✓</span>' : '';
  return '';
}
function marco(r) {
  const ds = Object.values(S.despachos), d = D(), p = P(), cons = S.ui.modo === 'consultor';
  return `<header class="top"><div class="wrap topin">
    <a class="brand" href="#${NAV[S.ui.modo][0][0]}"><span class="logo">${LOGO}</span><span><b>Ciber Resiliencia como Servicio</b><em>Despachos contables · Equipo DELTA</em></span></a>
    <div class="ctl">${cons
      ? `<span class="modo-c">Equipo DELTA</span><select id="sel-despacho" data-c="did" aria-label="Despacho activo"><option value="">${ds.length ? 'Elige un despacho' : 'Sin despachos'}</option>${ds.map(x => `<option value="${esc(x.id)}"${x.id === S.ui.did ? ' selected' : ''}>${esc(x.nombre)}</option>`).join('')}</select><button class="btn sm" data-a="modo" data-v="despacho">Ver como despacho</button>`
      : `${d ? `<span class="quien"><b>${esc(d.nombre)}</b>${p ? ' · ' + esc(p.alias) : ''}</span>` : ''}<button class="lnk mini" data-a="modo" data-v="consultor">Acceso Equipo DELTA</button>`}
    </div></div>
    <nav class="tabs" aria-label="Secciones"><div class="wrap">${NAV[S.ui.modo].map(x => `<a href="#${x[0]}" class="${x[0] === r ? 'on' : ''}"${x[0] === r ? ' aria-current="page"' : ''}>${x[1]}${cons ? '' : navEstado(x[0])}</a>`).join('')}</div></nav>
  </header>`;
}
const pie = () => `<footer class="pie"><div class="wrap"><p>Proyecto académico del Equipo DELTA para el Reto Dell. Esta aplicación no es un producto de Dell y no cuenta con su respaldo ni patrocinio.</p><p>No pide ni guarda datos personales de los clientes del despacho. Los participantes se identifican con un alias. <button class="lnk" data-a="codigo">Copiar mis resultados para enviarlos</button> · <button class="lnk" data-a="exportar">Guardar respaldo (JSON)</button></p></div></footer>`;

/* ================= MODO DESPACHO ================= */
const V = {};
const vAlias = d => { const ps = participantesDe(d.id); return `<div class="card unir"><p class="eyebrow">${esc(d.nombre)}</p><h2>¿Quién va a participar?</h2><p>Escribe solo un alias, por ejemplo "Auxiliar 1" o "Socia". No uses tu nombre completo.</p>
  <div class="row"><input id="in-alias" placeholder="Alias" maxlength="30" aria-label="Alias" autocomplete="off"><button class="btn p" data-a="alias">Empezar</button></div>
  ${ps.length ? `<p class="mini">¿Ya empezaste en este dispositivo? Continúa con tu alias:</p><div class="row">${ps.map(x => `<button class="chip" data-a="pid" data-v="${x.id}">${esc(x.alias)}</button>`).join('')}</div>` : ''}</div>`; };
const sobreServicio = () => `<details class="sobre"><summary>Sobre el servicio: qué recibe el despacho y cuánto tiempo toma</summary>
  <div class="grid2">
    <div class="card"><h2>Qué recibe tu despacho</h2><ul class="lista">
      <li><b>Capacitación práctica</b> para dueños y colaboradores, con evaluación antes y después.</li>
      <li><b>Diagnóstico de madurez</b> en seis áreas y revisión del proceso de documentos fiscales.</li>
      <li><b>Reporte para el dueño o socio</b>, en términos de riesgo, costo y continuidad, con un plan de 30 días con responsables y fechas.</li>
      <li><b>Kit del despacho:</b> plan de respuesta, controles prioritarios, procedimiento de recuperación y política de uso de IA.</li></ul>
      <p class="nota">Sin costo durante el piloto académico.</p></div>
    <div class="card"><h2>Cuánto tiempo toma</h2><table class="t"><tbody>
      <tr><th>Antes de la sesión</th><td>≈ 25 min por persona</td><td>Quiz inicial y Módulo 1 con el simulador de mensajes fraudulentos, cada quien por su cuenta</td></tr>
      <tr><th>Sesión en vivo</th><td>60 min, por videollamada</td><td>Phishing y fraude fiscal, simulacro de ransomware y uso de IA, en equipo</td></tr>
      <tr><th>Antes de la reunión de entrega</th><td>≈ 10 min por persona</td><td>Repaso de lo esencial y quiz final. El dueño o socio contesta además el diagnóstico y la calculadora (≈ 25 min)</td></tr>
      <tr><th>Reunión de entrega</th><td>45 min, por videollamada</td><td>Con el dueño o socio: reporte, plan de 30 días, prueba de restauración y encuesta</td></tr>
      <tr><th>Complementario</th><td>≈ 25 min, opcional</td><td>Módulos 2, 3 y 7, a su ritmo durante la semana</td></tr></tbody></table><p class="nota">Todo se hace a distancia. No hace falta instalar nada. Lo obligatorio por persona suma unos 35 minutos, más la sesión en vivo.</p></div>
  </div>
  <div class="card"><h2>Lo que incluye la suscripción</h2><p>Después del piloto, el programa completo se imparte en tres sesiones y sigue las seis funciones del NIST Cybersecurity Framework 2.0: gobernar, identificar, proteger, detectar, responder y recuperar.</p>
    <div class="scroll"><table class="t"><thead><tr><th>Sesión</th><th>Duración</th><th>Temas</th></tr></thead><tbody>${PROGRAMA_SUSCRIPCION.map(x => `<tr><th>${x[0]}</th><td>${x[1]}</td><td>${x[2]}</td></tr>`).join('')}</tbody></table></div>
    ${fuentesHTML(['nist'])}</div></details>`;
V.inicio = () => {
  const d = D(), p = P();
  if (!d) return `<section class="hero"><p class="eyebrow">Piloto para despachos contables</p><h1>${LEMA}</h1>
    <p class="lead">Cada tema parte de lo que le importa a tu despacho: tus clientes, tus ingresos, tu reputación y tus obligaciones fiscales. No necesitas conocimientos técnicos.</p></section>
    <div class="card unir"><h2>Para empezar, escribe el código de tu despacho</h2><p>Viene en el mensaje del Equipo DELTA. Tiene esta forma: D-AB12. Si abriste la app desde el enlace del mensaje, este paso no aparece.</p><div class="row"><input id="in-codigo" placeholder="D-____" autocomplete="off" aria-label="Código del despacho" style="max-width:200px"><button class="btn p" data-a="unir">Entrar</button></div></div>
    ${sobreServicio()}`;
  if (!p) return `<h1>Bienvenida y bienvenido</h1>${vAlias(d)}${dueno(d)}${sobreServicio()}`;
  const hechos = MINIMA.filter(x => pasoHecho(p, x)).length, total = MINIMA.length, sig = siguiente(p), compH = COMPL.filter(x => pasoHecho(p, x)).length;
  const minRest = MINIMA.filter(x => !pasoHecho(p, x)).reduce((a, x) => a + pasoMin(x), 0);
  return `<div class="hola"><div><p class="eyebrow">${esc(d.nombre)}</p><h1>Hola, ${esc(p.alias)}</h1></div>
      <div class="avance"><div class="prog"><i style="width:${hechos / total * 100}%"></i></div><small><b>Ruta mínima: ${hechos} de ${total} pasos</b>${hechos < total ? ' · faltan unos ' + minRest + ' min' : ' · completa'} · complementario ${compH} de ${COMPL.length} · <button class="lnk" data-a="pid" data-v="">No soy ${esc(p.alias)}</button></small></div></div>
    ${sigueBloque(p)}
    <div class="etapas">${RUTA.map(([et, xs0, comp]) => { const xs = PASOS_RUTA.filter(x => x.et === et), n = xs.filter(x => pasoHecho(p, x)).length; return `<div class="etapa ${comp ? 'comp' : ''}"><h3>${comp ? 'Complementario' : et}<span>${n}/${xs.length}</span></h3>${comp ? '<p class="mini">A tu ritmo, durante la semana. Profundiza; no es requisito.</p>' : ''}${xs.map(x => { const ok = pasoHecho(p, x); return `<button class="paso-r ${ok ? 'ok' : x === sig ? 'ya' : ''}" data-a="paso" data-v="${x.t}:${x.v}"${x.v === 'quizFinal' && !p.quizInicial ? ' disabled title="Primero el quiz inicial"' : ''}><i></i><span>${pasoTxt(x)}<em>${pasoMin(x)} min</em></span></button>`; }).join('')}</div>`; }).join('')}</div>
    ${p.quizInicial ? `<div class="card paso"><div><h2>Envía tus resultados</h2><p>Se guardan solo en este dispositivo. La app te los pide al terminar el quiz inicial y el final; también puedes copiarlos aquí cuando quieras. No incluyen datos de clientes.</p></div><button class="btn" data-a="codigo">Copiar mis resultados</button></div>` : ''}
    ${dueno(d)}${sobreServicio()}`;
};
function sigueBloque(p) {
  const sig = siguiente(p), algo = PASOS_RUTA.some(x => pasoHecho(p, x)), minOk = MINIMA.every(x => pasoHecho(p, x));
  if (!sig) return `<div class="sigue fin"><div><h2>Terminaste toda la capacitación</h2><p>Copia tus resultados y envíalos al Equipo DELTA. En Capacitación puedes ver las respuestas explicadas.</p></div><button class="btn p" data-a="codigo">Copiar mis resultados</button></div>`;
  return `${minOk ? `<div class="fb bien"><b>Terminaste la ruta mínima.</b> Ya cuentas en la medición del piloto. Lo que sigue es complementario: profundiza en lo que más te sirva.</div>` : ''}<div class="sigue ${sig.comp ? 'compl' : ''}"><div><p class="eyebrow">${sig.comp ? 'Complementario · a tu ritmo' : 'Tu siguiente paso · ' + sig.et.toLowerCase()}</p><h2>${pasoTxt(sig)}</h2><p>${pasoDesc(sig)}</p></div><button class="btn p" data-a="paso" data-v="${sig.t}:${sig.v}">${algo ? 'Continuar' : 'Empezar'}</button></div>`;
}
function dueno(d) {
  const n = diag(d.id).resp.filter(x => x != null).length, e = S.encuesta[d.id] || {}, k = kit(d.id), cm = compromisos(d.id).length;
  const b = (h, t, s, m, ok, extra) => `<a class="big" href="#${h}"${extra || ''}><b>${t}</b><span>${s}</span><span class="meta-b ${ok ? 'ok' : ''}">${m}</span></a>`;
  return `<div><h2>Para el dueño o socio</h2><p class="nota" style="margin:4px 0 12px">Lo contesta una sola persona por despacho. Los dos primeros, <b>antes</b> de la reunión de entrega; los otros dos, <b>en</b> la reunión. Al terminar cada uno, la app te muestra un código para enviarlo al Equipo DELTA.</p><div class="dueno">
    ${b('diagnostico', 'Diagnóstico', '30 preguntas sobre cómo opera hoy el despacho. 15 min o menos.', n === 30 ? '✓ Completo' : n ? n + ' de 30 contestadas →' : 'Empezar →', n === 30)}
    ${b('capacitacion', 'Calculadora de costo', 'Cuánto le costaría al despacho un día sin operar. 8 min, con sus propios números.', calcListo(k.calculadora) ? '✓ Capturada' : 'Capturar →', calcListo(k.calculadora), ' data-a="calc"')}
    ${b('reporte', 'Mi reporte y plan de 30 días', 'Hallazgos, plan con responsables y fechas, prueba de restauración y kit.', cm ? '✓ ' + cm + ' acciones en el plan' : n ? 'Ver reporte →' : 'Se arma con el diagnóstico', !!cm)}
    ${b('encuesta', 'Encuesta', 'Tres minutos, al cerrar la reunión de entrega.', e.ts ? '✓ Enviada' : 'Contestar →', !!e.ts)}</div></div>`;
}

/* --- Capacitación --- */
V.capacitacion = () => {
  const d = D(); if (!d) return sinDespacho();
  const p = P();
  if (!p && T.mod === 5) return vModulo(null, 5);
  if (!p) return `<h1>Capacitación</h1>${vAlias(d)}`;
  if (T.quiz) return vQuiz(p);
  if (T.repaso) return vRepaso(p);
  if (T.mod) return vModulo(p, T.mod);
  const av = p.avance || [];
  const qi = p.quizInicial, qf = p.quizFinal;
  return `<h1>Capacitación</h1>
    <p class="activo">Participante: <b>${esc(p.alias)}</b> · <button class="lnk" data-a="pid" data-v="">Cambiar</button> · <a href="#inicio">Ver mi ruta</a></p>
    ${sigueBloque(p)}
    <div class="grid3 res">
      <div class="tile"><span>Evaluación inicial</span><b>${qi ? r1(qi.pct) + '%' : '—'}</b></div>
      <div class="tile"><span>Evaluación final</span><b>${qf ? r1(qf.pct) + '%' : '—'}</b></div>
      <div class="tile ${qi && qf && qf.pct - qi.pct >= 20 ? 'ok' : ''}"><span>Mejora</span><b>${qi && qf ? (qf.pct - qi.pct >= 0 ? '+' : '') + r1(qf.pct - qi.pct) + ' pts' : '—'}</b></div>
    </div>
    <div class="card paso ${qi ? 'hecho' : ''}"><div><h2>Quiz inicial</h2><p>14 preguntas, 5 minutos, antes de la sesión en vivo. Contesta lo que sabes hoy; las respuestas se revisan al final del programa.</p></div>
      ${qi ? pill('Completado', 'ok') : '<button class="btn p" data-a="quiz" data-v="quizInicial">Comenzar</button>'}</div>
    <h2 class="sep">Los 7 módulos <small>4, 6 y 1 son de la ruta mínima · 2, 3 y 7 complementarios · 5 para el dueño o socio</small></h2>
    <div class="mods">${MODULOS.map((m, i) => `<button class="mod ${av[i] ? 'hecho' : ''}" data-a="mod" data-v="${m.n}"><span class="n">${m.n}</span><span class="tx"><b>${m.titulo}</b><em>${m.ejercicio} · ${m.min} min</em></span><span class="tags">${lpill(m.lugar)}${[2, 3, 7].includes(m.n) ? pill('Complementario') : m.n === 5 ? pill('Dueño o socio') : ''}${av[i] ? pill('Completado', 'ok') : ''}</span></button>`).join('')}</div>
    <div class="card paso ${qf ? 'hecho' : ''}"><div><h2>Quiz final</h2><p>14 preguntas equivalentes a las del inicio, con otros casos. Se contesta en la reunión de entrega; al terminar verás tu mejora y la explicación de cada respuesta.</p></div>
      ${qf ? pill('Completado', 'ok') : (qi ? '<button class="btn p" data-a="quiz" data-v="quizFinal">Comenzar</button>' : pill('Primero el quiz inicial'))}</div>
    <div class="card paso"><div><h2>Envía tus resultados</h2><p>Tus respuestas se guardan solo en este dispositivo. Al terminar cada etapa, copia tus resultados y pégalos en un mensaje al Equipo DELTA. No incluyen datos de clientes.</p></div><button class="btn p" data-a="codigo">Copiar mis resultados</button></div>
    ${qf ? `<div class="card"><h2>Respuestas y explicaciones</h2>${[['Quiz final', qf], ['Quiz inicial', qi]].map(([t, z], n) => `<details${n ? '' : ' open'}><summary>${t} · ${r1(z.pct)}%</summary>${forma(z).map((q, i) => `<div class="qa"><p><b>${i + 1}. ${q.q}</b></p><p class="${z.resp[i] === q.c ? 'bien' : 'mal'}">Tu respuesta: ${esc(q.o[z.resp[i]] || 'sin respuesta')}</p>${z.resp[i] === q.c ? '' : `<p>Respuesta correcta: ${esc(q.o[q.c])}</p>`}<p class="exp">${q.e}</p></div>`).join('')}</details>`).join('')}</div>` : ''}`;
};
function vRepaso(p) {
  return `<p><button class="lnk" data-a="repsalir">← Volver</button></p><p class="eyebrow">Antes del quiz final</p><h1>Repaso: lo esencial de los 7 módulos</h1>
    <p class="lead">Unos 5 minutos. Si hiciste los módulos complementarios, te servirá de recordatorio; si no, aquí está lo más importante de cada uno.</p>
    <div class="repaso">${MODULOS.map(m => `<div class="card"><p class="eyebrow">Módulo ${m.n}</p><h2>${m.titulo}</h2><ul class="lista">${m.clave.map(c => `<li>${c}</li>`).join('')}</ul></div>`).join('')}</div>
    <div class="row end"><button class="btn p" data-a="repfin">Listo, ir al quiz final</button></div>`;
}
function vQuiz(p) {
  const z = T.quiz, QQ = FORMAS[z.forma], q = QQ[z.i], e = z.resp[z.i], QUIZ = QQ;
  return `<h1>${z.tipo === 'quizInicial' ? 'Quiz inicial' : 'Quiz final'}</h1>
    <div class="prog"><i style="width:${(z.i) / QUIZ.length * 100}%"></i></div>
    <div class="card"><p class="eyebrow">Pregunta ${z.i + 1} de ${QUIZ.length} · Módulo ${q.m}</p><h2>${q.q}</h2>
      <div class="ops">${z.perm[z.i].map(k => `<button class="op ${e === k ? 'sel' : ''}" data-a="qop" data-v="${k}">${esc(q.o[k])}</button>`).join('')}</div>
      <div class="row end"><button class="btn" data-a="qsalir">Salir sin guardar</button><button class="btn p" data-a="qsig" ${e == null ? 'disabled' : ''}>${z.i === QUIZ.length - 1 ? 'Terminar' : 'Siguiente'}</button></div></div>`;
}
function vModulo(p, n) {
  const m = MODULOS[n - 1], did = S.ui.did;
  return `<p>${p ? '<button class="lnk" data-a="mod" data-v="">← Volver a la capacitación</button>' : '<button class="lnk" data-a="alinicio">← Volver al inicio</button>'}</p>
    <p class="eyebrow">Módulo ${m.n} · ${m.tema} ${lpill(m.lugar)}</p><h1>${m.titulo}</h1>${!p ? '<p class="nota">Lo llena el dueño o socio con los números del despacho. No necesita alias.</p>' : ''}
    <div class="card leccion"><h2>Microlección <small>lectura de unos ${minLectura(m)} min</small></h2>${m.leccion.map(s => `<h3>${s[0]}</h3><div>${s[1]}</div>`).join('')}${m.clave ? `<div class="clave"><b>Lo esencial</b><ul>${m.clave.map(c => `<li>${c}</li>`).join('')}</ul></div>` : ''}${fuentesHTML(m.fuentes)}</div>
    <div class="card ejercicio"><h2>Ejercicio: ${m.ejercicio}</h2>${m.solo ? `<p class="nota">${m.solo}</p>` : ''}${EJ[n](p, did)}</div>
    ${m.guia ? `<details class="card guia"><summary>Guía para conversar en la sesión en vivo</summary><ol>${m.guia.map(g => `<li>${g}</li>`).join('')}</ol></details>` : ''}`;
}
function calcComp(c) {
  const a = num(c.diasHoy), b = num(c.diasMeta);
  if (!(a > 0) || c.diasMeta === '' || c.diasMeta == null || !calcListo(c)) return `<p class="nota">Cada día adicional detenido le cuesta al despacho unos <b>${mxn(calcDia(c))}</b>. Captura los dos escenarios de arriba para ver cuánto vale reducir la interrupción.</p>`;
  const ta = calcCosto(c, a).total, tb = calcCosto(c, b).total;
  return `<div class="grid3 res"><div class="tile"><span>Hoy: ${r1(a)} día(s)</span><b>${mxn(ta)}</b></div><div class="tile"><span>Con medidas: ${r1(b)} día(s)</span><b>${mxn(tb)}</b></div><div class="tile ${ta > tb ? 'ok' : ''}"><span>Diferencia por incidente</span><b>${mxn(ta - tb)}</b></div></div><p class="nota">Cada día menos de interrupción vale unos <b>${mxn(calcDia(c))}</b> para tu despacho. Sirve para comparar contra lo que cuesta un respaldo probado o un equipo de reemplazo.</p>`;
}
const marcar = (p, n) => { if (!p) return save(); p.avance = p.avance || []; p.avance[n - 1] = true; p.ts = Date.now(); save(); };

/* Ejercicio paso a paso genérico (simulacro, clasificadores, dilemas, enlaces) */
const FIJO = { ia: 1, bk: 1, url: 1 }; // opciones que son categorías: no se barajan
function pasos(key, items, alFinal, o = {}) {
  if (!T.st || T.st.key !== key) T.st = { key, i: 0, eleg: null, ok: 0, h: 0, fin: false, perm: items.map(it => FIJO[key] ? it.o.map((x, k) => k) : barajar(it.o.length)) };
  const s = T.st;
  if (s.fin) return alFinal(s);
  const it = items[s.i];
  return `<div class="prog"><i style="width:${s.i / items.length * 100}%"></i></div><div class="row between"><p class="eyebrow">${s.i + 1} de ${items.length}</p>${o.extra ? o.extra(s) : ''}</div><p class="caso">${it.q}</p>
    <div class="ops ${FIJO[key] ? 'cat' : ''}">${s.perm[s.i].map(k => `<button class="op ${s.eleg === k ? (k === it.c ? 'bien' : 'mal') : ''} ${s.eleg != null && k === it.c ? 'bien' : ''}" data-a="stop" data-v="${k}" ${s.eleg != null ? 'disabled' : ''}>${esc(it.o[k])}</button>`).join('')}</div>
    ${s.eleg != null ? `<div class="fb ${s.eleg === it.c ? 'bien' : 'mal'}"><b>${s.eleg === it.c ? (o.bien || 'Buena decisión.') : (o.mal || 'Hay una opción mejor.')}</b> ${it.fb(s.eleg)}</div><div class="row end"><button class="btn p" data-a="stsig">${s.i === items.length - 1 ? 'Continuar' : 'Siguiente'}</button></div>` : ''}`;
}
const ITEMS = {
  rs: RANSOM.pasos.map(x => ({ q: x.q, o: x.o.map(y => y[0]), c: x.o.findIndex(y => y[1]), fb: k => x.o[k][2], h: x.o.map(y => y[3] || 0) })),
  ia: IA_CASOS.map(x => ({ q: x.t, o: IA_OPC, c: x.c, fb: k => (k === x.c ? '' : 'La clasificación adecuada es «' + IA_OPC[x.c] + '». ') + x.e })),
  bk: RESP_CASOS.map(x => ({ q: x.t, o: RESP_OPC, c: x.c, fb: k => (k === x.c ? '' : 'Es «' + RESP_OPC[x.c].toLowerCase() + '». ') + x.e })),
  url: URLS.map(x => ({ q: '¿A dónde lleva esta dirección?<br><code class="url">' + esc(x.u) + '</code>', o: URL_OPC, c: x.c, fb: () => x.e })),
  dl: DILEMAS.map(x => ({ q: x.t, o: x.o.map(y => y[0]), c: x.o.findIndex(y => y[1]), fb: k => x.o[k][2] }))
};
const RS_MEJOR = ITEMS.rs.reduce((a, x) => a + x.h[x.c], 0);
const hTxt = h => (Math.round(h * 10) / 10) + ' h';

/* Mensaje simulado: correo o WhatsApp */
function mensajeHTML(c) {
  if (c.canal === 'WhatsApp') return `<div class="mail wa"><div class="mh"><div><span>WhatsApp</span><b>${esc(c.de)}</b> · ${esc(c.dir)}</div></div><div class="mb"><p class="burbuja">${nl2br(c.cuerpo)}</p></div></div>`;
  return `<div class="mail"><div class="mh"><div><span>De</span><b>${esc(c.de)}</b> &lt;${esc(c.dir)}&gt;</div><div><span>Asunto</span><b>${esc(c.asunto)}</b></div></div>
    <div class="mb"><p>${nl2br(c.cuerpo)}</p>${c.link ? `<p><span class="mlink" tabindex="0" data-url="${esc(c.link[1])}">${esc(c.link[0])}</span></p>` : ''}${c.adj ? `<p class="adj">Adjunto: <b>${esc(c.adj)}</b></p>` : ''}</div></div>`;
}
/* Taller de anonimización */
const ANON_T = ANON.filter(x => typeof x !== 'string');
function taller() {
  const z = T.an || (T.an = { sel: {}, rev: false }); let i = -1;
  const txt = ANON.map(x => { if (typeof x === 'string') return esc(x); i++; const cl = z.rev ? (x.s ? (z.sel[i] ? 't-ok' : 't-falta') : (z.sel[i] ? 't-sobra' : '')) : (z.sel[i] ? 'on' : ''); return `<button class="tok ${cl}" data-a="antog" data-v="${i}" ${z.rev ? 'disabled' : ''} aria-pressed="${z.sel[i] ? 'true' : 'false'}">${esc(x.t)}</button>`; }).join('');
  let out = `<p>Un auxiliar quiere pegar este texto en una herramienta de IA para que le ayude con una conciliación. <b>Toca cada dato que hay que sustituir o eliminar antes de pegarlo.</b></p><p class="nota">Todos los datos son inventados para el ejercicio.</p><p class="anon">${txt}</p>`;
  if (!z.rev) return out + `<div class="row end"><button class="btn p" data-a="anrev">Revisar</button></div>`;
  const sens = ANON_T.map((x, k) => [x, k]).filter(y => y[0].s), ok = sens.filter(y => z.sel[y[1]]), falta = sens.filter(y => !z.sel[y[1]]), sobra = ANON_T.map((x, k) => [x, k]).filter(y => !y[0].s && z.sel[y[1]]);
  out += `<div class="fb ${falta.length ? 'mal' : 'bien'}"><b>Encontraste ${ok.length} de ${sens.length} datos que identifican a alguien.</b>${falta.length ? ` Te faltaron (en rojo):<ul>${falta.map(y => `<li><b>${esc(y[0].t)}</b>: ${y[0].p}</li>`).join('')}</ul>` : ' Ninguno se te pasó.'}${sobra.length ? `<p>Marcaste ${sobra.length} que podían quedarse (en gris): ${sobra.map(y => esc(y[0].t)).join(', ')}. Los montos y el mes no identifican a nadie, y sin ellos la herramienta no puede ayudar.</p>` : ''}</div>
    <h3>Así queda listo para pegar</h3><p class="escenario">${ANON.map(x => typeof x === 'string' ? esc(x) : (x.s ? '<b>' + esc(x.r) + '</b>' : esc(x.t))).join('')}</p>
    <p class="nota">La tabla de equivalencias (quién es "Cliente A") se queda en el despacho. Aun anonimizado, se usa una cuenta aprobada por el despacho y el resultado se verifica.</p>
    <div class="row end"><button class="btn" data-a="anre">Repetir</button></div>`;
  return out;
}

const EJ = {
  1: (p) => {
    const N = CORREOS.length, practica = () => `<h3 class="parte">Práctica adicional: lee la dirección antes de abrirla <small>3 min, opcional</small></h3><p>La parte que manda en una dirección es la que queda <b>justo antes de la primera diagonal sola</b>. Se lee de derecha a izquierda.</p>` + pasos('url', ITEMS.url, s => `<p>${pill(s.ok + ' de ' + ITEMS.url.length + ' direcciones leídas correctamente', 'ok')}</p><p class="nota">Las direcciones ajenas de esta práctica son ficticias. Los sitios oficiales los indica el SAT en su página sobre correos apócrifos.</p><div class="row"><button class="btn" data-a="strein">Repetir la práctica</button></div>`, { bien: 'Correcto.', mal: 'No es así.' });
    if (!T.ph) return `<p>Verás ${N} mensajes de ejemplo, por correo y por WhatsApp. Algunos son intentos de fraude y otros son legítimos. En cada uno, marca las señales de alerta que encuentres y decide. Pasa el cursor (o toca) sobre un enlace para ver a dónde lleva.</p><p class="nota">Son mensajes de capacitación con remitentes ficticios. Ninguno fue enviado a tu despacho.</p>
      ${p.phishing ? `<p>${pill('Resultado anterior: ' + r1(p.phishing.pct) + '% de aciertos', 'ok')}</p>` : ''}<p><button class="btn p" data-a="phini">${p.phishing ? 'Repetir el simulador' : 'Comenzar el simulador'}</button></p>${practica()}`;
    const s = T.ph;
    if (s.fin) {
      const pc = s.ok / N * 100, fr = CORREOS.map((c, i) => [c, i]).filter(x => x[0].fraude), le = CORREOS.map((c, i) => [c, i]).filter(x => !x[0].fraude), fo = fr.filter(x => s.r[x[1]]).length, lo = le.filter(x => s.r[x[1]]).length;
      return `<div class="grid3 res"><div class="tile ${pc >= 80 ? 'ok' : ''}"><span>Mensajes bien identificados</span><b>${s.ok} de ${N} · ${r1(pc)}%</b></div><div class="tile"><span>Fraudes que detectaste</span><b>${fo} de ${fr.length}</b></div><div class="tile"><span>Legítimos que reconociste</span><b>${lo} de ${le.length}</b></div></div>
        <p>${pc >= 80 ? 'Alcanzaste la meta sugerida del piloto (80%).' : 'La meta sugerida del piloto es 80%. Puedes repetir el simulador cuando quieras.'}</p>
        ${fo < fr.length ? `<div class="fb mal"><b>Se te pasaron ${fr.length - fo} fraude(s).</b> Es el error que más cuesta. Antes de decidir, pregúntate qué te está pidiendo el mensaje: si es dinero, un cambio de cuenta, una contraseña o un código, se verifica por otro canal.</div>` : ''}
        ${lo < le.length ? `<div class="fb mal"><b>Marcaste como fraude ${le.length - lo} mensaje(s) legítimo(s).</b> Desconfiar de todo también cuesta: frena el trabajo y a los clientes. La prisa sola no es fraude; una llamada a un número conocido resuelve la duda.</div>` : ''}
        <div class="row"><button class="btn" data-a="phini">Repetir</button><button class="btn p" data-a="mod" data-v="">Volver a la capacitación</button></div>${practica()}`;
    }
    const c = CORREOS[s.i], resp = s.eleg != null, bien = resp && s.eleg === c.fraude;
    return `<div class="prog"><i style="width:${s.i / N * 100}%"></i></div><p class="eyebrow">Mensaje ${s.i + 1} de ${N}</p>${mensajeHTML(c)}
      <fieldset class="sen" ${resp ? 'disabled' : ''}><legend>Señales de alerta que encuentras</legend>${SENALES.map((t, k) => `<label class="chk ${resp && c.s.includes(k) ? 'presente' : ''}"><input type="checkbox" data-sen="${k}" ${s.sen[k] ? 'checked' : ''}><span>${t}</span></label>`).join('')}</fieldset>
      ${resp ? `<div class="fb ${bien ? 'bien' : 'mal'}"><b>${bien ? 'Correcto.' : 'No es correcto.'}</b> ${c.exp}${c.s.length ? ` <br><small>Señales presentes resaltadas arriba. Marcaste ${c.s.filter(k => s.sen[k]).length} de ${c.s.length}.</small>` : ''}</div><div class="row end"><button class="btn p" data-a="phsig">${s.i === N - 1 ? 'Ver resultado' : 'Siguiente mensaje'}</button></div>`
        : `<div class="row dec"><button class="btn big-ok" data-a="phop" data-v="0">Legítimo</button><button class="btn big-no" data-a="phop" data-v="1">Fraude</button></div>`}`;
  },
  2: (p, did) => {
    const a = kit(did).accesos, b = 'kit.' + did + '.accesos', z = T.sal || (T.sal = { m: {}, rev: false });
    const okN = SALIDA.items.filter((x, i) => !!z.m[i] === x[1]).length;
    return `<h3 class="parte">Parte 1 · Caso: el último día de un colaborador</h3><p class="escenario">${SALIDA.intro}</p>
      <fieldset class="sen" ${z.rev ? 'disabled' : ''}><legend>Marca lo que debe quedar hecho hoy</legend>${SALIDA.items.map((x, i) => `<label class="chk ${z.rev ? (!!z.m[i] === x[1] ? 'r-ok' : 'r-mal') : ''}"><input type="checkbox" data-sal="${i}" ${z.m[i] ? 'checked' : ''}><span>${x[0]}${z.rev ? `<small><b>${x[1] ? 'Sí, hoy.' : 'No.'}</b> ${x[2]}</small>` : ''}</span></label>`).join('')}</fieldset>
      ${z.rev ? `<div class="fb ${okN === SALIDA.items.length ? 'bien' : 'mal'}"><b>${okN} de ${SALIDA.items.length} bien resueltas.</b> La lista de salida conviene tenerla escrita antes de necesitarla: el día de una salida nadie tiene cabeza para pensarla.</div><div class="row end"><button class="btn" data-a="salre">Repetir el caso</button></div>` : `<div class="row end"><button class="btn p" data-a="salrev">Revisar</button></div>`}
      <h3 class="parte">Parte 2 · El mapa de accesos de tu despacho</h3><p>Anota quién accede a qué. Usa puestos o alias, no nombres completos. No escribas contraseñas ni datos de clientes.</p>
      <div class="scroll"><table class="t ed"><thead><tr><th>Puesto o alias</th>${SISTEMAS.map(s => `<th>${s}</th>`).join('')}</tr></thead><tbody>
      ${a.filas.map((f, i) => `<tr><td>${inp(`${b}.filas.${i}.puesto`, { ph: 'Auxiliar ' + (i + 1), upd: 'mapa' })}</td>${SISTEMAS.map((s, k) => `<td class="c"><input type="checkbox" aria-label="${s}" data-bind="${b}.filas.${i}.s.${k}" data-upd="mapa" ${f.s && f.s[k] ? 'checked' : ''}></td>`).join('')}</tr>`).join('')}</tbody></table></div>
      <p><button class="btn" data-a="accfila">Agregar persona</button></p>
      <div id="upd-mapa">${UPD.mapa()}</div>
      <div class="grid2">${fld('¿Dónde se guardan los archivos .key de los clientes?', sel(b + '.key', ['Carpeta con acceso restringido', 'Carpeta compartida por todos', 'Memoria USB', 'Correo o chat', 'No lo sé'], { r: 1 }))}
      ${fld('¿Dónde se guardan las contraseñas?', sel(b + '.pass', ['Gestor de contraseñas', 'Libreta o notas', 'Hoja de cálculo', 'De memoria o repetidas', 'No lo sé'], { r: 1 }))}</div>
      ${a.key && a.key !== 'Carpeta con acceso restringido' ? '<div class="fb mal">Los archivos .key conviene guardarlos en una carpeta a la que solo entren quienes los usan, separados de sus contraseñas.</div>' : ''}
      ${a.pass && a.pass !== 'Gestor de contraseñas' ? '<div class="fb mal">Un gestor de contraseñas evita libretas, hojas de cálculo y contraseñas repetidas.</div>' : ''}
      <div class="row end"><button class="btn p" data-a="hecho" data-v="2">Guardar y marcar el módulo como completado</button></div>`;
  },
  3: (p, did) => {
    const b = 'kit.' + did + '.restauracion';
    return `<h3 class="parte">Parte 1 · ¿Respaldo o no?</h3><p>Seis situaciones que se ven en despachos. Clasifica cada una.</p>` + pasos('bk', ITEMS.bk, s => `<p>${pill(s.ok + ' de ' + ITEMS.bk.length + ' situaciones bien clasificadas', 'ok')}</p><p>Las cuatro condiciones de un buen respaldo: automático, con una copia fuera de la oficina o desconectada, con versiones y probado.</p><div class="row"><button class="btn" data-a="strein">Repetir</button></div>`, { bien: 'Correcto.', mal: 'No exactamente.' }) +
      `<h3 class="parte">Parte 2 · Información crítica de tu despacho</h3><p>Marca lo que, si se perdiera, detendría tu operación.</p><div class="cols2">${INFO_CRITICA.map((t, i) => chk(`${b}.info.${i}`, t)).join('')}</div>
      ${fld('¿Dónde están los respaldos hoy?', inp(b + '.donde', { ph: 'Por ejemplo: disco externo en la oficina y servicio en la nube' }))}
      <div class="grid2">${fld('Si hoy fallara todo, ¿de cuándo sería la copia más reciente?', sel(b + '.rpo', ['De hoy o de ayer', 'De esta semana', 'De este mes', 'Más antigua', 'No hay copia', 'No lo sé']), 'Es el trabajo que habría que rehacer.')}${fld('¿Cuánto tardarían en volver a trabajar?', sel(b + '.rto', ['Unas horas', 'Un día', 'De dos a tres días', 'Más de tres días', 'No lo sé']), 'Si nunca se ha probado, la respuesta honesta es "No lo sé".')}</div>
      <h3 class="parte">Parte 3 · Prueba de restauración <small>se hace en la reunión de entrega</small></h3><p>Elige un archivo de prueba (no de un cliente), recupéralo desde el respaldo y comprueba que abre.</p>
      ${chk(b + '.ok', '<b>Restauramos con éxito un archivo de prueba</b>')}
      <div class="grid3">${fld('Fecha de la prueba', inp(b + '.fecha', { type: 'date' }))}${fld('Minutos que tomó', inp(b + '.tiempo', { type: 'number', min: 0 }))}${fld('Observaciones', inp(b + '.obs', { ph: 'Qué funcionó y qué no' }))}</div>
      <div class="row end"><button class="btn p" data-a="hecho" data-v="3">Guardar y marcar el módulo como completado</button></div>`;
  },
  4: (p, did) => `<p class="escenario">${RANSOM.intro}</p>` + pasos('rs', ITEMS.rs, s => {
    const b = 'kit.' + did + '.plan', k = kit(did).plan, c = kit(did).calculadora, extra = s.h - RS_MEJOR;
    return `<div class="grid3 res"><div class="tile ${s.ok === ITEMS.rs.length ? 'ok' : ''}"><span>Decisiones acertadas</span><b>${s.ok} de ${ITEMS.rs.length}</b></div><div class="tile"><span>Tu reloj: interrupción</span><b>${hTxt(s.h)}</b></div><div class="tile"><span>El mejor camino</span><b>${hTxt(RS_MEJOR)}</b></div></div>
      <p>${extra > 0 ? `Tus decisiones sumaron <b>${hTxt(extra)}</b> de interrupción adicional.` : 'Seguiste el camino más corto: la interrupción que queda es la de restaurar.'} ${extra > 0 && calcListo(c) && num(c.horasDia) > 0 ? `Con los números que capturó tu despacho en la calculadora del Módulo 5, esas horas equivalen a unos <b>${mxn(extra / num(c.horasDia) * calcDia(c))}</b>.` : ''}</p>
      <p class="nota">Las horas del simulacro son ilustrativas: sirven para comparar decisiones, no son estadísticas ni un pronóstico.</p>
      <h3 class="parte">Ahora, el plan de tu despacho</h3><p>Captura los contactos de tu despacho. Usa puestos o nombres de pila; los teléfonos son los de tu despacho y tu soporte.</p>
      <div class="grid2">${fld('Responsable interno de incidentes', inp(b + '.resp', { ph: 'Quién coordina' }))}${fld('Suplente', inp(b + '.sup', { ph: 'Quién coordina si no está' }))}
      ${fld('Soporte técnico', inp(b + '.soporte', { ph: 'Persona o empresa' }))}${fld('Teléfono de soporte técnico', inp(b + '.soporteTel', { ph: 'Captúralo tú' }))}
      ${fld('A quién se avisa', inp(b + '.avisar', { ph: 'Socios, clientes afectados, asesor legal…' }))}${fld('Dónde están los respaldos', inp(b + '.respaldos', { ph: 'Ubicación y quién tiene acceso' }))}</div>
      ${fld('Qué se recupera primero', inp(b + '.prioridad', { ph: 'Por ejemplo: clientes con vencimiento más cercano' }))}
      <div class="row end"><button class="btn" data-a="strein">Repetir el simulacro</button><button class="btn p" data-a="plan">Generar el plan de respuesta</button></div>
      ${k.listo ? `<div class="paper">${planHTML(did)}</div><div class="row end"><button class="btn p" data-a="pdf" data-v="plan">Guardar el plan en PDF</button></div>` : ''}`;
  }, { extra: s => `<p class="reloj" title="Horas de interrupción acumuladas">Reloj: <b>${hTxt(s.h)}</b> de interrupción</p>` }),
  5: (p, did) => {
    const b = 'kit.' + did + '.calculadora', o = { type: 'number', min: 0, upd: 'calc' };
    return `<p>Captura los datos de tu despacho. La app no usa cifras externas: todo el cálculo sale de lo que escribas aquí.</p>
      <div class="grid3">${fld('Número de empleados', inp(b + '.empleados', o))}${fld('Costo por hora por empleado (MXN)', inp(b + '.costoHora', o))}${fld('Horas de trabajo por día', inp(b + '.horasDia', o))}
      ${fld('Ingresos diarios aproximados (MXN)', inp(b + '.ingresosDia', o), 'Si esos ingresos se recuperan trabajando después, escribe 0.')}${fld('Costo estimado de recuperación técnica (MXN)', inp(b + '.recuperacion', o), 'Soporte, reinstalación, restauración.')}${fld('Clientes con entregas en riesgo', inp(b + '.clientesRiesgo', o))}
      ${fld('Posibles recargos por cliente (MXN)', inp(b + '.recargoCliente', o), 'Estimación propia; déjalo en blanco si no aplica.')}</div>
      <h3 class="parte">Compara dos escenarios</h3>
      <div class="grid2">${fld('Días que hoy tardarían en volver a operar', inp(b + '.diasHoy', o), 'Tu mejor estimación. La prueba de restauración del Módulo 3 ayuda a afinarla.')}${fld('Días que tardarían con las medidas del plan', inp(b + '.diasMeta', o), 'Por ejemplo, con respaldo probado y un equipo de reemplazo.')}</div>
      <div id="upd-calc">${UPD.calc()}</div>
      <div class="row end"><button class="btn p" data-a="hecho" data-v="5">Guardar y marcar el módulo como completado</button></div>`;
  },
  6: (p) => `<h3 class="parte">Parte 1 · Clasifica ${ITEMS.ia.length} casos</h3>` + pasos('ia', ITEMS.ia, s => { const pc = s.ok / ITEMS.ia.length * 100; return `<div class="tile ok"><span>Casos clasificados correctamente</span><b>${s.ok} de ${ITEMS.ia.length} · ${r1(pc)}%</b></div><p>Regla práctica: si identifica a un cliente, se anonimiza; si es una credencial, nunca; y todo resultado se verifica.</p><div class="row"><button class="btn" data-a="strein">Repetir</button><button class="btn p" data-a="mod" data-v="">Volver a la capacitación</button></div>`; }, { bien: 'Correcto.', mal: 'No es la clasificación adecuada.' })
    + ((T.st && T.st.fin) || (p.avance || [])[5] ? `<h3 class="parte">Parte 2 · Taller de anonimización</h3>${taller()}` : '<p class="nota">Al terminar los casos se abre la Parte 2: un taller para anonimizar un texto real de trabajo.</p>'),
  7: (p, did) => pasos('dl', ITEMS.dl, s => {
    const b = 'kit.' + did + '.politica', k = kit(did).politica;
    return `<p>${pill(s.ok + ' de ' + ITEMS.dl.length + ' dilemas resueltos de forma adecuada', 'ok')}</p><h3 class="parte">La política de tu despacho</h3>
      <div class="grid2">${fld('Herramientas de IA aprobadas por el despacho', inp(b + '.herramientas', { ph: 'Descríbelas en general o escribe "las que apruebe el titular"' }))}${fld('Responsable de la política', inp(b + '.responsable', { ph: 'Puesto' }))}
      ${fld('¿Cómo se informa a los clientes?', sel(b + '.informa', ['En la carta de servicios', 'En el aviso de privacidad', 'En una comunicación por escrito', 'En la reunión de inicio de servicio']))}${fld('¿Cada cuándo se revisa?', sel(b + '.revision', ['Cada 6 meses', 'Cada año']))}</div>
      <div class="row end"><button class="btn" data-a="strein">Repetir los dilemas</button><button class="btn p" data-a="politica">Generar la política de uso de IA</button></div>
      ${k.listo ? `<div class="paper">${politicaHTML(did)}</div><div class="row end"><button class="btn p" data-a="pdf" data-v="politica">Guardar la política en PDF</button></div>` : ''}`;
  })
};

/* Bloques que se actualizan sin redibujar toda la pantalla */
const UPD = {
  diagprog: () => { const n = diag(S.ui.did).resp.filter(x => x != null).length, a = document.querySelector('nav a[href="#diagnostico"]'); if (a) a.innerHTML = 'Diagnóstico' + navEstado('diagnostico'); return `<div class="prog"><i style="width:${n / 30 * 100}%"></i></div><small><b>${n} de 30</b> contestadas${n === 30 ? ' · resultado abajo' : ''}</small>`; },
  rep: () => reporteHTML(S.ui.did),
  mapa: () => {
    const a = kit(S.ui.did).accesos, fs = a.filas.filter(f => (f.puesto || '').trim() || Object.values(f.s || {}).some(Boolean)), n = fs.length;
    if (!n) return '';
    const cnt = SISTEMAS.map((s, k) => fs.filter(f => f.s && f.s[k]).length), todo = fs.filter(f => SISTEMAS.every((s, k) => f.s && f.s[k])).length, notas = [];
    if (todo && n > 1) notas.push(`${todo} persona(s) tienen acceso a todo. Si una de esas cuentas se ve comprometida, queda expuesta toda la cartera: son las primeras donde activar la verificación en dos pasos.`);
    if (n >= 3 && cnt[0] === n) notas.push('Todas las personas entran al portal del SAT de clientes. Revisa si todas lo necesitan.');
    if (cnt[1] >= 3) notas.push(`${cnt[1]} personas operan la banca en línea. Entre menos, mejor; y conviene que quien captura un pago no sea quien lo autoriza.`);
    if (cnt[1] === 1 && n > 1) notas.push('Una sola persona opera la banca. Define quién la suple y cómo se le da acceso sin compartir su contraseña.');
    return `<div class="mapa"><b>Lo que dice tu mapa</b> <small>${n} persona(s)</small>${SISTEMAS.map((s, k) => `<div class="dom"><span>${s}</span><div class="bar"><i class="b-gris" style="width:${cnt[k] / n * 100}%;background:var(--pri)"></i></div><small>${cnt[k]} de ${n}</small></div>`).join('')}${notas.length ? `<ul>${notas.map(x => `<li>${x}</li>`).join('')}</ul>` : ''}</div>`;
  },
  calc: () => {
    const c = kit(S.ui.did).calculadora;
    if (!calcListo(c)) return '<p class="nota">Captura al menos empleados, costo por hora, horas por día e ingresos diarios para ver el resultado.</p>';
    const r = [1, 2, 3].map(d => calcCosto(c, d));
    return `<div class="scroll"><table class="t num"><thead><tr><th>Concepto</th><th>1 día</th><th>2 días</th><th>3 días</th></tr></thead><tbody>
      <tr><th>Horas improductivas</th>${r.map(x => `<td>${mxn(x.horas)}</td>`).join('')}</tr><tr><th>Ingresos no generados</th>${r.map(x => `<td>${mxn(x.ingresos)}</td>`).join('')}</tr>
      <tr><th>Recuperación técnica</th>${r.map(x => `<td>${mxn(x.recup)}</td>`).join('')}</tr><tr><th>Posibles recargos</th>${r.map(x => `<td>${mxn(x.recargos)}</td>`).join('')}</tr>
      <tr class="tot"><th>Costo estimado</th>${r.map(x => `<td>${mxn(x.total)}</td>`).join('')}</tr></tbody></table></div>
      <p class="nota">${pill('Supuestos capturados por el despacho', 'sup')} Fórmula: empleados × costo por hora × horas por día × días + ingresos diarios × días + recuperación técnica + clientes en riesgo × recargo por cliente. No incluye la posible pérdida de clientes.</p>${calcComp(c)}`;
  },
  diagres: () => {
    const did = S.ui.did, st = diagStats(did), hs = ordenGravedad(hallazgos(did).filter(h => h.origen === 'Diagnóstico'));
    return `<div class="card resumen"><div class="rh"><div><h2>Resultado</h2><p>${st.contestadas} de 30 preguntas contestadas${st.total == null ? '' : ' · madurez general ' + Math.round(st.total) + '%'}</p></div>${sem(st.sem, st.total)}</div>
      <div class="doms">${st.dom.map(d => `<div class="dom"><span>${d.n}</span><div class="bar"><i class="b-${d.sem}" style="width:${d.pct == null ? 0 : Math.max(4, d.pct)}%"></i></div>${sem(d.sem, d.pct)}</div>`).join('')}</div>
      <p class="nota">Semáforo: rojo menos de 40%, amarillo de 40% a 70%, verde más de 70%.</p>
      <h3>${hs.length} hallazgo(s) generados por el diagnóstico</h3>${hs.length ? `<ul class="hall">${hs.map(h => `<li><b>${h.id}</b> ${esc(h.titulo)} ${gpill(h.g)}</li>`).join('')}</ul><div class="row"><a class="btn" href="#reporte">Ver mi reporte</a>${st.contestadas === 30 ? '<button class="btn p" data-a="codigo" data-v="diag">Enviar mis resultados al Equipo DELTA</button>' : ''}</div>` : '<p class="nota">Cada respuesta "No" o "Parcialmente" genera un hallazgo con acciones sugeridas.</p>'}</div>`;
  },
  prochall: () => listaHall(hallazgos(S.ui.did).filter(h => h.origen === 'Proceso'), 'Marca un riesgo en cualquier paso para generar un hallazgo.'),
  invhall: () => listaHall(hallazgos(S.ui.did).filter(h => h.origen === 'Inventario'), 'Las reglas se aplican solas al capturar cada equipo.')
};
const listaHall = (hs, vacio) => `<div class="card"><h2>${hs.length} hallazgo(s)</h2>${hs.length ? `<div class="scroll"><table class="t"><thead><tr><th>ID</th><th>Hallazgo</th><th>Gravedad</th><th>Acción sin costo</th><th>Acción de bajo costo</th><th>Categoría Dell candidata</th></tr></thead><tbody>${ordenGravedad(hs).map(h => `<tr><th>${h.id}</th><td>${esc(h.titulo)}<br><small>${esc(h.riesgo)}</small></td><td>${gpill(h.g)}</td><td>${esc(h.a0)}</td><td>${esc(h.a1)}</td><td>${h.d ? esc(DELL[h.d]) : '—'}</td></tr>`).join('')}</tbody></table></div>` : `<p class="nota">${vacio}</p>`}</div>`;

/* --- Diagnóstico --- */
V.diagnostico = () => {
  const d = D(); if (!d) return sinDespacho();
  const dg = diag(d.id), b = 'diagnostico.' + d.id + '.resp';
  return `<h1>Diagnóstico de madurez</h1><p class="lead">30 preguntas en 6 áreas. Contesta con lo que pasa hoy en el despacho, no con lo que debería pasar. Toma 15 minutos o menos y no pide datos de clientes. Se guarda solo; puedes dejarlo y volver.</p>
    <div class="diagbar" id="upd-diagprog">${UPD.diagprog()}</div>
    ${DOMINIOS.map((dom, di) => `<div class="card dominio"><h2>${di + 1}. ${dom.n}</h2><p class="nist">Función del NIST CSF 2.0: ${dom.nist} <small>(correspondencia orientativa del Equipo DELTA)</small></p>
      ${DIAG.slice(di * 5, di * 5 + 5).map((q, k) => { const i = di * 5 + k; return `<div class="dq"><p id="dq${i}">${i + 1}. ${q.q}</p><div class="r3" role="radiogroup" aria-labelledby="dq${i}">${['No', 'Parcialmente', 'Sí'].map((t, v) => `<label><input type="radio" name="dq${i}" value="${v}" data-num data-bind="${b}.${i}" data-upd="diagres diagprog" ${dg.resp[i] === v ? 'checked' : ''}><span>${t}</span></label>`).join('')}</div></div>`; }).join('')}</div>`).join('')}
    <div id="upd-diagres">${UPD.diagres()}</div>${fuentesHTML(['nist', 'lfpdppp'])}`;
};

/* --- Encuesta --- */
V.encuesta = () => {
  const d = D(); if (!d) return sinDespacho();
  if (!S.encuesta[d.id]) S.encuesta[d.id] = {};
  const b = 'encuesta.' + d.id, e = S.encuesta[d.id], precio = (k, t, h) => fld(t, inp(b + '.' + k, { type: 'number', min: 0, ph: '$ al mes' }), h);
  return `<h1>Encuesta final</h1><p class="lead">La contesta el dueño o socio del despacho. Son 3 minutos y nos ayuda a decidir si este servicio vale la pena.</p>
    <div class="card"><div class="f"><label id="lu">¿Qué tan útil fue el servicio para tu despacho?</label><div class="r5" role="radiogroup" aria-labelledby="lu">${[1, 2, 3, 4, 5].map(v => `<label><input type="radio" name="util" value="${v}" data-num data-bind="${b}.utilidad" ${e.utilidad === v ? 'checked' : ''}><span>${v}</span></label>`).join('')}</div><small>1 = nada útil · 5 = muy útil</small></div>
      ${fld('¿Qué módulo fue el más útil?', `<select id="${idOf(b + '.modulo')}" data-bind="${b}.modulo"><option value="">Elige…</option>${MODULOS.map(m => `<option value="${m.n}"${String(e.modulo) === String(m.n) ? ' selected' : ''}>${m.n}. ${m.titulo}</option>`).join('')}<option value="otro"${e.modulo === 'otro' ? ' selected' : ''}>Otro</option></select>`)}
      ${fld('Si quieres, cuéntanos por qué', inp(b + '.moduloOtro'))}
      <div class="f"><label id="lc">¿Contratarías un servicio así de forma mensual?</label><div class="r3" role="radiogroup" aria-labelledby="lc">${['Sí', 'Tal vez', 'No'].map(t => `<label><input type="radio" name="contr" value="${t}" data-bind="${b}.contrataria" ${e.contrataria === t ? 'checked' : ''}><span>${t}</span></label>`).join('')}</div></div></div>
    <div class="card"><h2>¿Cuánto valdría para tu despacho?</h2><p>Imagina que el servicio continúa como suscripción mensual: capacitación periódica, simulacros y seguimiento de los hallazgos. Escribe un precio <b>al mes, en pesos</b>, para cada pregunta. No hay respuestas correctas, y no mostramos precios para no influir en la tuya.</p>
      <div class="cols2r precios">${precio('pagoBarato', '¿A qué precio te parecería barato, una buena compra?')}${precio('pagoRazonable', '¿Qué precio te parecería razonable?')}${precio('pagoCaro', '¿A partir de qué precio te parecería caro, aunque lo pensarías?')}${precio('pagoMuyCaro', '¿A partir de qué precio sería demasiado caro para considerarlo?')}</div>
      ${fld('Y por lo que recibiste en este piloto (capacitación, diagnóstico y reporte), en un solo pago, ¿qué precio te parecería razonable?', inp(b + '.pagoInicial', { type: 'number', min: 0, ph: '$ en un solo pago' }), 'Durante el piloto no tiene costo. La pregunta es para saber cuánto vale.')}</div>
    <div class="card">${fld('Comentarios', area(b + '.comentarios', { rows: 3 }))}
      <div class="row end"><button class="btn p" data-a="encuesta">Enviar encuesta</button></div></div>`;
};

/* --- Mi reporte --- */
V.reporte = () => {
  const d = D(); if (!d) return sinDespacho();
  const hs = ordenGravedad(hallazgos(d.id)), pl = plan30(d.id), b = 'plan30.' + d.id, ver = T.planTodos ? hs : hs.slice(0, 8), o = { upd: 'rep' };
  return `<div class="row between"><h1>Mi reporte</h1><button class="btn p" data-a="pdf" data-v="reporte">Guardar en PDF</button></div>
    <div class="card plan30"><div class="row between"><h2>Plan de 30 días</h2>${hs.length ? '<button class="btn sm" data-a="plan30auto">Proponer las 3 de mayor gravedad</button>' : ''}</div>
      <p>Elige de 3 a 5 acciones y ponles <b>responsable y fecha</b>. Lo que no tiene dueño ni fecha, no se hace. El plan aparece en el reporte y se revisa en la llamada de seguimiento.</p>
      ${hs.length ? `<div class="scroll"><table class="t ed p30"><thead><tr><th>Incluir</th><th>ID</th><th>Acción sin costo</th><th>Responsable (puesto)</th><th>Fecha compromiso</th><th>Hecho</th></tr></thead><tbody>
        ${ver.map(h => { const k = `${b}.items.${h.key}`; return `<tr><td class="c"><input type="checkbox" aria-label="Incluir ${h.id}" data-bind="${k}.on" data-upd="rep" ${(pl.items[h.key] || {}).on ? 'checked' : ''}></td><th>${h.id}</th><td class="acc">${esc(h.a0)}<br><small>${esc(h.titulo)} · gravedad ${h.g}</small></td><td>${inp(k + '.resp', { ph: 'Quién', upd: 'rep' })}</td><td>${inp(k + '.fecha', { type: 'date', upd: 'rep' })}</td><td class="c"><input type="checkbox" aria-label="${h.id} hecho" data-bind="${k}.hecho" data-upd="rep" ${(pl.items[h.key] || {}).hecho ? 'checked' : ''}></td></tr>`; }).join('')}</tbody></table></div>
        <div class="row between">${hs.length > 8 ? `<button class="lnk" data-a="plantodos">${T.planTodos ? 'Ver solo los 8 principales' : 'Ver los ' + hs.length + ' hallazgos'}</button>` : '<span></span>'}<div class="f" style="max-width:260px">${fld('Fecha de la llamada de seguimiento', inp(b + '.seguimiento', { type: 'date', upd: 'rep' }))}</div></div>`
      : '<p class="nota">Aún no hay hallazgos. Contesta el <a href="#diagnostico">diagnóstico</a> para armar el plan.</p>'}</div>
    <div class="card"><h2>Prueba de restauración <small>en la reunión de entrega</small></h2><p>Con quien administra los respaldos: elijan un archivo de prueba (no de un cliente), recupérenlo desde el respaldo en una carpeta nueva y comprueben que abre. Es la única forma de saber cuánto tardarían en volver a trabajar.</p>
      ${chk('kit.' + d.id + '.restauracion.ok', '<b>Restauramos con éxito un archivo de prueba</b>', { upd: 'rep' })}
      <div class="grid3">${fld('Fecha de la prueba', inp('kit.' + d.id + '.restauracion.fecha', { type: 'date', upd: 'rep' }))}${fld('Minutos que tomó', inp('kit.' + d.id + '.restauracion.tiempo', { type: 'number', min: 0, upd: 'rep' }))}${fld('Observaciones', inp('kit.' + d.id + '.restauracion.obs', { ph: 'Qué funcionó y qué no', upd: 'rep' }))}</div></div>
    <p class="nota">El reporte se arma solo con el diagnóstico, la capacitación, el análisis del proceso y el inventario. Incluye el kit del despacho como anexos.</p><div class="paper" id="upd-rep">${reporteHTML(d.id)}</div>`;
};

/* ================= DOCUMENTOS ================= */
const docHead = (titulo, did) => `<div class="dh"><div><p class="eyebrow">Ciber Resiliencia como Servicio · Equipo DELTA</p><h1>${titulo}</h1></div><div class="dm"><b>${esc(S.despachos[did].nombre)}</b><br>${fechaMx(hoy())}</div></div>`;
function planHTML(did) {
  const k = kit(did).plan;
  return `<div class="docp">${docHead('Plan de respuesta ante incidentes', did)}
    <p><b>Cuándo usarlo:</b> archivos que no abren, un mensaje que pide un pago, un correo sospechoso que alguien abrió, un equipo perdido o robado.</p>
    <ol class="pasosdoc"><li><b>Aísla.</b> Desconecta el equipo de la red (cable y Wi-Fi). No lo uses ni borres nada.</li>
    <li><b>Avisa de inmediato</b> a ${blanco(k.resp)} (responsable). Si no está: ${blanco(k.sup)} (suplente).</li>
    <li><b>Llama a soporte técnico:</b> ${blanco(k.soporte)}, teléfono ${blanco(k.soporteTel)}.</li>
    <li><b>Anota</b> qué pasó, a qué hora, en qué equipo y qué se estaba haciendo. No pagues ni negocies por tu cuenta.</li>
    <li><b>Recupera</b> desde el respaldo, en un equipo limpio. Respaldos: ${blanco(k.respaldos)}. Primero: ${blanco(k.prioridad)}.</li>
    <li><b>Comunica</b> con hechos a: ${blanco(k.avisar)}. Qué pasó, qué información pudo verse afectada, qué se está haciendo y qué recomendamos.</li>
    <li><b>Aprende.</b> Una semana después, revisen qué falló y actualicen este plan.</li></ol>
    <table class="t"><thead><tr><th>Contacto</th><th>Quién</th><th>Teléfono</th></tr></thead><tbody><tr><th>Responsable interno</th><td>${blanco(k.resp)}</td><td><span class="linea">por capturar</span></td></tr><tr><th>Suplente</th><td>${blanco(k.sup)}</td><td><span class="linea">por capturar</span></td></tr><tr><th>Soporte técnico</th><td>${blanco(k.soporte)}</td><td>${blanco(k.soporteTel)}</td></tr><tr><th>Asesor legal</th><td><span class="linea">por capturar</span></td><td><span class="linea">por capturar</span></td></tr></tbody></table>
    <p class="mini"><b>Referencias institucionales</b> <span class="tag-ver">[VERIFICAR datos de contacto vigentes antes de imprimir]</span>: canal de denuncias del SAT para correos apócrifos; autoridad federal de protección de datos personales; policía cibernética de tu entidad. El despacho captura aquí los contactos: <span class="linea">por capturar</span></p>
    <p class="mini">Imprime este plan y tenlo a la mano: si los equipos no funcionan, no podrás abrirlo en la computadora.</p></div>`;
}
function politicaHTML(did) {
  const k = kit(did).politica;
  return `<div class="docp">${docHead('Política de uso de inteligencia artificial', did)}
    <p><b>Objetivo.</b> Aprovechar las herramientas de IA sin poner en riesgo la información de los clientes ni la responsabilidad profesional del despacho.</p>
    <p><b>Herramientas aprobadas:</b> ${blanco(k.herramientas)}. Se usan con cuentas del despacho y con los controles de privacidad activados.</p>
    <div class="cols3"><div><h3>Sí se puede</h3><ul><li>Consultas generales sin datos de clientes.</li><li>Borradores de correos y textos genéricos.</li><li>Fórmulas, formatos y explicaciones.</li></ul></div>
    <div><h3>Solo con datos anonimizados</h3><ul><li>Estados de cuenta, nóminas, XML y expedientes: se sustituyen nombres, RFC, CURP, cuentas y folios por claves.</li></ul></div>
    <div><h3>No se puede</h3><ul><li>Escribir contraseñas, la Contraseña del SAT (CIEC) o datos y archivos de la e.firma.</li><li>Entregar resultados de IA sin revisarlos.</li><li>Usar IA para evadir obligaciones o fabricar soportes.</li></ul></div></div>
    <p><b>Responsabilidad.</b> Quien firma o entrega un trabajo responde por él, se haya usado IA o no. Responsable de esta política: ${blanco(k.responsable)}.</p>
    <p><b>Verificación.</b> Todo cálculo, fundamento o fecha que provenga de una IA se revisa contra la fuente oficial antes de usarse.</p>
    <p><b>Transparencia con los clientes.</b> El despacho informa que usa IA y con qué cuidados. Medio: ${blanco(k.informa)}.</p>
    <p><b>Confidencialidad.</b> El secreto profesional y la Ley Federal de Protección de Datos Personales en Posesión de los Particulares aplican igual al usar IA.</p>
    <p><b>Revisión.</b> Esta política se revisa ${k.revision ? esc(k.revision.toLowerCase()) : '<span class="linea">por capturar</span>'} y cuando cambien las herramientas.</p>
    <div class="firmas"><div>Titular del despacho</div><div>Fecha</div></div>
    <p class="mini">Plantilla generada por la app del Equipo DELTA. Conviene revisarla con un asesor legal antes de adoptarla.</p></div>`;
}
function controlesHTML(did) {
  const hs = ordenGravedad(hallazgos(did));
  return `<div class="docp">${docHead('Lista de controles de seguridad prioritarios', did)}${hs.length ? `<table class="t"><thead><tr><th></th><th>ID</th><th>Control a implementar</th><th>Atiende</th><th>Gravedad</th></tr></thead><tbody>${hs.map(h => `<tr><td><span class="box"></span></td><th>${h.id}</th><td>${esc(h.a0)}</td><td>${esc(h.titulo)}</td><td>${gpill(h.g)}</td></tr>`).join('')}</tbody></table>` : '<p>Aún no hay hallazgos. Contesta el diagnóstico para generar esta lista.</p>'}</div>`;
}
function procedimientoHTML(did) {
  const k = kit(did).restauracion, info = INFO_CRITICA.filter((t, i) => k.info && k.info[i]);
  return `<div class="docp">${docHead('Procedimiento de recuperación de archivos críticos', did)}
    <p><b>Información crítica del despacho:</b> ${info.length ? info.map(esc).join('; ') + '.' : '<span class="linea">por capturar en el Módulo 3</span>'}</p>
    <p><b>Dónde están los respaldos:</b> ${blanco(k.donde)}</p>
    <p><b>Copia más reciente si hoy fallara todo:</b> ${blanco(k.rpo)} · <b>Tiempo estimado para volver a trabajar:</b> ${blanco(k.rto)}</p>
    <ol class="pasosdoc"><li>Confirma con el responsable qué archivo o carpeta se perdió y de qué fecha se necesita.</li><li>Usa un equipo que funcione bien. Si hubo un ataque, que soporte técnico confirme que está limpio.</li><li>Abre el respaldo y busca la versión de la fecha requerida.</li><li>Restaura en una carpeta nueva, sin sobrescribir lo actual.</li><li>Abre el archivo y comprueba que está completo.</li><li>Anota la fecha, cuánto tardó y cualquier problema.</li></ol>
    <table class="t"><thead><tr><th>Última prueba de restauración</th><th>Resultado</th><th>Tiempo</th><th>Observaciones</th></tr></thead><tbody><tr><td>${k.fecha ? fechaMx(k.fecha) : '<span class="linea">pendiente</span>'}</td><td>${k.ok ? 'Exitosa' : 'Pendiente'}</td><td>${k.tiempo ? esc(k.tiempo) + ' min' : '—'}</td><td>${esc(k.obs || '—')}</td></tr></tbody></table>
    <p class="mini">Meta sugerida: repetir la prueba cada tres meses.</p></div>`;
}
function reporteHTML(did) {
  const d = S.despachos[did], st = diagStats(did), cs = capStats(did), hs = ordenGravedad(hallazgos(did)), top = hs.slice(0, 5), k = kit(did), c = k.calculadora;
  const altas = hs.filter(h => h.g === 'alta'), ops = oportunidadesVivas(did), cats = [...new Set(ops.map(h => h.d))];
  const cm = compromisos(did), seg = (S.plan30[did] || {}).seguimiento;
  const l1 = st.total == null ? 'El diagnóstico de madurez aún no se ha contestado.' : `La madurez general del despacho es de ${Math.round(st.total)}% (semáforo ${SEM_TXT[st.sem].toLowerCase()})${st.contestadas < 30 ? ', con ' + st.contestadas + ' de 30 preguntas contestadas' : ''}. Las áreas con más oportunidad son: ${st.dom.filter(x => x.pct != null).sort((a, b) => a.pct - b.pct).slice(0, 2).map(x => x.n.toLowerCase()).join(' y ')}.`;
  const l2 = hs.length ? `Se identificaron ${hs.length} hallazgos, ${altas.length} de gravedad alta. El principal: ${top[0].titulo.toLowerCase()} (${top[0].id}).` : 'Todavía no hay hallazgos registrados.';
  const l3 = cs.mejora == null ? 'La capacitación aún no tiene evaluación inicial y final de los mismos participantes.' : `En la capacitación, el equipo pasó de ${r1(cs.ini)}% a ${r1(cs.fin)}% (${cs.mejora >= 0 ? '+' : ''}${r1(cs.mejora)} puntos porcentuales, ${cs.pares} participante(s)).`;
  const sinCosto = altas.slice(0, 3).map(h => h.id).join(', ');
  const paso = cm.length ? `Cumplir el plan de 30 días (${cm.map(h => h.id).join(', ')}) y revisarlo en la llamada de seguimiento${seg ? ' del ' + fechaMx(seg) : ''}.${cats.length ? ' En paralelo, pedir una cotización de las categorías con inversión a un distribuidor Dell.' : ''}` : !hs.length ? 'Contestar el diagnóstico de madurez para generar los hallazgos y el plan.' : `En los próximos 30 días, atender las acciones sin costo de los hallazgos de mayor gravedad${sinCosto ? ' (' + sinCosto + ')' : ''} y nombrar a un responsable de darles seguimiento.${cats.length ? ' Después, pedir una cotización de las categorías con inversión a un distribuidor Dell.' : ''}`;
  const col = (items) => items.length ? `<ul>${items.map(x => `<li>${x}</li>`).join('')}</ul>` : '<p class="mini">Sin acciones por ahora.</p>';
  return `<div class="docp rep">${docHead('Reporte de ciber resiliencia', did)}
    <p class="mini">Preparado para el dueño o socio del despacho. Decide compras: ${pd(d.decide)}. Responsable del Equipo DELTA: ${pd(d.responsable)}.</p>
    <h2>Resumen</h2><ol class="resumen3"><li>${l1}</li><li>${l2}</li><li>${l3}</li></ol>
    <div class="cols2r"><div><h2>Semáforo por área</h2><table class="t semt"><tbody>${st.dom.map(x => `<tr><th>${x.n}</th><td><div class="bar"><i class="b-${x.sem}" style="width:${x.pct == null ? 0 : Math.max(4, x.pct)}%"></i></div></td><td>${sem(x.sem, x.pct)}</td></tr>`).join('')}</tbody></table></div>
    <div><h2>Resultado de la capacitación</h2><div class="grid3 res"><div class="tile"><span>Promedio inicial</span><b>${cs.ini == null ? '—' : r1(cs.ini) + '%'}</b></div><div class="tile"><span>Promedio final</span><b>${cs.fin == null ? '—' : r1(cs.fin) + '%'}</b></div><div class="tile"><span>Mejora</span><b>${cs.mejora == null ? '—' : (cs.mejora >= 0 ? '+' : '') + r1(cs.mejora) + ' pts'}</b></div></div>
      <p class="mini">${cs.n} participante(s); ${cs.pares} con evaluación inicial y final. Simulador de phishing: ${cs.phishing == null ? 'sin datos' : r1(cs.phishing) + '% de aciertos'}.</p>
      <h2>Costo estimado de una interrupción</h2>${calcListo(c) ? `<div class="grid3 res">${[1, 2, 3].map(n => `<div class="tile"><span>${n} día${n > 1 ? 's' : ''}</span><b>${mxn(calcCosto(c, n).total)}</b></div>`).join('')}</div><p class="mini">${pill('Supuestos capturados por el despacho', 'sup')} Fuente: calculadora del Módulo 5, datos del propio despacho${c.fecha ? ', ' + fechaMx(c.fecha) : ''}. No es una cifra externa ni un pronóstico.${num(c.diasHoy) > 0 && c.diasMeta !== '' && c.diasMeta != null ? ` Según el despacho, pasar de ${r1(num(c.diasHoy))} a ${r1(num(c.diasMeta))} día(s) de interrupción evitaría unos ${mxn(calcCosto(c, num(c.diasHoy)).total - calcCosto(c, num(c.diasMeta)).total)} por incidente.` : ''}</p>` : '<p class="mini">Pendiente: el dueño captura sus datos en la calculadora del Módulo 5.</p>'}</div></div>
    <h2>Los ${top.length || 5} hallazgos principales</h2>${top.length ? `<table class="t"><thead><tr><th>ID</th><th>Hallazgo</th><th>Impacto en el negocio</th><th>Gravedad</th></tr></thead><tbody>${top.map(h => `<tr><th>${h.id}</th><td>${esc(h.titulo)}<br><small>Origen: ${h.origen.toLowerCase()} · ${esc(h.det)}</small></td><td>${esc(h.riesgo)}</td><td>${gpill(h.g)}</td></tr>`).join('')}</tbody></table>` : '<p class="mini">Sin hallazgos todavía.</p>'}
    <h2>Plan priorizado</h2><div class="cols3 plan"><div><h3>Sin costo</h3>${col(hs.slice(0, 5).map(h => `<b>${h.id}</b> ${esc(h.a0)}`))}</div><div><h3>Bajo costo</h3>${col(hs.slice(0, 5).map(h => `<b>${h.id}</b> ${esc(h.a1)}`))}</div>
      <div><h3>Con inversión</h3>${col(cats.map(cat => `${esc(DELL[cat])} <small>(${ops.filter(h => h.d === cat).map(h => h.id).join(', ')})</small>`))}<p class="mini"><i>Opciones a cotizar con un distribuidor Dell.</i> Distribuidor: ${pd(S.config.distribuidor)}. Son categorías genéricas; el Equipo DELTA no ofrece productos ni precios a nombre de Dell.</p></div></div>
    <h2>Plan de 30 días</h2>${cm.length ? `<table class="t"><thead><tr><th>ID</th><th>Acción</th><th>Responsable</th><th>Fecha compromiso</th><th>Estado</th></tr></thead><tbody>${cm.map(h => `<tr><th>${h.id}</th><td>${esc(h.a0)}</td><td>${blanco(h.c.resp)}</td><td>${h.c.fecha ? fechaMx(h.c.fecha) : '<span class="linea">por definir</span>'}</td><td>${h.c.hecho ? pill('Hecho', 'ok') : '<span class="nw"><span class="box"></span> Pendiente</span>'}</td></tr>`).join('')}</tbody></table>` : '<p class="mini">Pendiente: el dueño o socio elige de 3 a 5 acciones, con responsable y fecha, en la pantalla Mi reporte.</p>'}
    <p class="mini">Llamada de seguimiento con el Equipo DELTA: ${seg ? fechaMx(seg) : '<span class="linea">fecha por definir</span>'}. En ella se revisa qué se cumplió y qué estorbó.</p>
    <h2>Siguiente paso recomendado</h2><p>${paso}</p>
    <p class="mini"><b>Alcance.</b> Este reporte es una orientación basada en lo que el despacho contestó y en lo observado durante el piloto académico. No es una auditoría, una prueba técnica de los equipos ni asesoría legal o fiscal.</p></div>
    <div class="pb"></div><div class="docp"><p class="eyebrow">Kit del despacho · Anexo 1</p></div>${planHTML(did)}
    <div class="pb"></div><div class="docp"><p class="eyebrow">Kit del despacho · Anexo 2</p></div>${controlesHTML(did)}
    <div class="pb"></div><div class="docp"><p class="eyebrow">Kit del despacho · Anexo 3</p></div>${procedimientoHTML(did)}
    <div class="pb"></div><div class="docp"><p class="eyebrow">Kit del despacho · Anexo 4</p></div>${politicaHTML(did)}`;
}

/* ================= MODO CONSULTOR ================= */
V.despachos = () => {
  const ds = Object.values(S.despachos);
  return `<h1>Despachos</h1>
    <div class="card"><h2>Registrar un despacho</h2><div class="grid3"><div class="f"><label for="nd-nombre">Nombre</label><input id="nd-nombre" placeholder="${POR_DEFINIR}"></div><div class="f"><label for="nd-emp">Número de empleados</label><input id="nd-emp" type="number" min="1"></div><div class="f"><label for="nd-pc">Número de computadoras</label><input id="nd-pc" type="number" min="0"></div></div>
      <div class="row end"><button class="btn p" data-a="nuevo">Registrar</button></div></div>
    ${ds.map(d => { const b = 'despachos.' + d.id, ps = participantesDe(d.id); return `<div class="card ${d.id === S.ui.did ? 'activo-c' : ''}"><div class="row between"><h2>${esc(d.nombre)} ${d.stub ? pill('Creado desde un dispositivo; falta registrar', 'g-media') : ''}</h2><span>Código para el personal: <code>${esc(d.id)}</code></span></div>
      <div class="grid3">${fld('Nombre', inp(b + '.nombre', { ph: POR_DEFINIR }))}${fld('Empleados', inp(b + '.empleados', { type: 'number', min: 1 }))}${fld('Computadoras', inp(b + '.computadoras', { type: 'number', min: 0 }))}
      ${fld('Quién decide las compras', inp(b + '.decide', { ph: 'Puesto, por ejemplo: socio director' }))}${fld('Responsable del Equipo DELTA', inp(b + '.responsable', { ph: POR_DEFINIR }))}${fld('Horas invertidas por el equipo', inp(b + '.horas', { type: 'number', min: 0 }))}
      ${fld('Fecha de la sesión en vivo', inp(b + '.fechaSesion', { type: 'date' }))}${fld('Fecha de la reunión de entrega', inp(b + '.fechaEntrega', { type: 'date' }))}</div>
      <div class="f"><label>Enlace para el personal</label><div class="enlace"><input readonly value="${esc(enlaceDespacho(d.id))}" aria-label="Enlace para el personal"><button class="btn sm" data-a="copiar" data-v="${esc(enlaceDespacho(d.id))}">Copiar enlace</button></div><small>Quien lo abre entra directo a este despacho, sin escribir el código. Sirve cuando la app esté publicada en una dirección web; si se comparte como archivo, el personal escribe el código.</small></div>
      <p class="mini">Participantes en este dispositivo: ${ps.length ? ps.map(p => esc(p.alias)).join(', ') : 'ninguno'}.</p>
      <div class="row end">${T.confirm === d.id ? `<button class="btn no" data-a="borrar" data-v="${esc(d.id)}">Sí, eliminar el despacho y sus datos</button><button class="btn" data-a="conf" data-v="">Cancelar</button>` : `<button class="btn" data-a="conf" data-v="${esc(d.id)}">Eliminar</button>`}<button class="btn ${d.id === S.ui.did ? '' : 'p'}" data-a="usar" data-v="${esc(d.id)}">${d.id === S.ui.did ? 'Despacho activo' : 'Trabajar con este despacho'}</button></div></div>`; }).join('')}
    <div class="card"><h2>Datos pendientes del equipo</h2>${fld('Distribuidor o socio de canal Dell', inp('config.distribuidor', { ph: POR_DEFINIR }))}<p class="mini">Los rangos de precio ya no se capturan aquí: la encuesta pregunta al dueño cuatro precios abiertos, sin mostrarle cifras. Los resultados están en el Tablero y en el CSV.</p></div>`;
};
const enlaceDespacho = id => location.href.split(/[?#]/)[0] + '?d=' + id;
const sinDespachoC = () => `<div class="card aviso"><h2>Elige un despacho</h2><p>Registra o selecciona un despacho en la pantalla <a href="#despachos">Despachos</a>.</p></div>`;
V.proceso = () => {
  const d = D(); if (!d) return sinDespachoC();
  const pr = proceso(d.id), b = 'proceso.' + d.id + '.pasos';
  return `<h1>Análisis del proceso clave</h1><p class="lead">Recepción y resguardo de documentos fiscales de clientes en <b>${esc(d.nombre)}</b>. Se llena observando el proceso y con respuestas del personal. No copies ni captures datos de clientes.</p>
    ${PASOS_PROCESO.map((n, i) => `<div class="card"><h2><span class="n">${i + 1}</span> ${n}</h2>
      <div class="f"><label>Canal que usan</label><div class="chips">${CANALES.map(c => chk(`${b}.${i}.canales.${c}`, c)).join('')}</div></div>
      <div class="grid3">${fld('Quién tiene acceso', inp(`${b}.${i}.acceso`, { ph: 'Puestos, no nombres' }))}${fld('¿Hay contraseña o cifrado?', sel(`${b}.${i}.cifrado`, ['Sí', 'Parcialmente', 'No']))}${fld('¿Hay respaldo?', sel(`${b}.${i}.respaldo`, ['Sí', 'Parcialmente', 'No']))}</div>
      ${fld('Observaciones', area(`${b}.${i}.obs`))}
      <div class="f"><label>Riesgos que observas en este paso</label><div class="cols2">${RIESGOS_PROCESO.map(r => chk(`${b}.${i}.riesgos.${r.k}`, r.h, { upd: 'prochall' })).join('')}</div></div></div>`).join('')}
    <div id="upd-prochall">${UPD.prochall()}</div>`;
};
V.inventario = () => {
  const d = D(); if (!d) return sinDespachoC();
  const eq = equipos(d.id), b = 'equipos.' + d.id + '.items', sn = ['Sí', 'No'];
  return `<h1>Inventario de equipos</h1><p class="lead">Equipos de <b>${esc(d.nombre)}</b>. Las reglas generan hallazgos solas: más de 4 años, sin respaldo, sin antivirus o sin actualizaciones, y equipo compartido sin contraseña.</p>
    <div class="card"><div class="scroll"><table class="t ed inv"><thead><tr><th>Equipo</th><th>Marca y modelo</th><th>Antigüedad (años)</th><th>Sistema operativo</th><th>¿Actualizaciones al día?</th><th>¿Antivirus?</th><th>¿Se respalda?</th><th>¿Equipo compartido?</th><th>¿Pide contraseña?</th><th></th></tr></thead><tbody>
      ${eq.items.map((e, i) => `<tr><td>${inp(`${b}.${i}.nombre`, { ph: 'Recepción', upd: 'invhall' })}</td><td>${inp(`${b}.${i}.marca`)}</td><td>${inp(`${b}.${i}.anios`, { type: 'number', min: 0, upd: 'invhall' })}</td><td>${inp(`${b}.${i}.so`)}</td>${['act', 'av', 'resp', 'comp', 'pass'].map(f => `<td>${sel(`${b}.${i}.${f}`, sn, { upd: 'invhall' })}</td>`).join('')}<td><button class="btn sm" data-a="eqdel" data-v="${i}" aria-label="Quitar equipo">Quitar</button></td></tr>`).join('') || '<tr><td colspan="10" class="nota">Aún no hay equipos.</td></tr>'}</tbody></table></div>
      <p><button class="btn p" data-a="eqadd">Agregar equipo</button></p></div>
    <div id="upd-invhall">${UPD.invhall()}</div>`;
};
V.oportunidades = () => {
  const ds = Object.values(S.despachos), tot = ds.reduce((a, d) => a + oportunidadesVivas(d.id).length, 0);
  return `<div class="row between"><h1>Oportunidades</h1><div class="tile ${tot ? 'ok' : ''} cont"><span>Oportunidades sin descartar</span><b>${tot}</b></div></div>
    <p class="lead">Hallazgos con una categoría de solución Dell candidata. Son categorías genéricas: los productos, precios y disponibilidad los define el distribuidor (${pd(S.config.distribuidor)}).</p>
    ${ds.length ? ds.map(d => { const ops = oportunidades(d.id), cats = [...new Set(ops.map(h => h.d))]; return `<div class="card"><h2>${esc(d.nombre)} <small>${ops.length} oportunidad(es)</small></h2>${ops.length ? cats.map(c => `<h3>${DELL[c]}</h3><div class="scroll"><table class="t"><thead><tr><th>ID</th><th>Hallazgo</th><th>Origen</th><th>Gravedad</th><th>Estado</th></tr></thead><tbody>${ops.filter(h => h.d === c).map(h => `<tr><th>${h.id}</th><td>${esc(h.titulo)}</td><td>${h.origen}</td><td>${gpill(h.g)}</td><td><select aria-label="Estado de ${h.id}" data-bind="estados.${d.id}.${h.key}" data-r>${ESTADOS.map(e => `<option${h.estado === e ? ' selected' : ''}>${e}</option>`).join('')}</select></td></tr>`).join('')}</tbody></table></div>`).join('') : '<p class="nota">Sin oportunidades todavía. Aparecen al contestar el diagnóstico, el proceso o el inventario.</p>'}</div>`; }).join('') : sinDespachoC()}`;
};
const EPILL = { si: ['Cumplido', 'ok'], no: ['No cumplido', 'g-alta'], pendiente: ['Pendiente', ''], parcial: ['Cumplido con datos parciales', 'g-media'] };
V.tablero = () => {
  const t = tablero(), p = v => v == null ? '—' : r1(v) + '%';
  return `<div class="row between"><h1>Tablero del piloto</h1><button class="btn p" data-a="csv">Exportar a CSV</button></div>
    <div class="card"><h2>Cumplimiento del objetivo</h2><p class="mini">Objetivo SMART al 4 de diciembre de 2026, con 2 despachos. La mejora compara dos formas equivalentes del quiz (A y B), asignadas al azar en orden cruzado. Con pocos participantes, léela junto con su n: uno o dos casos mueven el promedio.</p>${t.metas.map((m, i) => `<div class="meta"><div><b>${i + 1}. ${m.t}</b><br><small>${esc(m.d) || 'Sin despachos registrados'}</small></div>${pill(...EPILL[m.e])}</div>`).join('')}</div>
    <div class="card"><h2>Despachos</h2><div class="scroll"><table class="t tab"><thead><tr><th>Despacho</th><th>Sesión</th><th>Participantes</th><th>Con ambos quiz (n)</th><th>Inicial</th><th>Final</th><th>Mejora</th><th>Madurez</th><th>Hallazgos</th><th>Oport. Dell</th><th>Utilidad</th><th>Precio mensual (MXN)</th><th>Paquete inicial</th><th>Plan 30 días</th><th>Días a la entrega</th><th>Horas del equipo</th></tr></thead><tbody>
      ${t.filas.map(f => `<tr><th>${esc(f.nombre)}</th><td>${fechaMx(f.fechaSesion)}</td><td>${f.participantes}</td><td>${f.pares}</td><td>${p(f.ini)}</td><td>${p(f.fin)}</td><td>${f.mejora == null ? '—' : r1(f.mejora) + ' pts'}</td><td>${p(f.madurez)}</td><td>${f.hallazgos}</td><td>${f.oportunidades}</td><td>${f.utilidad || '—'}</td><td>${esc([f.contrataria, f.pago].filter(Boolean).join(' · ')) || '—'}</td><td>${f.pagoInicial === '' ? '—' : mxn(f.pagoInicial)}</td><td>${f.comp ? f.compHechos + ' de ' + f.comp + ' hechas' : '—'}</td><td>${f.dias == null ? '—' : f.dias}</td><td>${inp('despachos.' + f.did + '.horas', { type: 'number', min: 0 })}</td></tr>`).join('') || '<tr><td colspan="16" class="nota">Registra un despacho para empezar.</td></tr>'}</tbody></table></div></div>
    <div class="card"><h2>Aprendizaje aplicado</h2><p class="mini">${pill('Metas sugeridas', 'sup')} Son metas propuestas para el piloto, no estándares ni resultados observados.</p>${INDICADORES.map((x, i) => `<div class="meta"><div><b>${x[0]}</b> · meta sugerida: ${x[1]}<br><small>${esc(t.ind[i].d) || 'Sin datos'} · Se mide con: ${x[2]}</small></div>${pill(...EPILL[t.ind[i].e])}</div>`).join('')}</div>`;
};
V.datos = () => `<h1>Datos</h1>
  <div class="grid2"><div class="card"><h2>Exportar</h2><p>Guarda todo lo capturado en este dispositivo en un archivo JSON. Sirve como respaldo y para juntar los datos de los 2 despachos.</p><button class="btn p" data-a="exportar">Exportar datos (JSON)</button></div>
  <div class="card"><h2>Importar</h2><p>Combina un archivo JSON con lo que ya hay aquí. No borra nada: de cada registro conserva la versión más reciente.</p><input type="file" id="in-json" accept=".json,application/json" aria-label="Archivo JSON"></div></div>
  <div class="card"><h2>Importar resultados de un participante</h2><p>Pega aquí el código que te envió cada persona (empieza con DELTA1). Se combina con lo que ya hay; no borra nada.</p><textarea id="in-cod" rows="4" placeholder="DELTA1Z.…" aria-label="Código de resultados"></textarea><div class="row end"><button class="btn p" data-a="impcod">Importar código</button></div></div>
  <div class="card"><h2>Probar la app</h2><p>Carga un despacho de ejemplo con respuestas ficticias para revisar el reporte, las oportunidades y el tablero. Elimínalo antes de medir el piloto.</p><div class="row"><button class="btn" data-a="demo">Cargar despacho de ejemplo</button>${T.confirm === 'todo' ? '<button class="btn no" data-a="reset">Sí, borrar todos los datos de este dispositivo</button><button class="btn" data-a="conf" data-v="">Cancelar</button>' : '<button class="btn" data-a="conf" data-v="todo">Borrar todos los datos</button>'}</div></div>
  <div class="card"><h2>Acceso del equipo en este dispositivo</h2><p>Este dispositivo recuerda el código del Equipo DELTA. Si es un equipo compartido o de un despacho, cierra el acceso al terminar.</p><div class="row"><button class="btn" data-a="bloquear">Cerrar el acceso del equipo</button></div></div>
  <div class="card"><h2>Dónde se guardan los datos</h2><p>En el navegador de este dispositivo. No se envían a ningún servidor. Si se borra el historial del navegador, se pierden: guarda un respaldo JSON al terminar cada encuentro.</p></div>`;
