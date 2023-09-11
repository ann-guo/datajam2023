import React, { useEffect, useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Map from '../components/Map';
import itemsData from "../public/items.json"
const itemsMapping = {}
itemsData.items.forEach(item => {
  itemsMapping[item.name] = item.url_image
});
import {
    Card,
    Table,
    TableRow,
    TableCell,
    TableHead,
    TableHeaderCell,
    TableBody,
    BadgeDelta,
    DeltaType,
    Grid,
    Text,
  } from "@tremor/react";
const API_KEY = '2Is935kzXLtodIzxLCPjJrvHCnvfGyZembiAXWic'; 

const teamQuery = `
  query GetSeries {
    seriesState(id: "2") {
      valid
      updatedAt
      format
      started
      finished
      teams {
        name
        won
      }
  
      games(filter: {started: true, finished: false}) {
        sequenceNumber
        map {
          name
          bounds {
            min {
              x
              y
            }
            max {
              x
              y
            }
          }
        }
        clock {
          id
          currentSeconds
        }
        teams {
          name
          side
          
          players {
            name
            character {
              id
            }
            items{
              id
              
            }
            kills
            deaths
            killAssistsGiven
            netWorth
            money
            position {
              x
              y
            }
          
            
          }
        }
      }
    }
  }
`;

const fetchAPI = async () => {
  const request = await fetch('https://api-op.grid.gg/live-data-feed/series-state/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': API_KEY,
    },
    body: JSON.stringify({
      query: teamQuery,
    }),
  });

  const response = await request.json();
  return response;
};

const kda = (player) => {
  //KDA = (Kills + Assists) / Deaths
  const kills = player.kills
  const deaths = player.deaths
  const assists = player.killAssistsGiven
  const kdaScore = (kills + assists) /deaths
  return kills + "/" +deaths +"/"+ assists
}
const kdaScore = (player) =>{
  const kills = player.kills
  const deaths = player.deaths
  const assists = player.killAssistsGiven
  const kdaScore = (kills + assists) /deaths
  if(deaths == 0) {
    return "Perfect"
  }
  return kdaScore.toFixed(2)

}

const Live = () => {
  const [apiData, setApiData] = useState(null);
  const [time, setTime] = useState("")
  const [lastFetchTime, setLastFetchTime] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const currentTime = Date.now();
        
        if(!apiData || (currentTime - lastFetchTime) >= 6000) {
            const data = await fetchAPI();
            if (data) {
                setApiData(data.data);
                setLastFetchTime(currentTime);  
                console.log(apiData)    
                const estDate = new Date(apiData?.seriesState?.updatedAt);
                const estTime = estDate.toLocaleString("en-US", { timeZone: "America/New_York" });
                setTime(estTime)
                console.log(time)    
            }
        }
    } catch (error) {
        console.log('Error fetching data: ', error)
    }
        
   
      //    
    };

    // Fetch data initially
    fetchData();
    const intervalId = setInterval(fetchData, 6000);
    return () => clearInterval(intervalId);
  }, [apiData, lastFetchTime]);


  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-10 bg-tremor-background-lightblue">
      <Text className="text-xl text-gray-100"> Last updated: {time} </Text>
      
  {apiData?.seriesState?.games.length > 0 ? (
    <div className="text-white">
        
      <Text className='p-3'>Team 1</Text>
      <Card className="bg-tremor-background-card">
        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell>Name</TableHeaderCell>
              <TableHeaderCell className="text-right">Character</TableHeaderCell>
              <TableHeaderCell className="text-right">KDA</TableHeaderCell>
              <TableHeaderCell className="text-right">Net Worth</TableHeaderCell>
              <TableHeaderCell className="text-right">Money</TableHeaderCell>
              <TableHeaderCell className="text-right">Items</TableHeaderCell>
         
            </TableRow>
          </TableHead>
          <TableBody>
            {apiData?.seriesState?.games[0]?.teams[0]?.players.map((player, index) => (
              <TableRow key={index}>
                <TableCell>{player.name}</TableCell>
                <TableCell className="text-right">{player.character.id}</TableCell>
                <TableCell className="text-right">{kda(player)}</TableCell>
                <TableCell className="text-right">{player.netWorth}</TableCell>
                <TableCell className="text-right">{player.money}</TableCell>
                <TableCell className="text-right">
                <div className="flex">
                  {player.items.map((item, index) => {
                    const itemurl = itemsMapping[item.id] || "http://cdn.dota2.com/apps/dota2/images/items/recipe_heavens_halberd_lg.png";
                    return (
                      <div key={index} className="tooltip-container mr-2"> {/* Add some margin between images */}
                        <img src={itemurl} alt={`Item ${index}`} className="w-10 h-10"/><div className="tooltip">
    <span className="tooltiptext"><p>{item.id}</p></span> </div>
                      </div>
                    );
                  })}
                </div>
              </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      <Text className="p-3">Team 2</Text>
      <Card className="bg-tremor-background-card">
        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell>Name</TableHeaderCell>
              <TableHeaderCell className="text-right">Character</TableHeaderCell>
              <TableHeaderCell className="text-right">KDA</TableHeaderCell>
              <TableHeaderCell className="text-right">Net Worth</TableHeaderCell>
              <TableHeaderCell className="text-right">Money</TableHeaderCell>
              <TableHeaderCell className="text-right">Items</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {apiData?.seriesState?.games[0]?.teams[1]?.players.map((player, index) => (
              <TableRow key={index}>
                <TableCell>{player.name}</TableCell>
                <TableCell className="text-right">{player.character.id}</TableCell>
                <TableCell className="text-right">{kda(player)}</TableCell>
                <TableCell className="text-right">{player.netWorth}</TableCell>
                <TableCell className="text-right">{player.money}</TableCell>
                <TableCell className="text-right">
                <div className="flex">
                  {player.items.map((item, index) => {
                    const itemurl = itemsMapping[item.id] || "http://cdn.dota2.com/apps/dota2/images/items/recipe_heavens_halberd_lg.png";
                    return (
                      <div key={index} className="tooltip-container mr-2"> {/* Add some margin between images */}
                        <img src={itemurl} alt={`Item ${index}`} className="w-10 h-10"/><div className="tooltip">
    <span className="tooltiptext"><p>{item.id}</p></span> </div>
                      </div>
                    );
                  })}
                </div>
              </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
      
      {console.log(apiData?.seriesState?.games[0])}
      <Map gameData={apiData?.seriesState?.games[0]}/>
    </div>
    


  ) : (
    
        <Text className="text-xl text-gray-100">No Live Games Available</Text>
       
    
  )}


      </main>
      
    </div>
  );
};

export default Live;