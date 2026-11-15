/* ===== Contenido del producto · Equipo DELTA ===== */
const LEMA = 'Protege la información de tus clientes y mantén tu despacho operando cuando algo salga mal.';

const FUENTES = {
  cff: { t: 'Código Fiscal de la Federación, artículos 17-D y 17-J, Cámara de Diputados', u: 'https://www.diputados.gob.mx/LeyesBiblio/pdf/CFF.pdf' },
  satApocrifos: { t: 'SAT · Correos apócrifos: recomendaciones y ejemplos', u: 'https://www.gob.mx/sat/acciones-y-programas/lista-de-correos-apocrifos' },
  satPortal: { t: 'SAT · Portal oficial (e.firma, Contraseña y CSD)', u: 'https://www.sat.gob.mx' },
  lfpdppp: { t: 'Ley Federal de Protección de Datos Personales en Posesión de los Particulares (nueva ley, DOF 20-03-2025; artículos 16, 18, 19 y 20), Cámara de Diputados', u: 'https://www.diputados.gob.mx/LeyesBiblio/pdf/LFPDPPP.pdf' },
  nist: { t: 'NIST · Publicación de la versión 2.0 del Cybersecurity Framework, 26 de febrero de 2024', u: 'https://www.nist.gov/news-events/news/2024/02/nist-releases-version-20-landmark-cybersecurity-framework' }
};

