import {
  StyleSheet,
  View,
  RefreshControl,
  useWindowDimensions,
  Image,
  Linking,
} from 'react-native';
import React from 'react';
import { useRoute } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import BackHeader from '../components/BackHeader';
import { useExhibitorDetails, useProfile } from '../hooks/useApi';
import { COLORS } from '../utils/constants';
import Card from '../components/card';
import UserList from '../components/userList';
import ContactDetails from '../components/contactDetails';
import CustomText from '../components/ui/text';
import FileUploadCard from '../components/fileUploadCard';
import { useUploadFile, useDeleteFile } from '../hooks/useFiles';
import LoadingOverlay from '../components/loadingOverlay';

const ExhibitorsScreenDetails = () => {
  const route = useRoute();
  const { exhibitorId } = route.params as { exhibitorId: number };
  const { height, width } = useWindowDimensions();

  const {
    data: profileData,
    isLoading: isProfileLoading,
    isSuccess,
  } = useProfile();

  const {
    data: exhibitorsData,
    isLoading: isDetailsLoading,
    refetch: refetchData,
    isRefetching: isRefetching,
  } = useExhibitorDetails(exhibitorId);

  const { mutateAsync: uploadFileAsync, isPending: isUploading } =
    useUploadFile({
      queryKeyToInvalidate: ['exhibitor', exhibitorId],
    });

  const { mutateAsync: deleteFileAsync, isPending: isDeleting } = useDeleteFile(
    {
      queryKeyToInvalidate: ['exhibitor', exhibitorId],
    },
  );

  const handleFileUpload = async (fileOrFormData: string | FormData) => {
    // uploadFile accepts file:string|FormData per updated filesApi
    const payload = {
      detailsId: exhibitorId,
      type: 'exhibitor' as const,
      file: fileOrFormData,
    };
    // returns server response (or throws)
    return await uploadFileAsync(payload);
  };

  const handleFileDelete = async (fileId: string) => {
    const payload = {
      detailsId: exhibitorId,
      type: 'exhibitor' as const,
      fileId,
    };
    return await deleteFileAsync(payload);
  };

  if (isDetailsLoading && !exhibitorsData) {
    return <LoadingOverlay visible={true} />;
  }

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

        {exhibitorsData?.banner && exhibitorsData?.banner !== '' && (
          <View style={styles.businessCard}>
            <Image
              source={{ uri: exhibitorsData.banner }}
              style={{ width: width - 40, height: 200, borderRadius: 10 }}
              resizeMode="contain"
            />
          </View>
        )}

        <ContactDetails
          heading="Contact Details"
          email={exhibitorsData?.email}
          phone={exhibitorsData?.phone}
          address={exhibitorsData?.location}
          website={exhibitorsData?.website}
          socialLinks={exhibitorsData?.social_links}
          isViewExhibitorDetails={true}
          onPressEmail={() => {
            Linking.openURL(`mailto:${exhibitorsData?.email}`);
          }}
          onPressPhone={() => {
            Linking.openURL(`tel:${exhibitorsData?.phone}`);
          }}
          onPressSocialLink={url => {
            Linking.openURL(url);
          }}
          onPressWebsite={() => {
            Linking.openURL(exhibitorsData.website);
          }}
        />

        <Card style={styles.card}>
          <CustomText style={styles.textLabel}>Bio</CustomText>
          <CustomText style={styles.textMeta}>{exhibitorsData?.bio}</CustomText>
        </Card>
        {profileData?.is_exhibitor_id === exhibitorId && (
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
                exhibitorsData?.uploaded_files?.map(f => ({
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
              type="exhibitor"
            />
          </Card>
        )}
      </ScrollView>
    </>
  );
};

export default ExhibitorsScreenDetails;

const styles = StyleSheet.create({
  scrollContainer: { flexGrow: 1, backgroundColor: COLORS.background },
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
    marginTop: 10,
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
  textLabel: { fontSize: 16, fontFamily: 'Roboto-Bold', color: COLORS.text },
  textMeta: {
    fontSize: 15,
    fontFamily: 'Roboto-Regular',
    color: COLORS.text,
    marginTop: 10,
  },
});
