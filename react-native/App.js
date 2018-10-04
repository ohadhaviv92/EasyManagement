import React from "react";
import { createSwitchNavigator } from "react-navigation";
import { Asset, AppLoading } from 'expo';
import {I18nManager} from 'react-native';
import AuthNav from "./AuthNav";
import HomeNav from "./HomeNav";
import configureStore from "./store/configureStore";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

const store = (configureStore()).store;
const persistor = (configureStore()).persistor;
export default class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      isReady: false
    }
    I18nManager.forceRTL(true);
  }


  

  async _cacheResourcesAsync() {
    const images = [
      require('./assets/House.png'),
      require('./assets/default_user_pic.png')
    ];

    const cacheImages = images.map((image) => {
      return Asset.fromModule(image).downloadAsync();
    });
    return Promise.all(cacheImages)

  }

  render() {
    return (
      this.state.isReady ? 
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AppNav />
        </PersistGate>
      </Provider> 
      :
      <AppLoading
        startAsync={this._cacheResourcesAsync}
        onFinish={() => this.setState({ isReady: true })}
        onError={console.warn}
      />
    );
  }
}

const AppNav = createSwitchNavigator({
  AuthNav,
  HomeNav
});
