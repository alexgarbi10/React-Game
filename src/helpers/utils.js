import React from 'react';

export const UP = 'UP';
export const DOWN = 'DOWN';
export const LEFT = 'LEFT';
export const RIGHT = 'RIGHT';

export const getSide = (arr) => arr[Math.floor(Math.random() * arr.length)];
