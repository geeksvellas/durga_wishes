import React, {useState} from 'react';
import IconAnt from 'react-native-vector-icons/AntDesign';
import LanguageList from './LanguageList';
import {day_title, language, textData} from './Constants';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  ImageBackground,
  Dimensions,
  Keyboard,
  Modal,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
const Home = (props) => {
  // console.disableYellowBox = true;
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedLanguage, setLanguage] = useState('English');
  const [langReady, setLangReady] = useState(language);
  const shuffle = (arrList) => {
    var currentIndex = arrList.length,
      temporaryValue,
      randomIndex;
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      // And swap it with the current element.
      temporaryValue = arrList[currentIndex];
      arrList[currentIndex] = arrList[randomIndex];
      arrList[randomIndex] = temporaryValue;
    }
    return arrList;
  };
  const [inputText, setInputText] = useState('');
  const onSetinputText = (inputText) => {
    setInputText(inputText);
  };
  const onSelectLanguage = (itemtext) => {
    console.log(itemtext);
    setModalVisible(false);
    setLanguage(itemtext);
  };
  async function onGreet() {
    Keyboard.dismiss();
    props.navigation.navigate('Details', {
      textData: shuffle(textData[selectedLanguage]),
      inputText: inputText,
    });
  }
  return (
    <ImageBackground
      source={require('../assets/bg.jpg')}
      size="cover"
      style={{
        position: 'absolute',
        left: 0,
        top: 0,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
      }}
      imageStyle={{
        resizeMode: 'cover',
      }}>
      <View style={styles.container}>
        <Text style={styles.heading}>{day_title}</Text>
        <View
          style={{
            width: '100%',
            alignItems: 'center',
          }}>
          <TextInput
            placeholderTextColor="white"
            placeholder="From (Optional)"
            onChangeText={onSetinputText}
            style={styles.input}
          />
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setModalVisible(true)}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: 'white',
                  fontSize: Dimensions.get('window').width / 24,
                }}>
                {selectedLanguage}
              </Text>
              <IconAnt
                backgroundColor="transparent"
                name="down"
                color="white"
                style={{marginLeft: 10}}
                size={20}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={onGreet}>
            <Text
              style={{
                color: 'white',
                fontSize: Dimensions.get('window').width / 24,
              }}>
              Greet!
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {loading ? (
        <View style={styles.loading}>
          <ActivityIndicator animating={true} size="large" color="red" />
        </View>
      ) : null}
      <Modal
        animationType="none"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}>
        {langReady.length > 0 ? (
          <LanguageList onLanguage={onSelectLanguage} langArray={langReady} />
        ) : (
          <View style={styles.loading}>
            <ActivityIndicator animating={true} size="large" color="red" />
          </View>
        )}
      </Modal>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
    alignItems: 'center',
  },
  input: {
    margin: 30,
    width: '70%',
    height: 40,
    padding: 10,
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 10,
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: Dimensions.get('window').width / 24,
    backgroundColor: 'rgba(255,255,255,0.6)',
  },
  heading: {
    textAlign: 'center',
    fontSize: Dimensions.get('window').width / 10,
    fontWeight: 'bold',
    fontFamily: 'lucida grande',
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0,1)',
    textShadowOffset: {width: 5, height: 5},
    textShadowRadius: 10,
  },
  button: {
    fontFamily: 'lucida grande',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    marginLeft: 10,
    borderRadius: 10,
    shadowColor: 'black',
    shadowRadius: 2,
    backgroundColor: '#7d3aae',
  },
  sectionList: {
    // minHeight: 300,
    alignItems: 'center',
  },
  textCard: {
    flexDirection: 'column',
    alignItems: 'center',
    padding: 20,
    width: Dimensions.get('window').width - 80,
    backgroundColor: '#FFF',
    borderRadius: 30,
    marginHorizontal: 40,
    marginTop: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loading: {
    backgroundColor: 'rgba(0,0,0,0.8)',
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Home;
