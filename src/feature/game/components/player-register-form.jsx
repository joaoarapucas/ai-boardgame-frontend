import { Controller, useForm } from 'react-hook-form';
import { registerPlayer, listPlayers } from '../api';
import { cn } from '@core/helpers';
import { useGameContext } from '../context/game-context';
import { useEffect } from 'react';
import { setAccessToken } from '@core/helpers/fetch';

export function PlayerRegisterForm() {
  const { player, setPlayer } = useGameContext();

  const form = useForm({
    defaultValues: {
      ai_player_name: player?.ai_player_name || 'Meu Jogador',
      ai_player_avatar:
        player?.ai_player_avatar || 'https://example.com/avatar.png',
      group_name: player?.group_name || 'Meu Grupo',
      ai_player_description:
        player?.ai_player_description || 'Descrição do meu jogador de IA',
      ai_player_move_endpoint:
        player?.ai_player_move_endpoint || 'https://example.com/move-endpoint',
    },
  });

  const loginForm = useForm({
    defaultValues: {
      player_id: '212',
      player_access_token: 'SFLPtCJzH4g1Y-DK8FfCXFUbQouh3u3bdQKMfKqeDD0',
    },
  });

  const { formState } = form;
  const { isSubmitting, errors } = formState;

  const {
    formState: { isSubmitting: isLoginSubmitting, errors: loginErrors },
  } = loginForm;

  async function handleRegisterSubmit(dto) {
    try {
      const response = await registerPlayer({ ...dto });

      if (!response?.player_access_token) {
        throw new Error('[ERR]: resposta inesperada ao registrar jogador');
      }

      setPlayer(response);

      form.reset({
        ai_player_name: response?.ai_player_name,
        ai_player_avatar: response?.ai_player_avatar,
        group_name: response?.group_name,
        ai_player_description: response?.ai_player_description,
        ai_player_move_endpoint: response?.ai_player_move_endpoint,
      });
    } catch (err) {
      console.error(err?.message || '[ERR]: erro ao registrar jogador', err);
    }
  }

  async function handleLoginSubmit(dto) {
    try {
      setAccessToken(dto.player_access_token);

      const players = await listPlayers();
      console.log(JSON.stringify(players, null, 2));

      const found = players?.find((p) => String(p.id) === String(dto.player_id));

      if (!found) {
        loginForm.setError('player_id', {
          type: 'manual',
          message: 'Jogador não encontrado ou credenciais inválidas',
        });
        setAccessToken(null);
        return;
      }

      setPlayer({ ...found, player_access_token: dto.player_access_token });
    } catch (err) {
      console.error(err?.message || '[ERR]: erro ao fazer login no jogador', err);
      setPlayer(null);
      setAccessToken(null);
    }
  }

  useEffect(() => {
    if (player?.id) {
      form.reset({
        ai_player_name: player?.ai_player_name || 'Meu Jogador',
        ai_player_avatar:
          player?.ai_player_avatar || 'https://example.com/avatar.png',
        group_name: player?.group_name || 'Meu Grupo',
        ai_player_description:
          player?.ai_player_description || 'Descrição do meu jogador de IA',
        ai_player_move_endpoint:
          player?.ai_player_move_endpoint || 'https://example.com/move-endpoint',
      });
    }
  }, [player]);

  return (
    <div className={cn('bg-cyan-100 w-full max-w-md p-6 flex flex-col gap-5')}>

      {/* MARK: REGISTER FORM */}
      <form
        onSubmit={form.handleSubmit(handleRegisterSubmit)}
        className={cn('flex flex-col gap-3')}
      >
        <fieldset className="border-2 border-purple-900 p-2 rounded-none">
          <legend className="text-xl text-slate-800 px-2">Register player</legend>

          <Controller
            name={'group_name'}
            control={form.control}
            rules={{ required: 'Name of the group is obrigatory.' }}
            render={({ field }) => (
              <div className={cn('flex flex-col gap-1.5 mt-2')}>
                <div className="flex flex-row gap-1.5 items-center">
                  <label className="text-base text-black text-nowrap w-32">Group name:</label>
                  <input
                    className="bg-white text-black text-base border border-black rounded-none px-1"
                    type="text"
                    {...field}
                  />
                </div>
                {errors.group_name && (
                  <span className="text-red-600 text-xs">{errors.group_name.message}</span>
                )}
              </div>
            )}
          />

          <Controller
            name={'ai_player_name'}
            control={form.control}
            rules={{ required: 'The AI player name is obrigatory.' }}
            render={({ field }) => (
              <div className={cn('flex flex-col gap-1.5 mt-2')}>
                <div className="flex flex-row gap-1.5 items-center">
                  <label className="text-base text-black text-nowrap w-32">Player name:</label>
                  <input
                    className="bg-white text-black text-base border border-black rounded-none px-1"
                    type="text"
                    {...field}
                  />
                </div>
                {errors.ai_player_name && (
                  <span className="text-red-600 text-xs">{errors.ai_player_name.message}</span>
                )}
              </div>
            )}
          />

          <Controller
            name={'ai_player_avatar'}
            control={form.control}
            rules={{ required: 'The avatar URL is obrigatory' }}
            render={({ field }) => (
              <div className={cn('flex flex-col gap-1.5 mt-2')}>
                <div className="flex flex-row gap-1.5 items-center">
                  <label className="text-base text-black text-nowrap w-32">Avatar URL:</label>
                  <input
                    className="bg-white text-black text-base border border-black rounded-none px-1"
                    type="text"
                    {...field}
                  />
                </div>
                {errors.ai_player_avatar && (
                  <span className="text-red-600 text-xs">{errors.ai_player_avatar.message}</span>
                )}
              </div>
            )}
          />

          <Controller
            name={'ai_player_description'}
            control={form.control}
            render={({ field }) => (
              <div className={cn('flex flex-col gap-1.5 mt-2')}>
                <div className="flex flex-row gap-1.5 items-center">
                  <label className="text-base text-black text-nowrap w-32">Description:</label>
                  <input
                    className="bg-white text-black text-base border border-black rounded-none px-1"
                    type="text"
                    {...field}
                  />
                </div>
              </div>
            )}
          />

          <Controller
            name={'ai_player_move_endpoint'}
            control={form.control}
            rules={{ required: 'The  movement endpoint is obrigatory.' }}
            render={({ field }) => (
              <div className={cn('flex flex-col gap-1.5 mt-2')}>
                <div className="flex flex-row gap-1.5 items-center">
                  <label className="text-base text-black text-nowrap w-32">Move endpoint:</label>
                  <input
                    className="bg-white text-black text-base border border-black rounded-none px-1"
                    type="text"
                    {...field}
                  />
                </div>
                {errors.ai_player_move_endpoint && (
                  <span className="text-red-600 text-xs">{errors.ai_player_move_endpoint.message}</span>
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
              {isSubmitting ? 'Registering...' : 'Register player'}
            </button>
          </div>
        </fieldset>
      </form>

      <p className="text-black text-sm">or log in to an existing player:</p>

      {/* MARK: LOGIN FORM */}
      <form
        onSubmit={loginForm.handleSubmit(handleLoginSubmit)}
        className={cn('flex flex-col gap-3')}
      >
        <fieldset className="border-2 border-purple-900 p-2 rounded-none">
          <legend className="text-xl text-slate-800 px-2">Login</legend>

          <Controller
            name={'player_id'}
            control={loginForm.control}
            rules={{ required: 'Player ID is obrigatory.' }}
            render={({ field }) => (
              <div className={cn('flex flex-col gap-1.5 mt-2')}>
                <div className="flex flex-row gap-1.5 items-center">
                  <label className="text-base text-black text-nowrap w-32">Player ID:</label>
                  <input
                    className="bg-white text-black text-base border border-black rounded-none px-1"
                    type="text"
                    {...field}
                  />
                </div>
                {loginErrors.player_id && (
                  <span className="text-red-600 text-xs">{loginErrors.player_id.message}</span>
                )}
              </div>
            )}
          />

          <Controller
            name={'player_access_token'}
            control={loginForm.control}
            rules={{ required: 'Authentication key is obrigatory.' }}
            render={({ field }) => (
              <div className={cn('flex flex-col gap-1.5 mt-2')}>
                <div className="flex flex-row gap-1.5 items-center">
                  <label className="text-base text-black text-nowrap w-32">Access token:</label>
                  <input
                    className="bg-white text-black text-base border border-black rounded-none px-1"
                    type="password"
                    {...field}
                  />
                </div>
                {loginErrors.player_access_token && (
                  <span className="text-red-600 text-xs ">{loginErrors.player_access_token.message}</span>
                )}
              </div>
            )}
          />

          <div className="flex justify-end mt-3">
            <button
              type="submit"
              disabled={isLoginSubmitting}
              className="text-base text-blue-600 underline cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoginSubmitting ? 'Fazendo login...' : 'Fazer login'}
            </button>
          </div>
        </fieldset>
      </form>
    </div>
  );
}