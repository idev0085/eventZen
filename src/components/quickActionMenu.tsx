import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  StyleProp,
  ViewStyle,
  Text,
} from 'react-native';
import {
  AttendeeIcon,
  ExhibitorsIcon,
  SpeakersIcon,
  SponsorsIcon,
  TEXT_SIZES,
} from '../utils/constants';
import SubTopicWrapper from './ui/subTopicWrapper';
import { useNavigation } from '@react-navigation/native';
import { SvgProps } from 'react-native-svg';

interface MenuItemCardProps {
  name: string;
  onPress: () => void;
  Icon: React.ComponentType<SvgProps>;
  testID?: string;
  accessibilityLabel?: string;
}

const MenuItemCard: React.FC<MenuItemCardProps> = ({
  name,
  onPress,
  Icon,
  testID,
  accessibilityLabel,
}) => {
  return (
    <View style={styles.menuItemContainer}>
      <TouchableOpacity
        onPress={onPress}
        testID={testID}
        accessibilityLabel={accessibilityLabel || `${name} menu item`}
        accessibilityRole="button"
      >
        <Icon />
      </TouchableOpacity>
      <Text style={styles.menuText} numberOfLines={1}>
        {name}
      </Text>
    </View>
  );
};

interface QuickActionMenuProps {
  onMenuItemPress?: (screenName: string) => void;
  containerStyle?: StyleProp<ViewStyle>;
}

const QuickActionMenu: React.FC<QuickActionMenuProps> = ({
  onMenuItemPress,
  containerStyle,
}) => {
  const navigation = useNavigation();
  const menuItems = [
    { id: 1, name: 'Attendee', icon: AttendeeIcon, screenName: 'Profile' },
    { id: 2, name: 'Speaker', icon: SpeakersIcon, screenName: 'Speakers' },
    {
      id: 3,
      name: 'Exhibitors',
      icon: ExhibitorsIcon,
      screenName: 'Exhibitors',
    },
    { id: 4, name: 'Sponsors', icon: SponsorsIcon, screenName: 'Sponsors' },
  ] as const;

  const handleMenuItemPress = (screenName: string) => {
    console.log('Navigating to:', screenName);
    onMenuItemPress?.(screenName);
    navigation.navigate(`${screenName}`);
  };

  return (
    <SubTopicWrapper style={containerStyle}>
      <View>
        <Text style={styles.sectionTitle}>Quick Action</Text>
        <View style={styles.menuContainer}>
          {menuItems.map(menuItem => (
            <MenuItemCard
              key={menuItem.id}
              name={menuItem.name}
              onPress={() => handleMenuItemPress(menuItem.screenName)}
              Icon={menuItem.icon}
              testID={`quick-action-${menuItem.name.toLowerCase()}`}
              accessibilityLabel={`Navigate to ${menuItem.name}`}
            />
          ))}
        </View>
      </View>
    </SubTopicWrapper>
  );
};

export default QuickActionMenu;

const styles = StyleSheet.create({
  menuItemContainer: {
    alignItems: 'center',
    minWidth: 60,
  },
  menuContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    gap: 16,
  },
  menuText: {
    fontSize: TEXT_SIZES.xs,
    marginTop: 8,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: TEXT_SIZES.md,
    marginBottom: 15,
    fontWeight: '600',
  },
});