const MODULOS = [
  {
    n: 1, titulo: '¿Cómo identificar un intento de fraude?', tema: 'Phishing y fraudes digitales', lugar: 'Antes de la sesión (individual)', min: 18,
    solo: 'Se hace por tu cuenta antes de la sesión en vivo. En la sesión se comentan los mensajes más difíciles.',
    guia: ['¿Qué mensaje les costó más trabajo y por qué?', '¿Qué mensaje parecido ha llegado al despacho este año, por correo o WhatsApp, y qué se hizo?', 'Si mañana un cliente avisa por correo que cambió de cuenta bancaria, ¿quién le llama y a qué número?', '¿A quién se le reporta un correo sospechoso y por qué medio?', 'Acuerdo de salida: ningún pago ni cambio de cuenta sin llamada de confirmación a un número ya registrado.'],
    ejercicio: 'Simulador de mensajes fraudulentos',
    leccion: [
      ['Por qué le importa a tu despacho', 'Tu despacho recibe todos los días correos de clientes, proveedores y autoridades. Un solo mensaje falso que alguien abra con prisa puede dar acceso a la información fiscal de varias empresas a la vez. El phishing (mensajes que se hacen pasar por alguien de confianza para robar datos o dinero) no se detiene con tecnología solamente: se detiene cuando cada persona sabe qué revisar antes de dar clic.'],
      ['Las formas más comunes', '<ul><li><b>Correos falsos del SAT:</b> avisos de "irregularidad", "devolución de saldo a favor" o "vencimiento de e.firma" que piden entrar a un enlace o descargar un archivo.</li><li><b>Facturas maliciosas:</b> un adjunto que parece PDF o XML y en realidad es un programa (termina en .exe, .zip, .js o similar).</li><li><b>Enlaces fraudulentos:</b> el texto dice una cosa y la dirección real es otra. Pasa el cursor sobre el enlace sin dar clic para ver a dónde lleva.</li><li><b>Solicitudes falsas de pago o cambio de cuenta bancaria:</b> alguien se hace pasar por un cliente, un proveedor o el dueño del despacho y pide transferir "hoy mismo".</li><li><b>Voz o video generados con IA:</b> una llamada o un audio que suena como una persona conocida y pide algo fuera de lo normal.</li><li><b>Mensajes por WhatsApp o SMS:</b> "cambié de número", "te mandé un código por error". Con ese código de 6 dígitos, otra persona puede registrar tu cuenta en su teléfono y escribirles a tus clientes en tu nombre.</li><li><b>Códigos QR</b> en correos o carteles que llevan a un sitio falso. Un QR es un enlace que no puedes leer antes de abrirlo: trátalo igual que un enlace.</li></ul>'],
      ['Qué revisar en 30 segundos', '<ol><li><b>Remitente:</b> ¿la dirección completa coincide con la de siempre? Una letra cambiada basta para engañar.</li><li><b>Prisa o amenaza:</b> "último aviso", "en 24 horas", "no me llames". La urgencia busca que no verifiques.</li><li><b>Enlace o adjunto:</b> ¿lo esperabas? ¿La dirección real coincide con el sitio oficial?</li><li><b>Lo que pide:</b> nadie legítimo pide contraseñas, archivos .key ni datos bancarios por correo.</li></ol>'],
      ['Cuando el remitente sí es el de siempre', 'A veces el mensaje llega desde la <b>dirección real</b> de un cliente o proveedor, porque alguien entró a su cuenta de correo. En ese caso el remitente no te avisa de nada. Por eso la revisión más importante es la última: <b>qué te están pidiendo</b>. Si es dinero, un cambio de cuenta, una contraseña o un código, se verifica por otro canal aunque el remitente sea conocido.'],
      ['Sobre el SAT en particular', 'El SAT indica en su página sobre correos apócrifos que sus únicos sitios oficiales son <b>sat.gob.mx</b> y <b>gob.mx/sat</b>, que <b>no envía enlaces por correo</b>, que <b>no pide claves ni contraseñas</b> y que no solicita descargar ni ejecutar archivos. En esa misma página publica ejemplos de correos falsos detectados y cómo reportarlos. Ante la duda, no uses el enlace del correo: entra por tu cuenta al portal o al Buzón Tributario.'],
      ['La regla de oro del despacho', 'Toda solicitud de <b>pago, transferencia o cambio de cuenta bancaria</b> se confirma por un segundo canal: una llamada a un número que ya tenías registrado, nunca al que viene en el mensaje. Y si algo se ve raro, se reporta al responsable del despacho. Reportar una falsa alarma nunca es un error.'],
      ['Si ya diste clic', 'Pasa en todos los despachos. Lo que cambia el resultado es la rapidez: <ol><li><b>Avisa de inmediato</b> al responsable. Nadie se mete en problemas por avisar.</li><li>Si abriste un archivo, <b>desconecta el equipo de la red</b> y no lo sigas usando.</li><li>Si escribiste una contraseña, <b>cámbiala desde otro equipo</b> y revisa que la verificación en dos pasos esté activa.</li><li>Si se hizo una transferencia, <b>llama al banco en ese momento</b>: las primeras horas son las que cuentan.</li></ol>']
    ],
    clave: ['Antes de dar clic: remitente, prisa, enlace o adjunto, y qué te piden.', 'Pagos y cambios de cuenta: siempre con llamada a un número que ya tenías.', 'Contraseñas y códigos de verificación no se comparten con nadie, por ningún medio.', 'Si dudas, reporta. Si ya diste clic, avisa en ese momento.'],
    fuentes: ['satApocrifos']
  },
  {
    n: 2, titulo: '¿Quién tiene acceso a la información de mis clientes?', tema: 'Accesos al SAT, contraseñas y verificación en dos pasos', lugar: 'Autoaprendizaje', min: 9,
    ejercicio: 'Caso práctico y mapa de accesos',
    leccion: [
      ['Por qué le importa a tu despacho', 'Tus clientes te confían las llaves de su vida fiscal. Si esas llaves se guardan en una carpeta que todos pueden abrir, cualquier descuido (o cualquier persona que ya no trabaja contigo) puede usarlas. Saber quién accede a qué es el primer paso para proteger a tus clientes y a tu reputación.'],
      ['Las llaves que resguardas', '<ul><li><b>e.firma:</b> equivale a la firma autógrafa del contribuyente. Se compone de un certificado (.cer), una clave privada (.key) y la contraseña de esa clave privada.</li><li><b>CSD (Certificado de Sello Digital):</b> sirve para emitir facturas (CFDI). También tiene archivo .key y contraseña.</li><li><b>Contraseña del SAT (antes CIEC):</b> junto con el RFC, da acceso al portal del SAT.</li></ul>El Código Fiscal de la Federación establece que la firma electrónica avanzada sustituye a la firma autógrafa y produce los mismos efectos (artículo 17-D), y que el titular debe actuar con diligencia para impedir su uso no autorizado y responde de las consecuencias si no lo hace (artículo 17-J). Por eso, si un cliente te la confía, conviene dejar por escrito para qué la usarás y quién la tendrá.'],
      ['Cuatro reglas prácticas', '<ol><li><b>Los archivos .key y sus contraseñas nunca se guardan juntos.</b> Tampoco se envían por WhatsApp ni por correo.</li><li><b>Cada persona usa su propio usuario.</b> Las cuentas compartidas impiden saber quién hizo qué.</li><li><b>Cada quien ve solo a los clientes que atiende.</b> Menos accesos, menos exposición.</li><li><b>Cuando alguien sale del despacho, sus accesos se retiran ese mismo día</b> y se cambian las contraseñas que conocía.</li></ol>'],
      ['Gestor de contraseñas y verificación en dos pasos', 'Un <b>gestor de contraseñas</b> es un programa que guarda todas tus claves en una "caja fuerte" cifrada; solo recuerdas una contraseña maestra. La <b>verificación en dos pasos (MFA)</b> pide, además de la contraseña, un código temporal en tu celular. Se activa en la <b>configuración de seguridad de cada cuenta</b>: correo, nube, banca y software contable, cuando el servicio la ofrece. Con ella, una contraseña robada ya no basta para entrar. Cuando el servicio lo permita, usa una <b>aplicación de códigos</b> en lugar de mensajes SMS, y guarda los <b>códigos de recuperación</b> en un lugar seguro: son la llave de repuesto si pierdes el celular. Empieza por el correo, porque desde el correo se recuperan las demás contraseñas.'],
      ['Tu tarea', 'Primero resuelve un caso: el último día de un colaborador. Después completa el mapa de accesos de tu despacho. No escribas contraseñas ni datos de clientes: solo quién accede a qué y dónde se guardan las llaves.']
    ],
    clave: ['El archivo .key y su contraseña nunca se guardan ni se envían juntos; la contraseña va en un gestor de contraseñas.', 'Un usuario por persona, y acceso solo a los clientes que atiende.', 'La verificación en dos pasos se activa en la configuración de seguridad de cada cuenta; empieza por el correo y la banca.', 'El día que alguien sale del despacho, se retiran sus accesos.'],
    fuentes: ['cff', 'satPortal']
  },
  {
    n: 3, titulo: '¿Qué pasa si mañana desaparecen todos mis archivos?', tema: 'Respaldos y recuperación de información', lugar: 'Autoaprendizaje', min: 8,
    ejercicio: '¿Respaldo o no?, información crítica y prueba de restauración',
    leccion: [
      ['Por qué le importa a tu despacho', 'Un disco que falla, un equipo robado, un archivo borrado por error o un ataque pueden dejarte sin las contabilidades de tus clientes en plena fecha de vencimiento. La pregunta útil no es "¿tengo respaldo?", sino "¿cuánto tardaría en volver a trabajar?".'],
      ['Qué información es crítica', 'Contabilidades y pólizas, XML de CFDI, nóminas, expedientes de clientes, declaraciones presentadas y sus acuses, y la configuración del software contable. Si perderla detiene tu operación o te impide cumplir con un cliente, es crítica.'],
      ['Sincronizar no es respaldar', 'Una carpeta sincronizada en la nube copia tus archivos, pero <b>también copia los cambios y los borrados</b>. Si un archivo se daña o se cifra en tu computadora, la copia dañada puede reemplazar a la buena. Un <b>respaldo</b> guarda versiones anteriores en un lugar separado, de modo que puedas regresar a como estaba el archivo ayer o la semana pasada.'],
      ['Cómo se ve un buen respaldo', '<ul><li><b>Automático:</b> no depende de que alguien se acuerde.</li><li><b>Con una copia fuera del equipo y otra fuera de la oficina</b> (o desconectada), para que un mismo incidente no alcance todas las copias.</li><li><b>Con versiones:</b> permite recuperar el archivo de una fecha anterior.</li><li><b>Probado:</b> un respaldo que nunca se ha restaurado es solo una esperanza.</li></ul>Una forma fácil de recordarlo es la regla <b>3-2-1</b>: tres copias de lo importante, en dos medios distintos, y una fuera de la oficina o desconectada.'],
      ['Las dos preguntas que importan', '<ul><li><b>¿Cuánto trabajo puedo perder?</b> Si el respaldo es semanal y el problema ocurre el viernes, se pierde la semana. La frecuencia del respaldo decide cuánto habría que rehacer.</li><li><b>¿Cuánto tardo en volver a trabajar?</b> Tener la copia no basta: hay que saber quién la restaura, en qué equipo y cuánto tarda. Eso solo se sabe probándolo.</li></ul>'],
      ['Tu tarea', 'Clasifica seis situaciones reales, marca la información crítica de tu despacho y, en la reunión de entrega, haremos juntos una <b>prueba de restauración</b>: recuperar un archivo de prueba desde el respaldo y anotar cuánto tardó.']
    ],
    clave: ['Sincronizar no es respaldar: la sincronización copia también los cambios y borrados; el respaldo guarda versiones anteriores.', 'Un buen respaldo es automático, con versiones y con una copia fuera de la oficina o desconectada (regla 3-2-1).', 'Un respaldo que nunca se ha restaurado no cuenta: se prueba recuperando un archivo cada cierto tiempo.'],
    fuentes: ['nist']
  },
  {
    n: 4, titulo: 'Mi despacho sufrió un ataque de ransomware: ¿qué hago?', tema: 'Ransomware y plan de respuesta', lugar: 'Sesión en vivo', min: 20,
    solo: 'En la sesión en vivo se decide en equipo. Si la haces por tu cuenta, responde como lo harías desde tu puesto; el plan del despacho lo captura quien designe el titular.',
    guia: ['¿Quién de nosotros se daría cuenta primero y a quién le avisaría?', '¿Qué clientes tienen vencimiento esta semana y qué necesitaríamos para cumplirles?', '¿Dónde está el respaldo y quién sabe restaurarlo?', '¿Quién habla con los clientes afectados y qué les dice?', 'Acuerdo de salida: responsable, suplente y soporte técnico quedan escritos en el plan.'],
    ejercicio: 'Simulacro con reloj y plan de respuesta de 1 página',
    leccion: [
      ['Por qué le importa a tu despacho', 'El ransomware es un programa malicioso que cifra (vuelve ilegibles) tus archivos y pide un pago para devolverlos. Para un despacho, lo que está en juego es la continuidad: cumplir con los vencimientos de tus clientes aunque un equipo quede fuera de servicio.'],
      ['Señales de infección', 'Archivos que no abren o cambian de extensión, una nota en pantalla que pide un pago, equipos muy lentos de repente, o carpetas compartidas que dejan de estar disponibles.'],
      ['Los primeros minutos', '<ol><li><b>Aísla:</b> desconecta el equipo de la red (cable y Wi-Fi) para que no alcance a otros equipos ni a las carpetas compartidas.</li><li><b>Avisa:</b> al responsable de incidentes del despacho y al soporte técnico. Reportar rápido reduce el daño.</li><li><b>No borres ni reinstales por tu cuenta:</b> puede perderse información útil para recuperar.</li><li><b>Anota:</b> qué pasó, a qué hora, qué equipo y qué se estaba haciendo.</li></ol>Los demás equipos se desconectan de la carpeta compartida y no abren archivos hasta que soporte técnico lo indique.'],
      ['Recuperar y comunicar', 'La operación se recupera desde un respaldo verificado, en un equipo limpio, empezando por los clientes con vencimientos más cercanos. Pagar un rescate no garantiza recuperar la información. Si datos personales de clientes pudieron verse afectados, la Ley Federal de Protección de Datos Personales en Posesión de los Particulares (artículo 19) obliga a informarles de forma inmediata cuando la vulneración afecte de manera significativa sus derechos patrimoniales o morales. Conviene revisarlo con asesoría legal. Un aviso claro y oportuno cuida la confianza.'],
      ['Después del incidente', 'Cuando el despacho ya opera, falta cerrar: cambiar las contraseñas que se usaban en el equipo afectado, entender por dónde entró el problema, actualizar el plan y repasar con el equipo qué funcionó. Buscar culpables enseña a ocultar el siguiente error; buscar causas evita que se repita.'],
      ['Lo que te llevas', 'El simulacro lleva un reloj: cada decisión suma horas de interrupción. Al terminar, tu despacho tendrá su <b>plan de respuesta de una página</b>: quién decide, a quién se llama y en qué orden se recupera.']
    ],
    clave: ['Primeros minutos: aísla, avisa, no borres, anota.', 'Se restaura en un equipo limpio y por orden de vencimientos.', 'El plan impreso y con teléfonos, a la mano: si los equipos no sirven, no podrás abrirlo.'],
    fuentes: ['lfpdppp', 'nist']
  },
  {
    n: 5, titulo: '¿Cuánto le costaría a mi despacho dejar de operar?', tema: 'Costo de una interrupción', lugar: 'Antes de la entrega (dueño o socio)', min: 8,
    ejercicio: 'Calculadora de costo de interrupción',
    leccion: [
      ['Por qué le importa a tu despacho', 'Decidir cuánto invertir en prevención es más fácil cuando sabes cuánto cuesta un día sin trabajar. Este módulo no usa cifras de terceros: usa <b>tus propios números</b>.'],
      ['Qué compone el costo', '<ul><li><b>Horas improductivas:</b> el personal sigue cobrando aunque no pueda trabajar.</li><li><b>Ingresos que no se generan</b> mientras el despacho está detenido.</li><li><b>Recuperación técnica:</b> soporte, reinstalación, restauración de respaldos.</li><li><b>Retrasos con clientes:</b> entregas fuera de tiempo y posibles recargos o actualizaciones por obligaciones presentadas tarde.</li><li><b>Pérdida de clientes:</b> difícil de medir, pero real. No se incluye en el cálculo; conviene comentarlo.</li></ul>'],
      ['Cómo leer el resultado', 'El resultado es una <b>estimación con supuestos capturados por el despacho</b>, no un pronóstico. Sirve para comparar: si un día detenido cuesta X, ¿cuánto vale un respaldo probado o un equipo de reemplazo que reduzca la interrupción de tres días a uno?'],
      ['El valor de cada día', 'La calculadora también compara dos escenarios: los días que hoy tardarías en volver a operar y los días que tardarías con las medidas del plan. La diferencia es lo que vale la prevención para tu despacho, con tus números.']
    ],
    clave: ['El costo de un día detenido suma horas improductivas, ingresos no generados, recuperación técnica y posibles recargos, con tus propios números.', 'Ese número sirve para decidir cuánto invertir: se compara con lo que cuesta un respaldo probado o un equipo de reemplazo.', 'Es una estimación para decidir, no un pronóstico.'],
    fuentes: []
  },
  {
    n: 6, titulo: '¿Puedo pegar la información de mis clientes en una IA?', tema: 'Riesgos de usar IA con información de clientes', lugar: 'Sesión en vivo', min: 12,
    solo: 'En la sesión en vivo se resuelve y se comenta en grupo. También puedes hacerlo por tu cuenta: cada caso explica su respuesta.',
    guia: ['¿Para qué usamos hoy herramientas de IA en el despacho?', '¿Qué dato hemos pegado alguna vez que hoy clasificaríamos distinto?', 'En la práctica, ¿cómo anonimizamos un estado de cuenta antes de usarlo?', '¿Quién revisa lo que produce la IA antes de que llegue al cliente?', 'Acuerdo de salida: si identifica a un cliente, se anonimiza; si es una credencial, nunca; todo resultado se verifica.'],
    ejercicio: 'Clasificador de casos y taller de anonimización',
    leccion: [
      ['Por qué le importa a tu despacho', 'Las herramientas de IA ahorran tiempo al redactar, resumir o explicar. El riesgo aparece cuando, por la prisa, se pega en ellas información que no es tuya: es de tus clientes y la resguardas bajo confidencialidad.'],
      ['Qué puede salir mal', '<ul><li><b>Lo que escribes puede almacenarse o usarse</b> por el proveedor, según sus términos y la configuración de la cuenta.</li><li><b>Exposición de datos:</b> RFC, CURP, XML, estados de cuenta y nóminas identifican a personas y empresas.</li><li><b>Respuestas inventadas o erróneas:</b> una IA puede dar un cálculo fiscal o citar una regla que no existe, con total seguridad.</li><li><b>Obligaciones legales:</b> la Ley Federal de Protección de Datos Personales en Posesión de los Particulares obliga a quien trata datos personales a protegerlos con medidas de seguridad administrativas, técnicas y físicas (artículo 18) y a guardar confidencialidad (artículo 20). Compartirlos con un tercero sin cuidado puede incumplirla.</li></ul>'],
      ['Buenas prácticas', '<ol><li><b>Anonimiza:</b> sustituye nombres, RFC, CURP, cuentas y folios por claves genéricas ("Cliente A") antes de pegar.</li><li><b>Usa cuentas con controles de privacidad</b> aprobadas por el despacho, no cuentas personales.</li><li><b>Revisa la configuración de datos:</b> si la herramienta guarda el historial o usa tus textos para mejorar el servicio, y cómo desactivarlo.</li><li><b>Verifica siempre</b> cálculos, fundamentos y fechas contra la fuente oficial.</li><li><b>Nunca escribas</b> contraseñas, la Contraseña del SAT (CIEC) ni datos de la e.firma.</li></ol>'],
      ['Cómo anonimizar en la práctica', '<ul><li><b>Se sustituyen por claves:</b> nombres y razones sociales ("Cliente A", "Empleada 1").</li><li><b>Se eliminan:</b> RFC, CURP, número de seguridad social, números de cuenta y CLABE, folios fiscales, domicilios, teléfonos y correos.</li><li><b>Pueden quedarse:</b> montos, conceptos, meses y la estructura del documento. Sin ellos la herramienta no puede ayudarte.</li><li><b>La tabla de equivalencias</b> (quién es "Cliente A") se queda en el despacho, nunca en la herramienta.</li></ul>'],
      ['Cómo evaluar una herramienta', 'Sin recomendar marcas, cuatro preguntas ayudan: ¿qué hace el proveedor con lo que escribo?, ¿puedo impedir que lo use o lo conserve?, ¿quién en el despacho administra la cuenta?, ¿puedo borrar lo que subí?']
    ],
    clave: ['Si identifica a un cliente o a una persona, se anonimiza antes de pegar.', 'Contraseñas y datos de la e.firma: nunca.', 'Todo resultado se verifica contra la fuente oficial antes de usarse.'],
    fuentes: ['lfpdppp']
  },
  {
    n: 7, titulo: 'Ética en el uso de la IA en el despacho', tema: 'Ética y política de uso de IA', lugar: 'Autoaprendizaje', min: 8,
    ejercicio: 'Cinco dilemas y política de uso de IA de 1 página',
    leccion: [
      ['Por qué le importa a tu despacho', 'Tu firma vale por tu juicio profesional. La IA puede ayudarte a trabajar más rápido, pero no responde ante tus clientes ni ante la autoridad: respondes tú.'],
      ['Seis principios', '<ol><li><b>Responsabilidad:</b> el contador es responsable de lo que firma, no la IA.</li><li><b>Transparencia:</b> los clientes tienen derecho a saber si se usa IA en su servicio y con qué cuidados.</li><li><b>Confidencialidad y secreto profesional:</b> aplican igual frente a una herramienta que frente a una persona.</li><li><b>Sesgos y errores:</b> la IA puede equivocarse o tratar de forma desigual casos parecidos; hay que revisar.</li><li><b>Juicio profesional:</b> la IA propone, la persona decide. No se delega el criterio.</li><li><b>Legalidad:</b> la IA no se usa para evadir obligaciones ni para fabricar soportes.</li></ol>'],
      ['Lo que te llevas', 'Después de cinco dilemas, la app arma la <b>política de uso de IA de una página</b> de tu despacho: qué se puede hacer, qué no, quién es responsable y cómo se informa a los clientes.']
    ],
    clave: ['La IA propone; tú decides y tú respondes por lo que firmas.', 'Con los clientes, transparencia: para qué se usa y con qué cuidados.', 'La IA no se usa para evadir obligaciones ni para fabricar soportes.'],
    fuentes: ['lfpdppp']
  }
];

