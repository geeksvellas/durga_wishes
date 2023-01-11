import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import {createAppContainer} from 'react-navigation';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import {StyleSheet, View} from 'react-native';
import Cards from './Cards';
import Images from './Images';
import Stickers from './Stickers';
class TextScreen extends React.Component {
  render() {
    const {params} = this.props.navigation.state;
    return <Cards textData={params.textData} inputText={params.inputText} />;
  }
}

class ImageScreen extends React.Component {
  render() {
    const {params} = this.props.navigation.state;
    return <Images imageData={params.imageData} inputText={params.inputText} />;
  }
}
class StickerScreen extends React.Component {
  render() {
    const {params} = this.props.navigation.state;
    return (
      <Stickers imageData={params.stickerData} inputText={params.inputText} />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const Details = createMaterialBottomTabNavigator(
  {
    Text: {
      screen: TextScreen,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => (
          <View>
            <Icon
              style={[{color: tintColor}]}
              size={25}
              name={'md-chatbubble-ellipses-outline'}
            />
          </View>
        ),
      },
    },
    Image: {
      screen: ImageScreen,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => (
          <View>
            <Icon
              style={[{color: tintColor}]}
              size={25}
              name={'image-outline'}
            />
          </View>
        ),
        activeColor: '#ffffff',
        inactiveColor: '#92c5c2',
        barStyle: {backgroundColor: '#7d3aae'},
      },
    },
    Sticker: {
      screen: StickerScreen,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => (
          <View>
            <Icon2
              style={[{color: tintColor}]}
              size={25}
              name={'sticker-emoji'}
            />
          </View>
        ),
        activeColor: '#ffffff',
        inactiveColor: '#92c5c2',
        barStyle: {backgroundColor: '#7d3aae'},
      },
    },
  },
  {
    initialRouteName: 'Text',
    activeColor: '#ffffff',
    inactiveColor: '#bda1f7',
    barStyle: {backgroundColor: '#7d3aae'},
  },
);

export default createAppContainer(Details);
