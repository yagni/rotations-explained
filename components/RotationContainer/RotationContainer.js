import React, { Component } from 'react';
import RotationCtrl from '../RotationCtrl/RotationCtrl';
import './RotationContainer.scss';

export default class extends Component {
  _handleMatrixChanged(index, matrix) {
    const newMatrices = this.props.matrices.slice();
    newMatrices[index] = matrix;
    this.props.onRotationsChanged(newMatrices);
  }

  _getRotationCtrls() {
    const elements = [];
    for (let i = 0; i < this.props.matrices.length; i++) {
      elements.push(<RotationCtrl key={i} matrix={this.props.matrices[i]} onRotationChanged={this._handleMatrixChanged.bind(this, i)} />);
    }
    return elements;
  }

  render() {
    return (
      <div className="RotationContainer">
        {this._getRotationCtrls()}
      </div>
    );
  }
}
