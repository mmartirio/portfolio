import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Footer from '../Footer';

describe('Footer', () => {
  it('renderiza os cartões de contato com seus endereços', () => {
    render(<Footer />);
    expect(screen.getByRole('link', { name: 'WhatsApp: (79) 99107-1656' })).toHaveAttribute(
      'href',
      expect.stringContaining('wa.me/5579991071656'),
    );
    expect(screen.getByRole('link', { name: /^LinkedIn:/ })).toHaveAttribute(
      'href',
      expect.stringContaining('linkedin.com/in/'),
    );
    expect(screen.getByRole('link', { name: 'GitHub: @mmartirio' })).toHaveAttribute('href', 'https://github.com/mmartirio');
  });

  it('tem o e-mail como link mailto, sem abrir nova aba', () => {
    render(<Footer />);
    const email = screen.getByRole('link', { name: 'E-mail: marcos.martirio@gmail.com' });
    expect(email).toHaveAttribute('href', expect.stringMatching(/^mailto:marcos\.martirio@gmail\.com/));
    expect(email).not.toHaveAttribute('target');
  });

  it('tem a chamada de contato e o link para voltar ao topo', () => {
    render(<Footer />);
    expect(screen.getByRole('heading', { name: /Vamos tirar sua ideia/ })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Voltar ao topo/ })).toHaveAttribute('href', '#home');
  });
});
