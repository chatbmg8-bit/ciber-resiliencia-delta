/* ===== Módulo 8 (ejercicios) y "Seguir aprendiendo": retos espaciados, niveles, metas, biblioteca y constancia ===== */
FIJO.ej8 = 1; FIJO.reto = 0;
ITEMS.ej8 = EJ8_CASOS.map(x => ({ q: x.t, o: EJ8_OPC, c: x.c, fb: k => (k === x.c ? '' : 'Es «' + EJ8_OPC[x.c].toLowerCase() + '». ') + x.e + (x.mejor ? '<br><b>Mejor así:</b> ' + x.mejor : '') }));
ITEMS.reto = [];

/* ---------- Ejercicio del Módulo 8 ---------- */
function marcarSel(key, data, z) { // lista de casillas con revisión: data = [[texto, correcta, explicación]]
  return `<fieldset class="sen" ${z.rev ? 'disabled' : ''}>${data.map((x, i) => `<label class="chk ${z.rev ? (!!z.m[i] === x[1] ? 'r-ok' : 'r-mal') : ''}"><input type="checkbox" data-sel="${key}:${i}" ${z.m[i] ? 'checked' : ''}><span>${x[0]}${z.rev ? `<small><b>${x[1] ? 'Sí.' : 'No.'}</b> ${x[2]}</small>` : ''}</span></label>`).join('')}</fieldset>`;
}
const selOk = (data, z) => data.filter((x, i) => !!z.m[i] === x[1]).length;
EJ[8] = (p) => {
  const lab = T.lab8 || (T.lab8 = { m: {}, rev: false }), er = T.err8 || (T.err8 = { m: {}, rev: false });
  return `<h3 class="parte">Parte 1 · ¿Así sí o así no? <small>${ITEMS.ej8.length} situaciones del día a día</small></h3>` +
    pasos('ej8', ITEMS.ej8, s => `<p>${pill(s.ok + ' de ' + ITEMS.ej8.length + ' situaciones bien clasificadas', 'ok')}</p><p>Regla práctica: la IA sirve para redactar, explicar, resumir y armar plantillas; no para decidir criterios, fabricar soportes ni recibir datos de clientes.</p><div class="row"><button class="btn" data-a="strein">Repetir</button></div>`, { bien: 'Correcto.', mal: 'No exactamente.' }) +
    `<h3 class="parte">Parte 2 · Laboratorio: mejora esta instrucción</h3><p>Un auxiliar escribió esto en una herramienta de IA. Los datos son inventados para el ejercicio.</p><p class="prompt mal-p">${esc(LAB8.mala)}</p>
    <p><b>Marca los cambios que la mejoran:</b></p>${marcarSel('lab8', LAB8.ops, lab)}
    ${lab.rev ? `<div class="fb ${selOk(LAB8.ops, lab) === LAB8.ops.length ? 'bien' : 'mal'}"><b>${selOk(LAB8.ops, lab)} de ${LAB8.ops.length} bien resueltos.</b> Así queda con los cuatro cambios:</div><p class="prompt bien-p">${esc(LAB8.buena)}</p><div class="row end"><button class="btn" data-a="selre" data-v="lab8">Repetir</button></div>` : `<div class="row end"><button class="btn p" data-a="selrev" data-v="lab8">Revisar</button></div>`}
    <h3 class="parte">Parte 3 · Detecta el problema en la respuesta</h3><p>${esc(ERR8.pregunta)} Esta fue la respuesta (ficticia, escrita para el ejercicio):</p><p class="prompt ia-p">${esc(ERR8.respuesta)}</p>
    <p><b>Marca las señales de alerta:</b></p>${marcarSel('err8', ERR8.ops, er)}
    ${er.rev ? `<div class="fb ${selOk(ERR8.ops, er) === ERR8.ops.length ? 'bien' : 'mal'}"><b>${selOk(ERR8.ops, er)} de ${ERR8.ops.length} bien resueltas.</b> Antes de contestarle al cliente: abrir la Ley del ISR, leer qué dice sobre ese gasto y decidir con criterio propio.</div><div class="row end"><button class="btn" data-a="selre" data-v="err8">Repetir</button></div>` : `<div class="row end"><button class="btn p" data-a="selrev" data-v="err8">Revisar</button></div>`}
    <div class="row end"><button class="btn p" data-a="hecho" data-v="8" ${(p.ej && p.ej.ej8 && p.ej.ej8.r && p.ej.ej8.r.filter(v => v != null).length === ITEMS.ej8.length) && lab.rev && er.rev ? '' : 'disabled title="Termina las tres partes"'}>Marcar el módulo como completado</button></div>`;
};

