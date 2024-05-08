"use client"
import React, { useState } from 'react';
import { genAI as gemini } from '@/lib/geminiAI';

const App: React.FC = () => {
    const [messages, setMessages] = useState<Array<{ user: boolean; text: string }>>([]);
    const [inputValue, setInputValue] = useState('');
    const [loading, setLoading] = useState(false);
    
    const model = gemini.getGenerativeModel({ model: 'gemini-pro' });

    const handleMessageSend = async () => {
        if (inputValue.trim() === '') {
            return; // Evita enviar mensajes vacíos
        }

        // Agregar el mensaje del usuario al historial
        setMessages((prevMessages) => [...prevMessages, { user: true, text: inputValue }]);

        // Restablecer el campo de entrada
        setInputValue('');
        setLoading(true);

        try {
            const result = await model.generateContent(inputValue);
            const response = await result.response;
            const text = await response.text(); // Usar `await` para obtener el texto de la respuesta

            // Agregar la respuesta del bot al historial
            setMessages((prevMessages) => [...prevMessages, { user: false, text }]);
        } catch (error) {
            // Manejar errores en la consulta
            setMessages((prevMessages) => [...prevMessages, { user: false, text: 'Hubo un error en la consulta. Por favor, inténtelo de nuevo más tarde.' }]);
        }

        setLoading(false);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault(); // Evita el comportamiento predeterminado de la tecla Enter
            handleMessageSend();
        }
    };

    return (
        <div className="chat-container" style={{         maxWidth: '600px',
        height: '600px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'}}>
            <div style={{ backgroundColor: 'rgb(67, 56, 202)', padding: '10px', color: '#fff', textAlign: 'center', fontSize: '1.2rem' }}>
                Chat de Ayuda Assist ASAP
            </div>

            {/* Mostrar historial de mensajes */}
            <div
                className="chat-messages"
                style={{
                    flex: 1,
                    overflowY: 'auto',
                    padding: '10px',
                    backgroundColor: '#f9f9f9', // Fondo claro para la conversación
                }}
            >
                {messages.map((message, index) => (
                    <div key={index} style={{ marginBottom: '10px' }}>
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: message.user ? 'flex-end' : 'flex-start',
                            }}
                        >
                            <div
                                style={{
                                    maxWidth: '75%',
                                    padding: '10px',
                                    borderRadius: '10px',
                                    backgroundColor: message.user ? 'rgb(67, 56, 202)' : '#e0e0e0',
                                    color: message.user ? '#fff' : '#000',
                                    fontFamily: 'Arial, sans-serif',
                                }}
                            >
                                {message.text}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Campo de entrada y botón de enviar */}
            <div className="input-section" style={{ display: 'flex', padding: '10px', borderTop: '1px solid #ccc' }}>
                <input
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                    style={{
                        flex: 1,
                        padding: '10px',
                        border: '1px solid #ccc',
                        borderRadius: '8px',
                        marginRight: '10px',
                    }}
                    placeholder="Escribe un mensaje..."
                />
                <button
                    type="button"
                    onClick={handleMessageSend}
                    style={{
                        padding: '10px 20px',
                        border: '1px solid #0078d4',
                        borderRadius: '8px',
                        backgroundColor: 'rgb(67, 56, 202)',
                        color: '#fff',
                        cursor: 'pointer',
                    }}
                    disabled={loading}
                >
                    {loading ? 'Enviando...' : 'Enviar'}
                </button>
            </div>
        </div>
    );
};

export default App;
