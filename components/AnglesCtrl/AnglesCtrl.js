import React, { Component } from 'react';
import SelectField from 'material-ui/lib/select-field';
import TextField from 'material-ui/lib/text-field';
import RadioButton from 'material-ui/lib/radio-button';
import RadioButtonGroup from 'material-ui/lib/radio-button-group';
import './AnglesCtrl.scss';

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {angles: props.angles};
  }

  componentWillReceiveProps = (newProps) => {
    this.setState({angles: newProps.angles});
  }

  _getAxisControls = () => {
    return this.state.angles.map((value, i) =>
      <div><TextField value={value} type='number' floatingLabelText={this.props.axes[i]} onBlur={this._handleInputBlur} onChange={this._handleInputChange.bind(this, i)} /><p/></div>
    );
  }

  _getUnitsRadioButtons = () => {
    return this.props.availableUnits.map((unit) => {
      const label = unit[0].toUpperCase() + unit.slice(1);
      return <RadioButton value={unit} label={label} style={{marginBottom:16}} />;
    });
  }

  _getAxesForDropDown = () => {
    return this.props.availableAxes.map((value, index) => ({payload: (index + 1), text: value}));
  }

  _getCurrentAxes = () => {
    return this.props.availableAxes.indexOf(this.props.axes) + 1;
  }

  _handleAxesChanged = (event) => {
    this.props.onAxesChanged(this.props.availableAxes[event.target.value-1]);
  }

  _handleInputChange = (i, event) => {
    const newAngles = this.state.angles.slice();
    newAngles[i] = event.target.value;
    this.setState({angles: newAngles});
  }

  _handleUnitsChange = (event, selectedValue) => {
    this.props.onUnitsChanged(selectedValue);
  }

  _handleInputBlur = () => {
    this.props.onAnglesChanged(this.state.angles);
  }

  render() {
    return (
      <div>
        <SelectField menuItems={this._getAxesForDropDown()} value={this._getCurrentAxes()} floatingLabelText="Rotation Order" onChange={this._handleAxesChanged}/>
        <RadioButtonGroup name="units" valueSelected={this.props.units} onChange={this._handleUnitsChange}>
          {this._getUnitsRadioButtons()}
        </RadioButtonGroup>
        <div>
          {this._getAxisControls()}
        </div>
      </div>
    );
  }
}
