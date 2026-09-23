# Olwe

Prototipo de sistema web universitario para explorar planes, consultar eventos inscritos, recibir avisos, conversar con participantes y administrar un perfil de estudiante.

## Funcionalidades actuales

- Inicio de sesión visual con validación del dominio `@unison.mx`.
- Entrada directa a **Explorar** después del acceso.
- Explorar con mapa simulado y marcadores de planes.
- Mis planes con búsqueda y filtros por categoría, visibilidad y estado.
- Modal visual para crear y previsualizar un plan.
- Detalle y edición visual de planes.
- Notificaciones y avisos con búsqueda y estado leído/no leído.
- Eventos inscritos con búsqueda y detalle.
- Chats de eventos con mensajes locales de demostración.
- Perfil con edición de datos, configuración, cambio de contraseña, historial y ayuda.
- Diseño responsive para escritorio, tablet y móvil.

## Credenciales de demostración

```text
Correo:      usuario@unison.mx
Contraseña:  123456
```

La autenticación actual es simulada y no debe utilizarse como mecanismo de seguridad en producción.

## Requisitos

- Node.js
- npm
- Navegador moderno

## Instalación

```bash
git clone https://github.com/Sapitoequisde/Olwe_prototipo.git
cd Olwe_prototipo
npm install
```

## Comandos

```bash
npm run dev      # Servidor de desarrollo
npm run build    # Compilación de producción
npm run lint     # Validación con ESLint
npm run preview  # Vista previa de la compilación
```

## Estructura principal

```text
src/
├── App.jsx
├── App.css
├── index.css
├── components/
├── data/
│   └── mockData.ts
├── pages/
│   └── ExploreView.tsx
├── assets/
└── types.ts
docs/
├── Manual_de_usuario_Olwe.docx
└── Documentacion_tecnica_Olwe.docx
```

## Datos y persistencia

Los planes, notificaciones, eventos, chats e historial se cargan desde datos locales. Las acciones de crear, publicar, actualizar, eliminar, cambiar contraseña y enviar mensajes funcionan únicamente durante la sesión actual y no se guardan en una base de datos.

## Compartir temporalmente

Con Vite ejecutándose, se puede utilizar Cloudflare Tunnel:

```bash
cloudflared tunnel --url http://127.0.0.1:5177 --no-autoupdate
```

El enlace de `trycloudflare.com` es temporal y deja de funcionar cuando se detienen Vite o cloudflared. Para producción se requiere un túnel nombrado o un servicio de despliegue permanente.

## Documentación

- [Manual de usuario](docs/Manual_de_usuario_Olwe.docx)
- [Documentación técnica](docs/Documentacion_tecnica_Olwe.docx)

## Estado del prototipo

El proyecto se encuentra en fase de prototipo frontend. La interfaz y los flujos principales están implementados, pero todavía se requiere un backend para autenticación real, persistencia, permisos, notificaciones y comunicación entre usuarios.
