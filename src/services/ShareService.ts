import Share from 'react-native-share';
import RNFS from 'react-native-fs';

export class ShareService {
  static async shareFile(filePath: string, title?: string) {
    try {
      const fileExists = await RNFS.exists(filePath);
      if (!fileExists) {
        throw new Error('File does not exist');
      }

      const shareOptions = {
        title: title || 'Share Ringtone',
        message: 'Check out this awesome ringtone I created!',
        url: `file://${filePath}`,
        type: 'audio/*',
      };

      await Share.open(shareOptions);
    } catch (error) {
      if (error.message !== 'User did not share') {
        throw new Error('Failed to share file');
      }
    }
  }

  static async shareToWhatsApp(filePath: string) {
    try {
      const shareOptions = {
        title: 'Share to WhatsApp',
        message: 'Check out this ringtone!',
        url: `file://${filePath}`,
        social: Share.Social.WHATSAPP,
      };

      await Share.shareSingle(shareOptions);
    } catch (error) {
      throw new Error('Failed to share to WhatsApp');
    }
  }

  static async shareToEmail(filePath: string, subject?: string, body?: string) {
    try {
      const shareOptions = {
        title: 'Share via Email',
        subject: subject || 'Custom Ringtone',
        message: body || 'I created this ringtone using Ringtone Studio!',
        url: `file://${filePath}`,
        social: Share.Social.EMAIL,
      };

      await Share.shareSingle(shareOptions);
    } catch (error) {
      throw new Error('Failed to share via email');
    }
  }

  static async shareViaBluetooth(filePath: string) {
    try {
      // Note: Bluetooth sharing is limited on iOS
      const shareOptions = {
        title: 'Share via Bluetooth',
        url: `file://${filePath}`,
        type: 'audio/*',
      };

      await Share.open(shareOptions);
    } catch (error) {
      throw new Error('Failed to share via Bluetooth');
    }
  }

  static async saveToGallery(filePath: string) {
    try {
      // This would save the audio file to the device's music library
      // Implementation depends on platform-specific APIs
      console.log('Saving to gallery:', filePath);
    } catch (error) {
      throw new Error('Failed to save to gallery');
    }
  }

  static async shareToSocialMedia(platform: string, filePath: string) {
    try {
      let social;
      
      switch (platform) {
        case 'facebook':
          social = Share.Social.FACEBOOK;
          break;
        case 'twitter':
          social = Share.Social.TWITTER;
          break;
        case 'instagram':
          social = Share.Social.INSTAGRAM;
          break;
        default:
          throw new Error('Unsupported platform');
      }

      const shareOptions = {
        title: 'Share Ringtone',
        message: 'Check out this ringtone I created!',
        url: `file://${filePath}`,
        social,
      };

      await Share.shareSingle(shareOptions);
    } catch (error) {
      throw new Error(`Failed to share to ${platform}`);
    }
  }
}