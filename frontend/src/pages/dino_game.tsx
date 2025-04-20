import { useState, useEffect, useRef } from 'react';

export default function ChromeDinoGame() {
  const [gameState, setGameState] = useState({
    isRunning: false,
    gameOver: false,
    score: 0,
    highScore: 0,
    speed: 6,
    groundPosition: 0,
    obstacles: [], // {type: 'cactus' or 'bird', position: number, width: number, height: number}
    dinoState: 'running', // 'running', 'jumping', 'ducking'
    dinoY: 0,
    jumpVelocity: 0,
    nightMode: false
  });

  const requestRef = useRef();
  const lastTimeRef = useRef(0);
  const canvasRef = useRef(null);
  const gameContainerRef = useRef(null);
  
  // Constants
  const GROUND_HEIGHT = 20;
  const DINO_WIDTH = 44;
  const DINO_HEIGHT = 48;
  const JUMP_VELOCITY = 16;
  const GRAVITY = 0.8;
  
  // Images
  const dinoRunImages = [
    { legs: 'up', body: '🦖' },
    { legs: 'down', body: '🦖' }
  ];
  
  // Start game
  const startGame = () => {
    setGameState(prev => ({
      ...prev,
      isRunning: true,
      gameOver: false,
      score: 0,
      speed: 6,
      obstacles: [],
      dinoState: 'running',
      dinoY: 0,
      jumpVelocity: 0
    }));
  };
  
  // Game over
  const handleGameOver = () => {
    setGameState(prev => {
      const newHighScore = Math.max(prev.score, prev.highScore);
      return {
        ...prev,
        isRunning: false,
        gameOver: true,
        highScore: newHighScore
      };
    });
    cancelAnimationFrame(requestRef.current);
  };
  
  // Handle keyboard input
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'Space' || e.code === 'ArrowUp') {
        // Start game if not running
        if (!gameState.isRunning && !gameState.gameOver) {
          startGame();
          return;
        }
        
        // Jump if not already jumping and not ducking
        if (gameState.isRunning && gameState.dinoState !== 'jumping' && gameState.dinoState !== 'ducking') {
          setGameState(prev => ({
            ...prev,
            dinoState: 'jumping',
            jumpVelocity: JUMP_VELOCITY
          }));
        }
      }
      else if (e.code === 'ArrowDown') {
        // Duck if running and not jumping
        if (gameState.isRunning && gameState.dinoState !== 'jumping') {
          setGameState(prev => ({
            ...prev,
            dinoState: 'ducking'
          }));
        }
      }
      // Restart on game over
      else if (gameState.gameOver && (e.code === 'Space' || e.code === 'Enter')) {
        startGame();
      }
    };

    const handleKeyUp = (e) => {
      if (e.code === 'ArrowDown' && gameState.dinoState === 'ducking') {
        setGameState(prev => ({
          ...prev,
          dinoState: 'running'
        }));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [gameState.isRunning, gameState.dinoState, gameState.gameOver]);
  
  // Game loop
  useEffect(() => {
    if (!gameState.isRunning) return;
    
    const updateGameState = (timestamp) => {
      if (!lastTimeRef.current) lastTimeRef.current = timestamp;
      const deltaTime = timestamp - lastTimeRef.current;
      lastTimeRef.current = timestamp;
      
      setGameState(prev => {
        // Update score
        const newScore = prev.score + deltaTime * 0.01;
        
        // Update speed based on score
        const newSpeed = Math.min(16, 6 + Math.floor(newScore / 100));
        
        // Update ground position - reversed direction
        const newGroundPosition = (prev.groundPosition + newSpeed) % 600;
        
        // Update dino position if jumping
        let newDinoY = prev.dinoY;
        let newJumpVelocity = prev.jumpVelocity;
        let newDinoState = prev.dinoState;
        
        if (prev.dinoState === 'jumping') {
          newDinoY = prev.dinoY + prev.jumpVelocity;
          newJumpVelocity = prev.jumpVelocity - GRAVITY;
          
          // Check if landed
          if (newDinoY <= 0) {
            newDinoY = 0;
            newJumpVelocity = 0;
            newDinoState = 'running';
          }
        }
        
        // Update obstacles - direction remains the same as we want them to still approach the dino
        const newObstacles = prev.obstacles
          .map(obstacle => ({
            ...obstacle,
            position: obstacle.position - newSpeed
          }))
          .filter(obstacle => obstacle.position > -obstacle.width);
        
        // Generate new obstacles
        if (
          (newObstacles.length === 0 || 
          (newObstacles[newObstacles.length - 1].position < 400 && Math.random() < 0.02))
          && newScore > 10 // Don't generate obstacles at the very beginning
        ) {
          const isBird = newScore > 500 && Math.random() < 0.3;
          
          if (isBird) {
            // Bird heights: low, medium, high
            const birdHeights = [20, 50, 80];
            const height = birdHeights[Math.floor(Math.random() * birdHeights.length)];
            
            newObstacles.push({
              type: 'bird',
              position: 800,
              width: 46,
              height: 30,
              y: height,
              frame: 0
            });
          } else {
            // Cactus sizes: small, medium, large
            const cactusSizes = [
              { width: 20, height: 40 },
              { width: 30, height: 50 },
              { width: 40, height: 60 }
            ];
            
            // Group of cacti possibility
            const isCactusGroup = Math.random() < 0.3;
            let lastPosition = 800;
            
            if (isCactusGroup) {
              const groupSize = Math.floor(Math.random() * 2) + 2; // 2-3 cacti
              
              for (let i = 0; i < groupSize; i++) {
                const cactusSize = cactusSizes[Math.floor(Math.random() * 2)]; // Small or medium only for groups
                newObstacles.push({
                  type: 'cactus',
                  position: lastPosition,
                  width: cactusSize.width,
                  height: cactusSize.height,
                  y: 0
                });
                lastPosition += cactusSize.width + 10 + Math.random() * 20;
              }
            } else {
              const cactusSize = cactusSizes[Math.floor(Math.random() * cactusSizes.length)];
              newObstacles.push({
                type: 'cactus',
                position: lastPosition,
                width: cactusSize.width,
                height: cactusSize.height,
                y: 0
              });
            }
          }
        }
        
        // Check collision
        let collision = false;
        
        const dinoHeight = newDinoState === 'ducking' ? DINO_HEIGHT / 2 : DINO_HEIGHT;
        const dinoWidth = newDinoState === 'ducking' ? DINO_WIDTH * 1.2 : DINO_WIDTH;
        
        newObstacles.forEach(obstacle => {
          if (obstacle.position < 100 + dinoWidth && 
              obstacle.position + obstacle.width > 100 && 
              obstacle.y + obstacle.height > newDinoY && 
              obstacle.y < newDinoY + dinoHeight) {
            collision = true;
          }
        });
        
        // Night mode toggle
        const newNightMode = prev.nightMode;
        if (Math.floor(newScore / 500) % 2 === 1 && !prev.nightMode) {
          // Day to Night
          return {
            ...prev,
            nightMode: true,
            score: newScore,
            speed: newSpeed,
            groundPosition: newGroundPosition,
            dinoY: newDinoY,
            jumpVelocity: newJumpVelocity,
            dinoState: newDinoState,
            obstacles: newObstacles,
            gameOver: collision
          };
        } else if (Math.floor(newScore / 500) % 2 === 0 && prev.nightMode) {
          // Night to Day
          return {
            ...prev,
            nightMode: false,
            score: newScore,
            speed: newSpeed,
            groundPosition: newGroundPosition,
            dinoY: newDinoY,
            jumpVelocity: newJumpVelocity,
            dinoState: newDinoState,
            obstacles: newObstacles,
            gameOver: collision
          };
        }
        
        // Return updated state
        return {
          ...prev,
          score: newScore,
          speed: newSpeed,
          groundPosition: newGroundPosition,
          dinoY: newDinoY,
          jumpVelocity: newJumpVelocity,
          dinoState: newDinoState,
          obstacles: newObstacles,
          gameOver: collision
        };
      });
      
      if (!gameState.gameOver) {
        requestRef.current = requestAnimationFrame(updateGameState);
      }
    };
    
    requestRef.current = requestAnimationFrame(updateGameState);
    
    return () => {
      cancelAnimationFrame(requestRef.current);
      lastTimeRef.current = 0;
    };
  }, [gameState.isRunning, gameState.gameOver]);
  
  // Handle game over state
  useEffect(() => {
    if (gameState.gameOver) {
      handleGameOver();
    }
  }, [gameState.gameOver]);
  
  // Render dino based on state - flipped to face left
  const renderDino = () => {
    const dinoStyle = {
      position: 'absolute',
      left: '100px',
      bottom: `${gameState.dinoY + GROUND_HEIGHT}px`,
      width: gameState.dinoState === 'ducking' ? `${DINO_WIDTH * 1.2}px` : `${DINO_WIDTH}px`,
      height: gameState.dinoState === 'ducking' ? `${DINO_HEIGHT / 2}px` : `${DINO_HEIGHT}px`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: gameState.dinoState === 'ducking' ? '24px' : '32px',
      transform: gameState.dinoState === 'ducking' 
        ? 'translateY(12px) scaleX(-1)' // Flip horizontally for ducking
        : 'scaleX(-1)', // Flip horizontally for running/jumping
    };
    
    // Choose dino frame based on state and animation
    const dinoFrame = Math.floor(gameState.score / 10) % 2;
    
    return (
      <div style={dinoStyle}>
        {gameState.dinoState === 'ducking' ? '🦎' : '🦖'}
      </div>
    );
  };
  
  // Render ground with moving texture in opposite direction
  const renderGround = () => {
    const groundStyle = {
      position: 'absolute',
      bottom: '0',
      width: '100%',
      height: `${GROUND_HEIGHT}px`,
      backgroundImage: 'repeating-linear-gradient(to right, #ccc 0, #ccc 5px, #fff 5px, #fff 10px)',
      backgroundPosition: `${gameState.groundPosition}px 0`, // Track now moves in opposite direction
    };
    
    return <div style={groundStyle}></div>;
  };
  
  // Render clouds
  const renderClouds = () => {
    const cloudPositions = [
      { left: (100 - gameState.score * 0.5) % 800, top: 100 },
      { left: (400 - gameState.score * 0.5) % 800, top: 60 },
      { left: (700 - gameState.score * 0.5) % 800, top: 120 }
    ];
    
    return cloudPositions.map((cloud, index) => (
      <div key={index} style={{
        position: 'absolute',
        left: `${cloud.left}px`,
        top: `${cloud.top}px`,
        fontSize: '24px',
        opacity: '0.7'
      }}>
        ☁️
      </div>
    ));
  };
  
  // Render obstacles
  const renderObstacles = () => {
    return gameState.obstacles.map((obstacle, index) => {
      const obstacleStyle = {
        position: 'absolute',
        left: `${obstacle.position}px`,
        bottom: `${obstacle.y + GROUND_HEIGHT}px`,
        width: `${obstacle.width}px`,
        height: `${obstacle.height}px`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: obstacle.type === 'bird' ? '24px' : '28px'
      };
      
      return (
        <div key={index} style={obstacleStyle}>
          {obstacle.type === 'bird' ? '🦅' : '🌵'}
        </div>
      );
    });
  };
  
  // Render stars (for night mode)
  const renderStars = () => {
    if (!gameState.nightMode) return null;
    
    const stars = [];
    for (let i = 0; i < 20; i++) {
      const size = Math.random() * 2 + 1;
      stars.push(
        <div key={i} style={{
          position: 'absolute',
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 60}%`,
          width: `${size}px`,
          height: `${size}px`,
          backgroundColor: 'white',
          borderRadius: '50%'
        }}></div>
      );
    }
    
    return stars;
  };
  
  // Render moon (for night mode)
  const renderMoon = () => {
    if (!gameState.nightMode) return null;
    
    return (
      <div style={{
        position: 'absolute',
        right: '50px',
        top: '50px',
        fontSize: '32px'
      }}>
        🌙
      </div>
    );
  };
  
  // Render sun (for day mode)
  const renderSun = () => {
    if (gameState.nightMode) return null;
    
    return (
      <div style={{
        position: 'absolute',
        right: '50px',
        top: '50px',
        fontSize: '32px'
      }}>
        ☀️
      </div>
    );
  };
  
  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-4">
      <div className="mb-4 flex justify-between w-full max-w-3xl">
        <div className="text-xl font-mono">
          Score: {Math.floor(gameState.score)}
        </div>
        <div className="text-xl font-mono">
          HI: {Math.floor(gameState.highScore)}
        </div>
      </div>
      
      <div 
        ref={gameContainerRef}
        className={`relative w-full max-w-3xl h-64 border-2 border-gray-400 overflow-hidden ${gameState.nightMode ? 'bg-gray-900' : 'bg-white'}`}
      >
        {renderStars()}
        {renderSun()}
        {renderMoon()}
        {renderClouds()}
        {renderGround()}
        {renderDino()}
        {renderObstacles()}
        
        {/* Game Over Screen */}
        {gameState.gameOver && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-20">
            <div className={`text-2xl font-bold mb-6 ${gameState.nightMode ? 'text-white' : 'text-gray-800'}`}>
              GAME OVER
            </div>
            <button 
              onClick={startGame}
              className="px-6 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 focus:outline-none"
            >
              Restart
            </button>
          </div>
        )}
        
        {/* Start Screen */}
        {!gameState.isRunning && !gameState.gameOver && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-20">
            <div className={`text-2xl font-bold mb-6 ${gameState.nightMode ? 'text-white' : 'text-gray-800'}`}>
              Press SPACE to start
            </div>
          </div>
        )}
      </div>
      
      <div className="mt-4 text-center text-gray-600">
        <div>Press SPACE or UP to jump</div>
        <div>Press DOWN to duck</div>
      </div>
    </div>
  );
}