import React, { useEffect } from 'react';

const ImagePreviewModal = ({ src, alt, onClose }) => {
  useEffect(() => {
    if (!src) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [src, onClose]);

  if (!src) return null;

  return (
    <div
      className="doctor-modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-label={alt || 'Image preview'}
      onClick={onClose}
    >
      <div className="doctor-modal" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="doctor-modal__close" onClick={onClose}>
          Close
        </button>
        <img src={src} alt={alt || 'Preview'} className="doctor-modal__img" />
      </div>
    </div>
  );
};

export default ImagePreviewModal;
