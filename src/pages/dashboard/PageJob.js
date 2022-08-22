import React, { Component } from 'react';
import {connect} from 'react-redux';
import {getJobs} from '../../actions/jobAction';

class PageJob extends Component {
    componentDidMount(){
        this.props.getJobs(1, 6);
    }

    renderDataJob(){
        return this.props.jobs.data.filter(data => data.progress !== 100).map((res, index) => {
            return (
                <tbody key={res.id}>
                    <tr>
                        <td rowSpan={2}>{index + 1}</td>
                        <td>{res.deskripsi}</td>
                        <td><center><span className="badge bg-success">{res.status_teknisi}</span></center></td>
                        <td><center><span className="badge bg-success">{res.status_supervisor}</span></center></td>
                        <td><center>{res.status_job ? (<span className="badge bg-success">Terverifikasi</span>) : (<span className="badge bg-danger">Menunggu Verifikasi</span>) }</center></td>
                    </tr>
                    <tr>
                        <td colSpan={4}>
                            <div className="progress" style={{height: '15px'}}>
                                <div className="progress-bar progress-bar-striped bg-success progress-bar-animated" style={{width: `${res.progress}%`}} role="progressbar" aria-valuenow={res.progress} aria-valuemin="0" aria-valuemax="100">{res.progress}%</div>
                            </div>
                        </td>
                    </tr>
                </tbody>
            )
        })
    }

    render(){
        return (
            <div className="card mb-4">
                <div className="card-header">
                    <i className="fas fa-table me-1"></i>
                    Data Jobs in Progres {new Date().getFullYear()}
                </div>
                <div className="card-body">
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Description</th>
                                <th>Teknisi</th>
                                <th>Supervisor</th>
                                <th>Status Jobs</th>
                            </tr>
                        </thead>
                        {this.renderDataJob()}
                    </table>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        jobs: state.jobs
    }
}

export default connect(mapStateToProps, {getJobs})(PageJob);