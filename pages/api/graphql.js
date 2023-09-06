//pages/api/graphql.js
const YOUR_API_KEY = '2Is935kzXLtodIzxLCPjJrvHCnvfGyZembiAXWic'; // Replace 'your-api-key' with your actual API key
const apiUrl = 'https://api-op.grid.gg/live-data-feed/series-state/graphql'; // Replace with the GraphQL API URL
const rateLimit = require('express-rate-limit');
const slowDown = require('express-slow-down');
const fetch = require('node-fetch');
import { ApolloClient, InMemoryCache } from '@apollo/client';


const apiRateLimit = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 10, // Allow 10 requests per minute
  message: 'Rate limit exceeded. Please try again later.',
});

// Apply rate limiting middleware to the route
export default async function handler(req, res) {
  try {
    // Apply rate limiting to this specific route
    await apiRateLimit(req, res);

    const response = await fetch(apiUrl, {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': YOUR_API_KEY,
      },
      body: JSON.stringify({
        query: '{ seriesState(id: "2") { valid updatedAt } }', // Replace with your GraphQL query
      }),
    });
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
}