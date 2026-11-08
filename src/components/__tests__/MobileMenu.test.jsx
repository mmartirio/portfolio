import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import MobileMenu from '../MobileMenu';

describe('MobileMenu', () => {
  it('abre e fecha pelo botão e pela tecla Esc', () => {
    render(<MobileMenu />);
    const button = screen.getByRole('button', { name: 'Abrir menu' });
    expect(button).toHaveAttribute('aria-expanded', 'false');

    fireEvent.click(button);
    expect(screen.getByRole('button', { name: 'Fechar menu' })).toHaveAttribute('aria-expanded', 'true');

    fireEvent.keyDown(document, { key: 'Escape' });
    expect(screen.getByRole('button', { name: 'Abrir menu' })).toHaveAttribute('aria-expanded', 'false');
  });
});
