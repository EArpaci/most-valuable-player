import { calculateBasketball } from '../context/basketBall';
import { calculateHandball } from '../context/handBall';
import { getMaxInObj } from './util';

let players = {};

export async function calculateMVP(title, readText) {
  switch (title) {
    case 'BASKETBALL':
      return calculateBasketball(readText, title, players);

    case 'HANDBALL':
      return calculateHandball(readText, title, players);

    default:
      return alert(`No class found for ${title}`);
  }
}

export async function getMVP() {
  return getMaxInObj(players, 'player', 'score');
}
