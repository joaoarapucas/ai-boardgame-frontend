import { Link } from 'react-router';
import { cn } from '@core/helpers';
import { Typography } from '@ui/text/typography';
import PlayerAvatar from '@ui/layout/player-avatar';

/** Card de Partida Retro Cyber
 * @param {Object} match - game to be shown
 */
export default function GameCard({ match }) {
    const isFinished = match?.status === 'FINISHED';

    // Nomes dos jogadores com fallback para os slots abertos
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
                <Typography variant="span" asTag="p" className="text-xs font-mono text-cyan-400 tracking-wider">
                    #{match?.id?.substring(0, 8)}...
                </Typography>

                <span
                    className={cn(
                        "text-xs px-2.5 py-0.5 font-black uppercase tracking-widest underline",
                        isFinished
                            ? "text-red-400"
                            : "text-lime-400 border-lime-500/40"
                    )}
                >
                    {match?.status}
                </span>
            </div>

            {/* VERSUS */}
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
            {!isFinished && (
                <Link
                    to={`/spectate/${match.id}`}
                    className={cn(
                        'bg-blue-500 p-2'
                    )}
                >
                    Spectate
                </Link>
            )}
        </div>
    );
}