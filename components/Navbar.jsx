import React, { useEffect } from 'react';
const API_KEY = '2Is935kzXLtodIzxLCPjJrvHCnvfGyZembiAXWic';
const { formatISO } = require('date-fns');

const now = new Date();
const next24Hours = new Date(now);
next24Hours.setHours(now.getHours() + 24);

const timezone = 'Europe/Paris'; // Adjust the timezone to your desired timezone.

const formattedNow = formatISO(now, { timeZone: timezone });
const formattedNext24Hours = formatISO(next24Hours, { timeZone: timezone });
const next24 = `
query GetAllSeriesInNext24Hours {
  allSeries(
    filter:{
      startTimeScheduled:{
        gte: "${formattedNow}"
        lte: "${formattedNext24Hours}"
      }
    }
    orderBy: StartTimeScheduled
  ) {
    totalCount,
    pageInfo{
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    edges{
      cursor
      node{
        ...allSeriesFields
      }
    }
  }
}

fragment allSeriesFields on Series {
  id
  title {
    nameShortened
  }
  tournament {
    nameShortened
  }
  startTimeScheduled
  format {
    name
    nameShortened
  }
  teams {
    baseInfo {
      name
    }
    scoreAdvantage
  }
}
`;

const fetchAPI = async () => {
  const request = await fetch('https://api-op.grid.gg/central-data/graphql', {
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

const Navbar = () => {
  useEffect(() => {
    // Define an async function to fetch API data
    const fetchData = async () => {
      try {
        const response = await fetchAPI(); // Fetch data using your fetchAPI function
        console.log('API Response:', response); // Log the entire API response
        // You can access specific data in the response using response.data, e.g., response.data.allSeries
        // console.log('Specific Data:', response.data.allSeries);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // Call the fetchData function
    fetchData();
  }, []); // The empty array [] ensures this effect runs only once when the component mounts
  return (
    <div class="scrollmenu">
  <div class="card"><h2>Card</h2></div>
  <div class="card"><h2>Card</h2></div>
  <div class="card"><h2>Card</h2></div>
  <div class="card"><h2>Card</h2></div>
  <div class="card"><h2>Card</h2></div>
  <div class="card"><h2>Card</h2></div>
  <div class="card"><h2>Card</h2></div>
  <div class="card"><h2>Card</h2></div>
  <div class="card"><h2>Card</h2></div>
  <div class="card"><h2>Card</h2></div>
  
</div>
  );
};

export default Navbar;



