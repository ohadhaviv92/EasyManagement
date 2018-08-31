import React, { Component } from 'react'
import { Text, View, StyleSheet, Dimensions, TextInput, Button, Picker } from 'react-native'
import {connect} from 'react-redux';
import {SetJobs} from '../../actions/jobAction';
import SQL from '../../Handlers/SQL';
 class Invite extends Component {


    state = {
        user: '',
        job: '',
        site: ''
    }

    onSend = () => {
        console.log(this.state.user);

    }

    async componentDidMount(){
        if(this.props.Jobs.length == 0){
            const jobs = await SQL.GetJobs();
            this.props.SetJobs(jobs);
        }
        
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
    picker:{
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
  
  })

mapStateToProps = (state) => ({
    Jobs: state.jobs,
    Sites: state.sites
});

export default connect(mapStateToProps, mapDispatchToProps)(Invite); 