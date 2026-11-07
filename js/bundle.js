// PastelType - Self-contained Bundle (Runs seamlessly on file:// and http://)
(() => {
    // --- WORDS DATA ---
    const INDONESIAN_WORDS = [
        "yang", "untuk", "pada", "ke", "adalah", "ini", "itu", "atau", "hanya", "kita",
        "dengan", "dalam", "tidak", "akan", "dari", "ada", "mereka", "sudah", "saya", "tahu",
        "bisa", "lebih", "hari", "juga", "harus", "sangat", "lagi", "bukan", "waktu", "dapat",
        "banyak", "orang", "saat", "oleh", "seperti", "semua", "tentang", "tahun", "bila", "dunia",
        "masih", "lain", "setelah", "pun", "karena", "besar", "bawah", "atas", "tempat", "hidup",
        "tanpa", "jalan", "kata", "mata", "baik", "cara", "baru", "satu", "dua", "tiga",
        "kecil", "paling", "pernah", "tetap", "antara", "saja", "telah", "mungkin", "anak", "rumah",
        "hati", "tangan", "air", "udara", "langit", "senang", "cinta", "mimpi", "cahaya", "harapan",
        "pagi", "malam", "sore", "siang", "bulan", "bintang", "angin", "hujan", "mentari", "senja",
        "laut", "gunung", "sungai", "pulau", "negeri", "kota", "desa", "pohon", "daun", "bunga",
        "kopi", "teh", "buku", "pena", "cerita", "warna", "nada", "suara", "irama", "langkah",
        "jejak", "ruang", "wajah", "senyum", "tawa", "hening", "damai", "tenang", "sejuk", "hangat",
        "lembut", "indah", "elok", "manis", "segar", "bersih", "suci", "murni", "abadi", "makna",
        "jiwa", "sukma", "rasa", "pikir", "akal", "budi", "karsa", "daya", "upaya", "karya",
        "cipta", "gemerlap", "pesona", "pelangi", "kabut", "fajar", "lembayung", "embun", "samudera", "cakrawala",
        "kelopak", "aroma", "nuansa", "selaras", "harmoni", "melodi", "sepoi", "rindang", "teduh", "ranum",
        "sahabat", "keluarga", "kawan", "teman", "perjalanan", "petualangan", "keberanian", "semangat", "kejujuran", "kebaikan",
        "keindahan", "kesabaran", "kebijaksanaan", "kesederhanaan", "kebahagiaan", "kebersamaan", "kehangatan", "kesetiaan", "harum", "cerah",
        "sukses", "fokus", "belajar", "tumbuh", "berkembang", "berani", "hebat", "luar", "biasa", "kreatif",
        "imajinasi", "inspirasi", "intuisi", "refleksi", "ekspresi", "seni", "puisi", "pantun", "lagu", "tarian",
        "estetika", "kelembutan", "ketenangan", "kesunyian", "kerinduan", "kenangan", "masa", "depan", "lampau", "sekarang",
        "detik", "menit", "jam", "fase", "musim", "semi", "gugur", "salju", "tropis", "khatulistiwa",
        "lembut", "halus", "gemulai", "santai", "nyaman", "tentram", "sejahtera", "makmur", "sentosa", "lestari"
    ];

    const ENGLISH_WORDS = [
        "the", "be", "of", "and", "a", "to", "in", "he", "have", "it",
        "that", "for", "they", "with", "as", "not", "on", "she", "at", "by",
        "this", "we", "you", "do", "but", "his", "by", "from", "they", "we",
        "say", "her", "she", "or", "an", "will", "my", "one", "all", "would",
        "there", "their", "what", "so", "up", "out", "if", "about", "who", "get",
        "which", "go", "me", "when", "make", "can", "like", "time", "no", "just",
        "him", "know", "take", "people", "into", "year", "your", "good", "some", "could",
        "them", "see", "other", "than", "then", "now", "look", "only", "come", "its",
        "over", "think", "also", "back", "after", "use", "two", "how", "our", "work",
        "first", "well", "way", "even", "new", "want", "because", "any", "these", "give",
        "day", "most", "us", "pastel", "dream", "cloud", "gentle", "serene", "breeze", "bloom",
        "whisper", "glow", "soft", "light", "melody", "canvas", "cozy", "blossom", "harmony", "tranquil",
        "lavender", "matcha", "peach", "mist", "velvet", "aurora", "crystal", "meadow", "petals", "haven",
        "balance", "wonder", "journey", "horizon", "twilight", "dusk", "radiant", "zenith", "solitude", "grace"
    ];

    const CODE_WORDS = [
        "const", "let", "var", "function", "return", "if", "else", "switch", "case", "default",
        "break", "continue", "for", "while", "do", "try", "catch", "finally", "throw", "new",
        "class", "extends", "super", "this", "import", "export", "from", "async", "await", "promise",
        "null", "undefined", "true", "false", "typeof", "instanceof", "void", "delete", "yield", "debugger",
        "document", "window", "console", "log", "addEventListener", "querySelector", "classList", "setAttribute",
        "map", "filter", "reduce", "forEach", "find", "some", "every", "includes", "slice", "splice",
        "push", "pop", "shift", "unshift", "concat", "join", "split", "replace", "toLowerCase", "toUpperCase",
        "JSON", "parse", "stringify", "Math", "floor", "ceil", "round", "random", "max", "min",
        "flex", "grid", "display", "padding", "margin", "border", "radius", "color", "background", "shadow"
    ];

    const QUOTES = [
        {
            text: "Tahu dan mengerti itu dua hal yang berbeda. Orang tahu banyak hal, tapi sedikit yang mengerti.",
            author: "Pramoedya Ananta Toer",
            lang: "id"
        },
        {
            text: "Keberhasilan bukanlah milik orang yang pintar, tetapi milik mereka yang senantiasa berusaha.",
            author: "B.J. Habibie",
            lang: "id"
        },
        {
            text: "Lawan sastra ngesti mulya, dengan ilmu kita menuju kemuliaan hidup.",
            author: "Ki Hajar Dewantara",
            lang: "id"
        },
        {
            text: "Bermimpilah setinggi langit, jika engkau jatuh, engkau akan jatuh di antara bintang-bintang.",
            author: "Ir. Soekarno",
            lang: "id"
        },
        {
            text: "Ketenangan batin adalah permata kebijaksanaan yang paling indah dalam samudra kehidupan manusia.",
            author: "James Allen",
            lang: "id"
        },
        {
            text: "Setiap langkah kecil yang diambil dengan konsisten akan membentuk jalan besar menuju tujuanmu.",
            author: "Anonim",
            lang: "id"
        },
        {
            text: "Jadilah seperti mata air yang jernih, senantiasa memberi kesegaran bagi siapa pun yang singgah.",
            author: "Pepatah Bijak",
            lang: "id"
        },
        {
            text: "Simplicity is about subtracting the obvious and adding the meaningful.",
            author: "John Maeda",
            lang: "en"
        },
        {
            text: "In the middle of every difficulty lies a quiet opportunity to grow.",
            author: "Albert Einstein",
            lang: "en"
        },
        {
            text: "The soul becomes dyed with the color of its thoughts.",
            author: "Marcus Aurelius",
            lang: "en"
        },
        {
            text: "The details are not the details. They make the design.",
            author: "Charles Eames",
            lang: "en"
        },
        {
            text: "Have the courage to follow your heart and intuition; they already know what you truly want to become.",
            author: "Steve Jobs",
            lang: "en"
        },
        {
            text: "Nature does not hurry, yet everything is accomplished with gentle grace.",
            author: "Lao Tzu",
            lang: "en"
        }
    ];

    // --- AUDIO SYNTHESIZER ---
    class SoundEngine {
        constructor() {
            this.ctx = null;
            this.enabled = true;
            this.volume = 0.45;
            this.soundType = 'cream';
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

    const sound = new SoundEngine();

    // --- STORAGE & SETTINGS MANAGER ---
    const SETTINGS_KEY = 'pastel_type_settings';
    const STATS_KEY = 'pastel_type_stats';

    const DEFAULT_SETTINGS = {
        theme: 'sakura',
        font: 'jetbrains',
        caretStyle: 'bar',
        smoothCaret: true,
        sound: 'cream',
        soundVolume: 0.45,
        soundEnabled: true,
        showLiveWpm: true,
        showTimer: true,
        quickRestart: 'tab',
        language: 'id',
        mode: 'time',
        timeLimit: 30,
        wordCount: 25,
        punctuation: false,
        numbers: false,
        blindMode: false
    };

    class StorageManager {
        static getSettings() {
            try {
                const data = localStorage.getItem(SETTINGS_KEY);
                return data ? { ...DEFAULT_SETTINGS, ...JSON.parse(data) } : { ...DEFAULT_SETTINGS };
            } catch (e) {
                return { ...DEFAULT_SETTINGS };
            }
        }

        static saveSettings(settings) {
            try {
                localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
            } catch (e) {
                console.error('Failed to save settings:', e);
            }
        }

        static getStats() {
            try {
                const data = localStorage.getItem(STATS_KEY);
                return data ? JSON.parse(data) : { history: [], personalBests: {} };
            } catch (e) {
                return { history: [], personalBests: {} };
            }
        }

        static saveTestResult(result) {
            try {
                const stats = this.getStats();
                const modeKey = `${result.mode}_${result.mode === 'time' ? result.timeLimit : result.wordCount}_${result.language}`;

                const isPB = !stats.personalBests[modeKey] || result.wpm > stats.personalBests[modeKey].wpm;

                if (isPB) {
                    stats.personalBests[modeKey] = {
                        wpm: result.wpm,
                        acc: result.accuracy,
                        date: new Date().toISOString()
                    };
                }

                stats.history.unshift({
                    ...result,
                    date: new Date().toISOString(),
                    isPB
                });

                if (stats.history.length > 50) {
                    stats.history = stats.history.slice(0, 50);
                }

                localStorage.setItem(STATS_KEY, JSON.stringify(stats));
                return isPB;
            } catch (e) {
                console.error('Failed to save test result:', e);
                return false;
            }
        }

        static clearHistory() {
            try {
                localStorage.setItem(STATS_KEY, JSON.stringify({ history: [], personalBests: {} }));
            } catch (e) {
                console.error('Failed to clear history:', e);
            }
        }
    }

    // --- CHART GENERATOR (SVG) ---
    class TypingChart {
        constructor(container) {
            this.container = container;
        }

        render(historyData) {
            if (!this.container) return;
            this.container.innerHTML = '';

            if (!historyData || historyData.length < 2) {
                this.container.innerHTML = `
                    <div class="empty-chart-msg">
                        <span>Grafik kecepatan mengetik akan muncul di sini setelah tes berdurasi minimal 2 detik</span>
                    </div>
                `;
                return;
            }

            const width = this.container.clientWidth || 700;
            const height = this.container.clientHeight || 200;
            const padding = { top: 20, right: 30, bottom: 35, left: 45 };

            const innerWidth = width - padding.left - padding.right;
            const innerHeight = height - padding.top - padding.bottom;

            const maxTime = historyData[historyData.length - 1].second || historyData.length;
            const minTime = historyData[0].second || 1;

            let maxWpm = Math.max(
                ...historyData.map(d => Math.max(d.wpm || 0, d.raw || 0)),
                20
            );
            maxWpm = Math.ceil(maxWpm / 20) * 20;

            const xScale = (t) => padding.left + ((t - minTime) / (maxTime - minTime || 1)) * innerWidth;
            const yScale = (v) => padding.top + innerHeight - (v / maxWpm) * innerHeight;

            const getSplinePath = (points) => {
                if (points.length < 2) return '';
                let d = `M ${points[0].x},${points[0].y}`;
                for (let i = 0; i < points.length - 1; i++) {
                    const p0 = points[i === 0 ? 0 : i - 1];
                    const p1 = points[i];
                    const p2 = points[i + 1];
                    const p3 = points[i + 2 < points.length ? i + 2 : i + 1];

                    const cp1x = p1.x + (p2.x - p0.x) / 6;
                    const cp1y = p1.y + (p2.y - p0.y) / 6;
                    const cp2x = p2.x - (p3.x - p1.x) / 6;
                    const cp2y = p2.y - (p3.y - p1.y) / 6;

                    d += ` C ${cp1x.toFixed(1)},${cp1y.toFixed(1)} ${cp2x.toFixed(1)},${cp2y.toFixed(1)} ${p2.x.toFixed(1)},${p2.y.toFixed(1)}`;
                }
                return d;
            };

            const wpmPoints = historyData.map(d => ({ x: xScale(d.second), y: yScale(d.wpm) }));
            const rawPoints = historyData.map(d => ({ x: xScale(d.second), y: yScale(d.raw) }));

            const wpmPathStr = getSplinePath(wpmPoints);
            const rawPathStr = getSplinePath(rawPoints);
            const wpmAreaStr = `${wpmPathStr} L ${xScale(maxTime)},${yScale(0)} L ${xScale(minTime)},${yScale(0)} Z`;

            // Grid lines
            let gridLines = '';
            const ySteps = 4;
            for (let i = 0; i <= ySteps; i++) {
                const val = Math.round((maxWpm / ySteps) * i);
                const y = yScale(val);
                gridLines += `
                    <line x1="${padding.left}" y1="${y}" x2="${width - padding.right}" y2="${y}" stroke="var(--chart-grid)" stroke-dasharray="3,3" stroke-width="1"/>
                    <text x="${padding.left - 10}" y="${y + 4}" fill="var(--text-subtle)" font-size="11" text-anchor="end" font-family="var(--font-mono)">${val}</text>
                `;
            }

            // Time labels
            let xLabels = '';
            const xStepCount = Math.min(maxTime, 6);
            for (let i = 0; i <= xStepCount; i++) {
                const t = Math.round(minTime + ((maxTime - minTime) / xStepCount) * i);
                const x = xScale(t);
                xLabels += `
                    <text x="${x}" y="${height - padding.bottom + 18}" fill="var(--text-subtle)" font-size="11" text-anchor="middle" font-family="var(--font-mono)">${t}s</text>
                `;
            }

            // Error markers
            let errorMarkers = '';
            historyData.forEach(d => {
                if (d.errors && d.errors > 0) {
                    const x = xScale(d.second);
                    const y = yScale(d.wpm);
                    errorMarkers += `
                        <g class="chart-error-marker">
                            <circle cx="${x}" cy="${y}" r="4.5" fill="var(--char-incorrect)" stroke="var(--card-bg)" stroke-width="2"/>
                            <title>${d.errors} kesalahan pada detik ke-${d.second}</title>
                        </g>
                    `;
                }
            });

            const gradId = `chart-area-grad-${Math.floor(Math.random() * 10000)}`;

            const svgHtml = `
                <svg viewBox="0 0 ${width} ${height}" class="typing-chart-svg" preserveAspectRatio="none">
                    <defs>
                        <linearGradient id="${gradId}" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stop-color="var(--accent-primary)" stop-opacity="0.32" />
                            <stop offset="100%" stop-color="var(--accent-primary)" stop-opacity="0.0" />
                        </linearGradient>
                    </defs>

                    ${gridLines}
                    ${xLabels}

                    <path d="${wpmAreaStr}" fill="url(#${gradId})" />
                    <path d="${rawPathStr}" fill="none" stroke="var(--accent-secondary)" stroke-width="2" stroke-dasharray="4,3" opacity="0.6" />
                    <path d="${wpmPathStr}" fill="none" stroke="var(--accent-primary)" stroke-width="3" stroke-linecap="round" />

                    ${errorMarkers}

                    <g transform="translate(${width - padding.right - 140}, 14)">
                        <line x1="0" y1="0" x2="16" y2="0" stroke="var(--accent-primary)" stroke-width="2.5" />
                        <text x="22" y="3.5" fill="var(--text-main)" font-size="11" font-family="var(--font-sans)">WPM</text>

                        <line x1="65" y1="0" x2="81" y2="0" stroke="var(--accent-secondary)" stroke-width="2" stroke-dasharray="3,2" opacity="0.8"/>
                        <text x="87" y="3.5" fill="var(--text-subtle)" font-size="11" font-family="var(--font-sans)">Raw</text>
                    </g>
                </svg>
            `;

            this.container.innerHTML = svgHtml;
        }
    }

    // --- CONFETTI CELEBRATION ---
    class ConfettiCelebration {
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
                    p.vy += 0.25;
                    p.vx *= 0.98;
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

    // --- APPLICATION CORE ---
    class PastelTypeApp {
        constructor() {
            this.settings = StorageManager.getSettings();
            this.confetti = new ConfettiCelebration();
            this.chart = null;

            // Test state
            this.words = [];
            this.currentWordIdx = 0;
            this.currentCharIdx = 0;
            this.testActive = false;
            this.testFinished = false;
            this.startTime = null;
            this.timerInterval = null;
            this.timeRemaining = 0;
            this.elapsedSeconds = 0;

            // Stats
            this.keystrokeHistory = [];
            this.keyIntervals = [];
            this.lastKeyTime = null;
            this.correctChars = 0;
            this.incorrectChars = 0;
            this.extraChars = 0;
            this.missedChars = 0;
            this.secondErrors = 0;

            this.initDOMElements();
            this.applySettingsToDOM();
            this.bindEvents();
            this.updatePBDisplay();
            this.resetTest();
        }

        initDOMElements() {
            this.elements = {
                body: document.body,
                wordsContainer: document.getElementById('words-container'),
                wordsWrapper: document.getElementById('words-wrapper'),
                caret: document.getElementById('caret'),
                hiddenInput: document.getElementById('hidden-input'),
                focusOverlay: document.getElementById('focus-overlay'),
                liveTimer: document.getElementById('live-timer'),
                liveWpm: document.getElementById('live-wpm'),
                liveWpmVal: document.getElementById('live-wpm-val'),
                configBar: document.getElementById('config-bar'),
                restartBtn: document.getElementById('restart-btn'),

                // Modals & results
                resultsContainer: document.getElementById('results-container'),
                testSection: document.getElementById('test-section'),
                resultWpm: document.getElementById('result-wpm'),
                resultAcc: document.getElementById('result-acc'),
                resultRaw: document.getElementById('result-raw'),
                resultConsistency: document.getElementById('result-consistency'),
                resultTime: document.getElementById('result-time'),
                resultChars: document.getElementById('result-chars'),
                resultPbBadge: document.getElementById('result-pb-badge'),
                chartContainer: document.getElementById('chart-container'),
                resultRestartBtn: document.getElementById('result-restart-btn'),
                shareBtn: document.getElementById('share-btn'),

                // Header elements
                headerPb: document.getElementById('header-pb'),
                settingsBtn: document.getElementById('settings-btn'),
                historyBtn: document.getElementById('history-btn'),
                themeQuickBtn: document.getElementById('theme-quick-btn'),

                // Modals
                settingsModal: document.getElementById('settings-modal'),
                historyModal: document.getElementById('history-modal'),
                historyTableBody: document.getElementById('history-table-body'),
                clearHistoryBtn: document.getElementById('clear-history-btn'),
                toast: document.getElementById('toast')
            };

            this.chart = new TypingChart(this.elements.chartContainer);
        }

        applySettingsToDOM() {
            document.documentElement.setAttribute('data-theme', this.settings.theme);

            const fontMap = {
                jetbrains: "'JetBrains Mono', monospace",
                fira: "'Fira Code', monospace",
                roboto: "'Roboto Mono', monospace",
                outfit: "'Outfit', sans-serif"
            };
            document.documentElement.style.setProperty('--font-mono', fontMap[this.settings.font] || fontMap.jetbrains);

            sound.soundType = this.settings.sound;
            sound.volume = this.settings.soundVolume;
            sound.enabled = this.settings.soundEnabled;

            this.elements.caret.className = `caret caret-${this.settings.caretStyle}`;

            this.elements.liveWpm.style.display = this.settings.showLiveWpm ? 'block' : 'none';
            this.elements.liveTimer.style.display = this.settings.showTimer ? 'flex' : 'none';

            this.updateConfigBarUI();
        }

        updateConfigBarUI() {
            document.querySelectorAll('[data-config-mode]').forEach(btn => {
                btn.classList.toggle('active', btn.dataset.configMode === this.settings.mode);
            });

            const timeGroup = document.getElementById('time-options-group');
            const wordGroup = document.getElementById('word-options-group');

            if (timeGroup) timeGroup.style.display = this.settings.mode === 'time' ? 'flex' : 'none';
            if (wordGroup) wordGroup.style.display = this.settings.mode === 'words' ? 'flex' : 'none';

            document.querySelectorAll('[data-config-time]').forEach(btn => {
                btn.classList.toggle('active', parseInt(btn.dataset.configTime, 10) === this.settings.timeLimit);
            });

            document.querySelectorAll('[data-config-words]').forEach(btn => {
                btn.classList.toggle('active', parseInt(btn.dataset.configWords, 10) === this.settings.wordCount);
            });

            const puncBtn = document.getElementById('toggle-punctuation');
            if (puncBtn) puncBtn.classList.toggle('active', this.settings.punctuation);

            const numBtn = document.getElementById('toggle-numbers');
            if (numBtn) numBtn.classList.toggle('active', this.settings.numbers);

            document.querySelectorAll('[data-config-lang]').forEach(btn => {
                btn.classList.toggle('active', btn.dataset.configLang === this.settings.language);
            });
        }

        updatePBDisplay() {
            const stats = StorageManager.getStats();
            const modeKey = `${this.settings.mode}_${this.settings.mode === 'time' ? this.settings.timeLimit : this.settings.wordCount}_${this.settings.language}`;
            const pb = stats.personalBests[modeKey];
            if (pb && this.elements.headerPb) {
                this.elements.headerPb.innerHTML = `<span>PB:</span> <strong>${pb.wpm} WPM</strong>`;
                this.elements.headerPb.style.display = 'inline-flex';
            } else if (this.elements.headerPb) {
                this.elements.headerPb.style.display = 'none';
            }
        }

        bindEvents() {
            this.elements.testSection.addEventListener('click', () => this.focusInput());
            this.elements.focusOverlay.addEventListener('click', () => this.focusInput());
            this.elements.hiddenInput.addEventListener('blur', () => {
                if (!this.testFinished && !this.isModalOpen()) {
                    this.elements.focusOverlay.classList.add('visible');
                }
            });
            this.elements.hiddenInput.addEventListener('focus', () => {
                this.elements.focusOverlay.classList.remove('visible');
            });

            this.elements.hiddenInput.addEventListener('input', (e) => this.handleInput(e));
            this.elements.hiddenInput.addEventListener('keydown', (e) => this.handleKeyDown(e));

            window.addEventListener('keydown', (e) => {
                if (this.isModalOpen()) {
                    if (e.key === 'Escape') this.closeAllModals();
                    return;
                }

                if (e.key === 'Tab') {
                    e.preventDefault();
                    this.resetTest();
                    return;
                }

                if (e.key === 'Escape') {
                    e.preventDefault();
                    this.resetTest();
                    return;
                }

                if (!this.isModalOpen() && e.target !== this.elements.hiddenInput && !e.ctrlKey && !e.metaKey && e.key.length === 1) {
                    this.focusInput();
                }
            });

            this.elements.restartBtn.addEventListener('click', () => this.resetTest());
            this.elements.resultRestartBtn.addEventListener('click', () => this.resetTest());

            this.bindConfigBarEvents();
            this.bindModalEvents();

            if (this.elements.shareBtn) {
                this.elements.shareBtn.addEventListener('click', () => this.shareResults());
            }

            window.addEventListener('resize', () => {
                this.updateCaretPosition();
                this.handleLineScroll();
            });
        }

        bindConfigBarEvents() {
            document.querySelectorAll('[data-config-mode]').forEach(btn => {
                btn.addEventListener('click', () => {
                    this.settings.mode = btn.dataset.configMode;
                    StorageManager.saveSettings(this.settings);
                    this.applySettingsToDOM();
                    this.updatePBDisplay();
                    this.resetTest();
                });
            });

            document.querySelectorAll('[data-config-time]').forEach(btn => {
                btn.addEventListener('click', () => {
                    this.settings.timeLimit = parseInt(btn.dataset.configTime, 10);
                    StorageManager.saveSettings(this.settings);
                    this.applySettingsToDOM();
                    this.updatePBDisplay();
                    this.resetTest();
                });
            });

            document.querySelectorAll('[data-config-words]').forEach(btn => {
                btn.addEventListener('click', () => {
                    this.settings.wordCount = parseInt(btn.dataset.configWords, 10);
                    StorageManager.saveSettings(this.settings);
                    this.applySettingsToDOM();
                    this.updatePBDisplay();
                    this.resetTest();
                });
            });

            const puncBtn = document.getElementById('toggle-punctuation');
            if (puncBtn) {
                puncBtn.addEventListener('click', () => {
                    this.settings.punctuation = !this.settings.punctuation;
                    StorageManager.saveSettings(this.settings);
                    this.applySettingsToDOM();
                    this.resetTest();
                });
            }

            const numBtn = document.getElementById('toggle-numbers');
            if (numBtn) {
                numBtn.addEventListener('click', () => {
                    this.settings.numbers = !this.settings.numbers;
                    StorageManager.saveSettings(this.settings);
                    this.applySettingsToDOM();
                    this.resetTest();
                });
            }

            document.querySelectorAll('[data-config-lang]').forEach(btn => {
                btn.addEventListener('click', () => {
                    this.settings.language = btn.dataset.configLang;
                    StorageManager.saveSettings(this.settings);
                    this.applySettingsToDOM();
                    this.updatePBDisplay();
                    this.resetTest();
                });
            });
        }

        bindModalEvents() {
            this.elements.settingsBtn.addEventListener('click', () => this.openModal(this.elements.settingsModal));
            this.elements.historyBtn.addEventListener('click', () => {
                this.renderHistoryTable();
                this.openModal(this.elements.historyModal);
            });

            document.querySelectorAll('.modal-close-btn, .modal-backdrop').forEach(el => {
                el.addEventListener('click', (e) => {
                    if (e.target === el) {
                        this.closeAllModals();
                        this.focusInput();
                    }
                });
            });

            document.querySelectorAll('.theme-card').forEach(card => {
                card.addEventListener('click', () => {
                    const themeName = card.dataset.theme;
                    this.setTheme(themeName);
                    document.querySelectorAll('.theme-card').forEach(c => c.classList.remove('active'));
                    card.classList.add('active');
                });
            });

            if (this.elements.themeQuickBtn) {
                const themes = ['sakura', 'matcha', 'lavender', 'peach', 'lemon', 'midnight'];
                this.elements.themeQuickBtn.addEventListener('click', () => {
                    const currentIdx = themes.indexOf(this.settings.theme);
                    const nextTheme = themes[(currentIdx + 1) % themes.length];
                    this.setTheme(nextTheme);
                    this.showToast(`Tema: ${this.getThemeDisplayName(nextTheme)}`);
                });
            }

            const fontSelect = document.getElementById('setting-font');
            if (fontSelect) {
                fontSelect.value = this.settings.font;
                fontSelect.addEventListener('change', (e) => {
                    this.settings.font = e.target.value;
                    StorageManager.saveSettings(this.settings);
                    this.applySettingsToDOM();
                    this.updateCaretPosition();
                });
            }

            const soundSelect = document.getElementById('setting-sound');
            if (soundSelect) {
                soundSelect.value = this.settings.sound;
                soundSelect.addEventListener('change', (e) => {
                    this.settings.sound = e.target.value;
                    sound.soundType = e.target.value;
                    StorageManager.saveSettings(this.settings);
                    sound.playKey();
                });
            }

            const volumeSlider = document.getElementById('setting-volume');
            if (volumeSlider) {
                volumeSlider.value = this.settings.soundVolume * 100;
                volumeSlider.addEventListener('input', (e) => {
                    const vol = e.target.value / 100;
                    this.settings.soundVolume = vol;
                    sound.volume = vol;
                    StorageManager.saveSettings(this.settings);
                });
            }

            const caretSelect = document.getElementById('setting-caret');
            if (caretSelect) {
                caretSelect.value = this.settings.caretStyle;
                caretSelect.addEventListener('change', (e) => {
                    this.settings.caretStyle = e.target.value;
                    StorageManager.saveSettings(this.settings);
                    this.applySettingsToDOM();
                });
            }

            const toggleLiveWpm = document.getElementById('setting-live-wpm');
            if (toggleLiveWpm) {
                toggleLiveWpm.checked = this.settings.showLiveWpm;
                toggleLiveWpm.addEventListener('change', (e) => {
                    this.settings.showLiveWpm = e.target.checked;
                    StorageManager.saveSettings(this.settings);
                    this.applySettingsToDOM();
                });
            }

            const toggleSound = document.getElementById('setting-sound-enabled');
            if (toggleSound) {
                toggleSound.checked = this.settings.soundEnabled;
                toggleSound.addEventListener('change', (e) => {
                    this.settings.soundEnabled = e.target.checked;
                    sound.enabled = e.target.checked;
                    StorageManager.saveSettings(this.settings);
                });
            }

            if (this.elements.clearHistoryBtn) {
                this.elements.clearHistoryBtn.addEventListener('click', () => {
                    if (confirm('Hapus semua riwayat tes Anda?')) {
                        StorageManager.clearHistory();
                        this.renderHistoryTable();
                        this.updatePBDisplay();
                        this.showToast('Riwayat berhasil dibersihkan');
                    }
                });
            }
        }

        setTheme(themeName) {
            this.settings.theme = themeName;
            StorageManager.saveSettings(this.settings);
            document.documentElement.setAttribute('data-theme', themeName);
            document.querySelectorAll('.theme-card').forEach(c => {
                c.classList.toggle('active', c.dataset.theme === themeName);
            });
        }

        getThemeDisplayName(theme) {
            const names = {
                sakura: 'Sakura Blossom 🌸',
                matcha: 'Matcha Latte 🍵',
                lavender: 'Pastel Lavender ☁️',
                peach: 'Peach Gelato 🍑',
                lemon: 'Lemon Meringue 🍋',
                midnight: 'Midnight Pastel 🌌'
            };
            return names[theme] || theme;
        }

        focusInput() {
            this.elements.hiddenInput.focus();
            this.elements.focusOverlay.classList.remove('visible');
        }

        isModalOpen() {
            return document.querySelector('.modal-backdrop.open') !== null;
        }

        openModal(modal) {
            if (!modal) return;
            modal.classList.add('open');
            this.elements.hiddenInput.blur();
        }

        closeAllModals() {
            document.querySelectorAll('.modal-backdrop').forEach(m => m.classList.remove('open'));
        }

        showToast(message) {
            if (!this.elements.toast) return;
            this.elements.toast.textContent = message;
            this.elements.toast.classList.add('show');
            setTimeout(() => {
                this.elements.toast.classList.remove('show');
            }, 2200);
        }

        generateWords() {
            let baseList = [];
            if (this.settings.language === 'id') {
                baseList = INDONESIAN_WORDS;
            } else if (this.settings.language === 'code') {
                baseList = CODE_WORDS;
            } else {
                baseList = ENGLISH_WORDS;
            }

            if (this.settings.mode === 'quote') {
                const matchingQuotes = QUOTES.filter(q => q.lang === (this.settings.language === 'id' ? 'id' : 'en'));
                const pool = matchingQuotes.length > 0 ? matchingQuotes : QUOTES;
                const quote = pool[Math.floor(Math.random() * pool.length)];
                return quote.text.split(' ');
            }

            let count = 50;
            if (this.settings.mode === 'words') {
                count = this.settings.wordCount;
            } else if (this.settings.mode === 'time') {
                count = Math.max(100, Math.ceil(this.settings.timeLimit * 3.5));
            } else if (this.settings.mode === 'zen') {
                count = 200;
            }

            const punctuationMarks = ['.', ',', '!', '?', ';', ':', '-'];
            const words = [];

            for (let i = 0; i < count; i++) {
                let w = baseList[Math.floor(Math.random() * baseList.length)];

                if (this.settings.numbers && Math.random() < 0.15) {
                    w = Math.floor(Math.random() * 100).toString();
                }

                if (this.settings.punctuation && Math.random() < 0.22) {
                    const mark = punctuationMarks[Math.floor(Math.random() * punctuationMarks.length)];
                    if (Math.random() < 0.25) {
                        w = `"${w}"`;
                    } else {
                        w = `${w}${mark}`;
                    }
                    if (Math.random() < 0.3) {
                        w = w.charAt(0).toUpperCase() + w.slice(1);
                    }
                }

                words.push(w);
            }

            return words;
        }

        renderWords() {
            this.elements.wordsWrapper.innerHTML = '';
            this.elements.wordsWrapper.style.transform = 'translateY(0px)';

            this.words.forEach((wordText, wordIdx) => {
                const wordEl = document.createElement('div');
                wordEl.className = 'word';
                wordEl.dataset.wordIdx = wordIdx;

                for (let i = 0; i < wordText.length; i++) {
                    const letterEl = document.createElement('span');
                    letterEl.className = 'letter';
                    letterEl.textContent = wordText[i];
                    wordEl.appendChild(letterEl);
                }

                this.elements.wordsWrapper.appendChild(wordEl);
            });

            requestAnimationFrame(() => {
                this.updateCaretPosition();
            });
        }

        resetTest() {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
            this.testActive = false;
            this.testFinished = false;
            this.startTime = null;
            this.elapsedSeconds = 0;
            this.currentWordIdx = 0;
            this.currentCharIdx = 0;

            this.keystrokeHistory = [];
            this.keyIntervals = [];
            this.lastKeyTime = null;
            this.correctChars = 0;
            this.incorrectChars = 0;
            this.extraChars = 0;
            this.missedChars = 0;
            this.secondErrors = 0;

            this.elements.hiddenInput.value = '';

            this.elements.resultsContainer.classList.remove('active');
            this.elements.testSection.style.display = 'flex';
            this.elements.configBar.style.opacity = '1';
            this.elements.configBar.style.pointerEvents = 'auto';

            if (this.settings.mode === 'time') {
                this.timeRemaining = this.settings.timeLimit;
                this.elements.liveTimer.innerHTML = `${this.timeRemaining}<span class="timer-unit">s</span>`;
            } else if (this.settings.mode === 'words') {
                this.elements.liveTimer.innerHTML = `0<span class="timer-unit">/${this.settings.wordCount}</span>`;
            } else if (this.settings.mode === 'quote') {
                this.elements.liveTimer.innerHTML = `Quote`;
            } else {
                this.elements.liveTimer.innerHTML = `Zen`;
            }

            this.elements.liveWpmVal.textContent = '0';

            this.words = this.generateWords();
            this.renderWords();
            this.focusInput();
        }

        startTest() {
            this.testActive = true;
            this.startTime = performance.now();
            this.lastKeyTime = performance.now();
            this.elements.configBar.style.opacity = '0.35';
            this.elements.configBar.style.pointerEvents = 'none';

            this.timerInterval = setInterval(() => {
                this.onTimerTick();
            }, 1000);
        }

        onTimerTick() {
            this.elapsedSeconds++;

            const minutes = this.elapsedSeconds / 60;
            const currentWpm = minutes > 0 ? Math.round((this.correctChars / 5) / minutes) : 0;
            const rawWpm = minutes > 0 ? Math.round(((this.correctChars + this.incorrectChars + this.extraChars) / 5) / minutes) : 0;

            this.keystrokeHistory.push({
                second: this.elapsedSeconds,
                wpm: currentWpm,
                raw: rawWpm,
                errors: this.secondErrors
            });
            this.secondErrors = 0;

            this.elements.liveWpmVal.textContent = currentWpm;

            if (this.settings.mode === 'time') {
                this.timeRemaining--;
                this.elements.liveTimer.innerHTML = `${this.timeRemaining}<span class="timer-unit">s</span>`;

                if (this.timeRemaining <= 0) {
                    this.finishTest();
                }
            } else if (this.settings.mode === 'words') {
                this.elements.liveTimer.innerHTML = `${this.currentWordIdx}<span class="timer-unit">/${this.settings.wordCount}</span>`;
            } else {
                this.elements.liveTimer.innerHTML = `${this.elapsedSeconds}<span class="timer-unit">s</span>`;
            }
        }

        handleKeyDown(e) {
            if (this.testFinished) return;

            if (e.key === 'Backspace') {
                e.preventDefault();
                this.handleBackspace(e.ctrlKey || e.metaKey);
                return;
            }

            if (e.key === ' ') {
                e.preventDefault();
                this.handleSpace();
                return;
            }
        }

        handleInput(e) {
            if (this.testFinished) return;

            const val = this.elements.hiddenInput.value;
            if (!val) return;

            const char = val[val.length - 1];
            this.elements.hiddenInput.value = '';

            if (!this.testActive) {
                this.startTest();
            }

            const now = performance.now();
            if (this.lastKeyTime) {
                this.keyIntervals.push(now - this.lastKeyTime);
            }
            this.lastKeyTime = now;

            this.handleCharacter(char);
        }

        handleCharacter(char) {
            const currentWordText = this.words[this.currentWordIdx];
            const wordEl = this.elements.wordsWrapper.children[this.currentWordIdx];
            if (!wordEl) return;

            this.elements.caret.classList.add('typing');

            if (this.currentCharIdx < currentWordText.length) {
                const targetChar = currentWordText[this.currentCharIdx];
                const letterEl = wordEl.children[this.currentCharIdx];

                if (char === targetChar) {
                    letterEl.className = 'letter correct';
                    this.correctChars++;
                    sound.playKey();
                } else {
                    letterEl.className = 'letter incorrect';
                    this.incorrectChars++;
                    this.secondErrors++;
                    sound.playError();
                }
                this.currentCharIdx++;
            } else {
                if (wordEl.querySelectorAll('.letter.extra').length < 15) {
                    const extraEl = document.createElement('span');
                    extraEl.className = 'letter extra';
                    extraEl.textContent = char;
                    wordEl.appendChild(extraEl);
                    this.extraChars++;
                    this.secondErrors++;
                    this.currentCharIdx++;
                    sound.playError();
                }
            }

            this.updateCaretPosition();
            this.handleLineScroll();
        }

        handleBackspace(isWordDelete = false) {
            const wordEl = this.elements.wordsWrapper.children[this.currentWordIdx];
            if (!wordEl) return;

            if (isWordDelete) {
                while (this.currentCharIdx > 0) {
                    this.deleteSingleChar(wordEl);
                }
            } else {
                if (this.currentCharIdx > 0) {
                    this.deleteSingleChar(wordEl);
                } else if (this.currentWordIdx > 0) {
                    const prevWordEl = this.elements.wordsWrapper.children[this.currentWordIdx - 1];
                    const prevWordText = this.words[this.currentWordIdx - 1];
                    const hasErrors = prevWordEl.querySelector('.incorrect, .extra') !== null;

                    if (hasErrors) {
                        this.currentWordIdx--;
                        const extras = prevWordEl.querySelectorAll('.letter.extra').length;
                        this.currentCharIdx = prevWordText.length + extras;
                        prevWordEl.classList.remove('error-word');
                        this.handleLineScroll();
                    }
                }
            }

            sound.playKey();
            this.updateCaretPosition();
        }

        deleteSingleChar(wordEl) {
            const extras = wordEl.querySelectorAll('.letter.extra');

            if (extras.length > 0) {
                const lastExtra = extras[extras.length - 1];
                wordEl.removeChild(lastExtra);
                this.currentCharIdx--;
                if (this.extraChars > 0) this.extraChars--;
            } else if (this.currentCharIdx > 0) {
                this.currentCharIdx--;
                const letterEl = wordEl.children[this.currentCharIdx];
                if (letterEl) {
                    if (letterEl.classList.contains('correct') && this.correctChars > 0) {
                        this.correctChars--;
                    } else if (letterEl.classList.contains('incorrect') && this.incorrectChars > 0) {
                        this.incorrectChars--;
                    }
                    letterEl.className = 'letter';
                }
            }
        }

        handleSpace() {
            if (!this.testActive) return;
            if (this.currentCharIdx === 0) return;

            const currentWordText = this.words[this.currentWordIdx];
            const wordEl = this.elements.wordsWrapper.children[this.currentWordIdx];

            if (this.currentCharIdx < currentWordText.length) {
                for (let i = this.currentCharIdx; i < currentWordText.length; i++) {
                    this.missedChars++;
                }
            }

            const hasErrors = wordEl.querySelector('.incorrect, .extra') !== null || this.currentCharIdx < currentWordText.length;
            if (hasErrors) {
                wordEl.classList.add('error-word');
            }

            this.currentWordIdx++;
            this.currentCharIdx = 0;
            sound.playKey();

            if (this.settings.mode === 'words' && this.currentWordIdx >= this.settings.wordCount) {
                this.finishTest();
                return;
            }

            if (this.currentWordIdx >= this.words.length) {
                this.finishTest();
                return;
            }

            if (this.settings.mode === 'words') {
                this.elements.liveTimer.innerHTML = `${this.currentWordIdx}<span class="timer-unit">/${this.settings.wordCount}</span>`;
            }

            this.updateCaretPosition();
            this.handleLineScroll();
        }

        updateCaretPosition() {
            const wordEl = this.elements.wordsWrapper.children[this.currentWordIdx];
            if (!wordEl) return;

            const containerRect = this.elements.wordsContainer.getBoundingClientRect();
            let targetX = 0;
            let targetY = 0;

            if (this.currentCharIdx < wordEl.children.length) {
                const letterEl = wordEl.children[this.currentCharIdx];
                const letterRect = letterEl.getBoundingClientRect();
                targetX = letterRect.left - containerRect.left;
                targetY = letterRect.top - containerRect.top;
            } else {
                const lastLetter = wordEl.children[wordEl.children.length - 1];
                if (lastLetter) {
                    const letterRect = lastLetter.getBoundingClientRect();
                    targetX = letterRect.right - containerRect.left;
                    targetY = letterRect.top - containerRect.top;
                } else {
                    const wordRect = wordEl.getBoundingClientRect();
                    targetX = wordRect.left - containerRect.left;
                    targetY = wordRect.top - containerRect.top;
                }
            }

            this.elements.caret.style.left = `${targetX}px`;
            this.elements.caret.style.top = `${targetY + 4}px`;
        }

        handleLineScroll() {
            const wordEl = this.elements.wordsWrapper.children[this.currentWordIdx];
            if (!wordEl) return;

            const wordTop = wordEl.offsetTop;
            const lineHeight = 43.2;
            if (wordTop > lineHeight * 1.5) {
                const linesToShift = Math.floor(wordTop / lineHeight) - 1;
                this.elements.wordsWrapper.style.transform = `translateY(-${linesToShift * lineHeight}px)`;
            } else {
                this.elements.wordsWrapper.style.transform = 'translateY(0px)';
            }
        }

        calculateConsistency() {
            if (this.keyIntervals.length < 5) return 100;
            const avg = this.keyIntervals.reduce((a, b) => a + b, 0) / this.keyIntervals.length;
            const variance = this.keyIntervals.reduce((a, b) => a + Math.pow(b - avg, 2), 0) / this.keyIntervals.length;
            const stdDev = Math.sqrt(variance);

            const coefVar = (stdDev / avg) * 100;
            const consistency = Math.max(0, Math.min(100, Math.round(100 - coefVar * 0.7)));
            return isNaN(consistency) ? 85 : consistency;
        }

        finishTest() {
            if (this.testFinished) return;
            this.testFinished = true;
            this.testActive = false;
            clearInterval(this.timerInterval);

            const totalTime = Math.max(1, this.elapsedSeconds);
            const minutes = totalTime / 60;

            const totalCharsTyped = this.correctChars + this.incorrectChars + this.extraChars;
            const totalCharsAttempted = totalCharsTyped + this.missedChars;

            const finalWpm = Math.round((this.correctChars / 5) / minutes);
            const finalRawWpm = Math.round((totalCharsTyped / 5) / minutes);
            const finalAcc = totalCharsAttempted > 0 ? Math.round((this.correctChars / totalCharsAttempted) * 100) : 0;
            const consistency = this.calculateConsistency();

            if (this.keystrokeHistory.length === 0 || this.keystrokeHistory[this.keystrokeHistory.length - 1].second !== totalTime) {
                this.keystrokeHistory.push({
                    second: totalTime,
                    wpm: finalWpm,
                    raw: finalRawWpm,
                    errors: this.secondErrors
                });
            }

            const testResult = {
                wpm: finalWpm,
                raw: finalRawWpm,
                accuracy: finalAcc,
                consistency: consistency,
                timeLimit: this.settings.timeLimit,
                wordCount: this.settings.wordCount,
                mode: this.settings.mode,
                language: this.settings.language,
                totalTime: totalTime,
                chars: {
                    correct: this.correctChars,
                    incorrect: this.incorrectChars,
                    extra: this.extraChars,
                    missed: this.missedChars
                }
            };

            const isPB = StorageManager.saveTestResult(testResult);

            this.elements.testSection.style.display = 'none';
            this.elements.resultsContainer.classList.add('active');

            this.elements.resultWpm.textContent = finalWpm;
            this.elements.resultAcc.textContent = `${finalAcc}%`;
            this.elements.resultRaw.textContent = finalRawWpm;
            this.elements.resultConsistency.textContent = `${consistency}%`;
            this.elements.resultTime.textContent = `${totalTime}s`;
            this.elements.resultChars.textContent = `${this.correctChars}/${this.incorrectChars}/${this.extraChars}/${this.missedChars}`;

            if (isPB) {
                this.elements.resultPbBadge.style.display = 'inline-flex';
                this.confetti.fire(3000);
            } else {
                this.elements.resultPbBadge.style.display = 'none';
            }

            setTimeout(() => {
                this.chart.render(this.keystrokeHistory);
            }, 80);

            this.updatePBDisplay();
        }

        renderHistoryTable() {
            const stats = StorageManager.getStats();
            const tbody = this.elements.historyTableBody;
            if (!tbody) return;

            tbody.innerHTML = '';

            if (!stats.history || stats.history.length === 0) {
                tbody.innerHTML = `<tr><td colspan="6" style="text-align:center; color:var(--text-subtle); padding:2rem;">Belum ada riwayat tes</td></tr>`;
                return;
            }

            stats.history.forEach(item => {
                const tr = document.createElement('tr');
                const dateStr = new Date(item.date).toLocaleDateString('id-ID', {
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                });

                const modeLabel = `${item.mode} ${item.mode === 'time' ? item.timeLimit + 's' : (item.wordCount || '')}`;

                tr.innerHTML = `
                    <td><strong>${item.wpm}</strong> ${item.isPB ? '<span class="badge-pb-small">PB</span>' : ''}</td>
                    <td>${item.accuracy}%</td>
                    <td>${item.raw}</td>
                    <td>${item.consistency || 85}%</td>
                    <td>${modeLabel}</td>
                    <td>${dateStr}</td>
                `;
                tbody.appendChild(tr);
            });
        }

        shareResults() {
            const wpm = this.elements.resultWpm.textContent;
            const acc = this.elements.resultAcc.textContent;
            const shareText = `Saya baru saja mencapai ${wpm} WPM (${acc} akurasi) di PastelType! 🌸✨ Coba tes kecepatan mengetikmu di PastelType.`;

            if (navigator.clipboard) {
                navigator.clipboard.writeText(shareText).then(() => {
                    this.showToast('Hasil berhasil disalin ke clipboard! 📋');
                }).catch(() => {
                    this.showToast('Gagal menyalin ke clipboard');
                });
            }
        }
    }

    // Initialize application when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            window.pastelType = new PastelTypeApp();
        });
    } else {
        window.pastelType = new PastelTypeApp();
    }
})();
