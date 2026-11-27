/* ===== e.firmas y sellos, cuestionario de TI, Módulo 9, cumplimiento, ruta tecnológica, anexos y propuesta ===== */

/* ---------- Datos ---------- */
function efirma(did) { if (!S.efirma[did]) S.efirma[did] = { c: {}, resp: [] }; const e = S.efirma[did]; e.c = e.c || {}; e.resp = e.resp || []; return e; }
function tiDe(did) { if (!S.ti[did]) S.ti[did] = { datos: {}, so: {}, resp: [] }; const t = S.ti[did]; t.datos = t.datos || {}; t.so = t.so || {}; t.resp = t.resp || []; return t; }
function propuesta(did) { if (!S.propuesta[did]) S.propuesta[did] = { precios: {}, incluir: { cap: true, acomp: true, tec: true }, decision: {}, notas: '' }; const p = S.propuesta[did]; ['precios', 'incluir', 'decision'].forEach(k => { p[k] = p[k] || {}; }); return p; }
const contestadas = r => (r || []).filter(x => x === 0 || x === 1 || x === 2).length;
const efListo = did => { const e = S.efirma[did]; return !!e && contestadas(e.resp) === EF_PREG.length && EF_CONTEOS.every(c => e.c && e.c[c.k]); };
const tiListo = did => { const t = S.ti[did]; return !!t && contestadas(t.resp) === TI_PREG.length && ['soporte', 'datos', 'respaldo'].every(k => t.datos && t.datos[k]); };
const diagListo = did => contestadas(diag(did).resp) === DIAG.length;

/* Hallazgos de las secciones nuevas (los llama hallazgos() en core.js) */
function hallazgosExtra(did, out) {
  const ef = S.efirma[did];
  if (ef) EF_PREG.forEach((x, i) => { const v = ef.resp[i]; if (v === 0 || v === 1) out.push({ key: 'F' + (i + 1), origen: 'e.firmas y sellos', det: 'Resguardo de e.firmas y sellos', titulo: x.h, riesgo: x.r, g: x.g, a0: x.a0, a1: x.a1, d: x.d || null, f: x.f, resp: v }); });
  const ti = S.ti[did];
  if (ti) {
    TI_PREG.forEach((x, i) => { const v = ti.resp[i]; if (v === 0 || v === 1) out.push({ key: 'T' + (i + 1), origen: 'Tecnología', det: 'Cuestionario de TI', titulo: x.h, riesgo: x.r, g: x.g, a0: x.a0, a1: x.a1, d: x.d || null, f: x.f, resp: v }); });
    const dd = ti.datos || {}, add = (k, x, extra) => out.push({ key: 'T-' + k, origen: 'Tecnología', det: 'Cuestionario de TI', titulo: x.h + (extra || ''), riesgo: x.r, g: x.g, a0: x.a0, a1: x.a1, d: x.d || null, f: x.f, resp: 0 });
    if (dd.soporte === 'Nadie en particular') add('soporte', TI_REGLAS.sinSoporte);
    if (ti.so && ti.so['Windows 10']) add('w10', TI_REGLAS.win10);
    const sinInv = !(S.equipos[did] && S.equipos[did].items && S.equipos[did].items.length);
    if (sinInv && num(dd.viejos) > 0) add('viejos', TI_REGLAS.viejos, ': ' + num(dd.viejos) + ' de ' + (num(dd.equipos) || '?'));
  }
}

