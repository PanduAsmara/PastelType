// Lightweight pastel confetti celebration engine

export class ConfettiCelebration {
    constructor(canvasId = 'confetti-canvas') {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas ? this.canvas.getContext('2d') : null;
        this.particles = [];
        this.animationFrame = null;
        this.resize();
        window.addEventListener('resize', () => this.resize());
    }

    resize() {
        if (!this.canvas) return;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    fire(durationMs = 2500) {
        if (!this.canvas || !this.ctx) return;
        this.resize();

        const pastelColors = [
            '#e27396', '#ea9ab2', '#8675e6', '#ab9ff0',
            '#5c8760', '#8aa98e', '#e67d58', '#f0a386',
            '#c99834', '#ffd166', '#a78bfa', '#67e8f9'
        ];

        const particleCount = 100;
        this.particles = [];

        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: window.innerWidth * (0.2 + Math.random() * 0.6),
                y: window.innerHeight * 0.4,
                vx: (Math.random() - 0.5) * 12,
                vy: -Math.random() * 10 - 4,
                size: Math.random() * 8 + 5,
                color: pastelColors[Math.floor(Math.random() * pastelColors.length)],
                rotation: Math.random() * 360,
                rotationSpeed: (Math.random() - 0.5) * 8,
                alpha: 1,
                decay: 0.008 + Math.random() * 0.008
            });
        }

        const startTime = performance.now();
        const animate = (currentTime) => {
            if (!this.ctx) return;
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

            let activeCount = 0;
            for (let p of this.particles) {
                p.x += p.vx;
                p.y += p.vy;
                p.vy += 0.25; // gravity
                p.vx *= 0.98; // drag
                p.rotation += p.rotationSpeed;
                p.alpha -= p.decay;

                if (p.alpha > 0) {
                    activeCount++;
                    this.ctx.save();
                    this.ctx.translate(p.x, p.y);
                    this.ctx.rotate((p.rotation * Math.PI) / 180);
                    this.ctx.globalAlpha = Math.max(0, p.alpha);
                    this.ctx.fillStyle = p.color;
                    this.ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
                    this.ctx.restore();
                }
            }

            if (activeCount > 0 && currentTime - startTime < durationMs) {
                this.animationFrame = requestAnimationFrame(animate);
            } else {
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                cancelAnimationFrame(this.animationFrame);
            }
        };

        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
        }
        this.animationFrame = requestAnimationFrame(animate);
    }
}
