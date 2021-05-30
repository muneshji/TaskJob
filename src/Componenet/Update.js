//import liraries
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
import { Card, TextInput } from 'react-native-paper';
import CommonHeader from './CommonHeader';
import AsyncStorage from '@react-native-community/async-storage';
const theme = {
    colors: {
        primary: "#FF0033",
        //  background: 'transparent',
        // text: colors.black_clr,
    }
}
// create a component
const Update = (props, navigation) => {
    //Name
    const [isLoading, setIsLoading] = useState(false)
    const [data, setData] = useState([])
    const [position, setText] = useState(props.navigation.getParam('subid', ''));
    const [Title, setTitle1] = useState('');
    const [title, setTitle] = useState(props.navigation.getParam('title', ''));
    const [from, setFrom] = useState(props.navigation.getParam('from', ''));
    const [companyName, setCompanyName] = useState('');
    const [location, setLocation] = useState('');
    const [workinTime, setWorkingTime] = useState('');

    useEffect(() => {
        AsyncStorage.getItem('data').then((value) => {
            if (value) {
                setData(JSON.parse(value))
                setTitle1(JSON.parse(value)[position].title)
                setCompanyName(JSON.parse(value)[position].Company_Name)
                setLocation(JSON.parse(value)[position].Location)
                setWorkingTime(JSON.parse(value)[position].time)
            }
        })

    }, []
    )

   

    const update = () => {

        if (Title) {
            if (companyName) {
                if (location) {
                    if(workinTime){
                        const data1 = [...data]
                                        data1[position].title = Title
                                        data1[position].Company_Name = companyName
                                        data1[position].time = workinTime
                                        data1[position].Location = location
                                       
                                        setData(data1)
                                        AsyncStorage.setItem('data', JSON.stringify(data));
                                        console.log("OldData",data)
                                        //   Alert.alert('jfndjdv')
                                        props.navigation.navigate('Home')

                    }else{
                        alert("Please enter working hours.");
                    }
                } else {
                    alert("Please enter location");
                }
            } else {
                alert("Please enter company name");
            }

        } else {
            alert("Please enter title of position");
        }
      
    }

    const gotoUpdate = () => {
        setTitle('UPDATE DETAILS')
    }
    const ViewDetail = ({ }) => {
        return (

            <View style={{ padding: 15 }}>
                <Text style={styles.txxV1}>Position Title</Text>
                <Text style={styles.Txtx_view}>
                    {from == 'Search'?props.navigation.getParam('jobTitle', ''):Title}
                </Text>

                <Text style={styles.txxV1}>Company Name</Text>
                <Text style={styles.Txtx_view}>
                {from == 'Search'?props.navigation.getParam('Company_Name', ''):companyName}  
                </Text>

                <Text style={styles.txxV1}>Working Hour</Text>
                <Text style={styles.Txtx_view}>
                {from == 'Search'?props.navigation.getParam('time', ''):workinTime} 
                </Text>

                <Text style={styles.txxV1}>Location</Text>
                <Text style={styles.Txtx_view}>
                {from == 'Search'?props.navigation.getParam('Location', ''):location}
                </Text>
               

                {/* <TouchableOpacity style={styles.bottomBUtton}
                    onPress={() => gotoUpdate()}>
                    <Text style={{ textAlign: "center", fontSize: 18, color: '#fff', paddingTop: 15, paddingBottom: 15 }} >
                        Update
                         </Text>
                </TouchableOpacity> */}
            </View>

        );
    };

    return (
        <>
            <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
            <CommonHeader title={title} navi={props.navigation}  from={'main'} />
            <ScrollView
            style={{  backgroundColor: '#ffffff',}}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}>

                <View
                    style={styles.Container}>
                    {title == 'UPDATE DETAILS' ?
                        <View>
                          
                            <View style={{ padding: 15 }}>
                                <TextInput style={styles.textInput}
                                    label="Position Title"
                                    theme={theme}
                                    keyboardType='email-address'
                                    placeholder="Enter Name"
                                    paddingVertical={5}
                                    mode='outlined'
                                    underlineColor='#1A1A1A'
                                    value={Title}
                                    onChangeText={(text) => setTitle1(text)} />

                                <TextInput style={styles.textInput}
                                    label="Company Name"
                                    theme={theme}
                                    keyboardType='email-address'
                                    placeholder="Enter Company Name"
                                    paddingVertical={5}
                                    mode='outlined'
                                    underlineColor='#1A1A1A'
                                    value={companyName}
                                    onChangeText={(text) => setCompanyName(text)} />

                                <TextInput style={styles.textInput}
                                    label="Working Hour"
                                    theme={theme}
                                    keyboardType='numeric'
                                    placeholder="Enter Working Hour"
                                    paddingVertical={5}
                                    mode='outlined'
                                    underlineColor='#1A1A1A'
                                    value={workinTime}
                                    onChangeText={(text) => setWorkingTime(text)} />

                                <TextInput style={styles.textInput}
                                    label="Location"
                                    theme={theme}
                                    placeholder="Enter Location"
                                    paddingVertical={5}
                                    mode='outlined'
                                    underlineColor='#1A1A1A'
                                    value={location}
                                    onChangeText={(text) => setLocation(text)} />

                              


                                <TouchableOpacity style={styles.bottomBUtton}
                                    onPress={() => update()}>
                                    <Text style={{ textAlign: "center", fontSize: 18, color: '#fff', paddingTop: 15, paddingBottom: 15 }} >
                                        Submit
                                 </Text>
                                </TouchableOpacity>

                            </View>
                           
                        </View>
                        :
                        <ViewDetail></ViewDetail>

                    }

                  
                </View>
            </ScrollView>
        </>
    );
};

//make this component available to the app
export default Update;
const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: '#ffffff',
        justifyContent: "center",


    },
    Review_Image: {
        height: 102, width: 102, borderRadius: 102 / 2,
        borderWidth: 1,
        marginTop: 40,
        marginBottom: 15,
        borderColor: '#FF0033',
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
    bottomBUtton: {
        flexDirection: "row",
        justifyContent: "center",
        alignSelf: "center",
        elevation: 3,
        backgroundColor: "#FF0033",
        width: "100%",
        borderTopStartRadius: 8,
        borderBottomStartRadius: 20,
        borderBottomEndRadius: 20,
        borderTopEndRadius: 8,
        marginTop: 40

    },
    textInput: {
        fontSize: 14,
        fontFamily: 'medium',
        marginTop: 15
    },
    M_Title: { fontSize: 16, color: '#414141', marginTop: 15, },
    sub_title: { fontSize: 14, color: '#000000', marginTop: 15, letterSpacing: 0.5 },
    sub_title2: { fontSize: 14, color: '#000000', marginTop: 5, letterSpacing: 0.5 },
    view: { backgroundColor: "#707070", height: 1, opacity: 0.2, marginTop: 15, },
    textBottom: {
        fontSize: 13,
        color: '#090708',
        flex: 0.5,
        width: '100%',
        paddingTop: 12,
        paddingBottom: 12,
        textAlign: 'center',
        alignItems: 'center',
    },
    Txtx_view: {
        height: 45,
        backgroundColor: '#fff',
        color: '#666666',
        fontSize: 14,
        marginTop: 10,
        borderColor: '#EAEAEA',
        borderRadius: 50,
        borderWidth: 1,
        paddingLeft: 15,
        paddingRight: 15,
        textAlignVertical: "center"
    },
    txxV1: {
        marginTop: 10,
        color: '#000'

    }

});