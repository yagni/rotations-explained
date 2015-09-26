/**
 * React Static Boilerplate
 * https://github.com/koistya/react-static-boilerplate
 * Copyright (c) Konstantin Tarkus (@koistya) | MIT license
 */

import React, { Component } from 'react';
import Viewport3D from '../components/Viewport3D/Viewport3D';
import RotationContainer from '../components/RotationContainer/RotationContainer';

export default class extends Component {

  render() {
    return (
      <div>
        <Viewport3D/>
        <RotationContainer/>
      </div>
    );
  }

}
