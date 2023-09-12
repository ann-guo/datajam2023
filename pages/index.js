import { useState } from 'react';
import Image from 'next/image'
import Sidebar from '@/components/Sidebar'
import Navbar from '@/components/Navbar'
import { Card, Metric } from '@tremor/react'

const carouselData = [
  {
    title: 'Real Time Data Updates',
    description: "Live game data comes from GRID Open Platform's GraphQL API.",
  },
  {
    title: 'Live Map Feature',
    description: 'The Live Map feature continuously updates the position of each player every 6 seconds, ensuring that users always have access to the latest data.',
  },
  {
    title: 'Interactive Data Visualization',
    description: 'With an intuitive and interactive interface, users can easily sort by kda score and net worth.',
  },
  // Add more card objects here if needed
];

export default function Home() {
  const [currentCard, setCurrentCard] = useState(0);

  const handleSliderChange = (event) => {
    setCurrentCard(parseInt(event.target.value));
  };

  return (
    <div className="flex h-screen"> {/* Use h-screen to make the container fill the entire screen height */}
      <Sidebar />
      <main className="flex-1 p-10 bg-tremor-background-lightblue flex flex-col items-center justify-center">
        <Metric className="text-white">DOTADATA</Metric>
        <br></br>
        <div className="w-3/4 mx-auto">
          <Card className="text-center rounded-md">
            <h2 className="text-xl font-semibold">{carouselData[currentCard].title}</h2>
            <p className="mt-4">{carouselData[currentCard].description}</p>
          </Card>
          <div className="w-2/4 mx-auto">
            <input
              type="range"
              min="0"
              max={carouselData.length - 1}
              value={currentCard}
              onChange={handleSliderChange}
              className="mt-4 slider"
            />
          </div>
        </div>
      </main>
    </div>
  );
}