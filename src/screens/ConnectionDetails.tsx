import React, { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { COLORS } from '../utils/constants';
import BackHeader from '../components/BackHeader';
import LoadingOverlay from '../components/loadingOverlay';
import UserCard from '../components/userCard';
import ContactDetailsCard from '../components/contactDetailsCard';
import ContactDetails from '../components/contactDetails';

const connectionData = {
  company_name: 'XYZ Corp',
  image_url:
    'https://w7.pngwing.com/pngs/205/731/png-transparent-default-avatar-thumbnail.png',
  name: 'Joe Doe',
  role: 'Senior Director',
  contact_details: {
    email: 'user@example.com',
    phone: '8882227771',
    address: '12C Hong Kong',
    website: 'www.google.com',
  },
};

const ConnectionDetails = () => {
  const [isLoading, setIsLoading] = useState(false);

  if (isLoading) {
    return <LoadingOverlay visible={isLoading} />;
  }

  // if (!dummyData) {
  //   return null;
  // }

  return (
    <>
      <BackHeader title="Connection Details" showBtn={true} />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* <UserCard
          userName={dummyData?.name}
          userTitle={dummyData?.role}
          companyName={dummyData?.company_name}
          imageUrl={dummyData?.image_url}
        /> */}
        {/* <UserList key={'1'} exhibitorsData={exhibitorsData} isSingle={true} /> */}
        {/* <ContactDetailsCard details={connectionData.contact_details} /> */}
        <ContactDetails
          heading="Contact Details"
          email={connectionData.contact_details.email}
          phone={connectionData.contact_details.phone}
          address={connectionData.contact_details.address}
          website={connectionData.contact_details.website}
        />
      </ScrollView>
    </>
  );
};

export default ConnectionDetails;

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
    padding: 10,
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
