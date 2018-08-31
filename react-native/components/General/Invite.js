import React, { Component } from 'react'
import { Text, View, StyleSheet, Dimensions, TextInput, Button, Picker, ScrollView, RefreshControl } from 'react-native'
import { connect } from 'react-redux';
import { SetJobs } from '../../actions/jobAction';
import { SetSentInvites } from '../../actions/invitesAction';
import SQL from '../../Handlers/SQL';
class Invite extends Component {


    state = {
        user: '',
        job: '',
        site: '',
        refreshing: false
    }

    onSend = () => {
        console.log(this.state.user);

    }

    async componentDidMount() {
        if (this.props.Jobs.length == 0) {
            try {
                const jobs = await SQL.GetJobs();
                this.props.SetJobs(jobs);
            } catch (error) {

            }
        }
        try {
            const sentInvites = await SQL.GetSentInvites(this.props.User.UserId);
            console.log(sentInvites);

            await this.props.SetSentInvites(sentInvites);
        } catch (error) {

        }

    }

    _onRefresh = () => {

    }

    render() {
        return (
            <View>
                <View>
                    <View style={styles.title}>
                        <Text style={styles.text}> Invite </Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ flexDirection: 'column' }}>
                            <TextInput
                                style={styles.input}
                                placeholder="Email / User name"
                                secureTextEntry={true}
                                placeholderTextColor="#ECF0F1"
                                underlineColorAndroid="transparent"
                                onChangeText={(text) => { this.setState({ user: text }) }}
                            />
                            <Picker
                                selectedValue={this.state.job}
                                style={styles.picker}
                                onValueChange={(itemValue, itemIndex) => this.setState({ job: itemValue })}>
                                {this.props.Jobs.map(job => <Picker.Item key={job.userTypeID} label={job.userTypeName} value={job.userTypeID} />)}
                            </Picker>
                            <Picker
                                selectedValue={this.state.site}
                                style={styles.picker}
                                onValueChange={(itemValue, itemIndex) => this.setState({ site: itemValue })}>
                                {this.props.Sites.map(site => <Picker.Item key={site.SiteId} label={site.SiteName} value={site.SiteId} />)}
                            </Picker>

                        </View>

                        <View style={styles.button}>
                            <Button title='Send' onPress={this.onSend} color='#3498DB' />
                        </View>
                    </View>
                </View>


                <View>
                    <View style={styles.title}>
                        <Text style={styles.text}> Pending Invites </Text>
                    </View>

                    <View>
                        <Text style={styles.text}> Sent Invites </Text>
                        <ScrollView
                         refreshControl={
                            <RefreshControl
                              refreshing={this.state.refreshing}
                              onRefresh={this._onRefresh}
                            />
                          }
                        >
                            {this.props.Invites.sent.map(sentInvite =>  <SentInvites key={`${sentInvite.user.UserId},${sentInvite.Site.SiteId}`} invite={sentInvite} />)}
                        </ScrollView>
                    </View>
                </View>
            </View>
        )
    }
}

const SentInvites = (props) => {
    return (
        <View style={{backgroundColor: "#2980B9",width, padding: 3, marginBottom: 5}}>
            <Text style={styles.text}> {props.invite.user.UserName} {props.invite.user.Email} </Text>
            <Text style={styles.text}> {props.invite.user.FirstName} {props.invite.user.LastName} </Text>
            <Text style={styles.text}> {props.invite.Site.SiteName} {props.invite.Site.SiteAddress} </Text>
        </View>
    )
}


const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
    button: {
        width: 80,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        backgroundColor: "#2980B9",
        width: width - 80,
        height: 40,
        marginVertical: 5,
        color: "#ffffff",
    },
    picker: {
        backgroundColor: "#2980B9",
        width: width - 80,
        height: 40,
        marginVertical: 5,
    },
    title: {
        alignItems: 'center',
        width,
        paddingVertical: 8,
        backgroundColor: '#E74C3C',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: height / 2.5,
    },
    text: {
        fontSize: 21,
        color: '#ECF0F1',
    }

})


const mapDispatchToProps = (dispatch) => ({
    SetJobs: (Jobs) => dispatch(SetJobs(Jobs)),
    SetSentInvites: (Invites) => dispatch(SetSentInvites(Invites))

})

mapStateToProps = (state) => ({
    User: state.user,
    Jobs: state.jobs,
    Sites: state.sites,
    Invites: state.invites
});

export default connect(mapStateToProps, mapDispatchToProps)(Invite); 