/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import DevApp from './src/dev/DevApp';

function Root() {
  if (__DEV__) {
    return <DevApp />;
  }
  return <App />;
}

AppRegistry.registerComponent(appName, () => Root);
