import { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../utils/constants';
import Icon from '../components/icon';
import Card from '../components/card';
import CustomText from '../components/ui/text';
import TextBox from '../components/ui/textBox';
import Button from '../components/ui/button';
import { ScrollView } from 'react-native-gesture-handler';
import BackHeader from '../components/BackHeader';
import { BASE_URL } from '../config';
import { apiCall, formatTimeRange } from '../utils/helpers';
import { getToken } from '../utils/tokenManager';
const ViewProfile = ({ ...props }) => {
  const [apiData, setApiData] = useState({});
  const [selectedTags, setSelectedTags] = useState([]);
  const selectTags = index => {
    if (selectedTags.includes(index)) {
      setSelectedTags(selectedTags.filter(tag => tag !== index));
    } else {
      setSelectedTags([...selectedTags, index]);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const token = await getToken();
      try {
        const response = await apiCall(
          BASE_URL + '/api/profile',
          'GET',
          undefined,
          token,
        );
        // Assuming the API returns an object with a 'data' array
        setApiData(response);
      } catch (error) {
        console.log('error fetching connections', error);
      } finally {
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <BackHeader title="View Profile" />

      <ScrollView>
        <Card style={styles.card}>
          <TouchableOpacity style={styles.imageBox}>
            <Icon
              source={{ uri: apiData?.imageUrl }}
              size={100}
              backgroundColor={COLORS.placeholder}
              borderRadius={50}
            />
          </TouchableOpacity>

          <CustomText style={styles.textLabel}>Name</CustomText>
          <CustomText style={styles.textMeta}>{apiData?.name}</CustomText>

          <CustomText style={styles.textLabel}>Designation</CustomText>
          <CustomText style={styles.textMeta}>
            {apiData?.designation}
          </CustomText>

          <CustomText style={styles.textLabel}>Company Name</CustomText>
          <CustomText style={styles.textMeta}>
            {apiData?.company_name}
          </CustomText>

          <View style={styles.tagContainer}>
            <CustomText style={styles.textLabel}>Tags</CustomText>
            <View style={styles.tagsWrapper}>
              {apiData?.tags?.map((tag, index) => (
                <View key={index} style={styles.tagsBox}>
                  <CustomText style={styles.textMeta}>{tag}</CustomText>
                </View>
              ))}
            </View>
          </View>

          <CustomText style={styles.textLabel}>Email Id</CustomText>
          <CustomText style={styles.textMeta}>{apiData?.email}</CustomText>

          <CustomText style={styles.textLabel}>Phone No.</CustomText>
          <CustomText style={styles.textMeta}>{apiData?.phone}</CustomText>

          <CustomText style={styles.textLabel}>Bio</CustomText>
          <TextBox
            value={apiData?.bio}
            label={''}
            labelStyle={styles.textMeta}
            placeholder={''}
            onChangeText={() => {}}
            required={true}
            style={styles.textAreaStyle}
            multiline={true}
            numberOfLines={10}
            // disabled={true}
          />
        </Card>
      </ScrollView>
      <View style={styles.btnContainer}>
        <Button
          title={'Edit'}
          onPress={() =>
            props.navigation.navigate('EditProfile', {
              data: apiData,
            })
          }
          style={{ width: '80%' }}
          textStyle={styles.btnTextStyle}
        />
      </View>
    </>
  );
};

export default ViewProfile;

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
  textLabel: {
    fontSize: 16,
    fontFamily: 'Roboto-Bold',
    color: COLORS.text,
    marginTop: 20,
  },
  textMeta: {
    fontSize: 15,
    fontFamily: 'Roboto-Regular',
    color: COLORS.text,
  },
  tagContainer: {
    // marginTop: 10,
    // marginBottom: 10,
  },
  tagsWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    // marginBottom: 10,
  },
  tagsBox: {
    backgroundColor: COLORS.background,
    padding: 10,
    marginRight: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
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
  btnContainer: {
    height: 80,
    width: '100%',
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnTextStyle: {
    fontSize: 15,
    fontFamily: 'Roboto-Regular',
    color: COLORS.white,
  },
});