/* ---------- Autoevaluación de confianza ---------- */
function vConfianza(p, cual) {
  const prev = (p.conf && p.conf[cual]) || {};
  return `<p><button class="lnk" data-a="confsalir">← Volver</button></p><p class="eyebrow">${cual === 'pre' ? 'Antes del quiz inicial' : 'Antes del quiz final'}</p><h1>¿Qué tan seguro te sientes hoy?</h1>
    <p class="lead">Un minuto. No cuenta para tu calificación: sirve para que tú veas tu avance${cual === 'post' ? ' frente a lo que contestaste al inicio' : ''}.</p>
    <div class="card">${CONFIANZA.map((t, i) => `<div class="f conf"><label id="cf${i}">${t}</label><div class="r5" role="radiogroup" aria-labelledby="cf${i}">${[1, 2, 3, 4, 5].map(v => `<label><input type="radio" name="cf${i}" value="${v}" data-cf="${i}" ${prev[i] === v ? 'checked' : ''}><span>${v}</span></label>`).join('')}</div></div>`).join('')}
      <small>1 = nada seguro · 5 = muy seguro</small>
      <div class="row end"><button class="lnk" data-a="confomitir">Omitir</button><button class="btn p" data-a="confok">Guardar y empezar el quiz</button></div></div>`;
}

