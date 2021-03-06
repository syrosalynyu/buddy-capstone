import React from 'react';
import { View, Image, StyleSheet, Text, Slider, Dimensions, TouchableHighlight, TextInput } from 'react-native';
import { Container, Content }  from 'native-base';
import { NavigationActions } from 'react-navigation';
// Radio Form
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
// Custom Icons
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import IcoMoonConfig from '../selection.json';
const Icon = createIconSetFromIcoMoon(IcoMoonConfig);
import Icon2 from 'react-native-vector-icons/FontAwesome';
import { colors, sharedStyles } from '../assets/Theme';
// Actions
import { connect } from 'react-redux';
import { addLog } from '../Actions/index';
import { product_props, product_map, duration_map, unit, units, quantityValues, date } from '../lib/TrackConverter';

class TrackScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'TRACK',
    headerStyle: sharedStyles.headerStyle,
    headerTitleStyle: sharedStyles.headerTitleStyle,
    headerBackTitleStyle: sharedStyles.headerBack,
    headerTintColor: sharedStyles.headerBackButton,
  });
  render() {
    const { navigate } = this.props.navigation;
    const { params } = this.props.navigation.state;
    return (
      <Container>
        <Content style={styles.formContentBody}>
          <ProductFormBody starterData={params} dispatch={this.props.addLog}
          navigation={this.props.navigation} />
        </Content>
    </Container>
    );
  }
};

class ProductFormBody extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.starterData ? this.props.starterData.name : '',
      brand: this.props.starterData ? this.props.starterData.brand : '',
      type: this.props.starterData ? this.props.starterData.race : '',
      product: 1,
      quantity: 1,
      flavors: {spicy: false, sweet: false, sour: false, earthy: false},
      activity: 2,
      duration: 0,
      ranking: 2,
      date: date(),
    }
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleBrandChange = this.handleBrandChange.bind(this);
    this.handleProductChange = this.handleProductChange.bind(this);
    this.handleQuantityChange = this.handleQuantityChange.bind(this);
    this.handleFlavorChange = this.handleFlavorChange.bind(this);
    this.handleActivityChange = this.handleActivityChange.bind(this);
    this.handleDurationChange = this.handleDurationChange.bind(this);
    this.handleRankChange = this.handleRankChange.bind(this);
    this.onPress = this.onPress.bind(this);
  }
  handleNameChange(name) {
    this.setState({
      name: name
    });
  }
  handleBrandChange(brand) {
    this.setState({
      brand: brand
    });
  }
  handleProductChange(product) {
    this.setState({
      product: product
    });
  }
  handleQuantityChange(quantity) {
    this.setState({
      quantity: quantity
    });
  }
  handleFlavorChange(flavors) {
    const flavor = flavors[0];
    const clickState = flavors[1];
    const flavorObj = this.state.flavors;
    flavorObj[flavor] = clickState;
    this.setState({
      flavors: flavorObj
    });
  }
  handleActivityChange(activity) {
    this.setState({
      activity: activity
    });
  }
  handleDurationChange(duration) {
    this.setState({
      duration: duration
    });
  }
  handleRankChange(ranking) {
    this.setState({
      ranking: ranking
    });
  }
  onPress(e) {
    e.preventDefault();
    const log = this.state;
    this.props.dispatch(log);
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'Search'})
      ]
    })
    this.props.navigation.dispatch(resetAction)
    this.props.navigation.navigate("Explore");
  }
  render() {
    return (
      <View style={styles.formBody}>
        <View style={styles.inputLine}>
          <ProductFormHeader
            labelName="name"
            defaultValue={this.props.starterData}
          onNameChange={this.handleNameChange}/>
        </View>
        <View style={styles.inputLine}>
          <ProductFormHeader
            labelName="brand"
            defaultValue={this.props.starterData}
          onBrandChange={this.handleBrandChange}/>
        </View>
        <View style={styles.inputLine}>
          <RadioProductButton
          select={this.state.product} onProductChange={this.handleProductChange}/>
        </View>
        <View style={styles.inputLine}>
          <QuantityPicker type={this.state.product}
          quantity={this.state.quantity} onQuantityChange={this.handleQuantityChange}/>
        </View>
        <View style={styles.inputLine}>
          <RadioIconButton clicked={this.state.flavors} onFlavorChange={this.handleFlavorChange}/>
        </View>
        <View style={styles.inputLine}>
          <ActivityPicker activity={this.state.activity} onActivityChange={this.handleActivityChange}/>
        </View>
        <View style={styles.inputLine}>
          <RadioDurationButton select={this.state.duration} onDurationChange={this.handleDurationChange}/>
        </View>
        <View style={styles.inputLine}>
          <RadioRankButton ranking={this.state.ranking}
          onRankChange={this.handleRankChange}/>
        </View>
        <View style={styles.submitButtonLine}>
          <TouchableHighlight onPress={this.onPress}>
            <Text style={[sharedStyles.label, styles.submitButton]}>
              {"add!".toUpperCase()}
            </Text>
          </TouchableHighlight>
        </View>
        </View>
    )
  }
}

