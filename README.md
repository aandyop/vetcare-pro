# VetCare Pro - Sistema de Gestión Veterinaria

VetCare Pro es un sistema moderno y completo de administración para clínicas veterinarias, desarrollado con tecnologías web actuales para garantizar una experiencia rápida, fluida y eficiente tanto para el personal médico como para los clientes.

---

## Tecnologías Utilizadas
- **Frontend:** React, Vite, Tailwind CSS.
- **Estado Global:** Redux Toolkit.
- **Backend Local:** JSON Server (simulación de API REST).
- **Control de Versiones:** Git y GitHub.

---

## Módulos Principales
1. **Landing Page & Vistas Públicas:** Páginas de inicio, catálogo de servicios, información de la clínica y opiniones/reseñas de clientes.
2. **Dashboard:** Panel de control con métricas generales del sistema.
3. **Pacientes:** Gestión de expedientes clínicos (CRUD completo) con búsqueda optimizada en tiempo real mediante `useDebounce`.
4. **Citas Médicas:** Administración y control de la agenda diaria.
5. **Inventario:** Control de stock farmacéutico y productos veterinarios.
6. **Reportes:** Estadísticas analíticas de operaciones y finanzas.

---

## Guía de Instalación y Ejecución Local

Sigue estos pasos para poner en marcha el proyecto en tu entorno de desarrollo:

### 1. Clonar el repositorio
```bash
git clone [https://github.com/TU_USUARIO/vetcare-pro.git](https://github.com/TU_USUARIO/vetcare-pro.git)
cd vetcare-pro
```

### 2. Instalar dependencias
Descarga todos los módulos necesarios (incluyendo Vite, React y dependencias del sistema):

```bash
npm install
```

### 3. Ejecutar el Backend (JSON Server)
Inicia la base de datos local basada en el archivo db.json:

```bash
npm run backend
(El servidor se iniciará en http://localhost:5000)
```

### 4. Ejecutar el Frontend (Vite)
Abre una segunda terminal en la misma carpeta del proyecto y arranca el entorno de desarrollo:

```bash
npm run dev
```