import React, { Component, createRef } from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import {getCategory, deleteCategory} from '../../actions/categoryAction';

import HeaderBody from '../../components/HeaderBody';
import ChildCategory from './ChildCategory';
import MessageComp from '../../components/Message';
import FormCategory from './FormCategory';

class IndexCategories extends Component {
    constructor(props){
        super(props);
        this.reff = createRef();
        this.state = {
            currentPage: 1,
            todosPerPage: 10,
        }
    }

    componentDidMount(){
        setTimeout(() => {
            this.props.getCategory(this.state.todosPerPage, this.state.currentPage);
        }, 100)
        this.props.getCategory(this.state.todosPerPage, this.state.currentPage);
    }

    handleDelete = (id) => {
        this.props.deleteCategory(id);
        this.componentDidMount();
    }

    handleEdit = (res) => {
        this.child.getParent();
        this.child.handleEdit(res);
    }

    renderAction(res){
        return (
            <>
                <button className="btn btn-primary btn-sm mx-1" onClick={() => this.handleEdit(res)}><i className="fas fa-edit"></i></button>
                <button className="btn btn-danger btn-sm" onClick={() => this.handleDelete(res.id)}><i className="fas fa-trash"></i></button>
            </>
        )
    }

    renderDataCategory(){
        return this.props.categories.data.map((res, index) => {
            return(
                <tbody key={res.id}>
                    <tr>
                        <td>{index + 1}</td>
                        <td>{res.name}</td>
                        <td>{res.icon}</td>
                        <td>{res.label}</td>
                        <td>{res.description}</td>
                        <td>
                            {this.renderAction(res)}
                        </td>
                    </tr>
                    <ChildCategory handleDelete={this.handleDelete} handleEdit={this.handleEdit} data={res.items}/>
                </tbody>
            )
        })
    }

    handlePage(page){
        this.setState({
            currentPage: page
        });
        this.props.getCategory(this.state.todosPerPage, this.state.currentPage);
    }

    renderPaginantion() {
        const totalPage = this.props.categories.totalPages;
        const pageActive = this.props.categories.currentPage;
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
                                    <Link className="page-link" to="/categories" onClick={() =>this.handlePage(pag)}>{pag}</Link>
                                </li>
                            )
                        })
                    }
                    <li className={pageActive ===  this.props.categories.totalPages ? "page-item disabled" : "page-item"} key="ko">
                        <Link className="page-link" to="#" onClick={() =>this.handlePage(pageActive + 1)}>Next</Link>
                    </li>
                </ul>
            </nav>
        )
    }

    render(){
        return(
            <main>
                <div className="container-fluid px-4">
                    {/* header body */}
                    <HeaderBody
                        data = {{
                            title: 'Kategori',
                            pageLink: '/categories',
                        }}
                    />

                    <MessageComp/>

                    <FormCategory 
                        // ref={this.reff}
                        childRef={ref => (this.child = ref)}
                        currentPage={this.state.currentPage}
                        todosPerPage={this.state.todosPerPage}
                    />

                    <div className="card mb-4">
                        <div className="card-header">
                            <i className="fas fa-table me-1"></i>
                            Data Category
                        </div>
                        <div className="card-body">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>No</th>
                                        <th>Name</th>
                                        <th>Icon</th>
                                        <th>Label</th>
                                        <th>Description</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                {this.renderDataCategory()}
                            </table>
                            {this.renderPaginantion()}
                        </div>
                    </div>
                </div>
            </main>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        categories: state.catigories
    }
}
export default connect(mapStateToProps, {getCategory, deleteCategory})(IndexCategories);