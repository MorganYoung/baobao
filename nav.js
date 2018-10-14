import TabNavigator from "react-native-tab-navigator";
import Icon from "react-native-vector-icons/MaterialIcons";
import {Image} from "react-native";
import Home from "./home";
import Profile from "./profile";
import React, {Component} from "react";




import {Dimensions, View} from 'react-native'
import Main from "./src/components/Main";

const deviceW = Dimensions.get('window').width;

const basePx = 375;

export default class Nav extends Component{
    state = {
        selectedTab: 'home',
    };
    render() {
        return (
            <TabNavigator style={styles.container}>
                <TabNavigator.Item
                    selected={this.state.selectedTab === 'home'}
                    title="记录"
                    renderIcon={() => <Icon name="create" style={styles.actionButtonIcon2}/>}
                    renderSelectedIcon={() => <Image
                        source={{uri: 'http://sns-pic.bjcnc.scs.sohucs.com/ticon/lishi_tag_.png'}}
                        style={{width: 30, height: 30}}/>}
                    badgeText="1"
                    onPress={() => this.setState({selectedTab: 'home'})}>
                    <Home/>
                </TabNavigator.Item>
                <TabNavigator.Item
                    selected={this.state.selectedTab === 'profile'}
                    title="查看"
                    renderIcon={() => <Icon name="search" style={styles.actionButtonIcon2}/>}
                    renderSelectedIcon={() => <Image
                        source={{uri: 'http://sns-pic.bjcnc.scs.sohucs.com/ticon/shige_tag_.png'}}
                        style={{width: 30, height: 30}}/>}
                    onPress={() => this.setState({selectedTab: 'profile'})}>
                    <Profile/>
                </TabNavigator.Item>
            </TabNavigator>
        )
    }
}



