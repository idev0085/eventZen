export interface AudioFile {
  id: string;
  name: string;
  uri: string;
  duration: number;
  size: number;
  format: 'mp3' | 'wav' | 'm4a' | 'flac' | 'm4r';
  createdAt: string;
  favorite: boolean;
  tags?: string[];
  metadata?: AudioMetadata;
}

export interface AudioMetadata {
  bitrate: number;
  sampleRate: number;
  channels: number;
  codec: string;
  title?: string;
  artist?: string;
  album?: string;
}

export interface AudioEffect {
  id: string;
  name: string;
  type: 'volume' | 'speed' | 'pitch' | 'bass' | 'treble' | 'echo' | 'reverb' | 'compressor' | 'limiter' | 'gate';
  value: number;
  unit: string;
  min: number;
  max: number;
  enabled: boolean;
}

export interface AudioProject {
  id: string;
  name: string;
  sourceFile: AudioFile;
  effects: AudioEffect[];
  startTime: number;
  endTime: number;
  outputFormat: 'mp3' | 'wav' | 'm4r';
  createdAt: string;
  modifiedAt: string;
}

export interface ExportOptions {
  format: 'mp3' | 'wav' | 'm4r';
  quality: 'low' | 'medium' | 'high';
  fileName: string;
  bitrate?: number;
  sampleRate?: number;
}

export interface User {
  id: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  provider: 'email' | 'google' | 'apple' | 'guest';
  createdAt: string;
  subscription?: 'free' | 'premium';
}

export interface AppSettings {
  theme: 'light' | 'dark' | 'system';
  language: string;
  audioQuality: 'low' | 'medium' | 'high';
  notifications: boolean;
  autoSave: boolean;
  defaultExportFormat: 'mp3' | 'wav' | 'm4r';
}

export interface NavigationProps {
  navigation: any;
  route: any;
}

export interface WaveformData {
  peaks: number[];
  duration: number;
  sampleRate: number;
}

export interface RecordingState {
  isRecording: boolean;
  duration: number;
  hasPermission: boolean;
  recordingPath?: string;
}

export interface PlaybackState {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  isLoaded: boolean;
  volume: number;
}