import React, { use, useEffect, useState } from 'react';
import { Alert, StyleSheet, View, RefreshControl, Linking } from 'react-native';
import { COLORS } from '../utils/constants';
import { useRoute } from '@react-navigation/native';

import SessionListItem from '../components/sessionListItem';
import { DrawerLayoutAndroid, ScrollView } from 'react-native-gesture-handler';
import Card from '../components/card';
import SearchUI from '../components/Search';
import CustomText from '../components/ui/text';
import BackHeader from '../components/BackHeader';
import { BASE_URL } from '../config';
import { apiCall, formatTimeRange } from '../utils/helpers';
import { getToken } from '../utils/tokenManager';
import LoadingOverlay from '../components/loadingOverlay';
import UserDetails from '../components/userDetails';
import { useAttendeeDetails } from '../hooks/useApi';
import ContactDetails from '../components/contactDetails';

export default function ViewAttendeeDetailsScreen({ ...props }) {
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const route = useRoute();
  const { userId } = route.params as { userId: number };

  const { data: attendeesData, isLoading } = useAttendeeDetails(userId);

  console.log('attendeesData', attendeesData);

  return (
    <>
      <BackHeader
        title="Attendee Details"
        showBtn={true}
        //   rightFunction={rightFunction}
        //   rightLabel={'Read All'}
      />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {isLoading ? (
          <LoadingOverlay visible={loading} />
        ) : (
          <>
            <UserDetails
              name={attendeesData?.name}
              designation={attendeesData?.role}
              company={attendeesData?.company_name}
              image={attendeesData?.image_url}
              roles={attendeesData?.roles}
              isAttendeeDetails={true}
              company_website={attendeesData?.company_website || ''}
            />

            {(attendeesData?.contact_details?.email !== '' ||
              attendeesData?.contact_details?.phone !== '') && (
              <ContactDetails
                heading="Contact Details"
                email={attendeesData?.contact_details?.email}
                phone={attendeesData?.contact_details?.phone}
                social_media_links={
                  attendeesData?.contact_details?.social_media_links
                }
                isViewAttendeeDetails={true}
                onPressEmail={() => {
                  Linking.openURL(
                    `mailto:${attendeesData?.contact_details?.email}`,
                  );
                }}
                onPressPhone={() => {
                  Linking.openURL(
                    `tel:${attendeesData?.contact_details?.phone}`,
                  );
                }}
                onPressSocialLink={url => {
                  Linking.openURL(url);
                }}
              />
            )}

            {attendeesData?.company_details &&
              attendeesData?.company_details !== '' && (
                <Card style={styles.card}>
                  <CustomText style={styles.textHeadng}>
                    Company Details
                  </CustomText>
                  <CustomText style={styles.textMeta}>
                    {attendeesData?.company_details}
                  </CustomText>
                </Card>
              )}
          </>
        )}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: COLORS.white,
  },
  card: {
    alignSelf: 'center',
    width: '95%',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
  },
  textHeadng: {
    color: COLORS.text,
    fontSize: 20,
    fontFamily: 'Roboto-Bold',
    marginBottom: 10,
  },
  textMeta: {
    color: COLORS.text,
    fontSize: 15,
    fontFamily: 'Roboto-Regular',
  },
});
