import { StyleSheet, TouchableOpacity, View, Linking } from 'react-native';
import Card from '../components/card';
import CustomText from '../components/ui/text';
import {
  EmailPadding,
  PhonePadding,
  SocialFacebook,
  SocialInstagram,
  SocialLinkedin,
  SocialTwitter,
  COLORS,
} from '../utils/constants';
interface ContactDetailsProps {
  heading?: string;
  email?: string;
  phone?: string;
  address?: string;
  website?: string;
  onPressEmail?: () => void;
  onPressPhone?: () => void;
  onPressWebsite?: () => void;
  socialLinks?: { name: string; url: string }[];
  isViewAttendeeDetails?: boolean;
  social_media_links?: { [key: string]: string | null | undefined };
  onPressSocialLink?: (url: string) => void;
  isViewExhibitorDetails?: boolean;
}
const getIconFromName = (name: string) => {
  switch (name?.toLowerCase()) {
    case 'facebook':
      return <SocialFacebook />; // Replace with actual icon component or string
    case 'instagram':
      return <SocialInstagram />; // Replace with actual icon component or string
    case 'linkedin':
      return <SocialLinkedin />; // Replace with actual icon component or string
    case 'twitter':
      return <SocialTwitter />; // Replace with actual icon component or string
    default:
      return name; // Fallback to the name if no icon is found
  }
};
export default function ContactDetails({
  heading,
  email,
  phone,
  address,
  website,
  onPressEmail,
  onPressPhone,
  onPressWebsite,
  socialLinks = [],
  isViewAttendeeDetails = false,
  social_media_links,
  onPressSocialLink,
  isViewExhibitorDetails = false,
}: ContactDetailsProps) {
  return (
    <Card style={styles.card}>
      <CustomText style={styles.textHeadng}>{heading}</CustomText>
      <View style={styles.container}>
        <View style={styles.leftContainer}>
          <CustomText style={styles.textName}>Email ID</CustomText>
          <CustomText style={styles.textDesignation}>{email}</CustomText>
        </View>
        <View style={styles.rightContainer}>
          <TouchableOpacity onPress={onPressEmail} style={styles.companyBox}>
            <EmailPadding />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.container}>
        <View style={styles.leftContainer}>
          <CustomText style={styles.textName}>Phone No</CustomText>
          <CustomText style={styles.textDesignation}>{phone}</CustomText>
        </View>
        <View style={styles.rightContainer}>
          <TouchableOpacity onPress={onPressPhone} style={styles.companyBox}>
            <PhonePadding />
          </TouchableOpacity>
        </View>
      </View>
      {address && (
        <View style={styles.container}>
          <View style={styles.leftContainer}>
            <CustomText style={styles.textName}>Address</CustomText>
            <CustomText style={styles.textDesignation}>{address}</CustomText>
          </View>
        </View>
      )}

      {website && (
        <View style={styles.container}>
          <View style={styles.leftContainer}>
            <CustomText style={styles.textName}>Website</CustomText>
            <CustomText onPress={onPressWebsite} style={styles.textCompany}>
              {website}
            </CustomText>
          </View>
        </View>
      )}

      {isViewAttendeeDetails && social_media_links && (
        <View style={styles.container}>
          <View style={styles.leftContainer}>
            <CustomText style={styles.textName}>Social Media Links</CustomText>
            <View style={styles.companyBox}>
              {social_media_links?.facebook && (
                <TouchableOpacity
                  onPress={() =>
                    onPressSocialLink(social_media_links?.facebook)
                  }
                  style={{ marginTop: 10, marginRight: 10 }}
                >
                  <SocialFacebook />
                </TouchableOpacity>
              )}
              {social_media_links?.instagram && (
                <TouchableOpacity
                  onPress={() =>
                    onPressSocialLink(social_media_links?.instagram)
                  }
                  style={{ marginTop: 10, marginRight: 10 }}
                >
                  <SocialInstagram />
                </TouchableOpacity>
              )}
              {social_media_links?.linkedin && (
                <TouchableOpacity
                  onPress={() =>
                    onPressSocialLink(social_media_links?.linkedin)
                  }
                  style={{ marginTop: 10, marginRight: 10 }}
                >
                  <SocialLinkedin />
                </TouchableOpacity>
              )}
              {social_media_links?.twitter && (
                <TouchableOpacity
                  onPress={() => onPressSocialLink(social_media_links?.twitter)}
                  style={{ marginTop: 10, marginRight: 10 }}
                >
                  <SocialTwitter />
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      )}

      {isViewExhibitorDetails && socialLinks?.length > 0 && (
        <View style={styles.container}>
          <View style={styles.leftContainer}>
            <CustomText style={styles.textName}>Social Media Links</CustomText>
            <View style={styles.companyBox}>
              {socialLinks
                .filter(link => !!link.url && link.url.trim() !== '')
                .map((link, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      if (link.url) {
                        // Use Linking to open the URL

                        Linking.openURL(link.url!);
                      }
                    }}
                    style={{ marginTop: 10, marginRight: 10 }}
                  >
                    {getIconFromName(link.name)}
                  </TouchableOpacity>
                ))}
            </View>
          </View>
        </View>
      )}
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    // marginHorizontal: 10,
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
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  leftContainer: {
    flex: 1,
  },
  rightContainer: {
    width: '10%',
    paddingLeft: 10,
    justifyContent: 'center',
  },
  textName: {
    color: COLORS.text,
    fontSize: 16,
    fontFamily: 'Roboto-Bold',
  },
  textDesignation: {
    color: COLORS.textPrimary,
    fontSize: 16,
    fontFamily: 'Roboto-Regular',
  },
  companyBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textCompany: {
    color: COLORS.primary,
    fontSize: 16,
    fontFamily: 'Roboto-SemiBold',
    alignSelf: 'flex-start',
  },
});
