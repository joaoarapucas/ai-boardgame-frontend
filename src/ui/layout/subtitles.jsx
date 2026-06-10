import { cn } from "@core/helpers";
import { Typography } from "@ui/text/typography";

export default function Subtitle({ title, css, img, alt }) {
    return (
        <div className={cn('flex flex-row items-center')}>
            {img && <img src={img} alt={alt} />}
            <Typography
                variant={'h2'}
                asTag={'h2'}
                className={cn(css)}
            >
                {title}
            </Typography>
            {img && <img src={img} alt={alt} />}
        </div>
    )
}