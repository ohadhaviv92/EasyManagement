import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Swipeout from 'rc-swipeout';

const styles = StyleSheet.create({
    text: {
        fontSize: 21,
        color: '#ECF0F1',
    }

})


const { width, height } = Dimensions.get("window");

export default (props) => {

    return (
        <Swipeout
            right={[
                {
                    text: 'delete',
                    onPress: () => console.log('delete'),
                    style: { backgroundColor: 'red', color: 'white' }
                }
            ]}>
            <View style={{ backgroundColor: "#2980B9", width}}>
                <Text style={styles.text}> שם משתמש: {props.invite.user.UserName} אימייל: {props.invite.user.Email} </Text>
                <Text style={styles.text}> שם: {props.invite.user.FirstName}, שם משפחה: {props.invite.user.LastName} </Text>
                <Text style={styles.text}> אתר: {props.invite.Site.SiteName} מיקום: {props.invite.Site.SiteAddress} </Text>
            </View>
        </Swipeout>
    );

}

