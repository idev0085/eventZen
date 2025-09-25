import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Linking,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { COLORS, DownloadIcon, TEXT_SIZES } from '../utils/constants';
import BackHeader from '../components/BackHeader';
import LoadingOverlay from '../components/loadingOverlay';
import UserCard from '../components/userCard';
import ContactDetails from '../components/contactDetails';
import Button from '../components/ui/button';
import AddNote from '../components/addNote';
import { getEmoji, RatingOption } from '../utils/getEmojiUtil';
import { useConnectionDetails } from '../hooks/useConnections';
import { useFileDownloader } from '../hooks/useFileDownloader';
import Toast from 'react-native-simple-toast';

const ConnectionDetails = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { connectionId } = route.params as { connectionId: number };
  const { download, isDownloading } = useFileDownloader();

  const {
    data: connectionData,
    isLoading,
    isError,
  } = useConnectionDetails(connectionId);

  if (isLoading) {
    return <LoadingOverlay visible={true} />;
  }
  if (isError || !connectionData) {
    return (
      <>
        <BackHeader title="Connection Details" showBtn={true} />
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <Text>Could not load connection details.</Text>
        </View>
      </>
    );
  }

  const renderRating = (rating: RatingOption | string) => {
    const ratingValue = rating.split('|')[0].trim() as RatingOption;
    return (
      <View style={styles.ratingItemContainer}>
        <Text style={styles.emojiStyle}>{getEmoji(ratingValue)}</Text>
        <Text style={styles.ratingLabel}>{ratingValue}</Text>
      </View>
    );
  };

  const handleDownload = () => {
    if (!connectionData.visitingCardUrl) {
      Toast.show('No download URL provided', Toast.LONG);
      return;
    }
    download({
      url: connectionData?.visitingCardUrl,
      fileName: `file_connection_visiting_card_${Date.now()}`,
      fileType: 'png',
    });
  };

  const handleEdit = () => {
    navigation.navigate('ConnectionEdit', { connection: connectionData });
  };

  console.log('connectionData', connectionData);
  return (
    <>
      <BackHeader title="Connection Details" showBtn={true} />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Baaki sab JSX same rahega */}
        <UserCard
          imageUrl={connectionData.avatarUrl}
          companyName={connectionData.companyName}
          name={connectionData.rep_name}
          role={connectionData.connection_role}
        />
        <ContactDetails
          heading="Contact Details"
          email={connectionData.rep_email}
          phone={connectionData.rep_phone}
          address={connectionData.rep_address}
          website={connectionData.company_website}
          onPressEmail={() => {
            Linking.openURL(`mailto:${connectionData?.contact_details?.email}`);
          }}
          onPressPhone={() => {
            Linking.openURL(`tel:${connectionData?.contact_details?.phone}`);
          }}
          onPressSocialLink={url => {
            Linking.openURL(url);
          }}
        />
        <View style={styles.section}>
          <Text style={styles.sectionHeading}>Tag</Text>
          <View style={styles.tagsContainer}>
            {connectionData.tags.map((tag, index) => (
              <View key={index} style={styles.tag}>
                <Text style={styles.tagText}>{tag}</Text>
              </View>
            ))}
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionHeading}>Ratings</Text>
          <View style={styles.ratingContainer}>
            {renderRating(connectionData.rating)}
          </View>
        </View>
        <View style={styles.section}>
          <View style={styles.downloadContainer}>
            <Text style={styles.sectionHeading}>Visting Card</Text>
            <TouchableOpacity
              style={styles.downloadIconTextStyle}
              onPress={handleDownload}
              disabled={isDownloading}
            >
              <DownloadIcon />
              <Text style={styles.downloadText}>Download</Text>
            </TouchableOpacity>
          </View>
          <Image
            source={{ uri: connectionData.visitingCardUrl }}
            style={[
              styles.downloadVisitingCard,
              { width: '100%', height: 200 },
            ]}
          />
        </View>
        <AddNote
          heading="Note"
          value={connectionData.note}
          editable={false}
          textInputStyle={{ color: '#4E4E4E' }}
        />
      </ScrollView>
      <View style={styles.footer}>
        <Button
          title="Edit"
          onPress={handleEdit}
          style={{ borderRadius: 10, width: '100%' }}
          textStyle={{ fontSize: TEXT_SIZES.sm, fontWeight: '400' }}
        />
      </View>
    </>
  );
};

export default ConnectionDetails;

const styles = StyleSheet.create({
  // ... poore styles
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: '#F4F4F4',
    paddingBottom: 20,
  },
  section: {
    backgroundColor: COLORS.white,
    marginHorizontal: 14,
    marginTop: 10,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionHeading: {
    fontSize: TEXT_SIZES.md,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: 12,
  },
  tagsContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  tag: {
    backgroundColor: COLORS.white,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#CACACA',
  },
  tagText: {
    fontSize: TEXT_SIZES.xs,
    color: COLORS.textPrimary,
    fontWeight: '500',
  },
  ratingContainer: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  downloadContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  downloadText: { color: COLORS.primary, fontWeight: '500' },
  downloadIconTextStyle: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  downloadVisitingCard: { borderRadius: 10 },
  footer: { backgroundColor: '#fff', padding: 15 },
  ratingItemContainer: {
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#EEEEEE',
    borderRadius: 10,
    padding: 10,
    minWidth: 80,
  },
  emojiStyle: {
    fontSize: 34,
  },
  ratingLabel: {
    fontSize: TEXT_SIZES.sm,
    color: COLORS.textPrimary,
    marginTop: 4,
  },
});
