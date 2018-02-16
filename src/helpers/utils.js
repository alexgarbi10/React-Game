import React from 'react';

export const UP = 'UP';
export const DOWN = 'DOWN';
export const LEFT = 'LEFT';
export const RIGHT = 'RIGHT';

export const EASY = {
	color: 'green',
	speed: 2
};

export const MEDIUM = {
	color: 'darkgray',
	speed: 4
};

export const HARD = {
	color: 'firebrick',
	speed: 6
};

export const getElement = (arr) => arr[Math.floor(Math.random() * arr.length)];
