/* ===== Contenido fiscal y de operación del servicio (comentarios de la presentación, nov 2026) =====
   Todo el contenido fiscal de este archivo debe revisarlo el contador antes del piloto. */

FUENTES.cff = { t: 'Código Fiscal de la Federación, artículos 17-D, 17-H, 17-H Bis, 17-J, 17-K, 28, 30 y 69-B, Cámara de Diputados', u: 'https://www.diputados.gob.mx/LeyesBiblio/pdf/CFF.pdf' };
FUENTES.imcp = { t: 'IMCP · Código de Ética Profesional 2026', u: 'https://imcp.org.mx/codigo-de-etica-profesional-2026/' };
FUENTES.regDatos = { t: 'Reglamento de la LFPDPPP, artículo 65: lo mínimo que se informa al titular ante una vulneración', u: 'https://mley.mx/Reg_LFPDPPP/articulo/65/' };

/* ---- Fundamento de cada hallazgo: obligación legal, ética profesional o buena práctica ---- */
const NORMAS = {
  'CFF 17-D': { tipo: 'ley', t: 'CFF, art. 17-D', d: 'La e.firma sustituye a la firma autógrafa y produce los mismos efectos. Su uso es responsabilidad de su titular.' },
  'CFF 17-H': { tipo: 'ley', t: 'CFF, art. 17-H, fr. I', d: 'El titular puede pedir que su certificado quede sin efectos, por ejemplo si se perdió o se filtró.' },
  'CFF 17-H Bis': { tipo: 'ley', t: 'CFF, art. 17-H Bis', d: 'El SAT puede restringir temporalmente el certificado de sello digital. Hay 40 días hábiles para presentar la aclaración; al día siguiente de presentarla se restablece su uso mientras se resuelve.' },
  'CFF 17-K': { tipo: 'ley', t: 'CFF, art. 17-K', d: 'El buzón tributario es el medio por el que el SAT notifica y envía avisos al contribuyente.' },
  'CFF 28': { tipo: 'ley', t: 'CFF, art. 28', d: 'La contabilidad incluye registros, papeles de trabajo, estados de cuenta y documentación comprobatoria, y se lleva en medios electrónicos.' },
  'CFF 30': { tipo: 'ley', t: 'CFF, art. 30', d: 'La contabilidad y su documentación se conservan, por regla general, cinco años desde que se presentó la declaración.' },
  'CFF 69-B': { tipo: 'ley', t: 'CFF, art. 69-B', d: 'Operaciones inexistentes: si un proveedor aparece en el listado definitivo, quien usó sus facturas tiene 30 días para acreditar la operación o corregir su situación.' },
  'RCFF 34': { tipo: 'ley', t: 'Reglamento del CFF, art. 34', d: 'Forma parte de la contabilidad la documentación del sistema electrónico donde se registran y procesan los datos contables.' },
  'LFPDPPP 14-15': { tipo: 'ley', t: 'LFPDPPP, arts. 14 y 15', d: 'Aviso de privacidad y su contenido mínimo.' },
  'LFPDPPP 18': { tipo: 'ley', t: 'LFPDPPP, art. 18', d: 'Medidas de seguridad administrativas, técnicas y físicas para proteger los datos personales.' },
  'LFPDPPP 19': { tipo: 'ley', t: 'LFPDPPP, art. 19', d: 'Las vulneraciones que afecten de forma significativa los derechos de las personas se les informan de inmediato.' },
  'LFPDPPP 20': { tipo: 'ley', t: 'LFPDPPP, art. 20', d: 'Quienes tratan datos personales guardan confidencialidad, incluso después de terminar la relación.' },
  'IMCP': { tipo: 'etica', t: 'Código de Ética Profesional del IMCP', d: 'Confidencialidad y secreto profesional; competencia y diligencia profesional.' },
  'NIST GV': { tipo: 'practica', t: 'NIST CSF 2.0 · Gobernar', d: 'Marco voluntario de buenas prácticas: responsables, reglas y supervisión.' },
  'NIST ID': { tipo: 'practica', t: 'NIST CSF 2.0 · Identificar', d: 'Marco voluntario de buenas prácticas: saber qué se tiene y qué riesgos hay.' },
  'NIST PR': { tipo: 'practica', t: 'NIST CSF 2.0 · Proteger', d: 'Marco voluntario de buenas prácticas: accesos, capacitación y protección de equipos y datos.' },
  'NIST DE': { tipo: 'practica', t: 'NIST CSF 2.0 · Detectar', d: 'Marco voluntario de buenas prácticas: notar a tiempo lo que no es normal.' },
  'NIST RS': { tipo: 'practica', t: 'NIST CSF 2.0 · Responder', d: 'Marco voluntario de buenas prácticas: qué hacer durante un incidente.' },
  'NIST RC': { tipo: 'practica', t: 'NIST CSF 2.0 · Recuperar', d: 'Marco voluntario de buenas prácticas: volver a operar después de un incidente.' }
};
const TIPO_NORMA = { ley: 'Obligación legal', etica: 'Ética profesional', practica: 'Buena práctica' };

