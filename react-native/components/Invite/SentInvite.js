import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { Icon } from "react-native-elements";
import { DeleteInvite } from '../../actions/invitesAction';
import DropDownMenu from '../General/DropDownMenu';
import SQL from '../../Handlers/SQL';

const styles = StyleSheet.create({
    text: {
        fontSize: 21,
        color: '#ECF0F1'
    }

})


const { width, height } = Dimensions.get("window");

class SentInvite extends Component {

    state = {
        open: false
    }

    Delete = async () => {
        try {
            await SQL.DeleteInvite(this.props.invite.Site.SiteId, this.props.User.UserId, this.props.invite.user.UserId);
            this.props.DeleteInvite({ siteId: this.props.invite.Site.SiteId, reciverId: this.props.invite.user.UserId });

        } catch (error) {
            console.error(errorr);

        }

    }

    toggle = () => {
      this.setState((pervState) => ({open: !pervState.open}));
    }

    render() {
        return (

            <View>
                <View style={{ backgroundColor: "#2980B9", width }}>
                    <Text style={styles.text}> שם משתמש: {this.props.invite.user.UserName} </Text>
                    <Text style={styles.text}> אתר: {this.props.invite.Site.SiteName} </Text>
                    <Icon
                        type="ionicon"
                        name={this.state.open ?  'ios-arrow-down': 'ios-arrow-up' }
                        size={40}
                        color="#ECF0F1"
                        underlayColor="transparent"
                        onPress={this.toggle}
                    />
                </View>
                <DropDownMenu isOpen = {this.state.open}>
                    <Text style={styles.text}> שם: {this.props.invite.user.FirstName}, שם משפחה: {this.props.invite.user.LastName} </Text>
                </DropDownMenu>
            </View>
        );
    }
}


const mapDispatchToProps = (dispatch) => ({
    DeleteInvite: (Invite) => dispatch(DeleteInvite(Invite)),
})

const mapStateToProps = (state) => ({
    User: state.user,
});

export default connect(mapStateToProps, mapDispatchToProps)(SentInvite); 