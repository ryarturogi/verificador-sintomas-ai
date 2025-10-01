# Verificador de Síntomas con AI

Un sistema inteligente de verificación de síntomas que utiliza IA para ayudar a los usuarios a evaluar sus síntomas y obtener información relevante sobre posibles condiciones de salud.

## 🚀 Tecnologías

- **Next.js 15** - Framework de React con App Router
- **React 19** - Biblioteca de interfaz de usuario
- **TypeScript** - Tipado estático para JavaScript
- **Tailwind CSS 4** - Framework de CSS utilitario
- **shadcn/ui** - Componentes de interfaz de usuario accesibles
- **Framer Motion** - Biblioteca de animaciones
- **ESLint** - Linter para mantener calidad de código

## 📋 Características

- ✅ Interfaz intuitiva para ingreso de síntomas
- ✅ Análisis inteligente usando IA
- ✅ Recomendaciones personalizadas
- ✅ Diseño responsivo y accesible
- ✅ Animaciones fluidas con Framer Motion
- ✅ Componentes reutilizables con shadcn/ui

## 🛠️ Instalación

1. Clona el repositorio:
```bash
git clone <repository-url>
cd verificador-sintomas-ai
```

2. Instala las dependencias:
```bash
npm install
```

3. Ejecuta el servidor de desarrollo:
```bash
npm run dev
```

4. Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 📁 Estructura del Proyecto

```
src/
├── app/                 # App Router de Next.js
├── components/
│   ├── ui/             # Componentes base de shadcn/ui
│   └── symptom-checker/ # Componentes específicos del verificador
├── hooks/              # Custom React hooks
├── lib/                # Utilidades y configuraciones
├── services/           # Servicios de API y lógica de negocio
├── types/              # Definiciones de tipos TypeScript
└── constants/          # Constantes de la aplicación
```

## 🎨 Componentes UI

Este proyecto utiliza shadcn/ui para componentes base. Para agregar nuevos componentes:

```bash
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add input
```

## 🚨 Importante

**Descargo de responsabilidad**: Este verificador de síntomas es solo para fines informativos y educativos. No debe usarse como sustituto del consejo médico profesional, diagnóstico o tratamiento. Siempre consulte con un profesional de la salud calificado para cualquier pregunta sobre una condición médica.

## 📝 Scripts Disponibles

- `npm run dev` - Ejecuta el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run start` - Ejecuta la aplicación en modo producción
- `npm run lint` - Ejecuta el linter
- `npm run type-check` - Verifica los tipos TypeScript

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/nueva-caracteristica`)
3. Commit tus cambios (`git commit -am 'Agrega nueva característica'`)
4. Push a la rama (`git push origin feature/nueva-caracteristica`)
5. Crea un Pull Request

## 📄 Licencia

Este proyecto está bajo la licencia MIT. Ver el archivo [LICENSE](LICENSE) para más detalles.
