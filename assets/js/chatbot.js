// chatbot.js — Motor de respuestas del asistente COTOLAR
// Módulo independiente del UI: sólo lógica de respuestas

window.ChatBot = (function () {

    // ── Normalización de texto ───────────────────────────────────
    function norm(text) {
        return (text || '')
            .toLowerCase()
            .normalize('NFD').replace(/[̀-ͯ]/g, '')
            .replace(/[¿¡.,!?;:()"']/g, ' ')
            .replace(/\s+/g, ' ')
            .trim();
    }

    function has(n, terms) {
        return terms.some(t => typeof t === 'string' ? n.includes(norm(t)) : t.test(n));
    }

    function starts(n, terms) {
        return terms.some(t => n.startsWith(norm(t)));
    }

    function pick(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    }

    // ── Base de conocimiento central ─────────────────────────────
    const KB = {
        sede:     'Av. Ramírez de Velazco 123, La Rioja Capital',
        horario:  'Lunes a Viernes: 8:00 a 14:00 hs',
        telefono: '380 412-3456',
        email:    'info@cotolar.org',
    };

    // ── Contexto de conversación ─────────────────────────────────
    const ctx = { last: null, turns: 0 };

    // ── Definición de intents ─────────────────────────────────────
    // Cada intent tiene: id, match(normText) → bool, reply() → string
    const intents = [

        // Saludos
        {
            id: 'greeting',
            match: n => starts(n, ['hola', 'buenas', 'holi', 'buenos dias', 'buen dia',
                                   'buenas tardes', 'buenas noches', 'hey', 'hello',
                                   'que tal', 'como estas', 'saludos']),
            reply: () => pick([
                '¡Hola! 👋 Soy el asistente de COTOLAR. Podés preguntarme sobre matrícula, aranceles, capacitaciones, pagos o cualquier duda.',
                '¡Buenas! Estoy aquí para ayudarte. ¿Sobre qué querés consultar?',
                '¡Hola! ¿En qué te puedo ayudar hoy?',
            ]),
        },

        // Agradecimientos
        {
            id: 'thanks',
            match: n => starts(n, ['gracias', 'muchas gracias', 'te agradezco',
                                   'genial gracias', 'ok gracias', 'perfecto gracias',
                                   'listo gracias']) || n === 'gracias',
            reply: () => pick([
                '¡De nada! 😊 ¿Hay algo más en lo que pueda ayudarte?',
                '¡Con gusto! Acá estoy para lo que necesites.',
                'Para eso estoy. ¡Cualquier otra consulta, avisame!',
            ]),
        },

        // Despedidas
        {
            id: 'bye',
            match: n => starts(n, ['chau', 'adios', 'bye', 'hasta luego', 'hasta pronto',
                                   'me voy', 'nos vemos', 'hasta la proxima']),
            reply: () => pick([
                '¡Hasta luego! 👋 Cuando necesites, acá estoy.',
                '¡Chau! Que tengas un excelente día. 😊',
                '¡Hasta pronto! Cualquier consulta, volvé cuando quieras.',
            ]),
        },

        // Identidad / ayuda general
        {
            id: 'identity',
            match: n => has(n, ['quien eres', 'que eres', 'quien sos', 'presentate',
                                'que podes hacer', 'para que sirves', 'cuales son tus funciones',
                                'que sabes', 'comandos', 'opciones', 'ayuda', 'menu']),
            reply: () =>
                '🤖 Soy el asistente virtual de COTOLAR. Puedo ayudarte con:\n\n' +
                '• 📝 Matriculación y requisitos\n' +
                '• 💰 Aranceles vigentes\n' +
                '• 🎓 Capacitaciones y cursos\n' +
                '• 📍 Ubicación y horarios\n' +
                '• 💳 Pagos de cuota\n' +
                '• 👤 Acceso y perfil docente\n' +
                '• 📰 Noticias del colegio\n\n' +
                '¿Sobre qué querés consultar?',
        },

        // Matriculación
        {
            id: 'matriculacion',
            match: n => has(n, ['matricula', 'matricular', 'matricularme', 'inscripcion',
                                'inscribirme', 'habilitar', 'quiero registrarme',
                                'como me registro', 'nueva matricula', 'tramite matricula']),
            reply: () =>
                '📝 Para matricularte en COTOLAR necesitás:\n\n' +
                '✅ Título (original + copia autenticada)\n' +
                '✅ DNI actualizado (frente y dorso)\n' +
                '✅ Foto 4×4 fondo blanco\n' +
                '✅ Comprobante de pago del arancel\n' +
                '✅ Certificado del Curso de Ética Profesional\n\n' +
                '📍 Presentá los documentos en la sede:\n' +
                KB.sede + '\n' +
                '🕐 ' + KB.horario + '\n' +
                '📞 Consultas: ' + KB.telefono,
        },

        // Aranceles / costos
        {
            id: 'aranceles',
            match: n => has(n, ['arancel', 'cuanto cuesta', 'cuanto sale', 'cuanto vale',
                                'precio', 'costos', 'valores', 'monto', 'plata',
                                'cuanto es', 'cuanto hay que pagar']) &&
                        !has(n, ['pagar cuota', 'pago de cuota', 'link de pago']),
            reply: () =>
                '💰 Aranceles COTOLAR 2025:\n\n' +
                '• Matrícula inicial: $15.000\n' +
                '• Renovación anual: $8.500\n' +
                '• Certificado de Buena Conducta: $2.000\n' +
                '• Constancia de Matrícula: $1.200\n\n' +
                '📌 Se actualizan anualmente. Confirmá valores al ' + KB.telefono,
        },

        // Pagos / cómo pagar
        {
            id: 'pagos',
            match: n => has(n, ['como pago', 'donde pago', 'pagar cuota', 'link de pago',
                                'mercado pago', 'pago de cuota', 'como pagar mi cuota',
                                'formas de pago', 'metodo de pago', 'pago online',
                                'como hago el pago', 'realizar pago']),
            reply: () =>
                '💳 Para pagar tu cuota:\n\n' +
                '1. Ingresá al panel docente\n' +
                '2. Andá a la sección "Pagos"\n' +
                '3. Tocá el botón "Pagar Cuota"\n\n' +
                'Se abrirá Mercado Pago de forma segura y automática.\n\n' +
                '¿Necesitás ayuda para ingresar al sistema?',
        },

        // Requisitos / documentación
        {
            id: 'requisitos',
            match: n => has(n, ['requisito', 'documentacion', 'que necesito', 'que papeles',
                                'que documentos', 'documentos necesarios', 'con que papeles',
                                'que tengo que presentar']),
            reply: () =>
                '📋 Requisitos para matriculación:\n\n' +
                '1️⃣ Título (original + copia autenticada)\n' +
                '2️⃣ DNI (frente y dorso)\n' +
                '3️⃣ Foto 4×4 fondo blanco\n' +
                '4️⃣ Comprobante de pago del arancel\n' +
                '5️⃣ Certificado de Ética Profesional\n\n' +
                '🕐 Sede: ' + KB.sede + ' — ' + KB.horario,
        },

        // Capacitaciones / cursos
        {
            id: 'capacitaciones',
            match: n => has(n, ['capacitacion', 'curso', 'jornada', 'taller', 'formacion',
                                'actualizacion', 'proximo curso', 'cuando hay cursos',
                                'actividades', 'seminario', 'proximo evento']),
            reply: () => {
                const datos = window.DATOS_LOCALES;
                if (datos && datos.capacitaciones && datos.capacitaciones.length > 0) {
                    let r = '🎓 Próximas capacitaciones:\n\n';
                    datos.capacitaciones.slice(0, 4).forEach(c => {
                        r += `📌 ${c.nombre_curso}\n`;
                        r += `   📅 ${new Date(c.fecha_inicio).toLocaleDateString('es-AR')} | ${c.modalidad}\n`;
                        r += `   💰 $${c.arancel_curso.toLocaleString()} | 👨‍🏫 ${c.instructor}\n\n`;
                    });
                    r += '📞 Inscripciones: ' + KB.telefono;
                    return r;
                }
                return '🎓 En este momento no hay capacitaciones programadas. Escribinos a ' + KB.email + ' o llamanos al ' + KB.telefono + ' para novedades.';
            },
        },

        // Horarios de atención
        {
            id: 'horarios',
            match: n => has(n, ['horario', 'cuando atienden', 'cuando abren', 'a que hora',
                                'horarios de atencion', 'estan abiertos']),
            reply: () =>
                '🕐 Horario de atención:\n\n' +
                KB.horario + '\n\n' +
                '📧 Fuera de ese horario escribinos a ' + KB.email + '\n' +
                '(respondemos en 48 hs hábiles)',
        },

        // Ubicación / sede
        {
            id: 'ubicacion',
            match: n => has(n, ['ubicacion', 'direccion', 'donde estan', 'donde queda',
                                'sede', 'como llego', 'donde los encuentro', 'en que calle',
                                'donde se ubican']),
            reply: () =>
                '📍 Sede COTOLAR:\n\n' +
                KB.sede + '\n\n' +
                '🕐 ' + KB.horario + '\n' +
                '📞 ' + KB.telefono + '\n' +
                '📧 ' + KB.email,
        },

        // Contacto
        {
            id: 'contacto',
            match: n => has(n, ['contacto', 'telefono', 'whatsapp', 'llamar', 'email',
                                'correo', 'mail', 'comunicarme', 'como los contacto',
                                'numero de telefono']),
            reply: () =>
                '📞 Contacto COTOLAR:\n\n' +
                '• Teléfono: ' + KB.telefono + '\n' +
                '• Email: ' + KB.email + '\n' +
                '• Dirección: ' + KB.sede + '\n\n' +
                '🕐 ' + KB.horario,
        },

        // Login / acceso al sistema
        {
            id: 'login',
            match: n => has(n, ['como ingreso', 'no puedo ingresar', 'olvide mi contrasena',
                                'contrasena', 'olvide contraseña', 'entrar al sistema',
                                'iniciar sesion', 'como accedo', 'como entro', 'login']),
            reply: () =>
                '🔐 Para ingresar al sistema:\n\n' +
                '1. Hacé clic en "Ingresar" (arriba a la derecha)\n' +
                '2. Ingresá tu email y contraseña\n' +
                '3. El sistema te llevará a tu panel automáticamente\n\n' +
                '¿Olvidaste tu contraseña? Contactanos al ' + KB.telefono,
        },

        // Perfil / editar datos
        {
            id: 'perfil',
            match: n => has(n, ['actualizar datos', 'editar perfil', 'cambiar foto',
                                'modificar datos', 'mi perfil', 'cambiar contrasena',
                                'subir foto', 'mis datos', 'editar mis datos', 'actualizar foto']),
            reply: () =>
                '👤 Para actualizar tu perfil:\n\n' +
                '1. Ingresá al panel docente\n' +
                '2. Andá a "Editar Datos"\n' +
                '3. Modificá lo que necesites y guardá\n\n' +
                'Para cambiar la foto: tocá el ícono de cámara sobre tu foto de perfil.\n' +
                'Para eliminarla: usá el ícono rojo de papelera.',
        },

        // Noticias / novedades
        {
            id: 'noticias',
            match: n => has(n, ['noticia', 'novedad', 'novedades', 'que hay de nuevo',
                                'actualidad', 'informacion nueva', 'ultimas noticias']),
            reply: () => {
                const datos = window.DATOS_LOCALES;
                if (datos && datos.noticias && datos.noticias.length > 0) {
                    let r = '📰 Últimas noticias del COTOLAR:\n\n';
                    datos.noticias.slice(0, 3).forEach(n => {
                        r += `📌 ${n.titulo}\n`;
                        r += `   ${n.contenido.substring(0, 100)}...\n`;
                        r += `   📅 ${new Date(n.fecha).toLocaleDateString('es-AR')}\n\n`;
                    });
                    return r;
                }
                return '📰 Seguinos en redes sociales para estar al tanto de todas las novedades del COTOLAR.';
            },
        },

        // Profesionales matriculados
        {
            id: 'profesionales',
            match: n => has(n, ['profesional', 'colegiado', 'matriculado', 'terapeuta',
                                'cuantos matriculados', 'lista de profesionales',
                                'profesionales activos']),
            reply: () => {
                const pro = window.PROFESIONALES_ACTIVOS || [];
                return pro.length > 0
                    ? '👥 COTOLAR tiene ' + pro.length + ' profesionales matriculados activos en toda la provincia. Podés verlos en la sección "Profesionales" del menú.'
                    : '👥 COTOLAR cuenta con más de 350 profesionales matriculados en toda la provincia de La Rioja.';
            },
        },

        // Convenios
        {
            id: 'convenios',
            match: n => has(n, ['convenio', 'acuerdo', 'unlar', 'universidad nacional',
                                'ministerio de salud', 'obras sociales']),
            reply: () =>
                '🤝 COTOLAR tiene 12 convenios vigentes con:\n\n' +
                '• Universidad Nacional de La Rioja (UNLaR)\n' +
                '• Ministerio de Salud de La Rioja\n' +
                '• Obras sociales provinciales\n\n' +
                '📞 Para más información: ' + KB.telefono,
        },

        // App / PWA
        {
            id: 'app',
            match: n => has(n, ['app', 'descargar', 'instalar la app', 'aplicacion',
                                'instalar en el celular', 'pwa', 'instalar en mi telefono',
                                'descargar la aplicacion']),
            reply: () =>
                '📱 Para instalar COTOLAR como app:\n\n' +
                '📲 Android (Chrome): Menú ⋮ → "Instalar aplicación"\n' +
                '🍎 iPhone (Safari): Compartir □↑ → "Agregar a pantalla de inicio"\n\n' +
                '✅ Funciona offline, es rápida y ocupa poco espacio.',
        },
    ];

    // ── Motor principal de respuestas ─────────────────────────────
    function responder(pregunta) {
        if (!pregunta || !pregunta.trim()) return null;

        ctx.turns++;
        ctx.last = pregunta;

        const n = norm(pregunta);

        // Buscar intent coincidente
        for (const intent of intents) {
            if (intent.match(n)) {
                return typeof intent.reply === 'function' ? intent.reply() : intent.reply;
            }
        }

        // Búsqueda en datos locales (noticias y capacitaciones)
        const datos = window.DATOS_LOCALES;
        if (datos) {
            const palabras = n.split(' ').filter(w => w.length > 4);
            for (const palabra of palabras) {
                const noticia = (datos.noticias || []).find(nw =>
                    norm(nw.titulo).includes(palabra) || norm(nw.contenido).includes(palabra)
                );
                if (noticia) {
                    return '📰 "' + noticia.titulo + '"\n\n' +
                        noticia.contenido.substring(0, 200) +
                        (noticia.contenido.length > 200 ? '...' : '') +
                        '\n\n📅 ' + new Date(noticia.fecha).toLocaleDateString('es-AR');
                }

                const curso = (datos.capacitaciones || []).find(c =>
                    norm(c.nombre_curso).includes(palabra)
                );
                if (curso) {
                    return '🎓 ' + curso.nombre_curso + '\n' +
                        '📅 ' + new Date(curso.fecha_inicio).toLocaleDateString('es-AR') +
                        ' | ' + curso.modalidad + '\n' +
                        '💰 $' + curso.arancel_curso.toLocaleString() +
                        ' | 👨‍🏫 ' + curso.instructor;
                }
            }
        }

        // Respuesta por defecto — varía para no ser repetitiva
        return pick([
            '❓ No encontré información sobre "' + pregunta + '".\n\nProbá con: matrícula, aranceles, horarios, capacitaciones, pagos o contacto.\n📞 ' + KB.telefono,
            'No tengo datos sobre eso. 🤔\n¿Podés reformular la pregunta?\n\nTemas: trámites • costos • cursos • horarios • pagos • contacto',
            'No pude entender esa consulta. ¿Podés escribirla de otra forma?\n\n💡 Ejemplo: "¿Cuánto cuesta la matrícula?" o "¿Cuáles son los horarios?"',
        ]);
    }

    // ── API pública ───────────────────────────────────────────────
    return { responder };

})();
