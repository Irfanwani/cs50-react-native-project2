import React from 'react'
import {Dimensions, View, StyleSheet, TextInput, Text, FlatList, TouchableOpacity, Image, ActivityIndicator } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

class Movie extends React.Component {
    render() {
        return (
            <View style={styles.movie}>
                <TouchableOpacity style={{flexDirection: 'row'}} onPress={() => this.props.navigation.navigate('secondStack', {i: this.props.movie.imdbID})}>
                    <Image resizeMode='contain' style={{height: 50, width: 50, marginLeft: 5}} source={{uri: this.props.movie.Poster}} />
                    <View>
                        <Text style={{marginLeft: 5, maxWidth: (Dimensions.get('window').width - 100)}}>{this.props.movie.Title}</Text>
                        <Text style={{marginLeft: 5}}>{this.props.movie.Year}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}


export default class Search extends React.Component {
    static navigationOptions = {
        headerTitle: 'Search Movies',
    }

    constructor(props) {
        super(props);
        this.state = {
            search: '',
            result: '',
            loading: false
        }
    }

    getSearch = search => {
        this.setState({search}, this.result)
    }

    result = async () => {
        this.setState({loading: true})
        const response = await fetch(`http://www.omdbapi.com/?s=${this.state.search?this.state.search:'inception'}&apikey=3bc90adf`)
        const {Search} = await response.json();
        this.setState({result: Search, loading: false})
    }

    initialVisit = async () => {
        const response = await fetch(`http://www.omdbapi.com/?s='inception'&apikey=3bc90adf`)
        const {Search} = await response.json();
        this.setState({result: Search})
    }

    componentDidMount() {
        this.initialVisit();
    }

    renderItem = ({item}) => <Movie movie={item} navigation={this.props.navigation} />

    render() {
        if(!this.state.loading) {
            return (
                <View>
                    <FlatList
                        ListHeaderComponent={() => <View style={styles.view}>
                                                    <Icon name='search' size={25} color='teal' />
                                                    <TextInput style={{paddingRight: Dimensions.get('window').width/2}} placeholder='Search here...' value={this.state.search} onChangeText={this.getSearch} autoFocus={true} />
                                                </View>} 
                        renderItem={this.renderItem} 
                        data={this.state.result} 
                        keyExtractor={item => item.imdbID}
                        ListEmptyComponent={<Text style={{textAlign: 'center'}}>Nothing to show.</Text>}
                    />
                </View>
            )
        }
        return <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}><ActivityIndicator size='large' color='black' /></View>
    }
}

const styles = StyleSheet.create({
    view: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: 'teal',
        borderRadius: 20, 
        paddingVertical: 5,
        marginVertical: 10,
        marginHorizontal: 10
    },
    movie: {
        borderWidth: 2,
        borderColor: 'green',
        paddingVertical: 10,
        marginHorizontal: 10,
        marginVertical: 5
    }
})