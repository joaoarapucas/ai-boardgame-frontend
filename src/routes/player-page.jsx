import { cn } from '@core/helpers';
import { PlayerRegisterForm } from '@feature/game/components/player-register-form';
import { PlayerUpdateForm } from '@feature/game/components/player-update-form';
import { useGameContext } from '@feature/game/context/game-context';
import PlayerAvatar from '@ui/layout/player-avatar';
import { Typography } from '@ui/text/typography';

export function PlayerPage() {
  const { player } = useGameContext();

  return (
    <div className={cn('flex flex-col items-center gap-4 py-8', 'flex-1', 'bg-blue-900 text-white text-lg font-bold p-5')}>
      <Typography
        variant={'h1'}
        asTag={'h1'}
        className={cn('text-4xl', 'font-bold')}
      >
        {player?.ai_player_name ? `${player.ai_player_name}` : 'Create Player or Log in'}
      </Typography>

      {!player && (
        <div className={cn('')}>
          <PlayerRegisterForm />
        </div>
      )}

      {player && (
        <>
          <div className="bg-cyan-100 w-full max-w-md p-4">
            <fieldset className="border-2 border-purple-900 p-2">
              <legend className="text-xl text-slate-800 px-2">Player info</legend>

              <div className="flex flex-col gap-1.5 mt-2 text-black text-base">

                <div className="flex flex-row items-center">
                  <PlayerAvatar userImage={player?.ai_player_avatar} className="w-32" />
                </div>

                <div className="flex flex-row gap-1.5">
                  <span className="text-nowrap w-36"><strong>Group:</strong></span>
                  <span>{player?.group_name}</span>
                </div>

                <div className="flex flex-row gap-1.5">
                  <span className="text-nowrap w-36"><strong>Player name:</strong></span>
                  <span>{player?.ai_player_name}</span>
                </div>

                <div className="flex flex-row gap-1.5">
                  <span className="text-nowrap w-36"><strong>Description:</strong></span>
                  <span>{player?.ai_player_description}</span>
                </div>

                <div className="flex flex-row gap-1.5">
                  <span className="text-nowrap w-36"><strong>Move endpoint:</strong></span>
                  <span className="break-all">{player?.ai_player_move_endpoint}</span>
                </div>

              </div>
            </fieldset>
          </div>

          <hr className="border-purple-900 w-full max-w-md" />

          <PlayerUpdateForm />
        </>
      )}

    </div>
  );
}
