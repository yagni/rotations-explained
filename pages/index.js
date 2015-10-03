/**
 * React Static Boilerplate
 * https://github.com/koistya/react-static-boilerplate
 * Copyright (c) Konstantin Tarkus (@koistya) | MIT license
 */

import React, { Component } from 'react';
import Viewport3D from '../components/Viewport3D/Viewport3D';
import RotationContainer from '../components/RotationContainer/RotationContainer';
import THREE from 'three';

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {matrices: [new THREE.Matrix3(), new THREE.Matrix3()]};
  }

  _handleRotationsChanged = (matrices) => {
    this.setState({matrices});
  }

  render() {
    return (
      <div>
        <Viewport3D/>
        <RotationContainer matrices={this.state.matrices} onRotationsChanged={this._handleRotationsChanged} styles={[{width: 200}]}/>
      </div>
    );
  }

}
