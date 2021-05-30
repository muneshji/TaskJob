import React from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';

import colors from '../Utility/Colors'


const CommonHeader = (props) => {

  return (
    <View style={{
      backgroundColor: colors.red_clr,
      height: 50,
      flexDirection: 'row',
      alignContent: 'center',
      alignItems: 'center',
      paddingStart: 18,
      paddingEnd: 18,
      elevation: 2,
      justifyContent: "center"
    }}>


      {props.from == 'main' ?<TouchableOpacity style={{ position: 'absolute', left: 20 }}

onPress={() => { props.navi.goBack() }}>

<Image
  style={{
    width: 10,
    height: 18, color: '#fff'
  }}
  source={require('../Utility/Image/ic_back.png')}
/>
</TouchableOpacity>  :null}
         

      <Text
        style={{ color: '#fff', fontSize: 16, marginStart: 10 }}>
        {props.title}
      </Text>
    </View>
  );
};

export default CommonHeader;
