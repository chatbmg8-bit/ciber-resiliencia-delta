# Ciber Resiliencia como Servicio · Equipo DELTA

Aplicación del piloto académico del Equipo DELTA para el Reto Dell: capacitación, diagnóstico y reporte de ciber resiliencia para despachos contables.

Proyecto académico. No es un producto de Dell y no cuenta con su respaldo ni patrocinio.

## Dirección para el personal

https://chatbmg8-bit.github.io/ciber-resiliencia-delta/

El enlace de cada despacho lo da la app en **Acceso Equipo DELTA → Despachos → Enlace para el personal**. Tiene esta forma:

`https://chatbmg8-bit.github.io/ciber-resiliencia-delta/?d=D-AB12`

## Dónde quedan los datos

En el navegador de cada persona. Esta página no tiene servidor ni base de datos y no recibe lo que se captura. Los resultados llegan al equipo cuando cada participante copia su código (empieza con `DELTA1`) y lo envía por mensaje. El equipo lo importa en **Acceso Equipo DELTA → Datos**.

## Si GitHub falla o no sabemos usarlo

`index.html` es la aplicación completa en un solo archivo. Funciona sin internet: se descarga, se abre con doble clic en cualquier navegador y hace lo mismo. Lo único que no funciona como archivo es el enlace directo por despacho; el personal escribe el código del despacho (D-AB12).

## Cómo actualizar la aplicación

1. En esta página del repositorio, entra a `index.html`.
2. Usa el ícono de lápiz o **Add file → Upload files** y sube el `index.html` nuevo con el mismo nombre.
3. Escribe una nota breve del cambio y presiona **Commit changes**.
4. En uno o dos minutos la dirección muestra la versión nueva. Si no, recarga con Ctrl + F5.

Los datos que ya capturó cada persona no se borran al actualizar.

## Carpeta `fuente`

El código por partes (`content.js` contenido, `core.js` cálculos, `views.js` pantallas, `main.js` acciones, `style.css` estilos). `python3 build.py` los une en `dist/index.html`. Solo hace falta para editar a fondo; para usar la app basta `index.html`.
