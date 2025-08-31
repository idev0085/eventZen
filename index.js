/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import DevApp from './src/dev/DevApp';
import 'react-native-gesture-handler';
import { APP_CONFIG } from './src/utils/constants';

function Root() {
  if (__DEV__ && APP_CONFIG.DEBUG) {
    return <DevApp />;
  }
  return <App />;
}

AppRegistry.registerComponent(appName, () => Root);
