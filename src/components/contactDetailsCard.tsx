import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from 'react-native';

interface Detail {
  label: string;
  value: string;
  url?: string;
}

interface ContactDetailsCardProps {
  details: {
    email: string;
    phone: string;
    address: string;
    website: string;
  };
}

const DetailItem: React.FC<Detail> = ({ label, value, url }) => {
  const handlePress = () => {
    if (url) {
      Linking.openURL(url).catch(err =>
        console.error("Couldn't load page", err),
      );
    }
  };

  return (
    <View style={styles.itemContainer}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity onPress={handlePress} disabled={!url}>
        <Text style={url ? styles.linkValue : styles.value}>{value}</Text>
      </TouchableOpacity>
    </View>
  );
};

const ContactDetailsCard: React.FC<ContactDetailsCardProps> = ({ details }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Contact Details</Text>
      <DetailItem
        label="Email ID"
        value={details.email}
        url={`mailto:${details.email}`}
      />
      <DetailItem
        label="Phone No."
        value={details.phone}
        url={`tel:${details.phone}`}
      />
      <DetailItem label="Address" value={details.address} />
      <DetailItem
        label="Website"
        value={details.website}
        url={`https://${details.website}`}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 16,
  },
  itemContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#374151',
  },
  value: {
    fontSize: 16,
    color: '#4b5563',
  },
  linkValue: {
    fontSize: 16,
    color: '#2563eb',
    textDecorationLine: 'underline',
  },
});

export default ContactDetailsCard;
