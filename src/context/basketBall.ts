import { getMaxInObj } from '../lib/util';

const basketBallRules = {
  G: {
    name: 'Guard',
    scoredPoints: 2,
    rebounds: 3,
    assists: 1,
  },
  F: {
    name: 'Forward',
    scoredPoints: 2,
    rebounds: 2,
    assists: 2,
  },
  C: {
    name: 'Center',
    scoredPoints: 2,
    rebounds: 1,
    assists: 3,
  },
};

const basketBall = [];
export const calculateBasketball = async (readText, title, players) => {
  if (readText.length > 1) {
    for (let i = 0; i < readText.length; i++) {
      const args = readText[i].split(';');

      const bbObj = mapBasketballObject(args);

      basketBall.push(getPlayerRating(bbObj, players));
    }

    const winnerTeam = getWinnerTeam();

    await reCalculatePlayersRating(winnerTeam, players);

    return { title, players: basketBall, winnerTeam };
  }
};

const getPlayerRating = (bbObj, players) => {
  const rule = basketBallRules[bbObj.position];
  const rating =
    bbObj.score * rule.scoredPoints +
    bbObj.rebounds * rule.rebounds +
    bbObj.assists * rule.assists;

  players[bbObj.nickName] =
    typeof players[bbObj.nickName] !== 'undefined'
      ? (players[bbObj.nickName] += rating)
      : rating;
  bbObj.rating = rating;

  return bbObj;
};

const getWinnerTeam = () => {
  const teamScore = {};
  basketBall.forEach((r) => {
    teamScore[r.team] =
      typeof teamScore[r.team] === 'undefined' ? 0 : teamScore[r.team];
    teamScore[r.team] += r.rating;
  });

  return getMaxInObj(teamScore, 'team', 'score');
};

const reCalculatePlayersRating = async (winnerTeam, players) => {
  basketBall.forEach((record) => {
    for (const property in players) {
      if (record.team === winnerTeam.team && record.nickName === property) {
        record.rating += 10;
        players[record.nickName] += 10;
      }
    }
  });
};

const mapBasketballObject = (args) => {
  return {
    playerName: args[0],
    nickName: args[1],
    number: args[2],
    team: args[3],
    position: args[4],
    score: args[5],
    rebounds: args[6],
    assists: args[7],
    rating: 0,
  };
};