/* ---- Quiz: dos formas equivalentes (A y B), 2 preguntas por módulo. Cada participante contesta una al inicio y la otra al final ---- */
const QUIZ_A = [
  { m: 1, q: 'Recibes un correo que dice ser del SAT, avisa de una "irregularidad" y pide descargar un documento desde un enlace. ¿Qué haces primero?',
    o: ['Descargo el documento en una computadora sin información de clientes, para revisarlo sin riesgo.', 'No uso el enlace y reviso por mi cuenta el portal oficial o el Buzón Tributario.', 'Respondo al remitente pidiendo el número de folio, y solo si lo envía abro el documento.', 'Lo reenvío al contador titular para que lo abra él, que tiene más experiencia con el SAT.'], c: 1,
    e: 'Lo seguro es no usar el enlace ni el adjunto y verificar entrando directamente al portal oficial. Abrirlo en otro equipo, responder o reenviarlo mantiene el riesgo o lo propaga.' },
  { m: 1, q: 'Un "cliente" escribe por correo que cambió de cuenta bancaria y pide que la próxima transferencia se haga a la cuenta nueva. ¿Qué corresponde?',
    o: ['Aplicar el cambio si el correo viene de su dirección habitual y trae su firma de siempre.', 'Responder a ese mismo correo pidiendo que confirme el cambio con una carta membretada.', 'Llamar al cliente a un número que ya tenías registrado antes de modificar cualquier dato.', 'Hacer primero una transferencia pequeña de prueba a la cuenta nueva y esperar su confirmación.'], c: 2,
    e: 'Los cambios de cuenta se confirman por un segundo canal conocido. Si el correo fue suplantado, quien conteste (o confirme la transferencia de prueba) será el defraudador.' },
  { m: 2, mfa: true, q: '¿Dónde se activa normalmente la verificación en dos pasos (MFA)?',
    o: ['En la configuración de seguridad de cada cuenta, cuando el servicio la ofrece.', 'En el antivirus de cada computadora, dentro de las opciones de protección de identidad.', 'Con el proveedor de internet, que la habilita para todas las cuentas de la oficina.', 'En el sistema operativo, una sola vez, y queda activa para todos los programas y sitios.'], c: 0,
    e: 'La verificación en dos pasos se activa cuenta por cuenta, en su sección de seguridad. Conviene empezar por el correo, porque con él se recuperan las demás contraseñas.' },
  { m: 2, q: 'Un cliente te confía su e.firma (archivos .cer y .key, y su contraseña). ¿Cuál es la forma más segura de resguardarla?',
    o: ['En la carpeta compartida del despacho, en una subcarpeta por cliente, para que el equipo la localice rápido.', 'En una memoria USB guardada bajo llave, con la contraseña anotada en la etiqueta para no olvidarla.', 'En una carpeta de acceso restringido, con la contraseña guardada aparte en un gestor.', 'En el correo del titular, como adjunto en un mensaje que solo él puede consultar.'], c: 2,
    e: 'La clave privada y su contraseña no deben estar juntas ni al alcance de todos. Acceso restringido y contraseña aparte reducen el riesgo de uso indebido.' },
  { m: 3, q: '¿Cuál es la diferencia entre sincronizar archivos en la nube y tener un respaldo?',
    o: ['La sincronización replica también cambios y borrados; el respaldo conserva versiones anteriores.', 'La sincronización guarda los archivos en internet y el respaldo en un disco, pero protegen de lo mismo.', 'El respaldo es la versión manual de la sincronización; con la nube activa, el respaldo ya no hace falta.', 'La sincronización protege contra fallas del equipo y el respaldo contra virus; se elige según el riesgo.'], c: 0,
    e: 'Si un archivo se daña o se cifra, la sincronización puede copiar ese daño. Un respaldo con versiones permite volver a una fecha anterior.' },
  { m: 3, q: '¿Cómo sabes que tu respaldo realmente sirve?',
    o: ['Porque el programa de respaldo muestra el aviso de "completado" todos los días, sin errores.', 'Porque el espacio ocupado en el disco de respaldo aumenta cada semana, como se espera.', 'Porque cada cierto tiempo se restaura un archivo de prueba y se comprueba que abre.', 'Porque el proveedor del servicio garantiza por contrato la disponibilidad de los datos.'], c: 2,
    e: 'La única prueba confiable es restaurar. Un aviso de "completado" o un contrato no demuestran que el archivo se pueda recuperar.' },
  { m: 4, q: 'En tu pantalla aparece un mensaje: tus archivos están cifrados y piden un pago. ¿Cuál es la primera acción?',
    o: ['Apagar el equipo de inmediato y volver a encenderlo para comprobar si el mensaje desaparece.', 'Desconectar el equipo de la red (cable y Wi-Fi) y avisar de inmediato al responsable.', 'Copiar los archivos importantes a una memoria USB antes de que el problema avance.', 'Ejecutar un análisis completo del antivirus y esperar el resultado antes de avisar.'], c: 1,
    e: 'Aislar el equipo evita que el problema alcance otros equipos y carpetas compartidas. Copiar a una USB puede llevarse el problema; esperar al antivirus retrasa el aviso.' },
  { m: 4, reporte: true, q: 'Dentro del despacho, ¿a quién se reporta primero un posible ataque o incidente?',
    o: ['Al responsable de incidentes que designó el despacho, para que active el plan.', 'Al compañero que más sabe de computadoras, para confirmar si de verdad es un ataque.', 'A los clientes cuya información podría estar afectada, antes que a nadie más.', 'Al proveedor de internet, para que revise si el problema viene de la conexión.'], c: 0,
    e: 'El plan de respuesta define a un responsable y a un suplente. Esa persona coordina el soporte técnico, las decisiones y los avisos.' },
  { m: 5, q: '¿Qué costos conviene considerar al estimar una interrupción del despacho?',
    o: ['El costo de reparar o reemplazar el equipo afectado, que es el gasto que sí se puede comprobar.', 'Los ingresos que se dejan de facturar esos días, que es lo que realmente pierde el despacho.', 'Horas improductivas, ingresos no generados, recuperación técnica y posibles recargos.', 'El pago al soporte técnico y, si aplica, el rescate solicitado por los atacantes.'], c: 2,
    e: 'El costo real suma varios componentes. La reparación suele ser la parte más pequeña.' },
  { m: 5, q: '¿Para qué sirve estimar cuánto cuestan 1, 2 y 3 días sin operar?',
    o: ['Para decidir con números propios cuánto conviene invertir en prevención y en recuperación.', 'Para calcular la cuota adicional que se cobrará a los clientes en caso de un incidente.', 'Para reportar la cifra a la autoridad fiscal como pérdida deducible del ejercicio.', 'Para determinar a qué empleado corresponde cubrir el daño si el incidente fue un descuido.'], c: 0,
    e: 'Es una herramienta de decisión del dueño: compara el costo de la interrupción con el costo de reducirla.' },
  { m: 6, q: 'Quieres que una herramienta de IA te ayude a redactar un correo de cobranza para un cliente. ¿Qué puedes escribirle?',
    o: ['El nombre del cliente y el monto, pero no su RFC, que es el dato realmente sensible.', 'El estado de cuenta completo, siempre que después se borre la conversación.', 'La situación sin datos que identifiquen al cliente; los datos reales se agregan después.', 'Todos los datos, si la herramienta es de pago, porque las versiones de pago no guardan nada.'], c: 2,
    e: 'La IA puede redactar con una descripción genérica. Nombre y monto también identifican al cliente, y pagar por una herramienta no garantiza qué hace con los datos: hay que revisar sus términos.' },
  { m: 6, q: '¿Qué información nunca debe escribirse en una herramienta de IA?',
    o: ['Preguntas sobre criterios fiscales, porque la herramienta podría dar una respuesta equivocada.', 'Contraseñas, la Contraseña del SAT (CIEC) y los datos o archivos de la e.firma.', 'Borradores de correos, porque el tono podría no ser el adecuado para el cliente.', 'Fórmulas de hoja de cálculo, porque podrían revelar cómo trabaja el despacho.'], c: 1,
    e: 'Las credenciales no se comparten con ninguna herramienta. Las otras opciones son usos válidos, siempre que se verifique el resultado.' },
  { m: 7, q: 'Usaste una IA para calcular un impuesto, lo presentaste sin revisar y resultó erróneo. ¿Quién es responsable?',
    o: ['El proveedor de la herramienta, porque el error se originó en su sistema.', 'El contador que presentó o firmó el cálculo, haya usado o no una herramienta.', 'El cliente, porque aprobó la declaración antes de que se presentara.', 'La responsabilidad se reparte entre el despacho y el proveedor de la herramienta.'], c: 1,
    e: 'La responsabilidad profesional no se delega. La IA propone; quien firma responde.' },
  { m: 7, q: 'Sobre el uso de IA en el servicio a tus clientes, ¿qué práctica es la más adecuada?',
    o: ['Informarles para qué se usa y con qué cuidados se protege su información.', 'Mencionarlo solo si el cliente pregunta, para no generar dudas innecesarias.', 'No mencionarlo, porque es una herramienta interna como cualquier otro programa.', 'Informarlo únicamente cuando la herramienta haya procesado datos personales suyos.'], c: 0,
    e: 'La transparencia cuida la confianza: el cliente sabe para qué se usa la IA y que su información se protege.' }
];
const QUIZ_B = [
  { m: 1, q: 'Llega un correo con el asunto "Factura pendiente" de un proveedor que no reconoces, con un adjunto llamado Factura.pdf.exe. ¿Qué haces?',
    o: ['No lo abro: la terminación .exe indica un programa; lo reporto al responsable.', 'Lo abro con cuidado para verificar si la factura corresponde a algún cliente del despacho.', 'Lo guardo en pendientes y lo abro cuando el antivirus termine de actualizarse.', 'Contesto al remitente para pedirle que reenvíe la factura en otro formato.'], c: 0,
    e: 'Un archivo que termina en .exe es un programa. Una factura real llega en PDF o XML, de un remitente identificable.' },
  { m: 1, q: 'Recibes un audio por mensajería con la voz del titular del despacho: pide una transferencia urgente y dice que no puede atender llamadas. ¿Qué corresponde?',
    o: ['Hacerla, porque la voz es claramente la suya y el mensaje llegó directo a tu número personal.', 'Confirmar en persona o llamándole a su número de siempre antes de mover dinero.', 'Contestar por el mismo chat pidiendo que confirme el monto y la cuenta.', 'Transferir la mitad ahora y el resto cuando él lo confirme.'], c: 1,
    e: 'Una voz se puede imitar con IA. Urgencia más "no me llames" es la señal: todo pago se confirma por un canal conocido.' },
  { m: 2, mfa: true, q: 'Quieres activar la verificación en dos pasos en el correo del despacho. ¿Dónde se hace?',
    o: ['En la sección de seguridad de la propia cuenta de correo.', 'En el programa antivirus, activando la protección de correo electrónico.', 'En el módem de la oficina, desde el panel de administración de la red.', 'En el navegador, guardando la contraseña para que se llene automáticamente.'], c: 0,
    e: 'Se activa en la configuración de seguridad de cada cuenta. El antivirus, el módem y el navegador no la controlan.' },
  { m: 2, q: 'Una auxiliar deja el despacho el viernes. ¿Qué se hace con sus accesos?',
    o: ['Se dejan activos un mes, por si hay que consultarle algún pendiente.', 'Se reasignan tal cual a quien la sustituya, para no perder su historial.', 'Se retiran ese mismo día y se cambian las contraseñas compartidas que conocía.', 'Se retiran al cierre del mes, junto con su finiquito, para hacerlo en un solo trámite.'], c: 2,
    e: 'Un acceso que sigue activo después de la salida es una puerta abierta a la información de los clientes.' },
  { m: 3, q: 'Un archivo de la carpeta sincronizada en la nube se dañó ayer en tu computadora. ¿Qué es lo más probable?',
    o: ['Que la copia en la nube esté intacta, porque la nube guarda siempre el original.', 'Que la copia en la nube también esté dañada, porque la sincronización replica los cambios.', 'Que la nube haya detectado el daño y bloqueado a tiempo la sincronización de ese archivo.', 'Que el archivo se repare solo al volver a sincronizar la carpeta.'], c: 1,
    e: 'La sincronización copia lo que pasa en tu equipo, incluido el daño. Por eso hace falta un respaldo con versiones anteriores.' },
  { m: 3, q: '¿Qué hace más confiable un respaldo?',
    o: ['Que esté en un disco siempre conectado a la computadora principal, para tenerlo al día en todo momento.', 'Que lo haga a mano una sola persona de confianza, cada fin de mes.', 'Que ocupe poco espacio, guardando solo la versión más reciente de cada archivo.', 'Que sea automático, guarde versiones anteriores y tenga una copia fuera de la oficina.'], c: 3,
    e: 'Automático, con versiones y con una copia que un mismo incidente no pueda alcanzar. Un disco siempre conectado puede cifrarse junto con el equipo.' },
  { m: 4, q: 'Varios archivos de la carpeta compartida cambiaron de extensión y ya no abren. ¿Qué haces primero?',
    o: ['Renombrar los archivos con su extensión original para intentar abrirlos.', 'Restaurar de inmediato el respaldo sobre la misma carpeta compartida.', 'Desconectar de la red el equipo afectado y avisar al responsable.', 'Esperar al final del día, por si el problema se resuelve solo.'], c: 2,
    e: 'Primero se aísla y se avisa. Restaurar antes de contener el problema puede dañar también lo restaurado.' },
  { m: 4, reporte: true, q: 'Abriste por error un adjunto sospechoso y no notas nada raro. ¿A quién se lo dices?',
    o: ['A nadie por ahora; si en unos días el equipo falla, entonces lo reportas.', 'A un compañero de confianza, para revisar juntos sin alarmar al titular.', 'Al remitente del correo, para preguntarle qué contenía el archivo.', 'Al responsable de incidentes del despacho, de inmediato, aunque no notes nada.'], c: 3,
    e: 'Muchos ataques tardan en mostrarse. El responsable de incidentes decide qué revisar; reportar a tiempo nunca es un error.' },
  { m: 5, q: 'Además de reparar el equipo, ¿qué pesa en el costo de dos días sin operar?',
    o: ['Sueldos de personal detenido, ingresos no generados y posibles recargos.', 'Solo el pago al técnico, porque lo demás se recupera trabajando horas extra.', 'Únicamente la renta y los servicios de la oficina durante esos dos días.', 'El costo de comprar equipos nuevos para todo el personal.'], c: 0,
    e: 'La interrupción cuesta sobre todo por el tiempo detenido y por lo que se deja de entregar.' },
  { m: 5, q: 'El dueño ya sabe cuánto le costaría un día sin operar. ¿Cuál es el mejor uso de ese número?',
    o: ['Incluirlo como cláusula de penalización en los contratos con los clientes.', 'Compararlo con el costo de un respaldo probado o un equipo de reemplazo.', 'Usarlo como presupuesto anual fijo de tecnología del despacho.', 'Guardarlo como referencia para negociar el rescate si ocurre un ataque.'], c: 1,
    e: 'El número sirve para decidir: cuánto vale reducir la interrupción frente a cuánto cuesta la medida.' },
  { m: 6, q: 'Quieres que una IA revise una nómina para detectar errores. ¿Qué haces antes de subirla?',
    o: ['Pedir a la herramienta que no guarde la información y subirla completa.', 'Subirla desde tu cuenta personal, para no mezclarla con la del despacho.', 'Sustituir los nombres por claves y quitar CURP y RFC de cada persona.', 'Quitar solo los sueldos, que son el dato confidencial de una nómina.'], c: 2,
    e: 'Se anonimiza antes de subir. Pedirle a la herramienta que no guarde nada no sustituye revisar su configuración y sus términos.' },
  { m: 6, q: 'Una IA te da el fundamento legal de una deducción. ¿Qué haces antes de usarlo?',
    o: ['Usarlo si la respuesta incluye número de artículo, porque eso indica que es confiable.', 'Hacer la misma pregunta otra vez y usarlo si responde lo mismo.', 'Usarlo, y verificarlo solo si el cliente o la autoridad lo cuestionan.', 'Verificarlo en la fuente oficial, porque la herramienta puede equivocarse.'], c: 3,
    e: 'Una IA puede inventar artículos con total seguridad y repetir el mismo error dos veces. Se verifica en la fuente oficial.' },
  { m: 7, q: 'Un colega propone usar IA para redactar la justificación de gastos que no ocurrieron. ¿Qué corresponde?',
    o: ['Aceptar si el cliente lo solicita por escrito y asume la responsabilidad.', 'Negarse: la IA no se usa para simular operaciones ni evadir obligaciones.', 'Aceptar si después un contador revisa que la redacción sea coherente.', 'Aceptar solo para montos pequeños, que no llamen la atención.'], c: 1,
    e: 'Es un límite ético y legal. Que lo pida el cliente o que el monto sea pequeño no lo cambia.' },
  { m: 7, q: 'Una IA propone un criterio fiscal muy favorable para un cliente. ¿Quién decide si se aplica?',
    o: ['La herramienta, si fue entrenada con legislación fiscal mexicana.', 'El cliente, porque es quien se beneficia y quien asume el riesgo.', 'El contador, después de verificarlo; la herramienta solo propone.', 'Se aplica si otra herramienta de IA llega a la misma conclusión.'], c: 2,
    e: 'El juicio profesional no se delega: la IA propone, el contador verifica y decide.' }
];
const FORMAS = { A: QUIZ_A, B: QUIZ_B };
const QUIZ = QUIZ_A;

