/* ===== Resultados para el Equipo DELTA: reporte colectivo del despacho y reporte individual por alias ===== */
const pctTxt = (a, n) => n ? Math.round(a / n * 100) + '%' : '—';
const okx = b => b ? '<span class="ok-t">✓</span>' : '<span class="falta">✗</span>';
const conDatos = p => p.quizInicial || p.quizFinal || p.phishing || p.ej;
const nombreMsj = c => c.canal === 'WhatsApp' ? 'WhatsApp · ' + c.de : c.asunto;
const tipoMsj = c => c.fraude ? 'Fraude' : 'Legítimo';
const ANON_TK = () => ANON.filter(t => typeof t !== 'string');
const sinDatos = t => `<p class="mini">${t || 'Sin datos todavía.'}</p>`;

/* Ejercicios de opción: etiqueta del reactivo, opciones y respuesta adecuada */
const EJS = {
  rs: { t: 'Simulacro de ransomware (Módulo 4)', q: i => RANSOM.pasos[i].q, it: () => ITEMS.rs },
  ia: { t: 'Casos de IA (Módulo 6)', q: i => IA_CASOS[i].t, it: () => ITEMS.ia },
  bk: { t: '¿Respaldo o no? (Módulo 3, complementario)', q: i => RESP_CASOS[i].t, it: () => ITEMS.bk },
  url: { t: 'Lectura de enlaces (Módulo 1, práctica opcional)', q: i => URLS[i].u, it: () => ITEMS.url },
  dl: { t: 'Dilemas éticos (Módulo 7, complementario)', q: i => DILEMAS[i].t, it: () => ITEMS.dl }
};
const corto = (t, n = 90) => { t = String(t).replace(/<[^>]+>/g, ''); return t.length > n ? t.slice(0, n - 1) + '…' : t; };

/* --- Cálculos por persona --- */
function stPersona(p) {
  const e = p.ej || {}, r = k => (e[k] && e[k].r) || [];
  const cuenta = k => { const it = EJS[k].it(), rr = r(k); let n = 0, ok = 0; rr.forEach((v, i) => { if (v != null) { n++; if (v === it[i].c) ok++; } }); return { n, ok }; };
  const ph = r('ph'); let phn = 0, phok = 0; ph.forEach((x, i) => { if (x) { phn++; if (x.e === CORREOS[i].fraude) phok++; } });
  const rsr = r('rs'), horas = rsr.reduce((a, v, i) => a + (v == null ? 0 : ITEMS.rs[i].h[v]), 0);
  const an = (e.an && e.an.v) || null, tk = ANON_TK(), sens = tk.map((t, k) => [t, k]).filter(x => x[0].s);
  return {
    ph: { n: phn, ok: phok }, rs: Object.assign(cuenta('rs'), { horas, completo: rsr.filter(v => v != null).length === ITEMS.rs.length }), ia: cuenta('ia'), bk: cuenta('bk'), url: cuenta('url'), dl: cuenta('dl'),
    an: an ? { ok: sens.filter(x => an[x[1]]).length, n: sens.length, sobra: tk.filter((t, k) => !t.s && an[k]).length } : null,
    sal: e.sal && e.sal.v ? { ok: SALIDA.items.filter((x, i) => !!e.sal.v[i] === x[1]).length, n: SALIDA.items.length } : null,
    ruta: MINIMA.filter(x => pasoHecho(p, x)).length
  };
}

