import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import {getReport} from '../../actions/reportAction';

import HeaderBody from '../../components/HeaderBody';

class IndexReport extends Component {
    constructor(props){
        super(props);
        this.state = {
            currentPage: 1,
            todosPerPage: 5,
        }
    }
    componentDidMount(){
        this.props.getReport(this.state.currentPage, this.state.todosPerPage);
    }

    handleDetail(id){
        this.props.history.push(`/reports/detail/${id}`);
    }

    renderAction(id){
        return (
            <>
                <button className="btn btn-warning btn-sm mx-1" onClick={() => {this.handleDetail(id)}}><i className="fas fa-eye"></i></button>
                {/* <button className="btn btn-danger btn-sm mx-1" onClick={() => {}}><i className="fas fa-cloud-download-alt"></i></button> */}
            </>
        )
    }

    renderDataJob(){
        return this.props.reports.data.filter(data => data.progress === 100).map((res, index) => {
            return(
                <tbody key={res.id}>
                    <tr>
                        <td>{index + 1}</td>
                        <td>{res.deskripsi}</td>
                        <td>{res.alamat}</td>
                        <td>{res.pic_gedung}</td>
                        <td>{res.no_telpon_pic}</td>
                        <td>{res.tanggal_pemasangan}</td>
                        <td>{res.status_job ? (<span className="badge bg-success">Terverifikasi</span>) : (<span className="badge bg-danger">Menunggu Verifikasi</span>) }</td>
                        <td>
                            {this.renderAction(res.id)}
                        </td>
                    </tr>
                </tbody>
            )
        });
    }

    handlePage(page){
        this.setState({
            currentPage: page
        });
        this.props.getReport(this.state.currentPage, this.state.todosPerPage);
    }

    renderPaginantion() {
        const totalPage = this.props.reports.totalPages;
        const pageActive = this.props.reports.currentPage;
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
                    <li className={pageActive ===  this.props.reports.totalPages ? "page-item disabled" : "page-item"} key="ko">
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
                            title: 'Reports'
                        }}
                    />
                    
                    <div className="card mb-4">
                        <div className="card-header">
                            <i className="fas fa-table me-1"></i> Data Report Jobs
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
                                {this.renderDataJob()}
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
        reports: state.reports
    }
}
export default connect(mapStateToProps, {getReport})(IndexReport);