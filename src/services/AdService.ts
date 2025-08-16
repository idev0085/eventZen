import mobileAds, { 
  InterstitialAd, 
  RewardedAd, 
  BannerAd, 
  TestIds,
  AdEventType,
  RewardedAdEventType 
} from 'react-native-google-mobile-ads';

export class AdService {
  private static interstitialAd: InterstitialAd | null = null;
  private static rewardedAd: RewardedAd | null = null;
  private static isInitialized = false;

  static async initialize() {
    try {
      await mobileAds().initialize();
      this.isInitialized = true;
      
      // Load ads
      this.loadInterstitialAd();
      this.loadRewardedAd();
    } catch (error) {
      console.log('Ad initialization error:', error);
    }
  }

  static loadInterstitialAd() {
    try {
      this.interstitialAd = InterstitialAd.createForAdRequest(TestIds.INTERSTITIAL, {
        requestNonPersonalizedAdsOnly: true,
      });

      this.interstitialAd.addAdEventListener(AdEventType.LOADED, () => {
        console.log('Interstitial ad loaded');
      });

      this.interstitialAd.addAdEventListener(AdEventType.ERROR, (error) => {
        console.log('Interstitial ad error:', error);
      });

      this.interstitialAd.load();
    } catch (error) {
      console.log('Load interstitial ad error:', error);
    }
  }

  static loadRewardedAd() {
    try {
      this.rewardedAd = RewardedAd.createForAdRequest(TestIds.REWARDED, {
        requestNonPersonalizedAdsOnly: true,
      });

      this.rewardedAd.addAdEventListener(RewardedAdEventType.LOADED, () => {
        console.log('Rewarded ad loaded');
      });

      this.rewardedAd.addAdEventListener(RewardedAdEventType.ERROR, (error) => {
        console.log('Rewarded ad error:', error);
      });

      this.rewardedAd.load();
    } catch (error) {
      console.log('Load rewarded ad error:', error);
    }
  }

  static async showInterstitialAd(): Promise<boolean> {
    try {
      if (!this.isInitialized || !this.interstitialAd) {
        return false;
      }

      const loaded = this.interstitialAd.loaded;
      if (loaded) {
        await this.interstitialAd.show();
        // Reload for next time
        this.loadInterstitialAd();
        return true;
      }
      
      return false;
    } catch (error) {
      console.log('Show interstitial ad error:', error);
      return false;
    }
  }

  static async showRewardedAd(): Promise<{ watched: boolean; rewarded: boolean }> {
    try {
      if (!this.isInitialized || !this.rewardedAd) {
        return { watched: false, rewarded: false };
      }

      const loaded = this.rewardedAd.loaded;
      if (loaded) {
        return new Promise((resolve) => {
          let rewarded = false;

          this.rewardedAd!.addAdEventListener(RewardedAdEventType.EARNED_REWARD, (reward) => {
            console.log('User earned reward:', reward);
            rewarded = true;
          });

          this.rewardedAd!.addAdEventListener(AdEventType.CLOSED, () => {
            resolve({ watched: true, rewarded });
            // Reload for next time
            this.loadRewardedAd();
          });

          this.rewardedAd!.show();
        });
      }
      
      return { watched: false, rewarded: false };
    } catch (error) {
      console.log('Show rewarded ad error:', error);
      return { watched: false, rewarded: false };
    }
  }

  static createBannerAd(adUnitId?: string) {
    return (
      <BannerAd
        unitId={adUnitId || TestIds.BANNER}
        size="banner"
        requestOptions={{
          requestNonPersonalizedAdsOnly: true,
        }}
      />
    );
  }

  static async showAdBeforeExport(): Promise<boolean> {
    // Show interstitial ad before export
    return await this.showInterstitialAd();
  }

  static async showRewardedAdForPremiumFeature(): Promise<boolean> {
    // Show rewarded ad to unlock premium features
    const result = await this.showRewardedAd();
    return result.rewarded;
  }
}