/* --- Bloques compartidos --- */
function tilesPersona(p, st) {
  const qi = p.quizInicial, qf = p.quizFinal;
  return `<div class="grid3 res">
    <div class="tile"><span>Quiz inicial · final</span><b>${qi ? r1(qi.pct) + '%' : '—'} → ${qf ? r1(qf.pct) + '%' : '—'}</b></div>
    <div class="tile ${qi && qf && qf.pct - qi.pct >= 20 ? 'ok' : ''}"><span>Mejora</span><b>${qi && qf ? (qf.pct - qi.pct >= 0 ? '+' : '') + r1(qf.pct - qi.pct) + ' pts' : '—'}</b></div>
    <div class="tile"><span>Ruta mínima</span><b>${st.ruta} de ${MINIMA.length} pasos</b></div>
    <div class="tile"><span>Simulador de mensajes</span><b>${st.ph.n ? st.ph.ok + ' de ' + st.ph.n : '—'}</b></div>
    <div class="tile"><span>Simulacro: acertadas · reloj</span><b>${st.rs.n ? st.rs.ok + ' de ' + st.rs.n + ' · ' + hTxt(st.rs.horas) : '—'}</b></div>
    <div class="tile"><span>Casos de IA</span><b>${st.ia.n ? st.ia.ok + ' de ' + st.ia.n : '—'}</b></div></div>`;
}

