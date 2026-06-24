# Mi Mascota Spa 🐾

Aplicación móvil multiplataforma híbrida para gestión y programación de citas de higiene y estética para mascotas.

**Asignatura:** Énfasis en Programación Móvil — Grupo B04  
**Institución:** Politécnico Grancolombiano  
**Docente:** Víctor Fabián Castro Pérez  
**Autor:** Cristian Camilo Ruiz Ruiz  

---

## 🛠️ Tecnologías

| Tecnología | Versión | Propósito |
|-----------|---------|-----------|
| Ionic Framework | ^7.0 | Framework multiplataforma |
| Angular | ^17.0 | Framework frontend |
| Capacitor | ^5.0 | Compilación nativa Android/iOS |
| TypeScript | ~5.2 | Lenguaje principal |

---

## 📋 Requerimientos funcionales implementados

| RF | Descripción | Estado |
|----|-------------|--------|
| RF01 | Pantalla principal | ✅ |
| RF02 | Selección de servicio | ✅ |
| RF03 | Selección de fecha disponible | ✅ |
| RF04 | Mostrar horarios disponibles | ✅ |
| RF05 | Formulario de datos del cliente | ✅ |
| RF06 | Validación de disponibilidad | ✅ |
| RF07 | Bloqueo de horarios ocupados | ✅ |
| RF08 | Registro de cita | ✅ |
| RF09 | Pantalla de confirmación | ✅ |
| RF10 | Administrador — ver citas | ✅ |
| RF11 | Administrador — modificar cita | ✅ |
| RF12 | Administrador — cancelar cita | ✅ |

**Implementación: 12/12 RF = 100%**

---

## 🚀 Instalación y ejecución

### Prerrequisitos

```bash
node --version   # >= 18.x
npm  --version   # >= 9.x
```

### 1. Instalar dependencias

```bash
cd mi-mascota-spa
npm install
```

### 2. Instalar Ionic CLI (si no está instalado)

```bash
npm install -g @ionic/cli
```

### 3. Ejecutar en navegador

```bash
ionic serve
```

La aplicación se abre en `http://localhost:8100`

---

## 📱 Compilar APK para Android

### 1. Preparar el proyecto

```bash
ionic build
npx cap add android
npx cap sync android
```

### 2. Abrir en Android Studio

```bash
npx cap open android
```

### 3. Generar APK

En Android Studio:
- **Build → Build Bundle(s) / APK(s) → Build APK(s)**
- El APK se genera en: `android/app/build/outputs/apk/debug/app-debug.apk`

---

## 🗂️ Estructura del proyecto

```
src/
├── app/
│   ├── models/
│   │   └── appointment.model.ts     # Modelos de dominio
│   ├── services/
│   │   └── appointment.service.ts   # Lógica de negocio + persistencia
│   ├── pages/
│   │   ├── home/                    # RF01 — Pantalla principal
│   │   ├── select-service/          # RF02 — Selección de servicio
│   │   ├── select-datetime/         # RF03, RF04 — Fecha y horario
│   │   ├── client-data/             # RF05–RF08 — Formulario y registro
│   │   ├── confirmation/            # RF09 — Confirmación
│   │   └── admin/                   # RF10–RF12 — Módulo administrador
│   ├── app.routes.ts                # Rutas lazy-loaded
│   └── app.component.ts             # Componente raíz
├── theme/
│   └── variables.scss               # Paleta de colores Mi Mascota Spa
└── global.scss                      # Estilos globales
```

---

## 💾 Persistencia de datos

Los datos se almacenan en `localStorage` del dispositivo mediante el servicio `AppointmentService`. Esto garantiza que las citas persisten entre sesiones sin necesidad de un servidor externo.

---

## 📐 Flujo de navegación

```
Home
├── Agendar cita
│   ├── Seleccionar servicio    (paso 1/3)
│   ├── Seleccionar fecha/hora  (paso 2/3)
│   ├── Ingresar datos          (paso 3/3)
│   └── Confirmación
└── Administrador
    └── Lista de citas (ver · editar · cancelar)
```
