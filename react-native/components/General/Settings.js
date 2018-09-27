import React, { Component } from 'react'
import { Text, View ,Button, Image,StyleSheet} from 'react-native'
import { ImagePicker,Permissions,Constants } from 'expo';
import SQL from '../../Handlers/SQL'

let imageUri;
export default class Settings extends Component {
  state = {
    pickerResult: null,
  };

  _pickImg = async () => {
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      base64: true,
      allowsEditing: false,
      aspect: [4, 3],
    });
    

    this.setState({
      pickerResult,
    });
  };

  _upload = async () => {
       await SQL.UploadImg(imageUri);
  };


  render() {
    let { pickerResult } = this.state;
     imageUri = pickerResult ? `data:image/jpg;base64,${pickerResult.base64}` : null;
    
    
    
    return (
      <View style={styles.container}>
        <Button onPress={this._pickImg} title="Open Picker" />
        {pickerResult
          ? <Image
              source={{uri: imageUri}}
              style={{ width: 200, height: 200 }}
            />
          : null}
        {pickerResult
          ? <Text style={styles.paragraph}>
              Keys on pickerResult:
              {' '}
              {JSON.stringify(Object.keys(pickerResult))}
            </Text>
          : null}
             <Button onPress={this._upload} title="upload" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  },
});