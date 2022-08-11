import React from "react";
import './Form.css';
import './AddTodo.js';
import AddTodo from "./AddTodo.js";


class Form extends React.Component {

    getData = () => {
        var data = localStorage.getItem('data');
        if (data) {
            return JSON.parse(data);
        }
        return [];
    }
    state = {
        listTodo: this.getData(),
        currentDetail: {
            title: 'qss',
            description: ''
        },
    }




    addNewTodo = (todo) => {
        var newData = [...this.state.listTodo, todo];
        localStorage.setItem('data', JSON.stringify(newData))

        this.setState({
            listTodo: newData
        })
    }

    deleteTodo = (id) => {
        var newData = this.state.listTodo.filter((item) => item.id !== id);

        localStorage.setItem('data', JSON.stringify(newData))

        this.setState({
            listTodo: newData
        })
    }

    showTodo = (id, filter) => {
        var data = this.state.listTodo.filter((item) => item.id === id);
        const element = document.querySelector('.todo-detail');
        document.querySelector('#detail-edit').style.display = 'block';
        element.style.display = 'block'
        this.setState({
            currentDetail: data[0]
        })
        // filter = true is show detaill
        if (filter) {
            document.querySelector('#detail-edit').style.display = 'none';
        } else {// filter = false is edit
        }
    }


    handleOnChangeTitle = (e) => {
        console.log(this.state.currentDetail)
        this.setState({
            currentDetail: {
                ...this.state.currentDetail,
                title: e.target.value,
            }
        })
        console.log(this.state.currentDetail)
    }

    handleOnChangeDescription = (e) => {
        this.setState({
            currentDetail: {
                ...this.state.currentDetail,
                description: e.target.value
            }
        })
    }

    edit = () =>{
        var newData = this.state.listTodo.map((item) =>{
            if(item.id === this.state.currentDetail.id)
                return this.state.currentDetail          
            return item;
        })
        document.querySelector('.todo-detail').style.display = 'none';
        localStorage.setItem('data', JSON.stringify(newData))
        this.setState({
            listTodo: newData
        })
    }





    render() {
        let { listTodo } = this.state;
        let { currentDetail } = this.state;
        return (
            <div className="todo-form">
                <div >
                    <AddTodo
                        addNewTodo={this.addNewTodo} />

                    <div>
                        {listTodo && listTodo.length > 0
                            && listTodo.map((item, index) => {
                                return (
                                    <div className="todo-child" key={item.id}>
                                        <span>{index + 1}-{item.title}</span>
                                        <button className="todo-edit"
                                            onClick={() => { this.showTodo(item.id, false) }}
                                        >Edit</button>
                                        <button className="todo-delete"
                                            onClick={() => { this.deleteTodo(item.id) }}
                                        >Detete</button>
                                        <button className="todo-show"
                                            onClick={() => { this.showTodo(item.id, true) }}
                                        >Show</button>

                                    </div>
                                )
                            })}

                    </div>
                    <div className="todo-detail">
                        <div className='detail-header'><p>Detail Task</p></div>
                        <div className='detail-infor'>
                            <div className='detail-title'>
                                <p>name </p>
                                <p>description </p>
                            </div>
                            <div className='detail-content'>
                                <input className="todo-input" value={currentDetail.title}
                                    onChange={(event) => this.handleOnChangeTitle(event)}
                                />
                                <input className="todo-input" value={currentDetail.description}
                                    onChange={(event) => this.handleOnChangeDescription(event)}
                                />
                            </div>
                            <div className="detail-action">
                                <button className="todo-button" type="submit" id="detail-edit"
                                    onClick={() => this.edit()}
                                > Edit </button>
                                <button className="todo-button" type="submit"
                                    onClick={() => { document.querySelector('.todo-detail').style.display = 'none' }}
                                > Cancel </button>
                            </div>

                        </div>
                    </div>

                </div>

            </div>

        )

    }

}

export default Form;