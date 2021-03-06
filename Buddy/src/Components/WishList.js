import React from 'react';
import { StyleSheet, ListView, View, Image, Alert } from 'react-native';
import { Container, Content, Card, CardItem, Button, Icon, List, ListItem, Title, Text, Body, Thumbnail, Left, Right, Segment, Header } from 'native-base';
import { connect } from 'react-redux';
import Log from './Log'
import ProductHeader from '../Components/ProductHeaderComponent';
import { rmLog, updateLog, rmWish, selectWish } from '../Actions/index';
import { convert } from '../lib/TrackConverter';

class WishList extends React.Component {
  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
  }
  deleteRow(data) {
    this.props.actions.rmWish(data);
  }
  handleClick(data) {
    this.props.actions.selectWish(data);
    this.props.navigation.navigate('EditWish');
  }
  render() {
    const { navigate } = this.props.navigation;
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    return (
      <Container>
        <Content>
          <List
            enableEmptySections
            dataSource={this.ds.cloneWithRows(this.props.wishlist)}
            renderRow={ data =>
              <ListItem>
                <Log data={convert(data)} />
              </ListItem>
            }
            renderLeftHiddenRow={data =>
              <Button full onPress={_ => this.handleClick(data)}>
                <Icon active name="md-create" />
              </Button>}
            renderRightHiddenRow={(data) =>
              <Button full danger onPress={_ => this.deleteRow(data)}>
                <Icon active name="trash" />
              </Button>}
            leftOpenValue={75}
            rightOpenValue={-75}
          />
        </Content>
      </Container>
    );
  }
}

function mapStateToProps (store) {
  return {
    wishlist: store.wishlist.wishlist,
   }
}

function mapDispatchToProps (dispatch) {
  return {
  actions: {
    rmWish: wish => dispatch(rmWish(wish)),
    selectWish: wish => dispatch(selectWish(wish))
  }}
}

export default connect(mapStateToProps, mapDispatchToProps)(WishList)


const styles = StyleSheet.create({
  HeaderContainer: {
    flex: 1,
    flexDirection: 'row',
    padding: 3,
  },
  ImageContainer: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  TextContainer: {
    flex: 4,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignSelf: 'flex-start',
  },
  Header: {
    fontWeight: 'bold',
  },
  SubHeader: {
    color: 'gray',
  },
});
