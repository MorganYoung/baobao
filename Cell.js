import React, {PureComponent} from 'react'
import {View, Text, StyleSheet, TouchableOpacity, Image, PixelRatio} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';
import moment from 'moment';

const color = {
    theme: '#06C1AE',
    border: '#e0e0e0',
    background: '#f3f3f3'
}

class Cell extends PureComponent {

    render() {
        console.log('render cell')
        let {info} = this.props
        //info.imageUrl = info.imageUrl.replace('w.h', '160.0')

        return (
            <TouchableOpacity style={styles.container} onPress={this.props.onPress}>

                <Icon name={Cell.getActionName(info.action)} style={styles.icon}/>
                <View style={styles.rightContainer}>
                    <Text style={styles.h1}>{info.action}</Text>
                    <View>
                    </View>
                    {/*<Text style={styles.p} numberOfLines={0} style={{marginTop: 8}}>{moment(info.time).format("YYYY-MM-DD HH:mm:ss")}</Text>*/}
                    <View style={{flex: 1, justifyContent: 'flex-end'}}>
                        <Text style={[styles.h1, styles.price]}>{moment(info.time).format("YYYY-MM-DD HH:mm:ss")}</Text>
                    </View>

                </View>
            </TouchableOpacity>
        )
    }

    static getActionName(action) {
        switch (action) {
            case "拉粑粑了":
                return "airline-seat-legroom-reduced";
            case "尿哗哗了":
                return "pool";
            case "吃饭了":
                return "local-dining";
            case "喝水了":
                return "local-cafe";
            case "睡觉了":
                return "local-hotel";
            default :
                return "all-inclusive";
        }
    }

}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 10,
        borderBottomWidth: 1 / PixelRatio.get(),
        borderColor: color.border,
        backgroundColor: 'white',
    },
    icon: {
        width:80,
        height:60,
        fontSize: 30,
        textAlign: 'center',
        borderRadius: 5,
    },
    rightContainer: {
        flex: 1,
        paddingLeft: 20,
        paddingRight: 10,
    },
    price: {
        color: color.theme
    },
    h1: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#222222',
    },
    p: {
        fontSize: 13,
        color: '#777777',
    },
})

export default Cell