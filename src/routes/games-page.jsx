import { cn } from '@core/helpers';
import { listGames } from '@feature/game/api';
import GameCard from '@feature/game/components/game-card';
import GameCreateForm from '@feature/game/components/game-create-form';
import { useGameContext } from '@feature/game/context/game-context';
import ButtonAdd from '@ui/layout/button-add';
import { Typography } from '@ui/text/typography';
import { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router';

import Pagination from '@ui/layout/pagination';

export function GamesPage() {

  const { player, logout } = useGameContext();
  const [creatingGame, setCreatingGame] = useState(false);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [games, setGames] = useState({});

  const ITEMS_PER_PAGE = 20;
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil((games.total || 0) / ITEMS_PER_PAGE) || 1;

  const statues = ['ALL GAMES', 'WAITING_PLAYERS', 'PLAYING', 'PAUSED', 'FINISHED']
  const [selectedStatus, setSelectedStatus] = useState('ALL GAMES');


  const fetchGames = useCallback(async (currentStatus, currentPage) => {
    const statusFilter = currentStatus === 'ALL GAMES' ? undefined : currentStatus;

    try {
      const response = await listGames({}, statusFilter, currentPage, ITEMS_PER_PAGE);
      setGames(response);

    } catch (err) {
      console.error(err);
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []); // useCallback evita recriação infinita no setInterval


  //scrolls page to top if using bottom pagination
  const handlePageChange = (newPage, shouldScrollToTop = false) => {
    setPage(newPage);

    if (shouldScrollToTop) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  //resets current page
  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value);
    setPage(1);
  };

  useEffect(() => {
    fetchGames(selectedStatus, page);
  }, [selectedStatus, page, fetchGames]);


  const X = 7;
  useEffect(() => {
    const meuIntervalo = setInterval(() => {
      fetchGames(selectedStatus, page);
    }, X * 1000);
    return () => clearInterval(meuIntervalo);

  }, [X, selectedStatus, page, fetchGames]);




  return (
    <div className={cn(
      'flex flex-col gap-6 py-8 flex-1',
      'w-full max-w-6xl mx-auto px-4 items-center text-center'
    )}>
      {player?.id ?
        <>
          <Typography
            variant={'h1'}
            asTag={'h1'}
            className={cn('text-4xl', 'font-bold', 'text-white', 'bg-cyan-900 px-4')}
          >
            Matches - {games.total || 0} found
          </Typography>
          {loading && <h3 className={cn(' text-yellow-500 ')} >Loading matches . . .</h3>}
          {error && <h3>{error}</h3>}

          {/**
           * MARK: FILTER
           */}
          <div className={cn('flex flex-row bg-white p-1')}>
            <label className="text-black p-1">Filter: </label>
            <select
              value={selectedStatus}
              onChange={handleStatusChange}
              className="text-black border border-black rounded-sm p-1"
            >
              {statues.map((s, i) => (
                <option key={i} value={s}>{s}</option>
              ))}
            </select>
          </div>

          <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={(newPage) => handlePageChange(newPage, false)}
            showHome={true}
          />

          {/**MARK: GAMES */}
          {games?.items?.map((match, m) => {
            return (
              <GameCard key={match.id || m} match={match} />
            )
          })}

          {games.total > 1 &&
            <Pagination
              page={page}
              totalPages={totalPages}
              onPageChange={(newPage) => handlePageChange(newPage, true)} // false = continua onde está
              showHome={true}
            />
          }
        </>



        : //MARK: NO GAMES
        <div className={cn('bg-blue-900 p-3', 'flex flex-col items-center text-center gap-3')}>
          <img src='https://www.cameronsworld.net/img/content/22/right-side/23.gif' alt='!!! CUIDADO !!!'></img>
          <Typography
            variant={'h1'}
            asTag={'h1'}
            className={cn('text-4xl', 'font-bold', 'text-white')}
          >
            To watch a game, please <Link to={'/player'} className='underline text-blue-400' > register your player</Link>.
          </Typography>
        </div>
      }
      {player?.id &&
        <>
          <ButtonAdd onClick={() => setCreatingGame(true)} children='New game' />
          {creatingGame && <GameCreateForm playerId={player?.id} onClose={() => { setCreatingGame(false) }} />}
        </>
      }
    </div>
  );
}