class ProductFormHeader extends React.Component {
  constructor(props) {
    super(props);
    this.handleTextChange = this.handleTextChange.bind(this);
  }
  handleTextChange(text) {
    if (this.props.labelName === "name") {
      this.props.onNameChange(text);
    } else {
      this.props.onBrandChange(text);
    }
  }
  render() {
    const { labelName } = this.props;
    return (
      <View>
      <TextInput
      style={[sharedStyles.label,{height: 40}]}
      placeholder={labelName.toUpperCase()}
      onChangeText={this.handleTextChange}
      defaultValue={this.props.defaultValue ? this.props.defaultValue[labelName] : '' }
      />
      </View>
    )
  }
}

class RadioProductButton extends React.Component {
  constructor(props) {
    super(props);
    this.handleProductChange = this.handleProductChange.bind(this);
  }
  handleProductChange(value) {
    this.props.onProductChange(value);
  }
  render() {
    return (
      <View>
        <Text style={sharedStyles.label}>
          {"Product Type:".toUpperCase()}
        </Text>
          <RadioForm
            formHorizontal={true}
            style={[styles.slider, styles.partialSlider]}
          >
          {product_map.map((obj) => {
            return (
            <RadioButton labelHorizontal={false} key={obj.value.toString()}>
            <RadioButtonInput
            obj={obj}
            index={obj.value}
            onPress={this.handleProductChange}
            buttonInnerColor={colors.green}
            buttonOuterColor={colors.green}
            isSelected={(obj.value == this.props.select)}
            />
            <RadioButtonLabel
            obj={obj}
            index={obj.value}
            labelHorizontal={false}
            onPress={this.handleProductChange}
            labelStyle={styles.secondaryLabel}
            />
            </RadioButton>)
          })}
        </RadioForm>
      </View>
    );
  }
}

class QuantityPicker extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(value) {
    this.props.onQuantityChange(parseFloat(value));
  }
  render() {
    const value = this.props.quantity;
    return (
      <View style={styles.container}>
        <Text style={sharedStyles.label}>
          {"Quantity: ".toUpperCase() + String(value)+" "+ ((value !== 1) ? units[this.props.type] : unit[this.props.type])}
        </Text>
        <Slider
          step={quantityValues[this.props.type].step}
          maximumValue={quantityValues[this.props.type].max}
          onValueChange={this.handleChange}
          value={value}
          style={styles.partialSlider}
          minimumTrackTintColor={colors.green}
        />
      </View>
    );
  }
}

class ActivityPicker extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(value) {
    this.props.onActivityChange(parseFloat(value))
  }
  render() {
    const value = this.props.activity;
    return (
      <View style={styles.container}>
        <Text style={sharedStyles.label}>{"Activity:".toUpperCase()}</Text>
        <View style={styles.slider}>
        <Icon name="bed" size={25} color={colors.darkGray}/>
        <Slider
          step={1}
          maximumValue={4}
          onValueChange={this.handleChange}
          value={value}
          style={styles.partialSlider}
          minimumTrackTintColor={colors.green}
        />
        <Icon name="jumping-dancer" size={25} color={colors.darkGray}/>
        </View>
      </View>
    );
  }
}

class RadioIconButton extends React.Component {
  constructor(props) {
    super(props);
    this.handleFlavorChange = this.handleFlavorChange.bind(this);
  }
  handleFlavorChange(flavors) {
    this.props.onFlavorChange(flavors);
  }
  render() {
    return (
      <View>
        <Text style={sharedStyles.label}>
          {"Flavors:".toUpperCase()}
        </Text>
        <View style={styles.radioButtons}>
          <IconButton flavor="spicy" clicked={this.props.clicked["spicy"]} addFlavor={this.handleFlavorChange}/>
          <IconButton flavor="sour"
          clicked={this.props.clicked["sour"]} addFlavor={this.handleFlavorChange}/>
          <IconButton flavor="sweet"
          clicked={this.props.clicked["sweet"]} addFlavor={this.handleFlavorChange}/>
          <IconButton flavor="earthy"
          clicked={this.props.clicked["earthy"]} addFlavor={this.handleFlavorChange}/>
        </View>
      </View>
    )
  }
}

