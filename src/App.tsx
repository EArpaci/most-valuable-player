import React, { useRef, useState } from 'react';
import './App.css';
import { readFiles } from './lib/readFiles';

function App() {
  const fileInputRef = useRef<HTMLInputElement>();
  const [sportTables, setSportTables] = useState([]);
  const [MVP, setMVP] = useState({ player: '', score: 0 });

  const getTableHead = (title) => {
    switch (title) {
      case 'BASKETBALL':
        return (
          <tr>
            <th>Player Name</th>
            <th>Nick Name</th>
            <th>Number</th>
            <th>Team</th>
            <th>Position</th>
            <th>Score</th>
            <th>Rebounds</th>
            <th>Assists</th>
            <th>Rating</th>
          </tr>
        );

      case 'HANDBALL':
        return (
          <tr>
            <th>Player Name</th>
            <th>Nick Name</th>
            <th>Number</th>
            <th>Team</th>
            <th>Position</th>
            <th>Goals Made</th>
            <th>Goals Received</th>
            <th>Rating</th>
          </tr>
        );

      default:
        return <tr></tr>;
    }
  };
  const getTableBody = (title, players) => {
    switch (title) {
      case 'BASKETBALL':
        return players.map((player, index) => (
          <tr key={index}>
            <td>{player.playerName}</td>
            <td>{player.nickName}</td>
            <td align="right">{player.number}</td>
            <td>{player.team}</td>
            <td>{player.position}</td>
            <td align="right">{player.score}</td>
            <td align="right">{player.rebounds}</td>
            <td align="right">{player.assists}</td>
            <td align="right">{player.rating}</td>
          </tr>
        ));

      case 'HANDBALL':
        return players.map((player, index) => (
          <tr key={index}>
            <td>{player.playerName}</td>
            <td>{player.nickName}</td>
            <td align="right">{player.number}</td>
            <td>{player.team}</td>
            <td>{player.position}</td>
            <td align="right">{player.goalsMade}</td>
            <td align="right">{player.goalsReceived}</td>
            <td align="right">{player.rating}</td>
          </tr>
        ));

      default:
        return <tr></tr>;
    }
  };

  const onChangeInputFile = async (event) => {
    await readFiles(event.target.files);

    setTimeout(() => {
      setMVP(JSON.parse(localStorage.getItem('mvp')));
      setSportTables(JSON.parse(localStorage.getItem('sports')));
    }, 100);
  };

  return (
    <div className="app">
      {sportTables.length > 0 ? (
        <>
          <div className="container">
            <h3>MVP Nickname: {MVP.player}</h3>
            <h3>MVP Rating: {MVP.score}</h3>

            <div className="tablesContainer">
              {sportTables.map((sport, index) => (
                <div key={index}>
                  <h2>{sport.title}</h2>

                  <h3>Winner Team: {sport.winnerTeam.team}</h3>

                  <table border={1} cellSpacing={0} cellPadding={10}>
                    <thead>{getTableHead(sport.title)}</thead>

                    <tbody>{getTableBody(sport.title, sport.players)}</tbody>
                  </table>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <div className="pickFileContainer">
          <div className="pickFileMain">
            <h1>Test: Most Valuable Player</h1>

            <button
              className="pickFile"
              onClick={(event) => {
                event.preventDefault();
                fileInputRef.current?.click();
              }}
            >
              Pick Sport Files
            </button>
          </div>
        </div>
      )}

      <input
        type="file"
        style={{ display: 'none' }}
        ref={fileInputRef}
        multiple
        onChange={(event) => onChangeInputFile(event)}
      />
    </div>
  );
}

export default App;
