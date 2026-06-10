import { cn } from '@core/helpers';
import { SpectateGame } from '@feature/game/components/spectate-game';
import { Typography } from '@ui/text/typography';
import { useParams } from 'react-router';

export function SpectatePage() {
    const { gameId } = useParams();

    return (
        <div>
            <SpectateGame gameId={gameId} />
        </div>
    );
}
