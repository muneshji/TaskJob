import React from 'react';  
import {StyleSheet, Text, View,Button,Image} from 'react-native';  
import { createBottomTabNavigator, createAppContainer,BackHandler} from 'react-navigation';  
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';  
import Icon from 'react-native-vector-icons/Ionicons';  

import Search from '../Componenet/Search';
import Home from '../Componenet/Home'

import colors from '../Utility/Colors'



const BottomTab = (props) => {  
   
 
    console.disableYellowBox =true;
    return (  
       
        <View style={styles.container}>  
         
        </View>  
    );  
  }  
 

 
const styles = StyleSheet.create({  
    container: {  
        flex: 1,  
        justifyContent: 'center',  
        alignItems: 'center'  
    },  
});  
const TabNavigator = createMaterialBottomTabNavigator(  
    {  
        Home: { screen: Home,  
            navigationOptions:{  
                tabBarLabel:'Home',  
                tabBarIcon: ({ tintColor }) => (  
                    <View>  
                        <Image
                        style={{ width: 18,
                            height: 18,tintColor:tintColor}}
                        source={ require('../Utility/Image/home.png')}
                    />  
                    </View>),  
            }  
        },  
        Search: { screen: Search,  
            navigationOptions:{  
                tabBarLabel:'Search',  
                tabBarIcon: ({ tintColor }) => (  
                    <View>  
                         <Image
                        style={{ width: 18,
                            height: 18,tintColor:tintColor}}
                        source={ require('../Utility/Image/search.png')}
                    /> 
                    </View>),  
                activeColor: '#ffffff',  
              
            }  
        },  
       
       
    },  
    {  
      initialRouteName: "Home",  
      activeColor: '#ffffff',  
      barStyle: { backgroundColor: colors.red_clr, },  
      backBehavior : 'history'
    
    },  
);  
  
export default createAppContainer(TabNavigator);  