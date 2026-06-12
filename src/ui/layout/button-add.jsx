import { cn } from '@core/helpers'; // Usando o seu helper de classes

/** floating button
 * @param {Function} onClick - Função que será executada ao clicar no botão
 * @param {React.ReactNode} children - O texto ou ícone de dentro do botão
 */
export default function ButtonAdd({ onClick, children, className, ...props }) {
    return (
        <button
            onClick={onClick}
            className={cn(
                'fixed bottom-6 right-6 z-50 cursor-pointer',

                'rounded-[3px] bg-[linear-gradient(to_top,rgb(207,207,207)_16%,rgb(252,252,252)_79%)] p-[3px] border border-black text-black no-underline',
                'p-1',

                className
            )}
            {...props} // Repassa qualquer outra propriedade nativa de botão (ex: disabled)
        >
            {children || 'Add +'}
        </button>
    );
}