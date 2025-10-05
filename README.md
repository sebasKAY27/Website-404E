# Escuadrón 404 - Prototipo One-Page

Un prototipo responsive one-page para la comunidad de desarrolladores Escuadrón 404, construido con HTML, Tailwind CSS y JavaScript vanilla con diseño retro cyberpunk.

## 🚀 Características

- **One-Page Design**: Todas las secciones en una sola página
- **Responsive**: Mobile-first, optimizado para todos los dispositivos
- **Stack Moderno**: HTML5 + Tailwind CSS (CDN) + JavaScript vanilla
- **Diseño Retro Cyberpunk**: Estilo negro, blanco y morado con efectos neon
- **Sin dependencias**: No requiere frameworks pesados ni compilación
- **Formularios inteligentes**: Con fallback a mailto si no hay endpoint configurado
- **Navegación suave**: Scroll suave entre secciones
- **Filtros interactivos**: Para proyectos (finalizados/en proceso)
- **Accesible**: Código semántico y navegación por teclado

## 📁 Estructura del Proyecto

```
Pagina Web E404/
├── index.html          # Página principal one-page
├── style.css          # Estilos retro cyberpunk
├── main.js            # Lógica JavaScript
└── README.md          # Este archivo
```

## 🎯 Secciones Incluidas

### 1. **Hero Section**
- Título principal con efecto terminal
- CTA principal: "Únete a Discord"
- CTA secundario: "Nuestros Servicios"

### 2. **Comunidad**
- Introducción a la comunidad
- Estadísticas (500+ miembros, proyectos colaborativos, innovación)

### 3. **Agencia Digital**
- Servicios: Desarrollo Web, Apps Móviles, Cloud & DevOps
- Mini-talentos: 3 cards con perfiles del equipo

### 4. **Bootcamp**
- Información del programa
- Formulario de pre-registro con campos:
  - Nombre completo
  - Email
  - Teléfono
  - Experiencia previa
  - Motivación

### 5. **Eventos**
- Lista de próximos eventos
- Calendario estático con 3 eventos

### 6. **Proyectos**
- Portafolio con filtros (Todos/Finalizados/En Proceso)
- 3 proyectos de ejemplo con tecnologías

### 7. **Contacto B2B**
- Formulario empresarial con campos:
  - Empresa
  - Nombre del contacto
  - Email corporativo
  - Teléfono
  - Tipo de servicio
  - Presupuesto aproximado
  - Descripción del proyecto
- Información de contacto
- Proceso de trabajo (4 pasos)

## ⚙️ Configuración Rápida

### 1. Enlaces y Placeholders

Antes de usar en producción, reemplaza estos placeholders en `main.js`:

```javascript
const CONFIG = {
    FORM_ENDPOINT: 'FORM_ENDPOINT_PLACEHOLDER', // URL del endpoint de formularios
    DISCORD_INVITE: 'https://discord.gg/INVITE_CODE_PLACEHOLDER', // Link real de Discord
    WHATSAPP_NUMBER: '573001234567' // Número de WhatsApp (formato internacional)
};
```

### 2. Enlaces en HTML

Actualiza también estos enlaces en `index.html`:
- Busca `href="https://wa.me/573001234567"` y reemplaza con tu número real
- Busca `href="#discord-invite"` (estos se manejan automáticamente via JavaScript)

## 🌐 Despliegue en Replit