/* ---- Diagnóstico: área 7 ---- */
DOMINIOS.push({ n: 'Obligaciones fiscales digitales', nist: 'Gobernar (GV) y Responder (RS)' });
DIAG.push(
  { q: '¿Se revisa al menos cada semana el buzón tributario de los clientes (o los clientes reenvían sus avisos) para detectar a tiempo requerimientos o restricciones?', h: 'Buzón tributario de clientes sin revisión periódica', r: 'Un aviso de restricción o un requerimiento puede pasar días sin atenderse mientras corren los plazos.', g: 'alta', a0: 'Asignar a una persona la revisión semanal del buzón de cada cliente y anotar lo que encuentre.', a1: 'Llevar una agenda compartida de plazos por cliente, con recordatorios.' },
  { q: '¿Se revisa a los proveedores de los clientes contra el listado del artículo 69-B (empresas que facturan operaciones simuladas) antes de registrar sus facturas?', h: 'Proveedores de clientes sin revisar contra el listado 69-B', r: 'Si un proveedor aparece en el listado definitivo, el cliente tiene un plazo corto para acreditar la operación o corregir; si no lo hace, el SAT puede restringir su sello.', g: 'alta', a0: 'Revisar cada mes el listado del SAT para los proveedores nuevos y los de mayor monto (anexo 7 del kit).', a1: 'Usar la consulta automática del software contable o del proveedor de facturación, si la ofrece.' },
  { q: '¿La contabilidad y los XML de cada cliente se conservan completos y recuperables por al menos cinco años?', h: 'Contabilidad y XML sin garantía de conservación por cinco años', r: 'Si se pierden, el cliente no puede comprobar deducciones o saldos ante una revisión del SAT.', g: 'alta', a0: 'Confirmar que la contabilidad y los XML de los últimos cinco ejercicios están en el respaldo y que se pueden abrir.', a1: 'Respaldo automático con versiones y conservación de al menos cinco años, con una copia fuera de la oficina.', d: 'RESP' },
  { q: '¿El sistema contable guarda una bitácora de quién capturó o modificó cada póliza, y alguien la revisa?', h: 'Sin bitácora de cambios en el sistema contable', r: 'Ante un error o una modificación indebida no se puede saber quién la hizo ni cuándo.', g: 'media', a0: 'Activar la bitácora o el registro de usuarios del sistema contable y revisarla en cada cierre.', a1: 'Usar un sistema contable con usuarios individuales y registro de cambios.' },
  { q: '¿El despacho sabe qué hacer si el SAT restringe el certificado de sello digital de un cliente (40 días hábiles para presentar la aclaración)?', h: 'Sin procedimiento ante la restricción de un sello', r: 'El cliente no puede facturar hasta que se presenta la aclaración; si vence el plazo, el certificado queda sin efectos.', g: 'alta', a0: 'Adoptar el procedimiento del anexo 5 del kit y nombrar a quién le toca.', a1: 'Practicarlo con el personal en el Módulo 9.' }
);
const FUND_D = [['NIST GV', 'LFPDPPP 18'], ['LFPDPPP 18', 'IMCP'], ['LFPDPPP 14-15'], ['LFPDPPP 19', 'NIST RS'], ['LFPDPPP 20', 'IMCP'],
  ['LFPDPPP 18', 'NIST PR'], ['NIST PR'], ['NIST PR'], ['NIST DE', 'NIST RS'], ['LFPDPPP 20', 'NIST PR'],
  ['CFF 17-D', 'LFPDPPP 18'], ['NIST PR'], ['NIST PR'], ['NIST PR'], ['LFPDPPP 18', 'NIST PR'],
  ['NIST ID'], ['NIST PR'], ['NIST DE'], ['LFPDPPP 18'], ['NIST DE'],
  ['CFF 30', 'NIST RC'], ['CFF 30', 'NIST RC'], ['NIST RC'], ['NIST RC'], ['NIST RC'],
  ['IMCP', 'NIST GV'], ['NIST ID'], ['LFPDPPP 18', 'IMCP'], ['IMCP'], ['IMCP'],
  ['CFF 17-K', 'CFF 17-H Bis'], ['CFF 69-B', 'CFF 17-H Bis'], ['CFF 28', 'CFF 30'], ['RCFF 34', 'NIST DE'], ['CFF 17-H Bis']];
