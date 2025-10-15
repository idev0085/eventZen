import React from 'react';
import {
  StyleSheet,
  View,
  RefreshControl,
  useWindowDimensions,
  Image,
  Linking,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import BackHeader from '../components/BackHeader';
import { useSponsorDetails, useProfile } from '../hooks/useApi';
import { ScrollView } from 'react-native-gesture-handler';
import { COLORS } from '../utils/constants';
import Card from '../components/card';
import UserList from '../components/userList';
import ContactDetails from '../components/contactDetails';
import CustomText from '../components/ui/text';
import FileUploadCard from '../components/fileUploadCard';
import { useDeleteFile, useUploadFile } from '../hooks/useFiles';
import LoadingOverlay from '../components/loadingOverlay';

const SponsorsDetailsScreen = () => {
  const route = useRoute();
  const { sponsorId } = route.params as { sponsorId: number };
  const { height, width } = useWindowDimensions();
  const {
    data: sponsorData,
    isLoading: isDetailsLoading,
    refetch: refetchData,
    isRefetching: isRefetching,
  } = useSponsorDetails(sponsorId);

  const {
    data: profileData,
    isLoading: isProfileLoading,
    isSuccess,
  } = useProfile();

  const { mutateAsync: uploadFileAsync, isPending: isUploading } =
    useUploadFile({
      queryKeyToInvalidate: ['sponsor', sponsorId],
    });

  const { mutateAsync: deleteFileAsync, isPending: isDeleting } = useDeleteFile(
    {
      queryKeyToInvalidate: ['sponsor', sponsorId],
    },
  );

  const handleFileUpload = async (fileOrFormData: string | FormData) => {
    // uploadFile accepts file:string|FormData per updated filesApi
    const payload = {
      detailsId: sponsorId,
      type: 'sponsor' as const,
      file: fileOrFormData,
    };
    // returns server response (or throws)
    return await uploadFileAsync(payload);
  };

  const handleFileDelete = async (fileId: string) => {
    const payload = {
      detailsId: sponsorId,
      type: 'sponsor' as const,
      fileId,
    };
    return await deleteFileAsync(payload);
  };
  if (isDetailsLoading && !sponsorData) {
    return <LoadingOverlay visible={true} />;
  }
  console.log('sponsorsData', sponsorData);
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
              style={{ width: width - 40, height: 200, borderRadius: 10 }}
              resizeMode="contain"
            />
          </View>
        )}

        <ContactDetails
          heading="Contact Details"
          email={sponsorData?.email || ''}
          phone={sponsorData?.phone || ''}
          address={sponsorData?.location || ''}
          website={sponsorData?.website || ''}
          socialLinks={sponsorData?.social_links || []}
          isViewExhibitorDetails={true}
          onPressEmail={() => {
            Linking.openURL(`mailto:${sponsorData?.email}`);
          }}
          onPressPhone={() => {
            Linking.openURL(`tel:${sponsorData?.phone}`);
          }}
          onPressSocialLink={url => {
            Linking.openURL(url);
          }}
          onPressWebsite={() => {
            Linking.openURL(sponsorData.website);
          }}
        />

        {sponsorData?.bio && sponsorData?.bio !== '' && (
          <Card style={styles.card}>
            <CustomText style={styles.textLabel}>About</CustomText>
            <CustomText style={styles.textMeta}>{sponsorData?.bio}</CustomText>
          </Card>
        )}

        <Card style={styles.card}>
          <FileUploadCard
            maxFiles={3}
            maxSizeMB={10}
            title="Select Multiple files to upload"
            labelStyle={{ fontSize: 16, fontWeight: '700', marginBottom: 18 }}
            description="SVG, PNG, JPG or GIF (max 10MB)"
            onUpload={handleFileUpload}
            onDelete={handleFileDelete}
            initialFiles={
              sponsorData?.uploaded_files?.map(f => ({
                id: f.fileID.toString(),
                name: f.name,
                url: f.url,
              })) || []
            }
            autoUpload={true}
            isUploading={isUploading}
            isDeleting={isDeleting}
            showInitialFiles={true}
            label="Upload"
            type="sponsor"
            profileData={profileData}
            sponsorId={sponsorId}
          />
        </Card>
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
    padding: 10,
  },
  textLabel: {
    fontSize: 16,
    fontFamily: 'Roboto-Bold',
    color: COLORS.text,
  },
  textMeta: {
    fontSize: 15,
    fontFamily: 'Roboto-Regular',
    color: COLORS.text,
    marginTop: 10,
  },
});