/* ---- Simulador: 13 mensajes de capacitación, por correo y WhatsApp (dominios ficticios .example, sin números telefónicos) ---- */
const SENALES = [
  'El remitente (dirección o número) no coincide con el de siempre',
  'Mete prisa o amenaza con consecuencias',
  'El enlace lleva a un sitio distinto del que dice',
  'Trae un adjunto inesperado o con extensión peligrosa',
  'Pide contraseñas, códigos de verificación, e.firma o datos bancarios',
  'Pide un pago o un cambio de cuenta fuera del proceso normal',
  'Pide no llamar, o que quede en secreto'
];
const CORREOS = [
  { de: 'SAT Notificaciones', dir: 'avisos@sat-gob-mx.example', asunto: 'ÚLTIMO AVISO: irregularidad fiscal detectada', fraude: true, s: [0, 1, 2],
    cuerpo: 'Estimado contribuyente:\n\nSe detectó una irregularidad en su situación fiscal. Tiene 24 horas para aclararla o su RFC será suspendido.\n\nConsulte el detalle aquí:', link: ['Consultar mi situación fiscal', 'http://portal-sat.verificacion-rfc.example/acceso'],
    exp: 'Es fraude. El dominio del remitente imita al SAT pero no es un sitio oficial, y el SAT indica que no envía enlaces por correo. Además amenaza con un plazo de 24 horas y el enlace lleva a un sitio que no es el portal oficial. Lo correcto: no dar clic y revisar el Buzón Tributario entrando por tu cuenta.' },
  { de: 'Laura Méndez', dir: 'laura.mendez@ferreteria-elroble.example', asunto: 'XML de octubre', fraude: false, s: [],
    cuerpo: 'Hola:\n\nYa subí los XML de octubre a la carpeta compartida de siempre. Faltan dos facturas de proveedores que me llegan el viernes; te aviso cuando estén.\n\nSaludos,\nLaura', link: ['Carpeta de Ferretería El Roble', 'https://nube.despacho-ejemplo.example/clientes/elroble'],
    exp: 'Es legítimo. Viene de la dirección habitual del contacto, no tiene prisa ni pide datos, y el enlace apunta a la nube del propio despacho, que es el canal acordado.' },
  { de: 'Cobranza', dir: 'cobranza@servicios-globales-mx.example', asunto: 'Factura pendiente de pago 8841', fraude: true, s: [0, 1, 3],
    cuerpo: 'Buen día:\n\nAdjuntamos factura vencida. De no recibir su pago hoy se turnará a jurídico.\n\nAtte. Departamento de cobranza', adj: 'Factura_8841.pdf.exe',
    exp: 'Es fraude. El remitente es desconocido, presiona con una amenaza y el adjunto termina en .exe: es un programa, no un PDF. Un proveedor real se identifica y su factura no es un ejecutable.' },
  { canal: 'WhatsApp', de: 'C.P. Titular', dir: 'contacto guardado en tu teléfono', fraude: false, s: [],
    cuerpo: 'Voy retrasado, llego 10:30. Empiecen la junta de cierre sin mí y me pasan los pendientes por cliente cuando llegue.',
    exp: 'Es legítimo. Viene de un contacto guardado, por el medio de siempre, y no pide dinero, datos ni códigos. Lo que vuelve riesgoso un mensaje es lo que pide, no el medio por el que llega.' },
  { de: 'Lic. Ramírez', dir: 'direccion@comercializadora-n0rte.example', asunto: 'Cambio de cuenta bancaria (urgente)', fraude: true, s: [0, 1, 5, 6],
    cuerpo: 'Estimados:\n\nPor auditoría interna cambiamos de banco. A partir de hoy, todo pago o devolución debe hacerse a la cuenta nueva que les envío en este correo. Favor de aplicar el cambio hoy mismo y no llamar, estaré en reuniones.\n\nLic. Ramírez',
    exp: 'Es fraude. El dominio cambia una letra por un número (n0rte en lugar de norte), pide un cambio de cuenta con urgencia y pide que no se llame. Todo cambio de cuenta se confirma por teléfono a un número ya registrado.' },
  { de: 'Soporte ContaSistema', dir: 'soporte@contasistema.example', asunto: 'Mantenimiento programado: sábado de 22:00 a 23:00', fraude: false, s: [],
    cuerpo: 'Hola:\n\nEl sábado de 22:00 a 23:00 el sistema no estará disponible por mantenimiento. No necesitas hacer nada. Tus datos no se ven afectados.\n\nEquipo de soporte', link: ['Detalles del mantenimiento', 'https://ayuda.contasistema.example/mantenimiento'],
    exp: 'Es legítimo. Viene del dominio del proveedor (ficticio) que usa el despacho, es informativo, no pide iniciar sesión ni datos, y el enlace coincide con el mismo dominio.' },
  { canal: 'WhatsApp', de: 'Número desconocido', dir: 'no está en tus contactos', fraude: true, s: [0, 1, 4],
    cuerpo: 'Hola, una disculpa. Por error mandé a tu número un código de 6 dígitos por SMS. ¿Me lo reenvías porfa? Me urge, es para recuperar mi cuenta.',
    exp: 'Es fraude. Ese código es el de verificación de tu propia cuenta: quien lo reciba puede registrar tu WhatsApp en otro teléfono y escribirles a tus clientes haciéndose pasar por ti. Un código de verificación no se comparte con nadie. Conviene activar la verificación en dos pasos dentro de la aplicación.' },
  { de: 'C.P. Titular', dir: 'cp.titular.despacho@correo-gratis.example', asunto: '¿Estás en la oficina?', fraude: true, s: [0, 1, 5, 6],
    cuerpo: 'Necesito que hagas una transferencia a un proveedor antes de las 2. Estoy en una reunión y no puedo contestar llamadas. Contéstame por aquí y te paso los datos. Es confidencial.',
    exp: 'Es fraude. Usa el nombre del titular pero desde un correo gratuito que no es el del despacho, pide un pago urgente, secreto y sin llamada. Es la estafa conocida como "fraude del director". Se verifica en persona o por teléfono.' },
  { de: 'Avisos Banco Ejemplo', dir: 'avisos@bancoejemplo.example', asunto: 'Tu estado de cuenta de octubre está disponible', fraude: false, s: [],
    cuerpo: 'Tu estado de cuenta ya está disponible en la banca en línea.\n\nPor tu seguridad, este mensaje no contiene enlaces. Ingresa como siempre desde la aplicación o escribiendo la dirección del banco en tu navegador.',
    exp: 'Es legítimo. Es informativo, no trae enlaces ni adjuntos y no pide datos. Indica entrar por el canal habitual, que es justo la práctica segura.' },
  { de: 'e.firma SAT', dir: 'renovacion@sat.tramites-en-linea.example', asunto: 'Su e.firma vence hoy: renueve en línea', fraude: true, s: [0, 1, 2, 4],
    cuerpo: 'Su e.firma vence hoy. Para evitar la cancelación de sus sellos, renuévela ahora cargando su archivo .key y su contraseña en el siguiente formulario:', link: ['Renovar e.firma', 'http://renovacion-efirma.example/cargar-key'],
    exp: 'Es fraude. El dominio no es un sitio oficial del SAT, que además indica que no pide contraseñas por correo. Presiona con un vencimiento "hoy", el enlace lleva a un sitio ajeno y pide el archivo .key con su contraseña. Con eso, un tercero podría firmar a nombre del contribuyente.' },
  { de: 'Laura Méndez', dir: 'laura.mendez@ferreteria-elroble.example', asunto: 'Urgente: constancia de situación fiscal para el banco', fraude: false, s: [],
    cuerpo: 'Hola:\n\nPerdón por la prisa. El banco me pide hoy antes de las 3 la constancia de situación fiscal de la ferretería para el trámite del crédito. ¿Me la pueden subir a la carpeta compartida de siempre? Si hay algún problema, me marcan al número de la ferretería.\n\nGracias,\nLaura',
    exp: 'Es legítimo. Tiene prisa, pero la prisa sola no vuelve fraudulento un mensaje: viene de la dirección habitual, pide un documento que el despacho entrega normalmente, por el canal acordado, no pide contraseñas ni dinero y ofrece que le llamen al número conocido. Ante la duda, esa llamada lo resuelve.' },
  { de: 'Mariana Ortiz', dir: 'mariana@consultorio-ortiz.example', asunto: 'RE: Devolución del saldo a favor', fraude: true, s: [5, 6],
    cuerpo: 'Hola:\n\nSobre la devolución que comentamos: esta semana cambiamos de banco. Les paso en este correo los datos de la cuenta nueva para que la registren en la solicitud.\n\nEstoy en consulta todo el día, no me llamen; confírmenme por este medio.\n\nMariana',
    exp: 'Es fraude, y es el más difícil: la dirección es la real de la clienta, porque alguien entró a su cuenta de correo y contestó un hilo que ya existía. La señal no está en el remitente, sino en lo que pide: un cambio de cuenta bancaria evitando la llamada. La regla no tiene excepciones: se confirma por teléfono, a un número que ya tenías.' },
  { de: 'Jorge Salas', dir: 'jsalas@taller-salas.example', asunto: 'Estado de cuenta que me pediste', fraude: false, s: [],
    cuerpo: 'Hola:\n\nTe mando el estado de cuenta de octubre que me pediste ayer por teléfono para la conciliación. Cualquier cosa me marcas al taller.\n\nJorge', adj: 'Estado_de_cuenta_octubre.pdf',
    exp: 'Es legítimo. Viene de la dirección habitual del cliente, el adjunto es un PDF que el despacho había solicitado y hace referencia a una llamada real. Un adjunto esperado, de un remitente verificado, es normal.' }
];