/* ---------- Fundamento ---------- */
const fundHTML = fs => (fs || []).filter(k => NORMAS[k]).map(k => `<span class="norma n-${NORMAS[k].tipo}" title="${esc(TIPO_NORMA[NORMAS[k].tipo] + ' · ' + NORMAS[k].t + ': ' + NORMAS[k].d)}">${esc(k)}</span>`).join(' ');
function normasUsadas(hs) { const s = new Set(); hs.forEach(h => (h.f || []).forEach(k => s.add(k))); const o = { ley: 0, etica: 1, practica: 2 }; return [...s].filter(k => NORMAS[k]).sort((a, b) => o[NORMAS[a].tipo] - o[NORMAS[b].tipo] || a.localeCompare(b, 'es', { numeric: true })); }
const leyendaNormas = ks => ks.length ? `<table class="t fund"><thead><tr><th>Clave</th><th>Tipo</th><th>Qué establece</th></tr></thead><tbody>${ks.map(k => `<tr><th>${esc(k)}</th><td>${TIPO_NORMA[NORMAS[k].tipo]}</td><td>${esc(NORMAS[k].t)}. ${esc(NORMAS[k].d)}</td></tr>`).join('')}</tbody></table><p class="mini">Las obligaciones legales aplican al despacho; NIST CSF 2.0 es un marco voluntario de buenas prácticas. La relación entre cada hallazgo y su fundamento es una orientación del Equipo DELTA, no una opinión legal.</p>` : '';

/* ---------- Pantalla Diagnóstico: tres partes ---------- */
function subtabs(act, did) {
  const nd = contestadas(diag(did).resp), ne = contestadas(efirma(did).resp), nt = contestadas(tiDe(did).resp);
  const t = (h, n, txt, ok, st) => `<a href="#${h}" class="${act === h ? 'on' : ''}"${act === h ? ' aria-current="page"' : ''}><span class="nn">${n}</span><span><b>${txt}</b><small>${ok ? '✓ Completo' : st}</small></span></a>`;
  return `<nav class="subtabs" aria-label="Partes del diagnóstico">${t('diagnostico', 1, 'Madurez del despacho', diagListo(did), nd + ' de ' + DIAG.length)}${t('efirmas', 2, 'e.firmas y sellos', efListo(did), ne + ' de ' + EF_PREG.length)}${t('ti', 3, 'Tecnología (TI)', tiListo(did), nt ? nt + ' de ' + TI_PREG.length : 'Lo contesta quien da soporte')}</nav>`;
}
function siguienteParte(did, act) {
  const ps = [['diagnostico', diagListo(did), 'Madurez del despacho'], ['efirmas', efListo(did), 'e.firmas y sellos'], ['ti', tiListo(did), 'Tecnología (TI)']];
  const sig = ps.find(x => x[0] !== act && !x[1]);
  return sig ? `<a class="btn p" href="#${sig[0]}">Seguir con: ${sig[2]} →</a>` : `<a class="btn p" href="#reporte">Ver mi reporte →</a>`;
}
V.diagnostico = () => {
  const d = D(); if (!d) return sinDespacho();
  const tab = ({ '#efirmas': 'efirmas', '#ti': 'ti' })[location.hash] || 'diagnostico';
  const head = `<h1>Diagnóstico</h1><p class="lead">Tres partes, unos 30 minutos en total. Contesta con lo que pasa hoy, no con lo que debería pasar. Nada pide datos de clientes, y se guarda solo: puedes dejarlo y volver.</p>${subtabs(tab, d.id)}`;
  if (tab === 'efirmas') return head + vEfirmas(d);
  if (tab === 'ti') return head + vTI(d);
  const dg = diag(d.id), b = 'diagnostico.' + d.id + '.resp';
  return head + `<p class="nota">${DIAG.length} preguntas en ${DOMINIOS.length} áreas, unos 17 minutos. La contesta el dueño o socio.</p>
    <div class="diagbar" id="upd-diagprog">${UPD.diagprog()}</div>
    ${DOMINIOS.map((dom, di) => `<div class="card dominio"><h2>${di + 1}. ${dom.n}</h2><p class="nist">Función del NIST CSF 2.0: ${dom.nist} <small>(correspondencia orientativa del Equipo DELTA)</small></p>
      ${DIAG.slice(di * 5, di * 5 + 5).map((q, k) => { const i = di * 5 + k; return `<div class="dq"><p id="dq${i}">${i + 1}. ${q.q} ${fundHTML(q.f)}</p>${r3(`${b}.${i}`, 'dq' + i, dg.resp[i], 'diagres diagprog')}</div>`; }).join('')}</div>`).join('')}
    <div id="upd-diagres">${UPD.diagres()}</div>${fuentesHTML(['nist', 'lfpdppp', 'cff'])}`;
};
const r3 = (path, name, v, upd) => `<div class="r3" role="radiogroup" aria-labelledby="${name}">${['No', 'Parcialmente', 'Sí'].map((t, k) => `<label><input type="radio" name="${name}" value="${k}" data-num data-bind="${path}" data-upd="${upd}" ${v === k ? 'checked' : ''}><span>${t}</span></label>`).join('')}</div>`;

