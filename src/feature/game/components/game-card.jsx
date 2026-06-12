import { Link } from 'react-router';
import { cn } from '@core/helpers';
import { Typography } from '@ui/text/typography';
import PlayerAvatar from '@ui/layout/player-avatar';

/** cards to manage matches
 * @param {Object} match - game to be shown
 */
export default function GameCard({ match }) {

    const isFinished = match?.status === 'FINISHED';

    // placeholder
    const turingName = match?.turing_player?.ai_player_name || 'Waiting...';
    const lovelaceName = match?.lovelace_player?.ai_player_name || 'Waiting...';

    return (
        <div
            className={cn(
                // CARD GERAL
                'bg-neutral-950 px-10 py-7'
            )}
        >
            {/* ID E STATUS */}
            <div className="flex justify-between items-center">
                <Typography variant="span" asTag="p" className="text-sm text-white tracking-widest">
                    # {match?.id}
                </Typography>
                <span
                    className={cn(
                        "text-sm px-2.5 py-0.5 font-black uppercase underline",
                        isFinished
                            ? "text-red-400"
                            : "text-green-500"
                    )}
                >
                    {match?.status}
                </span>
            </div>

            {/* MARK: VERSUS 
            */}
            <div className="flex flex-row items-center gap-1 py-1 text-center">
                <div className="text-base font-extrabold text-blue-400 tracking-wide uppercase truncate w-full">
                    <PlayerAvatar userImage={match?.turing_player?.ai_player_avatar} className={'size-60'} />
                    {turingName}
                </div>

                <span className="text-xl font-black text-yellow-400 underline px-3">
                    VS
                </span>

                <div className="text-base font-extrabold text-purple-400 tracking-wide uppercase truncate w-full">
                    <PlayerAvatar userImage={match?.lovelace_player?.ai_player_avatar} className={'size-60'} />
                    {lovelaceName}

                </div>
            </div>

            {/* Botão de Ação */}
            {!isFinished ? ( //MARK: SPECTATE
                <Link
                    to={`/spectate/${match.id}`}
                    className={cn(
                        'bg-green-400 p-1 underline'
                    )}
                >
                    Spectate
                </Link>
            ) : ( //MARK: WINNER
                <>
                    <p
                        className={cn(
                            ' font-black tracking-wider uppercase text-center select-none font-mono py-2'
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
                    >Winner: {match.winner_team == 1 ? match?.turing_player?.ai_player_name : match?.lovelace_player?.ai_player_name}</p>
                    <style>
                        {`
                            @keyframes rainbow {
                                0% { background-position: 0% center; }
                                100% { background-position: 200% center; }
                            }
                        `}
                    </style>
                </>
            )}
        </div>
    );
}