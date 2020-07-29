import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


class Awaiting extends React.Component {
  constructor(props) {
    super(props);
    this.state= {
      value: null,
    };
  };

  handleClick() {
    console.log("test");
  }

  handleChange() {
  }
  

  render() {
    return(
      <div>
        <input type="textbox" class="text" value={this.state.value} onChange={this.handleChange}/>
        <button
         onClick={() => this.handleClick()}>Add</button>
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
        <input type="checkbox" class="box"/>
        <input type="textbox" class="text"/>
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
    };
  }

  handleClick(i) {
    this.setState({
    });
  }

  renderTodo(i) {
    return (<Checklist
      onClick={() => this.handleClick(i)}
      />
    );
  }

  render() {

    return (
      <div>
        <Awaiting/>
        {this.renderTodo(0)}
      </div>
      // <div>
      //   <div className="status">{status}</div>
      //   <div className="board-row">
      //     {this.renderSquare(0)}
      //     {this.renderSquare(1)}
      //     {this.renderSquare(2)}
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
