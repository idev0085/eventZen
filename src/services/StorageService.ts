import AsyncStorage from '@react-native-async-storage/async-storage';
import RNFS from 'react-native-fs';

export class StorageService {
  static async getStorageUsage() {
    try {
      const documentsPath = RNFS.DocumentDirectoryPath;
      const files = await RNFS.readDir(documentsPath);
      
      let totalSize = 0;
      for (const file of files) {
        if (file.isFile()) {
          totalSize += file.size;
        }
      }

      return {
        used: totalSize / (1024 * 1024 * 1024), // Convert to GB
        total: 5.0, // Mock total available storage
        files: files.length,
      };
    } catch (error) {
      return { used: 0, total: 5.0, files: 0 };
    }
  }

  static async clearCache() {
    try {
      const cachePath = `${RNFS.DocumentDirectoryPath}/cache`;
      const cacheExists = await RNFS.exists(cachePath);
      
      if (cacheExists) {
        await RNFS.unlink(cachePath);
        await RNFS.mkdir(cachePath);
      }
    } catch (error) {
      throw new Error('Failed to clear cache');
    }
  }

  static async cleanupTempFiles() {
    try {
      const tempPath = `${RNFS.DocumentDirectoryPath}/temp`;
      const tempExists = await RNFS.exists(tempPath);
      
      if (tempExists) {
        const tempFiles = await RNFS.readDir(tempPath);
        const now = Date.now();
        const oneHourAgo = now - (60 * 60 * 1000);
        
        for (const file of tempFiles) {
          if (new Date(file.mtime).getTime() < oneHourAgo) {
            await RNFS.unlink(file.path);
          }
        }
      }
    } catch (error) {
      console.log('Cleanup temp files error:', error);
    }
  }

  static async exportUserData() {
    try {
      const userData = {
        files: await AsyncStorage.getItem('audio_files'),
        favorites: await AsyncStorage.getItem('favorite_files'),
        settings: await AsyncStorage.getItem('user_settings'),
        projects: await AsyncStorage.getItem('audio_projects'),
      };

      const exportPath = `${RNFS.DocumentDirectoryPath}/user_data_export.json`;
      await RNFS.writeFile(exportPath, JSON.stringify(userData, null, 2));
      
      return exportPath;
    } catch (error) {
      throw new Error('Failed to export user data');
    }
  }

  static async importUserData(filePath: string) {
    try {
      const fileContent = await RNFS.readFile(filePath);
      const userData = JSON.parse(fileContent);
      
      if (userData.files) {
        await AsyncStorage.setItem('audio_files', userData.files);
      }
      if (userData.favorites) {
        await AsyncStorage.setItem('favorite_files', userData.favorites);
      }
      if (userData.settings) {
        await AsyncStorage.setItem('user_settings', userData.settings);
      }
      if (userData.projects) {
        await AsyncStorage.setItem('audio_projects', userData.projects);
      }
    } catch (error) {
      throw new Error('Failed to import user data');
    }
  }

  static async getDirectorySize(path: string): Promise<number> {
    try {
      const files = await RNFS.readDir(path);
      let totalSize = 0;
      
      for (const file of files) {
        if (file.isFile()) {
          totalSize += file.size;
        } else if (file.isDirectory()) {
          totalSize += await this.getDirectorySize(file.path);
        }
      }
      
      return totalSize;
    } catch (error) {
      return 0;
    }
  }
}