function vEfirmas(d) {
  const e = efirma(d.id), b = 'efirma.' + d.id;
  return `<div class="card"><h2>Resguardo de e.firmas y sellos de clientes</h2><p>Unos 5 minutos. Lo contesta el dueño o socio. <b>No escribas RFC, nombres ni contraseñas</b>: solo cuántas hay y cómo se guardan.</p>
      <p class="nota">Por qué importa: la e.firma vale como la firma autógrafa de tu cliente (art. 17-D del CFF). Quien tenga el archivo y su contraseña puede presentar trámites y tramitar sellos a su nombre.</p>
      <div class="grid3">${EF_CONTEOS.map(c => fld(c.q, sel(`${b}.c.${c.k}`, c.o, { upd: 'efres' }))).join('')}</div></div>
    <div class="card dominio"><h2>Cómo se guardan y se usan</h2>${EF_PREG.map((q, i) => `<div class="dq"><p id="ef${i}">${i + 1}. ${q.q} ${fundHTML(q.f)}</p>${r3(`${b}.resp.${i}`, 'ef' + i, e.resp[i], 'efres')}</div>`).join('')}</div>
    <div id="upd-efres">${UPD.efres()}</div>
    <details class="card"><summary><b>Anexo 5 del kit:</b> qué hacer si se pierde o se filtra una e.firma o un sello</summary>${efirmaProcHTML(d.id)}<div class="row end"><button class="btn" data-a="pdf" data-v="efirma">Guardar en PDF</button></div></details>
    ${fuentesHTML(['cff', 'satPortal'])}`;
}
function vTI(d) {
  const t = tiDe(d.id), b = 'ti.' + d.id, link = enlaceDespacho(d.id) + '#ti';
  return `<div class="card"><h2>Tecnología del despacho</h2><p>Unos 6 minutos. Lo contesta <b>quien da soporte técnico</b> al despacho, sea del equipo o externo. Sirve para recomendar la tecnología adecuada al tamaño del despacho y para pedir cotizaciones.</p>
      <div class="f"><label>Si lo contesta alguien externo, envíale este enlace</label><div class="enlace"><input readonly value="${esc(link)}" aria-label="Enlace para soporte técnico"><button class="btn sm" data-a="copiar" data-v="${esc(link)}">Copiar enlace</button></div><small>Abre directo esta parte, sin alias. Al terminar, la app le muestra un código para enviarlo al Equipo DELTA.</small></div></div>
    <div class="card"><h2>Datos generales</h2><div class="grid2">${TI_DATOS.map(x => x.multi ? `<div class="f"><label>${x.q}</label><div class="chips">${x.multi.map(o => chk(`${b}.so.${o}`, o, { upd: 'tires' })).join('')}</div></div>` : fld(x.q, x.num ? inp(`${b}.datos.${x.k}`, { type: 'number', min: 0, upd: 'tires' }) : sel(`${b}.datos.${x.k}`, x.o, { upd: 'tires' }))).join('')}</div></div>
    <div class="card dominio"><h2>Red, accesos y programas</h2>${TI_PREG.map((q, i) => `<div class="dq"><p id="ti${i}">${i + 1}. ${q.q}</p>${r3(`${b}.resp.${i}`, 'ti' + i, t.resp[i], 'tires')}</div>`).join('')}</div>
    <div id="upd-tires">${UPD.tires()}</div>`;
}
UPD.efres = () => {
  const did = S.ui.did, hs = ordenGravedad(hallazgos(did).filter(h => h.origen === 'e.firmas y sellos')), n = contestadas(efirma(did).resp), ok = efListo(did);
  return `<div class="card resumen"><h2>Resultado</h2><p>${n} de ${EF_PREG.length} preguntas contestadas${ok ? '' : ' · contesta también los tres conteos de arriba'}.</p>
    ${hs.length ? `<ul class="hall">${hs.map(h => `<li><b>${h.id}</b> ${esc(h.titulo)} ${gpill(h.g)}</li>`).join('')}</ul>` : `<p class="nota">${n ? 'Sin hallazgos en esta parte.' : 'Cada respuesta "No" o "Parcialmente" genera un hallazgo con acciones sugeridas.'}</p>`}
    <div class="row">${ok ? '<button class="btn" data-a="codigo" data-v="efirma">Enviar mis resultados al Equipo DELTA</button>' : ''}${siguienteParte(did, 'efirmas')}</div></div>`;
};
UPD.tires = () => {
  const did = S.ui.did, hs = ordenGravedad(hallazgos(did).filter(h => h.origen === 'Tecnología')), n = contestadas(tiDe(did).resp), ok = tiListo(did);
  return `<div class="card resumen"><h2>Resultado</h2><p>${n} de ${TI_PREG.length} preguntas contestadas${ok ? '' : ' · faltan datos generales: soporte, dónde se guarda la información y respaldo'}.</p>
    ${hs.length ? `<ul class="hall">${hs.map(h => `<li><b>${h.id}</b> ${esc(h.titulo)} ${gpill(h.g)}</li>`).join('')}</ul>` : `<p class="nota">${n ? 'Sin hallazgos en esta parte.' : 'Cada respuesta "No" o "Parcialmente" genera un hallazgo con acciones sugeridas.'}</p>`}
    <div class="row">${ok ? '<button class="btn p" data-a="codigo" data-v="ti">Enviar mis resultados al Equipo DELTA</button>' : ''}${P() || !ok ? siguienteParte(did, 'ti') : ''}</div></div>`;
};

