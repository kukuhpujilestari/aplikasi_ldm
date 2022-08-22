import React, { Component } from 'react';
import { connect} from 'react-redux';
import { addMessage } from '../../actions/message';
import apildm from '../../apis/apildm';
import { Link } from 'react-router-dom';

import HeaderBody from '../../components/HeaderBody';

class IndexReport extends Component {
    constructor(props){
        super(props);
        this.state = {
          dataJobs: [],
          productJobs: [],
          userJobs: [],
          imageJobs: [],
          image: 'https://fakeimg.pl/350x200/',
        }
    }

    componentDidMount(){
        this.handleGetData();
    }

    async handleGetData() {
      const config = {
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'Application/json',
          'Authorization': 'Bearer ' + this.props.auth.token,
          'Mode': 'no-cors',
        }
      }
      let id = this.props.match.params.id;
      await apildm.get(`/api/jobs/${id}`, config)
      .then(res => {
        console.log(res.data);
        this.setState({
          dataJobs: res.data.values,
          productJobs: res.data.values.product,
          userJobs: res.data.values.user,
          imageJobs: res.data.values.image,
        })
      }).catch(err => {
        this.props.addMessage({
          message: err.response.data.resDesc,
          infoMessage: 'Error!',
          colorMessage: 'danger',
          isSubmiting: true
      });
      })
    }

    renderDataJob(){
        const job = this.state.dataJobs;
        
        return(
            <tbody key={job.id}>
                <tr>
                    <td>{job.deskripsi}</td>
                    <td>{job.alamat}</td>
                    <td>{job.pic_gedung}</td>
                    <td>{job.no_telpon_pic}</td>
                    <td>{job.tanggal_pemasangan}</td>
                    <td>{job.status_job ? (<span className="badge bg-success">Terverifikasi</span>) : (<span className="badge bg-danger">Menunggu Verifikasi</span>) }</td>
                </tr>
            </tbody>
        )
    }

    renderDataProduct(){
        return this.state.productJobs.map(product => {
          return(
              <tbody key={product.id}>
                  <tr>
                      <td>{product.name}</td>
                      <td>{product.keterangan}</td>
                      <td>{product.jumlah}</td>
                      <td>{product.lokasi_pemasangan}</td>
                  </tr>
              </tbody>
          )
        });
    }

    renderDataImage(){
      return this.state.imageJobs.map(image => {
        return(
            <tbody key={image.thumbnail}>
                <tr>
                    <td className='text-center'><img src={image.thumbnail} className="img-thumbnail" style={{height: '150px', width: '300px'}} alt=""/></td>
                    <td>{image.keterangan}</td>
                </tr>
            </tbody>
        )
      });
    }

    renderDataUser(){
        return this.state.userJobs.map(user => {
          return(
              <tbody key={user.id}>
                  <tr>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.nomor_telepon}</td>
                  </tr>
              </tbody>
          )
        });
    }

    render(){
        return (
            <main>
                
                <div className="container-fluid px-4">
                    <HeaderBody
                        data = {{
                            title: 'Detail Reports'
                        }}
                    />
                    <Link to="/reports" className="btn btn-secondary mb-3">Kembali</Link>
                    <div className="card mb-4">
                      
                        <div className="card-header">
                            <i className="fas fa-table me-1"></i> Data Detail Report
                        </div>
                        <div className="card-body">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>Description</th>
                                        <th>Alamat</th>
                                        <th>Pic</th>
                                        <th>No Pic</th>
                                        <th>Date</th>
                                        <th>Status Job</th>
                                    </tr>
                                </thead>
                                {this.renderDataJob()}
                            </table>
                        </div>
                    </div>
                </div>
                
                <div className="container-fluid px-4">

                    <div className="card mb-4">
                        <div className="card-header">
                            <i className="fas fa-table me-1"></i> Detail Data
                        </div>
                        <div className="card-body">
                            <div className='row'>
                              <div className='col-md-6'>
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th>Title</th>
                                            <th>Keterangan</th>
                                            <th>Jumlah</th>
                                            <th>Lokasi Pemasangan</th>
                                        </tr>
                                    </thead>
                                    {this.renderDataProduct()}
                                </table>
                              </div>
                              <div className='col-md-6'>
                                <table className="table table-bordered">
                                      <thead>
                                          <tr>
                                              <th>Nama</th>
                                              <th>Email</th>
                                              <th>Nomor Telepon</th>
                                              
                                          </tr>
                                      </thead>
                                      {this.renderDataUser()}
                                  </table>
                              </div>
                              <div className='col-md-12'>
                                
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th>Image</th>
                                            <th>Keterangan</th>
                                            
                                            
                                        </tr>
                                    </thead>
                                    {this.renderDataImage()}
                                </table>
                              </div>
                              
                            </div>
                        </div>
                    </div>
                </div>
                
            </main>
        )
    }
}


const mapStateToProps = state => {
    return {
        messages: state.messages,
        reports: state.reports,
        auth: state.auth
    }
}
export default connect(mapStateToProps, {addMessage})(IndexReport);