/* ---- Práctica: leer la dirección de un enlace (los dominios falsos son ficticios, .example) ---- */
const URL_OPC = ['Sitio oficial del SAT', 'Sitio ajeno que imita al SAT'];
const URLS = [
  { u: 'https://www.sat.gob.mx/personas/declaraciones', c: 0, e: 'El dominio es lo que queda justo antes de la primera diagonal sola: sat.gob.mx. Lo que sigue después de la diagonal es una sección del mismo sitio.' },
  { u: 'https://sat.gob.mx.aclaraciones-rfc.example/acceso', c: 1, e: 'El dominio real es aclaraciones-rfc.example. El texto "sat.gob.mx" va al principio como adorno. Se lee de derecha a izquierda desde la primera diagonal.' },
  { u: 'https://www.gob.mx/sat', c: 0, e: 'El dominio es gob.mx, el portal del gobierno federal; "/sat" es la sección del SAT. Es uno de los dos sitios oficiales que indica el SAT.' },
  { u: 'https://aclaraciones.example/sat.gob.mx/buzon', c: 1, e: 'El dominio es aclaraciones.example. Lo que aparece después de la diagonal es solo el nombre de una carpeta, y cualquiera puede llamarla "sat.gob.mx".' },
  { u: 'https://sat.gob.mx@verifica-datos.example/', c: 1, e: 'Todo lo que va antes de la arroba se ignora al navegar. El dominio real es verifica-datos.example.' }
];

/* ---- Caso práctico: el último día de un colaborador ---- */
const SALIDA = {
  intro: 'Hoy es el último día de un auxiliar que atendía a ocho clientes. Tenía usuario en el correo, la nube y el software contable, conocía la Contraseña del SAT de varios clientes y estaba en el grupo de WhatsApp del despacho. Marca lo que debe quedar hecho <b>hoy</b>.',
  items: [
    ['Desactivar su usuario del correo, la nube y el software contable.', true, 'Un usuario activo sin dueño es una puerta abierta.'],
    ['Cambiar las contraseñas compartidas que conocía, empezando por las de portales de clientes.', true, 'Mientras no se cambien, sigue teniendo las llaves.'],
    ['Dejar activo su usuario un mes, por si hay que consultarle algo.', false, 'Si hace falta revisar su correo, se redirige a alguien del despacho. El usuario se desactiva hoy.'],
    ['Recoger equipo, llaves y memorias, y confirmar que no se lleva archivos de clientes en dispositivos personales.', true, 'La información de los clientes se queda en el despacho.'],
    ['Reenviar su correo del despacho a su correo personal para no perder mensajes.', false, 'Los mensajes de clientes saldrían del control del despacho. Se redirigen a una persona interna.'],
    ['Quitarlo de los grupos de WhatsApp y de las carpetas compartidas.', true, 'Por ahí sigue circulando información de clientes.'],
    ['Esperar al cierre de mes para cambiar contraseñas y no interrumpir el trabajo.', false, 'El riesgo es mayor justo en los días siguientes a la salida. Se cambia hoy.'],
    ['Revisar si tenía archivos de e.firma o CSD de clientes y, si hay duda, avisar al cliente para que valore renovarlos.', true, 'Con el archivo .key y su contraseña se puede firmar o facturar a nombre del cliente.']
  ]
};

/* ---- ¿Respaldo o no? ---- */
const RESP_OPC = ['Respaldo sólido', 'Respaldo incompleto', 'No es respaldo'];
const RESP_CASOS = [
  { t: 'Los archivos de clientes están en una carpeta sincronizada con la nube, sin historial de versiones.', c: 2, e: 'Sincronizar copia también los borrados y los archivos dañados. Sin versiones anteriores no hay a dónde regresar.' },
  { t: 'Cada viernes alguien copia la carpeta de clientes a un disco externo, que se queda conectado a la misma computadora.', c: 1, e: 'Depende de que alguien se acuerde, se puede perder hasta una semana de trabajo, y un disco conectado corre la misma suerte que el equipo ante un robo o un ransomware.' },
  { t: 'Copia automática diaria a un servicio externo, que conserva versiones de 30 días. Cada trimestre se restaura un archivo de prueba.', c: 0, e: 'Automático, fuera de la oficina, con versiones y probado. Cumple las cuatro condiciones.' },
  { t: 'El proveedor del software contable en la nube "se encarga de todo". El despacho nunca ha preguntado qué respalda ni ha pedido una restauración.', c: 1, e: 'Puede que el respaldo exista, pero no está verificado. Pregunta qué cubre, cuántos días conserva y cómo se pide una restauración. Lo que está fuera de ese sistema sigue sin copia.' },
  { t: 'Los XML y los acuses se reenvían al correo personal del titular "por si acaso".', c: 2, e: 'Es una copia desordenada, imposible de restaurar completa, y saca información de clientes a una cuenta que el despacho no controla.' },
  { t: 'Copia automática semanal a dos discos que se alternan: uno siempre está desconectado y fuera de la oficina. El mes pasado se probó restaurar.', c: 0, e: 'Automático, con una copia desconectada y fuera de la oficina, y probado. Si una semana de trabajo es mucho perder, se aumenta la frecuencia.' }
];

