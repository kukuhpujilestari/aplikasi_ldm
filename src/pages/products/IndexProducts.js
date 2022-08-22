import React, { Component, createRef } from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import {getProduct, deleteProduct} from '../../actions/productAction';


import HeaderBody from '../../components/HeaderBody';
import MessageComp from '../../components/Message';
import FormProduct from './FormProduct';

class IndexProducts extends Component {
    constructor(props){
        super(props);
        this.reff = createRef();
        this.state = {
            currentPage: 1,
            todosPerPage: 5,
        }
    }

    componentDidMount(){
        setTimeout(() => {
            this.props.getProduct(this.state.todosPerPage, this.state.currentPage);
        }, 100)
        this.props.getProduct(this.state.todosPerPage, this.state.currentPage);
    }

    handleDelete = (id) => {
        this.props.deleteProduct(id);
        this.componentDidMount();
    }

    handleEdit = (res) => {
        this.child.getCategory();
        this.child.handleEdit(res);
    }

    renderAction(res){
      if (this.props.auth.role !== 'Super-Visor') {
        return (
          <>
          <td>
            <button className="btn btn-primary btn-sm mx-1" onClick={() => this.handleEdit(res)}><i className="fas fa-edit"></i></button>
            <button className="btn btn-danger btn-sm" onClick={() => this.handleDelete(res.id)}><i className="fas fa-trash"></i></button>
          </td>
          </>
        )
      }
    }

    renderDataProduct(){
        // console.log(this.props.products);
        return this.props.products.data.map((res, index) => {
            return(
                <tbody key={res.id}>
                    <tr>
                        <td>{index + 1}</td>
                        <td>{res.title}</td>
                        <td><center>{res.thumbnail && <img src={res.thumbnail} className="img-thumbnail" alt={res.thumbnailPath} style={{height: '90px', width: '90px'}}/>}</center></td>
                        <td>{res.weight}</td>
                        <td>{res.stock}</td>
                        <td>{res.price}</td>
                        <td><span className="badge bg-success">{res.categories ? res.categories.name: ''}</span></td>
                        <td>{res.description}</td>
                        {this.renderAction(res)}

                    </tr>
                </tbody>
            )
        })
    }

    handlePage(page){
        this.setState({
            currentPage: page
        });
        this.props.getProduct(this.state.todosPerPage, this.state.currentPage);
    }

    renderPaginantion() {
        const totalPage = this.props.products.totalPages;
        const pageActive = this.props.products.currentPage;
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
                                    <Link className="page-link" to="/products" onClick={() =>this.handlePage(pag)}>{pag}</Link>
                                </li>
                            )
                        })
                    }
                    <li className={pageActive ===  this.props.products.totalPages ? "page-item disabled" : "page-item"} key="ko">
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
                            title: 'Products',
                            pageLink: '/products',
                        }}
                    />

                    <MessageComp/>
                    { this.props.auth.role !== 'Super-Visor' ? (
                    <FormProduct
                        childRef={ref => (this.child = ref)}
                        todosPerPage = {this.state.todosPerPage}
                        currentPage = {this.state.currentPage}
                        componentDidMount = {this.componentDidMount}
                    />
                  ) : null }
                    <div className="card mb-4">
                        <div className="card-header">
                            <i className="fas fa-table me-1"></i>
                            Data Product
                        </div>
                        <div className="card-body">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>No</th>
                                        <th>Title</th>
                                        <th>Image</th>
                                        <th>Weight</th>
                                        <th>Stock</th>
                                        <th>Price</th>
                                        <th>Category</th>
                                        <th>Description</th>
                                        { this.props.auth.role !== 'Super-Visor' ? (
                                        <th>Action</th>
                                        ): null}
                                    </tr>
                                </thead>
                                {this.renderDataProduct()}
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
        products: state.products,
        auth: state.auth
    }
}

export default connect(mapStateToProps, {getProduct, deleteProduct})(IndexProducts);
