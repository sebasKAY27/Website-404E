# 📌 Instrucciones para Agregar el Favicon

## ¿Qué es un Favicon?
El favicon es el pequeño icono que aparece en la pestaña del navegador junto al título de tu página web.

## 🎨 Archivos Necesarios

Necesitas crear 3 archivos de imagen con tu logo:

1. **favicon-16x16.png** - 16x16 píxeles (para pestañas pequeñas)
2. **favicon-32x32.png** - 32x32 píxeles (para pestañas normales)
3. **apple-touch-icon.png** - 180x180 píxeles (para dispositivos Apple)

## 📁 Ubicación

Coloca estos 3 archivos en la **raíz del proyecto**, es decir, en la misma carpeta donde están los archivos HTML:

```
Pagina_Web_E404_Corregida/
├── index.html
├── agencia.html
├── bootcamp.html
├── comunidad.html
├── contacto.html
├── eventos.html
├── proyectos.html
├── style.css
├── favicon-16x16.png      ← Aquí
├── favicon-32x32.png       ← Aquí
└── apple-touch-icon.png    ← Aquí
```

## 🛠️ Cómo Crear los Favicons

### Opción 1: Herramientas Online (Recomendado)
1. Ve a https://favicon.io/ o https://realfavicongenerator.net/
2. Sube tu logo (preferiblemente PNG con fondo transparente)
3. La herramienta generará automáticamente todos los tamaños
4. Descarga los archivos y colócalos en la carpeta del proyecto

### Opción 2: Manualmente con un Editor de Imágenes
1. Abre tu logo en Photoshop, GIMP, o cualquier editor
2. Redimensiona a 32x32 píxeles
3. Guarda como `favicon-32x32.png`
4. Repite para los otros tamaños (16x16 y 180x180)

## ✅ Verificación

Una vez que agregues los archivos:
1. Abre tu página web en el navegador
2. Deberías ver tu logo en la pestaña del navegador
3. Si no aparece inmediatamente, presiona Ctrl+F5 para refrescar la caché

## 💡 Consejos

- **Diseño simple**: Los favicons son muy pequeños, usa diseños simples y reconocibles
- **Alto contraste**: Asegúrate de que tu logo sea visible en fondos claros y oscuros
- **Formato PNG**: Usa PNG con transparencia para mejores resultados
- **Colores del tema**: Tu favicon actual debería usar los colores morados (#8b5cf6) del tema retro

## 🎨 Sugerencia de Diseño

Para mantener la estética retro/cyberpunk del sitio:
- Usa el número "404" en estilo pixel art
- Colores: Morado neón (#8b5cf6) sobre fondo negro
- Estilo: Retro gaming / NES style
- Borde: Opcional con glow effect morado

---

**Nota**: Los archivos favicon ya están referenciados en todas las páginas HTML. Solo necesitas crear y colocar las imágenes.
