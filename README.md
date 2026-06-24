# 🐾 Mi Mascota Spa

Aplicación móvil multiplataforma híbrida para gestión y programación de citas de higiene y estética para mascotas.

![Estado](https://img.shields.io/badge/RF%20implementados-12%2F12-brightgreen)
![Plataforma](https://img.shields.io/badge/plataforma-Android%20%7C%20iOS-blue)
![Framework](https://img.shields.io/badge/Ionic-Angular-3880FF)

**Proyecto académico — Énfasis en Programación Móvil (Grupo B04)**
Politécnico Grancolombiano — Ingeniería de Software
Docente: Víctor Fabián Castro Pérez
Autor: Cristian Camilo Ruiz Ruiz

---

## 📋 Tabla de contenidos

- [Descripción](#-descripción)
- [Tecnologías](#%EF%B8%8F-tecnologías)
- [Requerimientos funcionales implementados](#-requerimientos-funcionales-implementados)
- [Prerrequisitos](#-prerrequisitos)
- [Instalación](#-instalación)
- [Ejecución en navegador](#-ejecución-en-navegador)
- [Generación del APK (Android)](#-generación-del-apk-android)
- [Estructura del proyecto](#%EF%B8%8F-estructura-del-proyecto)
- [Solución de problemas comunes](#-solución-de-problemas-comunes)
- [Persistencia de datos](#-persistencia-de-datos)
- [Flujo de navegación](#-flujo-de-navegación)
- [Licencia](#-licencia)

---

## 📖 Descripción

Mi Mascota Spa es una aplicación móvil orientada a la gestión de citas para servicios básicos de higiene y estética de mascotas (baño, peluquería y corte de uñas). Permite a los clientes agendar citas de forma autónoma y a los administradores de un establecimiento gestionar, modificar y cancelar las reservas registradas.

El proyecto fue desarrollado bajo un enfoque **multiplataforma híbrido** utilizando Ionic y Angular, lo que permite ejecutar la misma base de código tanto en Android como en iOS.

---

## 🛠️ Tecnologías

| Tecnología | Versión | Propósito |
|-----------|---------|-----------|
| Ionic Framework | ^7.0 | Framework multiplataforma — componentes UI nativos |
| Angular | ^17.0 | Framework SPA — componentes, enrutamiento, formularios |
| TypeScript | ~5.2 | Lenguaje principal — tipado estático |
| Capacitor | ^5.0 | Puente nativo — compilación de APK/IPA |
| RxJS | ~7.8 | Programación reactiva — sincronización de datos |

---

## ✅ Requerimientos funcionales implementados

| RF | Descripción | Estado |
|----|-------------|--------|
| RF01 | Pantalla principal con acceso a agendamiento y administración | ✅ |
| RF02 | Selección de servicio (baño, peluquería, corte de uñas) | ✅ |
| RF03 | Calendario con fechas disponibles | ✅ |
| RF04 | Mostrar únicamente horarios libres | ✅ |
| RF05 | Formulario de datos del propietario y la mascota | ✅ |
| RF06 | Validación de disponibilidad antes de registrar | ✅ |
| RF07 | Bloqueo de horarios ya ocupados | ✅ |
| RF08 | Registro y almacenamiento de la cita | ✅ |
| RF09 | Pantalla de confirmación con resumen completo | ✅ |
| RF10 | Administrador — listar citas registradas | ✅ |
| RF11 | Administrador — modificar cita existente | ✅ |
| RF12 | Administrador — cancelar cita con confirmación | ✅ |

**Cobertura: 12/12 RF = 100%**

---

## 📦 Prerrequisitos

Antes de instalar, asegúrate de tener:

- **Node.js** ≥ 18.x y **npm** ≥ 9.x → [nodejs.org](https://nodejs.org) (descargar versión LTS)
- **Ionic CLI** → se instala en el paso 2 de abajo
- **Android Studio** (solo si vas a generar el APK) → [developer.android.com/studio](https://developer.android.com/studio)
- **JDK 17** (normalmente se instala junto con Android Studio)

Verifica que Node.js quedó instalado:
```bash
node --version
npm --version
```

---

## 🚀 Instalación

### 1. Clonar el repositorio

```bash
git clone [ENLACE_DEL_REPOSITORIO]
cd mi-mascota-spa
```

### 2. Instalar dependencias

> ⚠️ **Importante:** este proyecto requiere el flag `--legacy-peer-deps` debido a conflictos de resolución de versiones entre paquetes de Angular. Sin este flag, `npm install` fallará con un error `ERESOLVE`.

```bash
npm install --legacy-peer-deps
```

### 3. Instalar Ionic CLI (si no la tienes)

```bash
npm install -g @ionic/cli
```

---

## 🖥️ Ejecución en navegador

Para probar la aplicación rápidamente sin compilar para Android:

```bash
ionic serve
```

Esto abre automáticamente el navegador en `http://localhost:8100`. Si no se abre solo, ingresa esa dirección manualmente.

Para detener el servidor: `Ctrl + C` en la terminal.

---

## 📱 Generación del APK (Android)

### Paso 1 — Aplicar ícono y splash screen (opcional pero recomendado)

Si tienes los archivos `icon.png` (1024×1024) y `splash.png` (2732×2732), colócalos en una carpeta `resources/` en la raíz del proyecto y ejecuta:

```bash
npm install @capacitor/assets --save-dev
npx capacitor-assets generate --android
```

### Paso 2 — Compilar el proyecto web

```bash
ionic build
```

### Paso 3 — Agregar y sincronizar la plataforma Android

```bash
npx cap add android
npx cap sync android
```

> Si ya habías agregado la plataforma antes, omite `npx cap add android` y solo ejecuta `npx cap sync android`.

### Paso 4 — Abrir en Android Studio

```bash
npx cap open android
```

Espera a que Gradle termine de sincronizar (barra de progreso inferior). La primera vez puede tardar 5–10 minutos.

### Paso 5 — Generar el APK

En el menú superior de Android Studio:

```
Build → Build Bundle(s) / APK(s) → Build APK(s)
```

El archivo generado queda en:

```
android/app/build/outputs/apk/debug/app-debug.apk
```

### Paso 6 — Instalar en un dispositivo Android

1. En el celular: **Ajustes → Acerca del teléfono** → toca 7 veces "Número de compilación" para activar el modo desarrollador.
2. **Ajustes → Opciones de desarrollador → Depuración USB** → activar.
3. Copia el archivo `app-debug.apk` al celular (USB, Drive, WhatsApp, etc.) y ábrelo para instalar.
4. Acepta la instalación de "fuentes desconocidas" si el sistema lo solicita.

---

## 🗂️ Estructura del proyecto

```
src/
├── app/
│   ├── models/
│   │   └── appointment.model.ts     # Modelos de dominio (Appointment, BookingDraft)
│   ├── services/
│   │   └── appointment.service.ts   # Lógica de negocio + persistencia (localStorage)
│   ├── pages/
│   │   ├── home/                    # RF01 — Pantalla principal
│   │   ├── select-service/          # RF02 — Selección de servicio
│   │   ├── select-datetime/         # RF03, RF04, RF06, RF07 — Fecha y horario
│   │   ├── client-data/             # RF05, RF08 — Formulario y registro
│   │   ├── confirmation/            # RF09 — Confirmación
│   │   └── admin/                   # RF10, RF11, RF12 — Módulo administrador
│   ├── app.routes.ts                # Rutas lazy-loaded
│   └── app.component.ts             # Componente raíz
├── theme/
│   └── variables.scss               # Paleta de colores Mi Mascota Spa
└── global.scss                      # Estilos globales
```

---

## 🆘 Solución de problemas comunes

| Problema | Causa | Solución |
|---|---|---|
| `npm error ERESOLVE` al instalar | Conflicto de versiones entre paquetes Angular | Usa `npm install --legacy-peer-deps` |
| `localhost:8100` no carga / conexión rechazada | `npm install` falló previamente, no hay paquetes instalados | Repite la instalación con el flag anterior, luego vuelve a correr `ionic serve` |
| `npm no se reconoce como comando` | Node.js no instalado correctamente | Reinstala Node.js desde nodejs.org y reinicia la terminal |
| `SDK location not found` en Android Studio | Ruta del SDK de Android mal configurada | `File → Project Structure → SDK Location` y verifica la ruta |
| La app se instala pero se cierra sola | Build de desarrollo sin optimizar | Ejecuta `ionic build --configuration=production` y repite la sincronización |
| Android Studio tarda mucho sincronizando Gradle | Primera sincronización, descarga de dependencias | Es normal; espera con conexión a internet activa |

---

## 💾 Persistencia de datos

Los datos se almacenan en el `localStorage` del dispositivo mediante el servicio `AppointmentService`, que expone un `BehaviorSubject` reactivo. Esto garantiza que las citas persistan entre sesiones sin necesidad de un servidor o base de datos externa, manteniendo el alcance acotado a un proyecto académico individual.

---

## 🧭 Flujo de navegación

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

---

## 📄 Licencia

Proyecto desarrollado con fines exclusivamente académicos para la asignatura de Énfasis en Programación Móvil del Politécnico Grancolombiano.
