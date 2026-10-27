# Motor — Front-End

The Angular front end of the **Motor** platform: a bilingual (Arabic / English) website with a full admin panel for managing the site's content, services and users. It works with the [motor-be](https://github.com/mostfaswaisi93/motor-be) Node.js / TypeScript API.

![Angular](https://img.shields.io/badge/Angular-12-DD0031?logo=angular&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-4-3178C6?logo=typescript&logoColor=white)
![Angular Material](https://img.shields.io/badge/Angular_Material-12-757575?logo=angular&logoColor=white)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5-7952B3?logo=bootstrap&logoColor=white)
![i18n](https://img.shields.io/badge/i18n-AR%20%7C%20EN-2ea44f)

## Features

**Public site**
- Home page driven entirely by CMS content (header, who we are, what we apply, goals, commitments)
- Services and service details
- Arabic / English with full RTL support via `@ngx-translate`

**Admin panel**
- Manage home-page sections: header, *Who we are*, *What do we apply*
- Manage services, each with its own management team and random questions
- Manage managements (team members)
- Site settings: contact info, goals, commitments, social media links
- Rich-text editing with Quill
- Data tables with filtering

**Accounts**
- Login / register, profile and change password
- Role-based access with auth, login and module **guards**
- JWT sent automatically by an **HTTP interceptor**

**UX**
- Splash screen, global HTTP loader and custom loader
- Toast notifications
- Responsive layout with a separate mobile header and side menu
- Error pages (403 and others)

## Project Structure

```
src/app/
├── core/
│   ├── guards/         # auth, login and module guards
│   ├── interceptors/   # JWT token interceptor
│   ├── services/       # auth, users, services, management, general, translation…
│   ├── i18n/           # ar.ts / en.ts translation files
│   └── models/ enum/
└── views/
    ├── pages/          # admin, auth, user, profile, settings, change-password
    └── shared/         # layout (header, footer, side menu), loaders, splash, error page
```

## Getting Started

**Prerequisites:** Node.js 14–16 and Angular CLI 12

```bash
git clone https://github.com/mostfaswaisi93/ng-motor.git
cd ng-motor
npm install
npm start          # http://localhost:4200
```

Set the API address in `src/environments/environment.ts`:

```ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8000/'   // URL of the motor-be API
};
```

## Scripts

| Command | Description |
|---|---|
| `npm start` | Run the dev server |
| `npm run build` | Production build |
| `npm run watch` | Build in watch mode |
| `npm test` | Unit tests (Karma + Jasmine) |

## Related

- **Back end:** [motor-be](https://github.com/mostfaswaisi93/motor-be) — Express + TypeScript + MongoDB API

## Author

**Mustafa T. Al-Swaisi** · [LinkedIn](https://www.linkedin.com/in/mostfaswaisi93/) · [GitHub](https://github.com/mostfaswaisi93)