/* ---------- Módulo 9: simulador «Un día sin sello» ---------- */
ITEMS.sello = SELLO.pasos.map(x => ({ q: x.q, o: x.o.map(y => y[0]), c: x.o.findIndex(y => y[1]), fb: k => x.o[k][2], h: x.o.map(y => y[3] || 0) }));
const SELLO_MEJOR = ITEMS.sello.reduce((a, x) => a + x.h[x.c], 0);
const diasTxt = n => (Math.round(n * 10) / 10) + (n === 1 ? ' día' : ' días');
EJ[9] = (p, did) => `<p class="escenario">${SELLO.intro}</p>` + pasos('sello', ITEMS.sello, s => {
  const extra = s.h - SELLO_MEJOR;
  return `<div class="grid3 res"><div class="tile ${s.ok === ITEMS.sello.length ? 'ok' : ''}"><span>Decisiones acertadas</span><b>${s.ok} de ${ITEMS.sello.length}</b></div><div class="tile"><span>Días que tu cliente no pudo facturar</span><b>${diasTxt(s.h)}</b></div><div class="tile"><span>El mejor camino</span><b>${diasTxt(SELLO_MEJOR)}</b></div></div>
    <p>${extra > 0 ? `Tus decisiones sumaron <b>${diasTxt(extra)}</b> sin facturación para el cliente.` : 'Seguiste el camino más corto.'} Los días son ilustrativos: sirven para comparar decisiones, no son un pronóstico.</p>
    <h3 class="parte">Ahora, tu despacho</h3><p>El dueño o socio revisa cómo están guardadas las e.firmas en <a href="#efirmas">Diagnóstico → e.firmas y sellos</a>. El procedimiento completo está en el kit:</p>
    <details class="card"><summary><b>Anexo 5:</b> qué hacer si se pierde o se filtra una e.firma o un sello</summary>${efirmaProcHTML(did)}</details>
    <div class="row end"><button class="btn" data-a="strein">Repetir el simulador</button>${p ? `<button class="btn p" data-a="hecho" data-v="9">Marcar el módulo como completado</button>` : ''}</div>`;
}, { extra: s => `<p class="reloj" title="Días sin facturar acumulados">Sin facturar: <b>${diasTxt(s.h)}</b></p>` });

