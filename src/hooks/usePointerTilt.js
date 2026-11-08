import { useEffect, useRef } from 'react';

export function usePointerTilt(apply, reset) {
  const ref = useRef(null);
  const rect = useRef(null);
  const pending = useRef(null);
  const frame = useRef(0);

  useEffect(() => {
    const invalidate = () => {
      rect.current = null;
    };
    window.addEventListener('scroll', invalidate, { passive: true });
    window.addEventListener('resize', invalidate);
    return () => {
      cancelAnimationFrame(frame.current);
      window.removeEventListener('scroll', invalidate);
      window.removeEventListener('resize', invalidate);
    };
  }, []);

  const onPointerMove = (event) => {
    if (event.pointerType === 'touch') return;
    pending.current = { x: event.clientX, y: event.clientY };
    if (frame.current) return;
    frame.current = requestAnimationFrame(() => {
      frame.current = 0;
      const el = ref.current;
      const point = pending.current;
      if (!el || !point) return;
      rect.current ??= el.getBoundingClientRect();
      const { left, top, width, height } = rect.current;
      const x = Math.min(1, Math.max(0, (point.x - left) / width));
      const y = Math.min(1, Math.max(0, (point.y - top) / height));
      apply(el, x, y);
    });
  };

  const onPointerLeave = () => {
    cancelAnimationFrame(frame.current);
    frame.current = 0;
    pending.current = null;
    rect.current = null;
    if (ref.current) reset(ref.current);
  };

  return { ref, onPointerMove, onPointerLeave };
}
