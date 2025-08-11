import RNFS from 'react-native-fs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AudioService } from './AudioService';

interface AudioFile {
  id: string;
  name: string;
  uri: string;
  duration: number;
  size: number;
  format: string;
  favorite: boolean;
  createdAt: string;
  metadata?: any;
}

export class FileService {
  private static readonly STORAGE_KEY = 'audio_files';
  private static readonly FAVORITES_KEY = 'favorite_files';

  static async importFile(file: any) {
    try {
      const destinationPath = `${RNFS.DocumentDirectoryPath}/${file.name}`;
      await RNFS.copyFile(file.uri, destinationPath);
      
      const fileInfo = await RNFS.stat(destinationPath);
      const audioFile: AudioFile = {
        id: Date.now().toString(),
        name: file.name,
        uri: destinationPath,
        duration: 0, // Would be extracted using FFmpeg
        size: fileInfo.size,
        format: file.name.split('.').pop() || 'unknown',
        favorite: false,
        createdAt: new Date().toISOString(),
      };

      await this.saveFileMetadata(audioFile);
      return audioFile;
    } catch (error) {
      throw new Error('Failed to import file');
    }
  }

  static async extractAudioFromVideo(videoFile: any) {
    try {
      const outputPath = `${RNFS.DocumentDirectoryPath}/${videoFile.name.replace(/\.[^/.]+$/, '')}.mp3`;
      
      await AudioService.extractAudioFromVideo(videoFile.uri, outputPath);
      
      const fileInfo = await RNFS.stat(outputPath);
      const audioFile: AudioFile = {
        id: Date.now().toString(),
        name: `${videoFile.name.replace(/\.[^/.]+$/, '')}.mp3`,
        uri: outputPath,
        duration: 0, // Would be extracted using FFmpeg
        size: fileInfo.size,
        format: 'mp3',
        favorite: false,
        createdAt: new Date().toISOString(),
      };

      await this.saveFileMetadata(audioFile);
      return audioFile;
    } catch (error) {
      throw new Error('Failed to extract audio from video');
    }
  }

  static async getAllFiles(): Promise<AudioFile[]> {
    try {
      const filesJson = await AsyncStorage.getItem(this.STORAGE_KEY);
      return filesJson ? JSON.parse(filesJson) : [];
    } catch (error) {
      return [];
    }
  }

  static async getRecentFiles(limit: number = 10): Promise<AudioFile[]> {
    try {
      const allFiles = await this.getAllFiles();
      return allFiles
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, limit);
    } catch (error) {
      return [];
    }
  }

  static async getFavoriteFiles(): Promise<AudioFile[]> {
    try {
      const allFiles = await this.getAllFiles();
      return allFiles.filter(file => file.favorite);
    } catch (error) {
      return [];
    }
  }

  static async saveFileMetadata(file: AudioFile) {
    try {
      const allFiles = await this.getAllFiles();
      const updatedFiles = [...allFiles, file];
      await AsyncStorage.setItem(this.STORAGE_KEY, JSON.stringify(updatedFiles));
    } catch (error) {
      throw new Error('Failed to save file metadata');
    }
  }

  static async updateFileMetadata(fileId: string, updates: Partial<AudioFile>) {
    try {
      const allFiles = await this.getAllFiles();
      const updatedFiles = allFiles.map(file =>
        file.id === fileId ? { ...file, ...updates } : file
      );
      await AsyncStorage.setItem(this.STORAGE_KEY, JSON.stringify(updatedFiles));
    } catch (error) {
      throw new Error('Failed to update file metadata');
    }
  }

  static async deleteFile(fileId: string) {
    try {
      const allFiles = await this.getAllFiles();
      const fileToDelete = allFiles.find(file => file.id === fileId);
      
      if (fileToDelete) {
        // Delete physical file
        if (await RNFS.exists(fileToDelete.uri)) {
          await RNFS.unlink(fileToDelete.uri);
        }
        
        // Remove from metadata
        const updatedFiles = allFiles.filter(file => file.id !== fileId);
        await AsyncStorage.setItem(this.STORAGE_KEY, JSON.stringify(updatedFiles));
      }
    } catch (error) {
      throw new Error('Failed to delete file');
    }
  }

  static async renameFile(fileId: string, newName: string) {
    try {
      const allFiles = await this.getAllFiles();
      const fileToRename = allFiles.find(file => file.id === fileId);
      
      if (fileToRename) {
        const fileExtension = fileToRename.format;
        const newFileName = `${newName}.${fileExtension}`;
        const newPath = `${RNFS.DocumentDirectoryPath}/${newFileName}`;
        
        // Rename physical file
        await RNFS.moveFile(fileToRename.uri, newPath);
        
        // Update metadata
        await this.updateFileMetadata(fileId, {
          name: newFileName,
          uri: newPath,
        });
      }
    } catch (error) {
      throw new Error('Failed to rename file');
    }
  }

  static async toggleFavorite(fileId: string | number) {
    try {
      const allFiles = await this.getAllFiles();
      const file = allFiles.find(f => f.id === fileId.toString());
      
      if (file) {
        await this.updateFileMetadata(file.id, { favorite: !file.favorite });
      }
    } catch (error) {
      throw new Error('Failed to toggle favorite');
    }
  }

  static async getFileMetadata(filePath: string) {
    try {
      // This would use FFmpeg to extract metadata
      // For now, return mock metadata
      return {
        duration: 30,
        bitrate: 320,
        sampleRate: 44100,
        channels: 2,
      };
    } catch (error) {
      throw new Error('Failed to get file metadata');
    }
  }

  static async searchFiles(query: string): Promise<AudioFile[]> {
    try {
      const allFiles = await this.getAllFiles();
      return allFiles.filter(file =>
        file.name.toLowerCase().includes(query.toLowerCase())
      );
    } catch (error) {
      return [];
    }
  }

  static async getStorageUsage() {
    try {
      const allFiles = await this.getAllFiles();
      const totalSize = allFiles.reduce((sum, file) => sum + file.size, 0);
      return {
        used: totalSize / (1024 * 1024 * 1024), // Convert to GB
        total: 5.0, // Mock total storage
      };
    } catch (error) {
      return { used: 0, total: 5.0 };
    }
  }
}