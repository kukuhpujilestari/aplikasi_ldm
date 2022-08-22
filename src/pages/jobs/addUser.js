import React, { Component } from 'react';
import {connect} from 'react-redux';

import {addMessage, getMessage} from '../../actions/message';
import {fetchUsers} from '../../actions/users';
import {sendJob, deleteJobUser} from '../../actions/jobAction';
import apildm from '../../apis/apildm';

class AddUser extends Component {
    constructor(){
        super();
        this.state = {
            dataUser: [],
            user: '',
            optionuser: []
        }
        this.handleGetJobById = this.handleGetJobById.bind(this);
    }

    componentDidMount(){
        setTimeout(() => {
            this.handleGetJobById();
            this.handleDataOptionTeknisi();
            this.props.fetchUsers(100,1);
        }, 5000)
        
        this.handleGetJobById();
        this.handleDataOptionTeknisi();
    }

    handleGetJobById = () =>{
        const config = {
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'Application/json',
                'Authorization': 'Bearer ' + this.props.auth.token,
                'Mode': 'no-cors',
            }
        }
        apildm.get(`/api/jobs/${this.props.id}`, config)
        .then(res => {
            if(res.data.resCode === '200'){
                    this.setState({
                        ...this.state,
                        dataUser: Array.isArray(res.data.values.user) ? res.data.values.user : [],
                    })

                }
                else{
                    this.props.addMessage({
                        message: res.data.resDesc,
                        infoMessage: 'Error!',
                        colorMessage: 'danger',
                        isSubmiting: true
                    });
                }
            }
        );
        this.handleDataOptionTeknisi();
    }

    handleDataOptionTeknisi(){
        // console.log(this.props.users);
        const dataTeknisi = this.props.users.data.filter(user => user.level === 'Teknisi').map(user => {
            return {
                id: user.id,
                nama: user.nama,
                nomor_telepon: user.nomor_telepon,
                email: user.email
            }
        });
        this.setState({
            optionuser: [...dataTeknisi]
        });
    }

    renderOptionUser(){
        return this.state.optionuser.map(op => {
            return (
                <option key={op.id} value={op.id}>{op.nama}</option>
            )
        })
    }

    handleDeleteUser(id){
        
        // console.log(dataBody);
        this.props.deleteJobUser(this.props.id, id);
        this.componentDidMount();
    }

    renderDataUserJob(){
        return this.state.dataUser.map((user, index) => {
            return (
                <tr key={user.id}>
                    <td>{index + 1}</td>
                    <td>{user.name}</td>
                    <td>{user.nomor_telepon}</td>
                    <td>{user.email}</td>
                    <td>
                        {this.props.auth.role === 'Super-Visor' ? (
                            <button className="btn btn-danger btn-sm mx-1" onClick={() => {this.handleDeleteUser(user.id)}}><i className="fas fa-trash"></i></button>
                        ): '-'}
                    </td>
                </tr>
            )
        })
        // console.log(this.state.dataUser)
    }

    handeChange = event => {
        this.setState({
            ...this.state,
            [event.target.name]: [event.target.value]
        })
    }

    handleFormSubmit = (e) => {
        e.preventDefault();
        const dataBody = {
            users: this.state.user[0],
            jobId: this.props.id
        }
        this.props.sendJob(dataBody, this.props.id);
        this.setState({
            user: ''
        })
        this.componentDidMount();
    }

    render(){
        return (
            <div className="col-12">
                <div className="card mb-4">
                    <div className="card-body">
                        <p className="mb-0">
                            Sent user to job
                        </p>
                        <br/>
                        {
                          this.props.auth.role === 'Super-Visor' ? (
                          <form onSubmit={this.handleFormSubmit}>
                              <div className="row">
                                  <div className="col-6">
                                      <div className="mb-3">
                                          <label className="form-label">Pilih User : </label>
                                          <select name="user" className="form-select" aria-label="Default select example" value={this.state.user} onChange={this.handeChange}>
                                              <option>Choose...</option>
                                              {this.renderOptionUser()}
                                          </select>
                                      </div>
                                  </div>
                                  <div className="col-6">
                                      <div style={{marginTop: '27px'}}>
                                          <button className="btn btn-success" type="submit"><i className="fas fa-plus"></i></button>
                                          <span onClick={() => this.handleGetJobById()} className="btn btn-primary mx-2"><i className="fa fa-sync-alt"></i></span>
                                      </div>
                                  </div>
                              </div>
                          </form>
                          ):
                          <div className="row">
                              <div className="col-6 mb-3">
                                  <div >
                                      <button onClick={() => this.handleGetJobById()} className="btn btn-primary mx-2"><i className="fa fa-sync-alt"></i></button>
                                  </div>
                              </div>
                          </div>
                        }
                        <div className="col-12">
                            <div className="mb-3">
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th>No</th>
                                            <th>Nama</th>
                                            <th>No Telpon</th>
                                            <th>Email</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.renderDataUserJob()}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        messages: state.messages,
        users: state.users,
        auth: state.auth
    }
}

export default connect(mapStateToProps, {getMessage, addMessage, fetchUsers, sendJob, deleteJobUser})(AddUser);
