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
  enableEmailIcon?: boolean;
  enablePhoneIcon?: boolean;
  labelTextStyle?: object;
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

/**
 * Find a non-empty URL by social network name.
 * Accepts either an array of {name, url} or an object map { facebook: url, ... }.
 */
const findUrlByName = (
  links:
    | { name: string; url?: string }[]
    | { [key: string]: string | null | undefined }
    | undefined,
  name: string,
): string | undefined => {
  if (!links || !name) return undefined;

  const wanted = name.toLowerCase();

  if (Array.isArray(links)) {
    const match = links.find(l => (l.name || '').toLowerCase() === wanted);
    const url = match?.url;
    return url && url.trim() !== '' ? url : undefined;
  }

  // links is an object map
  const map = links as { [key: string]: string | null | undefined };
  // try exact key, then lowercase key
  const direct = map[name];
  if (typeof direct === 'string' && direct.trim() !== '') return direct;
  const lower = map[wanted];
  if (typeof lower === 'string' && lower.trim() !== '') return lower;
  return undefined;
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
  enableEmailIcon = true,
  enablePhoneIcon = true,
  labelTextStyle = {},
}: ContactDetailsProps) {
  // Precompute social URLs (works with both array and map shapes)
  const facebookUrl = findUrlByName(
    socialLinks.length ? socialLinks : social_media_links,
    'facebook',
  );
  const instagramUrl = findUrlByName(
    socialLinks.length ? socialLinks : social_media_links,
    'instagram',
  );
  const linkedinUrl = findUrlByName(
    socialLinks.length ? socialLinks : social_media_links,
    'linkedin',
  );
  const twitterUrl = findUrlByName(
    socialLinks.length ? socialLinks : social_media_links,
    'twitter',
  );

  const openSocialLink = (url?: string | null) => {
    if (!url || typeof url !== 'string' || url.trim() === '') return;
    if (onPressSocialLink) return onPressSocialLink(url);
    return Linking.openURL(url);
  };
  return (
    <Card style={styles.card}>
      <CustomText style={[styles.textHeadng, labelTextStyle]}>
        {heading}
      </CustomText>
      {email && email !== '' && (
        <View style={styles.container}>
          <View style={styles.leftContainer}>
            <CustomText style={styles.textName}>Email ID</CustomText>
            <CustomText style={styles.textDesignation}>{email}</CustomText>
          </View>
          {enableEmailIcon ? (
            <View style={styles.rightContainer}>
              <TouchableOpacity
                onPress={onPressEmail}
                style={styles.companyBox}
              >
                <EmailPadding />
              </TouchableOpacity>
            </View>
          ) : null}
        </View>
      )}

      {phone && phone !== '' && (
        <View style={styles.container}>
          <View style={styles.leftContainer}>
            <CustomText style={styles.textName}>Phone No</CustomText>
            <CustomText style={styles.textDesignation}>{phone}</CustomText>
          </View>
          {enablePhoneIcon ? (
            <View style={styles.rightContainer}>
              <TouchableOpacity
                onPress={onPressPhone}
                style={styles.companyBox}
              >
                <PhonePadding />
              </TouchableOpacity>
            </View>
          ) : null}
        </View>
      )}
      {address && address !== '' && (
        <View style={styles.container}>
          <View style={styles.leftContainer}>
            <CustomText style={styles.textName}>Address</CustomText>
            <CustomText style={styles.textDesignation}>{address}</CustomText>
          </View>
        </View>
      )}

      {website && website !== '' && (
        <View style={styles.container}>
          <View style={styles.leftContainer}>
            <CustomText style={styles.textName}>Website</CustomText>
            <CustomText onPress={onPressWebsite} style={styles.textCompany}>
              {website}
            </CustomText>
          </View>
        </View>
      )}

      {isViewAttendeeDetails &&
        (facebookUrl || instagramUrl || linkedinUrl || twitterUrl) && (
          <View style={styles.container}>
            <View style={styles.leftContainer}>
              <CustomText style={styles.textName}>
                Social Media Links
              </CustomText>
              <View style={styles.companyBox}>
                {facebookUrl && (
                  <TouchableOpacity
                    onPress={() => openSocialLink(facebookUrl)}
                    style={{ marginTop: 10, marginRight: 10 }}
                  >
                    <SocialFacebook />
                  </TouchableOpacity>
                )}
                {instagramUrl && (
                  <TouchableOpacity
                    onPress={() => openSocialLink(instagramUrl)}
                    style={{ marginTop: 10, marginRight: 10 }}
                  >
                    <SocialInstagram />
                  </TouchableOpacity>
                )}
                {linkedinUrl && (
                  <TouchableOpacity
                    onPress={() => openSocialLink(linkedinUrl)}
                    style={{ marginTop: 10, marginRight: 10 }}
                  >
                    <SocialLinkedin />
                  </TouchableOpacity>
                )}
                {twitterUrl && (
                  <TouchableOpacity
                    onPress={() => openSocialLink(twitterUrl)}
                    style={{ marginTop: 10, marginRight: 10 }}
                  >
                    <SocialTwitter />
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </View>
        )}

      {isViewExhibitorDetails &&
        (facebookUrl || instagramUrl || linkedinUrl || twitterUrl) && (
          <View style={styles.container}>
            <View style={styles.leftContainer}>
              <CustomText style={styles.textName}>
                Social Media Links
              </CustomText>
              <View style={styles.companyBox}>
                {facebookUrl && (
                  <TouchableOpacity
                    onPress={() => openSocialLink(facebookUrl)}
                    style={{ marginTop: 10, marginRight: 10 }}
                  >
                    <SocialFacebook />
                  </TouchableOpacity>
                )}
                {instagramUrl && (
                  <TouchableOpacity
                    onPress={() => openSocialLink(instagramUrl)}
                    style={{ marginTop: 10, marginRight: 10 }}
                  >
                    <SocialInstagram />
                  </TouchableOpacity>
                )}
                {linkedinUrl && (
                  <TouchableOpacity
                    onPress={() => openSocialLink(linkedinUrl)}
                    style={{ marginTop: 10, marginRight: 10 }}
                  >
                    <SocialLinkedin />
                  </TouchableOpacity>
                )}
                {twitterUrl && (
                  <TouchableOpacity
                    onPress={() => openSocialLink(twitterUrl)}
                    style={{ marginTop: 10, marginRight: 10 }}
                  >
                    <SocialTwitter />
                  </TouchableOpacity>
                )}
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
    width: '92%',
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
