import React from 'react';
import { formatDate, orderStatusClass, orderStatusLabel } from '../../pages/doctor/doctorUtils';

const MedicineOrderCard = ({ order }) => {
  const statusClass = orderStatusClass(order.status);

  return (
    <article className="doctor-order-card">
      <div className="doctor-order-card__head">
        <div>
          <h3 className="doctor-order-card__id">{order.publicId}</h3>
          <p className="doctor-order-card__date">{formatDate(order.createdAt)}</p>
        </div>
        <span className={`doctor-status-pill ${statusClass}`}>
          {orderStatusLabel(order.status)}
        </span>
      </div>
      {order.items.length === 0 ? (
        <p className="doctor-order-card__empty">No medicines recorded for this order.</p>
      ) : (
        <ul className="doctor-order-card__items">
          {order.items.map((line, index) => (
            <li key={`${order.id}-${index}`}>
              <span className="doctor-order-card__medicine">{line.name}</span>
              <span className="doctor-order-card__qty">× {line.quantity}</span>
            </li>
          ))}
        </ul>
      )}
    </article>
  );
};

export default MedicineOrderCard;
