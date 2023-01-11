import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  FlatList,
  Dimensions,
  ImageBackground,
  Text,
} from 'react-native';
import RNWhatsAppStickers from 'react-native-whatsapp-stickers';
import {interstitial_key3, banner_key3} from './Constants';
import {AdMobBanner, AdMobInterstitial} from 'react-native-admob';
import sticker_base from '../assets/stickers.json';

const Stickers = (props) => {
  const [bAdLoaded, setbAdLoaded] = useState(false);
  const arrList = sticker_base.wishes;
  const onShare = () => {
    if (!bAdLoaded) {
      AdMobInterstitial.setAdUnitID(interstitial_key3);
      // AdMobInterstitial.setTestDevices(['fedc960f']);
      AdMobInterstitial.requestAd().then(() => AdMobInterstitial.showAd());
      AdMobInterstitial.addEventListener('adLoaded', () => {
        console.log('AdMobInterstitial => adLoaded');
        setbAdLoaded(true);
      });
      AdMobInterstitial.addEventListener('adOpened', () => {
        console.log('AdMobInterstitial => adOpened');
        setbAdLoaded(false);
      });
      AdMobInterstitial.addEventListener('adFailedToLoad', (error) => {
        console.log(error);
        setbAdLoaded(false);
      });
      AdMobInterstitial.addEventListener('adClosed', () => {
        console.log('AdMobInterstitial => adClosed');
        setbAdLoaded(false);
      });
      AdMobInterstitial.requestAd().catch((error) => console.log(error));
      openShare();
    }
  };

  const openShare = async () => {
    RNWhatsAppStickers.isWhatsAppAvailable()
      .then((isWhatsAppAvailable) => {
        if (isWhatsAppAvailable) {
          return RNWhatsAppStickers.send('stickers', 'Durga Puja Wishes');
        }

        return undefined;
      })
      .catch((e) => console.log(e));
  };

  return (
    <ImageBackground
      source={require('../assets/bg.jpg')}
      size="cover"
      style={{
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      imageStyle={{
        resizeMode: 'cover',
      }}>
      <View
        style={{flex: 1, width: '100%', backgroundColor: 'rgba(1,1,1,0.8)'}}>
        <View>
          <AdMobBanner
            adSize="fullBanner"
            adUnitID={banner_key3}
            onAdFailedToLoad={(error) => console.log(error)}
          />
        </View>
        <TouchableOpacity style={{alignItems: 'center'}} onPress={onShare}>
          <Text
            style={{
              padding: 12,
              marginTop: 20,
              borderRadius: 10,
              color: 'white',
              textAlign: 'center',
              backgroundColor: '#3ce55c',
              fontSize: Dimensions.get('window').width / 15,
              fontFamily: 'lucida grande',
            }}>
            Add sticker to Whatsapp
          </Text>
        </TouchableOpacity>
        <View style={styles.sectionList}>
          {arrList.length > 0 ? (
            <FlatList
              keyExtractor={(item, index) => item.id}
              data={arrList}
              numColumns="2"
              renderItem={(itemData) => (
                <View
                  style={{
                    width: '50%',
                  }}>
                  <TouchableOpacity
                    style={{
                      flex: 1,
                      minHeight: 300,
                      width: '100%',
                      padding: 10,
                    }}
                    activeOpacity={1}>
                    <ImageBackground
                      source={{uri: itemData.item.data_url}}
                      size="contain"
                      style={{
                        width: '100%',
                        height: '100%',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      imageStyle={{
                        resizeMode: 'contain',
                      }}></ImageBackground>
                  </TouchableOpacity>
                </View>
              )}
            />
          ) : (
            <View style={styles.textCard}>
              <Icon
                backgroundColor="white"
                name="wifi"
                color="black"
                style={{padding: 5}}
                size={50}
              />
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: Dimensions.get('window').width / 20,
                  fontFamily: 'lucida grande',
                }}>
                Turn on data to get beautiful image greetings!!
              </Text>
            </View>
          )}
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  sectionList: {
    flex: 1,
    // minHeight: 300,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textCard: {
    minHeight: 200,
    flexDirection: 'column',
    padding: 20,
    width: Dimensions.get('window').width - 80,
    backgroundColor: '#FFF',
    borderRadius: 20,
    marginHorizontal: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Stickers;
