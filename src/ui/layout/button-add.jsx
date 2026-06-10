import { cn } from '@core/helpers'; // Usando o seu helper de classes

/** Botão Flutuante Reutilizável
 * @param {Function} onClick - Função que será executada ao clicar no botão
 * @param {React.ReactNode} children - O texto ou ícone de dentro do botão (opcional, padrão é "Add +")
 */
export default function ButtonAdd({ onClick, children, className, ...props }) {
    return (
        <button
            onClick={onClick}
            className={cn(
                // Posicionamento Fixo (Flutuante)
                'fixed bottom-6 right-6 z-50',

                // Estilização Visual e Cores
                'bg-blue-600 hover:bg-blue-700 text-white font-bold',
                'px-5 py-3 rounded-full shadow-lg hover:shadow-xl',

                // Efeitos de Toque e Transição
                'active:scale-95 transition-all duration-150 ease-in-out',
                'focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2',

                className // Permite que você mude a cor ou estilo de fora se quiser
            )}
            {...props} // Repassa qualquer outra propriedade nativa de botão (ex: disabled)
        >
            {children || 'Add +'}
        </button>
    );
}