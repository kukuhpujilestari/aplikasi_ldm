import React, { Component } from 'react';
import {connect} from 'react-redux';
import {createJob, editJob} from '../../actions/jobAction';
import {addMessage, getMessage} from '../../actions/message';
import {fetchUsers} from '../../actions/users';

import MessageComp from '../../components/Message';
import HeaderBody from '../../components/HeaderBody';
import { Link } from 'react-router-dom';
import apildm from '../../apis/apildm';
import apiAlamat from '../../apis/apiAlamat';
import AddUser from './addUser';
import AddProduct from './addProduct';

class EditJob extends Component {
    constructor(){
        super();
        this.state = {
            deskripsi: '',
            alamat: '',
            pic_gedung: '',
            no_telpon_pic: '',
            catatan: '',
            detail: '',
            tanggal_pemasangan: '',
            id: '',
            users: [],
            products: [],
            usersInput: [],
            productsInput: [],
            provinsi: '',
            kabupaten_kota: '',
            kecamatan: '',
            kelurahan: '',
            optionProvinsi: [],
            optionKabupaten: [],
            optionKecamatan: [],
            optionKelurahan: [],
        };
    }

    componentDidMount(){
        let id = this.props.match.params.id;
        this.props.getMessage();
        this.props.fetchUsers(100, 1);

        const config = {
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'Application/json',
                'Authorization': 'Bearer ' + this.props.auth.token,
                'Mode': 'no-cors',
            }
        }

