/**
 * React Static Boilerplate
 * https://github.com/koistya/react-static-boilerplate
 * Copyright (c) Konstantin Tarkus (@koistya) | MIT license
 */

import React, { Component } from 'react';
import Viewport3D from '../components/Viewport3D/Viewport3D';
import RotationContainer from '../components/RotationContainer/RotationContainer';
import THREE from 'three';
import { convertMatrix3ToMatrix4 } from '../lib/helpers';

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {matrices: [new THREE.Matrix3()], answer: new THREE.Matrix4(), leftToRight: true};
  }

  _handleRotationsChanged = (matrices) => {
    const m4s = matrices.map(m3 => convertMatrix3ToMatrix4(m3));
    if (!this.state.leftToRight) { m4s.reverse(); }
    const answer = m4s.reduce((product, matrix) => product.multiply(matrix));
    this.setState({matrices, answer});
  }

  render() {
    return (
      <div>
        <Viewport3D matrix={this.state.answer}/> (<span style={{color:'red'}}>X</span><span style={{color:'green'}}>Y</span><span style={{color:'blue'}}>Z</span>)
        <RotationContainer answer={this.state.answer} matrices={this.state.matrices} onRotationsChanged={this._handleRotationsChanged} style={{width: 200}}/>
      </div>
    );
  }

}
