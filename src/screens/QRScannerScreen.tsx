import { useState } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  useWindowDimensions,
  ActivityIndicator,
  Text,
} from 'react-native';
import { COLORS, Download, OpenScannerIcon } from '../utils/constants';
import Icon from '../components/icon';
import Card from '../components/card';
import CustomText from '../components/ui/text';
import Button from '../components/ui/button';
import BackHeader from '../components/BackHeader';
import LoadingOverlay from '../components/loadingOverlay';
import Modal from 'react-native-modal';
import Toast from 'react-native-simple-toast';
import { useFileDownloader } from '../hooks/useFileDownloader';
import { useProfile } from '../hooks/useApi';

const QRScannerScreen = ({ ...props }) => {
  const [visible, setVisible] = useState(false);
  const openModal = () => setVisible(true);
  const closeModal = () => setVisible(false);
  const { width, height } = useWindowDimensions();
  const { download, isDownloading } = useFileDownloader();

  const { data: profileData, isLoading } = useProfile();

  const openScanner = () => {
    setVisible(true);
  };

  const downloadQrCode = () => {
    if (!profileData?.my_qr_code) {
      Toast.show('No download URL provided', Toast.LONG);
      return;
    }

    download({
      url: profileData?.my_qr_code,
      fileName: `file_${Date.now()}`,
      fileType: 'png',
    });
  };

  if (isLoading) {
    <LoadingOverlay visible={true} />;
  }

  return (
    <>
      <BackHeader title="QR Code" />

      <Card style={styles.card}>
        <CustomText style={styles.textLabel}>My QR Code</CustomText>
        <CustomText style={styles.textMeta}>
          Scan this QR code to attend & experience the event.
        </CustomText>
        <View style={styles.imageBox}>
          <Icon
            source={{ uri: profileData?.my_qr_code }}
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
          <TouchableOpacity onPress={downloadQrCode} disabled={isDownloading}>
            {isDownloading ? <ActivityIndicator size={20} /> : <Download />}
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

      <Modal
        isVisible={visible}
        onBackdropPress={closeModal}
        useNativeDriver
        style={styles.modal}
      >
        {/* <QRScannerModal
          onClose={closeModal}
          onScanSuccess={qrValue => {
            console.log('Scanned:', qrValue);
          }}
        /> */}

        <Text>hi</Text>
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
