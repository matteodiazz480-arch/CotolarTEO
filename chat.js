// chat.js - Asistente COTOLAR

function inicializarChat() {
    const bubble = document.getElementById('chatBubble');
    const panel = document.getElementById('chatPanel');
    const closeBtn = document.getElementById('closeChat');
    const sendBtn = document.getElementById('sendChatBtn');
    const input = document.getElementById('chatInput');
    
    if (!bubble || !panel) return;
    
    const toggleChat = () => {
        panel.classList.toggle('open');
        if (window.playSound) window.playSound('click');
    };
    
    bubble.addEventListener('click', toggleChat);
    if (closeBtn) closeBtn.addEventListener('click', toggleChat);
    
    const sendMessage = async () => {
        const question = input.value.trim();
        if (!question) return;
        
        addMessage(question, 'user');
        if (window.playSound) window.playSound('click');
        input.value = '';
        
        const respuesta = await buscarRespuesta(question);
        addMessage(respuesta, 'bot');
        if (window.playSound) window.playSound('notification');
    };
    
    if (sendBtn) sendBtn.addEventListener('click', sendMessage);
    if (input) input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });
}

function addMessage(text, sender) {
    const container = document.getElementById('chatMessages');
    if (!container) return;
    
    const msgDiv = document.createElement('div');
    msgDiv.className = `message ${sender}`;
    msgDiv.textContent = text;
    container.appendChild(msgDiv);
    container.scrollTop = container.scrollHeight;
}

async function buscarRespuesta(pregunta) {
    const preguntaLower = pregunta.toLowerCase();
    const datos = window.DATOS_LOCALES;
    
    if (preguntaLower.includes('matrícula') || preguntaLower.includes('matricular') || preguntaLower.includes('inscripción')) {
        return "📝 Para matricularte necesitás: título de Terapia Ocupacional, DNI, foto 4x4, comprobante de pago y curso de Ética Profesional. Los aranceles están en la sección Trámites.";
    }
    
    if (preguntaLower.includes('arancel') || preguntaLower.includes('costo') || preguntaLower.includes('precio') || preguntaLower.includes('cuanto')) {
        return "💰 Los aranceles vigentes son: Matrícula Inicial $15.000, Renovación Anual $8.500, Certificado de Buena Conducta $2.000. Consultá más en la sección Trámites.";
    }
    
    const noticia = datos.noticias.find(n => 
        n.titulo.toLowerCase().includes(preguntaLower) || 
        n.contenido.toLowerCase().includes(preguntaLower)
    );
    if (noticia) {
        return `📰 ${noticia.titulo}: ${noticia.contenido.substring(0, 120)}...`;
    }
    
    const curso = datos.capacitaciones.find(c => 
        c.nombre_curso.toLowerCase().includes(preguntaLower)
    );
    if (curso) {
        return `🎓 ${curso.nombre_curso} - ${curso.modalidad} desde $${curso.arancel_curso.toLocaleString()}. ${curso.fecha_inicio ? 'Inicia: ' + new Date(curso.fecha_inicio).toLocaleDateString('es-AR') : ''}`;
    }
    
    const requisito = datos.requisitos.find(r => 
        r.nombre.toLowerCase().includes(preguntaLower)
    );
    if (requisito) {
        return `📌 ${requisito.nombre}: ${requisito.descripcion_detallada}`;
    }
    
    return "📌 No encontré información sobre eso. Te recomiendo revisar las secciones Trámites y Capacitaciones, o contactarnos por teléfono al 380 412-3456.";
}

document.addEventListener('DOMContentLoaded', () => {
    inicializarChat();
});