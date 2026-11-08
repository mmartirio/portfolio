import { useEffect, useRef } from 'react';
import { prefersReducedMotion } from '../hooks/useScrollReveal';
import './ScrollFx.css';

const PARALLAX_LIMIT = 60;

// Efeitos ligados à rolagem:
// - barra de progresso
// - parallax em [data-parallax="velocidade"] (--parallax-y)
// - pilha de painéis em [data-stack] (--stack-p)
//
// Desempenho: só roda quando há rolagem/redimensionamento (um frame por vez)
// e faz TODAS as leituras de layout antes de qualquer escrita, para não
// forçar o navegador a recalcular o layout no meio do frame.
export default function ScrollFx() {
  const barRef = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion()) return undefined;

    // Deslocamento já aplicado em cada elemento com parallax: o
    // getBoundingClientRect inclui o translate, então descontamos.
    const applied = new WeakMap();
    let frame = 0;

    const update = () => {
      frame = 0;

      // ---------- Leituras ----------
      const y = window.scrollY;
      const vh = window.innerHeight;
      const max = Math.max(1, document.documentElement.scrollHeight - vh);

      const parallax = [...document.querySelectorAll('[data-parallax]')].map((el) => ({
        el,
        rect: el.getBoundingClientRect(),
      }));

      const stack = [...document.querySelectorAll('[data-stack]')];
      const stackRects = stack.map((el) => el.getBoundingClientRect());

      // ---------- Escritas ----------
      if (barRef.current) barRef.current.style.transform = `scaleX(${(y / max).toFixed(4)})`;

      for (const { el, rect } of parallax) {
        const current = applied.get(el) ?? 0;
        const top = rect.top - current;
        if (rect.bottom < -200 || top > vh + 200) continue;
        const speed = Number(el.dataset.parallax) || 0.15;
        const raw = (top + rect.height / 2 - vh / 2) * speed;
        const offset = Math.round(Math.max(-PARALLAX_LIMIT, Math.min(PARALLAX_LIMIT, raw)) * 10) / 10;
        if (offset !== current) {
          applied.set(el, offset);
          el.style.setProperty('--parallax-y', `${offset}px`);
        }
      }

      // Pilha: quanto o próximo painel já cobriu o atual (0 a 1).
      stack.forEach((el, i) => {
        const next = stackRects[i + 1];
        const rect = stackRects[i];
        const progress = next ? Math.min(1, Math.max(0, 1 - (next.top - rect.top) / rect.height)) : 0;
        el.style.setProperty('--stack-p', progress.toFixed(3));
      });
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    schedule();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, []);

  return <div className="scroll-progress" ref={barRef} aria-hidden="true" />;
}
