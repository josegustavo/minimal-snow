export interface SnowOptions {
    /** Number of particles (Default: 2000) */
    count?: number;
    /** Color for dark backgrounds (Default: "white") */
    colorDark?: string;
    /** Color for light backgrounds (Default: "lightblue") */
    colorLight?: string;
    /** Z-Index of the canvas (Default: 9999) */
    zIndex?: number;
}

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    freqx: number;
    freqy: number;
    size: number;
    phasex: number;
    phasey: number;
}

export class SnowEngine {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private particles: Particle[] = [];
    private lastTime: number = 0;
    private isRunning: boolean = false;
    private opacity: number = 0;
    private targetOpacity: number = 0;
    private animationFrameId: number | null = null;
    private resizeObserver: ResizeObserver;
    private options: Required<SnowOptions>;

    constructor(container: HTMLElement = document.body, options: SnowOptions = {}) {
        this.options = {
            count: 2000,
            colorDark: "white",
            colorLight: "#add8e6", // lightblue
            zIndex: 9999,
            ...options
        };

        this.canvas = document.createElement("canvas");
        this.ctx = this.canvas.getContext("2d")!;

        // Apply basic styles
        this.canvas.style.position = "fixed";
        this.canvas.style.top = "0";
        this.canvas.style.left = "0";
        this.canvas.style.width = "100%";
        this.canvas.style.height = "100%";
        this.canvas.style.pointerEvents = "none";
        this.canvas.style.zIndex = this.options.zIndex.toString();

        container.appendChild(this.canvas);

        this.initParticles();

        this.resizeObserver = new ResizeObserver(() => this.resize());
        this.resizeObserver.observe(container);
        this.resize();
    }

    private initParticles() {
        this.particles = [];
        for (let i = 0; i < this.options.count; i++) {
            this.particles.push({
                x: Math.random(),
                y: Math.random(),
                vx: Math.random() - 0.5,
                vy: (1 + Math.random() * 10) / 10,
                freqx: 1 + Math.random() * 5,
                freqy: 1 + Math.random() * 5,
                size: 0.1 + Math.random() * 1.4,
                phasex: Math.random() * 2 * Math.PI,
                phasey: Math.random() * 2 * Math.PI,
            });
        }
    }

    public updateOptions(newOptions: Partial<SnowOptions>) {
        this.options = { ...this.options, ...newOptions };
        if (newOptions.count) this.initParticles();
    }

    private resize() {
        this.canvas.width = window.innerWidth * window.devicePixelRatio;
        this.canvas.height = window.innerHeight * window.devicePixelRatio;
        if (this.isRunning && this.opacity > 0) {
            this.draw(performance.now());
        }
    }

    public start() {
        this.targetOpacity = 1;
        if (!this.isRunning) {
            this.isRunning = true;
            this.lastTime = performance.now();
            this.loop();
        }
    }

    public stop() {
        this.targetOpacity = 0;
    }

    public toggle() {
        if (this.targetOpacity === 0) this.start();
        else this.stop();
    }

    public destroy() {
        this.stop();
        this.resizeObserver.disconnect();
        this.canvas.remove();
        if (this.animationFrameId) cancelAnimationFrame(this.animationFrameId);
    }

    private loop() {
        if (!this.isRunning) return;

        // Stop logic to save CPU when fully transparent
        if (Math.abs(this.opacity) < 1e-6 && this.targetOpacity === 0) {
            this.isRunning = false;
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            return;
        }

        this.draw(performance.now());
        this.animationFrameId = requestAnimationFrame(() => this.loop());
    }

    private draw(now: number) {
        // Smooth opacity transition
        this.opacity += (this.targetOpacity - this.opacity) * 0.05;

        const width = this.canvas.width;
        const height = this.canvas.height;
        const delta = (now - this.lastTime) / 16;

        this.ctx.globalAlpha = this.opacity;
        this.ctx.clearRect(0, 0, width, height);

        // Auto theme detection
        const isDarkMode =
            document.body.classList.contains("dark-mode") ||
            (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);

        this.ctx.fillStyle = isDarkMode ? this.options.colorDark : this.options.colorLight;

        for (const p of this.particles) {
            const x = p.x * width;
            const y = p.y * height;

            const k = (2 * p.vx) / p.size / width;
            const l = (2 * p.vy) / p.size / height;

            this.ctx.beginPath();

            // The specific sine wave math for the "floating" effect
            const oscX = (width / 200) * Math.sin(p.freqx * now * l + p.phasex);
            const oscY = (height / 200) * Math.sin(p.freqy * now * k + p.phasey);

            this.ctx.arc(
                x + oscX,
                y + oscY,
                p.size * window.devicePixelRatio,
                0,
                2 * Math.PI
            );
            this.ctx.fill();

            p.x += k * delta;
            p.y += l * delta;

            // Wrap around screen
            p.x %= 1;
            p.y %= 1;
            if (p.x < 0) p.x += 1;
            if (p.y < 0) p.y += 1;
        }

        this.lastTime = now;
    }
}