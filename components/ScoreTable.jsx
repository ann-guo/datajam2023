//sort by networth and kda
//KDA = (Kills + assists)/ deaths
import {useEffect, useState } from 'react'
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
    Badge
  } from "@tremor/react";
  


function getItemImageUrl(itemName) {
 // console.log(itemData.items[0].url_image)
  //const item = itemData.items.find((item) => item.name === itemName);
  //if (item) {
  //  return item.url_image;
  //}
  // If the item name is not found in the data, return a default image or handle it as needed.
  // return "default-image-url.png";
}

const ScoreTable = ({ data }) => {
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
  const [sortedData, setSortedData] = useState(data);

  // Function to handle sorting by net worth
  const handleSortByNetWorth = () => {
    const sorted = sortByNetWorth([...sortedData]);
    setSortedData(sorted);
  };

  // Function to handle sorting by KDA
  const handleSortByKDA = () => {
    const sorted = sortByKDA([...sortedData]);
    setSortedData(sorted);
  };
  
  useEffect(() => {
    
  }, [data]);

  return (
    <Card>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCell>Name</TableHeaderCell>
            <TableHeaderCell className="text-right">Character</TableHeaderCell>
            <TableHeaderCell className="text-right">KDA</TableHeaderCell>
            <TableHeaderCell className="text-right">Net Worth</TableHeaderCell>
            <TableHeaderCell className="text-right">Items</TableHeaderCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {data.map((player) => (
            <TableRow key={player.name}>
              <TableCell>{player.name}</TableCell>
              <TableCell className="text-right">{player.character.name}</TableCell>
              <TableCell className="text-center">
                <div>{kda(player)}</div>
                <div><Badge size="sm">{kdaScore(player)}</Badge></div>
              </TableCell>

              <TableCell className="text-right">{player.netWorth}</TableCell>
              <TableCell className="text-right">
                {player.items.map((item, index) => (
                  <span key={index}>
                    {item.id}
                    
                  </span>
                ))}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
};

export default ScoreTable;