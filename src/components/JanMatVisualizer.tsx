import { useState } from 'react';

export default function JanMatVisualizer() {
  const [voterSwing, setVoterSwing] = useState(0); // -10% to +10%
  const [selectedRegion, setSelectedRegion] = useState('All Constituencies');

  // Multi-party forecast data depending on voter swing slider
  const parties = [
    { name: 'National Democratic Alliance (NDA)', baseSeats: 292, swingMultiplier: 8, color: '#FF9933' },
    { name: 'Indian National Developmental Inclusive Alliance (INDIA)', baseSeats: 234, swingMultiplier: -7, color: '#1F77B4' },
    { name: 'Others & Independents', baseSeats: 17, swingMultiplier: -1, color: '#2CA02C' },
  ];

  const totalSeats = 543;

  return (
    <div className="w-full glass-panel rounded-xl p-4 md:p-6 border border-white/5 space-y-4 font-mono text-xs relative overflow-hidden" id="janmat-live-dashboard">
      <div className="absolute inset-0 bg-gradient-to-tr from-purple-neon/5 via-transparent to-transparent pointer-events-none" />
      
      {/* Visualizer header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-white/5 pb-3 gap-2">
        <div>
          <span className="text-cyan-neon font-bold">● JANMAT_AI_SIMULATOR v1.4</span>
          <p className="text-[10px] text-zinc-500 font-sans mt-0.5">Adjust demographic voter swing to model machine learning seat distribution outcomes.</p>
        </div>
        <div className="flex gap-1.5">
          {['All Constituencies', 'Uttar Pradesh', 'Maharashtra', 'Bihar'].map((region) => (
            <button
              key={region}
              onClick={() => setSelectedRegion(region)}
              className={`px-2 py-1 rounded border text-[10px] transition-all duration-200 cursor-pointer ${
                selectedRegion === region
                  ? 'border-cyan-neon bg-cyan-neon/10 text-cyan-neon'
                  : 'border-white/5 bg-white/5 text-zinc-400 hover:text-white'
              }`}
            >
              {region}
            </button>
          ))}
        </div>
      </div>

      {/* Simulator Dials */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        {/* Swing Slider Dial */}
        <div className="space-y-3">
          <div className="flex justify-between items-center text-[11px]">
            <span className="text-zinc-300">DEMOGRAPHIC SWING SLIDER</span>
            <span className={`font-bold ${voterSwing >= 0 ? 'text-cyan-neon' : 'text-purple-neon'}`}>
              {voterSwing > 0 ? `+${voterSwing}% Swing` : `${voterSwing}% Swing`}
            </span>
          </div>

          <div className="relative">
            <input
              type="range"
              min="-10"
              max="10"
              step="0.5"
              value={voterSwing}
              onChange={(e) => setVoterSwing(parseFloat(e.target.value))}
              className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-cyan-neon focus:outline-none"
              id="swing-simulator-slider"
            />
            <div className="flex justify-between text-[9px] text-zinc-500 mt-1 select-none">
              <span>-10% (Opposition Swing)</span>
              <span>Neutral</span>
              <span>+10% (Alliance Swing)</span>
            </div>
          </div>

          {/* Quick analysis output */}
          <div className="bg-black/40 border border-white/5 rounded-lg p-2.5 text-[10px] text-zinc-400 space-y-1">
            <span className="text-zinc-500 uppercase block font-bold">ML Predictive Insight:</span>
            <p className="font-sans">
              A swing of {voterSwing}% triggers seat flip probabilities in{' '}
              <span className="text-cyan-neon font-mono font-bold">
                {Math.abs(Math.round(voterSwing * 4.2))}
              </span>{' '}
              vulnerable battleground constituencies. Elasticity index suggests high susceptibility in semi-urban sectors.
            </p>
          </div>
        </div>

        {/* Seat Share Bar & Output */}
        <div className="space-y-3">
          <span className="text-zinc-400 block text-[10px] uppercase">Predicted Seat Distribution (Total: {totalSeats})</span>
          
          {/* Dynamic Stacked bar chart */}
          <div className="h-6 w-full rounded-md overflow-hidden flex border border-white/10 shadow-inner">
            {parties.map((party, idx) => {
              // Calculate dynamic seat counts based on swing
              const swingEffect = Math.round(voterSwing * party.swingMultiplier);
              const dynamicSeats = Math.max(5, Math.min(totalSeats - 10, party.baseSeats + swingEffect));
              const widthPct = (dynamicSeats / totalSeats) * 100;

              return (
                <div
                  key={idx}
                  style={{
                    width: `${widthPct}%`,
                    backgroundColor: party.color,
                  }}
                  className="h-full transition-all duration-500 ease-out flex items-center justify-center text-[9px] font-bold text-white overflow-hidden text-ellipsis whitespace-nowrap px-0.5"
                  title={`${party.name}: ${dynamicSeats} seats`}
                >
                  {dynamicSeats >= 50 && dynamicSeats}
                </div>
              );
            })}
          </div>

          {/* Legend and stats */}
          <div className="space-y-1.5 pt-1">
            {parties.map((party, idx) => {
              const swingEffect = Math.round(voterSwing * party.swingMultiplier);
              const dynamicSeats = Math.max(5, Math.min(totalSeats - 10, party.baseSeats + swingEffect));
              const isWinner = dynamicSeats >= 272; // Majority threshold in India

              return (
                <div key={idx} className="flex justify-between items-center text-[11px]">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: party.color }} />
                    <span className="text-zinc-300 font-sans truncate max-w-[150px] md:max-w-[220px]">
                      {party.name.split(' (')[1] ? party.name.split(' (')[1].replace(')', '') : party.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-zinc-400">({swingEffect >= 0 ? `+${swingEffect}` : swingEffect})</span>
                    <span className={`font-bold font-mono ${isWinner ? 'text-cyan-neon' : 'text-zinc-100'}`}>
                      {dynamicSeats} Seats {isWinner && '★'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
