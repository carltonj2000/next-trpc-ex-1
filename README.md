# tRPC Next JS Example 1

```bash
yarn dev
```

## Code History

The code in this repository is based on the
[Build a Blog With the T3 Stack](https://youtu.be/syEWlxVFUrY)
video and the
[corresponding repo](https://github.com/TomDoesTech/trpc-tutorial).

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
yarn add @tailwindcss/typography daisyui
# add trpc support https://trpc.io/docs/nextjs
yarn add @trpc/client @trpc/server @trpc/react @trpc/next zod react-query
# add other development libraries
yarn add superjson jotai @prisma/client react-hook-form jsonwebtoken cookie nodemailer
# setup postgress
docker pull postgres:14.4-bullseye
docker run -d \
	--name trpc-postgres \
	-e POSTGRES_PASSWORD=secretpw \
	-e PGDATA=/var/lib/postgresql/data/pgdata \
	-v $PWD/db-data:/var/lib/postgresql/data \
  -p 5432:5432 \
	postgres
# prisma setup after --
npx prisma init
npx prisma migrate dev --name user
npx prisma migrate dev --name login_token
docker exec -it trpc-postgres psql -U postgres
# mailer
yarn add nodemailer
```

The following are psql commands.

```psql
\list
\c trpc-tut # select db
\dt # display tables
exit
```

The following are bash commands.

```bash
npx prisma studio
```
