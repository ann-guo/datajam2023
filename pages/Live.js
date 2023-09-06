import React, { useEffect, useState } from 'react';
import Sidebar from '@/components/Sidebar';
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
          teams {
            name
            players {
              name
              kills
              deaths
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
      <div>
  {apiData?.seriesState?.games.length > 0 ? (
    <div>
        <Text>Last Updated at {time}</Text>
      <Text className='p-3'>Team 1</Text>
      <Card>
        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell>Name</TableHeaderCell>
              <TableHeaderCell className="text-right">Kills</TableHeaderCell>
              <TableHeaderCell className="text-right">Deaths</TableHeaderCell>
              <TableHeaderCell className="text-right">Net Worth</TableHeaderCell>
              <TableHeaderCell className="text-right">Money</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {apiData?.seriesState?.games[0]?.teams[0]?.players.map((player, index) => (
              <TableRow key={index}>
                <TableCell>{player.name}</TableCell>
                <TableCell className="text-right">{player.kills}</TableCell>
                <TableCell className="text-right">{player.deaths}</TableCell>
                <TableCell className="text-right">{player.netWorth}</TableCell>
                <TableCell className="text-right">{player.money}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      <Text className="p-3">Team 2</Text>
      <Card>
        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell>Name</TableHeaderCell>
              <TableHeaderCell className="text-right">Kills</TableHeaderCell>
              <TableHeaderCell className="text-right">Deaths</TableHeaderCell>
              <TableHeaderCell className="text-right">Net Worth</TableHeaderCell>
              <TableHeaderCell className="text-right">Money</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {apiData?.seriesState?.games[0]?.teams[1]?.players.map((player, index) => (
              <TableRow key={index}>
                <TableCell>{player.name}</TableCell>
                <TableCell className="text-right">{player.kills}</TableCell>
                <TableCell className="text-right">{player.deaths}</TableCell>
                <TableCell className="text-right">{player.netWorth}</TableCell>
                <TableCell className="text-right">{player.money}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  ) : (
    <div className="text-center flex justify-center items-center h-full">
        <Text Text className="text-4xl text-gray-100">No Live Games Available</Text>
        </div>
    
  )}
</div>


      </main>
    </div>
  );
};

export default Live;