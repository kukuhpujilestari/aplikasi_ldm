import React, { Component } from 'react';
import {fetchUsers} from '../actions/users';
import {getMessage, addMessage, deleteMessage} from '../actions/message';
import {connect} from 'react-redux';
import { Link} from 'react-router-dom';
import apildm from '../apis/apildm';

import HeaderBody from '../components/HeaderBody';
import Message from '../components/Message';

class Users extends Component {
    constructor(){
        super();
        this.state = {
            currentPage: 1,
            todosPerPage: 10,
            
        }
        this.handlePage = this.handlePage.bind(this);
    }

    componentDidMount() {
        this.props.fetchUsers(this.state.todosPerPage, this.state.currentPage);
        this.props.getMessage();
    }

    handlePage(page){
        this.setState({
            currentPage: page
        });
        this.props.fetchUsers(this.state.todosPerPage, this.state.currentPage);
    }

    renderCreateUser(){
        if(this.props.auth.role === 'Admin'){
            return (
                <div className="float-end">
                    <Link to="/add-user" className="btn btn-success mt-10">Create User</Link>
                </div>
            )
        }
    }

    renderDataUser() {
        return this.props.users.data.map((user, index) => {
            return (
                <tr key={user.id}>
                    <td>{index + 1}</td>
                    <td>{user.username }</td>
                    <td>{user.email}</td>
                    <td>{user.nama}</td>
                    <td>{user.nomor_telepon}</td>
                    <td>{user.alamat}</td>
                    <td><span className="badge bg-success">{user.level}</span></td>
                    <td>
                        {this.renderAction(user.id)}
                    </td>
                </tr>
            )
        })
    }

    renderPaginantion() {
        const totalPage = this.props.users.totalPages;
        const pageActive = this.props.users.currentPage;
        var numberPage = [];
        for (let i = 1; i <= totalPage; i++) {
            numberPage.push(i);
        }

        return (
            <nav aria-label="...">
                <ul className="pagination">
                    <li className={pageActive - 1 === 0 ? "page-item disabled" : "page-item"} key="li">
                        <Link className="page-link" to="#" onClick={() =>this.handlePage(pageActive - 1)}>Previous</Link>
                    </li>
                    {
                        numberPage.map(pag => {
                            return (
                                <li className={pageActive === pag ? "page-item active" : "page-item"} aria-current="page" key={pag}>
                                    <Link className="page-link" to="/users" onClick={() =>this.handlePage(pag)}>{pag}</Link>
                                </li>
                            )
                        })
                    }
                    <li className={pageActive ===  this.props.users.totalPages ? "page-item disabled" : "page-item"} key="ko">
                        <Link className="page-link" to="#" onClick={() =>this.handlePage(pageActive + 1)}>Next</Link>
                    </li>
                </ul>
            </nav>
        )
    }

    handleEdit(id){
        this.props.history.push(`/edit-user/${id}`);
    }

    renderAction(id){
        const config = {
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'Application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        };
        const handleDelete = (id) => {
            apildm.delete(`api/users/${id}`, config)
            .then(res => {
                if(res.data.resCode === '200'){
                    this.props.addMessage({
                        message: res.data.resDesc, 
                        colorMessage: 'success', 
                        infoMessage:'Success!'
                    })
                    this.props.fetchUsers(this.state.todosPerPage, this.state.currentPage);
                }else{
                    this.props.addMessage({message: res.data.resDesc, colorMessage: 'danger', infoMessage:'Error!'})
                }
            })
        }
        return (
            <>
                <button className="btn btn-primary btn-sm mx-1" onClick={() => {this.handleEdit(id)}}>Edit</button>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(id)}>Delete</button>
            </>
        )
    }

    render(){
        return (
            <main>
                <div className="container-fluid px-4">

                    {/* header body */}
                    <HeaderBody
                        data = {{
                            title: 'Users',
                            pageLink: '/users',
                        }}
                    />

                    {/* message */}
                    <Message/>
                    
                    <div className="card mb-4">
                        <div className="card-header">
                            <i className="fas fa-table me-1"></i>
                            Data Users

                            {this.renderCreateUser()}
                        </div>
                        <div className="card-body">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>No</th>
                                        <th>Username</th>
                                        <th>Email</th>
                                        <th>Name</th>
                                        <th>No Telphon</th>
                                        <th>Alamat</th>
                                        <th>Role</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.renderDataUser()
                                    }
                                </tbody>
                            </table>
                            {this.renderPaginantion()}
                        </div>
                    </div>
                </div>
            </main>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        users: state.users,
        auth: state.auth,
        messages: state.messages
    }
}
export default connect(mapStateToProps, {fetchUsers, getMessage, addMessage, deleteMessage})(Users);