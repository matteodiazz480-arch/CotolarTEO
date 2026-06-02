class SoundManager {
    constructor() {
        this.sounds = {};
        this.enabled = localStorage.getItem('sound_enabled') !== 'false';
        this.init();
    }
    
    init() {
        this.loadSound('click', '/sounds/click.mp3');
        this.loadSound('success', '/sounds/success.mp3');
        this.loadSound('error', '/sounds/error.mp3');
        this.loadSound('notification', '/sounds/notification.mp3');
    }
    
    loadSound(name, url) {
        try {
            const audio = new Audio(url);
            audio.preload = 'auto';
            audio.volume = 0.5;
            this.sounds[name] = audio;
        } catch(e) {
            console.log(`No se pudo cargar el sonido: ${name}`);
        }
    }
    
    play(name) {
        if (!this.enabled) return;
        const sound = this.sounds[name];
        if (sound) {
            sound.currentTime = 0;
            sound.play().catch(e => console.log('Error al reproducir sonido'));
        }
    }
    
    playClick() { this.play('click'); }
    playSuccess() { this.play('success'); }
    playError() { this.play('error'); }
    playNotification() { this.play('notification'); }
    
    toggle() {
        this.enabled = !this.enabled;
        localStorage.setItem('sound_enabled', this.enabled);
        return this.enabled;
    }
    
    isEnabled() { return this.enabled; }
}

window.soundManager = new SoundManager();
console.log("🔊 Gestor de sonidos inicializado");