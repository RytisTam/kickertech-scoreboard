import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectMatchTable, updateScore } from "./TeamTableSlice";

export const MatchHistory = () => {
  const matchData = useSelector(selectMatchTable);
  const dispatch = useDispatch();

  return (
    <>
      <div className="matchHistory">
        <table>
          <tbody>
            {matchData.map((match, idx) => {
              return (
                <tr key={idx}>
                  <td>{Object.keys(match)[0]}</td>
                  <td>
                    <span>
                      <input
                        type="number"
                        min="0"
                        max="999"
                        disabled={
                          match[Object.keys(match)[0]] !== null ? true : false
                        }
                        value={
                          match[Object.keys(match)[0]] !== null
                            ? match[Object.keys(match)[0]]
                            : ""
                        }
                        onChange={(e) =>
                          dispatch(
                            updateScore({
                              matchID: idx,
                              team: Object.keys(match)[0],
                              opposingTeam: Object.keys(match)[1],
                              score: Number(e.target.value),
                            })
                          )
                        }
                      />
                    </span>
                  </td>
                  <td>:</td>
                  <td>
                    <span>
                      <input
                        type="number"
                        min="0"
                        max="999"
                        disabled={
                          match[Object.keys(match)[1]] !== null ? true : false
                        }
                        value={
                          match[Object.keys(match)[1]] !== null
                            ? match[Object.keys(match)[1]]
                            : ""
                        }
                        onChange={(e) =>
                          dispatch(
                            updateScore({
                              matchID: idx,
                              team: Object.keys(match)[1],
                              opposingTeam: Object.keys(match)[0],
                              score: Number(e.target.value),
                            })
                          )
                        }
                      />
                    </span>
                  </td>
                  <td>{Object.keys(match)[1]}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};
