// Vercel Function: GET /api/projects
// Retorna a lista de projetos com nome, descrição e imagem lidos ao vivo
// de cada site publicado. A CDN guarda a resposta por 1h e serve a versão
// anterior enquanto revalida, então o portfólio fica rápido e atualizado.
import { getProjects } from '../server/projectMetadata.js';
import { projects, excludedVercelProjects } from '../src/data/projects.js';

export async function GET() {
  const list = await getProjects({
    projects,
    excluded: excludedVercelProjects,
    env: process.env,
  });

  return Response.json(
    { projects: list, generatedAt: new Date().toISOString() },
    {
      headers: {
        'cache-control': 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400',
      },
    },
  );
}
