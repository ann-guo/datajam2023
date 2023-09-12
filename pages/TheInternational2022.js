import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import ScoreTable from '../components/ScoreTable';

import {
  Button,
  Card,
  Divider,
  Grid,
  Text,
} from "@tremor/react";
import { getAllGames, getGameIds, getFile } from '../lib/util';



const TheInternational2022 = () => {
  const [jsonFiles, setJsonFiles] = useState([]);
  const [selectedGames, setSelectedGames] = useState({});
  const [itemsData, setItemsData] = useState(null);

  async function fetchJsonFiles() {
    try {
      const response = await fetch('/api/files');
      if (response.ok) {
        const data = await response.json();
        setJsonFiles(data.files);
      } else {
        console.error('Error fetching JSON files:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching JSON files:', error);
    }
  }

  useEffect(() => {
    fetchJsonFiles();
  }, []);

  const handleGameDropdownClick = (jsonFile, game) => {
    setSelectedGames((prevSelectedGames) => {
      const updatedSelectedGames = { ...prevSelectedGames };
      if (updatedSelectedGames[jsonFile.id] === game.id) {
        delete updatedSelectedGames[jsonFile.id];
      } else {
        updatedSelectedGames[jsonFile.id] = game.id;
      }
      return updatedSelectedGames;
    });
  };

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-10 bg-tremor-background-lightblue">
        <Grid className="grid grid-cols-1">
          {jsonFiles.map((jsonFile, index) => (
            <div key={index}>
              {jsonFile.games.map((game, gameIndex) => (
                <div key={gameIndex}>
                  <Card className="bg-tremor-background-card">

                    
                    <button onClick={() => handleGameDropdownClick(jsonFile, game)}>
                      <Text>{game.teams[0].name} vs {game.teams[1].name}</Text>
                    </button>
                   
                    {selectedGames[jsonFile.id] === game.id && (
                    <div>
                      <br></br>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Text>Game ID: {game.id}</Text>
                        <Text>Duration: {Math.floor(game.clock.currentSeconds / 60)} minutes</Text>
                      </div>
                      <div className="p-2"></div>
                      <Text>{game.teams[0].won ? 'Victory' : 'Defeat'} (Team Name: {game.teams[0].name})</Text>

                      <ScoreTable data={game.teams[0].players} />
                      <div className="p-3"></div>
                      <Text>{game.teams[1].won ? 'Victory' : 'Defeat'}  (Team Name: {game.teams[1].name})</Text>

                      <ScoreTable data={game.teams[1].players} />
                     
                    </div>
                  )}


                  </Card>
                  
        
                </div>
              ))}
            </div>
          ))}
        </Grid>
      </main>
    </div>
  );
};

export default TheInternational2022;