import { getMaxInObj } from '../lib/util';

const handBallRules = {
  G: {
    name: 'Goalkeeper',
    initialPoint: 50,
    goalMade: 5,
    goalReceived: 2,
  },
  F: {
    name: 'Field Player',
    initialPoint: 20,
    goalMade: 1,
    goalReceived: 1,
  },
};

const handBall = [];
export const calculateHandball = async (readText, title, players) => {
  if (readText.length > 1) {
    for (let i = 0; i < readText.length; i++) {
      const args = readText[i].split(';');

      const hbObj = mapHandballObject(args);

      handBall.push(getPlayerRating(hbObj, players));
    }

    const winnerTeam = getWinnerTeam();

    await reCalculatePlayersRating(winnerTeam, players);

    return { title, players: handBall, winnerTeam };
  }
};

const getPlayerRating = (hbObj, players) => {
  const rule = handBallRules[hbObj.position];
  const rating =
    rule.initialPoint +
    hbObj.goalsMade * rule.goalMade -
    hbObj.goalsReceived * rule.goalReceived;

  players[hbObj.nickName] =
    typeof players[hbObj.nickName] !== 'undefined'
      ? (players[hbObj.nickName] += rating)
      : rating;

  hbObj.rating = rating;

  return hbObj;
};

const getWinnerTeam = () => {
  const teamScore = {};
  handBall.forEach((r) => {
    teamScore[r.team] =
      typeof teamScore[r.team] === 'undefined' ? 0 : teamScore[r.team];
    teamScore[r.team] += r.rating;
  });

  return getMaxInObj(teamScore, 'team', 'score');
};

const reCalculatePlayersRating = (winnerTeam, players) => {
  handBall.forEach((record) => {
    for (const property in players) {
      if (record.team === winnerTeam.team && record.nickName === property) {
        record.rating += 10;
        players[record.nickName] += 10;
      }
    }
  });
};

const mapHandballObject = (args) => {
  return {
    playerName: args[0],
    nickName: args[1],
    number: args[2],
    team: args[3],
    position: args[4],
    goalsMade: args[5],
    goalsReceived: args[6],
    rating: 0,
  };
};