DIAG.forEach((x, i) => { x.f = FUND_D[i] || []; });
Object.assign(RIESGOS_PROCESO.find(x => x.k === 'canal'), { f: ['LFPDPPP 18'] });
RIESGOS_PROCESO.forEach(x => { if (!x.f) x.f = { cifrado: ['LFPDPPP 18'], acceso: ['LFPDPPP 18'], respaldo: ['CFF 30', 'NIST RC'], usb: ['LFPDPPP 18'], ia: ['LFPDPPP 18', 'IMCP'], papel: ['LFPDPPP 18'], eliminacion: ['NIST PR'] }[x.k] || []; });
Object.assign(REGLAS_EQ.viejo, { f: ['NIST ID'] }); Object.assign(REGLAS_EQ.sinresp, { f: ['CFF 30', 'NIST RC'] }); Object.assign(REGLAS_EQ.sinprot, { f: ['NIST PR'] }); Object.assign(REGLAS_EQ.compartido, { f: ['LFPDPPP 18'] });

/* ---- e.firmas y sellos de clientes (lo contesta el dueño o socio; sin RFC ni nombres) ---- */
const EF_CONTEOS = [
  { k: 'efirmas', q: '¿Cuántas e.firmas de clientes guarda el despacho?', o: ['Ninguna', '1 a 10', '11 a 50', 'Más de 50'] },
  { k: 'csd', q: '¿Cuántos certificados de sello digital (CSD) de clientes guarda?', o: ['Ninguno', '1 a 10', '11 a 50', 'Más de 50'] },
  { k: 'personas', q: '¿Cuántas personas del despacho pueden abrir esos archivos?', o: ['Solo una', '2 o 3', 'Más de 3', 'Todo el personal'] }
];
const EF_PREG = [
  { q: '¿Los archivos de cada e.firma y sello (.key y .cer) están en una carpeta cifrada o una bóveda, y no en el correo, WhatsApp, memorias USB o carpetas compartidas abiertas?', h: 'Archivos de e.firma y sello en lugares sin protección', r: 'Quien obtenga el archivo y su contraseña puede presentar trámites y tramitar sellos a nombre del cliente.', g: 'alta', a0: 'Mover los archivos a una carpeta cifrada con acceso solo para quien los usa, y borrarlos del correo, WhatsApp y memorias USB.', a1: 'Usar una bóveda que guarde archivos cifrados y registre quién los abre.', d: 'GEST', f: ['CFF 17-D', 'LFPDPPP 18'] },
  { q: '¿Las contraseñas de las e.firmas se guardan separadas de los archivos, en un gestor de contraseñas (no en hojas de cálculo, notas o junto al archivo)?', h: 'Contraseñas de e.firma junto a los archivos o en hojas de cálculo', r: 'Si alguien copia la carpeta, se lleva el archivo y la contraseña al mismo tiempo.', g: 'alta', a0: 'Pasar las contraseñas a un gestor de contraseñas y borrarlas de hojas de cálculo y notas.', a1: 'Gestor de contraseñas para equipos, con permisos por cliente.', f: ['CFF 17-D', 'LFPDPPP 18'] },
  { q: '¿Solo pueden abrirlas las personas que hacen los trámites de ese cliente?', h: 'Más personas con acceso a las e.firmas de las necesarias', r: 'Cada persona con acceso es un punto más por donde puede salir una e.firma.', g: 'media', a0: 'Dejar el acceso solo a quien hace los trámites de cada cliente y revisar la lista cada trimestre.', a1: 'Organizar la bóveda por cliente, con permisos individuales.', f: ['LFPDPPP 18', 'NIST PR'] },
  { q: '¿Cada cliente autorizó por escrito que el despacho guarde y use su e.firma, y para qué trámites?', h: 'Sin autorización escrita para guardar y usar la e.firma de clientes', r: 'Ante un uso indebido no queda claro qué autorizó el cliente ni a qué se comprometió el despacho.', g: 'media', a0: 'Agregar a la carta de servicios una cláusula sobre el resguardo y uso de la e.firma: para qué trámites, quién la usa y cómo se devuelve.', a1: 'Revisar la cláusula con un asesor legal.', f: ['CFF 17-D', 'IMCP'] },
  { q: '¿Se lleva un registro de quién usó cada e.firma, cuándo y para qué trámite?', h: 'Sin registro de uso de las e.firmas', r: 'Si aparece un trámite que nadie reconoce, no hay forma de saber quién usó la e.firma ni cuándo.', g: 'media', a0: 'Llevar una bitácora sencilla: cliente, trámite, fecha y quién usó la e.firma.', a1: 'Usar una herramienta que registre cada uso de forma automática.', f: ['LFPDPPP 18', 'NIST DE'] },
  { q: '¿Se lleva control de vencimientos y se avisa al cliente antes de que venza su e.firma o su sello?', h: 'Sin control de vencimientos de e.firmas y sellos', r: 'Un certificado vencido detiene declaraciones o facturación justo cuando se necesita.', g: 'baja', a0: 'Anotar el vencimiento de cada e.firma y sello y avisar al cliente con un mes de anticipación.', a1: 'Recordatorios automáticos en el calendario del despacho.', f: ['NIST ID'] },
  { q: 'Cuando alguien deja el despacho, ¿se revisa ese mismo día qué e.firmas y contraseñas conocía, y se actúa?', h: 'e.firmas expuestas cuando sale personal', r: 'Una persona que ya no trabaja en el despacho podría conservar copias de e.firmas y contraseñas de clientes.', g: 'alta', a0: 'Al salir alguien, revisar ese día qué e.firmas conocía. Si pudo copiar archivo y contraseña, avisar al cliente y pedir que la deje sin efectos y tramite una nueva.', a1: 'Bóveda con acceso individual que se retira en un solo paso.', f: ['CFF 17-H', 'LFPDPPP 20'] },
  { q: 'Al terminar la relación con un cliente, ¿se borran del despacho sus archivos de e.firma y sello, y se le deja constancia?', h: 'Archivos de clientes anteriores siguen en el despacho', r: 'Se acumulan e.firmas de clientes que ya no se atienden, expuestas sin necesidad.', g: 'media', a0: 'Al terminar el servicio, borrar los archivos y dejar constancia por escrito al cliente.', a1: 'Revisión anual de la bóveda para retirar lo que ya no se usa.', f: ['LFPDPPP 20'] },
  { q: '¿El despacho sabe cómo pedir que una e.firma quede sin efectos si se pierde o se filtra?', h: 'Sin procedimiento ante la pérdida o filtración de una e.firma', r: 'Mientras se averigua qué hacer, quien tenga la e.firma puede seguir usándola.', g: 'alta', a0: 'Adoptar el procedimiento del anexo 5 del kit y tenerlo impreso.', a1: 'Practicarlo con el personal en el Módulo 9.', f: ['CFF 17-H'] }
];

