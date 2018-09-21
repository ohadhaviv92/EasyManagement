import React, { Component } from 'react'
import { FlatList, View, RefreshControl, StyleSheet, Dimensions,Vibration } from 'react-native'
import PreviewSite from '../Site/PreviewSite';
import AddSite from '../Site/AddSite';
import { connect } from 'react-redux';
import Empty from '../General/Empty';
import { Icon } from 'react-native-elements';
import Modal from '../General/Modal';

class Home extends Component {


    state = {
      refreshing: false,
      modalVisible: false,
      siteStatusToShow:true
    }


  _onRefresh = () => {
   
  }
  changeStatus = () =>{Vibration.vibrate(500); this.setState((pervState) => ({ siteStatusToShow: !pervState.siteStatusToShow }))}
  openModal = () => this.setState((pervState) => ({ modalVisible: !pervState.modalVisible }))

  _ListEmptyComponent = () => <Empty />
  _ItemSeparatorComponent = () => <View style={{ width, height: 2, backgroundColor: '#E74C3C', marginVertical: 7 }}></View>
  _keyExtractor = (site) => site.SiteId.toString()

_renderItem = (site) =><PreviewSite site={site.item} navigation={this.props.navigation} />
  render() {
    return (
      <View>
        
          <Icon
          type="MaterialIcons"
          name="filter-list"
          size={40}
          color="#ECF0F1"
          underlayColor="transparent"
          onPress={this.changeStatus}
        />
        
        
        <Icon
          type="ionicon"
          name="ios-add-circle-outline"
          size={40}
          color="#ECF0F1"
          underlayColor="transparent"
          onPress={this.openModal}
        />
        <Modal Toggle={this.openModal} visible={this.state.modalVisible}>
          <AddSite />
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
          data={this.props.Sites.filter(site=> site.SiteStatus === this.state.siteStatusToShow)}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
        />
      </View>
    )
  }
}


const { width, height } = Dimensions.get("window");

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
  Filter:{
    position:'absolute',
    left:0,
    
  }


})

const mapStateToProps = state => {
  return {
    Sites: state.sites
  }
}

export default connect(mapStateToProps)(Home);