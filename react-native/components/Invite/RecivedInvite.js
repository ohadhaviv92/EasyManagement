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
                    text: 'accept',
                    onPress: () => console.log('accept'),
                    style: { backgroundColor: 'green', color: 'white' }
                },
                {
                    text: 'reject',
                    onPress: () => console.log('delete'),
                    style: { backgroundColor: 'red', color: 'white' }
                }
            ]}>
            <View style={{ backgroundColor: "#2980B9", width}}>
                <Text style={styles.text}> {props.invite.user.UserName} {props.invite.user.Email} </Text>
                <Text style={styles.text}> {props.invite.user.FirstName} {props.invite.user.LastName} </Text>
                <Text style={styles.text}> {props.invite.Site.SiteName} {props.invite.Site.SiteAddress} </Text>
            </View>
        </Swipeout>
    );

}

