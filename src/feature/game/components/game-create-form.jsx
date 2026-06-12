import { useState, useEffect } from 'react';
import { cn } from '@core/helpers';
import { createGame } from '../api';

/** Game Creation Form (Modal)
 * @param {string|number} playerId
 * @param {Function} onClose
 */
export default function GameCreateForm({ playerId, onClose }) {

    const [groupId, setGroupId] = useState(playerId || '');
    const [autoStart, setAutoStart] = useState(false);
    const [vsRandomBot, setVsRandomBot] = useState(false);
    const [playerSlot, setPlayerSlot] = useState(1);

    useEffect(() => {
        if (playerId) setGroupId(playerId);
    }, [playerId]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const payload = {
            player_id: Number(groupId),
            auto_start: autoStart,
            vs_random_bot: vsRandomBot,
            team_slot: playerSlot
        };

        console.log("Enviando dados para criação do jogo:", payload);
        try {
            const response = createGame(payload);
            console.log(JSON.stringify(response, null, 2));
            onClose();

        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
            onClick={onClose}
        >
            <form
                onSubmit={handleSubmit}
                onClick={(e) => e.stopPropagation()}
                className={cn(
                    'bg-cyan-100 w-full max-w-md -2xl p-6',
                    'flex flex-col gap-5 relative text-white'
                )}
            >
                <fieldset className="border-2 border-purple-900 p-2 rounded-none">
                    <legend className="text-xl text-slate-800 px-2">New game</legend>

                    {/* MARK: input ID */}
                    <div className="flex flex-row gap-1.5 mt-5 items-center">
                        <label className="text-base text-black text-nowrap">
                            Player ID:
                        </label>
                        <input
                            type="number"
                            required
                            value={groupId}
                            onChange={(e) => setGroupId(e.target.value)}
                            className=" bg-white text-black text-base border-1 px-1 border-black rounded-none"
                        />
                    </div>

                    {/* MARK: Radio Buttons */}
                    <div className="flex flex-col gap-1.5">

                        {/* it actually looks more retro by not having a label!
                        <label className=" text-black tracking-wider">
                            Team side
                        </label>
                        */}
                        <div className="flex flex-left my-2">
                            <label
                                className={cn(
                                    "flex items-center justify-center gap-2 p-3 cursor-pointer font-medium text-base ",
                                    "text-black"
                                )}
                            >
                                <input
                                    type="radio"
                                    name="teamSlot"
                                    value={1}
                                    checked={playerSlot === 1}
                                    onChange={() => setPlayerSlot(1)}
                                />
                                Turing team
                            </label>
                            <label
                                className={cn(
                                    "flex items-center justify-center gap-2 p-3 cursor-pointer font-medium text-base",
                                    "text-black"
                                )}
                            >
                                <input
                                    type="radio"
                                    name="teamSlot"
                                    value={2}
                                    checked={playerSlot === 2}
                                    onChange={() => setPlayerSlot(2)}
                                />
                                Lovelace team
                            </label>
                        </div>
                    </div>

                    {/* MARK: checkboxes 
                    */}
                    <div className="flex flex-col gap-3">

                        {/* auto Start */}
                        <label className="flex gap-2 cursor-pointer select-none">
                            <input
                                type="checkbox"
                                checked={autoStart}
                                onChange={(e) => setAutoStart(e.target.checked)}
                                className="mt-1 h-4 w-4 cursor-pointer"
                            />
                            <span className="text-black text-base">
                                Auto start
                            </span>
                        </label>

                        {/* random bot */}
                        <label className="flex gap-2 cursor-pointer select-none">
                            <input
                                type="checkbox"
                                checked={vsRandomBot}
                                onChange={(e) => setVsRandomBot(e.target.checked)}
                                className="mt-1 h-4 w-4 cursor-pointer"
                            />
                            <span className="text-black text-base">
                                Versus random bot
                            </span>
                        </label>

                    </div>

                    {/* MARK: actions 
                    */}
                    <div className="flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-base font-medium text-slate-600 cursor-pointer underline"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className=" text-base font-medium text-blue-600 underline cursor-pointer"
                        >
                            Create game
                        </button>
                    </div>
                </fieldset>
            </form>
        </div>
    );
}