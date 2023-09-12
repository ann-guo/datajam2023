import { useEffect, useState } from 'react';
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
  Badge,
  Bold,
} from "@tremor/react";

import itemsData from '../public/items.json';

const itemsMapping = {};
itemsData.items.forEach((item) => {
  itemsMapping[item.name] = item.url_image;
});

const ScoreTable = ({ data }) => {
  //console.log(data)
  const [sortOrder, setSortOrder] = useState(null); // 'asc' for ascending, 'desc' for descending
  const [sortCriteria, setSortCriteria] = useState(null); // Default sorting criteria

  const handleSort = (criteria) => {
    if (criteria === sortCriteria) {
      // If already sorting by the same criteria, toggle the sorting order
      setSortOrder((prevSortOrder) => (prevSortOrder === 'asc' ? 'desc' : 'asc'));
    } else {
      // If sorting by a new criteria, set it as the active criteria and default to ascending order
      setSortCriteria(criteria);
      setSortOrder('asc');
    }
  };

  const sortedData = [...data].sort((a, b) => {
    if (sortCriteria === 'kdaScore') {
      const kdaA = (a.kills + a.killAssistsGiven) / a.deaths;
      const kdaB = (b.kills + b.killAssistsGiven) / b.deaths;
      return sortOrder === 'asc' ? kdaA - kdaB : kdaB - kdaA;
    } else if (sortCriteria === 'netWorth') {
      const netWorthA = a.netWorth;
      const netWorthB = b.netWorth;
      return sortOrder === 'asc' ? netWorthA - netWorthB : netWorthB - netWorthA;
    } else if (sortCriteria === 'winLoss') {
      // Add logic for sorting by win/loss criteria here
      // Example: 
      // const winLossA = ...;
      // const winLossB = ...;
      // return sortOrder === 'asc' ? winLossA - winLossB : winLossB - winLossA;
    }
    return 0; // Default case, no sorting
  });

  const isKdaSorted = sortCriteria === 'kdaScore';
  const isNetWorthSorted = sortCriteria === 'netWorth';

  const kda = (player) => {
    // KDA = (Kills + Assists) / Deaths
    const kills = player.kills;
    const deaths = player.deaths;
    const assists = player.killAssistsGiven;
    return `${kills}/${deaths}/${assists}`;
  };

  const kdaScore = (player) => {
    const kills = player.kills;
    const deaths = player.deaths;
    const assists = player.killAssistsGiven;
    if (deaths === 0) {
      return (
        <Bold  className="text-yellow-400">
        Perfect
      </Bold>
      );
    }
    const kdaScore = (kills + assists) / deaths;
  
    let badgeColorClass = '';
    if (kdaScore < 3.4) {
      badgeColorClass = 'text-gray-500'; // Gray color
    } else if (kdaScore >= 3.4 && kdaScore < 5) {
      badgeColorClass = 'text-blue-700'; // Blue color
    } else if (kdaScore >= 5) {
      badgeColorClass = 'text-yellow-400'; // Yellow color
    }
  
    return (
      <Bold  className={badgeColorClass}>
        {kdaScore.toFixed(2)}
      </Bold>
    );
  };

  useEffect(() => {
    // You can add any additional logic here if needed when data changes.
  }, [data]);

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeaderCell>Name</TableHeaderCell>
          <TableHeaderCell className="text-right">Character</TableHeaderCell>
          <TableHeaderCell>
          <div
            onClick={() => handleSort('kdaScore')}
            className={`cursor-pointer ${isKdaSorted ? 'group' : ''} ${isKdaSorted && sortOrder === 'asc' ? 'border-t-2 border-white' : ''} ${isKdaSorted && sortOrder === 'desc' ? 'border-b-2 border-white' : ''}`}
          >
            KDA
          </div>
        </TableHeaderCell>
        <TableHeaderCell>
          <div
            onClick={() => handleSort('netWorth')}
            className={`cursor-pointer ${isNetWorthSorted ? 'group' : ''} ${isNetWorthSorted && sortOrder === 'asc' ? 'border-t-2 border-white' : ''} ${isNetWorthSorted && sortOrder === 'desc' ? 'border-b-2 border-white' : ''}`}
          >
            Net Worth
          </div>
        </TableHeaderCell>
          
          <TableHeaderCell className="text-left">Items</TableHeaderCell>
        </TableRow>
      </TableHead>



      <TableBody>
        {sortedData.map((player) => (
          <TableRow key={player.name}>
            <TableCell>{player.name}</TableCell>
            <TableCell className="text-right">{player.character.name}</TableCell>
            <TableCell>
              <div>{kda(player)}</div>
              <div>
                {kdaScore(player)}
              </div>
            </TableCell>

            <TableCell >{player.netWorth}</TableCell>
            <TableCell className="text-left">
              {player.items.map((item, index) => {
                const itemurl = itemsMapping[item.id] || "http://cdn.dota2.com/apps/dota2/images/items/recipe_heavens_halberd_lg.png";
                return (
                  <div key={index} className="tooltip-container mr-2">
                    <img src={itemurl} alt={`Item ${index}`} className="w-10 h-10" />
                    <div className="tooltip">
                      <span className="tooltiptext">
                        <p>{item.id}</p>
                      </span>
                    </div>
                  </div>
                );
              })}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ScoreTable;