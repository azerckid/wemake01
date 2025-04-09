# comunication at composer
> create these files, do not attempt to prefill any loader or action functions
> Create the route files, do not modify files that already exist. Only create new files
> abstract to /features/products/components/category-card.tsx use content as props
> abstract this component to /app/features/teams/components/team-card.tsx use props for content
> abstract to /features/community/components/reply.tsx use content as props

> @migrations Use this migration files to get the context you need to generate a seed.sql file to seed each table in the database. For 'profile_id' column this value 'a070a94d-d591-44f3-aea1-f6c45129df38', respect composite primary keys, unique values so on. Create at least 5 rows per table if possible, 1 row per table that contains a composite primary key.
Do not seed 'profile' use 'a070a94d-d591-44f3-aea1-f6c45129df38' for 'profile_id' everwhere

# CURSOR COMMAND
command-p : to search for files

# DRIZZLE SUPABASE INSTALL
```
> npm i drizzle-orm postgres --legacy-peer-deps
> npm i -D drizzle-kit --legacy-peer-deps
```

# DRIZZLE AFTER CODE SCHEMA.TS
```
> npm run db:generate   
> npm run db:migrate
```
# SUPABASE AI

# git 명령어
```
git 전역 사용자 설정

git config --global user.name "zizimoos"
git config --global user.email "zizimoos@gmail.com"

```

```
현재 커밋의 작성자 정보 수정

git commit --amend --reset-author
```

```
커밋 메시지 수정

git commit --amend -m "#3.42 Profile Pages"
```

```
이미 github에 push한 커밋의 정보 수정

git commit --amend -m "#3.42 Profile Pages"
git push --force
```

```
git reset --hard f29c00ef2db81a5fb7ff60f1729da72f3567afa9
git clean -fd && git checkout .
```
# 테스트유저
azerckid -> Daumkakao12!@

# Welcome to React Router!


A modern, production-ready template for building full-stack React applications using React Router.

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/remix-run/react-router-templates/tree/main/default)

## Features

- 🚀 Server-side rendering
- ⚡️ Hot Module Replacement (HMR)
- 📦 Asset bundling and optimization
- 🔄 Data loading and mutations
- 🔒 TypeScript by default
- 🎉 TailwindCSS for styling
- 📖 [React Router docs](https://reactrouter.com/)

## Getting Started

### Installation

Install the dependencies:

```bash
npm install
```

### Development

Start the development server with HMR:

```bash
npm run dev
```

Your application will be available at `http://localhost:5173`.

## Building for Production

Create a production build:

```bash
npm run build
```

## Deployment

### Docker Deployment

This template includes three Dockerfiles optimized for different package managers:

- `Dockerfile` - for npm
- `Dockerfile.pnpm` - for pnpm
- `Dockerfile.bun` - for bun

To build and run using Docker:

```bash
# For npm
docker build -t my-app .

# For pnpm
docker build -f Dockerfile.pnpm -t my-app .

# For bun
docker build -f Dockerfile.bun -t my-app .

# Run the container
docker run -p 3000:3000 my-app
```

The containerized application can be deployed to any platform that supports Docker, including:

- AWS ECS
- Google Cloud Run
- Azure Container Apps
- Digital Ocean App Platform
- Fly.io
- Railway

### DIY Deployment

If you're familiar with deploying Node applications, the built-in app server is production-ready.

Make sure to deploy the output of `npm run build`

```
├── package.json
├── package-lock.json (or pnpm-lock.yaml, or bun.lockb)
├── build/
│   ├── client/    # Static assets
│   └── server/    # Server-side code
```

## Styling

This template comes with [Tailwind CSS](https://tailwindcss.com/) already configured for a simple default starting experience. You can use whatever CSS framework you prefer.

---

Built with ❤️ using React Router.
