import { useState } from 'react';
import { Alert, StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { EditProfileIcon, COLORS } from '../utils/constants';
import UserDetails from '../components/userDetails';
import ContactDetails from '../components/contactDetails';
import AddNote from '../components/addNote';
import Icon from '../components/icon';
import Card from '../components/card';
import CustomText from '../components/ui/text';
import TextBox from '../components/ui/textBox';
import Button from '../components/ui/button';
import { ScrollView } from 'react-native-gesture-handler';
const TAGS = ['IT services', 'Digital', 'Technology'];
const EditProfile = () => {
  const [selectedTags, setSelectedTags] = useState([]);
  const selectTags = index => {
    if (selectedTags.includes(index)) {
      setSelectedTags(selectedTags.filter(tag => tag !== index));
    } else {
      setSelectedTags([...selectedTags, index]);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Card style={styles.card}>
          <TouchableOpacity style={styles.imageBox}>
            <Icon
              source={{ uri: 'https://reactjs.org/logo-og.png' }}
              size={100}
              backgroundColor={COLORS.placeholder}
              borderRadius={50}
            />
            <View style={styles.imageBoxEdit}>
              <EditProfileIcon />
            </View>
          </TouchableOpacity>

          <TextBox
            value={'Taylor'}
            label={'First Name'}
            labelStyle={styles.labelStyle}
            placeholder={''}
            onChangeText={() => {}}
            required={true}
            style={styles.textBoxStyle}
          />

          <TextBox
            value={'Black'}
            label={'Last Name'}
            labelStyle={styles.labelStyle}
            placeholder={''}
            onChangeText={() => {}}
            required={true}
            style={styles.textBoxStyle}
          />

          <TextBox
            value={'IT Engeener'}
            label={'Designation'}
            labelStyle={styles.labelStyle}
            placeholder={''}
            onChangeText={() => {}}
            required={true}
            style={styles.textBoxStyle}
          />

          <TextBox
            value={'Cognizant'}
            label={'Company Name'}
            labelStyle={styles.labelStyle}
            placeholder={''}
            onChangeText={() => {}}
            required={true}
            style={styles.textBoxStyle}
          />

          <TextBox
            value={'www.cognizant.com'}
            label={'Company Website'}
            labelStyle={styles.labelStyle}
            placeholder={''}
            onChangeText={() => {}}
            required={true}
            style={styles.textBoxStyle}
          />
          <View style={styles.tagContainer}>
            <Text style={styles.labelStyle}>
              Tags <Text style={styles.asterisk}> *</Text>
            </Text>
            <View style={styles.tagsWrapper}>
              {TAGS.map((tag, index) => (
                <TouchableOpacity
                  key={index}
                  style={
                    selectedTags.includes(index)
                      ? styles.tagsBoxActive
                      : styles.tagsBox
                  }
                  onPress={() => selectTags(index)}
                >
                  <CustomText
                    style={
                      selectedTags.includes(index)
                        ? styles.labelStyleActive
                        : styles.labelStyle
                    }
                  >
                    {tag}
                  </CustomText>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <TextBox
            value={'taylor.black@gmail.com'}
            label={'Email Address'}
            labelStyle={styles.labelStyle}
            placeholder={''}
            onChangeText={() => {}}
            required={true}
            style={styles.textBoxStyle}
          />

          <TextBox
            value={'+91 7596842521'}
            label={'Phone Number'}
            labelStyle={styles.labelStyle}
            placeholder={''}
            onChangeText={() => {}}
            required={true}
            style={styles.textBoxStyle}
          />

          <TextBox
            value={`Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`}
            label={'Bio'}
            labelStyle={styles.labelStyle}
            placeholder={''}
            onChangeText={() => {}}
            required={true}
            style={styles.textAreaStyle}
            multiline={true}
            numberOfLines={4}
          />
        </Card>
      </ScrollView>
      <View style={styles.btnContainer}>
        <Button
          title={'Save'}
          onPress={() => {}}
          style={{ width: '80%' }}
          textStyle={styles.btnTextStyle}
        />
      </View>
    </SafeAreaView>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
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
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
  },
  imageBox: {
    backgroundColor: COLORS.placeholder,
    borderRadius: 50,
    height: 100,
    width: 100,
    alignSelf: 'center',
  },
  imageBoxEdit: {
    backgroundColor: COLORS.primary,
    height: 40,
    width: 40,
    position: 'absolute',
    right: 0,
    bottom: 0,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textBoxStyle: {
    marginTop: 10,
    marginBottom: 10,
    height: 40,
    fontSize: 15,
    fontFamily: 'Roboto-Regular',
    color: COLORS.text,
    paddingRight: 20,
  },
  textAreaStyle: {
    marginTop: 10,
    marginBottom: 10,
    //height: 40,
    fontSize: 15,
    fontFamily: 'Roboto-Regular',
    color: COLORS.text,
    paddingRight: 20,
  },
  labelStyle: {
    fontSize: 15,
    fontFamily: 'Roboto-Regular',
    color: COLORS.text,
  },
  labelStyleActive: {
    fontSize: 15,
    fontFamily: 'Roboto-Regular',
    color: COLORS.white,
  },
  asterisk: {
    color: 'red',
  },
  tagContainer: {
    marginTop: 10,
    marginBottom: 10,
  },
  tagsWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  tagsBox: {
    backgroundColor: COLORS.background,
    padding: 10,
    marginRight: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tagsBoxActive: {
    backgroundColor: COLORS.primary,
    padding: 10,
    marginRight: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnTextStyle: {
    fontSize: 15,
    fontFamily: 'Roboto-Regular',
    color: COLORS.white,
  },
  btnContainer: {
    height: 80,
    width: '100%',
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
