# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
make this code in pdf: brilliance-vite/
├── public/
│   ├── images/
│   │   ├── pics/          # Product images
│   │   ├── gallery/       # Gallery images
│   │   └── videos/        # Video content
│   └── favicon.ico
│
├── src/
│   ├── assets/            # Static assets if needed
│   │
│   ├── components/        # Reusable React components
│   │   ├── layout/
│   │   │   ├── Header.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Navigation.jsx
│   │   │   └── SocialBar.jsx
│   │   │
│   │   ├── product/
│   │   │   ├── ProductCard.jsx
│   │   │   ├── ProductGrid.jsx
│   │   │   ├── ProductGallery.jsx
│   │   │   └── ProductOptions.jsx
│   │   │
│   │   ├── ui/
│   │   │   ├── Button.jsx
│   │   │   ├── Badge.jsx
│   │   │   ├── Notification.jsx
│   │   │   └── LoadingSpinner.jsx
│   │   │
│   │   └── forms/
│   │       └── ContactForm.jsx
│   │
│   ├── pages/             # Page components (routes)
│   │   ├── Home.jsx
│   │   ├── Shop.jsx
│   │   ├── ProductDetail.jsx
│   │   ├── Gallery.jsx
│   │   ├── About.jsx
│   │   ├── Contact.jsx
│   │   ├── Delivery.jsx        # NEW - needs content
│   │   └── NotFound.jsx
│   │
│   ├── data/              # Data & configuration
│   │   ├── products.js           # Product catalog
│   │   └── config.js             # App configuration
│   │
│   ├── hooks/             # Custom React hooks
│   │   ├── useProducts.js
│   │   ├── useCart.js (future)
│   │   └── useWhatsApp.js
│   │
│   ├── utils/             # Utility functions
│   │   ├── helpers.js
│   │   ├── validators.js
│   │   ├── emailService.js
│   │   └── whatsappService.js
│   │
│   ├── context/           # React Context (if needed)
│   │   └── AppContext.jsx
│   │
│   ├── styles/            # Global styles
│   │   └── index.css            # Tailwind imports + custom
│   │
│   ├── App.jsx            # Main app component
│   ├── main.jsx           # Vite entry point
│   └── router.jsx         # React Router setup
│
├── .env                   # Environment variables (EmailJS keys)
├── .gitignore
├── index.html             # Vite HTML template
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── vite.config.js
└── README.md