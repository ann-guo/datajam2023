import React from 'react'
import { getAllGames, getGameIds, getFile} from '../lib/util'
import {useEffect, useState, useContext } from 'react'
//import jsonData from '../../public/dota/2364966_state.json'
import Sidebar from '../components/Sidebar'
import { FILES } from '../lib/util'
import ScoreTable from '../components/ScoreTable'
//import itemData from '../public/items'
import {
  Bold,
  Button,
  Callout,
  Card,
  Flex,
  List,
  ListItem,
  Metric,
  ProgressBar,
  Text,
  Grid,
  Title,
  Divider,
} from "@tremor/react";




const TheInternational2022 = () => {
  const [jsonFiles, setJsonFiles] = useState([]);
  const [selectedGames, setSelectedGames] = useState({}); // Track selected games per file
  const [itemsData, setItemsData] = useState(null);

  async function fetchJsonFiles() {
    try {
      const response = await fetch('/api/files')
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
        {/* ... Title and other content ... */}
        <Grid className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {jsonFiles.map((jsonFile, index) => (
            <Card
              className={`md:col-span-2 lg:col-span-3`}
              key={index}
              data={jsonFile}
            >
              <Text> {jsonFile.id}</Text>
              {jsonFile.games.map((game, gameIndex) => (
                <div key={gameIndex}>
                  <button
                    onClick={() => handleGameDropdownClick(jsonFile, game)}
                  >
                   <Text>Toggle Game Info</Text> 
                    
                  </button>
                  <Divider/>
                  {selectedGames[jsonFile.id] === game.id && (
                    <div>
                      {/* Display additional game information here */}
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Text>Game ID: {game.id} </Text> 
                      <Text>Duration: {Math.floor(game.clock.currentSeconds / 60)} minutes</Text>
                      </div>
                      <div className="p-2"> </div>
                      
                      <Text>Team Name: {game.teams[0].name}</Text>
                      <ScoreTable data={game.teams[0].players}/>
                      <div className="p-3"> </div>
                      <Text>Team Name: {game.teams[1].name}</Text>
                      <ScoreTable data={game.teams[1].players} />
                      <Divider/>
                      
                    </div>
                  )}
                </div>
              ))}
            </Card>
          ))}
        </Grid>
      </main>
    </div>
  );
};

export default TheInternational2022;