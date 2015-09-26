/**
 * React Static Boilerplate
 * https://github.com/koistya/react-static-boilerplate
 * Copyright (c) Konstantin Tarkus (@koistya) | MIT license
 */

import React, { Component } from 'react';
import AppBar from 'material-ui/lib/app-bar';
import './Navigation.scss';
import Link from '../Link';

export default class extends Component {

  render() {
    return (
      <AppBar title="Rotations Explained" />
    );
  }

}
