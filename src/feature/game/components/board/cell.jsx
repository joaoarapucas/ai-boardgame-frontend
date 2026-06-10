import { cn } from "@core/helpers";

import cellBG from '../../../../assets/cell_tile.gif';

/**Board Cell!
 * @param {*} level - height level of the cell 
 * @param {*} professor - professor on the cell, if any
 */
export default function Cell({ level, professor }) {
    // Cores de fundo diferentes baseadas no nível da célula (opcional, mas fica visualmente incrível)
    const levelBackgrounds = {
        0: 'bg-slate-100',
        1: 'bg-red-200',
        2: 'bg-red-400',
        3: 'bg-red-600',
        4: 'bg-red-800',
    };

    return (
        <div
            className={cn(
                // Estrutura do Quadrado
                'aspect-square w-full min-w-[90px]',
                'flex flex-col items-center justify-between p-1.5',
                'transition-all duration-200 relative select-none',

                'bg-cover bg-center'
            )}
            style={{ backgroundImage: `url(${cellBG})` }}
        >
            {/* MARK: BADGE LEVEL
             */}
            <span className={cn("absolute top-0 left-0 text-[14px] font-bold bg-red-300/80 px-2", levelBackgrounds[level])}>
                Lvl {level}
            </span>

            {/* Espaçador para empurrar o professor para o centro */}
            <div className="flex-1" />

            {/* MARK: BADGE PROFESSOR
             */}
            {professor ? (
                <div
                    className={cn(
                        "w-8/12 py-1.5 px-2 text-center text-[13px] font-bold tracking-wide uppercase truncate",
                        // Diferencia os times pelas cores do nome do professor
                        ["CLARO", "REY"].includes(professor.toUpperCase())
                            ? "bg-green-500 text-black" // turing
                            : "bg-yellow-500 text-black" //lovelace
                    )}
                    title={professor}
                >
                    {professor.slice(0, 3)}
                </div>
            ) : (
                // Espaço reservado invisível para manter o alinhamento quando não houver professor
                <div className="h-5" />
            )}

            {/* Espaçador inferior */}
            <div className="flex-1" />
        </div>
    );
}