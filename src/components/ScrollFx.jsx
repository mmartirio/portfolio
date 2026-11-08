import { useEffect } from 'react';
import { prefersReducedMotion } from '../hooks/useScrollReveal';
import './ScrollFx.css';

// Um único loop de animação para todos os efeitos ligados à rolagem:
// - barra de progresso (--scroll-progress no <html>)
// - parallax em [data-parallax="velocidade"]
// - pilha de painéis em [data-stack] (--stack-p)
export default function ScrollFx() {
  useEffect(() => {
    if (prefersReducedMotion()) return undefined;

    const root = document.documentElement;
    let frame = 0;

    const tick = () => {
      const y = window.scrollY;
      const vh = window.innerHeight;
      const max = Math.max(1, root.scrollHeight - vh);

      root.style.setProperty('--scroll-progress', (y / max).toFixed(4));

      document.querySelectorAll('[data-parallax]').forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.bottom < -200 || rect.top > vh + 200) return;
        const speed = Number(el.dataset.parallax) || 0.15;
        const raw = (rect.top + rect.height / 2 - vh / 2) * speed;
        const offset = Math.max(-60, Math.min(60, raw));
        el.style.setProperty('--parallax-y', `${offset.toFixed(1)}px`);
      });

      // Pilha de painéis: quanto o próximo já cobriu o atual (0 a 1).
      const stack = document.querySelectorAll('[data-stack]');
      stack.forEach((el, i) => {
        const next = stack[i + 1];
        let progress = 0;
        if (next) {
          const rect = el.getBoundingClientRect();
          const nextTop = next.getBoundingClientRect().top;
          progress = Math.min(1, Math.max(0, 1 - (nextTop - rect.top) / rect.height));
        }
        el.style.setProperty('--stack-p', progress.toFixed(3));
      });

      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  return <div className="scroll-progress" aria-hidden="true" />;
}
