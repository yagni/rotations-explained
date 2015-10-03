import React, { Component } from 'react';
import TextField from 'material-ui/lib/text-field';
import THREE from 'three';

export default class extends Component {
  constructor(props) {
    super(props);
    const rowMajor = [];
    props.matrix.transposeIntoArray(rowMajor);
    this.state = {rowMajor};
  }

  componentWillReceiveProps = (newProps) => {
    const rowMajor = [];
    newProps.matrix.transposeIntoArray(rowMajor);
    this.setState({rowMajor});
  }

  _getControls = () => {
    const elements = [];
    for (let i = 0; i < this.state.rowMajor.length; i++) {
      elements.push(<TextField key={i} value={this.state.rowMajor[i]} type='number' onChange={this._handleInputChange.bind(this, i)} onBlur={this._handleInputBlur.bind(this, i)} />);
      if ((i + 1) % 3 === 0) {
        elements.push(<p/>);
      }
    }
    return elements;
  }

  _handleInputChange = (i, event) => {
    const newRowMajor = this.state.rowMajor.slice();
    newRowMajor[i] = event.target.value;
    this.setState({rowMajor: newRowMajor});
  }

  _handleInputBlur = (i, event) => {
    const newRowMajor = this.state.rowMajor.slice();
    newRowMajor[i] = event.target.value;
    const matrix = new THREE.Matrix3();
    this.props.onMatrixChanged(matrix.set(...newRowMajor));
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
