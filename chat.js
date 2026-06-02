// chat.js - Asistente COTOLAR con respuestas completas

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
    
    const sendMessage = async (question) => {
        if (!question.trim()) return;
        addMessage(question, 'user');
        if (window.playSound) window.playSound('click');
        input.value = '';
        
        showTypingIndicator();
        setTimeout(async () => {
            const respuesta = await buscarRespuesta(question);
            removeTypingIndicator();
            addMessage(respuesta, 'bot');
            if (window.playSound) window.playSound('notification');
        }, 500);
    };
    
    if (sendBtn) sendBtn.addEventListener('click', () => sendMessage(input.value));
    if (input) input.addEventListener('keypress', (e) => { if (e.key === 'Enter') sendMessage(input.value); });
    
    document.querySelectorAll('.suggestion-btn').forEach(btn => {
        btn.addEventListener('click', () => { sendMessage(btn.getAttribute('data-question')); });
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
    const p = pregunta.toLowerCase();
    const datos = window.DATOS_LOCALES;
    
    // MATRICULACIÓN
    if (p.includes('matrícula') || p.includes('matricular') || p.includes('inscripción') || p.includes('como me matricula')) {
        return "📝 Para matricularte en COTOLAR necesitás:\n\n✅ Título de Terapia Ocupacional (copia autenticada)\n✅ DNI actualizado\n✅ Foto 4x4 fondo blanco\n✅ Comprobante de pago de arancel\n✅ Curso de Ética Profesional (válido 2 años)\n\n📞 ¿Más dudas? Contactanos al 380 412-3456";
    }
    
    // ARANCELES
    if (p.includes('arancel') || p.includes('costo') || p.includes('precio') || p.includes('cuanto cuesta')) {
        return "💰 Aranceles COTOLAR 2025:\n\n• Matrícula Inicial: $15.000\n• Renovación Anual: $8.500\n• Certificado de Buena Conducta: $2.000\n• Constancia de Matrícula: $1.200\n\n📅 Los precios pueden actualizarse cada año.";
    }
    
    // REQUISITOS
    if (p.includes('requisitos') || p.includes('documentación') || p.includes('que necesito')) {
        return "📋 Requisitos para matriculación:\n\n1. Título de Terapia Ocupacional (original y copia autenticada)\n2. DNI actualizado (frente y dorso)\n3. Foto 4x4 fondo blanco (últimos 6 meses)\n4. Comprobante de pago del arancel\n5. Certificado del Curso de Ética Profesional\n\n📌 Todos los documentos deben presentarse en la sede del colegio.";
    }
    
    // CAPACITACIONES
    if (p.includes('capacitación') || p.includes('curso') || p.includes('jornada') || p.includes('próximas')) {
        const cursos = datos.capacitaciones;
        if (cursos && cursos.length > 0) {
            let respuesta = "🎓 Próximas capacitaciones:\n\n";
            cursos.forEach(c => { respuesta += `• ${c.nombre_curso}\n  📅 ${new Date(c.fecha_inicio).toLocaleDateString('es-AR')} | ${c.modalidad} | $${c.arancel_curso.toLocaleString()}\n\n`; });
            return respuesta;
        }
        return "🎓 Actualmente no hay capacitaciones programadas. Consultá más tarde.";
    }
    
    // UBICACIÓN
    if (p.includes('ubicación') || p.includes('dirección') || p.includes('dónde están') || p.includes('donde queda')) {
        return "📍 Nuestra sede está en:\n\nAv. Ramírez de Velazco 123, La Rioja Capital\n\n🕐 Horario: Lunes a Viernes de 8:00 a 14:00\n📞 Tel: 380 412-3456\n📧 Email: info@cotolar.org";
    }
    
    // HORARIOS
    if (p.includes('horario') || p.includes('atención') || p.includes('cuando abren')) {
        return "🕐 Horarios de atención:\n\nLunes a Viernes: 8:00 a 14:00\n\n📞 Consultas telefónicas: 380 412-3456\n📧 Consultas por email: info@cotolar.org";
    }
    
    // CONTACTO
    if (p.includes('contacto') || p.includes('teléfono') || p.includes('whatsapp') || p.includes('llamar')) {
        return "📞 Datos de contacto:\n\n• Teléfono: 380 412-3456\n• Email: info@cotolar.org\n• Dirección: Av. Ramírez de Velazco 123, La Rioja Capital\n\n🕐 Atención: Lunes a Viernes 8:00 a 14:00";
    }
    
    // PROFESIONALES
    if (p.includes('profesional') || p.includes('colegiado') || p.includes('matriculado')) {
        const pro = window.PROFESIONALES_ACTIVOS || [];
        if (pro.length > 0) {
            let respuesta = "👥 Profesionales matriculados en COTOLAR:\n\n";
            pro.slice(0, 10).forEach(p => { respuesta += `• ${p.nombre} - ${p.especialidad} (${p.localidad})\n`; });
            if (pro.length > 10) respuesta += `\n... y ${pro.length - 10} más.`;
            return respuesta;
        }
        return "👥 Actualmente hay más de 350 profesionales matriculados en COTOLAR en toda la provincia.";
    }
    
    // NOTICIAS
    const noticia = datos.noticias.find(n => n.titulo.toLowerCase().includes(p) || n.contenido.toLowerCase().includes(p));
    if (noticia) return `📰 ${noticia.titulo}: ${noticia.contenido.substring(0, 150)}...`;
    
    // RESPUESTA POR DEFECTO
    return "📌 No encontré información exacta sobre eso. Te sugiero:\n\n• Revisar la sección Trámites en el menú\n• Consultar nuestras capacitaciones disponibles\n• Contactarnos directamente al 380 412-3456\n• Escribir info@cotolar.org\n\n¿Podés reformular tu pregunta?";
}

document.addEventListener('DOMContentLoaded', () => { inicializarChat(); });