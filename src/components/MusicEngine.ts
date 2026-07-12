// src/components/MusicEngine.ts
// 🤖 AI 生成：Web Audio API 合成器由 AI 生成，人工调整了包络参数和音色

export class MusicEngine {
  private ctx: AudioContext | null = null;
  private gain: GainNode | null = null;
  private active: Map<number, { osc: OscillatorNode; gain: GainNode }> = new Map();

  private getContext(): AudioContext {
    if (!this.ctx) {
      this.ctx = new AudioContext();
      this.gain = this.ctx.createGain();
      this.gain.gain.value = 0.3;
      this.gain.connect(this.ctx.destination);
    }
    if (this.ctx.state === "suspended") this.ctx.resume();
    return this.ctx;
  }

  // ✍️ 人工：音符起音/释音逻辑手写
  playNote(freq: number, duration?: number) {
    const ctx = this.getContext();
    const osc = ctx.createOscillator();
    const noteGain = ctx.createGain();
    const now = ctx.currentTime;

    osc.type = "sine";
    osc.frequency.value = freq;

    noteGain.gain.setValueAtTime(0, now);
    noteGain.gain.linearRampToValueAtTime(0.25, now + 0.02);   // attack
    noteGain.gain.linearRampToValueAtTime(0.15, now + 0.1);    // decay
    noteGain.gain.setValueAtTime(0.15, now + (duration || 0.5) - 0.05);
    noteGain.gain.linearRampToValueAtTime(0, now + (duration || 0.5)); // release

    osc.connect(noteGain);
    noteGain.connect(this.gain || ctx.destination);
    osc.start(now);
    osc.stop(now + (duration || 0.5));
  }

  playChord(freqs: number[], duration: number = 1.0) {
    freqs.forEach(f => this.playNote(f, duration));
  }

  // 👨‍💻🤖 结对：人工设计琶音效果，AI 实现延迟序列
  playArpeggio(freqs: number[], interval: number = 0.12) {
    freqs.forEach((f, i) => {
      setTimeout(() => this.playNote(f, 0.3), i * interval * 1000);
    });
  }

  playScale(freqs: number[], interval: number = 0.15) {
    freqs.forEach((f, i) => {
      setTimeout(() => this.playNote(f, 0.25), i * interval * 1000);
    });
  }

  // 🔧 AI 优化：AI 建议增加 dispose 方法防止内存泄漏
  dispose() {
    if (this.ctx) {
      this.ctx.close();
      this.ctx = null;
    }
    this.active.clear();
  }
}

// 🔧 AI 优化：AI 建议使用单例模式避免多个 AudioContext 冲突
let engineInstance: MusicEngine | null = null;
export function getMusicEngine(): MusicEngine {
  if (!engineInstance) engineInstance = new MusicEngine();
  return engineInstance;
}
