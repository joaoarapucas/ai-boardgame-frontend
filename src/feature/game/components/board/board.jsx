import Cell from "./cell";

/**The current game board
 * 
 * @param {*} boardState - JSON matrix with the current state of all cells and professors
 */
export default function Board({ boardState }) {

    if (!boardState) return <p>loading board . . .</p>;

    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '8px', maxWidth: '500px' }}>
            {boardState.map((row, rowIndex) =>
                row.map((cell, colIndex) => (
                    <Cell
                        key={`${rowIndex}-${colIndex}`}
                        level={cell.level}
                        professor={cell.professor}
                    />
                ))
            )}
        </div>
    );
}