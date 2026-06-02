// chat.js - Asistente COTOLAR con preguntas predeterminadas

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
    
    // Enviar mensaje
    const sendMessage = async (question) => {
        if (!question.trim()) return;
        
        addMessage(question, 'user');
        if (window.playSound) window.playSound('click');
        input.value = '';
        
        // Mostrar indicador de escritura
        showTypingIndicator();
        
        setTimeout(async () => {
            const respuesta = await buscarRespuesta(question);
            removeTypingIndicator();
            addMessage(respuesta, 'bot');
            if (window.playSound) window.playSound('notification');
        }, 500);
    };
    
    // Evento del botón enviar
    if (sendBtn) sendBtn.addEventListener('click', () => sendMessage(input.value));
    if (input) input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage(input.value);
    });
    
    // Eventos para los botones de sugerencias
    document.querySelectorAll('.suggestion-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const question = btn.getAttribute('data-question');
            sendMessage(question);
        });
    });
}

function showTypingIndicator() {
    const container = document.getElementById('chatMessages');
    const typingDiv = document.createElement('div');
    typingDiv.id = 'typingIndicator';
    typingDiv.className = 'message bot typing';
    typingDiv.innerHTML = '<span>●</span><span>●</span><span>●</span>';
    container.appendChild(typingDiv);
    container.scrollTop = container.scrollHeight;
}

function removeTypingIndicator() {
    const indicator = document.getElementById('typingIndicator');
    if (indicator) indicator.remove();
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
    
    // MATRICULACIÓN
    if (preguntaLower.includes('matrícula') || preguntaLower.includes('matricular') || preguntaLower.includes('inscripción') || preguntaLower.includes('como me matricula')) {
        return "📝 Para matricularte en COTOLAR necesitás:\n\n✅ Título de Terapia Ocupacional (copia autenticada)\n✅ DNI actualizado\n✅ Foto 4x4 fondo blanco\n✅ Comprobante de pago de arancel\n✅ Curso de Ética Profesional (válido 2 años)\n\n📞 ¿Más dudas? Contactanos al 380 412-3456";
    }
    
    // ARANCELES
    if (preguntaLower.includes('arancel') || preguntaLower.includes('costo') || preguntaLower.includes('precio') || preguntaLower.includes('cuanto cuesta')) {
        return "💰 Aranceles COTOLAR 2025:\n\n• Matrícula Inicial: $15.000\n• Renovación Anual: $8.500\n• Certificado de Buena Conducta: $2.000\n• Constancia de Matrícula: $1.200\n\n📅 Los precios pueden actualizarse cada año.";
    }
    
    // REQUISITOS
    if (preguntaLower.includes('requisitos') || preguntaLower.includes('documentación') || preguntaLower.includes('que necesito')) {
        return "📋 Requisitos para matriculación:\n\n1. Título de Terapia Ocupacional (original y copia autenticada)\n2. DNI actualizado (frente y dorso)\n3. Foto 4x4 fondo blanco (últimos 6 meses)\n4. Comprobante de pago del arancel\n5. Certificado del Curso de Ética Profesional\n\n📌 Todos los documentos deben presentarse en la sede del colegio.";
    }
    
    // CAPACITACIONES / CURSOS
    if (preguntaLower.includes('capacitación') || preguntaLower.includes('curso') || preguntaLower.includes('jornada') || preguntaLower.includes('próximas')) {
        const cursos = datos.capacitaciones;
        if (cursos && cursos.length > 0) {
            let respuesta = "🎓 Próximas capacitaciones:\n\n";
            cursos.forEach(c => {
                respuesta += `• ${c.nombre_curso}\n  📅 ${new Date(c.fecha_inicio).toLocaleDateString('es-AR')} | ${c.modalidad} | $${c.arancel_curso.toLocaleString()}\n\n`;
            });
            return respuesta;
        }
        return "🎓 Actualmente no hay capacitaciones programadas. Consultá más tarde o contactanos para más información.";
    }
    
    // UBICACIÓN / DIRECCIÓN
    if (preguntaLower.includes('ubicación') || preguntaLower.includes('dirección') || preguntaLower.includes('dónde están') || preguntaLower.includes('donde queda')) {
        return "📍 Nuestra sede está en:\n\nAv. Ramírez de Velazco 123, La Rioja Capital\n\n🕐 Horario: Lunes a Viernes de 8:00 a 14:00\n📞 Tel: 380 412-3456\n📧 Email: info@cotolar.org";
    }
    
    // HORARIOS
    if (preguntaLower.includes('horario') || preguntaLower.includes('atención') || preguntaLower.includes('cuando abren')) {
        return "🕐 Horarios de atención:\n\nLunes a Viernes: 8:00 a 14:00\n\n📞 Consultas telefónicas: 380 412-3456\n📧 Consultas por email: info@cotolar.org";
    }
    
    // CONTACTO / TELÉFONO
    if (preguntaLower.includes('contacto') || preguntaLower.includes('teléfono') || preguntaLower.includes('whatsapp') || preguntaLower.includes('llamar')) {
        return "📞 Datos de contacto:\n\n• Teléfono: 380 412-3456\n• Email: info@cotolar.org\n• Dirección: Av. Ramírez de Velazco 123, La Rioja Capital\n\n🕐 Atención: Lunes a Viernes 8:00 a 14:00";
    }
    
    // Buscar en noticias
    const noticia = datos.noticias.find(n => 
        n.titulo.toLowerCase().includes(preguntaLower) || 
        n.contenido.toLowerCase().includes(preguntaLower)
    );
    if (noticia) {
        return `📰 ${noticia.titulo}: ${noticia.contenido.substring(0, 150)}...`;
    }
    
    // Buscar en cursos específicos
    const curso = datos.capacitaciones.find(c => 
        c.nombre_curso.toLowerCase().includes(preguntaLower)
    );
    if (curso) {
        return `🎓 ${curso.nombre_curso}\n\n📅 Fecha: ${new Date(curso.fecha_inicio).toLocaleDateString('es-AR')}\n📍 Modalidad: ${curso.modalidad}\n💰 Arancel: $${curso.arancel_curso.toLocaleString()}\n👨‍🏫 Instructor: ${curso.instructor}\n📍 Lugar: ${curso.lugar}`;
    }
    
    // Respuesta por defecto
    return "📌 No encontré información exacta sobre eso. Te sugiero:\n\n• Revisar la sección Trámites en el menú\n• Consultar nuestras capacitaciones disponibles\n• Contactarnos directamente al 380 412-3456\n\n¿Podés reformular tu pregunta?";
}

// Inicializar el chat
document.addEventListener('DOMContentLoaded', () => {
    inicializarChat();
});