import React, {Component} from 'react';
import {View, Alert} from 'react-native';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from './styles';
import cfg from './const';

export default class Home extends Component {

    _lababa() {
        Home.recordAction('拉粑粑了');
    }

    _niaohuahua() {
        Home.recordAction('尿哗哗了');
    }

    _eat() {
        Home.recordAction('吃饭了');
    }

    _drink() {
        Home.recordAction('喝水了');
    }

    _sleep() {
        Home.recordAction('睡觉了');
    }

    render() {
        return (
            <View style={{flex: 1, backgroundColor: '#f3f3f3'}}>
                <ActionButton buttonColor="rgba(231,76,60,1)">
                    <ActionButton.Item buttonColor='#9b59b6' title="拉粑粑了" onPress={this._lababa}>
                        <Icon name="airline-seat-legroom-reduced" style={styles.actionButtonIcon}/>
                    </ActionButton.Item>
                    <ActionButton.Item buttonColor='#3498db' title="尿哗哗了" onPress={this._niaohuahua}>
                        <Icon name="pool" style={styles.actionButtonIcon}/>
                    </ActionButton.Item>
                    <ActionButton.Item buttonColor='#1abc9c' title="吃饭了" onPress={this._eat}>
                        <Icon name="local-dining" style={styles.actionButtonIcon}/>
                    </ActionButton.Item>
                    <ActionButton.Item buttonColor='#CD661D' title="喝水了" onPress={this._drink}>
                        <Icon name="local-cafe" style={styles.actionButtonIcon}/>
                    </ActionButton.Item>
                    <ActionButton.Item buttonColor='#8FBC8F' title="睡觉了" onPress={this._sleep}>
                        <Icon name="local-hotel" style={styles.actionButtonIcon}/>
                    </ActionButton.Item>
                </ActionButton>
            </View>
        )
    }

    static recordAction(action) {
        //Alert.alert("record : " + action);
        fetch(cfg.DOMAIN + "record", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                action: action,
                time: new Date().getTime(),
                uid: 1001
            })
        })
        .then(resp => resp.json())
        .then(respJson => {
            Alert.alert("记录成功:" + JSON.stringify(respJson));
        })
        .catch(err => {
            Alert.alert("记录失败请重试:" + err);
        });
    }
}