/* ---- Cuestionario de tecnología: lo contesta quien da soporte técnico (interno o externo) ---- */
const TI_DATOS = [
  { k: 'soporte', q: '¿Quién da soporte técnico al despacho?', o: ['Personal del despacho', 'Un proveedor externo', 'Un familiar o conocido', 'Nadie en particular'] },
  { k: 'equipos', q: '¿Cuántas computadoras usa el despacho?', num: true },
  { k: 'viejos', q: '¿Cuántas de ellas tienen más de 4 años?', num: true },
  { k: 'so', q: '¿Qué sistemas operativos usan? Marca todos los que haya.', multi: ['Windows 11', 'Windows 10', 'macOS', 'Otro'] },
  { k: 'datos', q: '¿Dónde se guarda la información de los clientes?', o: ['En un servidor o NAS de la oficina', 'En la nube (OneDrive, Google Drive, Dropbox u otra)', 'En cada computadora', 'En varios de esos lugares'] },
  { k: 'contable', q: '¿Cómo se usa el sistema contable?', o: ['En la nube', 'Instalado en un servidor del despacho', 'Instalado en cada computadora'] },
  { k: 'respaldo', q: '¿Qué respaldo tienen hoy?', o: ['Ninguno', 'Un disco externo que alguien conecta', 'Automático en la oficina (servidor o NAS)', 'Automático en la nube', 'Automático en la oficina y en la nube'] }
];
const TI_PREG = [
  { q: '¿El Wi-Fi de invitados está separado de la red donde trabajan las computadoras del despacho?', h: 'Wi-Fi de invitados en la misma red que los equipos', r: 'Un visitante o un dispositivo infectado queda en la misma red que la información de los clientes.', g: 'media', a0: 'Crear una red de invitados separada en el módem o router.', a1: 'Router con redes separadas y administración central.', f: ['NIST PR'] },
  { q: '¿El trabajo desde casa se hace por una conexión segura (VPN o servicio con verificación en dos pasos), y no con programas de control remoto abiertos?', h: 'Acceso remoto sin protección', r: 'Los programas de control remoto expuestos son una vía común de entrada para el ransomware.', g: 'alta', a0: 'Desinstalar los programas de control remoto que no se usen y activar la verificación en dos pasos en los que sí.', a1: 'Acceso remoto por VPN o servicio administrado, con registro de conexiones.', d: 'GEST', f: ['NIST PR'] },
  { q: '¿El personal trabaja con usuarios sin permisos de administrador en sus computadoras?', h: 'Personal con permisos de administrador', r: 'Un programa malicioso que abre el usuario se instala con permisos completos.', g: 'media', a0: 'Dejar una cuenta de administrador por equipo que no se usa para el trabajo diario.', a1: 'Administración central de los equipos.', d: 'GEST', f: ['NIST PR'] },
  { q: '¿El correo del despacho tiene activados los filtros contra fraude y suplantación de su proveedor?', h: 'Correo sin filtros contra suplantación', r: 'Llegan más correos falsos que se hacen pasar por el SAT, bancos o clientes.', g: 'media', a0: 'Activar los filtros de fraude y suplantación que incluye el proveedor de correo.', a1: 'Configurar el dominio del despacho con los registros que validan al remitente (SPF, DKIM y DMARC).', f: ['NIST PR'] },
  { q: '¿El módem o router tiene una contraseña de administración distinta a la de fábrica y está actualizado?', h: 'Módem o router con la configuración de fábrica', r: 'Las contraseñas de fábrica y los equipos sin actualizar facilitan entrar a la red del despacho.', g: 'media', a0: 'Cambiar la contraseña de administración del módem y revisar que tenga la versión más reciente.', a1: 'Router de uso empresarial con actualizaciones.', f: ['NIST PR'] },
  { q: '¿Todos los programas instalados tienen licencia y soporte vigente?', h: 'Programas sin licencia o sin soporte', r: 'No reciben actualizaciones de seguridad y pueden traer programas maliciosos.', g: 'media', a0: 'Hacer la lista de programas instalados y retirar los que no tengan licencia o soporte.', a1: 'Licencias por suscripción, con actualizaciones incluidas.', f: ['NIST PR'] }
];
const TI_REGLAS = {
  sinSoporte: { h: 'Nadie da soporte técnico al despacho', r: 'Ante una falla o un ataque no hay a quién llamar, y cada hora cuenta.', g: 'alta', a0: 'Identificar a un proveedor de soporte y anotarlo en el plan de respuesta.', a1: 'Contratar soporte con un tiempo de respuesta acordado.', d: 'MDR', f: ['NIST RS'] },
  win10: { h: 'Computadoras con Windows 10', r: 'Windows 10 dejó de recibir soporte de Microsoft en octubre de 2025, salvo con el programa de actualizaciones extendidas.', g: 'alta', a0: 'Revisar qué equipos pueden actualizarse a Windows 11 y hacerlo.', a1: 'Renovar los equipos que no pueden actualizarse.', d: 'RENOV', f: ['NIST PR'] },
  viejos: { h: 'Computadoras con más de 4 años', r: 'Los equipos antiguos fallan más y pueden dejar de recibir actualizaciones de seguridad.', g: 'media', a0: 'Revisar si aún reciben actualizaciones y planear su sustitución.', a1: 'Renovación escalonada, empezando por los equipos que guardan información de clientes.', d: 'RENOV', f: ['NIST ID'] }
};

