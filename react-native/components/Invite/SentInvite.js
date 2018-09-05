import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Swipeout from 'rc-swipeout';
import {connect} from 'react-redux';
import {DeleteInvite} from '../../actions/invitesAction';
import SQL from '../../Handlers/SQL';

const styles = StyleSheet.create({
    text: {
        fontSize: 21,
        color: '#ECF0F1',
    }

})


const { width, height } = Dimensions.get("window");

SentInvite = (props) => {

Delete = async() => {
    try {
        SQL.DeleteInvite(props.invite.Site.SiteId ,props.User.UserId, props.invite.user.UserId);
        props.DeleteInvite({siteId: props.invite.Site.SiteId, reciverId: props.invite.user.UserId});
    
    } catch (error) {
        console.error(errorr);
        
    }
 
}

    return (
        <Swipeout
            right={[
                {
                    text: 'delete',
                    onPress: Delete,
                    style: { backgroundColor: 'red', color: 'white' }
                }
            ]}>
            <View style={{ backgroundColor: "#2980B9", width}}>
                <Text style={styles.text}> שם משתמש: {props.invite.user.UserName} </Text>
                <Text style={styles.text}> שם: {props.invite.user.FirstName}, שם משפחה: {props.invite.user.LastName} </Text>
                <Text style={styles.text}> אתר: {props.invite.Site.SiteName} </Text>
            </View>
        </Swipeout>
    );

}


const mapDispatchToProps = (dispatch) => ({
    DeleteInvite: (Invite) => dispatch(DeleteInvite(Invite)),
})

const mapStateToProps = (state) => ({
    User: state.user,
});

export default connect(mapStateToProps, mapDispatchToProps)(SentInvite); 