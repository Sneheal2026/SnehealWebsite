import React from 'react';
import { formatDate } from '../../pages/doctor/doctorUtils';

const PrescriptionGallery = ({ items, onOpen }) => {
  if (!items.length) {
    return null;
  }

  return (
    <div className="doctor-rx-gallery" role="list">
      {items.map((item) => (
        <button
          key={item.id}
          type="button"
          className="doctor-rx-thumb"
          onClick={() => onOpen(item)}
          role="listitem"
          aria-label={`Prescription from ${formatDate(item.createdAt)}`}
        >
          {item.imageUrl ? (
            <img src={item.imageUrl} alt="" loading="lazy" decoding="async" />
          ) : (
            <span className="doctor-rx-thumb__placeholder">No image</span>
          )}
          <span className="doctor-rx-thumb__date">{formatDate(item.createdAt)}</span>
        </button>
      ))}
    </div>
  );
};

export default PrescriptionGallery;
