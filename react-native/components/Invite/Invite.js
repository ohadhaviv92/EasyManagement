import React, { Component } from 'react'
import { Text, View, StyleSheet, Dimensions, TextInput, Button, Picker, ScrollView, FlatList } from 'react-native'
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
        refreshing: false,
        openSites: []

    }

    onSend = async () => {
        try {
            const user = await SQL.SendInvite(this.state.siteID, this.state.jobID, this.props.User.UserId, this.state.user)
            const Site = this.props.Sites.filter(site => site.SiteId == this.state.siteID)[0];
            this.props.AddSentInvites([{ user, Site }])


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
        if (this.props.Sites.length !== 0) {
            const openSites = this.props.Sites.filter(site => site.SiteStatus == true)
            this.setState({ jobID: this.props.Jobs[0].userTypeID, siteID: this.props.Sites[0].SiteId, openSites })
        }
        try {
            const sentInvites = await SQL.GetSentInvites(this.props.User.UserId);
            const recivedInvites = await SQL.GetRecivedInvites(this.props.User.UserId)
            this.props.SetSentInvites(sentInvites);
            this.props.SetReciveInvites(recivedInvites);


        } catch (error) {

        }

    }

    _onRefresh = () => {

    }

    _renderSent = ({item}) => <SentInvite key={`${item.user.UserId},${item.Site.SiteId}`} invite={item} />
    _ListEmptyComponent = () => <Empty/>
    _keyExtractor = (invite) => `${invite.user.UserId},${invite.Site.SiteId}`
    _renderRecived = ({item}) => <ReceivedInvite key={`${item.user.UserId},${item.Site.SiteId}`} invite={item} />
    _ItemSeparatorComponent =() => <View style={{ overflow: 'hidden', paddingVertical: 7, backgroundColor: '#2C3E50'}}><View style={{paddingVertical: 1, backgroundColor: 'white'}}/></View>



    render() {
        return (
            <ScrollView contentContainerStyle={{ paddingBottom: '10%' }}>
                <View>
                    <View>
                        <View style={styles.title}>
                            <Text style={styles.text}> הוספת בעל מקצוע </Text>
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
                                    itemStyle={{ height: 40, color: "#ffffff" }}
                                    onValueChange={(val, index) => this.setState({ jobID: val, jobIndex: index })}
                                    style={styles.picker}>

                                    {this.props.Jobs.map(job => <Picker.Item key={job.userTypeID} label={job.userTypeName} value={job.userTypeID} />)}

                                </Picker>
                                <Picker
                                    selectedValue={this.state.siteID}
                                    itemStyle={{ height: 40, color: "#ffffff" }}
                                    onValueChange={(val, index) => this.setState({ siteID: val, siteIndex: index })}
                                    style={styles.picker}
                                >
                                    {this.state.openSites.map(site => <Picker.Item key={site.SiteId} label={site.SiteName} value={site.SiteId} />)}
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

                            <Text style={styles.text}> הזמנות שנשלחו </Text>
                            
                            <FlatList
                                ListEmptyComponent={this._ListEmptyComponent}
                                ListFooterComponent={() => <View style={{ padding: '1%' }}></View>}
                                data={this.props.Invites.sent}
                                keyExtractor={this._keyExtractor}
                                renderItem={this._renderSent}
                                ItemSeparatorComponent={this._ItemSeparatorComponent}
                            />
                            <Text style={styles.text}> הזמנות שהתקבלו </Text>
                            <FlatList
                                ListEmptyComponent={this._ListEmptyComponent}
                                ListFooterComponent={() => <View style={{ padding: '1%' }}></View>}
                                data={this.props.Invites.recevied}
                                keyExtractor={this._keyExtractor}
                                renderItem={this._renderRecived}
                                ItemSeparatorComponent={this._ItemSeparatorComponent}
                            />

                        </View>
                    </View>
                </View>
            </ScrollView>
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