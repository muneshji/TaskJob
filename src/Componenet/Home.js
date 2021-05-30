import React, { Component, useState, useEffect } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
   
    ScrollView,
    StatusBar,
    Alert, StyleSheet, FlatList
} from 'react-native';
import { Card } from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';

import CommonHeader from './CommonHeader';

// create a component
const Home = (props, navigation) => {
    //Name
    const [isLoading, setIsLoading] = useState(false)
    const [data, setData] = useState([])



    useEffect(() => {
      //  setIsLoading(true)
      const data1 = [{"title": "React Native Developer", "Location": "New Delhi", "time": "48 Hours per week",'Company_Name':"Airtel"},
      {"title": "React Native Developer", "Location": "New Delhi", "time": "48 Hours per week",'Company_Name':"TCS"},
      {"title": "PHP Developer", "Location": "Gurugram", "time": "48 Hours per week",'Company_Name':"Genpect"},
      {"title": "Android Developer", "Location": "Noida", "time": "48 Hours per week",'Company_Name':"Infosys"},
      {"title": "Ios Developer", "Location": "Banglore", "time": "48 Hours per week",'Company_Name':"Abc Technologies"}]
      setData(data1)
      AsyncStorage.setItem('data', JSON.stringify(data1));
        props.navigation.addListener('didFocus',
        payload => {
                console.log("NewData")
                 AsyncStorage.getItem('data').then((value) => {
                    if (value) {     
                        setData(JSON.parse(value))
                        console.log("NewData",JSON.parse(value))
                      
                    }
                })
            }
        );
    

    }, []
    )

    const removeData = (index) => {
        if(data.length >1){
           let newData = [...data]; //copy array from prevState
            newData.splice(index, 1); // remove element
            setData(newData);
        }
       
      };
    const RenderCardList = (item, index) => {
        console.disableYellowBox = true;
        return (
            <Card style={styles.cardItem}>
                <View style={{ marginTop: 1, }}>
                    <View style={[styles.hor_view, { padding: 10 }]}>
                       
                        <View style={{ flexDirection: "column", marginLeft: 10, marginBottom: 5 }}>
                            <Text style={styles.M_Title}>{item.title}</Text>
                            <Text style={styles.sub_title}>Company : {item.Company_Name}</Text>
                            <Text style={styles.sub_title}>Working : {item.time}</Text>
                            <Text style={styles.sub_title}>Location : {item.Location}</Text>

                        </View>
                        <TouchableOpacity style={styles.uper_view}
                        onPress={() =>removeData()}>
                        <View >
                            <Text style={styles.uper_txt}>Delete</Text>
                        </View>
                        </TouchableOpacity>
                    </View>

                    <View
                        style={{
                            backgroundColor: '#707070',
                            height: 1.5,
                            opacity: 0.2,
                            marginTop: 15,
                        }}
                    />

                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        <TouchableOpacity style={[styles.textBottom, { backgroundColor: '#2196f3', borderBottomLeftRadius: 10 }]}
                            onPress={() => props.navigation.navigate('Update',
                                {
                                    subid: +index,
                                    title: 'DETAILS',
                                    from:'View'
                                })}>
                            <Text style={{ color: '#fff' }}
                            >VIEW</Text>
                        </TouchableOpacity>
                        <View style={{ backgroundColor: '#707070', width: 1.5, opacity: 0.2 }} />

                        <TouchableOpacity style={[styles.textBottom, { backgroundColor: '#FF0033', borderBottomRightRadius: 10 }]}
                            onPress={() => props.navigation.navigate('Update',
                                {
                                    subid: +index,
                                    title: 'UPDATE DETAILS',
                                    from:'update'
                                })} >
                            <Text style={{ color: '#fff' }}
                            >UPDATE</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </Card>

        );
    };
   
    return (
        <>
            <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
            <CommonHeader title={'Home'} navi={props.navigation} from={''} />
            <View
                style={styles.Container}>
                <FlatList
                    style={{ flex: 1, flexDirection: 'column' }}
                    data={data}
                    renderItem={({ item, index }) => {
                        return RenderCardList(item, index)
                    }}
                    keyExtractor={(item, index) => index.toString()}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                />
              
            </View>

        </>
    );
};

//make this component available to the app
export default Home;


const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: '#E0E0E0',

    },
    cardItem: {
        backgroundColor: '#ffffff',
        borderRadius: 10,
        paddingTop: 0,
        elevation: 3,
        marginTop: 8,
        marginBottom: 8,
        marginStart: 16,
        marginEnd: 16,
    },
    hor_view: { flexDirection: "row", width: '100%', },
    uper_view: { flexDirection: "row", position: "absolute", right: 10, top: 10, justifyContent: "center", alignItems: "center" },
    M_Title: { fontSize: 16, color: '#000000',},

    uper_txt: {
        fontSize: 13, textAlign: "center", color: '#090708',
        fontFamily: "regular", backgroundColor: '#fff',
        elevation: 1, borderRadius: 30, paddingBottom: 6, paddingTop: 6, paddingLeft: 15, paddingRight: 15
    },
    sub_title: { fontSize: 14, color: '#414141', marginTop: 5, letterSpacing: 0.5 },

    view: { backgroundColor: "#707070", height: 1, opacity: 0.2, marginTop: 15, },
    textBottom: {
        fontSize: 13,
        color: '#ffffff',
        flex: 0.5,
        width: '100%',
        paddingTop: 12,
        paddingBottom: 12,
        textAlign: 'center',
        alignItems: 'center',
        elevation: 5

    },
    Review_Image: {
        height: 80, width: 80, borderRadius: 80 / 2,
        borderColor: '#FF0033',
        borderWidth: 1,

    },
});