import React, {useState} from 'react';
import ShareImage from 'react-native-share';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
  ImageBackground,
  Modal,
  Text,
} from 'react-native';
import {day_title, interstitial_key2, banner_key2} from './Constants';
import image_base from '../assets/images.json';
import {AdMobBanner, AdMobInterstitial} from 'react-native-admob';
const Images = (props) => {
  const [modalImage, setModalImage] = useState('');
  const hideModal = () => {
    setModalVisible(false);
  };
  const [bAdLoaded, setbAdLoaded] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const showModal = (image_data) => {
    // console.log(image_data);

    setModalImage(image_data);
    setModalVisible(true);
  };

  const onShare = (imagebase64) => {
    console.log(imagebase64);

    if (!bAdLoaded) {
      AdMobInterstitial.setAdUnitID(interstitial_key2);
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
      openShare(imagebase64);
    }
  };

  const openShare = async (imagebase64) => {
    const shareOptions = {
      title: 'Share via',
      message:
        day_title +
        ' to you!!' +
        (props.inputText !== '' ? '\n -' + props.inputText : ''),
      url: imagebase64,
      filename: day_title, // only for base64 file in Android
    };
    // ShareImage.shareSingle(shareOptions);
    ShareImage.open(shareOptions)
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
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      imageStyle={{
        resizeMode: 'cover',
      }}>
      <View style={{flex: 1, width: '100%'}}>
        <View>
          <AdMobBanner
            adSize="fullBanner"
            adUnitID={banner_key2}
            onAdFailedToLoad={(error) => console.log(error)}
          />
        </View>
        <View style={styles.sectionList}>
          {image_base.wishes.length > 0 ? (
            <FlatList
              keyExtractor={(item, index) => item.id}
              data={image_base.wishes}
              renderItem={(itemData) => (
                <View>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => showModal(itemData.item)}>
                    <Image
                      source={{uri: itemData.item.data_url}}
                      onLoad={() => console.log('Image loaded')}
                      resizeMode="contain"
                      style={{
                        marginVertical: 20,
                        width: Dimensions.get('window').width - 20,
                        minHeight: 500,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    />
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
                onPress={hideModal}
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
        <Modal
          animationType="none"
          transparent={true}
          visible={modalVisible}
          onRequestClose={hideModal}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(0,0,0,0.7)',
            }}>
            <Image
              source={{uri: modalImage.data_url}}
              resizeMode="contain"
              style={{
                width: Dimensions.get('window').width - 20,
                alignContent: 'center',
                justifyContent: 'center',
                height: 400,
              }}
            />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                padding: 20,
              }}>
              <Icon
                backgroundColor="white"
                name="window-close"
                color="white"
                onPress={hideModal}
                style={{padding: 5}}
                size={50}
              />
              <Icon
                backgroundColor="white"
                name="share-alt-square"
                color="white"
                style={{padding: 5}}
                onPress={onShare.bind(this, modalImage.data_url)}
                size={50}
              />
            </View>
          </View>
        </Modal>
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

export default Images;
