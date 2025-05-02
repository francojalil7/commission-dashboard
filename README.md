# 💼 Commission Dashboard

Una aplicación construida con Next.js 15 que permite importar, estandarizar y visualizar datos de ventas desde múltiples CRMs, calculando comisiones individuales y totales.

---

## 🚀 Stack

- **Next.js 15** (App Router + Server Actions)
- **TypeScript**
- **Tailwind CSS**
- **Prisma** + **PostgreSQL (Neon)**
- **Lucide React** (icons)
- **Sonner** (toasts)

---

## 🧠 Enfoque y cómo pensé la estructura

Para que el proyecto sea fácil de mantener y escalar, separé la lógica de cada CRM en adaptadores. Cada uno tiene su propia función load() que transforma los datos (vengan en JSON, CSV, etc.) a un formato común llamado StandardDeal. En estos adaptadores también podríamos definir cosas como el color que va a tener ese CRM, qué ícono mostrar, etc.

Esto me permite agregar nuevos CRMs sin tocar el resto del código, simplemente creando un nuevo archivo en la carpeta /crms.

Además, toda la lógica de sincronización con la base de datos la pasé a una carpeta de servicios (/services). Y para manejar el estado general de la app armé un contexto (DealsContext) que centraliza los deals, el loading, y las acciones como “importar” o “actualizar datos”.

También dejé una carpeta de configuración (/lib/config) que se podría usar para definir el porcentaje de comisión. Aunque si el producto escala, lo ideal sería tener un perfil de administrador donde se pueda setear esa comisión desde la interfaz, o incluso crear nuevos CRMs para importar directamente desde ahí y que cada uno tenga su configuración asociada.


## ✨ Funcionalidades

- ✅ Importación de datos desde CRM A (JSON) y CRM B (CSV)
- ✅ Transformación de datos a un formato unificado (`StandardDeal`)
- ✅ Cálculo automático de comisiones (10%)
- ✅ Tabla de deals paginada y ordenable por monto y fecha
- ✅ Dashboard con métricas globales y por CRM (cantidad y total de comisiones)
- ✅ Validación para evitar duplicados en la base de datos
- ✅ Feedback visual con toasts para cada acción
- ✅ Carga inicial de datos desde el server sin parpadeo (usando `initialDeals`)
- ✅ Deploy en Vercel con Prisma configurado para `rhel-openssl-3.0.x`

---


---

## 🧪 Deploy

🔗 [commission-dashboard.vercel.app](https://commission-dashboard.vercel.app)

---

## 🛠 Cómo correrlo local

1. Cloná el repo
```bash
git clone https://github.com/francojalil7/commission-dashboard.git
cd commission-dashboard
```

2. Instalá dependencias
```bash
pnpm install
```

3. Configurá el archivo `.env` (mando por mail)
```
DATABASE_URL=postgresql://user:pass@your-db.neon.tech/dbname?sslmode=require
```

4. Aplicá las migraciones y generá Prisma Client
```bash
npx prisma migrate deploy
npx prisma generate
```

5. Levantá el servidor
```bash
pnpm dev
```

---

## 📁 Estructura

```
src/
├── app/              # Rutas, layout y páginas
├── components/       # Componentes reutilizables
├── crms/             # Adapters y tipos por CRM
├── services/         # Fetch y lógica de comunicación
├── contexts/         # Context global (deals)
├── lib/              # Utilidades (stats, config, etc)
```
