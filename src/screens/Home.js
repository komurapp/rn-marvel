import React from 'react'
import {
  FlatList, Image, Text, TouchableOpacity, View
} from 'react-native';
import md5 from 'js-md5';

const PUBLIC_kEY = '9ad80cb2cf29a147567ccbb831289fc0';
const PRIVATE_KEY = 'd891c1d5e937a2e12ecab4c517cac43cb344fba3';

class Home extends React.PureComponent {
  static navigationOptions = {
    title: 'Heroes',
  }

  state = {
    data: [],
  }

  async componentDidMount() {
    const timestamp = Number(new Date());
    const hash = md5.create();
    hash.update(timestamp + PRIVATE_KEY + PUBLIC_kEY);

    const response = await fetch(`
      https://gateway.marvel.com/v1/public/characters?ts=${timestamp}&orderBy=name&limit=10&apikey=${PUBLIC_KEY}&hash=${hash.hex()}
    `);
    const responseJson = await response.json();
    this.setState({ data: responseJson.data.results });
  }

  _renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => this._onItemPress(item)}
      style={{ flexDirection: 'row', padding: 10, alignItems: 'center' }}
    >
      <Image
        style={{ height: 50, width: 50, borderRadius: 25 }}
        source={{ uri: `${item.thumbnail.path}.${item.thumbnail.extension}` }}
      />
      <Text style={{ marginLeft: 10 }}>
        {item.name}
      </Text>
    </TouchableOpacity>
  )

  _onItemPress = item => this.props.navigation.navigate('Description', { hero: item })


  render() {
    return (
      <FlatList
        data={this.state.data}
        renderItem={this._renderItem}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={() => <View style={{ backgroundColor: '#f7f7f7', height: 1 }} />}
      />
    );
  }
}

export default Home;
