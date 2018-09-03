import React, { Component } from 'react'
import { Text, View, StyleSheet, Dimensions, TextInput, Button, Picker, ScrollView, RefreshControl } from 'react-native'
import { connect } from 'react-redux';
import { SetJobs } from '../../actions/jobAction';
import { SetSentInvites, SetReciveInvites, AddSentInvites } from '../../actions/invitesAction';
import ReceivedInvite from './RecivedInvite';
import SentInvite from './SentInvite';
import Empty from '../General/Empty';
import SQL from '../../Handlers/SQL';

class Invite extends Component {

    state = {
        user: '',
        jobID: NaN,
        jobIndex: NaN,
        siteID: NaN,
        siteIndex: NaN,
        refreshing: false
    }

    onSend = async () => {
        try {
            const user = await SQL.SednInvite(this.state.siteID, this.state.jobID, this.props.User.UserId, this.state.user)
            const Site = this.props.Sites[this.state.siteID];
            console.log(user, Site);
            
            //this.props.AddSentInvites({ user, Site })
       
            
        } catch (error) {
            console.log(error);

        }

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
            const recivedInvites = await SQL.GetRecivedInvites(this.props.User.UserId)
            await this.props.SetSentInvites(sentInvites);
            await this.props.SetReciveInvites(recivedInvites);
        } catch (error) {

        }

    }

    _onRefresh = () => {

    }

    renderSent = () => this.props.Invites.sent.length > 0 ? this.props.Invites.sent.map(sentInvite =>
        <SentInvite key={`${sentInvite.user.UserId},${sentInvite.Site.SiteId}`} invite={sentInvite} />)
        :
        <Empty />


    renderRecived = () => this.props.Invites.recevied.length > 0 ? this.props.Invites.recevied.map(receivedInvite =>
        <ReceivedInvite key={`${receivedInvite.user.UserId},${receivedInvite.Site.SiteId}`} invite={receivedInvite} />)
        :
        <Empty />



    render() {
        return (
            <View>
                <View>
                    <View style={styles.title}>
                        <Text style={styles.text}> הזמן </Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ flexDirection: 'column' }}>
                            <TextInput
                                style={styles.input}
                                placeholder="אימייל / שם משתמש"
                                placeholderTextColor="#ECF0F1"
                                underlineColorAndroid="transparent"
                                onChangeText={(text) => { this.setState({ user: text }) }}
                            />
                            <Picker
                                selectedValue={this.state.jobID}
                                itemStyle={{height: 40, color: "#ffffff"}}
                                onValueChange={(val, index) => this.setState({ jobID: val, jobIndex: index })}
                                style={styles.picker}>

                                {this.props.Jobs.map(job => <Picker.Item  key={job.userTypeID} label={job.userTypeName} value={job.userTypeID} />)}

                            </Picker>
                            <Picker
                                selectedValue={this.state.siteID}
                                itemStyle={{height: 40, color: "#ffffff"}}
                                onValueChange={(val, index) => this.setState({ siteID: val, siteIndex: index })}
                                style={styles.picker}
                            >
                                {this.props.Sites.map(site => <Picker.Item key={site.SiteId} label={site.SiteName} value={site.SiteId} />)}
                            </Picker>

                        </View>

                        <View style={styles.button}>
                            <Button title='שלח' onPress={this.onSend} color='#3498DB' />
                        </View>
                    </View>
                </View>


                <View>
                    <View style={styles.title}>
                        <Text style={styles.text}> הזמנות </Text>
                    </View>

                    <View>

                        <ScrollView
                            refreshControl={
                                <RefreshControl
                                    refreshing={this.state.refreshing}
                                    onRefresh={this._onRefresh}
                                />
                            }
                        >
                            <Text style={styles.text}> הזמנות שנשלחו </Text>
                            {this.renderSent()}
                            <Text style={styles.text}> הזמנות שהתקבלו </Text>
                            {this.renderRecived()}
                        </ScrollView>
                    </View>
                </View>
            </View>
        )
    }
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

        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#E74C3C',
    },
    text: {
        fontSize: 21,
        color: '#ECF0F1',
    }

})


const mapDispatchToProps = (dispatch) => ({
    SetJobs: (Jobs) => dispatch(SetJobs(Jobs)),
    SetSentInvites: (Invites) => dispatch(SetSentInvites(Invites)),
    SetReciveInvites: (Invites) => dispatch(SetReciveInvites(Invites)),
    AddSentInvites: (Invite) => dispatch(AddSentInvites(Invite))

})

const mapStateToProps = (state) => ({
    User: state.user,
    Jobs: state.jobs,
    Sites: state.sites,
    Invites: state.invites
});

export default connect(mapStateToProps, mapDispatchToProps)(Invite); 