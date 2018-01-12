import React from 'react';
import { StyleSheet, ListView, View, Image, Alert } from 'react-native';
import { Container, Content, Card, CardItem, Button, Icon, List, ListItem, Title, Text, Body, Thumbnail, Left, Right, Segment, Header } from 'native-base';
import { connect } from 'react-redux';
import Log from './Log'
import ProductHeader from '../Components/ProductHeaderComponent';
import { rmLog, updateLog, rmWish, selectLog } from '../Actions/index';
import { convert } from '../lib/TrackConverter';


class LogList extends React.Component {
  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      basic: true,
      listViewData: this.props.logs,
    };
    // this.deleteLog = this.deleteLog.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  // componentWillReceiveProps(nextProps) {
  //   this.setState({
  //     listViewData: this.props.logs,
  //   })
  // }
  deleteLog(secId, rowId, rowMap) {
    rowMap[`${secId}${rowId}`].props.closeRow();
    const newData = [...this.state.listViewData];
    const log = newData.splice(rowId, 1)[0];
    this.setState({ listViewData: newData });
    this.props.actions.rmLog(log);
  }
  handleClick(rowId) {
    console.log("click", rowId);
    const log = this.state.listViewData[rowId];
    this.props.actions.selectLog(log);
    this.props.navigation.navigate('View');
  }
  render() {
    const { navigate } = this.props.navigation;
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    return (
      <Container>
        <Content>
          <List
            dataSource={this.ds.cloneWithRows(this.state.listViewData)}
            renderRow={ data =>
              <ListItem>
                <Log
                  data={convert(data)}
                />
              </ListItem>
            }
            renderLeftHiddenRow={(data, secId, rowId, rowMap) =>
              <Button full onPress={_ => this.handleClick(rowId)}>
                <Icon active name="md-create" />
              </Button>}
            renderRightHiddenRow={(data, secId, rowId, rowMap) =>
              <Button full danger onPress={_ => this.deleteLog(secId, rowId, rowMap)}>
              {/*_ => this.deleteRow(secId, rowId, rowMap)*/}
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
    logs: store.logs.logs,
   }
}

function mapDispatchToProps (dispatch) {
  return {
  actions: {
    rmLog: log => dispatch(rmLog(log)),
    updateLog: log => dispatch(updateLog(log)),
    selectLog: log => dispatch(selectLog(log)),
    // deselectLog: log => dispatch(deselectLog()),
  }}
}

export default connect(mapStateToProps, mapDispatchToProps)(LogList)


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
