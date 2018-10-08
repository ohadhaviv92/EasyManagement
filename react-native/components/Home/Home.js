import React, { Component } from 'react'
import { FlatList, View, RefreshControl, StyleSheet, Dimensions, Vibration } from 'react-native'
import PreviewSite from '../Site/PreviewSite';
import AddSite from '../Site/AddSite';
import { connect } from 'react-redux';
import Empty from '../General/Empty';
import { Icon } from 'react-native-elements';
import Modal from '../General/Modal';


const { width, height } = Dimensions.get("window");

class Home extends Component {


  state = {
    refreshing: false,
    modalVisible: false,
    siteStatusToShow: true,

  }


  _onRefresh = () => {

  }
  changeStatus = () => {
    Vibration.vibrate(500)
    this.setState((pervState) => ({ siteStatusToShow: !pervState.siteStatusToShow }))
  }
  openModal = () => this.setState((pervState) => ({ modalVisible: !pervState.modalVisible }))

  _ListEmptyComponent = () => <Empty />
  _ItemSeparatorComponent = () => <View style={{ width, height: 2, backgroundColor: 'white', marginVertical: 7 }}></View>
  _keyExtractor = (site) => site.SiteId.toString()

  _renderItem = (site) => <PreviewSite site={site.item} user={this.props.User} navigation={this.props.navigation} />
  render() {
    return (
      <View>

      <View style={{flexDirection: 'row'}}>
  
      <Icon
            type="ionicon"
            name="ios-add-circle-outline"
            size={40}
            color="#ECF0F1"
            underlayColor="transparent"
            onPress={this.openModal}
          />

        <View style={{justifyContent: 'center', alignItems: 'center', marginLeft: width/3}}>
        <Icon
          type="font-awesome"
          name="building"
          size={40}
          color={ this.state.siteStatusToShow ? "#3498DB": "#E74C3C"}
          underlayColor="transparent"
          onPress={this.changeStatus}
        />
        </View>
      </View> 


        <Modal Toggle={this.openModal} visible={this.state.modalVisible}>
          <AddSite navigation={this.props.navigation} Toggle={this.openModal}/>
        </Modal>

        <FlatList
          ListEmptyComponent={this._ListEmptyComponent}
          ItemSeparatorComponent={this._ItemSeparatorComponent}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
            />
          }
          data={this.props.Sites.filter(site => site.SiteStatus === this.state.siteStatusToShow)}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
        />
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E74C3C',
    marginTop: height / 2.5,
  },
  text: {
    fontSize: 21,
    color: '#ECF0F1',
  },
  Filter: {
    position: 'absolute',
    left: 0,

  }


})

const mapStateToProps = state => {
  return {
    Sites: state.sites,
    User: state.user
  }
}

export default connect(mapStateToProps)(Home);