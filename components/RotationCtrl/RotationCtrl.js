import React, { Component } from 'react';
import RaisedButton from 'material-ui/lib/raised-button';
import Paper from 'material-ui/lib/paper';
import MatrixCtrl from '../MatrixCtrl/MatrixCtrl';
import AnglesCtrl from '../AnglesCtrl/AnglesCtrl';
import THREE from 'three';

export default class extends Component {
  constructor(props) {
    super(props);
    this.availableUnits = ['degrees', 'radians'];
    this.state = {showMatrix: true, axes: THREE.Euler.DefaultOrder, angleUnits: this.availableUnits[0]};
  }

  _toggleView = () => {
    this.setState({showMatrix: !this.state.showMatrix});
  }

  _getAngles = () => {
    const m4 = new THREE.Matrix4();
    const m3 = this.props.matrix;
    m4.set(m3.elements[0], m3.elements[3], m3.elements[6], 0,
           m3.elements[1], m3.elements[4], m3.elements[7], 0,
           m3.elements[2], m3.elements[5], m3.elements[8], 0,
           0, 0, 0, 1);
    const angles = new THREE.Euler(0,0,0).setFromRotationMatrix(m4, this.state.axes);
    return this._normalizeUnits(this.state.axes.split('').map(axis => angles[axis.toLowerCase()]));
  }

  _isRadians = () => this.state.angleUnits === this.availableUnits[1]

  _assureRadians = (angle) => {
    if (this._isRadians()) { return angle; }
    return THREE.Math.degToRad(angle);
  }

  // assumes angles are passed as radians
  _normalizeUnits = (angles) => {
    if (this._isRadians()) { return angles; }
    return angles.map(angle => THREE.Math.radToDeg(angle));
  }

  _handleAnglesChanged = (angles) => {
    const m4 = new THREE.Matrix4();
    angles = angles.map(this._assureRadians);
    m4.makeRotationFromEuler(new THREE.Euler(...angles, this.state.axes));
    const m3 = new THREE.Matrix3();
    this._handleMatrixChanged(m3.set(m4.elements[0], m4.elements[4], m4.elements[8],
                                     m4.elements[1], m4.elements[5], m4.elements[9],
                                     m4.elements[2], m4.elements[6], m4.elements[10]));
  }

  _handleAxesChanged = (axes) => {
    this.setState({axes});
  }

  _handleMatrixChanged = (matrix) => {
    this.props.onRotationChanged(matrix);
  }

  _handleAngleUnitsChanged = (units) => {
    this.setState({angleUnits: units});
  }

  render() {
    return (
      <Paper zDepth={3}>
        <div>
          <div>
            <RaisedButton onTouchTap={this._toggleView}>Toggle mode</RaisedButton>
          </div>
          <div>{this.state.showMatrix ? <MatrixCtrl onMatrixChanged={this._handleMatrixChanged} matrix={this.props.matrix} /> : null}</div>
          <div>{!this.state.showMatrix ? <AnglesCtrl onAxesChanged={this._handleAxesChanged} onAnglesChanged={this._handleAnglesChanged} availableAxes={THREE.Euler.RotationOrders} axes={this.state.axes} angles={this._getAngles()} availableUnits={this.availableUnits} units={this.state.angleUnits} onUnitsChanged={this._handleAngleUnitsChanged} /> : null}</div>
        </div>
      </Paper>
    );
  }
}

//<dom-module id="rotation-ctrl">
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
//    <div hidden$="[[isActive]]" on-tap="toggleActive">
//      Hi!
//    </div>
//  </template>
//</dom-module>

//(function () {
//  Polymer({
//    is: 'rotation-ctrl',
//    anglesChanged(e) {
//      // e.detail
//    },
//    axesChanged(e) {
//      // e.detail
//    },
//    toggleActive() {
//      this.isActive = !this.isActive;
//    },
//    matrixChanged(e) {
//      // e.detail
//    },
//    toggleView() {
//      this.showMatrix = !this.showMatrix;
//    },
//    ready() {
//    }
//  });
//})();
