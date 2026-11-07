import { INDONESIAN_WORDS, ENGLISH_WORDS, CODE_WORDS, QUOTES } from './words.js';
import { sound } from './audio.js';
import { StorageManager } from './storage.js';
import { TypingChart } from './chart.js';
import { ConfettiCelebration } from './confetti.js';

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

        // Statistics tracking
        this.keystrokeHistory = []; // { second, wpm, raw, errors }
        this.keyIntervals = [];
        this.lastKeyTime = null;
        this.correctChars = 0;
        this.incorrectChars = 0;
        this.extraChars = 0;
        this.missedChars = 0;
        this.secondErrors = 0;

        // DOM elements
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
        // Theme
        document.documentElement.setAttribute('data-theme', this.settings.theme);

        // Font
        const fontMap = {
            jetbrains: "'JetBrains Mono', monospace",
            fira: "'Fira Code', monospace",
            roboto: "'Roboto Mono', monospace",
            outfit: "'Outfit', sans-serif"
        };
        document.documentElement.style.setProperty('--font-mono', fontMap[this.settings.font] || fontMap.jetbrains);

        // Sound settings
        sound.soundType = this.settings.sound;
        sound.volume = this.settings.soundVolume;
        sound.enabled = this.settings.soundEnabled;

        // Caret style
        this.elements.caret.className = `caret caret-${this.settings.caretStyle}`;

        // Live stats visibility
        this.elements.liveWpm.style.display = this.settings.showLiveWpm ? 'block' : 'none';
        this.elements.liveTimer.style.display = this.settings.showTimer ? 'flex' : 'none';

        // Update active buttons in config bar
        this.updateConfigBarUI();
    }

    updateConfigBarUI() {
        // Mode buttons
        document.querySelectorAll('[data-config-mode]').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.configMode === this.settings.mode);
        });

        // Mode specific sub-options
        const timeGroup = document.getElementById('time-options-group');
        const wordGroup = document.getElementById('word-options-group');
        const langGroup = document.getElementById('lang-options-group');

        if (timeGroup) timeGroup.style.display = this.settings.mode === 'time' ? 'flex' : 'none';
        if (wordGroup) wordGroup.style.display = this.settings.mode === 'words' ? 'flex' : 'none';

        // Time limits
        document.querySelectorAll('[data-config-time]').forEach(btn => {
            btn.classList.toggle('active', parseInt(btn.dataset.configTime, 10) === this.settings.timeLimit);
        });

        // Word counts
        document.querySelectorAll('[data-config-words]').forEach(btn => {
            btn.classList.toggle('active', parseInt(btn.dataset.configWords, 10) === this.settings.wordCount);
        });

        // Toggles
        const puncBtn = document.getElementById('toggle-punctuation');
        if (puncBtn) puncBtn.classList.toggle('active', this.settings.punctuation);

        const numBtn = document.getElementById('toggle-numbers');
        if (numBtn) numBtn.classList.toggle('active', this.settings.numbers);

        // Language
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
        // Focus management
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

        // Keystroke input
        this.elements.hiddenInput.addEventListener('input', (e) => this.handleInput(e));
        this.elements.hiddenInput.addEventListener('keydown', (e) => this.handleKeyDown(e));

        // Global shortcuts (Tab to restart, Esc to blur/restart)
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

            // Auto focus hidden input if key typed outside inputs
            if (!this.isModalOpen() && e.target !== this.elements.hiddenInput && !e.ctrlKey && !e.metaKey && e.key.length === 1) {
                this.focusInput();
            }
        });

        // Restart buttons
        this.elements.restartBtn.addEventListener('click', () => this.resetTest());
        this.elements.resultRestartBtn.addEventListener('click', () => this.resetTest());

        // Config bar buttons
        this.bindConfigBarEvents();

        // Modals
        this.bindModalEvents();

        // Share button
        if (this.elements.shareBtn) {
            this.elements.shareBtn.addEventListener('click', () => this.shareResults());
        }

        // Window resize reposition caret
        window.addEventListener('resize', () => {
            this.updateCaretPosition();
            this.handleLineScroll();
        });
    }

    bindConfigBarEvents() {
        // Mode switch
        document.querySelectorAll('[data-config-mode]').forEach(btn => {
            btn.addEventListener('click', () => {
                this.settings.mode = btn.dataset.configMode;
                StorageManager.saveSettings(this.settings);
                this.applySettingsToDOM();
                this.updatePBDisplay();
                this.resetTest();
            });
        });

        // Time limits
        document.querySelectorAll('[data-config-time]').forEach(btn => {
            btn.addEventListener('click', () => {
                this.settings.timeLimit = parseInt(btn.dataset.configTime, 10);
                StorageManager.saveSettings(this.settings);
                this.applySettingsToDOM();
                this.updatePBDisplay();
                this.resetTest();
            });
        });

        // Word counts
        document.querySelectorAll('[data-config-words]').forEach(btn => {
            btn.addEventListener('click', () => {
                this.settings.wordCount = parseInt(btn.dataset.configWords, 10);
                StorageManager.saveSettings(this.settings);
                this.applySettingsToDOM();
                this.updatePBDisplay();
                this.resetTest();
            });
        });

        // Punctuation toggle
        const puncBtn = document.getElementById('toggle-punctuation');
        if (puncBtn) {
            puncBtn.addEventListener('click', () => {
                this.settings.punctuation = !this.settings.punctuation;
                StorageManager.saveSettings(this.settings);
                this.applySettingsToDOM();
                this.resetTest();
            });
        }

        // Numbers toggle
        const numBtn = document.getElementById('toggle-numbers');
        if (numBtn) {
            numBtn.addEventListener('click', () => {
                this.settings.numbers = !this.settings.numbers;
                StorageManager.saveSettings(this.settings);
                this.applySettingsToDOM();
                this.resetTest();
            });
        }

        // Language toggle
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
        // Settings modal
        this.elements.settingsBtn.addEventListener('click', () => this.openModal(this.elements.settingsModal));
        // History modal
        this.elements.historyBtn.addEventListener('click', () => {
            this.renderHistoryTable();
            this.openModal(this.elements.historyModal);
        });

        // Close buttons
        document.querySelectorAll('.modal-close-btn, .modal-backdrop').forEach(el => {
            el.addEventListener('click', (e) => {
                if (e.target === el) {
                    this.closeAllModals();
                    this.focusInput();
                }
            });
        });

        // Theme grid selector in Settings modal
        document.querySelectorAll('.theme-card').forEach(card => {
            card.addEventListener('click', () => {
                const themeName = card.dataset.theme;
                this.setTheme(themeName);
                document.querySelectorAll('.theme-card').forEach(c => c.classList.remove('active'));
                card.classList.add('active');
            });
        });

        // Quick theme button in header (cycle through themes)
        if (this.elements.themeQuickBtn) {
            const themes = ['sakura', 'matcha', 'lavender', 'peach', 'lemon', 'midnight'];
            this.elements.themeQuickBtn.addEventListener('click', () => {
                const currentIdx = themes.indexOf(this.settings.theme);
                const nextTheme = themes[(currentIdx + 1) % themes.length];
                this.setTheme(nextTheme);
                this.showToast(`Tema diubah: ${this.getThemeDisplayName(nextTheme)}`);
            });
        }

        // Font selector
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

        // Sound type selector
        const soundSelect = document.getElementById('setting-sound');
        if (soundSelect) {
            soundSelect.value = this.settings.sound;
            soundSelect.addEventListener('change', (e) => {
                this.settings.sound = e.target.value;
                sound.soundType = e.target.value;
                StorageManager.saveSettings(this.settings);
                sound.playKey(); // preview
            });
        }

        // Sound volume slider
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

        // Caret style selector
        const caretSelect = document.getElementById('setting-caret');
        if (caretSelect) {
            caretSelect.value = this.settings.caretStyle;
            caretSelect.addEventListener('change', (e) => {
                this.settings.caretStyle = e.target.value;
                StorageManager.saveSettings(this.settings);
                this.applySettingsToDOM();
            });
        }

        // Toggle Live WPM
        const toggleLiveWpm = document.getElementById('setting-live-wpm');
        if (toggleLiveWpm) {
            toggleLiveWpm.checked = this.settings.showLiveWpm;
            toggleLiveWpm.addEventListener('change', (e) => {
                this.settings.showLiveWpm = e.target.checked;
                StorageManager.saveSettings(this.settings);
                this.applySettingsToDOM();
            });
        }

        // Toggle Sound Enabled
        const toggleSound = document.getElementById('setting-sound-enabled');
        if (toggleSound) {
            toggleSound.checked = this.settings.soundEnabled;
            toggleSound.addEventListener('change', (e) => {
                this.settings.soundEnabled = e.target.checked;
                sound.enabled = e.target.checked;
                StorageManager.saveSettings(this.settings);
            });
        }

        // Clear history button
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

    // GENERATE WORDS LIST
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
            // Pick quote
            const matchingQuotes = QUOTES.filter(q => q.lang === (this.settings.language === 'id' ? 'id' : 'en'));
            const pool = matchingQuotes.length > 0 ? matchingQuotes : QUOTES;
            const quote = pool[Math.floor(Math.random() * pool.length)];
            return quote.text.split(' ');
        }

        // Determine count
        let count = 50;
        if (this.settings.mode === 'words') {
            count = this.settings.wordCount;
        } else if (this.settings.mode === 'time') {
            // Generous count to prevent running out of words
            count = Math.max(100, Math.ceil(this.settings.timeLimit * 3.5));
        } else if (this.settings.mode === 'zen') {
            count = 200;
        }

        const punctuationMarks = ['.', ',', '!', '?', ';', ':', '-'];
        const words = [];

        for (let i = 0; i < count; i++) {
            let w = baseList[Math.floor(Math.random() * baseList.length)];

            // Insert numbers
            if (this.settings.numbers && Math.random() < 0.15) {
                w = Math.floor(Math.random() * 100).toString();
            }

            // Insert punctuation
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

    // RENDER WORDS IN HTML
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

        // Reset caret position after DOM renders
        requestAnimationFrame(() => {
            this.updateCaretPosition();
        });
    }

    // RESET TEST
    resetTest() {
        clearInterval(this.timerInterval);
        this.timerInterval = null;
        this.testActive = false;
        this.testFinished = false;
        this.startTime = null;
        this.elapsedSeconds = 0;
        this.currentWordIdx = 0;
        this.currentCharIdx = 0;

        // Reset stats
        this.keystrokeHistory = [];
        this.keyIntervals = [];
        this.lastKeyTime = null;
        this.correctChars = 0;
        this.incorrectChars = 0;
        this.extraChars = 0;
        this.missedChars = 0;
        this.secondErrors = 0;

        // Reset input
        this.elements.hiddenInput.value = '';

        // Reset UI
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

        // Generate & render words
        this.words = this.generateWords();
        this.renderWords();
        this.focusInput();
    }

    // START TEST
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

        // Calculate live WPM & Raw WPM
        const minutes = this.elapsedSeconds / 60;
        const currentWpm = minutes > 0 ? Math.round((this.correctChars / 5) / minutes) : 0;
        const rawWpm = minutes > 0 ? Math.round(((this.correctChars + this.incorrectChars + this.extraChars) / 5) / minutes) : 0;

        // Record for graph
        this.keystrokeHistory.push({
            second: this.elapsedSeconds,
            wpm: currentWpm,
            raw: rawWpm,
            errors: this.secondErrors
        });
        this.secondErrors = 0;

        // Update live WPM pill
        this.elements.liveWpmVal.textContent = currentWpm;

        // Mode specific timer update
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

    // HANDLE KEYDOWN
    handleKeyDown(e) {
        if (this.testFinished) return;

        // Backspace handling
        if (e.key === 'Backspace') {
            e.preventDefault();
            this.handleBackspace(e.ctrlKey || e.metaKey);
            return;
        }

        // Space handling
        if (e.key === ' ') {
            e.preventDefault();
            this.handleSpace();
            return;
        }
    }

    // HANDLE INPUT (Characters typed)
    handleInput(e) {
        if (this.testFinished) return;

        const val = this.elements.hiddenInput.value;
        if (!val) return;

        // Take typed character and reset input
        const char = val[val.length - 1];
        this.elements.hiddenInput.value = '';

        if (!this.testActive) {
            this.startTest();
        }

        // Measure keystroke intervals for consistency
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
            // Typing target letter
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
            // Typing extra letters beyond word length
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
            // Remove all typed characters in current word
            while (this.currentCharIdx > 0) {
                this.deleteSingleChar(wordEl);
            }
        } else {
            if (this.currentCharIdx > 0) {
                this.deleteSingleChar(wordEl);
            } else if (this.currentWordIdx > 0) {
                // Optionally jump back to previous word if it had errors
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
        const currentWordText = this.words[this.currentWordIdx];
        const extras = wordEl.querySelectorAll('.letter.extra');

        if (extras.length > 0) {
            // Remove extra letter first
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

        // If user hasn't typed anything in the current word, ignore multiple spaces
        if (this.currentCharIdx === 0) return;

        const currentWordText = this.words[this.currentWordIdx];
        const wordEl = this.elements.wordsWrapper.children[this.currentWordIdx];

        // Any untyped characters in the word are counted as missed
        if (this.currentCharIdx < currentWordText.length) {
            for (let i = this.currentCharIdx; i < currentWordText.length; i++) {
                this.missedChars++;
            }
        }

        // Check if word has any errors
        const hasErrors = wordEl.querySelector('.incorrect, .extra') !== null || this.currentCharIdx < currentWordText.length;
        if (hasErrors) {
            wordEl.classList.add('error-word');
        }

        // Advance to next word
        this.currentWordIdx++;
        this.currentCharIdx = 0;
        sound.playKey();

        // Check mode completion
        if (this.settings.mode === 'words' && this.currentWordIdx >= this.settings.wordCount) {
            this.finishTest();
            return;
        }

        if (this.currentWordIdx >= this.words.length) {
            this.finishTest();
            return;
        }

        // Update progress for word mode
        if (this.settings.mode === 'words') {
            this.elements.liveTimer.innerHTML = `${this.currentWordIdx}<span class="timer-unit">/${this.settings.wordCount}</span>`;
        }

        this.updateCaretPosition();
        this.handleLineScroll();
    }

    // UPDATE CARET POSITION
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
            // Caret at end of word
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

    // LINE SCROLLING (Keep current word on the middle/top lines)
    handleLineScroll() {
        const wordEl = this.elements.wordsWrapper.children[this.currentWordIdx];
        if (!wordEl) return;

        const containerTop = this.elements.wordsContainer.offsetTop;
        const wordTop = wordEl.offsetTop;

        // When moving beyond line 1, shift wrapper up
        const lineHeight = 43.2; // approx 2.7rem
        if (wordTop > lineHeight * 1.5) {
            const linesToShift = Math.floor(wordTop / lineHeight) - 1;
            this.elements.wordsWrapper.style.transform = `translateY(-${linesToShift * lineHeight}px)`;
        } else {
            this.elements.wordsWrapper.style.transform = 'translateY(0px)';
        }
    }

    // CALCULATE CONSISTENCY
    calculateConsistency() {
        if (this.keyIntervals.length < 5) return 100;
        const avg = this.keyIntervals.reduce((a, b) => a + b, 0) / this.keyIntervals.length;
        const variance = this.keyIntervals.reduce((a, b) => a + Math.pow(b - avg, 2), 0) / this.keyIntervals.length;
        const stdDev = Math.sqrt(variance);

        // Coefficient of variation formula for typing consistency
        const coefVar = (stdDev / avg) * 100;
        const consistency = Math.max(0, Math.min(100, Math.round(100 - coefVar * 0.7)));
        return isNaN(consistency) ? 85 : consistency;
    }

    // FINISH TEST & SHOW RESULTS
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

        // Record last tick if needed
        if (this.keystrokeHistory.length === 0 || this.keystrokeHistory[this.keystrokeHistory.length - 1].second !== totalTime) {
            this.keystrokeHistory.push({
                second: totalTime,
                wpm: finalWpm,
                raw: finalRawWpm,
                errors: this.secondErrors
            });
        }

        // Save result
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

        // Display results UI
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

        // Render chart
        setTimeout(() => {
            this.chart.render(this.keystrokeHistory);
        }, 80);

        this.updatePBDisplay();
    }

    // RENDER HISTORY TABLE
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

    // SHARE RESULTS
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

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    window.pastelType = new PastelTypeApp();
});
