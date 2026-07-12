// src/lib/musicTheory.ts
// 🤖 AI 生成：音乐理论数据由 AI 根据标准音乐理论生成，人工核对校验

export interface NoteInfo {
  name: string;       // e.g. "C4"
  midi: number;       // e.g. 60
  freq: number;       // Hz
}

export interface ChordDef {
  name: string;
  symbol: string;
  intervals: number[];  // semitone offsets from root
  description: string;
}

export interface ScaleDef {
  name: string;
  intervals: number[];
  description: string;
}

export interface QuizItem {
  question: string;
  options: string[];
  answer: number;     // index of correct option
}

const NOTE_NAMES = ["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"];

// 🔧 AI 优化：AI 建议使用缓存减少重复计算
const freqCache = new Map<number, number>();

export function midiToFreq(midi: number): number {
  if (freqCache.has(midi)) return freqCache.get(midi)!;
  const freq = 440 * Math.pow(2, (midi - 69) / 12);
  freqCache.set(midi, freq);
  return freq;
}

export function midiToNoteName(midi: number): string {
  const octave = Math.floor(midi / 12) - 1;
  return NOTE_NAMES[midi % 12] + octave;
}

// 👨‍💻🤖 结对：人工定义音阶范围，AI 生成所有音符列表
export function generateNotes(startMidi: number, endMidi: number): NoteInfo[] {
  const notes: NoteInfo[] = [];
  for (let m = startMidi; m <= endMidi; m++) {
    notes.push({ name: midiToNoteName(m), midi: m, freq: midiToFreq(m) });
  }
  return notes;
}

// 👨‍💻🤖 结对：人工列出常见和弦，AI 实现结构化数据
export const CHORDS: ChordDef[] = [
  { name:"大三和弦", symbol:"Maj", intervals:[0,4,7], description:"明亮、稳定、愉悦" },
  { name:"小三和弦", symbol:"min", intervals:[0,3,7], description:"柔和、忧伤、温暖" },
  { name:"属七和弦", symbol:"7", intervals:[0,4,7,10], description:"紧张、需要解决" },
  { name:"大七和弦", symbol:"Maj7", intervals:[0,4,7,11], description:"梦幻、爵士感" },
  { name:"小七和弦", symbol:"min7", intervals:[0,3,7,10], description:"柔和爵士" },
  { name:"减三和弦", symbol:"dim", intervals:[0,3,6], description:"紧张、不安" },
  { name:"增三和弦", symbol:"aug", intervals:[0,4,8], description:"悬疑、梦幻" },
  { name:"挂留四和弦", symbol:"sus4", intervals:[0,5,7], description:"空灵、未解决" },
];

export const SCALES: ScaleDef[] = [
  { name:"大调音阶", intervals:[0,2,4,5,7,9,11], description:"明亮的常用音阶" },
  { name:"自然小调", intervals:[0,2,3,5,7,8,10], description:"忧伤的常用音阶" },
  { name:"和声小调", intervals:[0,2,3,5,7,8,11], description:"带有异域色彩的小调" },
  { name:"旋律小调", intervals:[0,2,3,5,7,9,11], description:"上行古典小调" },
  { name:"五声音阶（大调）", intervals:[0,2,4,7,9], description:"中国传统音乐" },
  { name:"五声音阶（小调）", intervals:[0,3,5,7,10], description:"蓝调、民谣" },
  { name:"布鲁斯音阶", intervals:[0,3,5,6,7,10], description:"爵士、蓝调核心音阶" },
  { name:"全音音阶", intervals:[0,2,4,6,8,10], description:"德彪西印象派" },
];

// ✍️ 人工：测验题目手写，确保音乐理论准确性
export function generateQuiz(): QuizItem {
  const items: QuizItem[] = [
    { question:"C大调音阶中第三个音是什么？", options:["E","D","F","G"], answer:0 },
    { question:"小三和弦的根音和五音之间是几度？", options:["纯五度","小三度","大三度","减五度"], answer:0 },
    { question:"A4 的频率是多少 Hz？", options:["440","220","880","330"], answer:0 },
    { question:"属七和弦包含几个音？", options:["3","4","5","6"], answer:1 },
    { question:"减三和弦的根音与三音是几度？", options:["大三度","小三度","减三度","纯四度"], answer:1 },
    { question:"C 大调的平行小调是什么？", options:["A小调","D小调","E小调","G小调"], answer:0 },
    { question:"全音音阶中相邻音之间是几度？", options:["半音","全音","小三度","大三度"], answer:1 },
    { question:"挂留四和弦（sus4）包含哪几个音？", options:["1-4-5","1-3-5","1-4-6","2-5-1"], answer:0 },
  ];
  return items[Math.floor(Math.random() * items.length)];
}
