import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Header from '../Header';

describe('Header', () => {
  it('renderiza o título e os links de navegação', () => {
    render(<Header />);
    expect(screen.getByText('Portfólio')).toBeInTheDocument();
    const contatoLinks = screen.getAllByRole('link', { name: 'Contato' });
    expect(contatoLinks.length).toBeGreaterThan(0);
    contatoLinks.forEach((link) => expect(link).toHaveAttribute('href', '#fale-comigo'));
  });
});