/* ---------- Kit: anexos 5, 6 y 7 ---------- */
function efirmaProcHTML(did) {
  const k = kit(did).plan;
  return `<div class="docp">${docHead('Qué hacer si se pierde o se filtra una e.firma o un sello', did)}
    <p><b>Cuándo usarlo:</b> se perdió o robaron un equipo o una memoria con e.firmas; alguien que conocía una contraseña dejó el despacho; aparecen trámites o facturas que nadie reconoce; el SAT restringió el sello de un cliente.</p>
    <ol class="pasosdoc"><li><b>Avisa de inmediato</b> a ${blanco(k.resp)} (responsable de incidentes) y anota qué pasó, cuándo y qué e.firmas o sellos pudieron verse afectados.</li>
    <li><b>Revisa el buzón tributario</b> de cada cliente afectado: si hay una restricción, anota la causa y la fecha de notificación. Desde ahí corren <b>40 días hábiles</b> para presentar la aclaración (art. 17-H Bis del CFF).</li>
    <li><b>Deja sin efectos la e.firma comprometida.</b> El titular puede pedirlo (art. 17-H, fr. I del CFF): en línea si aún tiene los archivos y la contraseña, o con cita en el SAT si no. Cambiar la contraseña no basta si alguien copió el archivo.</li>
    <li><b>Revisa y descarga</b> las facturas emitidas y recibidas que el cliente no reconozca. No las canceles sin analizarlas: son la evidencia.</li>
    <li><b>Informa al cliente por escrito</b> qué pasó, qué pudo verse afectado, qué se está haciendo y qué le recomiendan (plantilla del anexo 6).</li>
    <li><b>Presenta la aclaración</b> con sus pruebas dentro del plazo. Al día siguiente de presentarla se restablece el uso del sello mientras el SAT resuelve.</li>
    <li><b>El cliente tramita su nueva e.firma</b> y, con ella, un sello nuevo. La nueva se guarda cifrada y con acceso mínimo.</li>
    <li><b>Revisa todas las demás</b> e.firmas que guarda el despacho: dónde están, quién tiene acceso y quién se fue. Si alguna pudo filtrarse, se repite este procedimiento con ese cliente.</li>
    <li><b>Aprende.</b> Una semana después, revisen qué falló y actualicen este procedimiento y el plan de respuesta.</li></ol>
    <table class="t"><thead><tr><th>Cliente (clave interna)</th><th>Qué pasó</th><th>Fecha de notificación</th><th>Vence la aclaración</th><th>Responsable</th></tr></thead><tbody>${[1, 2, 3].map(() => '<tr><td><span class="linea">&nbsp;</span></td><td><span class="linea">&nbsp;</span></td><td><span class="linea">&nbsp;</span></td><td><span class="linea">&nbsp;</span></td><td><span class="linea">&nbsp;</span></td></tr>').join('')}</tbody></table>
    <p class="mini">Fundamento: CFF arts. 17-D, 17-H y 17-H Bis; LFPDPPP art. 19. Procedimiento orientativo del Equipo DELTA: confirmen los pasos y plazos vigentes en el portal del SAT y con su contador o asesor fiscal.</p></div>`;
}
function avisoHTML(did) {
  const l = '<span class="linea">por capturar</span>';
  return `<div class="docp">${docHead('Aviso de vulneración de seguridad (plantilla)', did)}
    <p class="mini">Para informar a un cliente o a cualquier persona cuyos datos pudieron verse afectados. La LFPDPPP pide informarlo de inmediato cuando la vulneración afecte de forma significativa sus derechos (art. 19). Lleva, al menos, los cinco puntos de abajo (Reglamento de la LFPDPPP, art. 65).</p>
    <p>Estimado(a) ${l}:</p>
    <p>Le informamos que el ${l} detectamos un incidente de seguridad en ${esc(S.despachos[did].nombre)} que pudo afectar información suya.</p>
    <p><b>1. Qué ocurrió:</b> ${l}</p>
    <p><b>2. Qué datos pudieron verse afectados:</b> ${l}</p>
    <p><b>3. Qué le recomendamos hacer:</b> ${l} <small>(por ejemplo: revisar su buzón tributario y sus facturas emitidas, cambiar contraseñas, avisarnos de cualquier movimiento que no reconozca)</small></p>
    <p><b>4. Qué hicimos de inmediato:</b> ${l}</p>
    <p><b>5. Dónde puede obtener más información:</b> ${l} <small>(persona, teléfono y correo del despacho)</small></p>
    <p>Lamentamos lo ocurrido. Seguiremos informándole de cualquier novedad.</p>
    <div class="firmas"><div>Nombre y firma del responsable</div><div>Fecha</div></div>
    <p class="mini">Plantilla generada por la app del Equipo DELTA. Conviene revisarla con un asesor legal antes de usarla.</p></div>`;
}
function lista69bHTML(did) {
  return `<div class="docp">${docHead('Revisión de proveedores contra el listado 69-B', did)}
    <p><b>Para qué sirve:</b> detectar a tiempo si un proveedor de un cliente aparece en el listado del SAT de quienes facturan operaciones inexistentes (art. 69-B del CFF).</p>
    <p><b>Cuándo revisar:</b> al dar de alta un proveedor nuevo, antes de registrar facturas de montos altos y una vez al mes para los proveedores principales.</p>
    <ol class="pasosdoc"><li>Consulta el listado en el portal del SAT y busca al proveedor por su RFC.</li>
    <li><b>Si aparece como presunto:</b> avisa al cliente, pide al proveedor que lo aclare y pon en pausa nuevas operaciones hasta tener certeza.</li>
    <li><b>Si aparece como definitivo:</b> el cliente tiene 30 días desde la publicación para acreditar que la operación sí ocurrió o corregir su situación. Si no lo hace, su sello puede restringirse (art. 17-H Bis, fr. V del CFF).</li>
    <li>Reúne la evidencia de la operación: contrato, entregables, pagos y comunicaciones.</li>
    <li>Anota la revisión en la tabla de abajo y guarda la evidencia junto a la contabilidad del cliente.</li></ol>
    <table class="t"><thead><tr><th>Fecha</th><th>Cliente (clave interna)</th><th>Proveedores revisados</th><th>¿Alguno en el listado?</th><th>Qué se hizo</th></tr></thead><tbody>${[1, 2, 3, 4].map(() => '<tr><td><span class="linea">&nbsp;</span></td><td><span class="linea">&nbsp;</span></td><td><span class="linea">&nbsp;</span></td><td><span class="linea">&nbsp;</span></td><td><span class="linea">&nbsp;</span></td></tr>').join('')}</tbody></table>
    <p class="mini">Procedimiento orientativo del Equipo DELTA. Confirmen plazos y criterios vigentes con su contador o asesor fiscal.</p></div>`;
}

