import { useRef, useState } from 'react';
import { cn } from '@core/helpers';

import img from '../../assets/audio_icons.png'

/** Retro audio player
 * @param {string} src - the audio file path
 */
export default function AudioLoopPlayer({ src }) {
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const toggleAudio = () => {
        if (!audioRef.current) return;

        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
        } else {
            audioRef.current.play().catch((err) => {
                console.log("Autoplay blocked by browser. waiting interaction.", err);
            });
            setIsPlaying(true);
        }
    };

    return (
        <div className="flex items-center justify-center">
            <audio ref={audioRef} src={src} loop />
            <button
                type="button"
                onClick={toggleAudio}
                style={{ backgroundImage: `url(${src ? img : ''})` }}
                className={cn(
                    //forces img to be 40px
                    'w-[40px] h-[40px] cursor-pointer focus:outline-none select-none block',

                    //position control (image is 1 sprite)
                    isPlaying
                        ? 'bg-[position:0_0px]'   //playing
                        : 'bg-[position:0_-40px]' //muted
                )}
                aria-label={isPlaying ? "pause" : "play"}
            />
        </div>
    );
}