/* ---- Módulo 9 ---- */
MODULOS.push({
  n: 9, titulo: 'Sellos, e.firma y facturas apócrifas: el riesgo fiscal de un incidente', tema: 'e.firma, sellos digitales y listado 69-B', lugar: 'Autoaprendizaje · se muestra en la sesión en vivo', min: 14,
  solo: 'Es complementario. El simulador también se puede recorrer en grupo durante la sesión en vivo, con la pantalla compartida.',
  ejercicio: 'Simulador «Un día sin sello»',
  guia: ['¿Dónde están hoy las e.firmas de los clientes y quién puede abrirlas?', '¿Qué haría el despacho mañana si un cliente no puede facturar?', '¿Quién revisa los buzones tributarios y cada cuánto?'],
  leccion: [
    ['Por qué le importa a tu despacho', 'El despacho guarda las llaves fiscales de sus clientes: e.firmas, sellos digitales y contraseñas. Si una se filtra, alguien puede presentar trámites o emitir facturas a nombre del cliente. Y si el SAT restringe el sello de un cliente, ese cliente no puede facturar. Un incidente de seguridad se vuelve, muy rápido, un problema fiscal.'],
    ['e.firma, sello y Contraseña: qué abre cada uno', '<ul><li><b>e.firma:</b> sustituye a la firma autógrafa (art. 17-D del CFF). Con ella se presentan trámites y declaraciones y se pueden tramitar sellos digitales. Su uso es responsabilidad de su titular.</li><li><b>Certificado de sello digital (CSD):</b> sirve para emitir facturas.</li><li><b>Contraseña (antes CIEC):</b> da acceso al portal del SAT.</li></ul><p>Cambiar la contraseña de una e.firma no sirve si alguien ya copió el archivo con su contraseña anterior. Si se pierde o se filtra, el titular puede pedir que quede sin efectos (art. 17-H, fr. I del CFF) y tramitar una nueva.</p>'],
    ['Cuando el SAT restringe un sello', '<p>El artículo 17-H Bis del CFF permite al SAT restringir temporalmente un sello por causas como no presentar declaraciones, no ser localizado, que los ingresos declarados no coincidan con las facturas, recibir facturas de un proveedor del listado 69-B sin corregir, o tener mal los medios de contacto del buzón tributario.</p><ul><li>Hay <b>40 días hábiles</b> para presentar la aclaración.</li><li>Al día siguiente de presentarla se restablece el uso del sello mientras el SAT resuelve.</li><li>Si no se presenta en el plazo, o no se corrige, el certificado queda sin efectos.</li></ul><p>La notificación llega al buzón tributario. Revisarlo cada semana es lo que da tiempo de reaccionar.</p>'],
    ['Facturas apócrifas: el listado 69-B', '<p>El SAT publica a quienes presume que facturan operaciones inexistentes y, después, el listado definitivo. Si un proveedor de tu cliente aparece en el listado definitivo, tu cliente tiene <b>30 días</b> para demostrar que la operación sí ocurrió o corregir su situación. Si no lo hace, su sello puede restringirse.</p><p>Por eso conviene revisar a los proveedores nuevos y a los de mayor monto contra el listado del SAT antes de registrar sus facturas.</p>'],
    ['Lo que el despacho sí controla', '<ol><li>e.firmas y sellos en una carpeta cifrada, con acceso solo para quien hace los trámites.</li><li>Contraseñas en un gestor, separadas de los archivos.</li><li>Registro de quién usó cada e.firma y para qué.</li><li>Ese mismo día, revisar qué conocía quien deja el despacho.</li><li>Revisar los buzones tributarios cada semana.</li><li>Tener impreso el procedimiento del kit para cuando algo se pierda.</li></ol>']
  ],
  clave: ['La e.firma vale como la firma del cliente: se guarda cifrada, con acceso mínimo y separada de su contraseña.', 'Si se pierde o se filtra, se pide que quede sin efectos; cambiarle la contraseña no basta.', 'Ante una restricción del sello hay 40 días hábiles para aclarar; el buzón tributario se revisa cada semana.'],
  fuentes: ['cff', 'satPortal']
});

