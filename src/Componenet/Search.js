import React, { Component } from 'react';

import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    TextInput,
    Button,
    StatusBar,
    TouchableOpacity, BackHandler,
    Modal,
    FlatList,
    Image,
    ImageBackground,

} from 'react-native';
import Colors from '../Utility/Colors'
import { Card } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/EvilIcons';
//Dashboard Header
import CommonHeader from './CommonHeader';
import AsyncStorage from '@react-native-community/async-storage'


export default class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataValue: '',
            isShow: false,
            isConnect: false,
            datasource: [],

        }
        this.arrayholder = [];
    }
    componentDidMount() {
        this.GetSearchData()
        this.willFocusSubscription = this.props.navigation.addListener('willFocus', () => {
            this.GetSearchData()

        }
        );
    }
    componentWillUnmount() {
        this.willFocusSubscription.remove();
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    emptySearch = () => {
        this.setState({ dataValue: "" });
        this.setState({ isShow: true });
        this.GetSearchData()
    }

    onChangeText = (value) => {
        let searching = value;
        if (value) {
        } else {
            this.GetSearchData()
        }
        this.SearchFilterFunction(searching)
    }

    GetSearchData(searching) {
        AsyncStorage.getItem('data').then((value) => {
            if (value) {
                this.setState({
                    datasource: JSON.parse(value),

                },
                    function () {
                        this.arrayholder = JSON.parse(value)
                    })
                console.log("NewData", JSON.parse(value))

            }
        })

    }

    SearchFilterFunction(text) {
        //dataSource = '';    
        const newData = this.arrayholder.filter(function (item) {
            const itemData = item.title ? item.title.toUpperCase() : ''.toUpperCase();
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1;
        });
        console.log("NewData====\\\\\\", newData)
        if (newData.length <= 0) {
            this.setState({ isShow: true });
        } else {
            this.setState({ isShow: false });
        }

        this.setState({
            datasource: newData,
            search: text,
        });
    }



    renderSeparator = () => {
        return (
            <View style={{ backgroundColor: "#707070", height: 1, opacity: 0.2, marginTop: 15 }} />
        );
    };

    render() {
        const ItemList = (props) => {
            return (
                <TouchableOpacity style={styles.horizontal_View} onPress={() => {
                    this.emptySearch(),
                    props.navi("Update",
                    {
                        title: 'DETAILS',
                        from:'Search',
                      jobTitle: props.item.title,
                      Location: props.item.Location,
                      time: props.item.time,
                      Company_Name: props.item.Company_Name,
                     
                    });
      
        }}>
                    <Text style={{ fontSize: 14, width: '80%', }} >{props.item.title}</Text>
                    <Image
                        style={{ width: 18,
                            height: 18,color:'#000'}}
                        source={ require('../Utility/Image/search.png')}
                    /> 
                </TouchableOpacity>
            );
        };

        const SearchList = (props) => {
            return (
                this.state.dataValue ?
                    <Card style={styles.cardContainerP}>
                        {this.state.isShow ? <View style={{ alignSelf: "center", flex: 1, alignItems: "center", justifyContent: "center" }}>
                            <Text style={{ alignSelf: 'center', textAlign: "center", fontSize: 18 }}>NO DATA FOUND</Text>
                        </View> :
                            <FlatList style={{ margin: 9, flex: 1, flexDirection: "column" }}
                                data={this.state.datasource}
                                renderItem={({ item, index }) => {
                                    return <ItemList index={index} item={item} navi={this.props.navigation.navigate} />

                                }}
                                keyExtractor={(item, index) => index}
                                showsVerticalScrollIndicator={false}
                                showsHorizontalScrollIndicator={false}
                            />
                        }

                    </Card>
                    : null
            );
        };

        return (
            <>
                <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white_clr }}>
                    <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
                    <CommonHeader title={'Search'} navi={this.props.navigation}  from={''}/>

                    <View style={styles.MainContainer}>
                        <View style={{
                            marginTop: 10,
                            paddingLeft: 10,
                            paddingRight: 10
                        }}>


                            <View style={styles.Search_view}>
                            <Image
                        style={{ width: 18,
                            height: 18,color:'#000'}}
                        source={ require('../Utility/Image/search.png')}
                    /> 
                                <TextInput
                                    style={{ marginLeft: 10, width: '80%', height: 45 }}
                                    underlineColorAndroid='rgba(0,0,0,0)'
                                    placeholder="Search"
                                    keyboardType='email-address'
                                    placeholderTextColor='#000'
                                    returnKeyType="done"
                                    value={this.state.dataValue}
                                    onChangeText={(dataValue) => { this.setState({ dataValue }); this.onChangeText(dataValue); }}
                                ></TextInput>
                              
                            </View>
                            <SearchList />
                        </View>
                    </View>
                </SafeAreaView>
            </>
        )
    }
}

const styles = StyleSheet.create({
    MainContainer: {
        flex: 1,
        backgroundColor: Colors.Main_View_clr
        // padding: 10

    },
    cardContainerP: {
        backgroundColor: "#ffffff",
        borderRadius: 10,
        elevation: 3,
        marginTop: 10,
        marginBottom: 8,
        paddingLeft: 12,
        height: '70%',
        paddingRight: 12

    },
    header: {
        backgroundColor: Colors.white_clr,
        height: 43,
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center',
        paddingStart: 18,
        paddingEnd: 18,
        elevation: 2,

    },
    Search_view: {
        flexDirection: "row",
        alignItems: "center",
        elevation: 3,
        borderRadius: 30,
        paddingBottom: 3,
        paddingTop: 3,
        paddingLeft: 10,
        paddingRight: 10,
        //marginLeft:10,marginRight:10,
        backgroundColor: '#ffffff',
    },
    Recent_text: {
        marginRight: 10,
        elevation: 3,
        borderRadius: 30,
        paddingBottom: 10,
        paddingTop: 10,
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: '#ffffff',
    },
    Title_txt: { fontSize: 16, marginTop: 15 },
    horizontal_View: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 15 }
})