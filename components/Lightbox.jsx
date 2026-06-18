import { useEffect, useCallback } from 'react';

export default function Lightbox({ images, currentIndex, onClose, onPrev, onNext }) {
  const img = images[currentIndex];

  const handleKey = useCallback((e) => {
    if (e.key === 'Escape') onClose();
    if (e.key === 'ArrowLeft') onPrev();
    if (e.key === 'ArrowRight') onNext();
  }, [onClose, onPrev, onNext]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKey);
    };
  }, [handleKey]);

  if (!img) return null;

  return (
    <div
      onClick={(e) => e.target === e.currentTarget && onClose()}
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: 'rgba(0,0,0,0.92)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        animation: 'fadeIn 0.2s ease',
      }}
    >
      {/* Close */}
      <button onClick={onClose} style={{
        position: 'absolute', top: 20, right: 20,
        background: 'rgba(255,255,255,0.12)', border: 'none', color: '#fff',
        width: 44, height: 44, borderRadius: '50%', fontSize: '1.3rem',
        cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2,
        transition: 'background 0.2s',
      }}
        onMouseEnter={e => e.currentTarget.style.background = 'rgba(212,175,55,0.3)'}
        onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.12)'}
      >✕</button>

      {/* Counter */}
      <div style={{ position: 'absolute', top: 24, left: '50%', transform: 'translateX(-50%)', color: 'rgba(255,255,255,0.6)', fontSize: '0.88rem', fontWeight: 600 }}>
        {currentIndex + 1} / {images.length}
      </div>

      {/* Prev */}
      {currentIndex > 0 && (
        <button onClick={onPrev} style={{
          position: 'absolute', left: 20, top: '50%', transform: 'translateY(-50%)',
          background: 'rgba(255,255,255,0.12)', border: 'none', color: '#fff',
          width: 50, height: 50, borderRadius: '50%', fontSize: '1.4rem',
          cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2,
          transition: 'background 0.2s',
        }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(212,175,55,0.3)'}
          onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.12)'}
        >‹</button>
      )}

      {/* Next */}
      {currentIndex < images.length - 1 && (
        <button onClick={onNext} style={{
          position: 'absolute', right: 20, top: '50%', transform: 'translateY(-50%)',
          background: 'rgba(255,255,255,0.12)', border: 'none', color: '#fff',
          width: 50, height: 50, borderRadius: '50%', fontSize: '1.4rem',
          cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2,
          transition: 'background 0.2s',
        }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(212,175,55,0.3)'}
          onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.12)'}
        >›</button>
      )}

      {/* Image */}
      <div style={{ maxWidth: '85vw', maxHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
        <img
          src={img.url}
          alt={img.altText || img.caption || 'Gallery image'}
          style={{ maxWidth: '100%', maxHeight: '72vh', objectFit: 'contain', borderRadius: 12 }}
        />
        {img.caption && (
          <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.92rem', textAlign: 'center', padding: '8px 16px', background: 'rgba(0,0,0,0.5)', borderRadius: 8 }}>
            {img.caption}
            {img.eventName && <span style={{ color: 'var(--color-primary)', marginLeft: 8 }}>— {img.eventName}</span>}
          </div>
        )}
      </div>

      <style>{`@keyframes fadeIn { from { opacity:0 } to { opacity:1 } }`}</style>
    </div>
  );
}
