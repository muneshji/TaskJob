//import liraries
import React, { Component, useState, useEffect } from 'react';


import {
    View,
    Text,
    Image,
    TouchableOpacity,
    AsyncStorage,
    ScrollView,
    StatusBar,
    Alert, StyleSheet, FlatList
} from 'react-native';
import { Card } from 'react-native-paper';

import colors from '../Utility/Colors'
import Loader from '../Utility/Loader'
import CommonHeader from './CommonHeader';

// create a component
const Detail = (props, navigation) => {
    //Name
    const [isLoading, setIsLoading] = useState(false)
    const [data, setData] = useState([])
    useEffect(() => {
        setIsLoading(true)
        fetch('https://jsonplaceholder.typicode.com/users', { method: 'GET', }).then((response) => response.json()).then((responseJson) => {
             setIsLoading(false)
            setData(responseJson)

        }).catch((error) => {
            setIsLoading(false)
            Alert.alert(error.message)
        });
    }, []
    )
    const RenderCardList = ({ item }) => {
        console.disableYellowBox =true;
        return (
            <Card style={styles.cardItem}>
                <View >
                    
                    
                    <View
            style={{
              backgroundColor: '#707070',
              height: 1,
              opacity: 0.2,
              marginTop: 15,
            }}
          />
  
          <View style={{ flex: 1, flexDirection: 'row' }}>
  
            <Text style={styles.textBottom} >VIEW</Text>
  
            <View style={{ backgroundColor: '#707070', width: 1, opacity: 0.2 }} />
  
            <Text style={[styles.textBottom, styles.fontRegular]} >UPDATE</Text>
  
          </View>
                </View>
            </Card>

        );
    };
    return (
        <>
            <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
            <CommonHeader title={'Detail'} navi={props.navigation} />
            <View
                style={styles.Container}>
                <FlatList
                    style={{ flex: 1, flexDirection: 'column' }}
                    data={data}
                    renderItem={({ item }) => {
                        return <RenderCardList item={item} />;
                    }}
                    keyExtractor={(item, index) => index.toString()}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                />
                <Loader isLoader={isLoading}></Loader>
            </View>

        </>
    );
};

//make this component available to the app
export default Detail;


const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: colors.Main_View_clr,
      
    },
    cardItem: {
        backgroundColor: '#ffffff',
        borderRadius: 10,
        paddingTop: 0,
        elevation: 3,
        paddingBottom: 6,
        marginTop: 8,
        marginBottom: 8,
        marginStart: 16,
        marginEnd: 16,
    },
    M_Title:{ fontSize: 16, color: '#414141', marginTop: 15 ,},
    sub_title:{ fontSize: 14, color: '#000000',marginTop: 15,letterSpacing:0.5 },
    sub_title2:{ fontSize: 14, color: '#000000',marginTop: 5,letterSpacing:0.5 },
     view: { backgroundColor: "#707070", height: 1, opacity: 0.2, marginTop: 15, },
     textBottom: {
        fontSize: 13,
        color: '#090708',
        flex: 0.5,
        width: '100%',
        paddingTop: 12,
        paddingBottom: 12,
        textAlign: 'center',
        alignItems: 'center',},
});