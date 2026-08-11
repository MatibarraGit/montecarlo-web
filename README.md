# Plantilla Inicio de Proyecto

Plantilla base para arrancar proyectos web con **Next.js 16** (App Router), **React 19**, **TypeScript**, **Tailwind CSS v4** y componentes UI estilo **shadcn/Radix** ya integrados.

## Stack

- [Next.js 16](https://nextjs.org/) — App Router
- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [Radix UI](https://www.radix-ui.com/) + [class-variance-authority](https://cva.style/) + `clsx` / `tailwind-merge`
- [lucide-react](https://lucide.dev/) para íconos
- [pnpm](https://pnpm.io/) como gestor de paquetes
- Node `24.19.0` (ver [.node-version](.node-version))



## Cómo usar esta plantilla en un nuevo proyecto

1. **Copiar la carpeta** de la plantilla a la ubicación del nuevo proyecto (sin `node_modules` ni `.next` si existieran):
  ```bash
   cp -r "Plantilla Inicio de Proyecto" "../MiNuevoProyecto"
   cd "../MiNuevoProyecto"
  ```
2. **Actualizar** `package.json`: cambiar el campo `name` (y `version` si corresponde).
3. **Instalar dependencias** (requiere el pnpm indicado en `packageManager`):
  ```bash
   pnpm install
  ```
4. **Levantar el entorno de desarrollo**:
  ```bash
   pnpm dev
  ```
   La app queda disponible en [http://localhost:3000](http://localhost:3000).
5. **Personalizar metadata**: editar `title`/`description` en [src/app/layout.tsx](src/app/layout.tsx) y el contenido de [src/app/page.tsx](src/app/page.tsx).
6. Si el nuevo proyecto usa Git, inicializarlo recién en el destino:
  ```bash
   git init
   git add .
   git commit -m "chore: init from plantilla"
  ```



## Scripts disponibles


| Comando      | Descripción                       |
| ------------ | --------------------------------- |
| `pnpm dev`   | Levanta el servidor de desarrollo |
| `pnpm build` | Compila la app para producción    |
| `pnpm start` | Sirve el build de producción      |
| `pnpm lint`  | Corre ESLint sobre el proyecto    |




## Estructura del proyecto

```
src/
  app/                # App Router: layout, page, estilos globales
  components/
    ui/                # Componentes base (button, card, dialog, select, tabs, etc.)
    index.ts            # Barrel de exports de componentes propios
  hooks/
    use-media-query.ts  # Hooks reutilizables
  libs/
    utils.ts             # Helper `cn()` para combinar clases (clsx + tailwind-merge)
public/                 # Assets estáticos
```



### Componentes UI incluidos

`Button`, `Card`, `Carousel`, `Checkbox`, `Input`, `Select`, `Separator`, `Slider`, `Table`, `Tabs` — todos exportados desde [src/components/ui/index.ts](src/components/ui/index.ts) e importables con:

```ts
import { Button, Card, Tabs } from "@/components/ui"
```

El alias de imports `@/*` apunta a `src/*` (configurado en [tsconfig.json](tsconfig.json)).

## Notas para trabajar con IA en este repo

Este proyecto usa una versión de Next.js con cambios respecto a la documentación estándar. Antes de generar código relacionado con Next.js, revisar las guías en `node_modules/next/dist/docs/` (ver [AGENTS.md](AGENTS.md)).

## Licencia

Uso interno / personal.