/* ---- Simulación de ransomware ---- */
// Cada opción: [texto, ¿es la adecuada?, retroalimentación, horas de interrupción que suma]. Las horas son ilustrativas, para el ejercicio.
const RANSOM = {
  intro: 'Es día 16 por la mañana, víspera de vencimiento de declaraciones mensuales. Un auxiliar abre un archivo adjunto que parecía una factura. Minutos después, su computadora muestra un mensaje: los archivos están cifrados y se pide un pago. La carpeta compartida con la contabilidad de varios clientes deja de abrir.',
  pasos: [
    { q: '1. ¿Qué hace primero quien está frente a esa computadora?', o: [
      ['Apagarla y volver a encenderla, que es lo que suele resolver cuando un equipo se traba.', false, 'Reiniciar no detiene el problema y puede complicar la recuperación. Mientras siga conectada, puede alcanzar otros equipos.', 3],
      ['Desconectarla de la red (cable y Wi-Fi) y avisar al responsable del despacho.', true, 'Correcto. Aislar el equipo evita que el cifrado llegue a más carpetas, y avisar activa el plan.', 0.5],
      ['Pasarse a otra computadora y seguir con el cierre.', false, 'El equipo infectado sigue conectado a la carpeta compartida y el problema puede extenderse. Primero se aísla y se avisa.', 6]] },
    { q: '2. Mientras tanto, ¿qué hacen los demás equipos de la oficina?', o: [
      ['Siguen trabajando en la carpeta compartida mientras funcione, para adelantar lo más posible antes de que falle.', false, 'El cifrado viaja por la carpeta compartida. Cada equipo conectado es un equipo más que habrá que revisar y recuperar.', 5],
      ['Se desconectan de la carpeta compartida y no abren archivos hasta que soporte técnico lo indique.', true, 'Correcto. Se detiene la propagación sin destruir nada. Lo que no depende de la red puede seguir.', 1],
      ['Apagan todos los equipos, cierran la oficina y esperan en casa a que alguien les avise que ya pueden volver.', false, 'Detiene la propagación, pero también el trabajo que sí podía continuar, y nadie queda disponible para ayudar a soporte. Mejor desconectar y esperar indicaciones.', 3]] },
    { q: '3. ¿A quién llaman?', o: [
      ['Al contacto que aparece en el mensaje de rescate, para saber cuánto piden y cuánto tiempo dan.', false, 'Ese contacto es del atacante. Negociar por cuenta propia no ayuda y puede empeorar la situación.', 4],
      ['A nadie todavía: primero terminan el cierre con lo que funcione.', false, 'Cada hora sin actuar aumenta el daño y reduce las opciones de recuperación.', 8],
      ['Al responsable interno y al soporte técnico que indica el plan de respuesta.', true, 'Correcto. El responsable coordina y el soporte técnico evalúa el alcance. Por eso conviene tener los contactos a la mano, en papel.', 1]] },
    { q: '4. El mensaje pide un pago. ¿Qué deciden?', o: [
      ['Pagar de inmediato: con los vencimientos de mañana, cada hora detenida sale más cara que el rescate.', false, 'Pagar no garantiza recuperar la información y no elimina la causa del problema. Mientras se negocia, el reloj sigue corriendo.', 6],
      ['Antes de decidir, revisar con soporte técnico qué respaldos hay y qué se puede recuperar.', true, 'Correcto. La decisión se toma con información: qué se perdió, qué respaldos hay y cuánto tardaría restaurar.', 1],
      ['Borrar todo y reinstalar desde cero cuanto antes, para volver a trabajar.', false, 'Borrar sin evaluar puede destruir información recuperable y la evidencia de lo ocurrido.', 10]] },
    { q: '5. ¿Cómo recuperan la información?', o: [
      ['Conectando el disco de respaldo a la computadora afectada.', false, 'El respaldo podría cifrarse también, y entonces ya no habría copia. Se restaura en un equipo limpio, verificado por soporte.', 12],
      ['Restaurando el respaldo verificado en un equipo limpio.', true, 'Correcto. Equipo limpio y respaldo verificado. El tiempo que tarda depende de haberlo probado antes.', 6],
      ['Pidiendo a cada cliente que reenvíe toda su información.', false, 'Puede ser necesario para lo que no tenga respaldo, pero como plan principal es lento y afecta la confianza.', 16]] },
    { q: '6. Mañana vencen declaraciones de varios clientes y solo hay dos equipos limpios. ¿Cómo se organizan?', o: [
      ['Cada quien retoma lo que estaba haciendo y se turnan los dos equipos por horas, para que todos avancen.', false, 'Sin prioridades, lo urgente compite con lo que puede esperar y los equipos disponibles se usan en lo que no vence mañana.', 4],
      ['Ordenan a los clientes por vencimiento y los dos equipos atienden solo lo que vence primero.', true, 'Correcto. La prioridad la dan los vencimientos. Por eso el plan de respuesta incluye qué se recupera primero.', 0],
      ['Avanzan un poco con cada cliente, para poder decirles a todos que su declaración ya está en proceso.', false, 'Avanzar parejo con todos suele terminar en llegar tarde con todos. Primero lo que vence primero.', 5]] },
    { q: '7. ¿Qué les dicen a los clientes afectados?', o: [
      ['Nada por ahora, para no preocuparlos; si se resuelve a tiempo, no hace falta que se enteren.', false, 'Si su información pudo verse afectada, tienen derecho a saberlo y a tomar precauciones. Ocultarlo daña más la confianza.', 0],
      ['Un aviso con hechos: qué pasó, qué información pudo afectarse, qué se está haciendo y qué les recomendamos.', true, 'Correcto. Hechos, sin dramatizar. Si hay datos personales involucrados, conviene revisar con asesoría legal las obligaciones de aviso de la LFPDPPP.', 0],
      ['Un mensaje general explicando que un empleado abrió un archivo indebido y que ya se tomaron medidas con él.', false, 'Señalar culpables no ayuda al cliente ni al equipo. El aviso se centra en hechos y acciones.', 0]] },
    { q: '8. Una semana después, el despacho ya opera. ¿Qué sigue?', o: [
      ['Ponerse al corriente con el trabajo atrasado; el incidente ya pasó y revisarlo solo quita más tiempo.', false, 'Sin corregir la causa, puede repetirse por la misma vía.', 0],
      ['Cambiar las contraseñas del equipo afectado, revisar por dónde entró y actualizar el plan con el equipo.', true, 'Correcto. Cerrar el incidente es lo que evita el siguiente.', 0],
      ['Sancionar a quien abrió el archivo y comunicarlo al equipo, para que todos tengan más cuidado en adelante.', false, 'Castigar el error enseña a ocultar el siguiente. Lo que protege al despacho es que la gente avise rápido.', 0]] }
  ]
};

/* ---- Clasificador de casos de IA ---- */
const IA_OPC = ['Permitido', 'Solo con datos anonimizados', 'Prohibido'];
const IA_CASOS = [
  { t: 'Pedirle a una herramienta de IA que explique en palabras sencillas qué es la depreciación, para un cliente que lo preguntó.', c: 0, e: 'Es una consulta general, sin datos de nadie. Solo recuerda verificar la explicación antes de enviarla.' },
  { t: 'Pegar el estado de cuenta bancario de un cliente para que la IA te ayude con la conciliación.', c: 1, e: 'El estado de cuenta identifica al cliente y sus movimientos. Solo se puede usar quitando nombre, número de cuenta y RFC, y en una cuenta aprobada por el despacho.' },
  { t: 'Escribir la Contraseña del SAT (CIEC) de un cliente para que la IA "entre al portal y descargue las facturas".', c: 2, e: 'Las credenciales nunca se escriben en una herramienta de IA. No existe versión anonimizada de una contraseña.' },
  { t: 'Pedir un borrador de correo para recordar a los clientes la entrega de documentos del mes, sin mencionar a ninguno.', c: 0, e: 'No incluye datos de clientes. Tú agregas después los nombres al enviar.' },
  { t: 'Subir la nómina de una empresa, con nombres, CURP y sueldos, para que la IA detecte errores.', c: 1, e: 'Son datos personales de terceros. Solo con datos anonimizados: sustituye nombres por claves y elimina CURP y número de seguridad social antes de subirla.' },
  { t: 'Pedir una fórmula de hoja de cálculo describiendo las columnas ("fecha, concepto, importe"), sin datos reales.', c: 0, e: 'Describe la estructura, no la información. Es un buen uso.' },
  { t: 'Pegar la contraseña de la e.firma de un cliente, o subir su archivo .key, para "comprobar que funciona".', c: 2, e: 'Los datos de la e.firma equivalen a la firma del contribuyente. Nunca se comparten con una herramienta de IA.' },
  { t: 'Pegar el texto de una reforma fiscal ya publicada en el Diario Oficial de la Federación y pedir un resumen para el equipo.', c: 0, e: 'Es un texto público, sin datos de clientes. El resumen se coteja contra la publicación antes de usarlo.' },
  { t: 'Pedirle a la IA el cálculo de un impuesto y enviar el resultado al cliente tal cual, sin revisarlo.', c: 2, e: 'Aquí el problema no son los datos, es saltarse la verificación. La IA puede equivocarse o inventar; el contador responde por lo que entrega.' }
];

/* ---- Taller de anonimización. Todos los datos son inventados para el ejercicio. s: debe sustituirse · r: con qué · p: por qué ---- */
const ANON = [
  'Ayúdame a conciliar. Cliente: ', { t: 'Distribuidora La Esperanza, S.A. de C.V.', s: 1, r: 'Cliente A', p: 'La razón social identifica al cliente.' },
  ', RFC ', { t: 'DLE990101XX0', s: 1, r: '[RFC eliminado]', p: 'El RFC identifica al contribuyente.' },
  ', cuenta con terminación ', { t: '4821', s: 1, r: '[cuenta eliminada]', p: 'Los datos de la cuenta bancaria no hacen falta para conciliar.' },
  '. Movimientos de ', { t: 'octubre', s: 0, p: 'El mes no identifica a nadie.' },
  ': depósito de ', { t: '$48,300.00', s: 0, p: 'Los montos pueden quedarse: sin ellos la herramienta no puede ayudar.' },
  ' de ', { t: 'Jorge Salas Pérez', s: 1, r: 'Persona 1', p: 'Es el nombre de un tercero.' },
  '; pago de nómina a ', { t: 'María López Hernández', s: 1, r: 'Empleada 1', p: 'Es el nombre de una persona.' },
  ', CURP ', { t: 'LOHM900101MDFXXX00', s: 1, r: '[CURP eliminada]', p: 'La CURP es un dato personal que identifica a la persona.' },
  '; transferencia con folio fiscal ', { t: '3F2A-0000-EJEMPLO', s: 1, r: '[folio eliminado]', p: 'Con el folio fiscal se puede consultar el comprobante y a sus partes.' },
  '. ¿Por qué el saldo final no coincide con ', { t: '$112,450.75', s: 0, p: 'El saldo es un monto; puede quedarse.' }, '?'
];

