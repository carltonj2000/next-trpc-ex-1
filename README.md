# tRPC Next JS Example 1

## Code History

```bash
# create app
yarn create next-app next-trpc-ex-1 --typescript
cd next-trpc-ex-1
mkdir src
mv pages src
mv styles src
mv public src
# swc next issue solved https://stackoverflow.com/questions/72133316/ubuntu-22-04-libssl-so-1-1-cannot-open-shared-object-file-no-such-file-or-di
wget http://nz2.archive.ubuntu.com/ubuntu/pool/main/o/openssl/libssl1.1_1.1.1l-1ubuntu1.6_amd64.deb
sudo dpkg -i libssl1.1_1.1.1l-1ubuntu1.6_amd64.deb
# add tailwind css https://tailwindcss.com/docs/guides/nextjs
yarn add -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
# add trpc support https://trpc.io/docs/nextjs
yarn add @trpc/client @trpc/server @trpc/react @trpc/next zod react-query
# add other development libraries
yarn add superjson jotai @prisma/client react-hook-form jsonwebtoken cookie nodemailer
# prisma setup after --
npx prisma init
npx prisma migrate dev --name
```
