import React, { Component } from 'react';
import {connect} from 'react-redux';
import {createJob} from '../../actions/jobAction';

import MessageComp from '../../components/Message';
import HeaderBody from '../../components/HeaderBody';
import { Link } from 'react-router-dom';
import apiAlamat from '../../apis/apiAlamat';

class CreateJob extends Component {
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
            provinsi: '',
            kabupaten_kota: '',
            kecamatan: '',
            kelurahan: '',
            optionProvinsi: [],
            optionKabupaten: [],
            optionKecamatan: [],
            optionKelurahan: [],
            kabDisabled: true,
            kecDisabled: true,
            kelDisabled: true,
        };
    }

    componentDidMount(){
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



    handeChange = event => {
        this.setState({
            ...this.state,
            [event.target.name]: [event.target.value]
        })
    }

    handleFormSubmit = e => {
        e.preventDefault();
        const dataBody = {
            deskripsi: Array.isArray(this.state.deskripsi) ? this.state.deskripsi[0] :'',
            alamat: Array.isArray(this.state.alamat) ? this.state.alamat[0] :'',
            pic_gedung: Array.isArray(this.state.pic_gedung) ? this.state.pic_gedung[0] :'',
            no_telpon_pic: Array.isArray(this.state.no_telpon_pic) ? this.state.no_telpon_pic[0] :'',
            catatan: Array.isArray(this.state.catatan) ? this.state.catatan[0] :'',
            detail: Array.isArray(this.state.detail) ? this.state.detail[0] :'',
            tanggal_pemasangan: Array.isArray(this.state.tanggal_pemasangan) ? this.state.tanggal_pemasangan[0] :'',
            status_teknisi: "Pending",
            status_supervisor: "Pending",
            provinsi: Array.isArray(this.state.provinsi) ? this.state.provinsi[0] :'',
            kabupaten_kota: Array.isArray(this.state.kabupaten_kota) ? this.state.kabupaten_kota[0] :'',
            kecamatan: Array.isArray(this.state.kecamatan) ? this.state.kecamatan[0] :'',
            kelurahan: Array.isArray(this.state.kelurahan) ? this.state.kelurahan[0] :'',
        }
        this.props.createJob(dataBody);
    }

    render(){
        return(
            <main>
                <div className="container-fluid px-4">
                    <HeaderBody
                        data = {{
                            title: 'Add Job',
                            pageLink: '/add-job',
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
                                            <label className="form-label">Detail Jon</label>
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
                                </div>
                                <div className='row'>
                                    <div className="col-3">
                                        <div className="mb-3">
                                            <label className="form-label">Provinsi</label>
                                            <select name="provinsi" className="form-select" aria-label="Default select example" value={this.state.provinsi} onChange={ this.handleChangeProvinsi }>
                                                <option value="0">Choose...</option>
                                                { this.renderProvinsi() }
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-3">
                                        <div className="mb-3">
                                            <label className="form-label">Kabupaten/Kota</label>
                                            <select name="kabupaten_kota" className="form-select" aria-label="Default select example" disabled={this.state.kabDisabled} value={this.state.kabupaten_kota} onChange={this.handleChangeKab}>
                                                <option value="0">Choose...</option>
                                                { this.renderKabupaten() }
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-3">
                                        <div className="mb-3">
                                            <label className="form-label">Kecamatan</label>
                                            <select name="kecamatan" className="form-select" aria-label="Default select example" value={this.state.kecamatan} disabled={this.state.kecDisabled} onChange={this.handleChangeKec} >
                                                <option value="0">Choose...</option>
                                                { this.renderKecamatan() }
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-3">
                                        <div className="mb-3">
                                            <label className="form-label">Kelurahan</label>
                                            <select name="kelurahan" className="form-select" aria-label="Default select example" value={this.state.kelurahan} disabled={this.state.kelDisabled} onChange={this.handleChangeKel} >
                                                <option value="0">Choose...</option>
                                                { this.renderKelurahan() }
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Alamat Job</label>
                                    <textarea name="alamat" value={this.state.alamat} onChange={this.handeChange} className="form-control"></textarea>
                                </div>
                                <div className="mb-3">
                                    <button className="btn btn-primary me-2" disabled={this.props.messages.isSubmiting}>
                                        {
                                            this.props.messages.isSubmiting ? ("Saving Data") : ("Create")
                                        }
                                    </button>
                                    <Link to="/jobs" className="btn btn-secondary">Cancel</Link>
                                </div>
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
        messages: state.messages,
    }
}

export default connect(mapStateToProps, { createJob })(CreateJob);