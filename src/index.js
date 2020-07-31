import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Button } from '@material-ui/core';
import { Input } from '@material-ui/core';
import './index.css';

// function Hello(props) {
//   return <div style={{ color: props.color }}>안녕하세요 {props.name}</div>
// }

// const Hello = ({value, onChange, onCreate, onKeyPress}) => {
//   return (
//     <div className="form">
//       <input value={value} onChange={onChange} onKeyPress={onKeyPress}/>
//       <div className="create-button" onClick={onCreate}>
//         Add
//       </div>
//     </div>
//   );
// }

class Hello extends React.Component {
  constructor(props) {
    
    super(props);
    this.state= {
      input_value: '',
    };
  };
  


  handleValueChange = (e) => {
    console.log("handleChange:" +e.target.value);
    // 스테이트 변경 후.
    this.setState({ input_value: e.target.value });
    // 부모에게 콜백 보냄.
    this.props.DataCallback(e.target.value);
  }

  keyPressed() {
    //console.log("keyPressed");
  }
  
  onClickAdd= () => {
    console.log("Add!!");

    // 부모에게 콜백 보냄.
    this.props.AddCallback(this.state.input_value);
  }

  render() {
    return(
      <div>
        <Input type="textbox" className="text" onKeyPress={this.keyPressed} onChange={this.handleValueChange}/>
        <Button color="primary" onClick={this.onClickAdd}>Add</Button>
         <h1>{this.state.input_value}</h1>
      </div>
    );
  }
}


class Checklist extends React.Component {
  constructor(props){
    super(props);
    this.state= {
      value: null,
    };
  }


  render() {
    return (
      <div>
        <input type="checkbox" className="box"/>
        <input type="textbox" className="text"/>
      </div>
      // <button
      //   className="square"
      //   onClick={() => this.props.onClick()} 
      // >
      //   { this.props.value }
      // </button>
    );
  }
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state= { input: '' }
  }
  
  parentFunction= (text) => {
    // console.log("parentFunction=" +text);
    // this.setState({
    //   input: text
    // });
  }

  AddFunction= (text) => {
    console.log("AddFunction="+ text);
  }

  handleClick(i) {
    this.setState({
    });
  }

  renderTodo(i) {
    return (<Checklist onClick={() => this.handleClick(i)}
      />
    );
  }

  render() {
    return (
      <div>
        <Hello DataCallback={this.parentFunction} AddCallback={this.AddFunction}/>
        {this.renderTodo(0)}
      </div>
    );
  }
}


class Main extends React.Component {
  render() {
    return (
      <div className="main">
        <div className="main-board">
          <Board />
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Main />,
  document.getElementById('root')
);
