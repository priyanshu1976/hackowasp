import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { Upload } from 'lucide-react';

export default function GymRatDashboard() {
  const [weight, setWeight] = useState('');
  const [waist, setWaist] = useState('');
  const [chest, setChest] = useState('');
  
  const progressData = [
    { name: 'Week 1', value: 180 },
    { name: 'Week 2', value: 175 },
    { name: 'Week 3', value: 172 },
  ];
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      {/* Navigation Bar */}
      <nav className="flex justify-between items-center p-4 bg-gray-800">
        <div className="text-2xl font-bold">GymRat+</div>
        <div className="flex space-x-6">
          <button className="text-white hover:text-green-400">Dashboard</button>
          <button className="text-gray-400 hover:text-green-400">Progress</button>
          <button className="text-gray-400 hover:text-green-400">Settings</button>
        </div>
      </nav>
      
      {/* Main Content */}
      <div className="flex flex-1 p-4 gap-4">
        {/* Left Panel: Body Measurements & Progress */}
        <div className="flex flex-col w-1/3 bg-gray-800 rounded-lg p-4">
          <div className="flex items-center mb-4">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <h2 className="text-xl font-semibold">Body Measurements</h2>
          </div>
          
          <input 
            type="text" 
            value={weight} 
            onChange={(e) => setWeight(e.target.value)} 
            placeholder="Weight (lbs)" 
            className="p-3 mb-4 bg-gray-700 rounded text-white"
          />
          
          <input 
            type="text" 
            value={waist} 
            onChange={(e) => setWaist(e.target.value)} 
            placeholder="Waist (in)" 
            className="p-3 mb-4 bg-gray-700 rounded text-white"
          />
          
          <input 
            type="text" 
            value={chest} 
            onChange={(e) => setChest(e.target.value)} 
            placeholder="Chest (in)" 
            className="p-3 mb-4 bg-gray-700 rounded text-white"
          />
          
          <button className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded mb-6">
            Update Measurements
          </button>
          
          <h2 className="text-xl font-semibold mb-4">Progress Over Time</h2>
          <div className="flex-1">
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={progressData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#555" />
                <XAxis dataKey="name" stroke="#fff" />
                <YAxis stroke="#fff" domain={[0, 200]} />
                <Bar dataKey="value" fill="#4ade80" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Center Panel: 3D Body Morph */}
        <div className="flex flex-col w-1/3 bg-gray-800 rounded-lg p-4">
          <h2 className="text-xl font-semibold text-center mb-6">3D Body Morph</h2>
          
          <div className="flex-1 flex justify-center items-center">
            <div className="relative flex justify-center">
              {/* Previous and Current Avatar */}
              <div className="flex justify-between w-full">
                {/* Avatar 1 - Previous */}
                <div className="flex flex-col items-center">
                  <div className="w-32 h-64 relative">
                    <div className="absolute bottom-0 w-full">
                      {/* Simple Avatar Illustration */}
                      <svg viewBox="0 0 120 240" xmlns="http://www.w3.org/2000/svg">
                        {/* Head */}
                        <circle cx="60" cy="40" r="30" fill="#e27d60" />
                        {/* Face */}
                        <circle cx="50" cy="35" r="3" fill="#333" />
                        <circle cx="70" cy="35" r="3" fill="#333" />
                        <path d="M50 55 Q60 65 70 55" stroke="#333" fill="none" strokeWidth="2" />
                        {/* Body */}
                        <rect x="35" y="70" width="50" height="80" fill="#ff4d6d" rx="5" />
                        {/* Arms */}
                        <rect x="15" y="75" width="20" height="60" fill="#ff4d6d" rx="10" />
                        <rect x="85" y="75" width="20" height="60" fill="#ff4d6d" rx="10" />
                        {/* Legs */}
                        <rect x="35" y="150" width="20" height="80" fill="#ff4d6d" rx="10" />
                        <rect x="65" y="150" width="20" height="80" fill="#ff4d6d" rx="10" />
                        {/* Feet */}
                        <rect x="30" y="225" width="30" height="10" fill="#ff8066" rx="5" />
                        <rect x="60" y="225" width="30" height="10" fill="#ff8066" rx="5" />
                      </svg>
                    </div>
                  </div>
                </div>
                
                {/* Avatar 2 - Current */}
                <div className="flex flex-col items-center">
                  <div className="w-32 h-64 relative">
                    <div className="absolute bottom-0 w-full">
                      {/* Simple Avatar Illustration */}
                      <svg viewBox="0 0 120 240" xmlns="http://www.w3.org/2000/svg">
                        {/* Head */}
                        <circle cx="60" cy="40" r="30" fill="#e27d60" />
                        {/* Hair */}
                        <path d="M30 30 Q60 0 90 30" stroke="#e27d60" fill="#e27d60" strokeWidth="2" />
                        {/* Face */}
                        <circle cx="50" cy="35" r="3" fill="#333" />
                        <circle cx="70" cy="35" r="3" fill="#333" />
                        <path d="M50 55 Q60 65 70 55" stroke="#333" fill="none" strokeWidth="2" />
                        {/* Body */}
                        <rect x="40" y="70" width="40" height="80" fill="#a2c11c" rx="5" />
                        {/* Arms */}
                        <rect x="15" y="75" width="25" height="50" fill="#e0a566" rx="10" />
                        <rect x="80" y="75" width="25" height="50" fill="#e0a566" rx="10" />
                        {/* Legs */}
                        <rect x="40" y="150" width="18" height="80" fill="#e6cc80" rx="8" />
                        <rect x="62" y="150" width="18" height="80" fill="#e6cc80" rx="8" />
                        {/* Feet */}
                        <rect x="35" y="225" width="25" height="10" fill="#e0a566" rx="5" />
                        <rect x="60" y="225" width="25" height="10" fill="#e0a566" rx="5" />
                        {/* Accessories */}
                        <path d="M85 110 Q100 120 85 130" stroke="#6c4b5c" fill="#6c4b5c" strokeWidth="2" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-4">
            {/* 3D Model View Button */}
            <button className="mx-auto block bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded mb-4">
              3D Model View
            </button>
            
            {/* Progress Bar */}
            <div className="bg-gray-700 h-4 rounded-full overflow-hidden">
              <div className="bg-green-500 h-full rounded-full" style={{width: '70%'}}></div>
            </div>
            <p className="text-center mt-2">Current Progress: 70%</p>
          </div>
        </div>
        
        {/* Right Panel: Upload & Timeline */}
        <div className="flex flex-col w-1/3 bg-gray-800 rounded-lg p-4">
          <div className="flex items-center mb-4">
            <Upload className="w-5 h-5 mr-2" />
            <h2 className="text-xl font-semibold">Upload Progress Image</h2>
          </div>
          
          <div className="bg-gray-700 p-3 rounded flex justify-between items-center mb-4">
            <span className="text-gray-400">Choose file</span>
            <span className="text-gray-400">No file chosen</span>
          </div>
          
          <button className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded mb-6">
            Generate 3D Morph
          </button>
          
          <h2 className="text-xl font-semibold mb-4">Transformation Timeline</h2>
          <div className="bg-gray-700 p-4 rounded mb-6">
            <p className="text-gray-400">[User transformation snapshots will appear here.]</p>
          </div>
          
          <div className="flex justify-center items-center mt-4">
            <div className="relative">
              {/* Before-After Transformation Visual */}
              <div className="flex items-center justify-between">
                {/* Before Avatar */}
                <svg viewBox="0 0 100 150" width="80" height="120" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="50" cy="30" r="20" fill="#fff" />
                  <ellipse cx="50" cy="85" rx="35" ry="40" fill="#fff" />
                  <rect x="25" y="60" width="15" height="50" rx="10" fill="#fff" />
                  <rect x="60" y="60" width="15" height="50" rx="10" fill="#fff" />
                  <rect x="30" y="125" width="15" height="25" rx="7" fill="#fff" />
                  <rect x="55" y="125" width="15" height="25" rx="7" fill="#fff" />
                </svg>
                
                {/* Arrow */}
                <svg viewBox="0 0 50 24" width="50" height="24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 12 H40 M30 2 L40 12 L30 22" stroke="#4ade80" fill="none" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                
                {/* After Avatar */}
                <svg viewBox="0 0 100 150" width="80" height="120" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="50" cy="30" r="20" fill="#fff" />
                  <rect x="35" y="50" width="30" height="60" rx="8" fill="#fff" />
                  <rect x="25" y="55" width="10" height="40" rx="5" fill="#fff" />
                  <rect x="65" y="55" width="10" height="40" rx="5" fill="#fff" />
                  <rect x="35" y="110" width="12" height="40" rx="6" fill="#fff" />
                  <rect x="53" y="110" width="12" height="40" rx="6" fill="#fff" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}