        apildm.get(`/api/jobs/${id}`, config)
        .then(res => {
            this.setState({
                ...this.state,
                ...res.data.values
            })        
        }).catch(err => {
            this.props.addMessage({
                message: err.response.data.resDesc,
                infoMessage: 'Error!',
                colorMessage: 'danger',
                isSubmiting: true
            });
        });
        this.getProvinsi();
    }

    async getProvinsi(){
        const config = {
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'Application/json',
            }
        }
        await apiAlamat.get('/provinces.json', config)
        .then(res => {
            this.setState({
                optionProvinsi: res.data
            });
        })
    }

    async getKab(id){
        const config = {
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'Application/json',
            }
        }
        await apiAlamat.get(`/regencies/${id}.json`, config)
        .then(res => {
            console.log(res.data);
            this.setState({
                optionKabupaten: res.data
            });
        })
    }

    async getKec(id){
        const config = {
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'Application/json',
            }
        }
        await apiAlamat.get(`/districts/${id}.json`, config)
        .then(res => {
            console.log(res.data);
            this.setState({
                optionKecamatan: res.data
            });
        })
    }

    async getKel(id){
        const config = {
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'Application/json',
            }
        }
        await apiAlamat.get(`/villages/${id}.json`, config)
        .then(res => {
            console.log(res.data);
            this.setState({
                optionKelurahan: res.data
            });
        })
    }

    handleChangeProvinsi = event => {
        let id = event.target.options[event.target.selectedIndex].dataset.id;
        this.setState({
            ...this.state,
            [event.target.name]: [event.target.value],
            kabDisabled: false,
        })
        this.getKab(id);
    }

    handleChangeKab = event => {
        let id = event.target.options[event.target.selectedIndex].dataset.id;
        this.setState({
            ...this.state,
            [event.target.name]: [event.target.value],
            kecDisabled: false
        })
        this.getKec(id);
    }

    handleChangeKel = event => {
        this.setState({
            ...this.state,
            [event.target.name]: [event.target.value],
            
        })
    }

    handleChangeKec = event => {
        let id = event.target.options[event.target.selectedIndex].dataset.id;
        this.setState({
            ...this.state,
            [event.target.name]: [event.target.value],
            kelDisabled: false
        })
        this.getKel(id);
    }

    renderProvinsi(){
        return this.state.optionProvinsi.map(op => {
            return <option key={op.name} value={op.name} data-id={op.id}>{op.name}</option>;
        })
    }

    renderKabupaten(){
        if (this.state.optionKabupaten.length > 0) {
            return this.state.optionKabupaten.map(op => {
                return <option key={op.name} value={op.name} data-id={op.id}>{op.name}</option>;
            })
        }
        return <option key={this.state.kabupaten_kota} value={this.state.kabupaten_kota} >{this.state.kabupaten_kota}</option>;
    }

    renderKecamatan(){
        if (this.state.optionKecamatan.length > 0) {
            return this.state.optionKecamatan.map(op => {
                return <option key={op.name} value={op.name} data-id={op.id}>{op.name}</option>;
            })
        }
        return <option key={this.state.kecamatan} value={this.state.kecamatan} >{this.state.kecamatan}</option>;
    }

    renderKelurahan(){
        if (this.state.optionKelurahan.length > 0) {
            return this.state.optionKelurahan.map(op => {
                return <option key={op.name} value={op.name} data-id={op.id}>{op.name}</option>;
            })    
        }
        return <option key={this.state.kelurahan} value={this.state.kelurahan} >{this.state.kelurahan}</option>;
        
    }

    handeChange = event => {
        this.setState({
            ...this.state,
            [event.target.name]: [event.target.value]
        })
    }

    handleFormSubmit = e => {
        e.preventDefault();
        const dataBody = {
            deskripsi: Array.isArray(this.state.deskripsi) ? this.state.deskripsi[0] : this.state.deskripsi,
            alamat: Array.isArray(this.state.alamat) ? this.state.alamat[0] : this.state.alamat,
            pic_gedung: Array.isArray(this.state.pic_gedung) ? this.state.pic_gedung[0] : this.state.pic_gedung,
            no_telpon_pic: Array.isArray(this.state.no_telpon_pic) ? this.state.no_telpon_pic[0] : this.state.no_telpon_pic,
            catatan: Array.isArray(this.state.catatan) ? this.state.catatan[0] : this.state.catatan,
            detail: Array.isArray(this.state.detail) ? this.state.detail[0] : this.state.detail,
            tanggal_pemasangan: Array.isArray(this.state.tanggal_pemasangan) ? this.state.tanggal_pemasangan[0] : this.state.tanggal_pemasangan,
            status_teknisi: Array.isArray(this.state.status_teknisi) ? this.state.status_teknisi[0] : this.state.status_teknisi,
            status_supervisor: Array.isArray(this.state.status_supervisor) ? this.state.status_supervisor[0] : this.state.status_supervisor,
            provinsi: Array.isArray(this.state.provinsi) ? this.state.provinsi[0] : this.state.provinsi,
            kabupaten_kota: Array.isArray(this.state.kabupaten_kota) ? this.state.kabupaten_kota[0] : this.state.kabupaten_kota,
            kecamatan: Array.isArray(this.state.kecamatan) ? this.state.kecamatan[0] : this.state.kecamatan,
            kelurahan: Array.isArray(this.state.kelurahan) ? this.state.kelurahan[0] : this.state.kelurahan,
        }
        this.props.editJob(dataBody, this.state.id);
        // console.log(this.state.id);
    }

    render(){
        return(
            <main>
                <div className="container-fluid px-4">
                    <HeaderBody
                        data = {{
                            title: 'Edit Job',
                            pageLink: '/edit-job',
                        }}
                    />

                    <MessageComp/>

                    <div className="card mb-4">
                        <div className="card-body">
                            <form onSubmit={this.handleFormSubmit}>
                                <div className="row">
                                    <div className="col-6">
                                        <div className="mb-3">
                                            <label className="form-label">Deskripsi Job</label>
                                            <input type="text" required name="deskripsi" value={this.state.deskripsi} onChange={this.handeChange} className="form-control"></input>
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Detail Job</label>
                                            <input type="text" name="detail" value={this.state.detail} onChange={this.handeChange} className="form-control"></input>
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Catatan Job</label>
                                            <input type="text" name="catatan" value={this.state.catatan} onChange={this.handeChange} className="form-control"></input>
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="mb-3">
                                            <label className="form-label">Nama PIC</label>
                                            <input type="text" required name="pic_gedung" value={this.state.pic_gedung} onChange={this.handeChange} className="form-control"></input>
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">No PIC</label>
                                            <input type="text" name="no_telpon_pic" value={this.state.no_telpon_pic} onChange={this.handeChange} className="form-control"></input>
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Tanggal Pemasangan</label>
                                            <input type="date" name="tanggal_pemasangan" value={this.state.tanggal_pemasangan} onChange={this.handeChange} className="form-control"></input>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className='row'>
                                            <div className="col-3">
                                                <div className="mb-3">
                                                    <label className="form-label">Provinsi</label>
                                                    <select name="provinsi" className="form-select" aria-label="Default select example" value={this.state.provinsi} onChange={ this.handleChangeProvinsi }>
                                                        <option value="">Choose...</option>
                                                        { this.renderProvinsi() }
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-3">
                                                <div className="mb-3">
                                                    <label className="form-label">Kabupaten/Kota</label>
                                                    <select name="kabupaten_kota" className="form-select" aria-label="Default select example" value={this.state.kabupaten_kota} onChange={this.handleChangeKab}>
                                                        <option value="">Choose...</option>
                                                        { this.renderKabupaten() }
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-3">
                                                <div className="mb-3">
                                                    <label className="form-label">Kecamatan</label>
                                                    <select name="kecamatan" className="form-select" aria-label="Default select example" value={this.state.kecamatan } onChange={this.handleChangeKec} >
                                                        <option value="">Choose...</option>
                                                        { this.renderKecamatan() }
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-3">
                                                <div className="mb-3">
                                                    <label className="form-label">Kelurahan</label>
                                                    <select name="kelurahan" className="form-select" aria-label="Default select example" value={this.state.kelurahan} onChange={this.handleChangeKel} >
                                                        <option value="">Choose...</option>
                                                        { this.renderKelurahan() }
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="mb-3">
                                            <label className="form-label">Alamat Job</label>
                                            <input type="text" name="alamat" value={this.state.alamat} onChange={this.handeChange} className="form-control"></input>
                                        </div>
                                    </div>
                                    <div className="col-3">
                                        <div className="mb-3">
                                            <label className="form-label">Status Teknisi</label>
                                            <select disabled={this.props.auth.role === 'Teknisi' ? false : true} name="status_teknisi" className="form-select" aria-label="Default select example" value={this.state.status_teknisi} onChange={this.handeChange}>
                                                <option>Choose...</option>
                                                <option value="Pending">Pending</option>
                                                <option value="Progress">Progress</option>
                                                <option value="Done">Done</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-3">
                                        <div className="mb-3">
                                            <label className="form-label">Status Supervisor</label>
                                            <select disabled={this.props.auth.role === 'Super-Visor' ? false : true} name="status_supervisor" className="form-select" aria-label="Default select example" value={this.state.status_supervisor} onChange={this.handeChange}>
                                                <option>Choose...</option>
                                                <option value="Pending">Pending</option>
                                                <option value="Progress">Progress</option>
                                                <option value="Done">Done</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        {this.props.auth.role === 'Super-Visor' || this.props.auth.role === 'Teknisi'  ? (
                                            <button className="btn btn-primary me-2" disabled={this.props.messages.isSubmiting}>
                                                {
                                                    this.props.messages.isSubmiting ? ("Saving Data") : ("Update")
                                                }
                                            </button>
                                        ):null}
                                        <Link to="/jobs" className="btn btn-secondary">Cancel</Link>
                                    </div>
                                </div>
                            </form>

                            <AddUser id={this.state.id} usersJob={this.state.users}/>
                            <AddProduct id={this.state.id}/>

                        </div>
                    </div>
                </div>
            </main>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        messages: state.messages,
        auth: state.auth,
        users: state.users
    }
}

export default connect(mapStateToProps, {createJob, addMessage, getMessage, editJob, fetchUsers})(EditJob);
