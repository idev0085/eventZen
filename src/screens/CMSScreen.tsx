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
// const LoadingIndicatorView = () => {
//   return (
//     <ActivityIndicator
//       color={COLORS.primary} // Customize color
//       size="large" // Customize size (small or large)
//       style={styles.activityIndicatorStyle}
//     />
//   );
// };

const WebViewer = ({ htmlData }) => {
  return (
    <WebView
      originWhitelist={['*']}
      source={{ html: htmlData }}
      javaScriptEnabled={true}
      domStorageEnabled={true}
      textZoom={180}
      scalesPageToFit={true}
      // renderLoading={LoadingIndicatorView}
      containerStyle={{ flex: 1, padding: 20, backgroundColor: 'white' }}
    />
  );
};

const CMSScreen = ({ ...props }) => {
  const [htmlData, setHtmlData] = useState('');
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

      {props?.page === 'location' && <WebViewer htmlData={htmlData} />}

      {props?.page === 'privacy-policy' && <WebViewer htmlData={htmlData} />}

      {props?.page === 'terms-condition' && <WebViewer htmlData={htmlData} />}
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
