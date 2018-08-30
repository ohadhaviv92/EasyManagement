import React, { Component } from 'react'
import { Text, FlatList, View, RefreshControl, StyleSheet, Dimensions } from 'react-native'
import PreviewSite from '../Site/PreviewSite';
import { connect } from 'react-redux';

class Home extends Component {
  state = {
    refreshing: false
  }



  _onRefresh = () => {

  }

  _ListEmptyComponent = () => {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Empty</Text>
      </View>
    );
  }
  _ItemSeparatorComponent = () => <View style={{ width, height: 2, backgroundColor: '#E74C3C', marginVertical: 7 }}></View>
  _keyExtractor = (site) => site.SiteId.toString();
  _renderItem = (site) => <PreviewSite site={site.item} navigation={this.props.navigation} />
  render() {
    return (
      <View>

      <FlatList
          ListEmptyComponent={this._ListEmptyComponent}
          ItemSeparatorComponent={this._ItemSeparatorComponent}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
            />
          }
          data={this.props.Sites}
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
  }

})

const mapStateToProps = state => {
  return {
    Sites: state.sites
  }
}

export default connect(mapStateToProps)(Home);