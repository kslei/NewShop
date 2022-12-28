import React from 'react';
import styles from '../styles/components/Rating.module.scss';

const Rating = ({ rate }) => (
  <div className={styles.Rating}>
    <input type="radio" id="star-5" name="rating" value="5" onChange={() => rate(5)} />
    <label htmlFor="star-5" title="very good"></label>
    <input type="radio" id="star-4" name="rating" value="4" onChange={() => rate(4)} />
    <label htmlFor="star-4" title="good"></label>
    <input type="radio" id="star-3" name="rating" value="3" onChange={() => rate(3)} />
    <label htmlFor="star-3" title="so-so"></label>
    <input type="radio" id="star-2" name="rating" value="2" onChange={() => rate(2)} />
    <label htmlFor="star-2" title="bad"></label>
    <input type="radio" id="star-1" name="rating" value="1" onChange={() => rate(1)} />
    <label htmlFor="star-1" title="very bad"></label>
  </div>
);
export default Rating;