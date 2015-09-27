import React, { Component } from 'react';
import TextField from 'material-ui/lib/text-field';

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {values: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]};
  }

  _getControls() {
    const elements = [];
    for (let i = 0; i < this.state.values.length; i++) {
      elements.push(<TextField key={i} value={this.state.values[i]} onChange={this._handleInputChange.bind(this, i)} />);
      if ((i + 1) % 4 === 0) {
        elements.push(<p/>);
      }
    }
    return elements;
  }

  _handleInputChange(i, event) {
    const newValues = this.state.values.slice();
    newValues[i] = event.target.value;
    this.setState({values: newValues});
  }

  render() {
    return (
      <div>
        {this._getControls()}
      </div>
    );
  }
}

//(function () {
//  Polymer({
//    is: 'matrix-ctrl',
//    properties: {
//      values: {
//        type: Array,
//        value: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]
//      }
//    },
//
//    observers: [
//      '_matrixChanged(values.*)'
//    ],
//
//    _matrixChanged() {
//      this.fire('matrix-changed', this.values);
//    },
//
//    ready: function() {
//    }
//  });
//})();

//<dom-module id="matrix-ctrl">
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
//    <div class="layout horizontal wrap">
//      <!-- TODO: Figure out how to wrap these to make a 3x3 no matter what resolution -->
//      <template is="dom-repeat" items="{{values}}">
//        <paper-input class="matrix-element" maxlength="5" type="number" value="{{item}}"></paper-input>
//      </template>
//    </div>
//  </template>
//</dom-module>
