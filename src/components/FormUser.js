import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

class FormUser extends Component {
    renderError({ error, touched }) {
        if (touched && error) {
            return (
                <div className="ui error message">
                    <div className="header">
                        {error}
                    </div>
                </div>
            )
        }
    }

    renderInput = ({ input, label, type, meta }) => {
        const className = `field ${meta.error && meta.touched ? 'error' : ''} `;
        return (
            <div className={className}>
                <label>{label}</label>
                <input {...input} type={type} autoComplete="off" />
                {this.renderError(meta)}
            </div>
        )
    };

    onSubmit = formValues => {
        this.props.onSubmit(formValues);
    }

    render() {
        return (
            <div>
                <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error">
                    <Field name="username" component={this.renderInput} type="text" label="Enter Username" />
                    <Field name="password" component={this.renderInput} type="password" label="Enter Password" />
                    <button className="ui button primary">Submit</button>
                </form>
            </div>
        )
    }
}

const validate = (formValues) => {
    const errors = {};
    if (!formValues.username) {
        errors.username = "You mush enter a username";
    }
    if (!formValues.password) {
        errors.password = "You mush enter a password";
    }

    return errors;
}

export default reduxForm({
    form: 'formUser',
    validate
})(FormUser);