/* ---------- Retos de repaso espaciado ---------- */
const sumaDias = (f, n) => { const [y, m, d] = f.split('-').map(Number), x = new Date(y, m - 1, d + n); return x.getFullYear() + '-' + String(x.getMonth() + 1).padStart(2, '0') + '-' + String(x.getDate()).padStart(2, '0'); };
const retoFecha = (p, k) => p.quizFinal ? sumaDias(p.quizFinal.fecha || hoy(), RETOS_DIAS[k]) : null;
const retoHecho = (p, k) => (p.retos || []).some(r => r.k === k);
const retoListo = (p, k) => p.quizFinal && !retoHecho(p, k) && retoFecha(p, k) <= hoy();
function elegirRetos(p) { // 5 preguntas, más peso a los módulos donde la persona falló
  const w = {}; for (let m = 1; m <= MODULOS.length; m++) w[m] = 1;
  if (p.quizFinal) forma(p.quizFinal).forEach((q, i) => { if (p.quizFinal.resp[i] !== q.c) w[q.m] += 2; });
  const ult = {}; (p.retos || []).forEach(r => r.items.forEach((ix, j) => { ult[ix] = r.resp[j] === RETOS[ix].c; if (!ult[ix]) w[RETOS[ix].m] += 2; }));
  const pool = RETOS.map((x, i) => i).filter(i => ult[i] !== true), sel = [], porMod = {};
  const base = pool.length >= 5 ? pool : RETOS.map((x, i) => i);
  while (sel.length < 5) {
    const cand = base.filter(i => !sel.includes(i) && (porMod[RETOS[i].m] || 0) < 2); if (!cand.length) break;
    const tot = cand.reduce((a, i) => a + w[RETOS[i].m], 0); let r = Math.random() * tot, pick = cand[0];
    for (const i of cand) { r -= w[RETOS[i].m]; if (r <= 0) { pick = i; break; } }
    sel.push(pick); porMod[RETOS[pick].m] = (porMod[RETOS[pick].m] || 0) + 1;
  }
  return sel;
}
function iniciarReto(k) {
  const p = P(), idx = elegirRetos(p);
  ITEMS.reto = idx.map(i => ({ q: RETOS[i].q, o: RETOS[i].o, c: RETOS[i].c, fb: () => RETOS[i].e, ix: i }));
  T.st = null; T.reto = { k, idx }; T.vista = 'reto';
}
function vReto(p) {
  const z = T.reto, tit = z.k === 'p' ? 'Práctica libre' : 'Reto de los ' + RETOS_DIAS[z.k] + ' días';
  return `<p><button class="lnk" data-a="vista" data-v="">← Volver</button></p><p class="eyebrow">Repaso espaciado</p><h1>${tit}</h1><p class="lead">5 preguntas, unos 3 minutos. Se eligen según lo que más te costó.</p>
    <div class="card">${pasos('reto', ITEMS.reto, s => `<div class="tile ${s.ok >= 4 ? 'ok' : ''}"><span>Resultado</span><b>${s.ok} de ${ITEMS.reto.length}</b></div><p>${s.ok >= 4 ? 'Lo tienes presente. Así se consolida lo aprendido.' : 'Repasar lo que fallaste es justo lo que hace que se quede. Revisa las explicaciones y la lección de ese tema.'}</p><div class="row"><button class="btn p" data-a="vista" data-v="">Volver a Seguir aprendiendo</button></div>`, { bien: 'Correcto.', mal: 'No es correcto.' })}</div>`;
}
function guardarReto() {
  const p = P(), s = T.st, z = T.reto; if (!p || !s || !z || z.guardado) return;
  z.guardado = true; p.retos = p.retos || [];
  p.retos.push({ k: z.k, fecha: hoy(), items: z.idx, resp: (p.ej && p.ej.reto && p.ej.reto.r || []).slice(0, z.idx.length), ok: s.ok, n: z.idx.length });
  p.ts = Date.now(); save();
}
function icsRetos(p) {
  const d = D(), url = baseURL() + (d ? '?d=' + d.id : ''), z = x => x.replace(/-/g, ''), uid = (p.id || 'p') + '-';
  const ev = RETOS_DIAS.map((n, k) => { const f = retoFecha(p, k); return ['BEGIN:VEVENT', 'UID:' + uid + n + '@equipo-delta', 'DTSTAMP:' + z(hoy()) + 'T000000', 'DTSTART;VALUE=DATE:' + z(f), 'DTEND;VALUE=DATE:' + z(sumaDias(f, 1)), 'SUMMARY:Reto de ciberseguridad (3 min)', 'DESCRIPTION:Repaso de los ' + n + ' días. Abre la app\\, entra a Seguir aprendiendo y contesta el reto.', 'URL:' + url, 'END:VEVENT'].join('\r\n'); });
  return ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Equipo DELTA//Ciber Resiliencia//ES', 'CALSCALE:GREGORIAN', ...ev, 'END:VCALENDAR'].join('\r\n');
}

