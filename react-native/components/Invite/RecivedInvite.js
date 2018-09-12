import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Swipeout from 'rc-swipeout';
import {connect} from 'react-redux';
import {RejectInvite} from '../../actions/invitesAction';
import SQL from '../../Handlers/SQL';

const styles = StyleSheet.create({
    text: {
        fontSize: 21,
        color: '#ECF0F1',
    }

})


const { width, height } = Dimensions.get("window");

const RecivedInvite = (props) => {

    
Reject = async() => {
    try {
        SQL.RejectInvite(props.invite.Site.SiteId , props.invite.user.UserId, props.User.UserId);
        props.RejectInvite({siteId: props.invite.Site.SiteId, reciverId: props.invite.user.UserId});
    
    } catch (error) {
        console.error(errorr);
        
    }
 
}

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
                    onPress: Reject,
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

const mapDispatchToProps = (dispatch) => ({
    RejectInvite: (Invite) => dispatch(RejectInvite(Invite)),
})

const mapStateToProps = (state) => ({
    User: state.user,
});

export default connect(mapStateToProps, mapDispatchToProps)(RecivedInvite); 