import { useEffect } from 'react';

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

// Revela elementos com [data-reveal] quando entram na tela. Os elementos só
// ficam escondidos quando a classe .motion-ready está no <html>, então sem JS
// ou com "reduzir movimento" o conteúdo aparece normalmente.
export function useScrollReveal() {
  useEffect(() => {
    if (prefersReducedMotion() || !('IntersectionObserver' in window)) return undefined;

    const root = document.documentElement;
    root.classList.add('motion-ready');

    // Elemento observado -> elementos a revelar. Títulos com efeito "mask"
    // começam recortados (clip-path) com largura zero, e o Chrome considera
    // esse recorte na interseção; por isso observamos o elemento pai deles.
    const watched = new Map();

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          watched.get(entry.target)?.forEach((el) => el.classList.add('is-visible'));
          watched.delete(entry.target);
          io.unobserve(entry.target);
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
    );

    const observeAll = () => {
      document.querySelectorAll('[data-reveal]:not(.is-visible)').forEach((el) => {
        const target = el.dataset.reveal === 'mask' && el.parentElement ? el.parentElement : el;
        if (!watched.has(target)) {
          watched.set(target, new Set());
          io.observe(target);
        }
        watched.get(target).add(el);
      });
    };
    observeAll();

    // Cards podem ser re-renderizados quando os dados ao vivo chegam.
    const mo = new MutationObserver(observeAll);
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
      root.classList.remove('motion-ready');
    };
  }, []);
}

export { prefersReducedMotion };
