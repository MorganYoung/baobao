/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    Image,
    Platform
} from 'react-native';
import {Dimensions, View} from 'react-native'

function px2dp(px) {
    return px * deviceW / basePx
}


import Main from './src/components/Main';
import Nav from './nav';

export default class HelloWorld extends Component {
    state = {
        login:false
    };

    render() {
        if (this.state.login) {
            return (
                <Nav/>
            );

        } else {
            return (
                <View style={styles.container}>
                    <Main />
                </View>
            )
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
});
