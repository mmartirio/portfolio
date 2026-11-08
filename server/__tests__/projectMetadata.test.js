import { describe, it, expect } from 'vitest';
import {
  parseMetadata,
  cleanName,
  cleanDescription,
  resolveUrl,
  mergeProject,
  getProjects,
} from '../projectMetadata.js';

const html = `<!doctype html><html><head>
  <meta charset="utf-8">
  <title>Davi Foto V&iacute;deo</title>
  <meta content="#7a3e65" name="theme-color">
  <meta property="og:title" content="Davi Foto Vídeo | Fotografia em Sergipe" />
  <meta name="description" content="Fotos &amp; vídeos de casamentos." />
  <meta property="og:image" content="http://localhost:3000/exemplos/foto.jpg" />
  <link rel="icon" href="/favicon.png" />
</head><body></body></html>`;

describe('parseMetadata', () => {
  it('lê título, descrição, imagem, cor e ícone', () => {
    const meta = parseMetadata(html, 'https://www.exemplo.com.br/');
    expect(meta.title).toBe('Davi Foto Vídeo | Fotografia em Sergipe');
    expect(meta.description).toBe('Fotos & vídeos de casamentos.');
    expect(meta.themeColor).toBe('#7a3e65');
    expect(meta.icon).toBe('https://www.exemplo.com.br/favicon.png');
  });

  it('corrige og:image publicada apontando para localhost', () => {
    const meta = parseMetadata(html, 'https://www.exemplo.com.br/');
    expect(meta.image).toBe('https://www.exemplo.com.br/exemplos/foto.jpg');
  });
});

describe('limpeza dos metadados', () => {
  it('usa a primeira parte do título como nome', () => {
    expect(cleanName('Davi Foto Vídeo | Fotografia em Sergipe')).toBe('Davi Foto Vídeo');
    expect(cleanName('Oia a Conta - Restaurantes')).toBe('Oia a Conta');
  });

  it('ignora títulos genéricos', () => {
    expect(cleanName('Document')).toBeNull();
    expect(cleanName('React App')).toBeNull();
  });

  it('ignora descrição padrão do create-react-app e remove prefixo repetido', () => {
    expect(cleanDescription('Web site created using create-react-app', 'X')).toBeNull();
    expect(cleanDescription('Oia a Conta - sistema de pedidos', 'Oia a Conta')).toBe('Sistema de pedidos');
  });

  it('resolve URLs relativas', () => {
    expect(resolveUrl('/og', 'https://site.vercel.app/page')).toBe('https://site.vercel.app/og');
    expect(resolveUrl(null, 'https://site.vercel.app')).toBeNull();
  });
});

describe('mergeProject', () => {
  const config = {
    id: 'a',
    url: 'https://a.com',
    fallback: { name: 'Nome local', description: 'Descrição local' },
  };

  it('prefere os dados ao vivo', () => {
    const merged = mergeProject(config, { title: 'Nome novo', description: 'Nova descrição' });
    expect(merged.name).toBe('Nome novo');
    expect(merged.description).toBe('Nova descrição');
    expect(merged.live).toBe(true);
  });

  it('usa o fallback quando o site não responde', () => {
    const merged = mergeProject(config, null);
    expect(merged.name).toBe('Nome local');
    expect(merged.live).toBe(false);
  });

  it('override sempre vence', () => {
    const merged = mergeProject({ ...config, override: { name: 'Fixo' } }, { title: 'Ao vivo' });
    expect(merged.name).toBe('Fixo');
  });
});

describe('getProjects', () => {
  const page = (title) => new Response(`<title>${title}</title>`, { status: 200 });

  it('descobre projetos novos do Vercel e ignora conhecidos/excluídos', async () => {
    const fetchImpl = async (url) => {
      if (url.startsWith('https://api.vercel.com')) {
        return Response.json({
          projects: [
            { name: 'novo-projeto', framework: 'nextjs', updatedAt: 2, targets: { production: { alias: ['*.x.com', 'novo.com'] } } },
            { name: 'conhecido', targets: { production: { alias: ['conhecido.com'] } } },
            { name: 'portfolio', targets: { production: { alias: ['portfolio.com'] } } },
          ],
        });
      }
      return page(url.includes('novo') ? 'Projeto Novo' : 'Conhecido');
    };

    const list = await getProjects({
      projects: [{ id: 'c', vercelProject: 'conhecido', url: 'https://conhecido.com', fallback: { name: 'C' } }],
      excluded: ['portfolio'],
      env: { VERCEL_API_TOKEN: 'token' },
      fetchImpl,
    });

    expect(list.map((p) => p.name)).toEqual(['Projeto Novo', 'Conhecido']);
    expect(list[0].url).toBe('https://novo.com');
    expect(list[0].technologies).toBe('Next.js · React');
  });

  it('sem token não chama a API do Vercel', async () => {
    const calls = [];
    const fetchImpl = async (url) => {
      calls.push(url);
      return page('Site');
    };
    await getProjects({ projects: [{ id: 'a', url: 'https://a.com' }], env: {}, fetchImpl });
    expect(calls).toEqual(['https://a.com']);
  });
});