/* ================= Reporte individual ================= */
function repIndividual(p) {
  const did = p.despachoId, st = stPersona(p), e = p.ej || {};
  const quiz = (z, t) => !z ? `<h2>${t}</h2>${sinDatos('No lo ha contestado o no ha llegado su código.')}` : `<h2>${t} · ${r1(z.pct)}% <small>forma ${z.forma || 'A'}</small></h2>
    <table class="t det"><thead><tr><th></th><th>Pregunta</th><th>Su respuesta</th><th>Respuesta adecuada</th></tr></thead><tbody>${forma(z).map((q, i) => { const bien = z.resp[i] === q.c; return `<tr class="${bien ? '' : 'mal-f'}"><td>${okx(bien)}</td><td><b>${i + 1}.</b> ${esc(q.q)}<br><small>Módulo ${q.m}${bien ? '' : ' · ' + esc(corto(q.e, 160))}</small></td><td>${esc(q.o[z.resp[i]] || 'Sin respuesta')}</td><td>${bien ? '<small>—</small>' : esc(q.o[q.c])}</td></tr>`; }).join('')}</tbody></table>`;
  // Dónde reforzar
  const ref = [];
  if (p.quizFinal) forma(p.quizFinal).forEach((q, i) => { if (p.quizFinal.resp[i] !== q.c) ref.push(`Quiz final, pregunta ${i + 1} (Módulo ${q.m}): ${esc(corto(q.q, 80))}`); });
  ((e.ph && e.ph.r) || []).forEach((x, i) => { if (x && CORREOS[i].fraude && !x.e) ref.push(`No detectó el fraude «${esc(nombreMsj(CORREOS[i]))}»`); });
  ((e.rs && e.rs.r) || []).forEach((v, i) => { if (v != null && v !== ITEMS.rs[i].c) ref.push(`Simulacro, decisión ${i + 1}: eligió «${esc(corto(ITEMS.rs[i].o[v], 70))}»`); });
  ((e.ia && e.ia.r) || []).forEach((v, i) => { if (v != null && v !== ITEMS.ia[i].c && ITEMS.ia[i].c === 2) ref.push(`Clasificó como «${IA_OPC[v]}» un caso prohibido: ${esc(corto(IA_CASOS[i].t, 70))}`); });
  const ph = (e.ph && e.ph.r) || [];
  const phT = ph.some(Boolean) ? `<table class="t det"><thead><tr><th></th><th>Mensaje</th><th>Era</th><th>Dijo</th><th>Señales que marcó</th></tr></thead><tbody>${CORREOS.map((c, i) => { const x = ph[i]; if (!x) return `<tr><td></td><td>${esc(nombreMsj(c))}</td><td>${tipoMsj(c)}</td><td colspan="2"><small>Sin respuesta</small></td></tr>`; const bien = x.e === c.fraude, mk = (x.s || []).filter(k => c.s.includes(k)).length, extra = (x.s || []).filter(k => !c.s.includes(k)).length; return `<tr class="${bien ? '' : 'mal-f'}"><td>${okx(bien)}</td><td>${esc(nombreMsj(c))}</td><td>${tipoMsj(c)}</td><td>${x.e ? 'Fraude' : 'Legítimo'}</td><td>${c.s.length ? mk + ' de ' + c.s.length + ' presentes' : 'No había señales'}${extra ? ` <small>· ${extra} de más</small>` : ''}</td></tr>`; }).join('')}</tbody></table>` : sinDatos();
  const opc = k => { const it = EJS[k].it(), rr = (e[k] && e[k].r) || []; if (!rr.some(v => v != null)) return ''; return `<h2>${EJS[k].t} · ${st[k].ok} de ${st[k].n}</h2><table class="t det"><thead><tr><th></th><th>Reactivo</th><th>Eligió</th><th>Adecuada</th>${k === 'rs' ? '<th>Horas</th>' : ''}</tr></thead><tbody>${it.map((x, i) => { const v = rr[i]; if (v == null) return ''; const bien = v === x.c; return `<tr class="${bien ? '' : 'mal-f'}"><td>${okx(bien)}</td><td>${esc(corto(EJS[k].q(i), 120))}</td><td>${esc(corto(x.o[v], 90))}</td><td>${bien ? '<small>—</small>' : esc(corto(x.o[x.c], 90))}</td>${k === 'rs' ? `<td>${hTxt(x.h[v])}</td>` : ''}</tr>`; }).join('')}</tbody></table>${k === 'rs' ? `<p class="mini">Reloj: ${hTxt(st.rs.horas)} de interrupción contra ${hTxt(RS_MEJOR)} del mejor camino. Horas ilustrativas, para comparar decisiones.</p>` : ''}`; };
  const an = e.an && e.an.v, tk = ANON_TK();
  const anT = an ? `<h2>Taller de anonimización · ${st.an.ok} de ${st.an.n} datos detectados</h2><p>${tk.map((t, k) => t.s ? `<span class="tok-r ${an[k] ? 'si' : 'no'}">${esc(t.t)}</span>` : (an[k] ? `<span class="tok-r de-mas">${esc(t.t)}</span>` : '')).join(' ')}</p><p class="mini">Verde: lo detectó. Rojo: se le pasó. Gris: lo marcó aunque podía quedarse.</p>` : '';
  const sal = e.sal && e.sal.v;
  const salT = sal ? `<h2>Caso: último día de un colaborador · ${st.sal.ok} de ${st.sal.n}</h2><table class="t det"><tbody>${SALIDA.items.map((x, i) => { const bien = !!sal[i] === x[1]; return `<tr class="${bien ? '' : 'mal-f'}"><td>${okx(bien)}</td><td>${esc(x[0])}</td><td>${sal[i] ? 'Lo marcó' : 'No lo marcó'}</td><td><small>${x[1] ? 'Sí, hoy' : 'No'}</small></td></tr>`; }).join('')}</tbody></table>` : '';
  return `<div class="docp rep">${docHead('Reporte individual · ' + esc(p.alias), did)}
    <p class="mini">Participante identificado solo por alias. Fuente: respuestas enviadas desde su dispositivo; el último código recibido es de ${p.ts ? (f => String(f.getDate()).padStart(2, '0') + '/' + String(f.getMonth() + 1).padStart(2, '0') + '/' + f.getFullYear())(new Date(p.ts)) : '—'}.</p>
    ${tilesPersona(p, st)}
    <h2>Dónde reforzar</h2>${ref.length ? `<ul>${ref.slice(0, 10).map(x => `<li>${x}</li>`).join('')}</ul>${ref.length > 10 ? `<p class="mini">Y ${ref.length - 10} punto(s) más en el detalle.</p>` : ''}` : sinDatos(p.quizFinal ? 'Sin errores en el quiz final ni fraudes sin detectar.' : 'Aparece cuando llegue su quiz final y sus ejercicios.')}
    ${quiz(p.quizFinal, 'Quiz final')}${quiz(p.quizInicial, 'Quiz inicial')}
    <h2>Simulador de mensajes · ${st.ph.n ? st.ph.ok + ' de ' + st.ph.n : 'sin datos'}</h2>${phT}
    ${opc('rs')}${opc('ia')}${anT}${opc('bk')}${salT}${opc('dl')}${opc('url')}</div>`;
}

