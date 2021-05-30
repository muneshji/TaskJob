
import React, { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Modal } from 'react-native';

export default class Loader extends Component {
    render() {
        const{ isLoader } = this.props        
        return (          
                <>
                    {
                        isLoader ?                     
                            <View style={{position:'absolute',height:'100%',width:'100%', flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'center', alignItems: 'center' ,elevation :5}}>
                            <View style={{ backgroundColor: '#ffffff', borderRadius: 10, height: 130, width: 130, justifyContent: 'center', alignItems: 'center' }}>
                                <ActivityIndicator size="large" color="#D1414B" />
                            </View>
                            </View>
                                :<></>
                    }
                </>               
          
        );
    }
}

