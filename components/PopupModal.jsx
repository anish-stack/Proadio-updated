import { useEffect } from 'react';

export default function PopupModal({ isOpen, onClose, title, children, size = 'md' }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  if (!isOpen) return null;

  const maxW = { sm: 420, md: 560, lg: 760, xl: 960 }[size] || 560;

  return (
    <div
      onClick={(e) => e.target === e.currentTarget && onClose()}
      style={{
        position: 'fixed', inset: 0, zIndex: 9000,
        background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(4px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 16, animation: 'fadeIn 0.2s ease',
      }}
    >
      <div style={{
        background: 'var(--color-white)',
        borderRadius: 'var(--radius-xl)',
        width: '100%', maxWidth: maxW,
        maxHeight: '90vh', overflowY: 'auto',
        position: 'relative',
        animation: 'slideUp 0.25s ease',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
      }}>
        {/* Header */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '20px 24px', borderBottom: '1px solid var(--color-border)',
          position: 'sticky', top: 0, background: 'var(--color-white)', zIndex: 1,
          borderRadius: 'var(--radius-xl) var(--radius-xl) 0 0',
        }}>
          {title && <h3 style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--color-text)' }}>{title}</h3>}
          <button
            onClick={onClose}
            style={{
              marginLeft: 'auto', background: 'var(--color-bg-alt)', border: 'none',
              width: 36, height: 36, borderRadius: '50%', cursor: 'pointer',
              fontSize: '1.2rem', display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'var(--color-text-muted)', transition: 'var(--transition)',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'var(--color-primary)'; e.currentTarget.style.color = 'var(--color-secondary)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'var(--color-bg-alt)'; e.currentTarget.style.color = 'var(--color-text-muted)'; }}
            aria-label="Close"
          >✕</button>
        </div>
        {/* Body */}
        <div style={{ padding: '24px' }}>{children}</div>
      </div>
      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { transform: translateY(24px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
      `}</style>
    </div>
  );
}
