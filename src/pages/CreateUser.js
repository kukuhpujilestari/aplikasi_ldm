import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { createUser } from '../actions/users';
import {addMessage, deleteMessage, getMessage} from '../actions/message';
import apiAlamat from '../apis/apiAlamat';

class CreateUser extends Component {
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
            prov: '',
            kab: '',
            kec: '',
            kel: '',
            optionProvinsi: [],
            optionKabupaten: [],
            optionKecamatan: [],
            optionKelurahan: [],
            kabDisabled: true,
            kecDisabled: true,
            kelDisabled: true,
        }
    }

    componentDidMount(){
        this.props.getMessage();
        this.getProvinsi();
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
            username: this.state.username[0] ? this.state.username[0] : '',
            password: this.state.password[0] ? this.state.password[0] : '',
            email: this.state.email[0] ? this.state.email[0] : '',
            nama: this.state.nama[0] ? this.state.nama[0] : '',
            nomor_telepon: this.state.nomor_telepon[0] ? this.state.nomor_telepon[0] : '',
            alamat: this.state.alamat[0] ? this.state.alamat[0] : '',
            jenis_kelamin: this.state.jenis_kelamin[0] ? this.state.jenis_kelamin[0] : '',
            tempat_lahir: this.state.tempat_lahir[0] ? this.state.tempat_lahir[0] : '',
            tanggal_lahir: this.state.tanggal_lahir[0] ? this.state.tanggal_lahir[0] : '',
            level: this.state.level[0] ? this.state.level[0] : 'Teknisi',
            provinsi: this.state.prov[0] ? this.state.prov[0] : '',
            kabupaten_kota: this.state.kab[0] ? this.state.kab[0] : '',
            kecamatan: this.state.kec[0] ? this.state.kec[0] : '',
            kelurahan: this.state.kel[0] ? this.state.kel[0] : '',
        };
        this.props.createUser(dataBody);
        // console.log(dataBody);
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
            return <option key={op.id} value={op.name} data-id={op.id}>{op.name}</option>;
        })
    }

    renderKabupaten(){
        return this.state.optionKabupaten.map(op => {
            return <option key={op.id} value={op.name} data-id={op.id}>{op.name}</option>;
        })
    }

    renderKecamatan(){
        return this.state.optionKecamatan.map(op => {
            return <option key={op.id} value={op.name} data-id={op.id}>{op.name}</option>;
        })
    }

    renderKelurahan(){
        return this.state.optionKelurahan.map(op => {
            return <option key={op.id} value={op.name} data-id={op.id}>{op.name}</option>;
        })
    }

    render(){
        return (
            <main>
                <div className="container-fluid px-4">
                    <h1 className="mt-4">Form Add User</h1>
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
                                            <input type="text" required name="username" value={this.state.username} onChange={this.handeChange} className="form-control" autoComplete='off'></input>
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Email</label>
                                            <input type="email" autoComplete='off' name="email" value={this.state.email} onChange={this.handeChange} className="form-control"></input>
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Password</label>
                                            <input type="password" name="password" autoComplete='off' value={this.state.password} onChange={this.handeChange} className="form-control"></input>
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="mb-3">
                                            <label className="form-label">Nama Lengkap</label>
                                            <input type="text" name="nama" value={this.state.nama} autoComplete='off' onChange={this.handeChange} className="form-control"></input>
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">No Telepon</label>
                                            <input type="text" name="nomor_telepon" value={this.state.nomor_telepon} autoComplete='off' onChange={this.handeChange} className="form-control"></input>
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Alamat</label>
                                            <input autoComplete='off' type="text" name="alamat" value={this.state.alamat} onChange={this.handeChange} className="form-control"></input>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className='row'>
                                            <div className="col-3">
                                                <div className="mb-3">
                                                    <label className="form-label">Provinsi</label>
                                                    <select name="prov" className="form-select" aria-label="Default select example" value={this.state.prov} onChange={ this.handleChangeProvinsi }>
                                                        <option value="0">Choose...</option>
                                                        { this.renderProvinsi() }
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-3">
                                                <div className="mb-3">
                                                    <label className="form-label">Kabupaten/Kota</label>
                                                    <select name="kab" className="form-select" aria-label="Default select example" disabled={this.state.kabDisabled} value={this.state.kab} onChange={this.handleChangeKab}>
                                                        <option value="0">Choose...</option>
                                                        { this.renderKabupaten() }
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-3">
                                                <div className="mb-3">
                                                    <label className="form-label">Kecamatan</label>
                                                    <select name="kec" className="form-select" aria-label="Default select example" value={this.state.kec} disabled={this.state.kecDisabled} onChange={this.handleChangeKec} >
                                                        <option value="0">Choose...</option>
                                                        { this.renderKecamatan() }
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-3">
                                                <div className="mb-3">
                                                    <label className="form-label">Kelurahan</label>
                                                    <select name="kel" className="form-select" aria-label="Default select example" value={this.state.kel} disabled={this.state.kelDisabled} onChange={this.handleChangeKel} >
                                                        <option value="0">Choose...</option>
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
                                                    <input type="text" autoComplete='off' name="tempat_lahir" value={this.state.tempat_lahir} onChange={this.handeChange} className="form-control"></input>
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
                                                        <option value="Super-Visor">Super-Visor</option>
                                                        <option value="QC">QC</option>
                                                        <option value="Teknisi">Teknisi</option>
                                                        <option value="Direktur">Direktur</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <button className="btn btn-primary me-2" disabled={this.props.messages.isSubmiting}>
                                    {
                                        this.props.messages.isSubmiting ? ("Saving Data") : ("Create")
                                    }
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

export default connect(mapStateToProps, { createUser, addMessage, deleteMessage, getMessage })(CreateUser);