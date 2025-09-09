import { useState, useCallback } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  useWindowDimensions,
  Linking,
} from 'react-native';
import { COLORS, Download, OpenScannerIcon } from '../utils/constants';
import Icon from '../components/icon';
import Card from '../components/card';
import CustomText from '../components/ui/text';
import TextBox from '../components/ui/textBox';
import Button from '../components/ui/button';
import { ScrollView } from 'react-native-gesture-handler';
import BackHeader from '../components/BackHeader';
import { BASE_URL } from '../config';
import { apiCall } from '../utils/helpers';
import { getToken } from '../utils/tokenManager';
import LoadingOverlay from '../components/loadingOverlay';
import Modal from 'react-native-modal';
import ReactNativeBlobUtil from 'react-native-blob-util';
import { useFocusEffect } from '@react-navigation/native';

const QRScannerScreen = ({ ...props }) => {
  const [apiData, setApiData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const openModal = () => setVisible(true);
  const closeModal = () => setVisible(false);
  const { width, height } = useWindowDimensions();

  // Fetch profile data
  const fetchData = useCallback(async () => {
    setIsLoading(true);
    const token = await getToken();
    try {
      const response = await apiCall(
        BASE_URL + '/api/profile',
        'GET',
        undefined,
        token,
      );

      // Normalize tags to array
      setApiData(response);
    } catch (error) {
      console.log('error fetching profile', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [fetchData]),
  );

  const openScanner = () => {
    setVisible(true);
  };

  const downloadQrCode = () => {
    ReactNativeBlobUtil.config({
      // add this option that makes response data to be stored as a file,
      // this is much more performant.
      fileCache: true,
    })
      .fetch('GET', apiData?.my_qr_code, {
        //some headers ..
      })
      .then(res => {
        // the temp file path
        console.log('The file saved to ', res.path());
      });
  };

  return (
    <>
      {isLoading ? <LoadingOverlay visible={isLoading} /> : null}
      <BackHeader title="QR Code" />

      <Card style={styles.card}>
        <CustomText style={styles.textLabel}>My QR Code</CustomText>
        <CustomText style={styles.textMeta}>
          Scan this QR code to attend & experience the event.
        </CustomText>
        <View style={styles.imageBox}>
          <Icon
            source={{ uri: apiData?.my_qr_code }}
            size={300}
            backgroundColor={COLORS.placeholder}
            borderRadius={50}
          />
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 10,
          }}
        >
          <TouchableOpacity onPress={downloadQrCode}>
            <Download />
          </TouchableOpacity>
        </View>

        <Button
          title={'Open Scanner'}
          onPress={openScanner}
          style={{ width: '80%', alignSelf: 'center', marginTop: 20 }}
          textStyle={styles.btnTextStyle}
          iconLeft={<OpenScannerIcon />}
        />
      </Card>
      {/* <View style={styles.btnContainer}></View> */}

      <Modal
        isVisible={visible}
        onBackdropPress={closeModal}
        useNativeDriver
        style={styles.modal}
      >
        <View style={styles.modalContent}>
          <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
            <Text style={{ fontSize: 20, color: COLORS.primary }}>X</Text>
          </TouchableOpacity>
          <View style={styles.imageBox}>
            <Icon
              source={{ uri: apiData?.my_qr_code }}
              size={width}
              backgroundColor={COLORS.placeholder}
              borderRadius={50}
            />
          </View>
        </View>
      </Modal>
    </>
  );
};

export default QRScannerScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  card: {
    marginHorizontal: 10,
    width: '95%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
  },
  imageBox: {
    backgroundColor: COLORS.placeholder,
    borderRadius: 50,
    // height: 100,
    // width: 100,
    alignSelf: 'center',
  },
  textLabel: {
    fontSize: 16,
    fontFamily: 'Roboto-Bold',
    color: COLORS.text,
    marginTop: 20,
    textAlign: 'center',
  },
  textMeta: {
    fontSize: 15,
    fontFamily: 'Roboto-Regular',
    color: COLORS.text,
    marginTop: 10,
    textAlign: 'center',
  },
  tagContainer: {
    marginTop: 10,
    marginBottom: 10,
  },
  tagsWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginTop: 10,
  },
  tagsBox: {
    backgroundColor: COLORS.background,
    padding: 10,
    marginRight: 10,
    marginBottom: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textAreaStyle: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 15,
    fontFamily: 'Roboto-Regular',
    color: COLORS.text,
    paddingRight: 20,
    minHeight: 100,
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
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 0,
  },
  modalContent: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 10,
    alignItems: 'center',
    // width: '70%',
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    padding: 4,
    zIndex: 1,
  },
});
