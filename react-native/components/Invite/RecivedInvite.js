import React, {Component} from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { RejectInvite } from '../../actions/invitesAction';
import { addSites } from '../../actions/siteAction';
import {Icon} from 'react-native-elements';
import DropDownMenu from '../General/DropDownMenu';
import SQL from '../../Handlers/SQL';

const styles = StyleSheet.create({
    text: {
        fontSize: 21,
        color: '#ECF0F1',
    }

})


const { width, height } = Dimensions.get("window");

class RecivedInvite extends Component {

    state = {
        open: false
    }

    toggle = () => {
        this.setState((pervState) => ({ open: !pervState.open }));
    }


    Confirm = async () => {
        const site = await SQL.ConfirmInvite(this.props.invite.Site.SiteId, this.props.invite.user.UserId, this.props.User.UserId);
        await this.props.RejectInvite({ siteId: this.props.invite.Site.SiteId, reciverId: this.props.invite.user.UserId });
        await this.props.addSites([site.Site]);
    }

    Reject = async () => {
        try {
            SQL.RejectInvite(this.props.invite.Site.SiteId, this.props.invite.user.UserId, this.props.User.UserId);
            await this.props.RejectInvite({ siteId: this.props.invite.Site.SiteId, reciverId: this.props.invite.user.UserId });

        } catch (error) {
            console.error(error);

        }

    }

    render(){
    return (
        <View>


            <View style={{ backgroundColor: "#2980B9", width }}>
                <Text style={styles.text}> {this.props.invite.user.UserName} {this.props.invite.user.Email} </Text>
                <Icon
                        type="ionicon"
                        name={this.state.open ? 'ios-arrow-up' : 'ios-arrow-down'}
                        size={40}
                        color="#ECF0F1"
                        underlayColor="transparent"
                        onPress={this.toggle}
                    />
            </View>

            <DropDownMenu isOpen={this.state.open}>
                <View>
                    <Text style={styles.text}> {this.props.invite.user.FirstName} {this.props.invite.user.LastName} </Text>
                    <Text style={styles.text}> {this.props.invite.Site.SiteName} {this.props.invite.Site.SiteAddress} </Text>
                    <View style={{flexDirection: 'row'}}>
                    <Icon
                        type="ionicon"
                        name='ios-checkmark-circle-outline'
                        size={40}
                        containerStyle={{ paddingBottom: 20 }}
                        color="#E74C3C"
                        underlayColor="transparent"
                        onPress={this.Confirm}
                    /> 
                    <Icon
                        type="ionicon"
                        name='ios-close-circle-outline'
                        size={40}
                        containerStyle={{ paddingBottom: 20 }}
                        color="#E74C3C"
                        underlayColor="transparent"
                        onPress={this.Reject}
                    /> 
                    </View>
                   
                </View>
            </DropDownMenu>
        </View>

    );
    }

}

const mapDispatchToProps = (dispatch) => ({
    RejectInvite: (Invite) => dispatch(RejectInvite(Invite)),
    addSites: (Sites) => dispatch(addSites(Sites))
})

const mapStateToProps = (state) => ({
    User: state.user,
});

export default connect(mapStateToProps, mapDispatchToProps)(RecivedInvite); 