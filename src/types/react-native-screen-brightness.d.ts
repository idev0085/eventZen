declare module 'react-native-screen-brightness' {
  export default class ScreenBrightness {
    static setBrightness(brightness: number): Promise<void>;
    static getBrightness(): Promise<number>;
  }
}
