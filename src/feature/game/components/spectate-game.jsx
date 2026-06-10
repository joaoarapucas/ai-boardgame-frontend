import { useEffect, useState } from "react";
import { useGameContext } from "../context/game-context";
import { Typography } from "@ui/text/typography";
import { SpectatorRegisterForm } from "./spectator-register-form";
import ViewGame from "./view-game";
import { cn } from "@core/helpers";

export function SpectateGame({ gameId }) {
    const { spectator: storedSpectator } = useGameContext();

    const [spectator, setSpectator] = useState(() => {
        if (storedSpectator?.[gameId]) {
            return storedSpectator?.[gameId];
        }
        return null;
    });

    useEffect(() => {
        if (storedSpectator?.[gameId]) {
            setSpectator(storedSpectator?.[gameId]);
        }
    }, [storedSpectator]);

    return (
        <>
            {!spectator && (
                <div className={cn('bg-blue-900 text-white font-bold p-5')}>
                    <Typography variant={'h3'}>Spectator register</Typography>
                    <Typography variant={'p'}>
                        To watch a game, you must register as a spectator.
                        Please, fill the form below to get your spectator access token.
                    </Typography>
                    <SpectatorRegisterForm gameId={gameId} />
                </div>
            )}
            {spectator && <ViewGame gameId={gameId} />}
        </>
    )
}
