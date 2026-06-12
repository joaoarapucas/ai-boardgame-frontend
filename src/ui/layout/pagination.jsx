import homeIcon from '../../assets/home.gif';
import leftArrow from '../../assets/left_arrow.gif'
import rightArrow from '../../assets/right_arrow.gif'

export default function Pagination({ page, totalPages, onPageChange, showHome = false }) {
    return (
        <div className="relative flex flex-row items-center justify-center gap-4 bg-cyan-900 p-2 select-none">

            {/* HOME */}
            {showHome && (
                <button
                    type="button"
                    className="absolute left-[-50px] cursor-pointer"
                    onClick={() => onPageChange(1)}
                >
                    <img src={homeIcon} alt="Home" />
                </button>
            )}

            {/* PREV PAGE */}
            <button
                type="button"
                disabled={page <= 1}
                onClick={() => onPageChange(Math.max(page - 1, 1))}
                className="cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
            >
                <img key="arrow-prev" src={leftArrow} alt="Previous" />
            </button>

            <span className="text-white text-sm font-bold">
                {page} / {totalPages}
            </span>

            {/* NEXT PAGE */}
            <button
                type="button"
                disabled={page >= totalPages}
                onClick={() => onPageChange(Math.min(page + 1, totalPages))}
                className="cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
            >
                <img key="arrow-next" src={rightArrow} alt="Next" />
            </button>
        </div>
    );
}