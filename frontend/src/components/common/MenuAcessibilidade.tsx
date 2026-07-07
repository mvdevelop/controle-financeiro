
import React, { useState, useEffect } from 'react';

const MenuAcessibilidade: React.FC = () => {
    const [menuAberto, setMenuAberto] = useState(false);
    const [altoContraste, setAltoContraste] = useState(false);
    const [fonteGrande, setFonteGrande] = useState(false);

    useEffect(() => {
        const savedContraste = localStorage.getItem('altoContraste');
        const savedFonte = localStorage.getItem('fonteGrande');

        if (savedContraste === 'true') {
            setAltoContraste(true);
            document.body.classList.add('alto-contraste');
        }
        if (savedFonte === 'true') {
            setFonteGrande(true);
            document.body.classList.add('fonte-grande');
        }

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.ctrlKey && e.key === 'F10') {
                e.preventDefault();
                setMenuAberto(prev => !prev);
            }
            if (e.ctrlKey && e.key === 'F11') {
                e.preventDefault();
                toggleAltoContraste();
            }
            if (e.key === 'Escape' && menuAberto) {
                setMenuAberto(false);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [menuAberto]);

    const toggleAltoContraste = () => {
        const novoEstado = !altoContraste;
        setAltoContraste(novoEstado);
        if (novoEstado) {
            document.body.classList.add('alto-contraste');
        } else {
            document.body.classList.remove('alto-contraste');
        }
        localStorage.setItem('altoContraste', String(novoEstado));
    };

    const toggleFonteGrande = () => {
        const novoEstado = !fonteGrande;
        setFonteGrande(novoEstado);
        if (novoEstado) {
            document.body.classList.add('fonte-grande');
        } else {
            document.body.classList.remove('fonte-grande');
        }
        localStorage.setItem('fonteGrande', String(novoEstado));
    };

    return (
        <>
            <div className="fixed bottom-6 right-6 z-50">
                <button
                    onClick={() => setMenuAberto(!menuAberto)}
                    className="bg-brand-500 text-white p-3 rounded-full shadow-lg hover:opacity-90 transition-smooth"
                    title="Menu de acessibilidade (Ctrl+F10)"
                >
                    ♿ Acessibilidade
                </button>
            </div>

            {menuAberto && (
                <div className="fixed bottom-24 right-6 bg-white rounded-xl shadow-2xl p-4 z-50 min-w-[220px] animate-fade-in">
                    <h3 className="font-bold text-primary dark:text-white mb-3">Acessibilidade</h3>
                    <button
                        onClick={toggleAltoContraste}
                        className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 transition-smooth mb-1"
                    >
                        {altoContraste ? '🎨 Desativar' : '🌙 Ativar'} Alto Contraste
                    </button>
                    <button
                        onClick={toggleFonteGrande}
                        className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 transition-smooth mb-1"
                    >
                        {fonteGrande ? '🔤 Reduzir' : '🔤 Aumentar'} Fonte
                    </button>
                    <button
                        onClick={() => setMenuAberto(false)}
                        className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 transition-smooth text-danger"
                    >
                        ✖️ Fechar
                    </button>
                </div>
            )}
        </>
    );
};

export default MenuAcessibilidade;
