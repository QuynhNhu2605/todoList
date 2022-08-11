import React from 'react';
import { toast } from 'react-toastify';

class AddTodo extends React.Component {
    state = {
        title: '',
        description: ''
    }

    handleOnChangeTitle = (event) => {
        this.setState({
            title: event.target.value
        })
    }

    handleOnChangeDescription = (event) => {
        console.log(event);
        this.setState({
            description: event.target.value
        })
    }


    handleAddTodo = () => {
        if (!this.state.title || !this.state.description) {
            toast.error(`Missing title's Todo!`)
            return;
            //if(undefined/null/empty) => false
        }

        let todo = {
            id: Date.now(),
            title: this.state.title,
            description: this.state.description
        }

        this.props.addNewTodo(todo);
        this.setState({
            title: ''
        })
    }
    render() {
        let { title } = this.state.title;
        let { description } = this.state.description;
        return (

            <div className="todo-add">

                <input
                    type="text"
                    className="todo-input"
                    placeholder=" Add a todo"
                    value={title}
                    onChange={(event) => this.handleOnChangeTitle(event)}
                />
                <div>
                    <input
                        type="text"
                        className="todo-input"
                        placeholder=" Description"
                        value={description}
                        onChange={(event) => this.handleOnChangeDescription(event)}
                    />
                    <button className="todo-button" type="submit"
                        onClick={() => this.handleAddTodo()}> Add a todo </button>
                </div>

            </div>

        )


    }

}

export default AddTodo; 