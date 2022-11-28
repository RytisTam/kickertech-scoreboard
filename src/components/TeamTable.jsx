import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { MatchHistory } from "./MatchHistory";
import { selectTeamTable, createTeam } from "./TeamTableSlice";

export const TeamTable = () => {
  const teamData = useSelector(selectTeamTable);
  const dispatch = useDispatch();

  function addNewTeam(e) {
    e.preventDefault();
    dispatch(createTeam(e.target.elements.teamname.value));
  }

  return (
    <>
      <div className="container">
        <div>
          <form className="newTeamInput" onSubmit={(e) => addNewTeam(e)}>
            <input
              type="text"
              id="teamname"
              name="teamname"
              placeholder="New team"
            />
            <input type="submit" value="Add" />
          </form>

          <div className="scoreboard">
            <div className="teamTable">
              <table>
                <thead>
                  <tr>
                    <th>Place</th>
                    <th>Team</th>
                    <th>Played</th>
                    <th>Win</th>
                    <th>Draw</th>
                    <th>Lost</th>
                    <th>Points</th>
                  </tr>
                </thead>
                <tbody>
                  {teamData.map((team, idx) => (
                    <tr key={idx}>
                      <td>{idx + 1}</td>
                      <td>{team.teamName}</td>
                      <td>{team.played}</td>
                      <td>{team.win}</td>
                      <td>{team.draw}</td>
                      <td>{team.lost}</td>
                      <td>{team.points}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <MatchHistory />
          </div>
        </div>
      </div>
    </>
  );
};
