import Image from 'next/image'
import Sidebar from '@/components/Sidebar'
import Navbar from '@/components/Navbar'
export default function Home() {
  return (
    <div className="flex">
    <Sidebar />
    <Navbar/>
    
      </div>
      
  )
}