/* Simulador «Un día sin sello»: [texto, correcto, retroalimentación, días que el cliente no factura] */
const SELLO = {
  intro: 'Escenario ficticio para capacitación. Lunes, 9:00. Un cliente persona moral llama: su sistema rechaza las facturas y en el portal del SAT aparece que su certificado de sello digital está restringido. Hace un mes dejó el despacho un auxiliar que llevaba sus trámites. La e.firma del cliente estaba en una carpeta compartida y su contraseña, en una hoja de cálculo.',
  pasos: [
    { q: '1. ¿Qué hacen primero?', o: [
      ['Tramitar hoy mismo un sello nuevo con la e.firma del cliente, para que vuelva a facturar.', false, 'Mientras no se atienda la causa, un sello nuevo no resuelve el problema. Y si la e.firma se filtró, quien la tenga también puede tramitar sellos.', 3],
      ['Revisar el buzón tributario del cliente: qué causa señala el SAT y desde qué fecha corre el plazo.', true, 'Correcto. La notificación dice la causa y desde cuándo corren los 40 días hábiles para presentar la aclaración.', 0.5],
      ['Esperar dos o tres días: a veces es una falla del portal y se arregla sola.', false, 'Puede ser una falla, pero hay que confirmarlo hoy. Si es una restricción, el plazo ya está corriendo y el cliente no factura.', 3]] },
    { q: '2. El aviso dice que los ingresos declarados no coinciden con las facturas emitidas. En el portal aparecen facturas a nombre del cliente que nadie reconoce. ¿Qué hacen con la e.firma?', o: [
      ['Cambiar la contraseña de la e.firma y seguir usándola.', false, 'Si alguien copió el archivo con su contraseña anterior, cambiarla no lo detiene. La e.firma comprometida se deja sin efectos.', 4],
      ['Con el cliente, pedir que su e.firma quede sin efectos y tramitar una nueva; descargar y guardar las facturas que no reconoce.', true, 'Correcto. El titular puede pedir que su certificado quede sin efectos (art. 17-H, fr. I del CFF). Las facturas descargadas son evidencia para la aclaración.', 1],
      ['Cancelar de inmediato todas esas facturas desde el portal.', false, 'Cancelar sin analizar no atiende la causa y no siempre es posible sin la aceptación de quien las recibió. Primero se documentan y se analizan con el cliente.', 3]] },
    { q: '3. ¿Cómo averiguan por dónde salió la e.firma?', o: [
      ['Revisan quién tenía acceso al archivo y a la contraseña, y desde cuándo: la carpeta compartida, la hoja de contraseñas y el auxiliar que se fue.', true, 'Correcto. Saber cómo salió evita que vuelva a pasar con otros clientes.', 0],
      ['No hace falta: con la e.firma nueva el problema quedó resuelto.', false, 'La causa sigue ahí. Las demás e.firmas están en la misma carpeta y con la misma hoja de contraseñas.', 2],
      ['Suponen que fue el cliente quien la compartió y se lo dicen.', false, 'Culpar sin revisar daña la relación, y la e.firma estaba bajo resguardo del despacho.', 2]] },
    { q: '4. ¿Qué le dicen al cliente?', o: [
      ['Nada hasta tener todo resuelto, para no alarmarlo.', false, 'El cliente necesita saberlo para protegerse. La ley de datos personales pide informar de inmediato las vulneraciones que afecten de forma significativa a la persona.', 2],
      ['Le explican con hechos qué pasó, qué pudo verse afectado, qué están haciendo y qué le recomiendan, y lo dejan por escrito.', true, 'Correcto. Es lo que pide la LFPDPPP y lo que conserva la confianza. El kit trae una plantilla de aviso (anexo 6).', 0],
      ['Que fue un error del SAT y que ya lo están arreglando.', false, 'No es cierto y deja al cliente sin las recomendaciones para protegerse.', 2]] },
    { q: '5. ¿Cómo atienden la restricción del sello?', o: [
      ['Presentan la aclaración con sus pruebas dentro de los 40 días hábiles.', true, 'Correcto. Según el art. 17-H Bis del CFF, al día siguiente de presentarla se restablece el uso del sello mientras el SAT resuelve.', 1],
      ['Esperan a que pasen los 40 días: después el sello se reactiva solo.', false, 'Es al revés: si no se presenta la aclaración en el plazo, el SAT deja sin efectos el certificado.', 20],
      ['Mientras se resuelve, el cliente factura con el RFC de un familiar.', false, 'Eso sería simular operaciones: agrava el problema fiscal del cliente y del familiar.', 15]] },
    { q: '6. ¿Y las demás e.firmas que guarda el despacho?', o: [
      ['Solo cambian la de este cliente: las demás no han tenido problemas.', false, 'Estaban en la misma carpeta y con la misma hoja de contraseñas. Si salió una, pudieron salir todas.', 5],
      ['Revisan todas: dónde están, quién tiene acceso y quién se fue. Las mueven a un lugar cifrado y, si alguna pudo filtrarse, avisan a ese cliente.', true, 'Correcto. Es justo lo que revisa la sección «e.firmas y sellos» del diagnóstico.', 0],
      ['Borran todas las e.firmas del despacho y piden a cada cliente que haga sus trámites en persona.', false, 'Detiene el riesgo, pero también el servicio. Mejor resguardarlas bien y limitar el acceso.', 3]] }
  ]
};