/* ---- Dilemas éticos ---- */
const DILEMAS = [
  { t: 'Una herramienta de IA te propone un criterio que reduce de forma importante el impuesto de un cliente. No logras encontrar el fundamento que cita. El cliente está encantado y presiona para aplicarlo.',
    o: [['Aplicarlo: la herramienta ha procesado mucha más legislación de la que una persona alcanza a leer, así que debe tener sustento.', false, 'La IA puede citar fundamentos que no existen. Si lo firmas, la responsabilidad es tuya.'],
        ['Verificar el fundamento en la fuente oficial; si no se sostiene, no aplicarlo y explicarle al cliente por qué.', true, 'Correcto. El juicio profesional no se delega: la IA propone, tú verificas y decides.'],
        ['Aplicarlo, dejando por escrito que fue decisión del cliente y que él firma de conformidad.', false, 'Trasladar el riesgo al cliente sin informarle con claridad no es ético y no elimina tu responsabilidad profesional.']] },
  { t: 'Un cliente te pregunta directamente: "¿Ustedes meten mi información en una IA?". El despacho sí usa herramientas de IA para redactar y resumir, con datos anonimizados.',
    o: [['Decir que no: como los datos van anonimizados, en sentido estricto su información no se está ingresando.', false, 'Es una media verdad: el cliente preguntó si se usa IA con su información, y la respuesta honesta es que sí, con cuidados. Si después se entera, se rompe la confianza.'],
        ['Explicar para qué se usa, que no se ingresan sus datos identificables y quién revisa los resultados.', true, 'Correcto. La transparencia cuida la relación y demuestra control sobre su información.'],
        ['Contestar que el despacho usa las mismas herramientas que cualquier oficina y pasar al siguiente tema.', false, 'Evadir deja la duda abierta. Una respuesta clara y breve resuelve la inquietud.']] },
  { t: 'Un colega sugiere usar IA para "armar" la justificación de gastos que en realidad no ocurrieron, porque "queda muy bien redactada".',
    o: [['Aceptar: el texto lo redacta la herramienta, no el despacho.', false, 'Redactar la justificación de gastos que no ocurrieron es simular operaciones, lo haga una persona o una herramienta. Es contrario a la ley y a la ética profesional.'],
        ['Negarse y recordar que la IA no se usa para evadir obligaciones ni fabricar soportes.', true, 'Correcto. Este es un límite que la política del despacho debe dejar por escrito.'],
        ['Aceptar solo si el cliente lo solicita por escrito y asume la responsabilidad de lo que se presente.', false, 'Que el cliente lo pida no lo vuelve aceptable. La responsabilidad profesional se mantiene.']] },
  { t: 'Un auxiliar entrega unos papeles de trabajo impecables en la mitad del tiempo. Al revisarlos encuentras un cálculo equivocado y te enteras de que los hizo con una IA, sin decirlo.',
    o: [['Prohibir el uso de IA en el despacho a partir de hoy, hasta estar seguros de que no vuelve a pasar.', false, 'El problema no fue usar la herramienta, sino no decirlo y no revisar. Prohibirla suele llevar a que se use a escondidas.'],
        ['Corregir el error y acordar la regla: se avisa cuándo se usó IA y quien entrega revisa antes.', true, 'Correcto. Transparencia hacia adentro y revisión siempre. Eso es lo que la política del despacho deja por escrito.'],
        ['Corregir el cálculo sin comentarlo: el trabajo salió en la mitad del tiempo y eso también cuenta.', false, 'El siguiente error puede llegar a una declaración firmada. La rapidez sin revisión traslada el riesgo al despacho.']] },
  { t: 'Una herramienta de IA gratuita ofrece funciones muy útiles para el cierre. En sus condiciones dice que puede usar lo que subas para mejorar el servicio. Un colega propone usarla con cuentas personales "solo este mes".',
    o: [['Usarla este mes, que es cuando más se necesita, y decidir con calma después del cierre si se conserva.', false, 'Lo que se sube no se puede retirar después. Un mes basta para dejar fuera del despacho la información de toda la cartera.'],
        ['Usarla solo con información que no identifique a clientes, o elegir una que administre el despacho.', true, 'Correcto. La decisión depende de qué hace el proveedor con los datos y de quién administra la cuenta, no de lo útil que sea la herramienta.'],
        ['Usarla con toda la información, pero borrar el historial de conversaciones al terminar cada día.', false, 'Borrar el historial que tú ves no garantiza que el proveedor elimine lo que ya recibió.']] }
];

/* ---- Categorías de solución Dell candidatas (genéricas) ---- */
const DELL = {
  RENOV: 'Renovación de equipos comerciales',
  RESP: 'Respaldo y recuperación de datos',
  PROT: 'Protección de equipos',
  GEST: 'Gestión de dispositivos',
  MDR: 'Servicio de detección gestionada',
  IA: 'Equipos con capacidad de IA local'
};

/* ---- Diagnóstico de madurez: 6 dominios × 5 preguntas ---- */
const DOMINIOS = [
  { n: 'Gobierno y responsabilidades', nist: 'Gobernar (GV)' },
  { n: 'Personas y capacitación', nist: 'Proteger (PR)' },
  { n: 'Accesos, e.firma y contraseñas', nist: 'Proteger (PR)' },
  { n: 'Equipos y actualizaciones', nist: 'Identificar (ID), Proteger (PR) y Detectar (DE)' },
  { n: 'Respaldos y continuidad', nist: 'Responder (RS) y Recuperar (RC)' },
  { n: 'Uso de inteligencia artificial', nist: 'Gobernar (GV) e Identificar (ID)' }
];
// q: pregunta · h: título del hallazgo · r: riesgo para el negocio · g: gravedad · a0: acción sin costo · a1: acción de bajo costo · d: categoría Dell
const DIAG = [
  // 1. Gobierno
  { q: '¿Hay una persona designada como responsable de la seguridad de la información del despacho?', h: 'No hay un responsable de seguridad designado', r: 'Sin responsable, los problemas se detectan tarde y nadie decide durante un incidente.', g: 'alta', a0: 'Nombrar por escrito a un responsable y a un suplente.', a1: 'Reservar dos horas al mes del responsable para revisar pendientes de seguridad.' },
  { q: '¿Existen reglas escritas sobre cómo se maneja la información de los clientes (dónde se guarda y quién la ve)?', h: 'No hay reglas escritas para manejar información de clientes', r: 'Cada persona guarda y comparte a su manera, lo que facilita fugas y pérdidas.', g: 'media', a0: 'Escribir una página de reglas básicas y revisarla con el equipo.', a1: 'Adaptar una plantilla de política con apoyo de un asesor.' },
  { q: '¿El despacho tiene aviso de privacidad y lo da a conocer a sus clientes?', h: 'Falta el aviso de privacidad o no se entrega', r: 'Tratar datos personales sin aviso puede incumplir la LFPDPPP y debilita la confianza del cliente.', g: 'alta', a0: 'Redactar el aviso con base en la ley vigente (artículos 14 a 16) y ponerlo a disposición de cada cliente.', a1: 'Pedir la revisión de un abogado.' },
  { q: '¿Existe un plan escrito de qué hacer y a quién llamar si ocurre un incidente?', h: 'No hay plan de respuesta ante incidentes', r: 'En una emergencia se pierde tiempo decidiendo qué hacer, justo cuando cada hora cuenta.', g: 'alta', a0: 'Completar e imprimir el plan de una página del Módulo 4.', a1: 'Hacer un simulacro de 30 minutos una vez al año.' },
  { q: '¿Las cartas de servicio o contratos con clientes mencionan la confidencialidad y el manejo de su información?', h: 'Los acuerdos con clientes no cubren confidencialidad', r: 'Ante un problema, no queda claro qué se comprometió el despacho a proteger.', g: 'baja', a0: 'Agregar un párrafo de confidencialidad a la carta de servicios.', a1: 'Revisar el formato de contrato con un abogado.' },
  // 2. Personas
  { q: '¿Todo el personal recibió capacitación sobre fraudes por correo (phishing) en el último año?', h: 'Personal sin capacitación reciente en fraude por correo', r: 'Un clic equivocado puede exponer la información de varios clientes a la vez.', g: 'alta', a0: 'Que todo el equipo complete el Módulo 1 y el simulador.', a1: 'Programar capacitación breve y periódica durante el año.' },
  { q: '¿El personal nuevo recibe indicaciones de seguridad desde su primer día?', h: 'El personal nuevo no recibe inducción de seguridad', r: 'Quien acaba de entrar es quien menos conoce los procesos y más fácil resulta de engañar.', g: 'media', a0: 'Agregar 15 minutos de seguridad a la bienvenida, con las reglas del despacho.', a1: 'Asignar los módulos de la app como parte de la inducción.' },
  { q: '¿Las solicitudes de pago o de cambio de cuenta bancaria se confirman siempre por un segundo canal (llamada a un número conocido)?', h: 'Pagos y cambios de cuenta sin doble verificación', r: 'Un correo suplantado puede provocar una transferencia a un defraudador, difícil de recuperar.', g: 'alta', a0: 'Establecer la regla: ningún pago ni cambio de cuenta sin llamada de confirmación.', a1: 'Dejar la regla por escrito en la carta de servicios con los clientes.' },
  { q: '¿El personal sabe a quién reportar un correo o una situación sospechosa, y lo hace sin temor a un regaño?', h: 'No hay un canal claro para reportar sospechas', r: 'Los incidentes se ocultan o se reportan tarde, y el daño crece.', g: 'media', a0: 'Definir a quién se reporta y agradecer cada reporte, aunque sea falsa alarma.', a1: 'Crear un grupo o correo interno exclusivo para reportes.' },
  { q: 'Cuando alguien deja el despacho, ¿se le retiran sus accesos y se cambian las contraseñas que conocía ese mismo día?', h: 'Accesos de exempleados sin retirar', r: 'Una persona que ya no trabaja en el despacho podría seguir entrando a información de clientes.', g: 'alta', a0: 'Usar una lista de salida: cuentas por cerrar y contraseñas por cambiar.', a1: 'Administrar las cuentas y los equipos desde un solo lugar.', d: 'GEST' },
  // 3. Accesos
  { q: '¿Las e.firma y los CSD de los clientes se guardan en un lugar protegido, con acceso solo para quienes los usan?', h: 'e.firma y CSD de clientes sin resguardo adecuado', r: 'Quien obtenga esos archivos y su contraseña puede firmar o facturar a nombre del cliente.', g: 'alta', a0: 'Moverlos a una carpeta con acceso restringido y guardar las contraseñas aparte.', a1: 'Cifrar los equipos y carpetas donde se guardan.', d: 'PROT' },
  { q: '¿Cada persona tiene su propio usuario y contraseña (no se comparten cuentas)?', h: 'Cuentas compartidas entre el personal', r: 'No se puede saber quién hizo qué, y una contraseña filtrada abre la puerta a todo.', g: 'alta', a0: 'Crear un usuario por persona en correo, nube y software contable.', a1: 'Administrar usuarios y equipos de forma centralizada.', d: 'GEST' },
  { q: '¿Se usa un gestor de contraseñas en lugar de libretas, hojas de cálculo o notas?', h: 'Contraseñas guardadas en lugares inseguros', r: 'Una libreta perdida o un archivo abierto expone todos los accesos del despacho.', g: 'media', a0: 'Retirar las contraseñas de notas y hojas de cálculo; no reutilizarlas.', a1: 'Contratar un gestor de contraseñas para el equipo.' },
  { q: '¿Está activada la verificación en dos pasos (MFA) en el correo, la nube y la banca?', h: 'Verificación en dos pasos sin activar', r: 'Con solo robar una contraseña, un tercero entra al correo y desde ahí recupera las demás.', g: 'alta', a0: 'Activarla hoy en el correo y la banca, desde la configuración de seguridad de cada cuenta.', a1: 'Usar una aplicación de códigos en lugar de mensajes SMS.' },
  { q: '¿Cada persona ve solo la información de los clientes que atiende?', h: 'Todo el personal ve la información de todos los clientes', r: 'Un solo acceso comprometido expone la cartera completa.', g: 'media', a0: 'Organizar carpetas por cliente y dar permiso solo a quien lo atiende.', a1: 'Revisar los permisos cada trimestre.' },
  // 4. Equipos
  { q: '¿Existe un inventario actualizado de las computadoras y de quién usa cada una?', h: 'No hay inventario de equipos', r: 'No se puede proteger ni reponer lo que no se sabe que se tiene.', g: 'baja', a0: 'Llenar el inventario de la app junto con el consultor.', a1: 'Mantenerlo con una herramienta de administración de equipos.', d: 'GEST' },
  { q: '¿Todos los equipos reciben actualizaciones automáticas del sistema operativo y de los programas?', h: 'Equipos sin actualizaciones al día', r: 'Las fallas conocidas sin corregir son la vía de entrada más común para un ataque.', g: 'alta', a0: 'Activar las actualizaciones automáticas y reiniciar los equipos cada semana.', a1: 'Sustituir los equipos que ya no reciben actualizaciones.', d: 'RENOV' },
  { q: '¿Todos los equipos tienen antivirus o protección activa y vigente?', h: 'Equipos sin protección activa', r: 'Un archivo malicioso puede ejecutarse sin que nadie lo note.', g: 'alta', a0: 'Verificar que la protección incluida en el sistema operativo esté activa.', a1: 'Contratar protección administrada para todos los equipos.', d: 'PROT' },
  { q: '¿Los equipos se bloquean con contraseña y tienen el disco cifrado, sobre todo las laptops?', h: 'Equipos sin bloqueo o sin cifrado', r: 'Una laptop perdida o robada entrega la información de los clientes a quien la encuentre.', g: 'media', a0: 'Activar el bloqueo automático de pantalla y el cifrado incluido en el sistema.', a1: 'Elegir equipos con funciones de seguridad integradas al renovar.', d: 'PROT' },
  { q: '¿Alguien revisa alertas o actividad inusual en equipos y cuentas (por ejemplo, inicios de sesión extraños)?', h: 'Nadie vigila alertas ni actividad inusual', r: 'Un acceso indebido puede pasar semanas sin detectarse.', g: 'media', a0: 'Activar los avisos de inicio de sesión en correo y banca, y revisarlos.', a1: 'Evaluar un servicio que vigile los equipos y avise de anomalías.', d: 'MDR' },
  // 5. Respaldos
  { q: '¿La información crítica (contabilidades, XML, nóminas) se respalda de forma automática?', h: 'No hay respaldo automático de la información crítica', r: 'Una falla o un ataque puede dejar al despacho sin la información de sus clientes.', g: 'alta', a0: 'Definir qué se respalda, cada cuándo y quién lo revisa.', a1: 'Implementar un respaldo automático con versiones.', d: 'RESP' },
  { q: '¿Existe al menos una copia de respaldo fuera de la oficina o desconectada?', h: 'Todas las copias están en el mismo lugar', r: 'Un robo, un incendio o un ransomware puede alcanzar el original y su copia al mismo tiempo.', g: 'alta', a0: 'Llevar una copia semanal a un lugar distinto y desconectarla.', a1: 'Agregar un respaldo en un servicio externo.', d: 'RESP' },
  { q: '¿Se ha probado restaurar un archivo desde el respaldo en los últimos 6 meses?', h: 'El respaldo nunca se ha probado', r: 'Podría descubrirse que el respaldo no sirve justo el día que se necesita.', g: 'alta', a0: 'Hacer la prueba de restauración del Módulo 3 y registrarla.', a1: 'Programar una prueba cada trimestre.', d: 'RESP' },
  { q: '¿Se sabe cuánto tiempo tomaría volver a operar y a qué clientes se atendería primero?', h: 'No hay prioridades de recuperación definidas', r: 'Durante un cierre fiscal, recuperar en desorden puede hacer que se incumpla con los clientes más urgentes.', g: 'media', a0: 'Anotar en el plan de respuesta el orden de recuperación por vencimientos.', a1: 'Medir el tiempo real de recuperación en un simulacro.' },
  { q: 'Si falla una computadora clave, ¿el despacho puede seguir trabajando (equipo de reemplazo o acceso alterno)?', h: 'El despacho depende de equipos sin reemplazo', r: 'La falla de un solo equipo puede detener la operación por días.', g: 'media', a0: 'Identificar qué equipo podría usarse como reemplazo temporal.', a1: 'Contar con un equipo de respaldo listo o con garantía de reposición.', d: 'RENOV' },
  // 6. IA
  { q: '¿Existe una política escrita sobre el uso de herramientas de IA en el despacho?', h: 'No hay política de uso de IA', r: 'Cada persona decide por su cuenta qué pega en una IA, sin criterios comunes.', g: 'media', a0: 'Generar la política de una página del Módulo 7 y firmarla.', a1: 'Revisarla cada seis meses.' },
  { q: '¿Se sabe qué herramientas de IA usa el personal y con qué cuentas?', h: 'Se desconoce qué herramientas de IA usa el personal', r: 'Puede haber información de clientes en cuentas personales que el despacho no controla.', g: 'media', a0: 'Preguntar al equipo y hacer una lista de herramientas y cuentas.', a1: 'Definir cuentas del despacho con controles de privacidad.' },
  { q: '¿Se evita ingresar datos identificables de clientes (RFC, CURP, XML, estados de cuenta, nóminas) en herramientas de IA?', h: 'Datos de clientes ingresados en herramientas de IA', r: 'La información confidencial puede quedar almacenada fuera del control del despacho.', g: 'alta', a0: 'Establecer la regla de anonimizar antes de pegar y explicarla con ejemplos.', a1: 'Usar cuentas con controles de privacidad administradas por el despacho.', d: 'IA' },
  { q: '¿Los resultados de la IA se verifican siempre antes de usarse o enviarse a un cliente?', h: 'Resultados de IA usados sin verificación', r: 'Un cálculo o fundamento equivocado puede terminar en una declaración firmada por el despacho.', g: 'alta', a0: 'Regla: todo resultado de IA lo revisa una persona contra la fuente oficial.', a1: 'Agregar un paso de revisión en el proceso de cierre.' },
  { q: '¿Los clientes están informados de que el despacho usa IA y con qué cuidados?', h: 'Los clientes no están informados del uso de IA', r: 'Si un cliente se entera por otra vía, puede sentirse expuesto y perder confianza.', g: 'baja', a0: 'Agregar un párrafo sobre uso de IA en la carta de servicios.', a1: 'Incluirlo en el aviso de privacidad con revisión legal.' }
];

