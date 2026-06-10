import { Link } from 'react-router';
import { cn } from '@core/helpers';
import { Typography } from '@ui/text/typography';

/** Card de Partida Retro Cyber
 * @param {Object} match - Objeto contendo os dados da partida atual
 */
export default function GameCard({ match }) {
    const isFinished = match?.status === 'FINISHED';

    // Nomes dos jogadores com fallback para os slots abertos
    const turingName = match?.turing_player?.ai_player_name || 'OPEN SLOT';
    const lovelaceName = match?.lovelace_player?.ai_player_name || 'OPEN SLOT';

    return (
        <div
            className={cn(
                // Estrutura do Card e Efeito Translúcido sobre o fundo do espaço
                'p-5 bg-black/60 backdrop-blur-md rounded-xl border-2 border-cyan-500/40',
                'flex flex-col gap-4 shadow-[0_0_15px_rgba(6,182,212,0.15)]',
                'transition-all duration-300 hover:scale-[1.02] hover:border-cyan-400',
                'w-full max-w-sm font-sans' // Aplica a sua Comic Sans configurada
            )}
        >
            {/* Cabeçalho do Card: ID e Status */}
            <div className="flex justify-between items-center border-b border-cyan-500/20 pb-2">
                <Typography variant="span" asTag="p" className="text-xs font-mono text-cyan-400 tracking-wider">
                    #{match?.id?.substring(0, 8)}... {/* Encurta o GUID para ficar estético */}
                </Typography>

                <span
                    className={cn(
                        "text-xs px-2.5 py-0.5 rounded-full font-black uppercase tracking-widest border animate-pulse",
                        isFinished
                            ? "bg-red-950/60 text-red-400 border-red-500/40"
                            : "bg-lime-950/60 text-lime-400 border-lime-500/40"
                    )}
                >
                    {match?.status}
                </span>
            </div>

            {/* Container da Imagem do Avatar (Estilo monitor antigo de CRT) */}
            <div className="relative overflow-hidden rounded-lg border-2 border-slate-700 bg-slate-900 group">
                <img
                    src={match?.turing_player?.ai_player_avatar || 'https://via.placeholder.com/175?text=Cyber+Corner'}
                    alt="pateta's cyber corner"
                    className="w-full h-[175px] object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-300"
                />
                {/* Linhas de scanline retrô por cima da imagem */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-transparent pointer-events-none bg-[length:100%_4px]" />
            </div>

            {/* O Confronto: Verso (X) */}
            <div className="flex flex-col items-center gap-1 py-1 text-center">
                <div className="text-base font-extrabold text-blue-400 tracking-wide uppercase truncate w-full">
                    {turingName}
                </div>

                <span className="text-xs font-black text-yellow-400 bg-yellow-950/50 px-3 py-0.5 rounded border border-dashed border-yellow-400/50 my-1 animate-bounce">
                    VS
                </span>

                <div className="text-base font-extrabold text-purple-400 tracking-wide uppercase truncate w-full">
                    {lovelaceName}
                </div>
            </div>

            {/* Botão de Ação */}
            {!isFinished && (
                <Link
                    to={`/spectate/${match.id}`}
                    className={cn(
                        'bg-cyan-800 p-2'
                    )}
                >
                    Spectate
                </Link>
            )}
        </div>
    );
}