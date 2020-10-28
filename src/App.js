// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
import React, { Component } from 'react';
import { ToDoBanner, ToDoRow, ToDoCreator } from './ToDoComponent';
import VisibilityControl from './VisibilityControl';
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: 'Adam',
      todoItems: [{ action: "Buy Flowers", done: false },
      { action: "Get Shoes", done: false },
      { action: "Collect Tickets", done: true },
      { action: "Call Joe", done: false }],
      //newItemText: "",
      showCompleted: true
    };
  }

  updateNewTextValue = (event) => {
    this.setState({ newItemText: event.target.value });
  }
  changeStateData = () => {
    this.setState({
      userName: this.state.userName === "Adam" ? "Bob" : "Adam"
    })
  }

  createNewTodo = (newItemText) => {
    if (!this.state.todoItems
      .find(item => item.action === newItemText)) {
      this.setState({
        todoItems: [...this.state.todoItems,
        { action: newItemText, done: false }],
        //newItemText: ""
      },
      () => localStorage.setItem("todos", JSON.stringify(this.state)));
    }
  }
  toggleTodo = (item) => {
    this.setState({
      todoItems: this.state.todoItems.map(todo => todo.action === item.action ? { ...todo, done: !todo.done } : todo)
    },
    () => localStorage.setItem("todos", JSON.stringify(this.state)));
  }
  // todoTableRows = () =>{
  //   let trArr = this.state.todoItems.map(i => 
  //     // <tr>
  //     //   <td>{item.action}</td>
  //     //   <td><input type="checkbox" checked={item.done} onChange={()=> this.toggleTodo(item)}></input></td>
  //     // </tr>
  //     <ToDoRow key={i.action} item={i} callback={this.toggleTodo}/>
  //     );
  //   return trArr;
  // }

  todoTableRows = (doneValue) => this.state.todoItems
    .filter(item => item.done === doneValue).map(item =>
      <ToDoRow key={item.action} item={item}
        callback={this.toggleTodo} />);
  componentDidMount = () => {
    let data = localStorage.getItem("todos");
    this.setState(data != null  
      ? JSON.parse(data)
      : {
        userName: "Adam",
        todoItems: [{ action: "Buy Flowers", done: false },
        { action: "Get Shoes", done: false },
        { action: "Collect Tickets", done: true },
        { action: "Call Joe", done: false }],
        showCompleted: true
      });
  }
  render() {
    return (<div>
      {/* <h4 className="bg-primary text-white text-center p-2">
        {this.state.userName}'s To Do List
        ({this.state.todoItems.filter(t => !t.done).length} items to do)
      </h4> */}
      <ToDoBanner name={this.state.userName} tasks={this.state.todoItems} />
      <div className="container-fluid">
        {/* <div className="my-1">
          <input className="form-control" type="text" value={this.state.newItemText} onChange={this.updateNewTextValue} />
          <button className="btn btn-primary mt-1" onClick={this.createNewTodo}>Add</button>
        </div> */}
        <ToDoCreator callback={this.createNewTodo} />
        <table className="table table-striped table-bordered">
          <thead>
            <tr><td>Description</td><td>Done!</td></tr>
          </thead>
          <tbody>
            {this.todoTableRows(false)}
          </tbody>
        </table>
        <div className="bg-secondary text-white text-center p-2">
          <VisibilityControl isChecked={this.state.showCompleted} description="Completed tasks"
            callback={(checked) => this.setState({ showCompleted: checked })}
          />
        </div>
        {this.state.showCompleted &&
          <table className="table table-striped table-bordered">
            <thead>
              <tr><th>Description</th><th>Done</th></tr>
            </thead>
            <tbody>{this.todoTableRows(true)}</tbody>
          </table>
        }
      </div>
      {/* <button className="btn btn-primary" onClick={this.changeStateData}>Change</button> */}
    </div>)
  }
}