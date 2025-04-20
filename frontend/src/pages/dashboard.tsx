import React from 'react';

const calorieData = [
  { day: 'Mon', intake: 1400, burn: 1200 },
  { day: 'Tue', intake: 1500, burn: 1300 },
  { day: 'Wed', intake: 1300, burn: 1250 },
  { day: 'Thu', intake: 1600, burn: 1400 },
  { day: 'Fri', intake: 1550, burn: 1500 },
  { day: 'Sat', intake: 1700, burn: 1600 },
  { day: 'Sun', intake: 1650, burn: 1550 },
];

const Dashboard = () => {
  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 p-4">
        <div className="text-2xl font-bold mb-6">🏋 GymRat+</div>
        <nav className="space-y-3">
          {['Dashboard', 'Plans', 'Game', 'Community', 'Avatar Studio'].map((item) => (
            <button key={item} className="w-full text-left bg-gray-700 px-4 py-2 rounded hover:bg-gray-600">
              {item}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 space-y-6">
        {/* Daily Snapshot */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-gray-800 p-4 rounded shadow">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold">🏃‍♂ Workout Today</h3>
              <button className="bg-green-600 px-3 py-1 rounded text-sm">Start</button>
            </div>
            <p>Full-Body Strength • 45 min</p>
          </div>

          <div className="bg-gray-800 p-4 rounded shadow">
            <h3 className="text-lg font-semibold mb-2">🍽 Diet Today</h3>
            <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
              <div className="h-full bg-green-500 w-3/4" />
            </div>
            <p className="mt-2 text-sm">1200 / 1600 kcal</p>
          </div>

          <div className="bg-gray-800 p-4 rounded shadow">
            <h3 className="text-lg font-semibold mb-2">🦖 Dino Race</h3>
            <p>Distance: 1.2 km</p>
            <p>Jumps: 45</p>
          </div>
        </div>

        {/* Real-Time & Progress */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-800 p-4 rounded shadow h-64 flex items-center justify-center">
            <h3 className="text-lg font-semibold">📹 Posture Feedback</h3>
          </div>

          <div className="bg-gray-800 p-4 rounded shadow">
            <h3 className="text-lg font-semibold mb-2">📊 Progress Charts</h3>
            <div className="grid grid-cols-2 grid-rows-2 gap-2 text-xs text-center text-gray-300">
              <div className="bg-gray-700 h-20 flex items-center justify-center rounded">Calories vs Burn (chart)</div>
              <div className="bg-gray-700 h-20 flex items-center justify-center rounded">Macros Breakdown (chart)</div>
              <div className="bg-gray-700 h-20 flex items-center justify-center rounded">Weight & Fat Trend</div>
              <div className="bg-gray-700 h-20 flex items-center justify-center rounded">Streak Tracker</div>
            </div>
          </div>
        </div>

        {/* Avatar & Gamification */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-gray-800 p-4 rounded shadow">
            <h3 className="text-lg font-semibold mb-2">🦸 Avatar Studio</h3>
            <div className="flex space-x-4 mb-2">
              <div className="w-1/2 h-24 bg-gray-700 flex items-center justify-center rounded">Current</div>
              <div className="w-1/2 h-24 bg-gray-700 flex items-center justify-center rounded">Past</div>
            </div>
            <button className="bg-indigo-600 px-3 py-1 rounded text-sm">Rebuild Avatar</button>
          </div>

          <div className="bg-gray-800 p-4 rounded shadow">
            <h3 className="text-lg font-semibold mb-2">🏅 Gamification</h3>
            <p>Badges & Streaks</p>
            <button className="text-indigo-400 text-sm mt-2 underline">Redeem Coupons</button>
          </div>

          <div className="bg-gray-800 p-4 rounded shadow">
            <h3 className="text-lg font-semibold mb-2">🤝 Community</h3>
            <button className="bg-green-600 text-white px-3 py-1 mb-2 rounded text-sm">Join Live Workout</button>
            <p>Friends Leaderboard (bar chart)</p>
          </div>
        </div>

        {/* Recommendations */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-800 p-4 rounded shadow">
            <h3 className="text-lg font-semibold mb-2">🔮 Recommendations</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300">
              <li>Next Workout: HIIT Cardio</li>
              <li>Meal Swap Ideas</li>
              <li>Recovery Tips</li>
            </ul>
          </div>

          <footer className="text-gray-400 text-sm p-4">
            <p>© 2025 GymRat+. Sync Wearables: <span className="text-white">On</span></p>
            <div className="flex space-x-4 mt-2">
              <button className="underline">Terms</button>
              <button className="underline">Privacy</button>
              <button className="underline">Support</button>
            </div>
            <p className="mt-2 text-gray-500">v1.0.0</p>
          </footer>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
