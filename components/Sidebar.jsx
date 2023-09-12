import React, { useEffect, useState } from 'react';
//import {Link} from 'react-router-dom'
import { Bold,Title, Metric} from '@tremor/react';
import Live from '../pages/Live'
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



const Sidebar = () => {
  const [apiData, setApiData] = useState(null);
  const [sidebarActive, setSidebarActive] = useState(false);
  
 
  const toggleSidebar = () => {
    setSidebarActive(!sidebarActive);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchAPI();
        if (data) {
            setApiData(data.data);     
        }
        console.log(apiData?.seriesState?.games)
    } catch (error ) {
      console.log('Error fetching data: ', error)
    }
   
    };

    // Fetch data initially
    fetchData();
    const intervalId = setInterval(fetchData, 8000);
    return () => clearInterval(intervalId);
  }, []);
  
 
  return (
    <div className={`flex ${sidebarActive ? 'w-80' : 'w-80'} bg-tremor-background-blue`}>
      <div className="flex flex-col h-screen p-5 text-gray-100">
        <div className="space-y-3">
          <div className="flex items-center justify-center">
            <a href="/"><Metric className="text-white">DOTADATA</Metric></a>
          </div>
          <div className="flex-1">
            <ul className="pt-2 pb-4 space-y-1 text-lg text-center">
            <li className="">
                <Bold className="text-gray-500">TOURNAMENTS</Bold>
          {/* Display "Live" link with a red blinking dot if there are live games */}
          <a href="/Live" className="flex items-center p-3 space-x-3">
        {apiData?.seriesState?.games.length > 0 ? (
            <>
              <div className="blinking-dot mr-2"></div>
              Live Game
            </>
          ) : (
            <>
               Live Game
            </>
          )}
        </a>
                
                
              </li>
              <li className="">
                <a
                  href="/TheInternational2022"
                  className="flex items-center p-3 space-x-3 rounded-md"
                >
                  The International 2022
                </a>
              </li>
              
              
            </ul>

          </div>
        </div>
      </div>
    </div>
    
  );
};

export default Sidebar;