### Paso 1: Crear Proyecto en Replit
1. Ve a [replit.com](https://replit.com) y crea una cuenta
2. Haz clic en **+ Create Repl**
3. Selecciona **HTML, CSS, JS** como template
4. Nombra tu proyecto: `escuadron-404-website`

### Paso 2: Subir Archivos
1. Elimina los archivos predeterminados de Replit
2. Sube todos los archivos: `index.html`, `style.css`, `main.js`
3. Asegúrate de que `index.html` esté en la raíz del proyecto

### Paso 3: Configurar y Probar
1. Haz clic en **Run** para iniciar el servidor
2. Replit automáticamente abrirá una vista previa
3. Prueba la navegación entre secciones
4. Verifica que los formularios funcionan (bootcamp y contacto)
5. Comprueba que la navegación móvil funcione

### Paso 4: Configurar Formularios (Opcional)
Para formularios funcionales en Replit, puedes:
- Usar un servicio como Formspree, Netlify Forms, o Google Forms
- Crear un endpoint simple con Node.js/Express en Replit
- Mantener el fallback mailto para desarrollo

## 🔥 Despliegue en Firebase Hosting

### Requisitos Previos
- Cuenta de Google/Firebase
- [Firebase CLI](https://firebase.google.com/docs/cli) instalado
- Node.js instalado en tu sistema

### Paso 1: Configurar Firebase
```bash
# Instalar Firebase CLI globalmente
npm install -g firebase-tools

# Autenticarse con Firebase
firebase login

# Inicializar proyecto Firebase
firebase init hosting
```

### Paso 2: Configurar Hosting
Cuando se ejecute `firebase init hosting`:
1. Selecciona **Use an existing project** o **Create a new project**
2. **What do you want to use as your public directory?** → Presiona Enter (usa la carpeta actual)
3. **Configure as a single-page app?** → `No`
4. **Set up automatic builds and deploys with GitHub?** → `No` (por ahora)
5. **File index.html already exists. Overwrite?** → `No`

### Paso 3: Desplegar
```bash
# Construir y desplegar
firebase deploy

# Tu sitio estará disponible en:
# https://tu-proyecto.web.app
```

### Paso 4: Configurar Dominio Personalizado (Opcional)
1. En la consola de Firebase, ve a **Hosting**
2. Haz clic en **Add custom domain**
3. Sigue las instrucciones para configurar DNS

## 📧 Conectar Formularios

### Opción 1: Google Forms (Recomendado para inicio)

1. **Crear Google Form**:
   - Ve a [forms.google.com](https://forms.google.com)
   - Crea formularios separados para Bootcamp y Contacto B2B
   - Copia los campos exactos del HTML

2. **Obtener URL de envío**:
   ```javascript
   // En main.js, reemplaza FORM_ENDPOINT con:
   FORM_ENDPOINT: 'https://docs.google.com/forms/d/e/TU_FORM_ID/formResponse'
   ```

3. **Mapear campos**:
   - Inspecciona el formulario de Google para obtener los `name` attributes
   - Actualiza los nombres en tu JavaScript

### Opción 2: Firebase Functions

1. **Configurar Functions**:
   ```bash
   firebase init functions
   cd functions
   npm install express cors
   ```

2. **Crear endpoint**:
   ```javascript
   // functions/index.js
   const functions = require('firebase-functions');
   const express = require('express');
   const cors = require('cors');
   
   const app = express();
   app.use(cors({ origin: true }));
   app.use(express.json());
   
   app.post('/submit-form', async (req, res) => {
     const { formType, ...data } = req.body;
     
     // Guardar en Firestore o enviar email
     console.log('Form submission:', { formType, data });
     
     res.status(200).json({ success: true });
   });
   
   exports.api = functions.https.onRequest(app);
   ```

3. **Desplegar Functions**:
   ```bash
   firebase deploy --only functions
   ```

4. **Actualizar endpoint**:
   ```javascript
   // En main.js
   FORM_ENDPOINT: 'https://us-central1-tu-proyecto.cloudfunctions.net/api/submit-form'
   ```

### Opción 3: Servicios Externos

**Formspree** (Fácil):
```javascript
FORM_ENDPOINT: 'https://formspree.io/f/tu-form-id'
```

**Netlify Forms** (Si usas Netlify):
```html
<!-- Añadir a tus formularios -->
<form netlify>
```

## 🛠️ Personalización

### Colores y Branding
El sitio usa variables CSS. Para cambiar colores, modifica en `style.css`:

```css
:root {
  --accent-primary: #8b5cf6;    /* Color principal */
  --accent-hover: #7c3aed;      /* Color hover */
  --bg-primary: #0a0a0a;        /* Fondo principal */
  --text-primary: #ffffff;      /* Texto principal */
}
```

### Contenido
- **Textos**: Directamente editables en `index.html`
- **Proyectos**: Modifica las cards en la sección proyectos
- **Eventos**: Actualiza las fechas y descripciones
- **Equipo**: Cambia nombres e información en la sección agencia
- **Servicios**: Modifica la información de servicios

### Funcionalidad
- **Filtros de proyectos**: Añade nuevos filtros en `main.js`
- **Validaciones**: Mejora las validaciones de formularios
- **Animaciones**: Añade más efectos CSS/JS

## 📱 Testing Checklist

### Funcionalidad
- [ ] Navegación entre secciones funciona correctamente
- [ ] Navegación móvil se abre/cierra
- [ ] Formularios envían datos o abren mailto (bootcamp y contacto)
- [ ] Filtros de proyectos funcionan
- [ ] Enlaces de WhatsApp y Discord funcionan
- [ ] Botones y enlaces son responsivos
- [ ] Indicador de sección activa en la navegación

### Responsive Design
- [ ] Vista móvil (320px - 768px)
- [ ] Vista tablet (768px - 1024px)
- [ ] Vista desktop (1024px+)
- [ ] Orientación landscape en móvil

### Performance
- [ ] Carga rápida (< 3 segundos)
- [ ] Sin errores en consola
- [ ] Animaciones suaves

### Accesibilidad
- [ ] Navegación por teclado
- [ ] Contraste de colores adecuado
- [ ] Labels en formularios

## 🐛 Troubleshooting

### Problemas Comunes

**Navegación entre secciones no funciona**:
- Verifica que todos los IDs de sección coincidan con los enlaces
- Comprueba que JavaScript se cargue correctamente

**Los formularios no funcionan**:
- Verifica que `FORM_ENDPOINT` esté configurado correctamente
- Comprueba la consola del navegador para errores
- Asegúrate de que el endpoint permita CORS

**Navegación móvil no se muestra**:
- Confirma que Font Awesome se cargue correctamente
- Verifica que JavaScript no tenga errores

**Enlaces de Discord/WhatsApp no funcionan**:
- Actualiza los placeholders en `main.js`
- Verifica el formato del número de WhatsApp

## 📧 Soporte

Para problemas técnicos o mejoras:
1. Revisa este README completo
2. Verifica la consola del navegador para errores
3. Comprueba que todos los placeholders estén reemplazados
4. Asegúrate de estar usando una versión moderna del navegador

## 🔄 Próximas Mejoras

- [ ] Sistema de gestión de contenido (CMS)
- [ ] Optimización SEO avanzada
- [ ] Integración con Google Analytics
- [ ] Sistema de newsletter
- [ ] Blog/noticias dinámico
- [ ] Dashboard de administración

---

**¡Desarrollado con ❤️ por Escuadrón 404!**

*Última actualización: Diciembre 2024*