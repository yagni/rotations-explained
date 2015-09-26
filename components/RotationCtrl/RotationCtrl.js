import React, { Component } from 'react';
import Paper from 'material-ui/lib/paper';

export default class extends Component {
  render() {
    return (
      <Paper zDepth={3}>Content</Paper>
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
//    <div class="layout vertical" hidden$="[[!isActive]]">
//      <div class="layout horizontal start justified">
//        <paper-button raised on-tap="toggleView">Toggle mode</paper-button>
//        <paper-button raised on-tap="toggleActive">x</paper-button>
//      </div>
//      <matrix-ctrl hidden$="[[!showMatrix]]" on-matrix-changed="matrixChanged"></matrix-ctrl>
//      <angles-ctrl hidden$="[[showMatrix]]" on-axes-changed="axesChanged" on-angles-changed="anglesChanged"></angles-ctrl>
//    </div>
//    <div hidden$="[[isActive]]" on-tap="toggleActive">
//      Hi!
//    </div>
//  </template>
//</dom-module>

//(function () {
//  Polymer({
//    is: 'rotation-ctrl',
//    properties: {
//      showMatrix: {
//        type: Boolean,
//        value: true
//      },
//      isActive: {
//        type: Boolean,
//        value: true
//      },
//    },
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
