import React, { Component } from 'react';
import SelectField from 'material-ui/lib/select-field';
import TextField from 'material-ui/lib/text-field';

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {angles: props.angles};
  }

  _getAxisControls = () => {
    const elements = [];
    for (let i = 0; i < 3; i++) {
      elements.push(<TextField value={this.state.angles[i]} type='number' floatingLabelText={this.props.axes[i]} onBlur={this._handleInputBlur} onChange={this._handleInputChange.bind(this, i)} />);
      elements.push(<p/>)
    }
    return elements;
  }

  _getAxesForDropDown = () => {
    return this.props.availableAxes.map((value, index) => ({payload: (index + 1), text: value}));
  }

  _getCurrentAxes = () => {
    return this.props.availableAxes.indexOf(this.props.axes) + 1;
  }

  _handleAxesChanged = (event) => {
    this.props.onAxesChanged(event.target.value);
  }

  _handleInputChange = (i, event) => {
    const newAngles = this.state.angles.slice();
    newAngles[i] = event.target.value;
    this.setState({angles: newAngles});
  }

  _handleInputBlur = () => {
    this.props.onAnglesChanged(this.state.angles);
  }

  render() {
    return (
      <div>
        <SelectField menuItems={this._getAxesForDropDown()} value={this._getCurrentAxes()} floatingLabelText="Axes" onChange={this._handleAxesChanged}/>
        <div>
          {this._getAxisControls()}
        </div>
      </div>
    );
  }
}

//(function () {
//  Polymer({
//    is: 'angles-ctrl',
//    properties: {
//      axes: {
//        type: Array,
//        value: ['XYZ', 'ZYZ', 'ZYX'],
//      },
//      selectedAxes: {
//        type: Array,
//        computed: 'computeAxes(selectedIndex)',
//        observer: '_axesChanged',
//      },
//      selectedIndex: {
//        type: Number,
//        value: 0,
//      },
//      axisValues: {
//        type: Array,
//        value: [0, 0, 0]
//      }
//    },
//
//    observers: [
//      '_anglesChanged(axisValues.*)'
//    ],
//
//    _anglesChanged() {
//      this.fire('angles-changed', this.axisValues);
//    },
//    _axesChanged() {
//      this.fire('axes-changed', this.axes[this.selectedIndex]);
//    },
//    // see https://www.polymer-project.org/1.0/docs/devguide/data-binding.html#array-binding
//    arrayItem(change, index) {
//      return change.base[index];
//    },
//    computeAxes() {
//      return this.axes[this.selectedIndex].split("");
//    },
//    ready() {
//    }
//  });
//})();

//<dom-module id="angles-ctrl">
//  <style>
//    :host {
//    display: block;
//  }
//
//    @media (max-width: 600px) {
//    h1.paper-font-display1 {
//    font-size: 24px;
//  }
//  }
//  </style>
//  <template>
//    <div class="layout vertical flex">
//      <paper-dropdown-menu label="Axes" id="axes">
//        <paper-menu class="dropdown-content" selected="{{selectedIndex}}">
//          <template is="dom-repeat" items="[[axes]]">
//            <paper-item>[[item]]</paper-item>
//          </template>
//        </paper-menu>
//      </paper-dropdown-menu>
//      <!-- TODO: Bug - fields seem to be linked when changing values via UI -->
//      <template is="dom-repeat" items="{{axisValues}}">
//        <paper-input label="[[arrayItem(selectedAxes.*, index)]]" type="number" value="{{item}}"></paper-input>
//      </template>
//    </div>
//  </template>
//</dom-module>