/* ---------- Reporte: cumplimiento, e.firmas, ruta tecnológica y costo frente a la utilidad ---------- */
function cumpleEstado(c, did) {
  const r = (S.diagnostico[did] || {}).resp || [], vals = c.d.map(i => r[i - 1]).filter(v => v === 0 || v === 1 || v === 2);
  if (c.ef && S.efirma[did]) S.efirma[did].resp.forEach(v => { if (v === 0 || v === 1 || v === 2) vals.push(v); });
  if (!vals.length) return ['Sin datos', 'gris'];
  const p = vals.reduce((a, b) => a + b, 0) / (vals.length * 2) * 100;
  return p >= 90 ? ['Se cumple', 'ok'] : p >= 40 ? ['Parcial', 'g-media'] : ['Pendiente', 'g-alta'];
}
const cumpleHTML = did => `<h2>Qué te ayudamos a cumplir</h2><table class="t cumple"><thead><tr><th>Obligación</th><th>Fundamento</th><th>Cómo está hoy</th><th>Con qué te ayuda el servicio</th></tr></thead><tbody>${CUMPLE.map(c => { const [t, cl] = cumpleEstado(c, did); return `<tr><th>${c.t}</th><td>${fundHTML(c.n)}</td><td>${cl === 'gris' ? '<span class="mini">Sin datos</span>' : pill(t, cl)}</td><td>${c.como}</td></tr>`; }).join('')}</tbody></table><p class="mini">"Cómo está hoy" se calcula con las respuestas del propio despacho al diagnóstico. Es una orientación, no una auditoría de cumplimiento ni asesoría legal.</p>`;
function efResumenHTML(did) {
  const e = S.efirma[did]; if (!e || !Object.keys(e.c || {}).length) return '';
  const hs = hallazgos(did).filter(h => h.origen === 'e.firmas y sellos');
  return `<h2>Resguardo de e.firmas y sellos</h2><p>El despacho guarda <b>${esc((e.c.efirmas || 'sin dato').toLowerCase())}</b> e.firma(s) y <b>${esc((e.c.csd || 'sin dato').toLowerCase())}</b> sello(s) de clientes; pueden abrirlos: <b>${esc((e.c.personas || 'sin dato').toLowerCase())}</b>. ${hs.length ? hs.length + ' hallazgo(s) en esta parte: ' + hs.map(h => h.id).join(', ') + '.' : 'Sin hallazgos en esta parte.'}</p>`;
}
function escalon(did) { const t = S.ti[did], dd = (t && t.datos) || {}, n = num(dd.equipos) || num((S.despachos[did] || {}).computadoras); return n > 10 || dd.datos === 'En un servidor o NAS de la oficina' || dd.contable === 'Instalado en un servidor del despacho' ? 'grande' : 'chica'; }
function rutaTecHTML(did) {
  const ops = oportunidadesVivas(did), cats = [...new Set(ops.map(h => h.d))].filter(c => RUTA_TEC[c]); if (!cats.length) return '';
  const esc1 = escalon(did), pr = (S.config && S.config.precios) || {};
  return `<h2>Ruta tecnológica recomendada</h2><table class="t"><thead><tr><th>Necesidad</th><th>Por qué</th><th>Qué se recomienda</th><th>Precio de referencia</th></tr></thead><tbody>${cats.map(c => { const r = RUTA_TEC[c]; return `<tr><th>${r.nec}</th><td>${ops.filter(h => h.d === c).map(h => h.id).join(', ')}</td><td>${esc(esc1 === 'grande' && r.grande ? r.grande : r.chica)}<br><small>${esc(r.ej)}</small></td><td>${pr[c] ? esc(pr[c]) + '<br><small>indicativo</small>' : '<span class="mini">A cotizar con el partner</span>'}</td></tr>`; }).join('')}</tbody></table>
    <p class="mini">Recomendación según el tamaño del despacho${S.ti[did] ? ' y el cuestionario de TI' : ''}. Los productos, precios y disponibilidad los confirma el distribuidor o partner (${pd(S.config.distribuidor)}). El Equipo DELTA no vende ni cotiza a nombre de Dell.</p>`;
}
const utilidadTxt = c => num(c.utilidadMes) > 0 && calcListo(c) ? `Un día sin operar equivale a <b>${r1(calcCosto(c, 1).total / num(c.utilidadMes) * 100)}%</b> de la utilidad mensual que capturó el despacho (${mxn(num(c.utilidadMes))}).` : '';

