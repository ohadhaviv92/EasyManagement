import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
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
        this.setState((pervState) => ({ open: !pervState.open }));
    }


    render() {
        return (

            <View>
                <TouchableOpacity onPress={this.toggle}>
                    <View style={{
                        backgroundColor: "#2980B9",
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <Text style={styles.text}> משתמש: {this.props.invite.user.UserName} </Text>
                        <Text style={styles.text}> אתר: {this.props.invite.Site.SiteName} </Text>
                        <Icon
                            type="ionicon"
                            name={this.state.open ? 'ios-arrow-up' : 'ios-arrow-down'}
                            size={40}
                            color="#ECF0F1"
                            underlayColor="transparent"
                        />
                    </View>
                </TouchableOpacity>

                <DropDownMenu isOpen={this.state.open}>
                    <View>
                        <Icon
                            type="ionicon"
                            name='md-trash'
                            size={40}
                            containerStyle={{ paddingBottom: 20 }}
                            color="#E74C3C"
                            underlayColor="transparent"
                            onPress={this.Delete}
                        />
                    </View>
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