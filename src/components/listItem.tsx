import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageSourcePropType,
} from 'react-native';
import { COLORS } from '../utils/constants';

interface ListItemProps {
  title: string;
  description?: string;
  leftImage?: ImageSourcePropType;
  rightImage?: ImageSourcePropType;
  onPress?: () => void;
  designation?: string;
  companyName?: string;
  avatar?: ImageSourcePropType;
}

const ListItem: React.FC<ListItemProps> = ({
  title,
  description,
  leftImage,
  rightImage,
  onPress,
  designation,
  companyName,
  avatar,
}) => {
  return (
    <TouchableOpacity style={styles.item} onPress={onPress}>
      {avatar && <Image source={avatar} style={styles.image} />}
      {/* {leftImage && <Image source={leftImage} style={styles.image} />} */}
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        {designation && <Text style={styles.description}>{designation}</Text>}
        {companyName && <Text style={styles.textCompany}>{companyName}</Text>}
        {description && <Text style={styles.description}>{description}</Text>}
      </View>
      {rightImage && <Image source={rightImage} style={styles.image} />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
    resizeMode: 'contain',
    backgroundColor: COLORS.placeholder,
  },
  textContainer: {
    flex: 1,
    marginLeft: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
  description: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  textCompany: {
    fontSize: 14,
    color: COLORS.primary,
    marginTop: 4,
  },
});

export default ListItem;
