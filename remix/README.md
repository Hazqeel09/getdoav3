# Welcome to Remix!

- 📖 [Remix docs](https://remix.run/docs)

## Pre

1. install things needed before running

```shellscript
pnpm i
```

2. setup the sqlite

```shellscript
npx prisma generate
```

```shellscript
npx prisma migrate deploy
```

3. Create .env based on .env.example. Ping @Hazqeel09 to get the necessary secrets if you are working on stuffs that need user to be logged in.

## Development

Do this while developing.

Run the dev server:

```shellscript
pnpm run dev
```

## Deployment

Do this to check everything is okay before submitting your PR.

First, build your app for production:

```sh
pnpm run build
```

Then run the app in production mode:

```sh
pnpm start
```

Now you'll need to pick a host to deploy it to.

### DIY

If you're familiar with deploying Node applications, the built-in Remix app server is production-ready.

Make sure to deploy the output of `pnpm run build`

- `build/server`
- `build/client`

## Styling

This template comes with [Tailwind CSS](https://tailwindcss.com/) already configured for a simple default starting experience. You can use whatever css framework you prefer. See the [Vite docs on css](https://vitejs.dev/guide/features.html#css) for more information.