/* ---------- Propuesta de servicio (Equipo DELTA) ---------- */
function paqAtiende(k, did) { return paqAt(k, did).sort((a, b) => +a.slice(1) - +b.slice(1)); }
function paqAt(k, did) {
  const hs = ordenGravedad(hallazgos(did));
  if (k === 'cap') return hs.filter(h => /^D(6|7|8|9|26|27|28|29)$/.test(h.key) || h.origen === 'e.firmas y sellos' && /F(7|9)/.test(h.key)).map(h => h.id);
  if (k === 'acomp') return hs.filter(h => h.g === 'alta' && !h.d).map(h => h.id);
  return oportunidadesVivas(did).map(h => h.id);
}
V.propuesta = () => {
  const d = D(); if (!d) return sinDespachoC();
  const pp = propuesta(d.id), b = 'propuesta.' + d.id, st = diagStats(d.id), en = S.encuesta[d.id] || {}, c = kit(d.id).calculadora, hs = hallazgos(d.id);
  return `<div class="row between"><h1>Propuesta de servicio</h1><button class="btn p" data-a="pdf" data-v="propuesta">Guardar en PDF</button></div>
    <p class="lead">Se arma en la reunión de entrega con <b>${esc(d.nombre)}</b>. Elige qué paquetes ofrecer, pon el precio y registra la decisión del dueño.</p>
    <div class="grid4 res"><div class="tile"><span>Madurez</span><b>${st.total == null ? '—' : Math.round(st.total) + '%'}</b></div><div class="tile"><span>Hallazgos (altos)</span><b>${hs.length} (${hs.filter(h => h.g === 'alta').length})</b></div><div class="tile"><span>Costo de 1 día sin operar</span><b>${calcListo(c) ? mxn(calcCosto(c, 1).total) : '—'}</b></div><div class="tile"><span>Precio mensual que el dueño ve razonable</span><b>${en.pagoRazonable ? mxn(num(en.pagoRazonable)) : '—'}</b></div></div>
    ${PAQUETES.map(p => { const at = paqAtiende(p.k, d.id); return `<div class="card paq"><div class="row between"><h2>${chk(`${b}.incluir.${p.k}`, p.t)}</h2><small>${p.tipo}</small></div>
      <ul class="lista">${p.inc.map(x => `<li>${x}</li>`).join('')}</ul><p class="mini">Atiende: ${at.length ? at.join(', ') : 'sin hallazgos asociados'}</p>
      <div class="grid2">${fld('Precio (' + p.tipo + ')', inp(`${b}.precios.${p.k}`, { ph: p.k === 'tec' ? 'Según cotización del partner' : '$ MXN' }))}${fld('Decisión del dueño', sel(`${b}.decision.${p.k}`, DECISIONES))}</div></div>`; }).join('')}
    <div class="card">${fld('Notas de la reunión', area(b + '.notas', { rows: 3 }))}${fld('Fecha de la decisión', inp(b + '.fecha', { type: 'date' }))}</div>
    <p class="mini">El precio de "Implementación tecnológica" sale de la cotización del partner más los honorarios del Equipo DELTA. Registrar la decisión mide la intención de compra con algo más que la encuesta.</p>`;
};
function propuestaHTML(did) {
  const pp = propuesta(did), d = S.despachos[did], sel = PAQUETES.filter(p => pp.incluir[p.k]);
  return `<div class="docp">${docHead('Propuesta de servicio', did)}
    <p>Con base en el diagnóstico, la capacitación y el reporte de ${esc(d.nombre)}, el Equipo DELTA propone:</p>
    ${sel.map(p => { const at = paqAtiende(p.k, did); return `<h2>${p.t}</h2><ul>${p.inc.map(x => `<li>${x}</li>`).join('')}</ul><p><b>Precio:</b> ${pp.precios[p.k] ? esc(pp.precios[p.k]) + ' ' + p.tipo : '<span class="linea">por definir</span>'}${at.length ? ' · <b>Atiende:</b> ' + at.join(', ') : ''}</p><p><span class="box"></span> Aprobado &nbsp; <span class="box"></span> Pide cotización &nbsp; <span class="box"></span> Lo pensará &nbsp; <span class="box"></span> No por ahora</p>`; }).join('') || '<p>Sin paquetes seleccionados.</p>'}
    <div class="firmas"><div>Dueño o socio del despacho</div><div>Equipo DELTA</div></div>
    <p class="mini">Propuesta de un proyecto académico. La tecnología la cotiza y vende el partner; el Equipo DELTA no ofrece productos ni precios a nombre de Dell.</p></div>`;
}
const propResumen = did => { const pp = S.propuesta[did]; if (!pp || !pp.decision) return ''; const ds = PAQUETES.filter(p => pp.incluir && pp.incluir[p.k] && pp.decision[p.k]).map(p => p.t.split(' ')[0] + ': ' + pp.decision[p.k]); return ds.join(' · '); };
