import React, { useState } from 'react';
import Image from 'next/image';
import { Icon } from "@tremor/react";

import heroesData from "../public/heroes.json"
const heroUrlMapping = {};

heroesData.heroes.forEach(hero => {
    const lowercaseName = hero.localized_name.toLowerCase(); // Convert to lowercase
    heroUrlMapping[lowercaseName] = hero.url_vertical_portrait;
});


const gameWorldWidth = 17280;  // Width of the game world
const gameWorldHeight = 17280; // Height of the game world
const imageWidth = 500;        // Width of your image (in pixels)
const imageHeight = 500;       // Height of your image (in pixels)
const gameWorldReferencePoint = { x: -8640, y: -9600 }; // Top-left pixel of the game map
const imageReferencePoint = { x: 0, y: 0 }; // Top-left pixel of the image
const scaleX = imageWidth / gameWorldWidth;
const scaleY = imageHeight / gameWorldHeight;
const offsetX = imageReferencePoint.x - gameWorldReferencePoint.x * scaleX;
const offsetY = imageReferencePoint.y - gameWorldReferencePoint.y * scaleY;

// Function to map game world coordinates to pixel coordinates
function mapCoordinates(gameWorldCoordinates) {
  const pixelX = gameWorldCoordinates.x * scaleX + offsetX;
  const pixelY = gameWorldCoordinates.y * scaleY + offsetY;
  return { x: pixelX, y: pixelY };
}

const Map = ({ gameData }) => {
    const [tooltipVisible, setTooltipVisible] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [tooltipText, setTooltipText] = useState('');

  const handleMarkerHover = (e, player) => {
    const { clientX, clientY } = e;
    const pixelCoordinates = mapCoordinates(player.position);
    setTooltipPosition({ x: pixelCoordinates.x + 10, y: pixelCoordinates.y - 25 }); // Adjust position as needed
    setTooltipText(player.name);
    setTooltipVisible(true);
  };

  const handleMarkerLeave = () => {
    setTooltipVisible(false);
  };
  return (
    <div className="relative">
      <Image
        src="/dota-Copy/International/dota2-minimap.jpg"
        width={500}
        height={500}
        alt="Map Image"
      />
      {gameData.teams.map((team, teamIndex) => (
        team.players.map((player, playerIndex) => {
          const pixelCoordinates = mapCoordinates(player.position);
          console.log(player.character.id)
          const heroUrl = heroUrlMapping[player.character.id] || 'https://cdn.dota2.com/apps/dota2/images/heroes/pudge_vert.jpg';
          let borderColor = '';
          if (team.side === 'radiant') {
            borderColor = 'green'; // Set border color to green for Radiant
            } else if (team.side === 'dire') {
                borderColor = 'red'; // Set border color to red for Dire
            }
          //console.log(heroUrl)
          return (
            
            
            <div
  className="tooltip-container"
  key={playerIndex}
  style={{
    left: pixelCoordinates.x + 'px',
    top: pixelCoordinates.y + 'px',
    position: 'absolute', // Ensure the container uses absolute positioning
    border: `2px solid ${borderColor}`
  }}
>
  <img
    className="player-image"
    height="40"
    width="40"
    src={heroUrl}
    alt="Hero"
  />
  <div className="tooltip">
    <span className="tooltiptext"><p>Name: {player.name}</p>
      <p>Character: {player.character.id}</p>
      <p>Position: {player.position.x} , {player.position.y}</p>
      </span>
  </div>
</div>
          );
        })
      ))}
    </div>
  );
};

export default Map;