//import { render } from '@testing-library/react';
import React, { Component } from 'react';

class ToDoBanner extends Component {
    render() {
        return (
            <h4 className="bg-primary text-white text-center p-2">
                {this.props.name}'s To Do List
                ({this.props.tasks.filter(t => !t.done).length} items to do)
            </h4>
        );
    }
}

class ToDoRow extends Component{
    render() {
        return (
            <tr>
                <td>
                    {this.props.item.action}
                </td>
                <td>
                    <input type="checkbox" checked={this.props.item.done} 
                    onChange={() => this.props.callback(this.props.item)}></input>
                </td>
            </tr>
        );
    }
}

class ToDoCreator extends Component{
    constructor(props)
    {
        super(props);
        this.state ={
            newItemText: ""
        };
    }
    updateItem = (event)=>{
        this.setState({
            newItemText: event.target.value
        });
    };
    createNewTodo = ()=>{
        this.props.callback(this.state.newItemText);
        this.setState({newItemText:""});        
    }
    render(){
        return(
            <div className="my-1">
                <input type="text" className="form-control" value={this.state.newItemText} onChange={this.updateItem}/>
                <button class="btn btn-primary mt-1" onClick={this.createNewTodo}>
                        Add
                </button>
            </div>
        );
    }
}

export {ToDoBanner, ToDoRow, ToDoCreator}