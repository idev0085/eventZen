import {
  StyleSheet,
  Text,
  View,
  RefreshControl,
  useWindowDimensions,
  Image,
} from 'react-native';
import React from 'react';
import { useRoute } from '@react-navigation/native';
import BackHeader from '../components/BackHeader';
import { useExhibitorDetails } from '../hooks/useApi';
import { DrawerLayoutAndroid, ScrollView } from 'react-native-gesture-handler';
import { COLORS } from '../utils/constants';
import Card from '../components/card';
import UserList from '../components/userList';
import ContactDetails from '../components/contactDetails';
import CustomText from '../components/ui/text';
import FileUploadCard from '../components/fileUploadCard';

const DB = {
  name: 'test',
  word_no: '-',
  avatar:
    'https://sme.nodejsdapldevelopments.com/storage/content_icon/2025-09-16-3823450444-1758017261.jpeg?v=1758108608',
  location: '-',
  email: 'test32@gmail.com',
  phone: '1',
  website: 'https://www.google.com/',
  social_links: [
    {
      name: 'linkedin',
      url: '',
    },
    {
      name: 'facebook',
      url: '',
    },
    {
      name: 'instagram',
      url: '',
    },
    {
      name: 'twitter',
      url: '',
    },
  ],
  bio: '',
  uploaded_files: [],
  banner:
    'https://sme.nodejsdapldevelopments.com/storage/content_icon/2025-09-16-3823450444-1758017261.jpeg',
};
const ExhibitorsScreenDetails = () => {
  const route = useRoute();
  const { exhibitorId } = route.params as { exhibitorId: number };
  const { height, width } = useWindowDimensions();
  const {
    data: exhibitorsData,
    refetch: refetchData,
    isRefetching: isRefetching,
  } = useExhibitorDetails(exhibitorId);

  console.log('exhibitorsData', exhibitorsData);

  return (
    <>
      <BackHeader title="Exhibitors Details" showBtn={true} />
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        refreshControl={
          <RefreshControl
            refreshing={isRefetching}
            onRefresh={refetchData}
            tintColor={COLORS.primary}
          />
        }
      >
        <UserList key={'1'} exhibitorsData={exhibitorsData} isSingle={true} />

        <View style={styles.businessCard}>
          <Image
            source={{
              uri: 'https://sme.nodejsdapldevelopments.com/storage/content_icon/2025-09-16-3823450444-1758017261.jpeg',
            }}
            style={{ width: width - 20, height: 200, borderRadius: 10 }}
            resizeMode="cover"
          />
        </View>

        <ContactDetails
          heading="Contact Details"
          email={exhibitorsData?.email}
          phone={exhibitorsData?.phone}
          address={exhibitorsData?.location}
          website={exhibitorsData?.website}
          onPressEmail={() => {}}
          onPressPhone={() => {}}
          onPressWebsite={() => {}}
          socialLinks={exhibitorsData?.social_links}
          isViewExhibitorDetails={true}
        />

        <Card style={styles.card}>
          <CustomText style={styles.textLabel}>Bio</CustomText>
          <CustomText style={styles.textMeta}>{exhibitorsData?.bio}</CustomText>
        </Card>

        <FileUploadCard label={'Upload'} onFileSelected={() => {}} />
      </ScrollView>
    </>
  );
};

export default ExhibitorsScreenDetails;

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: COLORS.background,
  },
  card: {
    marginHorizontal: 10,
    alignSelf: 'center',
    width: '95%',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    paddingLeft: 30,
    borderRadius: 10,
    backgroundColor: COLORS.white,
  },
  businessCard: {
    width: '95%',
    height: 200,
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  textLabel: {
    fontSize: 16,
    fontFamily: 'Roboto-Bold',
    color: COLORS.text,
    marginTop: 20,
  },
  textMeta: {
    fontSize: 15,
    fontFamily: 'Roboto-Regular',
    color: COLORS.text,
  },
});