RETOS.push(
  { m: 9, q: 'Un auxiliar dejó el despacho y conocía la contraseña de la e.firma de un cliente. ¿Qué basta hacer?', o: ['Cambiar la contraseña de la e.firma.', 'Revisar si pudo copiar el archivo; si pudo, el cliente pide que quede sin efectos y tramita una nueva.', 'Nada, si se fue en buenos términos.'], c: 1, e: 'Si copió el archivo con la contraseña anterior, cambiarla no lo detiene. La e.firma comprometida se deja sin efectos.' },
  { m: 9, q: 'El SAT restringió el sello de un cliente. ¿Cuánto tiempo hay para presentar la aclaración?', o: ['40 días hábiles.', '5 días naturales.', 'No hay plazo: el sello se reactiva solo.'], c: 0, e: 'El art. 17-H Bis del CFF da 40 días hábiles. Al día siguiente de presentar la aclaración se restablece su uso mientras se resuelve.' },
  { m: 9, q: 'Un proveedor nuevo de un cliente factura montos altos. ¿Qué revisas antes de registrar sus facturas?', o: ['Que el XML abra bien.', 'Que el proveedor no esté en el listado del artículo 69-B del SAT.', 'Que la factura tenga logotipo.'], c: 1, e: 'Si el proveedor aparece en el listado definitivo, el cliente tendría que acreditar la operación o corregir, y su sello puede restringirse.' }
);

