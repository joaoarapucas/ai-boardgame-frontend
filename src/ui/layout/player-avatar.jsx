import { cn } from '@core/helpers';

import frame from '../../assets/frame-pfp.png';
import defaultAvatar from '../../assets/default-avatar.png';


/** retro player avatar
 * @param {string} userImage - A URL ou import da imagem do usuário
 * @param {string} className - Classes do Tailwind para definir o tamanho (ex: 'w-64', 'w-[300px]', 'w-full')
 */
export default function PlayerAvatar({ userImage, className }) {

    const isInvalidAvatar = userImage === 'https://example.com/avatar.png';
    const finalAvatarSrc = (isInvalidAvatar || !userImage) ? defaultAvatar : userImage;

    return (
        <div
            className={cn(
                'relative overflow-hidden',
                'aspect-[784/750]',
                className
            )}
        >
            <img
                src={finalAvatarSrc}
                alt="Conteúdo emoldurado precisamente"
                className={cn(
                    'w-[81.63%] h-[66.66%]',

                    'absolute left-[9.56%] top-[10%]',

                    'object-cover object-center z-0'
                )}
            />

            <img
                src={frame}
                alt="Moldura do sistema"
                className={cn(
                    'w-full h-full object-contain pointer-events-none',
                    'absolute inset-0 z-10'
                )}
            />
        </div>
    );
}