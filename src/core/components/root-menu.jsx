import { cn } from '@core/helpers';
import { useGameContext } from '@feature/game/context/game-context';
import AudioLoopPlayer from '@ui/layout/audio-player';
import { Container } from '@ui/layout/container';
import { Link, useNavigate, useResolvedPath } from 'react-router';

import music from '../../assets/camerons_world_[dial-up_dub_version].mp3'

export function RootMenu() {
  const { player, logout } = useGameContext();
  const navigate = useNavigate();
  const resolvedPath = useResolvedPath();

  return (
    <div className={cn('text-white w-full')}>
      <Container
        className={cn(
          'flex flex-row items-center justify-between w-full px-4'
        )}
      >
        {/* 1. ESPELHO INVISÍVEL: Tem o mesmo tamanho do player de áudio (40px)
            Isso garante que o menu centralize no meio real da tela, e não seja empurrado para o lado */}
        <div className="w-[40px] h-[40px] pointer-events-none hidden sm:block" />

        <nav
          id={'root-menu'}
          className={cn(
            'w-fit mt-[25px]',
            'flex flex-wrap items-center justify-center gap-[5px] underline',

            'border-8',

            //top left
            'border-t-cyan-600 border-l-cyan-600',

            //bottom right
            'border-b-fuchsia-800 border-r-fuchsia-800',

            'bg-[#140a5c] p-1' //bg
          )}
        >
          <Link
            to={'/'}
            className={cn(
              'w-[100px] h-[42px] pt-[8px] text-center',
              'text-lg hover:bg-green-500 transition-all',
              {
                'bg-green-500': resolvedPath.pathname === '/',
              }
            )}
          >
            Home
          </Link>

          <Link
            to={'/games'}
            className={cn(
              'w-[100px] h-[42px] pt-[8px] text-center',
              'text-lg hover:bg-green-500 transition-all',
              {
                'bg-green-500': resolvedPath.pathname.startsWith('/games'),
              }
            )}
          >
            Games
          </Link>

          <Link
            to={'/player'}
            className={cn(
              'w-[100px] h-[42px] pt-[8px] text-center',
              'text-lg hover:bg-green-500 transition-all',
              {
                'bg-green-500': resolvedPath.pathname.startsWith('/player'),
              }
            )}
          >
            Player
          </Link>

          {player && (
            <button
              type="button"
              className={cn(
                'text-lg p-2 px-4 bg-red-800 hover:bg-red-700 transition-all',
              )}
              onClick={() => {
                logout();
                navigate('/', {
                  replace: true,
                });
              }}
            >
              Exit ({player.ai_player_name})
            </button>
          )}
        </nav>

        <div className="flex justify-end w-[40px] mt-[25px]">
          <AudioLoopPlayer src={music} />
        </div>

      </Container>
    </div>
  );
}