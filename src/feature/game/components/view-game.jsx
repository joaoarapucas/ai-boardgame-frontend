import { cn } from "@core/helpers";
import { useGameContext } from "../context/game-context"
import { useGameSocket } from "../hooks/useGameSocket";
import { Typography } from "@ui/text/typography";
import { getGame, joinGame, startGame } from "../api";
import { useEffect, useState } from "react";
import Board from "./board/board";
import PlayerAvatar from "@ui/layout/player-avatar";

export default function ViewGame({ gameId }) {
    const { spectator } = useGameContext();
    const { player, logout } = useGameContext();

    const { connected, gameState } = useGameSocket(
        gameId,
        spectator?.[gameId]?.spectator_access_token || null
    );

    const [game, setGame] = useState(null);
    const [canStart, setCanStart] = useState(false);
    const [canJoin, setCanJoin] = useState(false);
    const [joinSlot, setJoinSlot] = useState(null);

    async function fetchGame() {

        try {
            const response = await getGame(gameId);
            setGame(response);
            console.log(JSON.stringify(response, null, 2));

        } catch (err) {
            console.error(err);
        }
    }

    async function beginGame() {
        try {
            const response = await startGame(gameId, { reason: 'starting game (test!)' });
            setCanStart(false);
            console.log('started! ' + response);
        } catch (err) {
            console.error(err);
        }
    }

    async function joinExistingGame() {
        try {
            console.log('deu join sozinho?');
            const response = await joinGame(gameId, { player_id: player.id, team_slot: joinSlot });
            console.log('joined! ' + JSON.stringify(response, null, 2));
            setGame(response);
        } catch (err) {
            console.error(err);
        }
    }

    function controlButtonsVisibility(g) {
        setCanStart(false);
        setCanJoin(false);

        const temDoisJogadores = g?.turing_player?.id && g?.lovelace_player?.id;
        if (temDoisJogadores && g?.status === 'PAUSED') {
            setCanStart(true);
            return;
        }

        if (g?.status === 'WAITING_PLAYERS') {
            if (!g?.turing_player?.id) {
                setCanJoin(true);
                setJoinSlot(1);
            } else if (!g?.lovelace_player?.id) {
                setCanJoin(true);
                setJoinSlot(2);
            }
        }
    }

    useEffect(() => {
        fetchGame()
    }, [connected])

    useEffect(() => {
        controlButtonsVisibility(game);
    }, [game])

    useEffect(() => {
        controlButtonsVisibility(gameState);
        if (connected) setHasGameState(false);
    }, [gameState])


    const [segundos, setSegundos] = useState(0);

    const X = 3;

    const [hasGameState, setHasGameState] = useState(false);

    useEffect(() => {
        if (hasGameState) return;

        const meuIntervalo = setInterval(() => {
            fetchGame();

            setSegundos((prev) => prev + X);
        }, X * 1000);

        return () => {
            clearInterval(meuIntervalo);
        };

    }, [X, hasGameState]);



    return (
        <div className={cn('flex flex-col gap-4 py-8 items-center', 'flex-1', 'bg-blue-900')}>

            {/**
             * MARK: CHALLENGERS
             */}
            <div className={cn('grid grid-cols-3 items-center w-full max-w-2xl mx-auto text-center')}>
                <Typography
                    variant={'h1'}
                    asTag={'h1'}
                    className={cn('text-4xl text-white font-bold text-right truncate pr-4')}
                >
                    {game?.turing_player?.group_name ? game.turing_player.group_name : 'Waiting...'}
                </Typography>

                <Typography
                    variant={'h1'}
                    asTag={'h1'}
                    className={cn('text-4xl text-red-400 font-black uppercase tracking-wider text-center')}
                >
                    x
                </Typography>

                <Typography
                    variant={'h1'}
                    asTag={'h1'}
                    className={cn('text-4xl text-white font-bold text-left truncate pl-4')}
                >
                    {game?.lovelace_player?.group_name ? game.lovelace_player.group_name : 'Waiting...'}
                </Typography>
            </div>
            {/**
                 * MARK: ONLINE STATUS
                 */}
            <div className={cn('flex flex-row items-center gap-4 ')}>
                <Typography variant={'p'} asTag={'p'} className={cn('text-lg', 'text-neutral-400')}>
                    watching: #{gameId}
                </Typography>
                <Typography variant={'p'} asTag={'p'} className={cn(
                    'text-neutral-500',
                    'text-lg underline',
                    'px-4 py-1',
                    {
                        'text-yellow-600 text-yellow-600': !connected,
                        'text-green-500': connected,
                    }
                )}
                >
                    {!connected && 'connecting . . .'}
                    {connected && 'connected !'}
                </Typography>
            </div>

            <p className={cn('text-white')}>{gameState ? gameState.status : game?.status}</p>

            {/**
             * MARK: END MATCH
             */}
            {
                gameState?.status == 'FINISHED' &&
                <div>
                    <Typography
                        variant={'h3'}
                        asTag={'h3'}
                        className={cn(
                            'text-5xl font-black tracking-wider uppercase text-center select-none font-mono py-2'
                        )}
                        style={{
                            // Cria o gradiente de arco-íris idêntico ao do marquee
                            backgroundImage: 'linear-gradient(to right, #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #4b0082, #8b00ff, #ff0000)',
                            backgroundSize: '200% auto',
                            // Clipa o gradiente exatamente no formato do texto
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            // Animação super rápida (1 segundo) igual à que configuramos antes
                            animation: 'rainbow 7s linear infinite',
                        }}
                    >
                        WINNER: {gameState.winner_team == 1 ? game?.turing_player?.group_name : game?.lovelace_player?.group_name}
                    </Typography>
                    <style>
                        {`
                            @keyframes rainbow {
                                0% { background-position: 0% center; }
                                100% { background-position: 200% center; }
                            }
                        `}
                    </style>
                </div>
            }





            {game && <>
                {/**
             * MARK: BOARD
             */}
                <div className={cn('flex flex-row items-center gap-5')}>

                    {/*TURING PLAYER */}
                    <div className={cn('flex flex-col items-center text-center gap-3 w-70')}>
                        <Typography
                            variant={'h1'}
                            asTag={'h1'}
                            className={cn('text-4xl', 'text-white', 'font-bold', 'w-full max-w-full truncate')}
                            title={game?.turing_player?.ai_player_name}
                        >
                            {game?.turing_player?.ai_player_name ? game.turing_player.ai_player_name : 'Waiting...'}
                        </Typography>

                        <PlayerAvatar userImage={game?.turing_player?.ai_player_avatar} className='w-70' />
                    </div>

                    {/*BOARD */}
                    {gameState && <Board boardState={gameState?.board} />}


                    {/*LOVELACE PLAYER */}
                    <div className={cn('flex flex-col items-center text-center gap-3 w-70')}>
                        <Typography
                            variant={'h1'}
                            asTag={'h1'}
                            // Adicionadas as classes: w-full, max-w-full e truncate
                            className={cn('text-4xl', 'text-white', 'font-bold', 'w-full max-w-full truncate')}
                            // Opcional: Mostra o nome completo em um balãozinho ao passar o mouse por cima
                            title={game?.lovelace_player?.ai_player_name}
                        >
                            {game?.lovelace_player?.ai_player_name ? game.lovelace_player.ai_player_name : 'Waiting...'}
                        </Typography>

                        <PlayerAvatar userImage={game?.lovelace_player?.ai_player_avatar} className='w-70' />
                    </div>
                </div>
            </>}

            {/**
             * MARK: SPECTATORS
             */}
            <div className={cn('flex flex-row items-center gap-2 flex-wrap')}>
                {game && game.spectators?.map((s, index) => (
                    <PlayerAvatar
                        key={s.id || index} // Usa o ID do espectador ou o index como fallback
                        userImage={s.spectator_avatar}
                        className="w-20"
                    />
                ))}
            </div>

            {/**
             * MARK: START/JOIN GAME
             */}
            <div className={cn('flex flex-row gap-5')}>
                {canJoin &&
                    <button type="button" onClick={() => joinExistingGame()} className={cn('bg-yellow-400 p-3 underline')}>
                        Join game
                    </button>}
                {canStart &&
                    <button type="button" onClick={() => beginGame()} className={cn('bg-green-500 p-3 underline')} >
                        Start game
                    </button>}
            </div>

        </div >
    )
}