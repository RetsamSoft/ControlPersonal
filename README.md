# Sistema de Control de Personal

Una aplicación web desarrollada en Angular para el control de entrada y salida de empleados.

## Características

- ✅ **Marcación de Asistencia**: Los empleados pueden marcar su entrada y salida
- ✅ **Reloj en Tiempo Real**: Muestra la fecha y hora actual
- ✅ **Historial de Marcaciones**: Visualización de todas las marcaciones realizadas
- ✅ **Filtros**: Filtrar el historial por tipo (entrada/salida)
- ✅ **Diseño Responsivo**: Adaptable a dispositivos móviles y desktop
- ✅ **Interfaz Intuitiva**: Fácil de usar para todos los empleados

## Uso de la Aplicación

### Marcación de Asistencia

1. **Acceder a la sección "Marcación"**
2. **Ingresar el número de empleado** (ejemplos disponibles: 001, 002, 003)
3. **Presionar "Marcar Asistencia"** o **Enter**
4. El sistema determinará automáticamente si es entrada o salida
5. Se mostrará una confirmación con la hora de marcación

### Historial de Marcaciones

1. **Acceder a la sección "Historial"**
2. **Ver todas las marcaciones** realizadas por orden cronológico
3. **Filtrar por tipo**: Todos, Solo Entradas, Solo Salidas
4. **Información mostrada**: Empleado, Tipo, Fecha y Hora

## Empleados de Prueba

La aplicación incluye empleados de prueba para demostración:

| Número | Nombre | Apellido |
|--------|--------|----------|
| 001    | Juan   | Pérez    |
| 002    | María  | García   |
| 003    | Carlos | López    |

## Instalación y Desarrollo

### Prerrequisitos
- Node.js (versión 18 o superior)
- npm o yarn

### Comandos de Desarrollo
```bash
# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm start

# Compilar para producción
npm run build

# Ejecutar tests
npm test
```

## Tecnologías Utilizadas

- **Angular 20** - Framework principal
- **TypeScript** - Lenguaje de programación
- **Signals** - Gestión de estado reactivo
- **CSS3** - Estilos y animaciones
- **Responsive Design** - Adaptabilidad móvil

## Estructura del Proyecto

```
src/
├── app/
│   ├── components/
│   │   ├── marcacion.component.ts    # Componente de marcación
│   │   └── historial.component.ts    # Componente de historial
│   ├── models/
│   │   └── registro.model.ts         # Modelos de datos
│   ├── services/
│   │   └── control-personal.service.ts # Lógica de negocio
│   ├── app.component.*               # Componente principal
│   └── app.routes.ts                 # Configuración de rutas
```

## Funcionalidades Futuras

- 🔄 Persistencia de datos en localStorage/base de datos
- 👥 Gestión de empleados (altas, bajas, modificaciones)
- 📊 Reportes y estadísticas
- 🔐 Sistema de autenticación
- 📧 Notificaciones por email
- 📱 Aplicación móvil nativa
- 🏢 Gestión de múltiples sucursales

---

Desarrollado con ❤️ para facilitar el control de personal en empresas.