/* ---------- Niveles ---------- */
const capsLeidas = p => Object.keys(p.caps || {}).length;
function niveles(p) {
  const minOk = MINIMA.every(x => pasoHecho(p, x)), av = p.avance || [], m = p.meta || {};
  return [
    { n: 1, t: 'En formación', d: 'Empezaste tu capacitación.', req: [] },
    { n: 2, t: 'Alerta', d: 'Reconoces los riesgos principales y sabes cómo actuar.', req: [['Completar la ruta mínima', minOk]] },
    { n: 3, t: 'Practicante', d: 'Llevas lo aprendido a tu trabajo diario.', req: [['Elegir tus hábitos', !!(m.habitos && m.habitos.length)], ['Reto de los 7 días', retoHecho(p, 0)], ['Leer 2 cápsulas de la biblioteca', capsLeidas(p) >= 2]] },
    { n: 4, t: 'Guardián', d: 'Dominas los temas complementarios y los sostienes en el tiempo.', req: [['Reto de los 30 días', retoHecho(p, 1)], ['Módulos complementarios 2, 3, 7 y 9', !!(av[1] && av[2] && av[6] && av[8])], ['Leer 5 cápsulas', capsLeidas(p) >= 5]] },
    { n: 5, t: 'Referente', d: 'Puedes orientar a tus compañeros.', req: [['Reto de los 90 días', retoHecho(p, 2)], ['Revisar tus hábitos', !!m.revision], ['Leer toda la biblioteca', capsLeidas(p) >= CAPSULAS.length]] }
  ];
}
function nivel(p) { const ns = niveles(p); let k = 0; for (let i = 1; i < ns.length; i++) { if (ns[i].req.every(r => r[1])) k = i; else break; } return { act: ns[k], sig: ns[k + 1] || null }; }

/* ---------- Constancia de participación ---------- */
function constanciaHTML(p, nombre) {
  const d = S.despachos[p.despachoId], nv = nivel(p).act, av = p.avance || [];
  const mods = MODULOS.filter((m, i) => av[i]).map(m => `${m.n}. ${m.titulo}`), horas = PASOS_RUTA.filter(x => pasoHecho(p, x)).reduce((a, x) => a + pasoMin(x), 0) + 60;
  const folio = 'DELTA-' + (d ? d.id.replace('D-', '') : '') + '-' + String(p.id || '').slice(-4).toUpperCase();
  return `<div class="docp const"><p class="eyebrow">Ciber Resiliencia como Servicio · Equipo DELTA</p><h1>Constancia de participación</h1>
    <p class="c-a">Se hace constar que</p><p class="c-n">${esc(nombre || p.alias)}</p>
    <p class="c-a">de ${esc(d ? d.nombre : '')} completó la capacitación en ciberseguridad para despachos contables, con una dedicación aproximada de ${r1(horas / 60)} horas, y alcanzó el nivel <b>${nv.n}. ${nv.t}</b>.</p>
    <table class="t"><tbody><tr><th>Módulos completados</th><td>${mods.map(esc).join('<br>') || '—'}</td></tr><tr><th>Evaluación inicial → final</th><td>${p.quizInicial ? r1(p.quizInicial.pct) + '%' : '—'} → ${p.quizFinal ? r1(p.quizFinal.pct) + '%' : '—'}</td></tr><tr><th>Retos de repaso</th><td>${(p.retos || []).filter(r => r.k !== 'p').length} de ${RETOS_DIAS.length}</td></tr><tr><th>Fecha</th><td>${fechaMx(hoy())}</td></tr><tr><th>Folio</th><td>${folio}</td></tr></tbody></table>
    <div class="firmas"><div><span></span>Equipo DELTA</div></div>
    <p class="mini">Constancia de participación en un piloto académico del Equipo DELTA (Reto Dell). No es una certificación ni tiene validez oficial: no la emite un organismo certificador ni CONOCER. Dell no respalda ni patrocina este programa.</p></div>`;
}

