import { createSlice } from "@reduxjs/toolkit";

export const TeamTableSlice = createSlice({
  name: "TeamTable",
  initialState: { teams: [], matches: [] },
  reducers: {
    createTeam: (state, action) => {
      if (
        state.teams.find(({ teamName }) => teamName === action.payload) ===
          undefined &&
        action.payload !== ""
      ) {
        state.teams.push({
          teamName: action.payload,
          played: 0,
          win: 0,
          draw: 0,
          lost: 0,
          points: 0,
        });

        // Create a new match for every existing team, with newly added team
        // team.teamName - existing teams (from .map) / action.payload - newly added team.
        if (state.teams.length > 1) {
          state.teams.map((team) =>
            team.teamName !== action.payload
              ? state.matches.push({
                  [team.teamName]: null,
                  [action.payload]: null,
                  played: false,
                  outcome: null,
                  winner: null,
                })
              : ""
          );
        }
      }
    },
    updateScore: (state, action) => {
      const currentMatch = state.matches[action.payload.matchID];
      const team = state.teams.find(
        ({ teamName }) => teamName === action.payload.team
      );
      const opposingTeam = state.teams.find(
        ({ teamName }) => teamName === action.payload.opposingTeam
      );

      // Set match score
      currentMatch[action.payload.team] = Number(action.payload.score);

      const countScore = (state, team) => {
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

      if (
        currentMatch[team.teamName] !== null &&
        currentMatch[opposingTeam.teamName] !== null
      ) {
        if (
          currentMatch[team.teamName] === currentMatch[opposingTeam.teamName]
        ) {
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

      // Count and update scores for team scoreboard.
      countScore(state, team);
      countScore(state, opposingTeam);
    },
  },
});

export const { createTeam } = TeamTableSlice.actions;

export const selectTeamTable = (state) => state.TeamTable.teams;
export const selectMatchTable = (state) => state.TeamTable.matches;

export default TeamTableSlice.reducer;
