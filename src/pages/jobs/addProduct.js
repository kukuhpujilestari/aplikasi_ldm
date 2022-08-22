import React, { Component } from 'react';
import {connect} from 'react-redux';
import {getProduct} from '../../actions/productAction';
import {getMessage, addMessage} from '../../actions/message';
import {deleteJobProduct, sendProduct, editProductJob} from '../../actions/jobAction';
import apildm from '../../apis/apildm';

class AddProduct extends Component {
    constructor(){
        super();
        this.state = {
            dataProduct: [],
            product: '',
            jumlah: 0,
            keterangan: '',
            lokasi_pemasangan: '',
            icon: true,
            color: 'btn btn-success',
            disable: false
        }
    }

    componentDidMount(){
        setTimeout(() => {
            this.handleGetJobById();
        }, 5000)
        this.props.getProduct(100, 1);
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
            this.setState({
                ...this.state,
                dataProduct: Array.isArray(res.data.values.product) ? res.data.values.product : [],
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

    handeChange = event => {
        this.setState({
            ...this.state,
            [event.target.name]: [event.target.value]
        })
    }

    handleFormSubmit = (e) => {
        e.preventDefault();
        const dataBody = {
            productId: this.state.product[0],
            jobId: this.props.id,
            jumlah: Array.isArray(this.state.jumlah) ? parseInt(this.state.jumlah[0]) : parseInt(this.state.jumlah),
            keterangan: Array.isArray(this.state.keterangan) ? this.state.keterangan[0] : this.state.keterangan,
            lokasi_pemasangan: Array.isArray(this.state.lokasi_pemasangan) ? this.state.lokasi_pemasangan[0] : this.state.lokasi_pemasangan
        }
        if(this.state.icon){
            this.props.sendProduct(dataBody, this.props.id);
            // console.log(dataBody);
        }else{
            const dataBodyUpdate = {
                productId: this.state.product,
                jobId: this.props.id,
                jumlah: Array.isArray(this.state.jumlah) ? parseInt(this.state.jumlah[0]) : parseInt(this.state.jumlah),
                keterangan: Array.isArray(this.state.keterangan) ? this.state.keterangan[0] : this.state.keterangan,
                lokasi_pemasangan: Array.isArray(this.state.lokasi_pemasangan) ? this.state.lokasi_pemasangan[0] : this.state.lokasi_pemasangan
            }
            this.props.editProductJob(dataBodyUpdate, this.props.id);
            // console.log(dataBodyUpdate);
        }
        this.setState({
            product: '',
            jumlah: 0,
            keterangan: '',
            lokasi_pemasangan: '',
            icon: true,
            color: 'btn btn-success',
            disable: false
        })
        // this.componentDidMount();
    }

    handleDeleteProduct(id){
        this.props.deleteJobProduct(this.props.id, id);
        // this.componentDidMount();
    }

    renderOptionProduct(){
        return this.props.products.data.map(op => {
            return (
                <option key={op.id} value={op.id}>{op.title}</option>
            )
        })
    }

    handleEditProduct(res){
        this.setState({
            product: res.id,
            jumlah: res.jumlah,
            keterangan: res.keterangan,
            lokasi_pemasangan: res.lokasi_pemasangan,
            icon: false,
            color: 'btn btn-primary',
            disable: true
        })
    }

    renderDataProductJob(){
        return this.state.dataProduct.map((pro, index) => {
            return (
                <tr key={pro.id}>
                    <td>{index + 1}</td>
                    <td>{pro.name}</td>
                    <td>{pro.jumlah}</td>
                    <td>{pro.lokasi_pemasangan}</td>
                    <td>{pro.keterangan}</td>
                    <td>
                        {this.props.auth.role === 'Super-Visor' ? (
                            <>
                                <button className="btn btn-primary btn-sm mx-1" onClick={() => {this.handleEditProduct(pro)}}><i className="fas fa-edit"></i></button>
                                <button className="btn btn-danger btn-sm mx-1" onClick={() => {this.handleDeleteProduct(pro.id)}}><i className="fas fa-trash"></i></button>
                            </>
                        ): '-'}
                    </td>
                </tr>
            )
        })
    }

    render(){
        return (
            <div className="col-12">
                <div className="card mb-4">
                    <div className="card-body">
                        <p className="mb-0">
                            List Product to job
                        </p>
                        <br/>
                        {this.props.auth.role === 'Super-Visor' ? (
                        <form onSubmit={this.handleFormSubmit}>
                            <div className="row">
                                <div className="col-3">
                                    <div className="mb-3">
                                        <label className="form-label">List Product</label>
                                        <select disabled={this.state.disable} name="product" className="form-select" aria-label="Default select example" value={this.state.product} onChange={this.handeChange}>
                                            <option>Choose...</option>
                                            {this.renderOptionProduct()}
                                        </select>
                                    </div>
                                </div>
                                <div className="col-1">
                                    <div className="mb-3">
                                        <label className="form-label">Jumlah</label>
                                        <input type="number" name="jumlah" value={this.state.jumlah} onChange={this.handeChange} className="form-control"></input>
                                    </div>
                                </div>
                                <div className="col-3">
                                    <div className="mb-3">
                                        <label className="form-label">Lokasi Pemasangan</label>
                                        <input type="text" name="lokasi_pemasangan" value={this.state.lokasi_pemasangan} onChange={this.handeChange} className="form-control"></input>
                                    </div>
                                </div>
                                <div className="col-3">
                                    <div className="mb-3">
                                        <label className="form-label">Keterangan</label>
                                        <input type="text" name="keterangan" value={this.state.keterangan} onChange={this.handeChange} className="form-control"></input>
                                    </div>
                                </div>
                                <div className="col-2">
                                    <div style={{marginTop: '27px'}}>

                                        {
                                            this.state.icon ? (
                                                <button className={this.state.color} type="submit"><i className="fas fa-plus"></i> Add</button>
                                            ) :
                                            (
                                                <button className={this.state.color} type="submit"><i className="fas fa-edit"></i> Edit</button>
                                            )
                                        }
                                        <span onClick={() => this.handleGetJobById()} className="btn btn-primary mx-2"><i className="fa fa-sync-alt"></i></span>
                                    </div>
                                </div>
                            </div>
                        </form>
                      ): <div className="col-6 mb-3">
                            <span onClick={() => this.handleGetJobById()} className="btn btn-primary mx-2"><i className="fa fa-sync-alt"></i></span>
                            </div> }
                        <div className="mb-3">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>No</th>
                                        <th>Nama</th>
                                        <th>Jumlah</th>
                                        <th>Lokasi</th>
                                        <th>Keterangan</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.renderDataProductJob()}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        products: state.products,
        auth: state.auth
    }
}

export default connect(mapStateToProps, {getMessage, getProduct, addMessage, deleteJobProduct, sendProduct, editProductJob})(AddProduct);
