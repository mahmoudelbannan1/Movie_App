import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as fasStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';

const StarRating = ({ rating }) => {
  const stars = [];
  const roundedRating = Math.round(rating * 2) / 2; 

  for (let i = 1; i <= 5; i++) {
    if (i <= roundedRating) {
      stars.push(<FontAwesomeIcon icon={fasStar} />);
    } else if (i === Math.ceil(roundedRating) && roundedRating % 1 !== 0) {
      stars.push(<FontAwesomeIcon icon={faStarHalfAlt} />);
    } else {
      stars.push(<FontAwesomeIcon icon={farStar} />);
    }
  }

  return <div style={{ color: 'var(--mainColor)' }}>{stars}</div>;
};

export default StarRating;