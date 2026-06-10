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
      player_id: '',
      player_access_token: '',
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
        setAccessToken(null)
        return;
      }

      setPlayer({ ...found, player_access_token: dto.player_access_token });

    } catch (err) {
      console.error(err?.message || '[ERR]: erro ao fazer login no jogador', err);
      setPlayer(null)
      setAccessToken(null)
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
    <>
      {/* MARK: REGISTER FORM */}
      <form
        onSubmit={form.handleSubmit(handleRegisterSubmit)}
        className={cn('flex flex-col gap-2')}
      >
        <Controller
          name={'group_name'}
          control={form.control}
          rules={{ required: 'O nome do grupo é obrigatório' }}
          render={({ field }) => (
            <div className={cn('flex flex-col gap-1')}>
              <label className="text-xs">Nome do grupo</label>
              <input
                className={cn('border rounded-sm px-4 py-2')}
                type={'text'}
                {...field}
              />
              {errors.group_name && (
                <span className={cn('text-red-500 text-xs')}>
                  {errors.group_name.message}
                </span>
              )}
            </div>
          )}
        />

        <Controller
          name={'ai_player_name'}
          control={form.control}
          rules={{ required: 'O nome do jogador de IA é obrigatório' }}
          render={({ field }) => (
            <div className={cn('flex flex-col gap-1')}>
              <label className="text-xs">Nome do jogador</label>
              <input
                className={cn('border rounded-sm px-4 py-2')}
                type={'text'}
                {...field}
              />
              {errors.ai_player_name && (
                <span className={cn('text-red-500 text-xs')}>
                  {errors.ai_player_name.message}
                </span>
              )}
            </div>
          )}
        />

        <Controller
          name={'ai_player_avatar'}
          control={form.control}
          rules={{ required: 'A URL do avatar do jogador de IA é obrigatória' }}
          render={({ field }) => (
            <div className={cn('flex flex-col gap-1')}>
              <label className="text-xs">URL do avatar</label>
              <input
                className={cn('border rounded-sm px-4 py-2')}
                type={'text'}
                {...field}
              />
              {errors.ai_player_avatar && (
                <span className={cn('text-red-500 text-xs')}>
                  {errors.ai_player_avatar.message}
                </span>
              )}
            </div>
          )}
        />

        <Controller
          name={'ai_player_description'}
          control={form.control}
          render={({ field }) => (
            <div className={cn('flex flex-col gap-1')}>
              <label className="text-xs">Descrição do jogador</label>
              <input
                className={cn('border rounded-sm px-4 py-2')}
                type={'text'}
                {...field}
              />
              {errors.ai_player_description && (
                <span className={cn('text-red-500 text-xs')}>
                  {errors.ai_player_description.message}
                </span>
              )}
            </div>
          )}
        />

        <Controller
          name={'ai_player_move_endpoint'}
          control={form.control}
          rules={{
            required: 'O endpoint de movimento do jogador de IA é obrigatório',
          }}
          render={({ field }) => (
            <div className={cn('flex flex-col gap-1')}>
              <label className="text-xs">Endpoint de movimento do jogador</label>
              <input
                className={cn('border rounded-sm px-4 py-2')}
                type={'text'}
                {...field}
              />
              {errors.ai_player_move_endpoint && (
                <span className={cn('text-red-500 text-xs')}>
                  {errors.ai_player_move_endpoint.message}
                </span>
              )}
            </div>
          )}
        />

        <button
          type={'submit'}
          disabled={isSubmitting}
          className={cn(
            'mt-4',
            'px-4 py-2',
            'bg-green-500 text-white rounded-md',
            'hover:bg-green-600',
            isSubmitting && 'opacity-50 cursor-not-allowed'
          )}
        >
          {isSubmitting ? 'Registrando...' : 'Registrar Jogador'}
        </button>
      </form>

      ou faça login em um jogador já existente:

      {/* MARK: LOGIN FORM */}
      <form
        onSubmit={loginForm.handleSubmit(handleLoginSubmit)}
        className={cn('flex flex-col gap-2')}
      >
        <Controller
          name={'player_id'}
          control={loginForm.control}
          rules={{ required: 'O id do jogador é obrigatório' }}
          render={({ field }) => (
            <div className={cn('flex flex-col gap-1')}>
              <label className="text-xs">Id do jogador</label>
              <input
                className={cn('border rounded-sm px-4 py-2')}
                type={'text'}
                {...field}
              />
              {loginErrors.player_id && (
                <span className={cn('text-red-500 text-xs')}>
                  {loginErrors.player_id.message}
                </span>
              )}
            </div>
          )}
        />

        <Controller
          name={'player_access_token'}
          control={loginForm.control}
          rules={{ required: 'A chave de autenticação é obrigatória' }}
          render={({ field }) => (
            <div className={cn('flex flex-col gap-1')}>
              <label className="text-xs">Chave de autenticação</label>
              <input
                className={cn('border rounded-sm px-4 py-2')}
                type={'password'}
                {...field}
              />
              {loginErrors.player_access_token && (
                <span className={cn('text-red-500 text-xs')}>
                  {loginErrors.player_access_token.message}
                </span>
              )}
            </div>
          )}
        />

        <button
          type={'submit'}
          disabled={isLoginSubmitting}
          className={cn(
            'mt-4',
            'px-4 py-2',
            'bg-green-500 text-white rounded-md',
            'hover:bg-green-600',
            isLoginSubmitting && 'opacity-50 cursor-not-allowed'
          )}
        >
          {isLoginSubmitting ? 'Fazendo login...' : 'Fazer login'}
        </button>
      </form>
    </>
  );
}