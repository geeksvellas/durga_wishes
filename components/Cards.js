import React, {useState} from 'react';
import IconAnt from 'react-native-vector-icons/AntDesign';
import ShareText from 'react-native-share';
import {AdMobBanner, AdMobInterstitial} from 'react-native-admob';
import {
  StyleSheet,
  Animated,
  View,
  Image,
  Text,
  ImageBackground,
  Dimensions,
  FlatList,
} from 'react-native';
import {interstitial_key1, banner_key1} from './Constants';

const Cards = (props) => {
  /*-----------------------------------------------*/

  //animation slide

  const anim1 = new Animated.Value(0);
  const animate1 = () => {
    Animated.timing(anim1, {toValue: 100, duration: 500}).start(() =>
      Animated.timing(anim1, {toValue: -100, duration: 500}).start(() =>
        Animated.timing(anim1, {toValue: 100, duration: 500}).start(() =>
          Animated.timing(anim1, {toValue: 0, duration: 500}).start(),
        ),
      ),
    );
  };
  /*---------------------------------------*/

  const [textData, setTextData] = useState(props.textData);
  const [bAdLoaded, setbAdLoaded] = useState(false);
  const onShare = async (text) => {
    if (!bAdLoaded) {
      AdMobInterstitial.setAdUnitID(interstitial_key1);
      // AdMobInterstitial.setTestDevices(['fedc960f']);
      AdMobInterstitial.requestAd().then(() => AdMobInterstitial.showAd());
      AdMobInterstitial.showAd().catch((error) => console.log(error));
      AdMobInterstitial.addEventListener('adLoaded', () => {
        console.log('AdMobInterstitial => adLoaded');
        setbAdLoaded(true);
      });
      AdMobInterstitial.addEventListener('adOpened', () => {
        console.log('AdMobInterstitial => adOpened');
        setbAdLoaded(false);
      });
      AdMobInterstitial.addEventListener('adClosed', () => {
        console.log('AdMobInterstitial => adClosed');
        setbAdLoaded(false);
      });
      AdMobInterstitial.addEventListener('adFailedToLoad', (error) => {
        console.log(error);
        setbAdLoaded(false);
      });
      AdMobInterstitial.requestAd().catch((error) => console.log(error));
    }
    openShare(text);
  };
  const openShare = async (text) => {
    var fullText =
      text + (props.inputText !== '' ? '\n -' + props.inputText : '');
    const shareOptions = {
      title: 'Share via',
      message: fullText,
      url: '', // country code + phone number(currently only works on Android)
      filename: '', // only for base64 file in Android
    };
    ShareText.open(shareOptions)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        err && console.log(err);
      });
  };
  return (
    <ImageBackground
      source={require('../assets/bg.jpg')}
      size="cover"
      style={{
        flex: 1,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      imageStyle={{
        resizeMode: 'cover',
      }}>
      <View style={{flex: 1}}>
        <View style={{position: 'absolute', top: 0}}>
          <AdMobBanner
            adSize="fullBanner"
            adUnitID={banner_key1}
            onAdFailedToLoad={(error) => console.log(error)}
          />
        </View>
        <View style={styles.sectionList}>
          <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            keyExtractor={(item, index) => item.id}
            data={textData}
            renderItem={(itemData) => (
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <View style={styles.textCard}>
                  <Text
                    style={{
                      textAlign: 'center',
                      fontSize: Dimensions.get('window').width / 24,
                      fontWeight: 'bold',
                      fontFamily: 'lucida grande',
                    }}>
                    {itemData.item.text +
                      (props.inputText !== '' ? '\n -' + props.inputText : '')}
                  </Text>
                  <View
                    style={{
                      alignItems: 'center',
                      padding: 10,
                    }}>
                    <IconAnt
                      backgroundColor="transparent"
                      name="sharealt"
                      color="green"
                      onPress={onShare.bind(this, itemData.item.text)}
                      size={30}
                    />
                  </View>
                </View>
              </View>
            )}
          />

          <Animated.View
            style={{
              position: 'absolute',
              justifyContent: 'center',
              alignItems: 'center',
              width: 100,
              height: 100,
              margin: 50,
              bottom: 0,
              zIndex: 0,
              transform: [{translateX: anim1}],
            }}>
            {
              <Image
                onLoad={animate1}
                source={require('../assets/swipe.png')}
                style={{
                  width: 100,
                  height: 100,
                  alignContent: 'center',
                }}
              />
            }
          </Animated.View>
        </View>
      </View>
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
    backgroundColor: '#ff5c5a',
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
});

export default Cards;
