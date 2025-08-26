import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import DrawerMenuIcon from '../../assets/svg/svgComponents/DrawerMenuIcon';
import { DrawerNavigationProp } from '@react-navigation/drawer';

type DrawerNavProp = DrawerNavigationProp<any>;

const DrawerMenuButton = () => {
  const navigation = useNavigation<DrawerNavProp>();

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.dispatch(DrawerActions.toggleDrawer());
      }}
    >
      <DrawerMenuIcon width={30} height={30} />
    </TouchableOpacity>
  );
};

export default DrawerMenuButton;
