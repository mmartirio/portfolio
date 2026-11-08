import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import Projects from '../Projects';
import { projects } from '../../data/projects';

afterEach(() => vi.unstubAllGlobals());

describe('Projects', () => {
  it('mostra os produtos e, nos estudos, só tecnologias e skills', () => {
    vi.stubGlobal('fetch', vi.fn(() => new Promise(() => {})));
    render(<Projects />);
    expect(screen.getAllByRole('article')).toHaveLength(projects.length);
    expect(screen.getByRole('heading', { name: 'Estudos e práticas' })).toBeInTheDocument();
    expect(screen.getByText('Tecnologias estudadas')).toBeInTheDocument();
    expect(screen.getByText('Skills aplicadas')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Rotas e SPAs' })).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /TO-DO List/ })).not.toBeInTheDocument();
  });

  it('troca pelos dados lidos ao vivo dos sites', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(async () =>
        Response.json({
          projects: [
            { id: 'x', url: 'https://x.com', name: 'Nome ao vivo', description: 'Descrição ao vivo', category: 'Site', technologies: 'Next.js' },
          ],
        }),
      ),
    );
    render(<Projects />);
    expect(await screen.findByRole('heading', { name: 'Nome ao vivo' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Ver projeto Nome ao vivo/ })).toHaveAttribute('href', 'https://x.com');
    expect(screen.getByText('ao vivo')).toBeInTheDocument();
  });
});
