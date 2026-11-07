// SVG Chart generator for typing performance curve

export class TypingChart {
    constructor(container) {
        this.container = container;
    }

    render(historyData, errorMap = {}) {
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

        // Extract values
        const maxTime = historyData[historyData.length - 1].second || historyData.length;
        const minTime = historyData[0].second || 1;

        let maxWpm = Math.max(
            ...historyData.map(d => Math.max(d.wpm || 0, d.raw || 0)),
            20
        );
        // Round maxWpm up to neat multiple of 10 or 20
        maxWpm = Math.ceil(maxWpm / 20) * 20;

        const xScale = (t) => padding.left + ((t - minTime) / (maxTime - minTime || 1)) * innerWidth;
        const yScale = (v) => padding.top + innerHeight - (v / maxWpm) * innerHeight;

        // Generate smooth SVG paths using Catmull-Rom or cubic bezier
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

        // Grid lines (Horizontal WPM steps)
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

        // Time labels (X steps)
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
                        <circle cx="${x}" cy="${y}" r="4.5" fill="var(--error-color)" stroke="var(--card-bg)" stroke-width="2"/>
                        <title>${d.errors} kesalahan pada detik ke-${d.second}</title>
                    </g>
                `;
            }
        });

        // Unique ID for gradient
        const gradId = `chart-area-grad-${Math.floor(Math.random() * 10000)}`;

        const svgHtml = `
            <svg viewBox="0 0 ${width} ${height}" class="typing-chart-svg" preserveAspectRatio="none">
                <defs>
                    <linearGradient id="${gradId}" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stop-color="var(--accent-primary)" stop-opacity="0.28" />
                        <stop offset="100%" stop-color="var(--accent-primary)" stop-opacity="0.0" />
                    </linearGradient>
                </defs>

                <!-- Grid -->
                ${gridLines}
                ${xLabels}

                <!-- Area fill -->
                <path d="${wpmAreaStr}" fill="url(#${gradId})" />

                <!-- Raw WPM (Dashed line) -->
                <path d="${rawPathStr}" fill="none" stroke="var(--accent-secondary)" stroke-width="2" stroke-dasharray="4,3" opacity="0.6" />

                <!-- Net WPM (Smooth solid line) -->
                <path d="${wpmPathStr}" fill="none" stroke="var(--accent-primary)" stroke-width="3" stroke-linecap="round" />

                <!-- Error Points -->
                ${errorMarkers}

                <!-- Legend -->
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