/* ---- Análisis del proceso clave ---- */
const PASOS_PROCESO = ['Recepción', 'Almacenamiento', 'Procesamiento', 'Envío al cliente o al SAT', 'Resguardo y eliminación'];
const CANALES = ['Correo', 'WhatsApp', 'USB', 'Nube', 'Software contable', 'Herramienta de IA', 'En papel', 'Otro'];
const RIESGOS_PROCESO = [
  { k: 'canal', h: 'Documentos fiscales por canales personales o no controlados', r: 'La información de clientes queda en teléfonos y cuentas que el despacho no administra.', g: 'media', a0: 'Definir un solo canal oficial para recibir y enviar documentos.', a1: 'Usar una carpeta compartida por cliente con acceso controlado.' },
  { k: 'cifrado', h: 'Documentos sin contraseña ni cifrado', r: 'Cualquiera que acceda al equipo o al mensaje puede leer la información.', g: 'alta', a0: 'Proteger con contraseña los archivos que se envían y mandar la contraseña por otro medio.', a1: 'Cifrar los equipos y las carpetas donde se guardan.', d: 'PROT' },
  { k: 'acceso', h: 'Más personas con acceso de las necesarias', r: 'Cada acceso adicional es una oportunidad más de error o de fuga.', g: 'media', a0: 'Limitar el acceso a quien atiende al cliente.', a1: 'Revisar los permisos cada trimestre.' },
  { k: 'respaldo', h: 'Información sin respaldo en esta etapa', r: 'Si se pierde aquí, habría que pedirla de nuevo al cliente o rehacer el trabajo.', g: 'alta', a0: 'Incluir esta carpeta o sistema en la rutina de respaldo.', a1: 'Automatizar el respaldo con versiones.', d: 'RESP' },
  { k: 'usb', h: 'Uso de memorias USB o equipos personales', r: 'Se pierden con facilidad y pueden introducir programas maliciosos.', g: 'media', a0: 'Evitar USB para información de clientes; usar el canal oficial.', a1: 'Administrar los equipos que acceden a la información.', d: 'GEST' },
  { k: 'ia', h: 'Documentos de clientes procesados en herramientas de IA sin anonimizar', r: 'Datos fiscales y personales pueden quedar almacenados por un tercero.', g: 'alta', a0: 'Anonimizar antes de usar IA y aplicar la política del Módulo 7.', a1: 'Usar cuentas con controles de privacidad.', d: 'IA' },
  { k: 'papel', h: 'Documentos en papel sin resguardo', r: 'Pueden extraviarse o ser vistos por visitantes.', g: 'baja', a0: 'Guardarlos bajo llave y no dejarlos en escritorios.', a1: 'Digitalizar y destruir el papel que ya no se requiere.' },
  { k: 'eliminacion', h: 'La información no se elimina cuando ya no se necesita', r: 'Se acumulan datos de clientes anteriores que siguen expuestos sin necesidad.', g: 'media', a0: 'Definir plazos de conservación y una revisión anual.', a1: 'Usar borrado seguro al dar de baja equipos y discos.' }
];

/* ---- Reglas del inventario ---- */
const REGLAS_EQ = {
  viejo: { h: 'Equipo con más de 4 años de antigüedad', r: 'Los equipos antiguos fallan más y pueden dejar de recibir actualizaciones de seguridad.', g: 'media', a0: 'Revisar si aún recibe actualizaciones y planear su sustitución.', a1: 'Reasignarlo a tareas que no manejen información de clientes.', d: 'RENOV' },
  sinresp: { h: 'Equipo sin respaldo', r: 'Si falla o se pierde, la información que contiene no se puede recuperar.', g: 'alta', a0: 'Incluirlo en la rutina de respaldo o no guardar información solo en él.', a1: 'Implementar respaldo automático.', d: 'RESP' },
  sinprot: { h: 'Equipo sin antivirus o sin actualizaciones', r: 'Es el punto de entrada más probable para un programa malicioso.', g: 'alta', a0: 'Activar la protección y las actualizaciones incluidas en el sistema.', a1: 'Contratar protección administrada.', d: 'PROT' },
  compartido: { h: 'Equipo compartido sin contraseña (gestión de accesos)', r: 'Cualquier persona en la oficina puede abrir la información de los clientes.', g: 'alta', a0: 'Crear un usuario con contraseña por persona y activar el bloqueo automático.', a1: 'Administrar las cuentas de forma centralizada.' }
};

const INFO_CRITICA = ['Contabilidades y pólizas', 'XML de CFDI emitidos y recibidos', 'Nóminas', 'Expedientes de clientes', 'Declaraciones presentadas y acuses', 'Configuración y base de datos del software contable', 'Estados de cuenta de clientes', 'Plantillas y papeles de trabajo'];
const SISTEMAS = ['Portal del SAT de clientes', 'Banca en línea', 'Software contable', 'Correo del despacho', 'Carpetas de clientes'];

const PROGRAMA_SUSCRIPCION = [
  ['01. Prevención', '45 min', 'Phishing y fraudes, protección de accesos al SAT, contraseñas y MFA, acceso a datos de clientes, uso seguro y ético de la IA'],
  ['02. Protección y recuperación', '45 min', 'Respaldos y recuperación, ransomware, protección de datos personales y financieros, seguridad de equipos, nube y software contable'],
  ['03. Simulación de crisis', '60 min', 'Ataque durante un cierre fiscal, plan de respuesta, continuidad operativa y cálculo de pérdidas']
];

const INDICADORES = [
  ['Identificación de phishing', '80% de correos simulados identificados correctamente', 'Simulador del Módulo 1'],
  ['Protección de cuentas', '100% sabe dónde activar MFA cuando está disponible', 'Pregunta del quiz final'],
  ['Recuperación', 'Cada despacho hace una prueba de restauración', 'Casilla del Módulo 3'],
  ['Respuesta a incidentes', '100% identifica a quién reportar y el plan está completo', 'Quiz final + plan de respuesta'],
  ['Riesgo financiero', 'Cada dueño estima el costo de 1 a 3 días', 'Calculadora del Módulo 5'],
  ['Uso de IA', 'Política de uso de IA generada', 'Módulo 7']
];
