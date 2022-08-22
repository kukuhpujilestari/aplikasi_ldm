import React, { Component } from "react";
// import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { addMessage, getMessage} from '../../actions/message';
import { uploadImageJob } from '../../actions/jobAction';

import MessageComp from '../../components/Message';
import HeaderBody from '../../components/HeaderBody';
import { Link } from 'react-router-dom';
import apildm from "../../apis/apildm";

class UploadImageJob extends Component {
  constructor(props) {
    super(props);
    this.state = {
        
      image: 'https://fakeimg.pl/350x200/',
      saveImage: null,
      keterangan: '',
    };
    this.handeChangeImage = this.handeChangeImage.bind(this);
  }

  componentDidMount() {
    this.props.getMessage();
    this.handleGetData();
  }

  handleGetData = async () => {
    let id = this.props.match.params.id;
    const config = {
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'Application/json',
            'Authorization': 'Bearer ' + this.props.auth.token,
            'Mode': 'no-cors',
        }
    }

    await apildm.get(`/api/jobs/${id}`, config)
    .then(res => {
        if(res.data.values.image.length > 0){
            this.setState({
                image: res.data.values.image[0].thumbnail,
                keterangan: res.data.values.image[0].keterangan
            });
        }
                
    }).catch(err => {
       
        this.props.addMessage({
            message: err.response.data.resDesc,
            infoMessage: 'Error!',
            colorMessage: 'danger',
            isSubmiting: true
        });
    });
  }

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

    handleChange = event => {
        this.setState({
            ...this.state,
            [event.target.name]: [event.target.value]
        })
    }

    handleFormSubmit = event => {
        event.preventDefault();
        const data = new FormData();
        data.append('jobId', this.props.match.params.id);
        data.append('image', this.state.saveImage);
        data.append('keterangan', this.state.keterangan);
        this.props.uploadImageJob(data);
        // console.log(data);
    }

  render() {
    return (
      <main>
        <div className="container-fluid px-4">
            <HeaderBody
                data = {{
                    title: 'Upload Job',
                    pageLink: '/upload-job',
                }} />
          <MessageComp/>
          <div>
                <form onSubmit={this.handleFormSubmit}>
                    <div className="card mb-4">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-12">
                                    <div className="row">
                                        <div className="form-group mb-2">
                                            <div className="" style={{height: '150px'}}>
                                                <img src={this.state.image} className="img-thumbnail" style={{height: '150px', width: '300px'}} alt=""/>
                                            </div>
                                        </div>
                                        <div className="form-group mb-2">
                                            <input className="form-control" onChange={ this.handeChangeImage } type="file" id="image" name="image" accept="image/*"/>
                                        </div>
                                        <div className="form-group mb-2">
                                            <input className="form-control" onChange={ this.handleChange } type="text" name="keterangan" value={this.state.keterangan}/>
                                        </div>
                                        <div className="form-group mb-2">
                                            <button className="btn btn-success me-2" type="submit">Update Data</button>
                                            <Link to="/jobs" className="btn btn-secondary">Cancel</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
          
        </div>
      </main>
      
    )
  }

}

const mapStateToProps = state => {
  return {
      messages: state.messages,
      auth: state.auth,
      jobs: state.jobs,
  }
}

export default connect(mapStateToProps, {addMessage, getMessage, uploadImageJob})(UploadImageJob);