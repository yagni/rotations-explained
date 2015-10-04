import React, { Component } from 'react';
import TextField from 'material-ui/lib/text-field';
import './MatrixCtrl.scss';
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
      elements.push(<TextField className="TextField" key={i} value={this.state.rowMajor[i]} type='number' onChange={this._handleInputChange.bind(this, i)} onBlur={this._handleInputBlur.bind(this, i)} />);
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
      <div className="MatrixCtrl">
        {this._getControls()}
      </div>
    );
  }
}
