# NotesGPT
Easily access and organize your notes with our AI assistant. Enhance your workflow with NoteGPT.
You can access the application at [notesgpt.me](https://notesgpt.me)

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

<br />

### Setup the Environment

To configure the necessary environment variables, use the provided [`env.example`](https://github.com/abdulrehmandev/notes-gpt/blob/master/.env.example) file.

#### Important Environment Variables Overview

**Supabase**:  
Used to access the database to store embeddings (vectors) which are unsupported by Prisma.
```plaintext
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```
**Cloudinary**:
Used to store images in the cloud.
```plaintext
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
NEXT_PUBLIC_CLOUDINARY_API_KEY=
NEXT_PUBLIC_CLOUDINARY_API_SECRET=
```
**OpenAI**: 
Used to access `text-embeddings-ada-002` and `gpt-3.5-turbo`
```plaintext
OPENAI_KEY=
```

## Tech Stack and Deployment

#### Frontend

- Next.js
- Tailwind CSS
- Shadcn UI
- Lucide Icons

#### Backend

- Prisma
- PostgreSQL (Supabase)

#### Authentication

- NextAuth.js
- GitHub OAuth

#### Integrations

- OpenAI
- Cloudinary
- Editor.js

#### Languages and Tools

- TypeScript
- Zod

#### Deployment

- Vercel

## Learn More

To learn more about the technologies, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Shadcn](https://shadcn-extension.vercel.app/docs/introduction) - learn how to use Shadcn UI
- [Lucide Icons](https://lucide.dev/) - Lucide icons library
- [Tailwind CSS](https://v2.tailwindcss.com/docs) - css framework
- [Prisma](https://www.prisma.io/docs) - typesafe ORM for databases
- [PostgreSQL](https://www.postgresql.org/docs/) - opensource relational database
- [Supabase](https://supabase.com/docs) - opnesource backend / database platform
- [OpenAI Documentation](https://platform.openai.com/docs/introduction) - learn about OpenAI models and its pricing.
- [NextAuth](https://next-auth.js.org/) - opensource authentication solution
- [Cloudinary](https://cloudinary.com/documentation/) - cloud service to store media
- [Editor.js](https://editorjs.io/) - opensource block style editor
- [Zod](https://zod.dev/) - typescript schema validator
- [Vercel](https://vercel.com/docs) - cloud platform to deploy and host applications
