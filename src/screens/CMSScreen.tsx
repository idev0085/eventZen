import {
  Alert,
  StyleSheet,
  useWindowDimensions,
  View,
  Text,
  ActivityIndicator,
} from 'react-native';
import React, { use, useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import Card from '../components/card';
import Button from '../components/ui/button';
import { EditProfileIcon, COLORS } from '../utils/constants';
import { WebView } from 'react-native-webview';
import { BASE_URL } from '../config';
import { apiCall } from '../utils/helpers';
import Orientation from 'react-native-orientation-locker';

// const LoadingIndicatorView = () => {
//   return (
//     <ActivityIndicator
//       color={COLORS.primary} // Customize color
//       size="large" // Customize size (small or large)
//       style={styles.activityIndicatorStyle}
//     />
//   );
// };

type WebViewerProps = {
  htmlData?: string;
  locationURL?: string;
};

const WebViewer = ({ htmlData, locationURL }: WebViewerProps) => {
  const enableTextZoomJS = `
    var meta = document.createElement('meta');
    meta.setAttribute('name', 'viewport');
    meta.setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=2, user-scalable=yes');
    document.getElementsByTagName('head')[0].appendChild(meta);

    var style = document.createElement('style');
    style.innerHTML = "body, * { font-family: 'Roboto-Regular', 'Roboto', Arial, sans-serif !important; }";
    document.head.appendChild(style);
  `;
  if (locationURL) {
    return (
      <View style={{ flex: 1 }}>
        <WebView
          originWhitelist={['*']}
          source={{ uri: locationURL }}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          // textZoom={200}
          scalesPageToFit={true}
          //style={{ width: width, height: height, backgroundColor: 'red' }}
          //allowsFullscreenVideo={true}

          // renderLoading={LoadingIndicatorView}
          // containerStyle={{ flex: 1, padding: 20, backgroundColor: 'white' }}
        />
      </View>
    );
  }
  return (
    <WebView
      originWhitelist={['*']}
      source={{ html: htmlData }}
      javaScriptEnabled={true}
      domStorageEnabled={true}
      // textZoom={200}
      //scalesPageToFit={true}
      // renderLoading={LoadingIndicatorView}
      containerStyle={{ flex: 1, padding: 20, backgroundColor: 'white' }}
      injectedJavaScript={enableTextZoomJS}
      onMessage={event => {}}
    />
  );
};

const CMSScreen = ({ ...props }) => {
  const [htmlData, setHtmlData] = useState('');

  useEffect(() => {
    // Lock to landscape when the component mounts
    if (props?.page === 'location') {
      Orientation.lockToLandscape();
    }

    return () => {
      // Unlock to portrait (or default) when the component unmounts
      Orientation.lockToPortrait(); // Or Orientation.unlockAllOrientations();
    };
  }, [props?.page]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiCall(
          BASE_URL + '/app/page/' + props?.page,
          'GET',
          undefined,
          undefined,
        );
        setHtmlData(response?.data);
        console.log(BASE_URL + '/app/page/' + props?.page);
      } catch (error) {
        console.log('error', error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      {props?.page === 'about' && <WebViewer htmlData={htmlData} />}

      {props?.page === 'location' && (
        <WebViewer
          locationURL={'https://sme.nodejsdapldevelopments.com/venue/app'}
        />
      )}

      {props?.page === 'privacy-policy' && <WebViewer htmlData={htmlData} />}

      {props?.page === 'terms-condition' && <WebViewer htmlData={htmlData} />}

      {props?.page === 'help-support' && <WebViewer htmlData={htmlData} />}

      {props?.authPage && (
        <View style={styles.btnContainer}>
          <Button
            title={'Accept'}
            onPress={() => {}}
            style={{ width: '80%' }}
            textStyle={styles.btnTextStyle}
          />
        </View>
      )}
    </>
  );
};

export default CMSScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  btnContainer: {
    height: 80,
    width: '100%',
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnTextStyle: {
    fontSize: 15,
    fontFamily: 'Roboto-Regular',
    color: COLORS.white,
  },
  activityIndicatorStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
