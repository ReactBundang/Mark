import React, { useState } from 'react';
import ReactDOM from 'react-dom';
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
      value: '',
    };
  };
  

  handleClickAdd() {
    console.log("Add!");
  }

  handleChange = (e) => {
    console.log("handleChange:" +e.target.value);
    this.setState({
      value: e.target.value
    });
  }

  keyPressed() {
    console.log("keyPressed");
  }
  

  render() {
    return(
      <div>
        <input type="textbox" className="text" onKeyPress={this.keyPressed} onChange={this.handleChange}/>
        <button
         onClick={this.handleClickAdd()}>Add</button>
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
    this.state= {
      data: null,
    };
  }
  
  state= { input: '' }
  parentFunction= (text) => {
    console.log("parentFunction=" +text);
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
        <Hello handleClickAdd={this.parentFunction}/>
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
