import { useGameStore } from './game/store';
import { MainMenu } from './components/MainMenu';
import { GameMap } from './components/Map';
import { Combat } from './components/Combat';
import { Reward } from './components/Reward';
import { RestSite, EventScreen } from './components/RestSite';
import { GameOver, Victory } from './components/GameOver';
import { PlayerHUD } from './components/PlayerHUD';

function App() {
  const phase = useGameStore(s => s.phase);

  return (
    <div className="w-full h-screen relative overflow-hidden" style={{ backgroundColor: '#08080f' }}>
      {/* Phase-based rendering */}
      {phase === 'main_menu' && <MainMenu />}
      {phase === 'map' && <GameMap />}
      {phase === 'combat' && <Combat />}
      {phase === 'combat_reward' && <Reward />}
      {phase === 'rest' && <RestSite />}
      {phase === 'event' && <EventScreen />}
      {phase === 'game_over' && <GameOver />}
      {phase === 'victory' && <Victory />}

      {/* Persistent HUD overlay */}
      <PlayerHUD />
    </div>
  );
}

export default App;
