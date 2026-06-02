// imageHandler.js - Manejo de imágenes (subida local a base64)

// Convertir imagen a base64
function convertirImagenABase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

// Subir imagen desde input file
async function subirImagenDesdeInput(inputElement) {
    return new Promise(async (resolve, reject) => {
        if (inputElement.files && inputElement.files[0]) {
            const file = inputElement.files[0];
            const ext = file.name.split('.').pop().toLowerCase();
            const tiposPermitidos = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'];
            
            if (!tiposPermitidos.includes(ext)) {
                alert('Formato no soportado. Usá JPG, PNG, GIF, WEBP o SVG.');
                reject(new Error('Formato no soportado'));
                return;
            }
            
            if (file.size > 5 * 1024 * 1024) {
                alert('La imagen no debe superar los 5MB');
                reject(new Error('Imagen muy grande'));
                return;
            }
            
            const base64 = await convertirImagenABase64(file);
            resolve(base64);
        } else {
            reject(new Error('No se seleccionó archivo'));
        }
    });
}

// Crear input file flotante para seleccionar imagen
function crearSelectorImagen(onImageSelected) {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/jpeg,image/png,image/gif,image/webp,image/svg+xml';
    input.style.position = 'fixed';
    input.style.top = '-100px';
    input.style.left = '-100px';
    input.style.opacity = '0';
    document.body.appendChild(input);
    
    input.addEventListener('change', async (e) => {
        if (e.target.files && e.target.files[0]) {
            try {
                const base64 = await subirImagenDesdeInput(input);
                onImageSelected(base64);
            } catch (error) {
                console.error('Error al cargar imagen:', error);
            }
        }
        input.remove();
    });
    
    input.click();
}

// Mostrar imagen o placeholder
function mostrarImagen(url, alt, className = '') {
    if (url && url.startsWith('data:image') || url && url.startsWith('http')) {
        return `<img src="${url}" alt="${alt}" class="${className}" onerror="this.src='https://placehold.co/400x300/E8DDD0/8B6B5A?text=Sin+imagen'">`;
    }
    return `<div class="bg-beige flex items-center justify-center ${className}"><span class="material-icons text-marronClaro text-4xl">image</span></div>`;
}