/* ---- Qué te ayudamos a cumplir (estado según las respuestas del despacho) ---- */
const CUMPLE = [
  { t: 'Resguardo de e.firmas y sellos de clientes', n: ['CFF 17-D', 'CFF 17-H'], d: [11], ef: true, como: 'Sección «e.firmas y sellos», Módulo 9 y anexo 5 del kit' },
  { t: 'Atención a restricciones de sellos y al listado 69-B', n: ['CFF 17-H Bis', 'CFF 69-B', 'CFF 17-K'], d: [31, 32, 35], como: 'Módulo 9 y anexos 5 y 7 del kit' },
  { t: 'Conservación de la contabilidad y los XML por cinco años', n: ['CFF 28', 'CFF 30'], d: [21, 22, 33], como: 'Módulo 3, prueba de restauración y anexo 3 del kit' },
  { t: 'Medidas de seguridad para los datos personales', n: ['LFPDPPP 18'], d: [2, 6, 13, 14, 15, 19], como: 'Diagnóstico, capacitación y plan de 30 días' },
  { t: 'Aviso a los afectados si hay una vulneración', n: ['LFPDPPP 19'], d: [4], como: 'Plan de respuesta (anexo 1) y plantilla de aviso (anexo 6)' },
  { t: 'Confidencialidad y secreto profesional', n: ['LFPDPPP 20', 'IMCP'], d: [5, 10, 28], como: 'Módulos 6, 7 y 8 y política de uso de IA (anexo 4)' },
  { t: 'Aviso de privacidad', n: ['LFPDPPP 14-15'], d: [3], como: 'Acción en el plan de 30 días' }
];

/* ---- Ruta tecnológica: opciones genéricas por necesidad; los precios los confirma el partner ---- */
const RUTA_TEC = {
  RESP: { nec: 'Respaldo y recuperación', chica: 'Respaldo automático en la nube como servicio, con versiones y conservación de al menos cinco años.', grande: 'Equipo de respaldo en la oficina, con una copia adicional en la nube.', ej: 'Ejemplos del portafolio Dell, a validar con el partner: Dell APEX Backup Services (nube) o equipos PowerProtect o PowerVault (en la oficina).' },
  RENOV: { nec: 'Renovación de equipos', chica: 'Equipos comerciales con soporte y actualizaciones vigentes, empezando por los que guardan información de clientes.', ej: 'Modelos y configuración a definir con el partner.' },
  PROT: { nec: 'Protección de equipos', chica: 'Antivirus administrado desde una consola central.', ej: 'A definir con el partner.' },
  GEST: { nec: 'Gestión de equipos y accesos', chica: 'Administración central de equipos, cuentas, bóveda de e.firmas y acceso remoto.', ej: 'A definir con el partner.' },
  MDR: { nec: 'Detección y respuesta', chica: 'Servicio de detección gestionada: alguien vigila las alertas y responde.', ej: 'Ejemplo a validar con el partner: Dell Managed Detection and Response.' },
  IA: { nec: 'IA con los datos en el equipo', chica: 'Equipos con capacidad de IA local, para no subir datos de clientes a servicios externos.', ej: 'A definir con el partner.' }
};

/* ---- Propuesta de servicio (la arma el Equipo DELTA en la reunión de entrega) ---- */
const PAQUETES = [
  { k: 'cap', t: 'Capacitación continua', tipo: 'al mes', inc: ['Sesión trimestral en vivo con simulacro', 'Retos de repaso y cápsulas nuevas para todo el personal', 'Módulos nuevos cuando cambien los riesgos o las reglas del SAT', 'Reporte de avance por persona y del despacho'] },
  { k: 'acomp', t: 'Diagnóstico y acompañamiento', tipo: 'al mes', inc: ['Seguimiento del plan a los 30, 60 y 90 días', 'Rediagnóstico cada seis meses', 'Revisión del resguardo de e.firmas y sellos', 'Actualización del plan de respuesta y de los procedimientos del kit'] },
  { k: 'tec', t: 'Implementación tecnológica con el partner', tipo: 'pago único', inc: ['Ruta tecnológica del reporte, cotizada por el partner', 'Acompañamiento en la compra y la puesta en marcha', 'Prueba de restauración después de implementar'] }
];
const DECISIONES = ['Aprobado', 'Le interesa: pide cotización', 'Lo va a pensar', 'No por ahora'];
