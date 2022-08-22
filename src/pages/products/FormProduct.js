import React, { Component } from 'react';
import {connect} from 'react-redux';
import apildm from '../../apis/apildm';
import {createProduct, getProduct, deleteProduct,editProduct} from '../../actions/productAction';
import {addMessage} from '../../actions/message';

// https://www.youtube.com/watch?v=qxQVqV-e_-w
class FormProduct extends Component{
    constructor(props){
        super(props);
        this.state = {
            title: '',
            price: 0,
            weight: 0,
            stock: 0,
            image: 'https://fakeimg.pl/350x200/',
            saveImage: null,
            categoryId: '',
            description: '',
            dataOption: [],
            id: null,
            icon: true,
            color: 'btn btn-success',
            disable: false,
            button: 'Add',
        }
        this.handeChangeImage = this.handeChangeImage.bind(this);
        
    }

    componentDidMount(){
        setTimeout(() => {
            this.getCategory();
            this.props.getProduct(this.props.todosPerPage, this.props.currentPage);
        }, 5000)
        const { childRef } = this.props;
        childRef(this);
    }

    componentWillUnmount() {
        // const { childRef } = this.props;
        // childRef('');
    }

   async getCategory(){
        const config = {
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'Application/json',
                'Authorization': 'Bearer ' + this.props.auth.token
            }
        };
        await apildm.get('/api/categories/', config)
        .then(res => {
            let category = [];
            let childCategory = [];
            for (let i = 0; i < res.data.values.rows.length; i++) {
                
                for (let j = 0; j < res.data.values.rows[i].items.length; j++) {
                    childCategory.push({
                        id: res.data.values.rows[i].items[j].id,
                        name: res.data.values.rows[i].items[j].name
                    })
                }
                category.push({
                    id: res.data.values.rows[i].id,
                    name: res.data.values.rows[i].name
                })
            }


            this.setState({
                dataOption: category.concat(childCategory)
            });
        })
    }

    renderOption(){
        return this.state.dataOption.map(op => {
            return <option key={op.id} value={op.id}>{op.name}</option>;
        })
    }

    handeChange = event => {
        this.setState({
            ...this.state,
            [event.target.name]: [event.target.value]
        })
    }

    // handeChangeCategory = event => {
    //     this.setState({
    //         ...this.state,
    //         [event.target.name]: [event.target.value],
    //         categoryId: event.target.value
    //     })
    // }

    handeChangeImage(e){
        e.preventDefault();
        let uploaded = e.target.files[0];
        this.setState({
            ...this.state,
            image: URL.createObjectURL(uploaded),
            saveImage: uploaded
        });
        e.target.value = null;
    }

    //conver image url to object javascript
    toDataURL = url => fetch(url)
      .then(response => response.blob())
      .then(blob => new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onloadend = () => resolve(reader.result)
      reader.onerror = reject
      reader.readAsDataURL(blob)
     }))

     dataURLtoFile(dataurl, filename) {
        var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
        while(n--){
        u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, {type:mime});
    }

    handleEdit(res){
        this.setState({
            title: res.title ? res.title : '',
            price: res.price ? res.price : 0,
            weight: res.weight ? res.weight : 0,
            stock: res.stock? res.stock : 0,
            image: res.thumbnail ? res.thumbnail: 'https://fakeimg.pl/350x200/',
            categoryId: res.categories.categoryId ? res.categories.categoryId : '',
            description: res.description ? res.description : '',
            id: res.id,
            button: 'Edit',
            color: 'btn btn-primary me-2',
            saveImage: res.thumbnail ? res.thumbnail : null,
        });
    }

    handleFormSubmit = (e) => {
        e.preventDefault();
        if(!this.state.saveImage){
           return this.props.addMessage({
                message: 'Image Required!',
                infoMessage: 'Error!',
                colorMessage: 'danger',
                isSubmiting: false
            })
        }
        let formData = new FormData();
        formData.append('users', this.props.auth.user);
        formData.append('title', Array.isArray(this.state.title) ? this.state.title[0] : this.state.title);
        formData.append('price', Array.isArray(this.state.price) ? parseInt(this.state.price[0]) : parseInt(this.state.price));
        formData.append('weight', Array.isArray(this.state.weight) ? parseInt(this.state.weight[0]) : parseInt(this.state.weight));
        formData.append('description', Array.isArray(this.state.description) ? this.state.description[0] : this.state.description);
        formData.append('stock', Array.isArray(this.state.stock) ? this.state.stock[0] : this.state.stock);
        formData.append('categories', Array.isArray(this.state.categoryId) ? this.state.categoryId[0] : this.state.categoryId);
        formData.append('image', this.state.saveImage);
        if(this.state.button === 'Add'){
            this.props.createProduct(formData);
            this.componentDidMount();
        }else{
            this.props.editProduct(formData, this.state.id);
            this.componentDidMount();
        }
        // console.log(formData);
        this.setState({
            title: '',
            price: 0,
            weight: 0,
            stock: 0,
            image: 'https://fakeimg.pl/350x200/',
            saveImage: null,
            categoryId: '',
            description: '',
            icon: true,
            color: 'btn btn-success',
            disable: false,
            button: 'Add'
        });
        this.componentDidMount();
    }

    render(){
        return(
            <div>
                <form onSubmit={this.handleFormSubmit}>
                    <div className="card mb-4">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-3">
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="" style={{height: '150px'}}>
                                                <img src={this.state.image} className="img-thumbnail" style={{height: '150px', width: '300px'}} alt=""/>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <input className="form-control" onChange={this.handeChangeImage} type="file" id="image" name="image" accept="image/*"/>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-9">
                                    <div className="row">
                                        <div className="col-6">
                                            <div className="mb-3">
                                                <label className="form-label">Title</label>
                                                <input type="text" name="title" value={this.state.title} onChange={this.handeChange} className="form-control"></input>
                                            </div>
                                        </div>
                                        <div className="col-3">
                                            <div className="mb-3">
                                                <label className="form-label">Price</label>
                                                <input type="number" name="price" value={this.state.price} onChange={this.handeChange} className="form-control"></input>
                                            </div>
                                        </div>
                                        <div className="col-3">
                                            <div className="mb-3">
                                                <label className="form-label">Stock</label>
                                                <input type="number" name="stock" value={this.state.stock} onChange={this.handeChange} className="form-control"></input>
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="mb-3">
                                                <label className="form-label">Description</label>
                                                <input type="text" name="description" value={this.state.description} onChange={this.handeChange} className="form-control"></input>
                                            </div>
                                        </div>
                                        <div className="col-3">
                                            <div className="mb-3">
                                                <label className="form-label">Category</label>
                                                <select name="categoryId" className="form-select" aria-label="Default select example" value={this.state.categoryId} onChange={ this.handeChange }>
                                                    <option value="0">Choose...</option>
                                                    { this.renderOption() }
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-3">
                                            <div className="mb-3">
                                                <label className="form-label">Weight</label>
                                                <input type="number" name="weight" value={this.state.weight} onChange={this.handeChange} className="form-control"></input>
                                            </div>
                                        </div>
                                        <div className="col-2">
                                            <div>
                                                <button className={this.state.color} type="submit"><i className="fas fa-plus"></i> {this.state.button}</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps, {createProduct, getProduct, deleteProduct, addMessage, editProduct})(FormProduct);
