import React, { Component } from 'react';

class ChildCategory extends Component {
    renderDataChild(){
        return this.props.data.map((res, index) => {
            return (
                <tr key={res.id}>
                    <td>{index + 1}</td>
                    <td>{res.name}</td>
                    <td>{res.icon}</td>
                    <td>{res.label}</td>
                    <td>{res.description}</td>
                    <td>
                        <button className="btn btn-primary btn-sm me-2" onClick={() =>this.props.handleEdit(res)}><i className="fas fa-edit"></i></button>
                        <button className="btn btn-danger btn-sm" onClick={() =>this.props.handleDelete(res.id)}><i className="fas fa-trash"></i></button>
                    </td>
                </tr>
            )
        });
    }

    render(){
        if(this.props.data.length){
            return (
                <tr>
                    <td></td>
                    <td colSpan={5}>
                        <table className="table table-bordered">
                            <thead><tr></tr></thead>
                            <tbody>
                                {this.renderDataChild()}
                            </tbody>
                        </table>
                    </td>
                </tr>
            )
        }else{
            return false;
        }
    }
};

export default ChildCategory;