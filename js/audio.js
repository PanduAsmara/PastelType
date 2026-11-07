// Sound Synthesizer using Web Audio API (Zero external assets needed!)

class SoundEngine {
    constructor() {
        this.ctx = null;
        this.enabled = true;
        this.volume = 0.45;
        this.soundType = 'cream'; // 'cream', 'thock', 'clicky', 'bubble', 'typewriter', 'off'
    }

    init() {
        if (!this.ctx) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            if (AudioContext) {
                this.ctx = new AudioContext();
            }
        }
        if (this.ctx && this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    }

    playKey() {
        if (!this.enabled || this.soundType === 'off') return;
        this.init();
        if (!this.ctx) return;

        const now = this.ctx.currentTime;
        // Small pitch jitter (+- 5%) for natural organic typing feel
        const jitter = (Math.random() - 0.5) * 0.1;

        switch (this.soundType) {
            case 'cream':
                this.playCream(now, jitter);
                break;
            case 'thock':
                this.playThock(now, jitter);
                break;
            case 'clicky':
                this.playClicky(now, jitter);
                break;
            case 'bubble':
                this.playBubble(now, jitter);
                break;
            case 'typewriter':
                this.playTypewriter(now, jitter);
                break;
        }
    }

    playCream(t, jitter) {
        // Deep, silky-smooth dampened linear switch
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const filter = this.ctx.createBiquadFilter();

        osc.type = 'triangle';
        const baseFreq = 160 * (1 + jitter);
        osc.frequency.setValueAtTime(baseFreq, t);
        osc.frequency.exponentialRampToValueAtTime(45, t + 0.04);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(450, t);
        filter.frequency.exponentialRampToValueAtTime(100, t + 0.04);

        gain.gain.setValueAtTime(this.volume * 0.7, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.045);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(t);
        osc.stop(t + 0.05);
    }

    playThock(t, jitter) {
        // Deep acoustic wooden/heavy thock
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        const freq = 120 * (1 + jitter);
        osc.frequency.setValueAtTime(freq * 1.8, t);
        osc.frequency.exponentialRampToValueAtTime(freq * 0.4, t + 0.05);

        gain.gain.setValueAtTime(this.volume * 0.8, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.055);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(t);
        osc.stop(t + 0.06);
    }

    playClicky(t, jitter) {
        // Crisp dual-click mechanical switch
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const filter = this.ctx.createBiquadFilter();

        osc.type = 'square';
        osc.frequency.setValueAtTime(1800 * (1 + jitter), t);
        osc.frequency.exponentialRampToValueAtTime(300, t + 0.02);

        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(2200, t);
        filter.Q.setValueAtTime(3, t);

        gain.gain.setValueAtTime(this.volume * 0.4, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.025);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(t);
        osc.stop(t + 0.03);
    }

    playBubble(t, jitter) {
        // Soft cute pastel pop / bubble
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        const startFreq = 420 * (1 + jitter);
        osc.frequency.setValueAtTime(startFreq, t);
        osc.frequency.exponentialRampToValueAtTime(startFreq * 2.1, t + 0.035);

        gain.gain.setValueAtTime(this.volume * 0.5, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.04);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(t);
        osc.stop(t + 0.045);
    }

    playTypewriter(t, jitter) {
        // Vintage metal strike sound
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const filter = this.ctx.createBiquadFilter();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(950 * (1 + jitter), t);
        osc.frequency.exponentialRampToValueAtTime(180, t + 0.035);

        filter.type = 'highpass';
        filter.frequency.setValueAtTime(700, t);

        gain.gain.setValueAtTime(this.volume * 0.5, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.04);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(t);
        osc.stop(t + 0.045);
    }

    playError() {
        if (!this.enabled || this.soundType === 'off') return;
        this.init();
        if (!this.ctx) return;

        const t = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(110, t);
        osc.frequency.exponentialRampToValueAtTime(65, t + 0.08);

        gain.gain.setValueAtTime(this.volume * 0.35, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.09);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(t);
        osc.stop(t + 0.1);
    }
}

export const sound = new SoundEngine();
