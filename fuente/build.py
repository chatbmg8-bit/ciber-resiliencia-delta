import pathlib
d = pathlib.Path(__file__).parent
css = (d / 'style.css').read_text(encoding='utf-8')
js = '\n'.join((d / f).read_text(encoding='utf-8') for f in ['content.js', 'fiscal_contenido.js', 'core.js', 'views.js', 'aprendizaje.js', 'fiscal.js', 'resultados.js', 'main.js'])
assert '</script' not in js
html = f'''<!DOCTYPE html>
<html lang="es-MX">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Ciber Resiliencia como Servicio</title>
<meta name="theme-color" content="#18211e">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-title" content="Ciber DELTA">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
<style>
{css}
</style>
</head>
<body>
<div id="app"></div>
<div id="print-area"></div>
<div id="toast" role="status" aria-live="polite"></div>
<div id="modal"></div>
<script>
{js}
</script>
</body>
</html>
'''
out = d / 'dist'
out.mkdir(exist_ok=True)
(out / 'index.html').write_text(html, encoding='utf-8')
print(len(html), 'bytes')
