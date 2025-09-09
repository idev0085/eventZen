import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ArrowLeftIcon, COLORS, TEXT_SIZES } from '../utils/constants';

interface BackHeaderProps {
  title: string;
  onBack?: () => void;
  routeName?: string;
  showBtn?: boolean;
  rightFunction?: () => void;
  rightLabel?: string;
}

const BackHeader: React.FC<BackHeaderProps> = ({
  title,
  onBack,
  routeName,
  showBtn = true,
  rightFunction,
  rightLabel,
}) => {
  const navigation = useNavigation();

  const handleBack = () => {
    if (routeName) {
      navigation.navigate(routeName as never);
    } else if (onBack) {
      onBack();
    } else {
      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
      {showBtn ? (
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <ArrowLeftIcon />
        </TouchableOpacity>
      ) : null}
      <Text style={styles.title}>{title}</Text>
      {rightFunction ? (
        <TouchableOpacity onPress={rightFunction} style={styles.rightFunction}>
          {rightLabel ? (
            <Text style={styles.rightLabel}>{rightLabel}</Text>
          ) : null}
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default BackHeader;

const styles = StyleSheet.create({
  container: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: COLORS.white,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ddd',
  },
  backButton: {
    marginRight: 12,
  },
  title: {
    fontSize: TEXT_SIZES.md,
    fontWeight: '400',
  },
  rightFunction: {
    marginLeft: 'auto',
  },
  rightLabel: {
    fontSize: TEXT_SIZES.md,
    color: COLORS.primary,
    fontFamily: 'Roboto-Medium',
  },
});
