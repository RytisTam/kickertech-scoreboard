export const countScore = (state, team) => {
  let countDraws = 0;
  let countWins = 0;
  let countLoses = 0;
  let countPoints = 0;

  state.matches.map((match) => {
    if (match.hasOwnProperty(team.teamName) && match.outcome !== null) {
      if (match.outcome === "draw") {
        countDraws++;
      } else if (match.winner === team.teamName) {
        countWins++;
      } else {
        countLoses++;
      }
    }
  });
  countPoints = countDraws + countWins * 3;

  return (
    (team.win = countWins),
    (team.draw = countDraws),
    (team.lost = countLoses),
    (team.points = countPoints)
  );
};

export const isMatchPlayed = (currentMatch, team, opposingTeam) => {
  if (currentMatch.played === false) {
    if (
      currentMatch[team.teamName] !== null &&
      currentMatch[opposingTeam.teamName] !== null
    ) {
      currentMatch.played = true;
      team.played++;
      opposingTeam.played++;
    }
  }
};

export const determineOutcome = (currentMatch, team, opposingTeam) => {
  if (
    currentMatch[team.teamName] !== null &&
    currentMatch[opposingTeam.teamName] !== null
  ) {
    if (currentMatch[team.teamName] === currentMatch[opposingTeam.teamName]) {
      currentMatch.outcome = "draw";
    } else if (
      currentMatch[team.teamName] > currentMatch[opposingTeam.teamName]
    ) {
      currentMatch.outcome = "has winner";
      currentMatch.winner = team.teamName;
    } else {
      currentMatch.outcome = "has winner";
      currentMatch.winner = opposingTeam.teamName;
    }
  }
};
