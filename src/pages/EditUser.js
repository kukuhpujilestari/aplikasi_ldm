import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { createUser, editUser } from '../actions/users';
import {addMessage, deleteMessage, getMessage} from '../actions/message';
import apildm from '../apis/apildm';
import apiAlamat from '../apis/apiAlamat';

class EditUser extends Component {
    constructor(){
        super();
        this.state = {
            username: '',
            password: '',
            email: '',
            nama: '',
            nomor_telepon: '',
            alamat: '',
            jenis_kelamin: '',
            tempat_lahir: '',
            tanggal_lahir: '',
            level: '',
            id: '',
            passwordChange: '',
            provinsi: '',
            kabupaten_kota: '',
            kecamatan: '',
            kelurahan: '',
            optionProvinsi: [],
            optionKabupaten: [],
            optionKecamatan: [],
            optionKelurahan: [],
        }
    }

    componentDidMount(){
        const config = {
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'Application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        };
        let id = this.props.match.params.id;
        this.props.getMessage();
        apildm.get(`api/users/${id}`, config)
        .then(res => {
            if(res.data.resCode === '200'){
                this.setState({
                    ...this.state,
                    ...res.data.values
                })
            }else{
                this.props.addMessage({
                    message: res.data.resDesc,
                    infoMessage: 'Error!',
                    colorMessage: 'danger',
                    isSubmiting: true
                });
            }
        });
        this.getProvinsi();
    }

    handeChange = event => {
        this.setState({
            ...this.state,
            [event.target.name]: [event.target.value]
        })
    }

    handeChangePassword = event => {
        this.setState({
            ...this.state,
            [event.target.name]: [event.target.value]
        })
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
        await apiAlamat.get(`/regencies/${id}.json`)
        .then(res => {
            console.log(res.data);
            this.setState({
                optionKabupaten: res.data
            });
        })
    }

    async getKec(id){
        await apiAlamat.get(`/districts/${id}.json`)
        .then(res => {
            console.log(res.data);
            this.setState({
                optionKecamatan: res.data
            });
        })
    }

    async getKel(id){
        await apiAlamat.get(`/villages/${id}.json`)
        .then(res => {
            console.log(res.data);
            this.setState({
                optionKelurahan: res.data
            });
        })
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

    handleChangeProvinsi = event => {
    
        let id = event.target.options[event.target.selectedIndex].dataset.id;
        this.setState({
            ...this.state,
            [event.target.name]: [event.target.value],
        })
        this.getKab(id);
        
    }

    handleChangeKab = event => {
        let id = event.target.options[event.target.selectedIndex].dataset.id;
        this.setState({
            ...this.state,
            [event.target.name]: [event.target.value],
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
        })
        this.getKel(id);
    }

    handleFormSubmit = e => {
        e.preventDefault();
        const dataBody = {
            username: Array.isArray(this.state.username) ? this.state.username[0] : this.state.username,
            email: Array.isArray(this.state.email) ? this.state.email[0] : this.state.email,
            nama: Array.isArray(this.state.nama) ? this.state.nama[0] : this.state.nama,
            nomor_telepon: Array.isArray(this.state.nomor_telepon) ? this.state.nomor_telepon[0] : this.state.nomor_telepon,
            alamat: Array.isArray(this.state.alamat) ? this.state.alamat[0] : this.state.alamat,
            tempat_lahir: Array.isArray(this.state.tempat_lahir) ? this.state.tempat_lahir[0] : this.state.tempat_lahir,
            tanggal_lahir: Array.isArray(this.state.tanggal_lahir) ? this.state.tanggal_lahir[0] : this.state.tanggal_lahir,
            jenis_kelamin: Array.isArray(this.state.jenis_kelamin) ? this.state.jenis_kelamin[0] : this.state.jenis_kelamin,
            level: Array.isArray(this.state.level) ? this.state.level[0] : this.state.level,
            provinsi: Array.isArray(this.state.provinsi) ? this.state.provinsi[0] : this.state.provinsi,
            kabupaten_kota: Array.isArray(this.state.kabupaten_kota) ? this.state.kabupaten_kota[0] : this.state.kabupaten_kota,
            kecamatan: Array.isArray(this.state.kecamatan) ? this.state.kecamatan[0] : this.state.kecamatan,
            kelurahan: Array.isArray(this.state.kelurahan) ? this.state.kelurahan[0] : this.state.kelurahan,
            password: Array.isArray(this.state.passwordChange) ? this.state.passwordChange[0] : this.state.passwordChange,
        };
        this.props.editUser(dataBody, this.state.id);
        console.log(dataBody);
    }

    render(){
        return (
            <main>
                <div className="container-fluid px-4">
                    <h1 className="mt-4">Form Edit User</h1>
                    <ol className="breadcrumb mb-4">
                        <li className="breadcrumb-item"><Link to="/users">Users</Link></li>
                        <li className="breadcrumb-item active">Add User</li>
                    </ol>
                    <div className="card mb-4">
                        {
                            this.props.messages.message && (
                            <div className={`alert alert-${this.props.messages.colorMessage} alert-dismissible fade show`} role="alert">
                                <strong>{this.props.messages.infoMessage}</strong> {this.props.messages.message}.
                                <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={() => this.props.deleteMessage()}></button>
                            </div>
                            )
                        }
                        <div className="card-body">
                            <form onSubmit={this.handleFormSubmit}>
                                <div className="row">
                                    <div className="col-6">
                                        <div className="mb-3">
                                            <label className="form-label">Username</label>
                                            <input readOnly type="text" required name="username" value={this.state.username} onChange={this.handeChange} className="form-control"></input>
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Email</label>
                                            <input type="email" name="email" value={this.state.email} onChange={this.handeChange} className="form-control"></input>
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Password</label>
                                            <input type="password" name="passwordChange" autoComplete='off' value={this.state.passwordChange} onChange={this.handeChangePassword} className="form-control"></input>
                                        </div>
                                    </div>
                                   
                                    <div className="col-6">
                                        <div className="mb-3">
                                            <label className="form-label">Nama Lengkap</label>
                                            <input type="text" name="nama" value={this.state.nama} onChange={this.handeChange} className="form-control"></input>
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">No Telepon</label>
                                            <input type="text" name="nomor_telepon" value={this.state.nomor_telepon} onChange={this.handeChange} className="form-control"></input>
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Alamat</label>
                                            <input type="text" name="alamat" value={this.state.alamat} onChange={this.handeChange} className="form-control"></input>
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
                                    <div className="col-12">
                                        <div className="row">
                                            <div className="col-3">
                                                <div className="mb-3">
                                                    <label className="form-label">Tempat Lahir</label>
                                                    <input type="text" name="tempat_lahir" value={this.state.tempat_lahir} onChange={this.handeChange} className="form-control"></input>
                                                </div>
                                            </div>
                                            <div className="col-3">
                                                <div className="mb-3">
                                                    <label className="form-label">Tanggal Lahir</label>
                                                    <input type="date" name="tanggal_lahir" value={this.state.tanggal_lahir} onChange={this.handeChange} className="form-control"></input>
                                                </div>
                                            </div>
                                            <div className="col-3">
                                                <div className="mb-3">
                                                    <label className="form-label">Jenis Kelamin</label>
                                                    <select name="jenis_kelamin" className="form-select" aria-label="Default select example" value={this.state.jenis_kelamin} onChange={this.handeChange}>
                                                        <option>Choose...</option>
                                                        <option value="L">Laki - Laki</option>
                                                        <option value="P">Perempuan</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-3">
                                                <div className="mb-3">
                                                    <label className="form-label">Role</label>
                                                    <select name="level" className="form-select" aria-label="Default select example" value={this.state.level} onChange={this.handeChange}>
                                                        <option>Choose...</option>
                                                        <option value="Admin">Admin</option>
                                                        <option value="Super-Visior">Super-Visior</option>
                                                        <option value="QC">QC</option>
                                                        <option value="Teknisi">Teknisi</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <button className="btn btn-primary me-2" disabled={this.props.messages.isSubmiting}>
                                    Edit
                                </button>
                                <Link to="/users" className="btn btn-secondary">Cancel</Link>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        messages: state.messages
    }
}

export default connect(mapStateToProps, { createUser, editUser, addMessage, deleteMessage, getMessage })(EditUser);