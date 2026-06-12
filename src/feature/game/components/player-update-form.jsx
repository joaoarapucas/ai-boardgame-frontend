import { cn } from '@core/helpers';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { updatePlayerMoveEndpoint } from '../api';
import { useGameContext } from '../context/game-context';

export function PlayerUpdateForm() {
  const { player, setPlayer } = useGameContext();

  const form = useForm({
    defaultValues: {
      ai_player_move_endpoint:
        player?.ai_player_move_endpoint || 'https://example.com/move-endpoint',
    },
  });

  const { formState } = form;
  const { isSubmitting, errors } = formState;

  async function handleSubmit(dto) {
    try {
      const response = await updatePlayerMoveEndpoint(player?.id, { ...dto });

      if (!response?.id) {
        throw new Error('[ERR]: resposta inesperada ao atualizar jogador');
      }

      setPlayer(Object.assign({}, player, response));
    } catch (err) {
      console.error(err?.message || '[ERR]: erro ao atualizar jogador', err);
    }
  }

  useEffect(() => {
    if (player?.id) {
      form.reset({
        ai_player_move_endpoint:
          player?.ai_player_move_endpoint || 'https://example.com/move-endpoint',
      });
    }
  }, [player]);

  return (
    <div className="bg-cyan-100 w-full max-w-md p-4">
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className={cn('flex flex-col gap-3')}
      >
        <fieldset className="border-2 border-purple-900 p-2 rounded-none">
          <legend className="text-xl text-slate-800 px-2">Update movement endpoint</legend>

          <Controller
            name={'ai_player_move_endpoint'}
            control={form.control}
            rules={{ required: 'The movement endpoint is obrigatory.' }}
            render={({ field }) => (
              <div className={cn('flex flex-col gap-1.5 mt-2')}>
                <div className="flex flex-row gap-1.5 items-center">
                  <label className="text-base text-black text-nowrap w-36">Move endpoint:</label>
                  <input
                    className="bg-white text-black text-base border border-black rounded-none px-1 w-full"
                    type="text"
                    {...field}
                  />
                </div>
                {errors.ai_player_move_endpoint && (
                  <span className="text-red-600 text-xs">
                    {errors.ai_player_move_endpoint.message}
                  </span>
                )}
              </div>
            )}
          />

          <div className="flex justify-end mt-3">
            <button
              type="submit"
              disabled={isSubmitting}
              className="text-base text-blue-600 underline cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Updating...' : 'Update endpoint'}
            </button>
          </div>

        </fieldset>
      </form>
    </div>
  );
}
