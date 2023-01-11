import React, {useState} from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';

const LanguageList = (props) => {
  const lang = props.langArray;

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#000000aa',
        justifyContent: 'center',
      }}>
      <View>
        <FlatList
          style={{
            margin: 40,
          }}
          showsHorizontalScrollIndicator={false}
          horizontal={false}
          keyExtractor={(item, index) => item.id}
          data={lang}
          renderItem={(itemData) => (
            <TouchableOpacity
              onPress={() => props.onLanguage(itemData.item.lang)}>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'rgba(255,255,255,1)',
                  borderColor: 'grey',
                  borderWidth: 1,
                  padding: 20,

                  borderRadius: 50,
                }}>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: '700',
                    fontFamily: 'lucida grande',
                  }}>
                  {itemData.item.lang}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
};
export default LanguageList;
