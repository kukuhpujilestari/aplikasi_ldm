import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';



import {getJobs, deleteJob, verify} from '../../actions/jobAction';
import {addMessage} from '../../actions/message';

import HeaderBody from '../../components/HeaderBody';
import MessageComp from '../../components/Message';


class IndexJob extends Component {
    constructor(){
        super();
        this.state = {
            currentPage: 1,
            todosPerPage: 10,
            verify: false
        }
    }

    componentDidMount(){
        setTimeout(() => {
            this.props.getJobs(this.state.currentPage, this.state.todosPerPage);
        }, 5000)
        this.props.getJobs(this.state.currentPage, this.state.todosPerPage);

    }

    handleDelete(id){
        this.props.deleteJob(id);
        // console.log(id);
    }

    handleEdit(id){
        this.props.history.push(`/edit-job/${id}`);
    }

    handleUpload(id){
        this.props.history.push(`/upload-job/${id}`);
    }

    handleVerify(id){
        const data = {
            jobsId: id
        }
        this.props.verify(data);
        // console.log(id);
        this.componentDidMount();
    }

    renderAction(res){
        return (
            <>
                {this.props.auth.role === 'QC' ? (<button className="btn btn-info btn-sm mx-1" onClick={() => {this.handleEdit(res.id)}}><i className="fas fa-eye"></i></button>) : null}

                {this.props.auth.role === 'Super-Visor' ? (
                    <button className="btn btn-danger btn-sm mx-1" onClick={() => this.handleDelete(res.id)}><i className="fas fa-trash"></i></button>
                ) : null }
                {this.props.auth.role !== 'Direktur' && this.props.auth.role !== 'QC' ? (<button className="btn btn-primary btn-sm mx-1" onClick={() => {this.handleEdit(res.id)}}><i className="fas fa-edit"></i></button>) : null }
                {this.props.auth.role !== 'Direktur' && this.props.auth.role !== 'QC' ? (<button className="btn btn-success btn-sm mx-1" onClick={() => {this.handleUpload(res.id)}}><i className="fas fa-cloud-upload-alt"></i></button>) : null}

                {this.props.auth.role === 'Direktur' ? (<button className="btn btn-warning btn-sm mx-1" disabled={res.image.length === 0 || res.status_supervisor !== 'Done' ? true : false} onClick={() => {this.handleVerify(res.id)}}><i className="fas fa-check"></i></button>) : null}
                
            </>
        )
    }

    renderDataJob(){
        return this.props.jobs.data.filter(data => data.progress < 100).map((res, index) => {
            return(
                <tbody key={res.id}>
                    <tr>
                        <td rowSpan={2}>{index + 1}</td>
                        <td>{res.deskripsi}</td>
                        <td>{res.alamat}</td>
                        <td>{res.pic_gedung}</td>
                        <td>{res.no_telpon_pic}</td>
                        <td>{res.tanggal_pemasangan}</td>
                        <td>{res.status_job ? (<span className="badge bg-success">Terverifikasi</span>) : (<span className="badge bg-danger">Menunggu Verifikasi</span>) }</td>
                        <td>
                            {this.renderAction(res)}
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={7}>
                            <div className="progress" style={{height: '15px'}}>
                                <div className="progress-bar progress-bar-striped bg-success progress-bar-animated" style={{width: `${res.progress}%`}} role="progressbar" aria-valuenow={res.progress} aria-valuemin="0" aria-valuemax="100">{res.progress}%</div>
                            </div>
                        </td>
                    </tr>
                </tbody>
            )
        })
    }

    handlePage(page){
        this.setState({
            currentPage: page
        });
        this.props.getJobs(this.state.currentPage, this.state.todosPerPage);
    }

    renderPaginantion() {
        const totalPage = this.props.jobs.totalPages;
        const pageActive = this.props.jobs.currentPage;
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
                                    <Link className="page-link" to="/jobs" onClick={() =>this.handlePage(pag)}>{pag}</Link>
                                </li>
                            )
                        })
                    }
                    <li className={pageActive ===  this.props.jobs.totalPages ? "page-item disabled" : "page-item"} key="ko">
                        <Link className="page-link" to="#" onClick={() =>this.handlePage(pageActive + 1)}>Next</Link>
                    </li>
                </ul>
            </nav>
        )
    }
    render(){
        return (
            <main>
                <div className="container-fluid px-4">
                    <HeaderBody
                        data = {{
                            title: 'Jobs',
                            pageLink: '/jobs',
                        }}
                    />

                    <MessageComp/>

                    <div className="card mb-4">
                        <div className="card-header">
                            <i className="fas fa-table me-1"></i>
                            Data Jobs
                            {this.props.auth.role === 'Admin' || this.props.auth.role === 'Super-Visor' ? (
                                <div className="float-end">
                                    <Link to="/add-job" className="btn btn-success mt-10">
                                        <i className="fas fa-plus-square"></i> Create Job
                                    </Link>
                                </div>
                            ): null}

                        </div>
                        <div className="card-body">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>No</th>
                                        <th>Description</th>
                                        <th>Alamat</th>
                                        <th>Pic</th>
                                        <th>No Pic</th>
                                        <th>Date</th>
                                        <th>Status Job</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                {
                                    this.renderDataJob()
                                }
                            </table>
                            {this.renderPaginantion()}
                        </div>
                    </div>
                </div>
            </main>
        )
    }
}

const mapStateToProps = state => {
    return {
        jobs: state.jobs,
        auth: state.auth,
        users: state.users
    }
}

export default connect(mapStateToProps, {getJobs, deleteJob, addMessage, verify})(IndexJob);
