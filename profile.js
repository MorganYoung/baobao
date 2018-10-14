import React, { Component } from 'react'
import { View, StyleSheet, Text, Platform, Alert } from 'react-native'
import RefreshListView, { RefreshState } from 'react-native-refresh-list-view'
import Cell from './Cell'
import cfg from './const'

class Profile extends Component {
    state: {
        dataList: Array<any>,
        refreshState: number,
        index: int,
        page: int
    }

    constructor(props) {
        super(props)

        this.state = {
            dataList: [],
            refreshState: RefreshState.Idle,
            index:0,
            page:10,
        }
    }

    componentDidMount() {
        this.onHeaderRefresh()
    }

    onHeaderRefresh = () => {
        this.setState({ refreshState: RefreshState.HeaderRefreshing })

        // 模拟网络请求
        /*setTimeout(() => {
            // 模拟网络加载失败的情况
            /!*if (Math.random() < 0.3) {
                this.setState({ refreshState: RefreshState.Failure })
                return
            }*!/


        }, 2000)*/
        //获取测试数据

        this.getTestList(true, (dataList) => {
            // Alert.alert("data list size " + dataList.length)
            this.setState({
                dataList: dataList,
                refreshState: dataList.length < 1 ? RefreshState.EmptyData : RefreshState.Idle,
            })
        })

        /*this.setState({
            dataList: dataList,
            refreshState: dataList.length < 1 ? RefreshState.EmptyData : RefreshState.Idle,
        })*/
    }

    onFooterRefresh = () => {
        this.setState({ refreshState: RefreshState.FooterRefreshing })
        //获取测试数据
        this.getTestList(false, (dataList) => {
            this.setState({
                dataList: this.state.dataList.concat(dataList),
                refreshState: dataList.length < this.state.page ? RefreshState.NoMoreData : RefreshState.Idle,
            })
        })


        // 模拟网络请求
        /*setTimeout(() => {
            // 模拟网络加载失败的情况
            if (Math.random() < 0.2) {
                this.setState({ refreshState: RefreshState.Failure })
                return
            }


        }, 2000)*/
    }

    // 获取测试数据
    getTestList(isReload: boolean, callback): Array<Object> {
        try {
            // 注意这里的await语句，其所在的函数必须有async关键字声明
            let index = 0;
            let page = 10;
            if (isReload) {
                this.setState({
                    index:0
                })
                index = 0;
            } else {
                index = this.state.index + page;
                this.setState({
                    index: index
                })
            }
            //Alert.alert("isReload: " +isReload+ " index:" + this.state.index);
            fetch(cfg.DOMAIN + "record/list", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    uid: 1001,
                    index:  index ,
                    page: page
                })
            })
            .then(response =>  response.json())
            .then(responseData => {
                callback(responseData)
            }).catch((error) => {
                Alert.alert(error);
            });

        } catch (error) {
            console.error(error);
        }
        // let newList = testData.map((data) => {
        //     return {
        //         imageUrl: data.squareimgurl,
        //         title: data.mname,
        //         subtitle: `[${data.range}]${data.title}`,
        //         price: data.price,
        //     }
        // })
        //return isReload ? (Math.random() < 0.2 ? [] : newList) : [...this.state.dataList, ...newList]
    }

    keyExtractor = (item: any, index: number) => {
        return item.id + "";
    }

    renderCell = (info: Object) => {
        return <Cell info={info.item} />
    }

    render() {
        console.log('render scene')
        return (
            <View style={styles.container}>
                <RefreshListView
                    data={this.state.dataList}
                    keyExtractor={this.keyExtractor}
                    renderItem={this.renderCell}
                    refreshState={this.state.refreshState}
                    onHeaderRefresh={this.onHeaderRefresh}
                    onFooterRefresh={this.onFooterRefresh}

                    // 可选
                    footerRefreshingText='玩命加载中 >.<'
                    footerFailureText='我擦嘞，居然失败了 =.=!'
                    footerNoMoreDataText='-我是有底线的-'
                    footerEmptyDataText='-好像什么东西都没有-'
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Platform.OS == 'ios' ? 20 : 0,
    },
    title: {
        fontSize: 18,
        height: 84,
        textAlign: 'center'
    }
})

export default Profile