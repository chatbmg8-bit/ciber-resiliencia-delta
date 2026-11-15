# Ciber Resiliencia como Servicio · Equipo DELTA

Aplicación del piloto académico del Equipo DELTA para el Reto Dell: capacitación, diagnóstico y reporte de ciber resiliencia para despachos contables.

Proyecto académico. No es un producto de Dell y no cuenta con su respaldo ni patrocinio.

## Dirección para el personal

https://chatbmg8-bit.github.io/ciber-resiliencia-delta/

El enlace de cada despacho lo da la app en **Acceso Equipo DELTA → Despachos → Enlace para el personal**.

**Acceso Equipo DELTA** pide un código. El equipo lo tiene; no lo publiquen en este repositorio ni en mensajes al personal. Es una barrera para que el personal no entre por error, no una protección fuerte: la app es una página estática y cada dispositivo guarda solo sus propios datos. Para quitar el acceso de un dispositivo: Acceso Equipo DELTA → Datos → Cerrar el acceso del equipo. Tiene esta forma:

`https://chatbmg8-bit.github.io/ciber-resiliencia-delta/?d=D-AB12`

## Dónde quedan los datos

En el navegador de cada persona. Esta página no tiene servidor ni base de datos y no recibe lo que se captura. Los resultados llegan al equipo cuando cada participante toca **Enviar por WhatsApp** (o copia su código, que empieza con `DELTA1`) y lo manda al chat del equipo. El equipo pega los mensajes, uno o varios a la vez, en **Acceso Equipo DELTA → Datos**, y revisa quién falta en **Despachos → Quién ha enviado resultados**. En **Resultados** ve el reporte colectivo de cada despacho y el reporte individual de cada alias, con cada respuesta; ambos se guardan en PDF.

## Si GitHub falla o no sabemos usarlo

`index.html` es la aplicación completa en un solo archivo. Funciona sin internet: se descarga, se abre con doble clic en cualquier navegador y hace lo mismo. Lo único que no funciona como archivo es el enlace directo por despacho; el personal escribe el código del despacho (D-AB12).

## Cómo actualizar la aplicación

1. En esta página del repositorio, entra a `index.html`.
2. Usa el ícono de lápiz o **Add file → Upload files** y sube el `index.html` nuevo con el mismo nombre.
3. Escribe una nota breve del cambio y presiona **Commit changes**.
4. En uno o dos minutos la dirección muestra la versión nueva. Si no, recarga con Ctrl + F5.

Los datos que ya capturó cada persona no se borran al actualizar.

## Carpeta `fuente`

El código por partes (`content.js` contenido, `core.js` cálculos, `views.js` pantallas, `resultados.js` reportes del equipo, `main.js` acciones, `style.css` estilos). `python3 build.py` los une en `dist/index.html`. Solo hace falta para editar a fondo; para usar la app basta `index.html`.
