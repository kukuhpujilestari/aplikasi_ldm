import React, { Component } from 'react';
import {connect} from 'react-redux';
import apildm from '../../apis/apildm';
import {createCategory, getCategory, editCategory} from '../../actions/categoryAction';

class FormCategory extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: '',
            icon: '',
            label: '',
            description: '',
            parent_id: '',
            dataOption: [],
            button: 'Add',
            color: 'btn btn-success me-2',
            id: ''
        }
    }

    componentDidMount(){
        setTimeout(() => {
            this.getParent();
            this.props.getCategory(this.props.todosPerPage, this.props.currentPage);
        }, 100)
        this.getParent();
        this.props.getCategory(this.props.todosPerPage, this.props.currentPage);
        const { childRef } = this.props;
        childRef(this);
    }

    componentWillUnmount() {
        const { childRef } = this.props;
        childRef('');
    }

    getParent(){
        const config = {
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'Application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        };
        apildm.get('/api/categories/getParent', config)
        .then(res => {
            this.setState({
                ...this.state,
                dataOption: [...res.data.values]
            })
        });
    }

    handeChange = event => {
        this.setState({
            ...this.state,
            [event.target.name]: [event.target.value]
        })
        
    }

    renderOption(){
        return this.state.dataOption.map(op => {
            return <option key={op.id} value={op.id}>{op.name}</option>;
        })
    }

    handleFormSubmit = (e) => {
        e.preventDefault();
        const dataBody = {
            name: Array.isArray(this.state.name) ? this.state.name[0] : this.state.name,
            label: Array.isArray(this.state.label) ? this.state.label[0] : this.state.label,
            icon: Array.isArray(this.state.icon) ? this.state.icon[0] : this.state.icon,
            description: Array.isArray(this.state.description) ? this.state.description[0] : this.state.description,
            parent_id: Array.isArray(this.state.parent_id) ? this.state.parent_id[0] : this.state.parent_id,
        }
        if(this.state.button === 'Add'){
            this.props.createCategory(dataBody, this.props.id);
        }else{
            this.props.editCategory(dataBody, this.state.id);
        }
        this.setState({
            name: '',
            icon: '',
            label: '',
            description: '',
            parent_id: '',
            button: 'Add',
            color: 'btn btn-success me-2',
            id: ''
        })
        this.componentDidMount();
    }


    handleEdit(res){
        this.setState({
            name: res.name ? res.name : '',
            icon: res.icon ? res.icon : '',
            label: res.label ? res.label : '',
            description: res.description ? res.description : '',
            parent_id: res.parent_id ? res.parent_id : '',
            id: res.id,
            button: 'Edit',
            color: 'btn btn-primary me-2'
        });
    }

    render(){
        return (
            <div className="card mb-4">
                <div className="card-body">
                    <form onSubmit={this.handleFormSubmit}>
                        <div className="row">
                            <div className="col-2">
                                <div className="mb-3">
                                    <label className="form-label">Name</label>
                                    <input type="text" name="name" value={this.state.name} onChange={this.handeChange} className="form-control"></input>
                                </div>
                            </div>
                            <div className="col-2">
                                <div className="mb-3">
                                    <label className="form-label">Icon</label>
                                    <input type="text" name="icon" value={this.state.icon} onChange={this.handeChange} className="form-control"></input>
                                </div>
                            </div>
                            <div className="col-2">
                                <div className="mb-3">
                                    <label className="form-label">Label</label>
                                    <input type="text" name="label" value={this.state.label} onChange={this.handeChange} className="form-control"></input>
                                </div>
                            </div>
                            <div className="col-2">
                                <div className="mb-3">
                                    <label className="form-label">Deskripsi</label>
                                    <input type="text" name="description" value={this.state.description} onChange={this.handeChange} className="form-control"></input>
                                </div>
                            </div>
                            <div className="col-3">
                                <div className="mb-3">
                                    <label className="form-label">Parent ID</label>
                                    {/* <input type="text" name="parent_id" value={this.state.parent_id} onChange={this.handeChange} className="form-control"></input> */}
                                    <select name="parent_id" className="form-select" aria-label="Default select example" value={this.state.parent_id} onChange={this.handeChange}>
                                        <option value="">Choose...</option>
                                        {this.renderOption()}
                                    </select>
                                </div>
                            </div>
                            <div className="col-1">
                                <div style={{marginTop: '26px'}}>
                                    <button className={this.state.color}>{this.state.button}</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default connect(null, {createCategory, getCategory, editCategory})(FormCategory);