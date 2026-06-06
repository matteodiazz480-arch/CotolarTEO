// chat.js — Interfaz del asistente COTOLAR
// Solo maneja el UI: abrir/cerrar panel, mensajes, typing indicator.
// La lógica de respuestas está en chatbot.js (ChatBot.responder).

(function () {

    function inicializarChat() {
        const bubble = document.getElementById('chatBubble');
        const panel  = document.getElementById('chatPanel');
        if (!bubble || !panel) return;

        bubble.addEventListener('click', toggleChat);

        const closeBtn = document.getElementById('closeChat');
        if (closeBtn) closeBtn.addEventListener('click', toggleChat);

        const sendBtn = document.getElementById('sendChatBtn');
        const input   = document.getElementById('chatInput');
        if (sendBtn) sendBtn.addEventListener('click', () => enviar(input.value));
        if (input)   input.addEventListener('keypress', e => { if (e.key === 'Enter') enviar(input.value); });

        document.querySelectorAll('.suggestion-btn').forEach(btn => {
            btn.addEventListener('click', () => enviar(btn.dataset.question));
        });
    }

    function toggleChat() {
        const panel = document.getElementById('chatPanel');
        if (panel) panel.classList.toggle('open');
        if (window.playSound) window.playSound('click');
    }

    function enviar(pregunta) {
        pregunta = (pregunta || '').trim();
        if (!pregunta) return;

        const input = document.getElementById('chatInput');
        if (input) input.value = '';

        agregarMensaje(pregunta, 'user');
        if (window.playSound) window.playSound('click');
        mostrarTyping();

        // Delay breve para simular procesamiento
        const delay = 400 + Math.random() * 350;
        setTimeout(() => {
            quitarTyping();
            const respuesta = window.ChatBot
                ? window.ChatBot.responder(pregunta)
                : '⚠️ El asistente no está disponible en este momento.';
            agregarMensaje(respuesta, 'bot');
            if (window.playSound) window.playSound('notification');
        }, delay);
    }

    function mostrarTyping() {
        const c = document.getElementById('chatMessages');
        if (!c) return;
        const div = document.createElement('div');
        div.id = 'typingIndicator';
        div.className = 'message bot typing';
        div.innerHTML = '<span></span><span></span><span></span>';
        c.appendChild(div);
        c.scrollTop = c.scrollHeight;
    }

    function quitarTyping() {
        document.getElementById('typingIndicator')?.remove();
    }

    function agregarMensaje(texto, tipo) {
        const c = document.getElementById('chatMessages');
        if (!c) return;
        const div = document.createElement('div');
        div.className = 'message ' + tipo;
        div.textContent = texto;
        c.appendChild(div);
        c.scrollTop = c.scrollHeight;
    }

    document.addEventListener('DOMContentLoaded', inicializarChat);

})();
