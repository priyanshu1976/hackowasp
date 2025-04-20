import React, { useState, useEffect, useRef } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { Upload, Ruler, BarChart2, Settings, Home, Play, Pause } from 'lucide-react';

// TypeScript interfaces
interface ProgressDataPoint {
  name: string;
  value: number;
}

interface UserMeasurements {
  weight: string;
  waist: string;
  chest: string;
}

interface GameState {
  running: boolean;
  score: number;
  distance: number;
}

const SubwaySurfersAvatar: React.FC = () => {
  // State for user measurements
  const [measurements, setMeasurements] = useState<UserMeasurements>({
    weight: '',
    waist: '',
    chest: '',
  });
  
  // State for selected file
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  
  // Game state
  const [gameState, setGameState] = useState<GameState>({
    running: true,
    score: 0,
    distance: 0,
  });
  
  // Progress data for chart
  const progressData: ProgressDataPoint[] = [
    { name: 'Week 1', value: 180 },
    { name: 'Week 2', value: 175 },
    { name: 'Week 3', value: 172 },
  ];
  
  // Progress percentage
  const progressPercentage = 70;
  
  // Canvas refs
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameId = useRef<number>(0);
  
  // Game animation variables
  const [avatarPosition, setAvatarPosition] = useState({ x: 150, y: 260, lane: 1 });
  const lanes = [100, 150, 200]; // Left, center, right
  
  // Handle measurement input changes
  const handleMeasurementChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setMeasurements((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  
  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };
  
  // Game controls
  const handleKeyDown = (e: KeyboardEvent) => {
    if (!gameState.running) return;
    
    switch (e.key) {
      case 'ArrowLeft':
        setAvatarPosition(prev => {
          const newLane = Math.max(0, prev.lane - 1);
          return { ...prev, x: lanes[newLane], lane: newLane };
        });
        break;
      case 'ArrowRight':
        setAvatarPosition(prev => {
          const newLane = Math.min(2, prev.lane + 1);
          return { ...prev, x: lanes[newLane], lane: newLane };
        });
        break;
      case 'ArrowUp':
        // Jump animation would go here
        break;
      case 'ArrowDown':
        // Slide animation would go here
        break;
    }
  };
  
  // Toggle game running state
  const toggleGameRunning = () => {
    setGameState(prev => ({ ...prev, running: !prev.running }));
  };
  
  // Game animation
  useEffect(() => {
    // Set up keyboard event listener
    window.addEventListener('keydown', handleKeyDown);
    
    // Animation variables
    let backgroundPosition = 0;
    let obstacles: { x: number, y: number, lane: number }[] = [];
    let frameCount = 0;
    let itemsCollected = 0;
    
    // Game loop
    const render = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw background (scrolling city)
      ctx.fillStyle = '#2c3e50';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw scrolling path
      if (gameState.running) {
        backgroundPosition += 5;
        if (backgroundPosition > 40) backgroundPosition = 0;
      }
      
      // Draw lanes
      for (let i = 0; i < 3; i++) {
        ctx.fillStyle = '#34495e';
        ctx.fillRect(lanes[i] - 20, 0, 40, canvas.height);
      }
      
      // Draw stripes on the path
      for (let i = 0; i < 15; i++) {
        const y = (i * 40 + backgroundPosition) % canvas.height;
        ctx.fillStyle = '#f1c40f';
        ctx.fillRect(lanes[0] - 2, y, 4, 20);
        ctx.fillRect(lanes[2] - 2, y, 4, 20);
      }
      
      // Create obstacles
      if (gameState.running && frameCount % 60 === 0) {
        const lane = Math.floor(Math.random() * 3);
        obstacles.push({ x: lanes[lane], y: -50, lane });
      }
      
      // Move and draw obstacles
      obstacles = obstacles.filter(obstacle => {
        if (gameState.running) {
          obstacle.y += 5;
        }
        
        // Draw obstacle
        ctx.fillStyle = '#e74c3c';
        ctx.fillRect(obstacle.x - 15, obstacle.y, 30, 30);
        
        // Check collision
        const avatarHitbox = {
          x1: avatarPosition.x - 15,
          y1: avatarPosition.y - 30,
          x2: avatarPosition.x + 15,
          y2: avatarPosition.y
        };
        
        const obstacleHitbox = {
          x1: obstacle.x - 15,
          y1: obstacle.y,
          x2: obstacle.x + 15,
          y2: obstacle.y + 30
        };
        
        const collision = !(
          avatarHitbox.x1 > obstacleHitbox.x2 ||
          avatarHitbox.x2 < obstacleHitbox.x1 ||
          avatarHitbox.y1 > obstacleHitbox.y2 ||
          avatarHitbox.y2 < obstacleHitbox.y1
        );
        
        if (collision) {
          // Handle collision - could stop the game
          // setGameState(prev => ({ ...prev, running: false }));
        }
        
        return obstacle.y < canvas.height + 50;
      });
      
      // Create collectible items
      if (gameState.running && frameCount % 100 === 0) {
        const lane = Math.floor(Math.random() * 3);
        obstacles.push({ x: lanes[lane], y: -50, lane });
      }
      
      // Draw avatar
      ctx.fillStyle = '#3498db';
      ctx.beginPath();
      ctx.arc(avatarPosition.x, avatarPosition.y - 20, 15, 0, Math.PI * 2);
      ctx.fill();
      
      // Draw avatar body
      ctx.fillStyle = '#2ecc71';
      ctx.fillRect(avatarPosition.x - 10, avatarPosition.y - 20, 20, 30);
      
      // Draw avatar limbs
      ctx.strokeStyle = '#2ecc71';
      ctx.lineWidth = 5;
      
      // Legs with running animation
      const legAnim = Math.sin(frameCount * 0.2) * 10;
      ctx.beginPath();
      ctx.moveTo(avatarPosition.x - 5, avatarPosition.y + 10);
      ctx.lineTo(avatarPosition.x - 5, avatarPosition.y + 30 + legAnim);
      ctx.stroke();
      
      ctx.beginPath();
      ctx.moveTo(avatarPosition.x + 5, avatarPosition.y + 10);
      ctx.lineTo(avatarPosition.x + 5, avatarPosition.y + 30 - legAnim);
      ctx.stroke();
      
      // Arms with running animation
      const armAnim = Math.sin(frameCount * 0.2) * 5;
      ctx.beginPath();
      ctx.moveTo(avatarPosition.x - 10, avatarPosition.y - 15);
      ctx.lineTo(avatarPosition.x - 20, avatarPosition.y - 5 + armAnim);
      ctx.stroke();
      
      ctx.beginPath();
      ctx.moveTo(avatarPosition.x + 10, avatarPosition.y - 15);
      ctx.lineTo(avatarPosition.x + 20, avatarPosition.y - 5 - armAnim);
      ctx.stroke();
      
      // Update game state if running
      if (gameState.running) {
        frameCount++;
        setGameState(prev => ({
          ...prev,
          score: prev.score + 1,
          distance: prev.distance + 0.1
        }));
      }
      
      // Continue the animation loop
      animationFrameId.current = requestAnimationFrame(render);
    };
    
    // Start the animation loop
    render();
    
    // Clean up
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      cancelAnimationFrame(animationFrameId.current);
    };
  }, [gameState.running, avatarPosition]);
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white overflow-hidden">
      {/* Game Canvas (Subway Surfers Background) */}
      <canvas 
        ref={canvasRef} 
        width={400} 
        height={300} 
        className="absolute top-0 left-0 w-full h-full object-cover opacity-40 z-0"
      />
      
      {/* Game Controls */}
      <div className="absolute top-4 right-4 z-10 bg-gray-800 bg-opacity-70 p-2 rounded-lg flex items-center space-x-2">
        <button 
          onClick={toggleGameRunning} 
          className="p-2 bg-green-500 hover:bg-green-600 rounded-full"
        >
          {gameState.running ? <Pause size={16} /> : <Play size={16} />}
        </button>
        <div className="text-sm">
          <div>Score: {Math.floor(gameState.score)}</div>
          <div>Distance: {gameState.distance.toFixed(1)}m</div>
        </div>
      </div>
      
      {/* Navigation Bar */}
      <nav className="flex justify-between items-center p-4 bg-gray-800 bg-opacity-80 shadow-md relative z-10">
        <div className="text-2xl font-bold flex items-center">
          <span className="text-green-400 mr-1">Gym</span>
          <span>Rat+</span>
        </div>
        <div className="flex space-x-6">
          <button className="flex items-center text-white hover:text-green-400">
            <Home size={18} className="mr-1" />
            <span>Dashboard</span>
          </button>
          <button className="flex items-center text-gray-400 hover:text-green-400">
            <BarChart2 size={18} className="mr-1" />
            <span>Progress</span>
          </button>
          <button className="flex items-center text-gray-400 hover:text-green-400">
            <Settings size={18} className="mr-1" />
            <span>Settings</span>
          </button>
        </div>
      </nav>
      
      {/* Main Content */}
      <div className="flex flex-1 p-4 gap-4 relative z-10">
        {/* Left Panel: Body Measurements & Progress */}
        <div className="flex flex-col w-1/3 bg-gray-800 bg-opacity-80 backdrop-blur-sm rounded-lg p-4 shadow-lg">
          <div className="flex items-center mb-4">
            <Ruler className="w-5 h-5 mr-2 text-green-400" />
            <h2 className="text-xl font-semibold">Body Measurements</h2>
          </div>
          
          <div className="space-y-4 mb-4">
            <div className="relative">
              <input 
                type="text" 
                name="weight"
                value={measurements.weight} 
                onChange={handleMeasurementChange} 
                placeholder="Weight (lbs)" 
                className="w-full p-3 bg-gray-700 rounded text-white focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>
            
            <div className="relative">
              <input 
                type="text" 
                name="waist"
                value={measurements.waist} 
                onChange={handleMeasurementChange} 
                placeholder="Waist (in)" 
                className="w-full p-3 bg-gray-700 rounded text-white focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>
            
            <div className="relative">
              <input 
                type="text" 
                name="chest"
                value={measurements.chest} 
                onChange={handleMeasurementChange} 
                placeholder="Chest (in)" 
                className="w-full p-3 bg-gray-700 rounded text-white focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>
          </div>
          
          <button 
            className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded mb-6 transition duration-200 ease-in-out"
          >
            Update Measurements
          </button>
          
          <h2 className="text-xl font-semibold mb-4">Progress Over Time</h2>
          <div className="flex-1 bg-gray-700 rounded-lg p-4">
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
        <div className="flex flex-col w-1/3 bg-gray-800 bg-opacity-80 backdrop-blur-sm rounded-lg p-4 shadow-lg">
          <h2 className="text-xl font-semibold text-center mb-6">3D Body Morph</h2>
          
          <div className="flex-1 flex justify-center items-center">
            <div className="w-full flex justify-between items-end">
              {/* Previous and Current Avatar */}
              <div className="relative flex-1 flex flex-col items-center">
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
                <div className="mt-2 text-sm text-gray-400">Before</div>
              </div>
              
              <div className="relative flex-1 flex flex-col items-center">
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
                <div className="mt-2 text-sm text-gray-400">Current</div>
              </div>
            </div>
          </div>
          
          <div className="mt-4">
            {/* 3D Model View Button */}
            <button className="mx-auto block bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded mb-4 transition duration-200 ease-in-out">
              3D Model View
            </button>
            
            {/* Progress Bar */}
            <div className="bg-gray-700 h-4 rounded-full overflow-hidden">
              <div 
                className="bg-green-500 h-full rounded-full transition-all duration-700 ease-in-out" 
                style={{width: `${progressPercentage}%`}}
              ></div>
            </div>
            <p className="text-center mt-2">Current Progress: {progressPercentage}%</p>
          </div>
        </div>
        
        {/* Right Panel: Upload & Timeline */}
        <div className="flex flex-col w-1/3 bg-gray-800 bg-opacity-80 backdrop-blur-sm rounded-lg p-4 shadow-lg">
          <div className="flex items-center mb-4">
            <Upload className="w-5 h-5 mr-2 text-green-400" />
            <h2 className="text-xl font-semibold">Upload Progress Image</h2>
          </div>
          
          <label className="block mb-4 cursor-pointer">
            <div className="bg-gray-700 p-3 rounded flex justify-between items-center hover:bg-gray-600 transition duration-200 ease-in-out">
              <span className="text-gray-400">Choose file</span>
              <span className="text-gray-400">{selectedFile ? selectedFile.name : 'No file chosen'}</span>
            </div>
            <input 
              type="file" 
              className="hidden" 
              accept="image/*" 
              onChange={handleFileChange}
            />
          </label>
          
          <button 
            className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded mb-6 transition duration-200 ease-in-out"
          >
            Generate 3D Morph
          </button>
          
          <h2 className="text-xl font-semibold mb-4">Transformation Timeline</h2>
          <div className="bg-gray-700 p-4 rounded mb-6 min-h-40">
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
      
      {/* Game Instructions */}
      <div className="absolute bottom-4 left-4 bg-gray-800 bg-opacity-70 p-2 rounded-lg z-10">
        <p className="text-sm text-gray-300">Use ← → keys to move your avatar</p>
      </div>
    </div>
  );
};

export default SubwaySurfersAvatar;