/* ---------- Pantalla "Seguir aprendiendo" ---------- */
V.aprender = () => {
  const d = D(); if (!d) return sinDespacho();
  const p = P(); if (!p) return `<h1>Seguir aprendiendo</h1>${vAlias(d)}`;
  if (T.vista === 'reto' && T.reto) return vReto(p);
  if (T.vista === 'cap' && T.cap) return vCapsula(p, T.cap);
  if (T.vista === 'const') return vConstancia(p);
  const nv = nivel(p), ns = niveles(p), m = p.meta || {}, cf = p.conf || {};
  const retos = RETOS_DIAS.map((n, k) => { const f = retoFecha(p, k), h = (p.retos || []).find(r => r.k === k); return `<div class="reto ${h ? 'hecho' : retoListo(p, k) ? 'listo' : ''}"><b>${n} días</b><span>${h ? '✓ ' + h.ok + ' de ' + h.n + ' · ' + fechaMx(h.fecha) : f ? (retoListo(p, k) ? 'Disponible desde el ' + fechaMx(f) : 'Se abre el ' + fechaMx(f)) : 'Se programa al terminar el quiz final'}</span>${retoListo(p, k) ? `<button class="btn p sm" data-a="reto" data-v="${k}">Hacer el reto</button>` : ''}</div>`; }).join('');
  const barra = (a, b) => `<div class="cbar"><i class="pre" style="width:${(a || 0) / 5 * 100}%"></i><i class="post" style="width:${(b || 0) / 5 * 100}%"></i></div>`;
  return `<h1>Seguir aprendiendo</h1><p class="lead">La capacitación no termina en la sesión. Aquí repasas a los 7, 30 y 90 días, eliges hábitos, lees cápsulas nuevas y subes de nivel.</p>
    <div class="card nivel"><div class="row between"><div><p class="eyebrow">Tu nivel</p><h2>${nv.act.n}. ${nv.act.t}</h2><p>${nv.act.d}</p></div><div class="niveles">${ns.map(x => `<span class="nv ${x.n <= nv.act.n ? 'on' : ''}" title="${x.t}">${x.n}</span>`).join('')}</div></div>
      ${nv.sig ? `<p><b>Para llegar a ${nv.sig.n}. ${nv.sig.t}:</b></p><ul class="req">${nv.sig.req.map(r => `<li class="${r[1] ? 'ok' : ''}">${r[1] ? '✓' : '○'} ${r[0]}</li>`).join('')}</ul>` : '<p class="ok-t">Llegaste al nivel más alto.</p>'}
      ${nv.act.n >= 2 ? '<div class="row"><button class="btn" data-a="vista" data-v="const">Ver mi constancia de participación</button></div>' : '<p class="mini">La constancia de participación se abre al completar la ruta mínima.</p>'}</div>
    <div class="grid2">
      <div class="card"><h2>Retos de repaso</h2><p>Recordar lo aprendido a los pocos días, al mes y a los tres meses es lo que hace que se quede. Cada reto son 5 preguntas, elegidas según lo que más te costó.</p><div class="retos">${retos}</div>
        <div class="row">${p.quizFinal ? '<button class="btn sm" data-a="ics">Agregar los retos a mi calendario</button>' : ''}<button class="btn sm" data-a="reto" data-v="p">Práctica libre ahora</button></div></div>
      <div class="card"><h2>Mis metas</h2>
        ${cf.pre ? `<p class="mini">Tu confianza, de 1 a 5: <span class="ley pre">antes</span> <span class="ley post">después</span></p>${CONFIANZA.map((t, i) => `<div class="cfila"><span>${t}</span>${barra(cf.pre[i], cf.post && cf.post[i])}</div>`).join('')}` : '<p class="mini">Tu autoevaluación de confianza aparece aquí cuando la contestes antes del quiz inicial.</p>'}
        <h3>Mis hábitos <small>elige 1 o 2</small></h3>
        <div class="habs">${HABITOS.map((h, i) => `<label class="chk"><input type="checkbox" data-hab="${i}" ${(m.habitos || []).includes(i) ? 'checked' : ''}><span>${h}</span></label>`).join('')}</div>
        ${fld('O escribe el tuyo', `<input id="in-hab" value="${esc(m.propio || '')}" maxlength="140" placeholder="Por ejemplo: revisar mis respaldos cada viernes">`)}
        <div class="row end"><button class="btn p sm" data-a="habok">Guardar mis hábitos</button></div>
        ${m.fecha ? `<div class="revhab"><p><b>¿Los estás cumpliendo?</b> ${m.revision ? `Tu respuesta del ${fechaMx(m.revision.fecha)}: <b>${esc(m.revision.r)}</b>.` : 'Revísalo cuando hagas el reto de los 30 días.'}</p><div class="row">${['Sí', 'En parte', 'Todavía no'].map(x => `<button class="chip ${m.revision && m.revision.r === x ? 'on' : ''}" data-a="habrev" data-v="${x}">${x}</button>`).join('')}</div></div>` : ''}</div>
    </div>
    <h2 class="sep">Biblioteca <small>${capsLeidas(p)} de ${CAPSULAS.length} leídas · cápsulas de 2 minutos</small></h2>
    <div class="caps">${CAPSULAS.map(c => `<button class="capb ${(p.caps || {})[c.id] ? 'hecho' : ''}" data-a="cap" data-v="${c.id}"><span class="eyebrow">${c.tema}</span><b>${c.titulo}</b><em>${c.min} min${(p.caps || {})[c.id] ? ' · ✓ leída' : ''}</em></button>`).join('')}</div>
    <div class="card"><h2>No pierdas tu avance</h2><p>Tu avance vive en este navegador. Para protegerlo:</p><ul class="lista"><li><b>Instala la app en tu celular:</b> en Android (Chrome), menú ⋮ → "Agregar a la pantalla principal"; en iPhone (Safari), Compartir → "Agregar a inicio".</li><li><b>Envía tus resultados</b> al Equipo DELTA de vez en cuando: ese mismo código te sirve para recuperar tu avance si cambias de dispositivo o se borra.</li><li>Si usas iPhone y pasas semanas sin abrir la app, Safari puede borrar lo que guardan los sitios web. Instalada en la pantalla de inicio está más protegida.</li></ul><div class="row"><button class="btn" data-a="codigo">Copiar o enviar mis resultados</button></div></div>`;
};
function vCapsula(p, id) {
  const c = CAPSULAS.find(x => x.id === id), z = T.capr || {};
  return `<p><button class="lnk" data-a="vista" data-v="">← Volver</button></p><p class="eyebrow">Biblioteca · ${c.tema} · ${c.min} min</p><h1>${c.titulo}</h1><div class="card leccion">${c.cuerpo}</div>
    <div class="card"><h2>Comprueba</h2><p class="caso">${c.check.q}</p><div class="ops">${c.check.o.map((o, k) => `<button class="op ${z.eleg === k ? (k === c.check.c ? 'bien' : 'mal') : ''} ${z.eleg != null && k === c.check.c ? 'bien' : ''}" data-a="capr" data-v="${k}" ${z.eleg != null ? 'disabled' : ''}>${esc(o)}</button>`).join('')}</div>
    ${z.eleg != null ? `<div class="fb ${z.eleg === c.check.c ? 'bien' : 'mal'}"><b>${z.eleg === c.check.c ? 'Correcto.' : 'No es correcto.'}</b> ${c.check.e}</div><div class="row end"><button class="btn p" data-a="vista" data-v="">Volver a la biblioteca</button></div>` : ''}</div>`;
}
function vConstancia(p) {
  return `<p><button class="lnk" data-a="vista" data-v="">← Volver</button></p><h1>Constancia de participación</h1>
    <div class="card"><p>Puedes poner tu nombre en la constancia. <b>No se guarda</b> en la app ni se envía al Equipo DELTA: solo aparece en el PDF que descargas.</p>
      <div class="row"><input id="in-nom" maxlength="80" placeholder="${esc(p.alias)}" aria-label="Nombre para la constancia" style="max-width:340px"><button class="btn" data-a="constver">Actualizar vista</button><button class="btn p" data-a="constpdf">Guardar en PDF</button></div></div>
    <div class="paper" id="const-prev">${constanciaHTML(p, T.nomConst || '')}</div>`;
}
