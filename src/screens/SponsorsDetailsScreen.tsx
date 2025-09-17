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
import { useSponsorDetails } from '../hooks/useApi';
import { DrawerLayoutAndroid, ScrollView } from 'react-native-gesture-handler';
import { COLORS } from '../utils/constants';
import Card from '../components/card';
import UserList from '../components/userList';
import ContactDetails from '../components/contactDetails';
import CustomText from '../components/ui/text';
import FileUploadCard from '../components/fileUploadCard';
const SponsorsDetailsScreen = () => {
  const route = useRoute();
  const { sponsorId } = route.params as { sponsorId: number };
  const { height, width } = useWindowDimensions();
  const {
    data: sponsorData,
    refetch: refetchData,
    isRefetching: isRefetching,
  } = useSponsorDetails(sponsorId);

  console.log('sponsorData', sponsorData);

  return (
    <>
      <BackHeader title="Sponsor Details" showBtn={true} />
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
        <UserList key={'1'} sponsorsData={sponsorData} isSingle={true} />

        {sponsorData?.banner && sponsorData?.banner !== '' && (
          <View style={styles.businessCard}>
            <Image
              source={{
                uri: sponsorData?.banner,
              }}
              style={{ width: width - 20, height: 200, borderRadius: 10 }}
              resizeMode="contain"
            />
          </View>
        )}

        <ContactDetails
          heading="Contact Details"
          email={sponsorData?.email}
          phone={sponsorData?.phone}
          address={sponsorData?.location}
          website={sponsorData?.website}
          onPressEmail={() => {}}
          onPressPhone={() => {}}
          onPressWebsite={() => {}}
          socialLinks={sponsorData?.social_links}
          isViewExhibitorDetails={true}
        />

        <Card style={styles.card}>
          <CustomText style={styles.textLabel}>Bio</CustomText>
          <CustomText style={styles.textMeta}>{sponsorData?.bio}</CustomText>
        </Card>

        <FileUploadCard
          title={'Upload'}
          onChange={() => {}}
          files={[]}
          maxFiles={5}
        />
      </ScrollView>
    </>
  );
};

export default SponsorsDetailsScreen;

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
    backgroundColor: COLORS.white,
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
    marginTop: 10,
  },
});
