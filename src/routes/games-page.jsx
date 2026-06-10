import { cn } from '@core/helpers';
import { listGames } from '@feature/game/api';
import GameCard from '@feature/game/components/game-card';
import GameCreateForm from '@feature/game/components/game-create-form';
import { useGameContext } from '@feature/game/context/game-context';
import ButtonAdd from '@ui/layout/button-add';
import { Typography } from '@ui/text/typography';
import { useEffect, useState } from 'react';
import { Link } from 'react-router';

export function GamesPage() {

  const { player, logout } = useGameContext();
  const [creatingGame, setCreatingGame] = useState(false);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [games, setGames] = useState({});

  async function fetchGames() {
    //setLoading(true);

    try {
      const response = await listGames();
      setGames(response);
      console.log(JSON.stringify(response, null, 2));

    } catch (err) {
      console.error(err);
      setError(err);

    } finally {
      //setLoading(false);
    }
  }

  useEffect(() => {
    fetchGames();
  }, [])


  //constantly fetches games
  const [segundos, setSegundos] = useState(0);
  const X = 7;
  useEffect(() => {
    const meuIntervalo = setInterval(() => {
      fetchGames();
      setSegundos((prev) => prev + X);
    }, X * 1000);
    return () => clearInterval(meuIntervalo);

  }, [X]);


  return (
    <div className={cn(
      'flex flex-col gap-6 py-8 flex-1',

      'w-full max-w-6xl mx-auto px-4 items-center text-center'
    )}>
      {player?.id ?
        <> {/**MARK: has player registered
      */}
          <Typography
            variant={'h1'}
            asTag={'h1'}
            className={cn('text-4xl', 'font-bold', 'text-white')}
          >
            Matches - {games.total} found
          </Typography>
          {loading && <h3>Loading matches . . .</h3>}
          {error && <h3>{error}</h3>}

          {games?.items?.map((match, m) => {
            return (
              <GameCard match={match} />
            )
          })}
        </>
        :
        <div className={cn('bg-blue-900 p-3', 'flex flex-col items-center text-center gap-3')}>
          {/**MARK: has no player
          */}
          <img src='https://www.cameronsworld.net/img/content/22/right-side/23.gif' alt='!!! CUIDADO !!!'></img>
          <Typography
            variant={'h1'}
            asTag={'h1'}
            className={cn('text-4xl', 'font-bold', 'text-white')}
          >
            To watch a game, please <Link to={'/player'} className='underline' > register your player</Link>.
          </Typography>
        </div>

      }
      <ButtonAdd onClick={() => setCreatingGame(true)} children='New game' />
      {creatingGame && <GameCreateForm playerId={player?.id} onClose={() => { setCreatingGame(false) }} />}
    </div>
  );
}