class IconButton extends React.Component {
  constructor(props){
    super(props);
    this.handlerButtonOnClick = this.handlerButtonOnClick.bind(this);
  }
  handlerButtonOnClick(){
    this.props.addFlavor([this.props.flavor, !this.props.clicked]);
  }
  render() {
    const flavorIcon = {
      spicy: {icon: "food-2", color: colors.spicy},
      sweet: {icon:"food-1", color :colors.sweet},
      sour: {icon:"fruit", color: colors.sour},
      earthy: {icon:"forest", color: colors.earthy},
    }
    const color = flavorIcon[this.props.flavor].color;
    const icon = flavorIcon[this.props.flavor].icon;
    if (this.props.clicked) {
      return (
        <View style={styles.iconButton}>
          <TouchableHighlight
          style={[{borderColor: color, borderWidth: 5}, styles.button]}
          onPress={this.handlerButtonOnClick}>
            <Icon name={icon} style={{color: color}} size={40} />
          </TouchableHighlight>
          <Text style={{color: color, fontWeight: "bold"}}>
            {this.props.flavor.toUpperCase()}
          </Text>
        </View>
      )
    } else {
      return (
        <View style={styles.iconButton}>
          <TouchableHighlight
            style={[{backgroundColor: color}, styles.button]}
            onPress={this.handlerButtonOnClick}>
            <Icon name={icon} style={{color: "white"}} size={40} />
          </TouchableHighlight>
          <Text style={{color: color, fontWeight: "bold"}}>
            {this.props.flavor.toUpperCase()}
          </Text>
        </View>
      )
    }
  }
}

class RadioDurationButton extends React.Component {
  constructor(props) {
    super(props);
    this.handleDurationChange = this.handleDurationChange.bind(this);
  }
  handleDurationChange(value) {
    this.props.onDurationChange(value);
  }
  render() {
    return (
      <View>
        <Text style={sharedStyles.label}>{"Duration:".toUpperCase()}</Text>
        <RadioForm
          formHorizontal={true}
          style={[styles.slider, styles.partialSlider]}
        >
        {duration_map.map((obj) => {
          return (
          <RadioButton labelHorizontal={false} key={obj.value}>
          <RadioButtonInput
          obj={obj}
          index={obj.value}
          onPress={this.handleDurationChange}
          buttonInnerColor={colors.green}
          buttonOuterColor={colors.green}
          isSelected={(obj.value == this.props.select)}
          />
          <RadioButtonLabel
          obj={obj}
          index={obj.value}
          labelHorizontal={false}
          onPress={this.handleDurationChange}
          labelStyle={styles.secondaryLabel}
          />
          </RadioButton>)
        })}
      </RadioForm>
      </View>
    );
  }
}

class RadioRankButton extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(value) {
    this.props.onRankChange(parseFloat(value))
  }
  render() {
    const value = this.props.ranking;
    return (
      <View style={styles.container}>
        <Text style={sharedStyles.label}>{"Ranking:".toUpperCase()}</Text>
        <View style={styles.slider}>
        <Icon2 name="thumbs-down" size={25} color={colors.darkGray}/>
        <Slider
          step={1}
          maximumValue={4}
          onValueChange={this.handleChange}
          value={value}
          style={styles.partialSlider}
          minimumTrackTintColor={colors.green}
        />
        <Icon2 name="thumbs-up" size={25} color={colors.darkGray}/>
        </View>
      </View>
    );
  }
}

function mapDispatchToProps (dispatch) {
  return {
      addLog: log => dispatch(addLog(log))
  };
}

export default connect(null, mapDispatchToProps)(TrackScreen);


const styles = StyleSheet.create({
  formContentBody: {
    backgroundColor: colors.creme,
  },
  formBody: {
    flex: 1,
    flexDirection: 'column',
  },
  inputLine: {
    flex: 1,
    padding: 10,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  button: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 10,
    margin: 10,
    height: 70,
    width: 70,
    borderRadius:10,
  },
  productTypes: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
  },
  slider: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  partialSlider: {
    width: Dimensions.get('window').width * 0.75 ,
    alignSelf: 'center',
  },
  iconButton: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  radioButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  submitButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderColor: colors.darkGray,
    borderWidth: 2,
    marginBottom: 30,
  },
  submitButtonLine: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  secondaryLabel: {
    fontFamily: 'Josefin Sans',
    fontSize: 16,
    fontWeight: '300'
  }
});
