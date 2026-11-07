// LocalStorage and Settings Manager for PastelType

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
    quickRestart: 'tab', // 'tab', 'esc', 'both'
    language: 'id', // 'id', 'en', 'code'
    mode: 'time', // 'time', 'words', 'quote', 'zen'
    timeLimit: 30, // 15, 30, 60, 120
    wordCount: 25, // 10, 25, 50, 100
    punctuation: false,
    numbers: false,
    blindMode: false
};

export class StorageManager {
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

            // Keep maximum 50 most recent records
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