/* ================= Reporte colectivo ================= */
function agregaOpc(ps, k) {
  const it = EJS[k].it();
  return it.map((x, i) => { const vs = ps.map(p => p.ej && p.ej[k] && p.ej[k].r && p.ej[k].r[i]).filter(v => v != null), mal = vs.filter(v => v !== x.c), moda = {}; mal.forEach(v => { moda[v] = (moda[v] || 0) + 1; }); const top = Object.entries(moda).sort((a, b) => b[1] - a[1])[0]; return { i, n: vs.length, ok: vs.length - mal.length, err: top ? { v: +top[0], c: top[1] } : null }; });
}
function repColectivo(did) {
  const d = S.despachos[did], ps = participantesDe(did).filter(conDatos).sort((a, b) => a.alias.localeCompare(b.alias, 'es')), cs = capStats(did), sts = ps.map(p => [p, stPersona(p)]);
  const prom = f => { const v = sts.map(([p, s]) => f(p, s)).filter(x => x != null); return v.length ? avg(v) : null; };
  const phAvg = prom((p, s) => s.ph.n ? s.ph.ok / s.ph.n * 100 : null), iaAvg = prom((p, s) => s.ia.n ? s.ia.ok / s.ia.n * 100 : null), hAvg = prom((p, s) => s.rs.completo ? s.rs.horas : null);
  // Quiz por módulo
  const porMod = tipo => [1, 2, 3, 4, 5, 6, 7].map(m => { let n = 0, ok = 0; ps.forEach(p => { const z = p[tipo]; if (!z) return; forma(z).forEach((q, i) => { if (q.m === m) { n++; if (z.resp[i] === q.c) ok++; } }); }); return { n, ok }; });
  const mi = porMod('quizInicial'), mf = porMod('quizFinal');
  // Preguntas del quiz final con menos aciertos (las dos formas)
  const pf = []; ['A', 'B'].forEach(f => FORMAS[f].forEach((q, i) => { const zs = ps.map(p => p.quizFinal).filter(z => z && (z.forma || 'A') === f); if (!zs.length) return; const mal = zs.filter(z => z.resp[i] !== q.c), moda = {}; mal.forEach(z => { moda[z.resp[i]] = (moda[z.resp[i]] || 0) + 1; }); const top = Object.entries(moda).sort((a, b) => b[1] - a[1])[0]; pf.push({ q, f, i, n: zs.length, ok: zs.length - mal.length, err: top ? q.o[+top[0]] : null }); }));
  const dif = pf.filter(x => x.ok < x.n).sort((a, b) => a.ok / a.n - b.ok / b.n).slice(0, 6);
  // Simulador por mensaje
  const msj = CORREOS.map((c, i) => { const rs = ps.map(p => p.ej && p.ej.ph && p.ej.ph.r && p.ej.ph.r[i]).filter(Boolean); return { c, i, n: rs.length, ok: rs.filter(x => x.e === c.fraude).length, sen: c.s.length && rs.length ? avg(rs.map(x => (x.s || []).filter(k => c.s.includes(k)).length / c.s.length * 100)) : null }; }).filter(x => x.n).sort((a, b) => a.ok / a.n - b.ok / b.n);
  const tablaOpc = k => { const ag = agregaOpc(ps, k).filter(x => x.n); if (!ag.length) return ''; const it = EJS[k].it(); return `<h2>${EJS[k].t}</h2><table class="t det"><thead><tr><th>Reactivo</th><th>Eligieron la adecuada</th><th>Error más común</th></tr></thead><tbody>${ag.map(x => `<tr class="${x.ok < x.n ? 'mal-f' : ''}"><td>${esc(corto(EJS[k].q(x.i), 110))}</td><td>${x.ok} de ${x.n}</td><td>${x.err ? esc(corto(it[x.i].o[x.err.v], 70)) + ` <small>(${x.err.c})</small>` : '—'}</td></tr>`).join('')}</tbody></table>${k === 'rs' && hAvg != null ? `<p class="mini">Reloj promedio del grupo: ${hTxt(hAvg)} de interrupción contra ${hTxt(RS_MEJOR)} del mejor camino. Horas ilustrativas.</p>` : ''}`; };
  // Anonimización
  const tk = ANON_TK(), conAn = ps.filter(p => p.ej && p.ej.an && p.ej.an.v);
  const anT = conAn.length ? `<h2>Taller de anonimización <small>${conAn.length} persona(s)</small></h2><table class="t det"><thead><tr><th>Dato que había que quitar</th><th>Lo detectaron</th></tr></thead><tbody>${tk.map((t, k) => [t, k]).filter(x => x[0].s).map(([t, k]) => ({ t, ok: conAn.filter(p => p.ej.an.v[k]).length })).sort((a, b) => a.ok - b.ok).map(x => `<tr class="${x.ok < conAn.length ? 'mal-f' : ''}"><td>${esc(x.t.t)} <small>· ${esc(x.t.p)}</small></td><td>${x.ok} de ${conAn.length}</td></tr>`).join('')}</tbody></table>` : '';
  const conSal = ps.filter(p => p.ej && p.ej.sal && p.ej.sal.v);
  const salT = conSal.length ? `<h2>Caso: último día de un colaborador <small>${conSal.length} persona(s)</small></h2><table class="t det"><thead><tr><th>Acción</th><th>Bien resuelta</th></tr></thead><tbody>${SALIDA.items.map((x, i) => ({ x, ok: conSal.filter(p => !!p.ej.sal.v[i] === x[1]).length })).sort((a, b) => a.ok - b.ok).map(y => `<tr class="${y.ok < conSal.length ? 'mal-f' : ''}"><td>${esc(y.x[0])} <small>(${y.x[1] ? 'sí, hoy' : 'no'})</small></td><td>${y.ok} de ${conSal.length}</td></tr>`).join('')}</tbody></table>` : '';
  return `<div class="docp rep">${docHead('Reporte colectivo de la capacitación', did)}
    <p class="mini">${ps.length} participante(s) con datos${d.esperados ? ' de ' + esc(d.esperados) + ' esperados' : ''}; ${cs.pares} con quiz inicial y final. Con grupos tan pequeños, una persona mueve los promedios: léanse junto con su n.</p>
    <div class="grid3 res"><div class="tile"><span>Quiz inicial → final (n = ${cs.pares})</span><b>${cs.ini == null ? '—' : r1(cs.ini) + '%'} → ${cs.fin == null ? '—' : r1(cs.fin) + '%'}</b></div><div class="tile ${cs.mejora != null && cs.mejora >= 20 ? 'ok' : ''}"><span>Mejora</span><b>${cs.mejora == null ? '—' : (cs.mejora >= 0 ? '+' : '') + r1(cs.mejora) + ' pts'}</b></div><div class="tile"><span>Simulador de mensajes</span><b>${phAvg == null ? '—' : r1(phAvg) + '%'}</b></div><div class="tile"><span>Casos de IA</span><b>${iaAvg == null ? '—' : r1(iaAvg) + '%'}</b></div><div class="tile"><span>Reloj del simulacro (promedio)</span><b>${hAvg == null ? '—' : hTxt(hAvg)}</b></div><div class="tile"><span>Ruta mínima completa</span><b>${sts.filter(([p, s]) => s.ruta === MINIMA.length).length} de ${ps.length}</b></div></div>
    <h2>Participantes</h2>${ps.length ? `<table class="t det"><thead><tr><th>Alias</th><th>Inicial</th><th>Final</th><th>Mejora</th><th>Simulador</th><th>Simulacro</th><th>IA</th><th>Ruta</th></tr></thead><tbody>${sts.map(([p, s]) => `<tr><th>${esc(p.alias)}</th><td>${p.quizInicial ? r1(p.quizInicial.pct) + '%' : '—'}</td><td>${p.quizFinal ? r1(p.quizFinal.pct) + '%' : '—'}</td><td>${p.quizInicial && p.quizFinal ? (p.quizFinal.pct - p.quizInicial.pct >= 0 ? '+' : '') + r1(p.quizFinal.pct - p.quizInicial.pct) : '—'}</td><td>${s.ph.n ? pctTxt(s.ph.ok, s.ph.n) : '—'}</td><td>${s.rs.n ? s.rs.ok + '/' + s.rs.n : '—'}</td><td>${s.ia.n ? pctTxt(s.ia.ok, s.ia.n) : '—'}</td><td>${s.ruta}/${MINIMA.length}</td></tr>`).join('')}</tbody></table>` : sinDatos('Aún no llega ningún código de este despacho.')}
    <h2>Quiz por módulo: aciertos antes y después</h2><table class="t det num"><thead><tr><th>Módulo</th><th>Inicial</th><th>Final</th><th>Cambio</th></tr></thead><tbody>${MODULOS.map((m, k) => { const a = mi[k].n ? mi[k].ok / mi[k].n * 100 : null, b = mf[k].n ? mf[k].ok / mf[k].n * 100 : null; return `<tr><th>${m.n}. ${esc(corto(m.titulo, 60))}</th><td>${a == null ? '—' : Math.round(a) + '%'}</td><td>${b == null ? '—' : Math.round(b) + '%'}</td><td>${a == null || b == null ? '—' : (b - a >= 0 ? '+' : '') + Math.round(b - a)}</td></tr>`; }).join('')}</tbody></table>
    <h2>Preguntas del quiz final con más errores</h2>${dif.length ? `<table class="t det"><thead><tr><th>Pregunta</th><th>Acertaron</th><th>Respuesta equivocada más común</th></tr></thead><tbody>${dif.map(x => `<tr class="mal-f"><td>${esc(corto(x.q.q, 120))} <small>(forma ${x.f}, módulo ${x.q.m})</small></td><td>${x.ok} de ${x.n}</td><td>${esc(corto(x.err || '', 80))}</td></tr>`).join('')}</tbody></table>` : sinDatos(pf.length ? 'Nadie falló preguntas en el quiz final.' : 'Aparece cuando lleguen los quiz finales.')}
    <h2>Simulador de mensajes: cuáles engañaron más</h2>${msj.length ? `<table class="t det"><thead><tr><th>Mensaje</th><th>Era</th><th>Acertaron</th><th>Señales detectadas</th></tr></thead><tbody>${msj.map(x => `<tr class="${x.ok < x.n ? 'mal-f' : ''}"><td>${esc(nombreMsj(x.c))}</td><td>${tipoMsj(x.c)}</td><td>${x.ok} de ${x.n}</td><td>${x.sen == null ? '—' : Math.round(x.sen) + '%'}</td></tr>`).join('')}</tbody></table>` : sinDatos()}
    ${tablaOpc('rs')}${tablaOpc('ia')}${anT}${tablaOpc('bk')}${salT}${tablaOpc('dl')}${tablaOpc('url')}</div>`;
}

/* ================= Pantalla ================= */
V.resultados = () => {
  const d = D(); if (!d) return sinDespachoC();
  const ps = participantesDe(d.id).sort((a, b) => a.alias.localeCompare(b.alias, 'es')), p = T.rp && S.participantes[T.rp] && S.participantes[T.rp].despachoId === d.id ? S.participantes[T.rp] : null;
  return `<div class="row between"><h1>Resultados · ${esc(d.nombre)}</h1><button class="btn p" data-a="pdfres">Guardar en PDF</button></div>
    <div class="card"><div class="selrp"><button class="chip ${p ? '' : 'on'}" data-a="rp" data-v="">Todo el despacho</button>${ps.map(x => `<button class="chip ${p && p.id === x.id ? 'on' : ''}" data-a="rp" data-v="${x.id}">${esc(x.alias)}${conDatos(x) ? '' : ' <small>(sin datos)</small>'}</button>`).join('')}</div>
      <p class="mini">Muestra lo que ya llegó a este dispositivo. Si falta alguien, importa sus mensajes en Datos y revisa en Despachos quién no ha enviado. Los ejercicios se guardan con detalle desde esta versión de la app.</p></div>
    <div class="paper">${p ? repIndividual(p) : repColectivo(d.id)}</div>`;
};
