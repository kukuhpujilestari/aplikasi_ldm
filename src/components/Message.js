import React, { Component } from 'react';
import { connect } from 'react-redux';
import {deleteMessage, getMessage} from '../actions/message';

class MessageComp extends Component {
    componentDidMount(){
        this.props.getMessage();
        setTimeout(() => {
            this.props.deleteMessage();
        }, 6000)
    }

    render(){
        return (
            <>
            {
                this.props.messages.message && (
                <div className="card mb-4">
                    <div className="card-body">
                            <div className={`alert alert-${this.props.messages.colorMessage} alert-dismissible fade show`} role="alert">
                                <strong>{this.props.messages.infoMessage}</strong> {this.props.messages.message}.
                                <button type="button" onClick={() => this.props.deleteMessage()} className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                            </div>
                    </div>
                </div>
                ) 
            }
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        messages: state.messages 
    }
}

export default connect(mapStateToProps, {deleteMessage, getMessage})(MessageComp);