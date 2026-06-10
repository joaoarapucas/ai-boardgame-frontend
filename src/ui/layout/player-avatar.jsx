import { cn } from '@core/helpers';

import frame from '../../assets/frame-pfp.png';
import defaultAvatar from '../../assets/default-avatar.png';


/** Componente de Moldura Retrô Cyber Escalável
 * @param {string} userImage - A URL ou import da imagem do usuário
 * @param {string} className - Classes do Tailwind para definir o tamanho (ex: 'w-64', 'w-[300px]', 'w-full')
 */
export default function PlayerAvatar({ userImage, className }) {
    // Validação centralizada: se for o link fake ou não existir, limpa para usar o padrão
    const isInvalidAvatar = userImage === 'https://example.com/avatar.png';
    const finalAvatarSrc = (isInvalidAvatar || !userImage) ? defaultAvatar : userImage;

    return (
        <div
            className={cn(
                'relative overflow-hidden',

                // Proporção do Aspect Ratio original (784 / 750 ≈ 1.045)
                'aspect-[784/750]',

                // Recebe o tamanho customizado de onde ele for chamado
                className
            )}
        >
            {/* 2. A IMAGEM DO USUÁRIO (Filtrada e higienizada) */}
            <img
                src={finalAvatarSrc}
                alt="Conteúdo emoldurado precisamente"
                className={cn(
                    // Tamanhos proporcionais exatos: (640/784) e (500/750)
                    'w-[81.63%] h-[66.66%]',

                    // Coordenadas proporcionais exatas: (75/784) e (75/750)
                    'absolute left-[9.56%] top-[10%]',

                    'object-cover object-center z-0'
                )}
            />

            {/* 3. O SEU FRAME TRANSPARENTE (Acompanha o tamanho do pai) */}
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