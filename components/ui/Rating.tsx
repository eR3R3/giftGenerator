'use client'

import React, {useEffect, useState} from 'react';
import styled from 'styled-components';

const Rating = ({getContent, id}:{getContent: any, id: number}) => {
  const [rating, setRating] = useState<number>(0);

  const handleRatingChange = (e: any) => {
    const newRating = Number(e.target.value);
    setRating(newRating);
    getContent(newRating, id);
  };

  return (
      <StyledWrapper>
        <div className="rating">
          <input
              type="radio"
              id={`star-1-${id}`}
              name={`star-radio-${id}`}
              value="5"
              checked={rating === 5}
              onChange={handleRatingChange}
          />
          <label htmlFor={`star-1-${id}`}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path pathLength={360} d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z" />
            </svg>
          </label>

          <input
              type="radio"
              id={`star-2-${id}`}
              name={`star-radio-${id}`}
              value="4"
              checked={rating === 4}
              onChange={handleRatingChange}
          />
          <label htmlFor={`star-2-${id}`}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path pathLength={360} d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z" />
            </svg>
          </label>

          <input
              type="radio"
              id={`star-3-${id}`}
              name={`star-radio-${id}`}
              value="3"
              checked={rating === 3}
              onChange={handleRatingChange}
          />
          <label htmlFor={`star-3-${id}`}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path pathLength={360} d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z" />
            </svg>
          </label>

          <input
              type="radio"
              id={`star-4-${id}`}
              name={`star-radio-${id}`}
              value="2"
              checked={rating === 2}
              onChange={handleRatingChange}
          />
          <label htmlFor={`star-4-${id}`}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path pathLength={360} d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z" />
            </svg>
          </label>

          <input
              type="radio"
              id={`star-5-${id}`}
              name={`star-radio-${id}`}
              value="1"
              checked={rating === 1}
              onChange={handleRatingChange}
          />
          <label htmlFor={`star-5-${id}`}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path pathLength={360} d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z" />
            </svg>
          </label>
        </div>
      </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .rating {
    display: flex;
    flex-direction: row-reverse;
    gap: 0.3rem;
    --stroke: #666;
    --fill: #ffc73a;
  }

  .rating input {
    appearance: unset;
  }

  .rating label {
    cursor: pointer;
  }

  .rating svg {
    width: 2rem;
    height: 2rem;
    overflow: visible;
    fill: transparent;
    stroke: var(--stroke);
    stroke-linejoin: bevel;
    stroke-dasharray: 12;
    animation: idle 4s linear infinite;
    transition: stroke 0.2s, fill 0.5s;
  }

  @keyframes idle {
    from {
      stroke-dashoffset: 24;
    }
  }

  .rating label:hover svg {
    stroke: var(--fill);
  }

  .rating input:checked ~ label svg {
    transition: 0s;
    animation: idle 4s linear infinite, yippee 0.75s backwards;
    fill: var(--fill);
    stroke: var(--fill);
    stroke-opacity: 0;
    stroke-dasharray: 0;
    stroke-linejoin: miter;
    stroke-width: 8px;
  }

  @keyframes yippee {
    0% {
      transform: scale(1);
      fill: var(--fill);
      fill-opacity: 0;
      stroke-opacity: 1;
      stroke: var(--stroke);
      stroke-dasharray: 10;
      stroke-width: 1px;
      stroke-linejoin: bevel;
    }

    30% {
      transform: scale(0);
      fill: var(--fill);
      fill-opacity: 0;
      stroke-opacity: 1;
      stroke: var(--stroke);
      stroke-dasharray: 10;
      stroke-width: 1px;
      stroke-linejoin: bevel;
    }

    30.1% {
      stroke: var(--fill);
      stroke-dasharray: 0;
      stroke-linejoin: miter;
      stroke-width: 8px;
    }

    60% {
      transform: scale(1.2);
      fill: var(--fill);
    }
  }`;

export default Rating;
