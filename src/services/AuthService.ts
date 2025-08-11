import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { appleAuth } from '@invertase/react-native-apple-authentication';
import AsyncStorage from '@react-native-async-storage/async-storage';

export class AuthService {
  static async initialize() {
    // Configure Google Sign-In
    GoogleSignin.configure({
      webClientId: 'YOUR_WEB_CLIENT_ID', // Replace with your actual web client ID
    });
  }

  static async signInWithEmail(email: string, password: string) {
    try {
      const userCredential = await auth().signInWithEmailAndPassword(email, password);
      return userCredential.user;
    } catch (error) {
      throw new Error('Failed to sign in with email');
    }
  }

  static async signUpWithEmail(email: string, password: string) {
    try {
      const userCredential = await auth().createUserWithEmailAndPassword(email, password);
      return userCredential.user;
    } catch (error) {
      throw new Error('Failed to create account');
    }
  }

  static async signInWithGoogle() {
    try {
      // Check if device supports Google Play
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      
      // Get the user's ID token
      const { idToken } = await GoogleSignin.signIn();
      
      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      
      // Sign-in the user with the credential
      const userCredential = await auth().signInWithCredential(googleCredential);
      return userCredential.user;
    } catch (error) {
      throw new Error('Failed to sign in with Google');
    }
  }

  static async signInWithApple() {
    try {
      // Start the sign-in request
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
      });

      // Ensure Apple returned a user identityToken
      if (!appleAuthRequestResponse.identityToken) {
        throw new Error('Apple Sign-In failed - no identify token returned');
      }

      // Create a Firebase credential from the response
      const { identityToken, nonce } = appleAuthRequestResponse;
      const appleCredential = auth.AppleAuthProvider.credential(identityToken, nonce);

      // Sign the user in with the credential
      const userCredential = await auth().signInWithCredential(appleCredential);
      return userCredential.user;
    } catch (error) {
      throw new Error('Failed to sign in with Apple');
    }
  }

  static async signOut() {
    try {
      await auth().signOut();
      await GoogleSignin.signOut();
      await AsyncStorage.removeItem('user_session');
    } catch (error) {
      throw new Error('Failed to sign out');
    }
  }

  static async getCurrentUser() {
    return auth().currentUser;
  }

  static onAuthStateChanged(callback: (user: any) => void) {
    return auth().onAuthStateChanged(callback);
  }

  static async resetPassword(email: string) {
    try {
      await auth().sendPasswordResetEmail(email);
    } catch (error) {
      throw new Error('Failed to send password reset email');
    }
  }
}