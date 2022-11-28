import { createSlice } from "@reduxjs/toolkit";
import {
  countScore,
  determineOutcome,
  isMatchPlayed,
} from "../utils/teamTableHelperFunctions";

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
          state.teams.forEach((team) =>
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

      // Check if both team scores are set, set points accordingly.
      isMatchPlayed(currentMatch, team, opposingTeam);

      // Determine winner/tie + check if score has been adjusted.
      determineOutcome(currentMatch, team, opposingTeam);

      // Count and update scores for team scoreboard.
      countScore(state, team);
      countScore(state, opposingTeam);
    },
  },
});

export const { createTeam, updateScore } = TeamTableSlice.actions;

export const selectTeamTable = (state) =>
  state.TeamTable.teams.slice().sort((a, b) => b.points - a.points);
export const selectMatchTable = (state) => state.TeamTable.matches;

export default TeamTableSlice.reducer;
