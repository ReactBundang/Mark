class Board extends React.Component {
    constructor(props) {
      super(props);
      this.state= {
        data: null,
      };
    }
    
    state= { input: '' }
    parentFunction= (text) => {
      console.log(text);
    }
  
  
    handleClick(i) {
      this.setState({
      });
    }
  
    renderTodo(i) {
      return (<Checklist parentFunction={this.parentFunction} onClick={() => this.handleClick(i)}
        />
      );
    }
  
    render() {
      return (
        <div>
          <Document/>
          {this.renderTodo(0)}
        </div>
      );
    }
  }


  export default Board;