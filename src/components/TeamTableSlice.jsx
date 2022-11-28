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
  },
});

export const { createTeam } = TeamTableSlice.actions;

export const selectTeamTable = (state) => state.TeamTable.teams;
export const selectMatchTable = (state) => state.TeamTable.matches;

export default TeamTableSlice.reducer;
