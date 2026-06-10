import { useState, useEffect } from 'react';
import { cn } from '@core/helpers';
import { createGame } from '../api';

/** Game Creation Form (Modal)
 * @param {string|number} playerId - ID do jogador/grupo para autopreencher
 * @param {Function} onClose - Função disparada para fechar o modal (setando criando para falso)
 */
export default function GameCreateForm({ playerId, onClose }) {
    // Estados do formulário baseados no JSON desejado
    const [groupId, setGroupId] = useState(playerId || '');
    const [autoStart, setAutoStart] = useState(false);
    const [vsRandomBot, setVsRandomBot] = useState(false);
    const [playerSlot, setPlayerSlot] = useState(1); // Controla se é 1 ou 2

    // Se o playerId mudar externamente, atualiza o campo
    useEffect(() => {
        if (playerId) setGroupId(playerId);
    }, [playerId]);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Aqui está o payload estruturado exatamente como você precisa
        const payload = {
            player_id: Number(groupId), // Garantindo que vai como número
            auto_start: autoStart,
            vs_random_bot: vsRandomBot,
            team_slot: playerSlot // Agora envia dinamicamente 1 ou 2
        };

        console.log("Enviando dados para criação do jogo:", payload);
        try {
            // Corrigido: Removida a linha solta () => { onClose } que não fazia nada
            const response = createGame(payload);
            console.log(JSON.stringify(response, null, 2));
            onClose(); // Fecha o modal após a criação com sucesso

        } catch (err) {
            console.error(err);
        }
    };

    return (
        // Fundo Escuro do Modal (Fecha ao clicar fora do conteúdo)
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
            onClick={onClose}
        >
            {/* Container do Formulário (onClick preventDefault evita fechar ao clicar dentro do form) */}
            <form
                onSubmit={handleSubmit}
                onClick={(e) => e.stopPropagation()}
                className={cn(
                    'bg-white w-full max-w-md rounded-xl shadow-2xl p-6',
                    'flex flex-col gap-5 relative animate-in fade-in zoom-in-95 duration-200'
                )}
            >
                <button
                    type="button"
                    onClick={onClose}
                    className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors text-xl font-bold p-1"
                >
                    &times;
                </button>

                <div>
                    <h2 className="text-xl font-bold text-slate-800">Criar Nova Partida</h2>
                    <p className="text-sm text-slate-500">Configure as opções para iniciar o tabuleiro.</p>
                </div>

                {/* MARK: input ID */}
                <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
                        ID do Grupo / Jogador
                    </label>
                    <input
                        type="number"
                        required
                        placeholder="Ex: 12"
                        value={groupId}
                        onChange={(e) => setGroupId(e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800"
                    />
                </div>

                {/* MARK: Radio Buttons para Team Slot */}
                <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
                        Slot do Time (Team Slot)
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                        {/* Opção Slot 1 */}
                        <label
                            className={cn(
                                "flex items-center justify-center gap-2 p-3 border rounded-lg cursor-pointer transition-all select-none text-sm font-medium",
                                playerSlot === 1
                                    ? "border-blue-500 bg-blue-50/50 text-blue-700"
                                    : "border-slate-200 text-slate-600 hover:bg-slate-50"
                            )}
                        >
                            <input
                                type="radio"
                                name="teamSlot"
                                value={1}
                                checked={playerSlot === 1}
                                onChange={() => setPlayerSlot(1)}
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300"
                            />
                            Slot 1 (Turing)
                        </label>

                        {/* Opção Slot 2 */}
                        <label
                            className={cn(
                                "flex items-center justify-center gap-2 p-3 border rounded-lg cursor-pointer transition-all select-none text-sm font-medium",
                                playerSlot === 2
                                    ? "border-blue-500 bg-blue-50/50 text-blue-700"
                                    : "border-slate-200 text-slate-600 hover:bg-slate-50"
                            )}
                        >
                            <input
                                type="radio"
                                name="teamSlot"
                                value={2}
                                checked={playerSlot === 2}
                                onChange={() => setPlayerSlot(2)}
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300"
                            />
                            Slot 2 (Lovelace)
                        </label>
                    </div>
                </div>

                {/* MARK: checkboxes */}
                <div className="flex flex-col gap-3 bg-slate-50 p-3 rounded-lg border border-slate-100">

                    {/* auto Start */}
                    <label className="flex items-start gap-3 cursor-pointer select-none">
                        <input
                            type="checkbox"
                            checked={autoStart}
                            onChange={(e) => setAutoStart(e.target.checked)}
                            className="mt-1 h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                        />
                        <div className="flex flex-col">
                            <span className="text-sm font-medium text-slate-700">Início Automático (auto_start)</span>
                            <span className="text-xs text-slate-400">A partida inicia assim que as vagas forem preenchidas.</span>
                        </div>
                    </label>

                    <hr className="border-slate-200" />

                    {/* random bot */}
                    <label className="flex items-start gap-3 cursor-pointer select-none">
                        <input
                            type="checkbox"
                            checked={vsRandomBot}
                            onChange={(e) => setVsRandomBot(e.target.checked)}
                            className="mt-1 h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                        />
                        <div className="flex flex-col">
                            <span className="text-sm font-medium text-slate-700">Jogar contra Bot (vs_random_bot)</span>
                            <span className="text-xs text-slate-400">Ative para testar sua estratégia contra uma IA aleatória.</span>
                        </div>
                    </label>

                </div>

                {/* MARK: actions */}
                <div className="flex justify-end gap-3 pt-2">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-md transition-colors"
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        className="px-5 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md shadow transition-colors"
                    >
                        Criar Jogo
                    </button>
                </div>

            </form>
        </div>
    );
}