import React, { Component } from 'react';
import RaisedButton from 'material-ui/lib/raised-button';
import Paper from 'material-ui/lib/paper';
import MatrixCtrl from '../MatrixCtrl/MatrixCtrl';
import AnglesCtrl from '../AnglesCtrl/AnglesCtrl';

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {showMatrix: true, isActive: true};
  }

  _toggleView = () => {
    this.setState({showMatrix: !this.state.showMatrix});
  }

  _toggleActive = () => {
    this.setState({isActive: !this.state.isActive});
  }

  render() {
    return (
      <Paper zDepth={3}>
        {this.state.isActive ? <div>
          <div>
            <RaisedButton onTouchTap={this._toggleView}>Toggle mode</RaisedButton>
            <RaisedButton onTouchTap={this._toggleActive}>x</RaisedButton>
          </div>
          <div>{this.state.showMatrix ? <MatrixCtrl onMatrixChanged="matrixChanged"/> : null}</div>
          <div>{!this.state.showMatrix ? <AnglesCtrl onAxesChanged="axesChanged" onAnglesChanged="anglesChanged"/> : null}</div>
        </div> : null }
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
