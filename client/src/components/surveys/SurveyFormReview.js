/**
 * user can review before submitting the form
 */
import React from 'react';
import { connect } from 'react-redux';
import formFields from './formFields';
import _ from 'lodash';
import * as actions from '../../actions/index';
import { withRouter } from 'react-router-dom';

const SurveyFormReview = ({ onCancel, formValues, submitSurvey, ConfirmWindow, onConfirm,history }) => {
    const reviewFields = _.map(formFields, ({name, label}) => {
        return (
            <div key={name}>
                <label>{label}</label>
                <div>
                    {formValues[name]}
                </div>
            </div>
        );
    });

    return (
        <div>
            <h5>Please Confirm Your Values:</h5>
            { reviewFields }
            <button onClick={() => submitSurvey(formValues, history) } className="teal btn-flat right white-text">
                    Submit
                    <i className="material-icons right">email</i>
            </button>
            <button className="teal btn-flat left white-text" onClick={ onCancel } >
                    Back
            </button>
            
        </div>
    );
}


function mapStateToProps(state){
    return { formValues: state.form.surveyform.values };
}
export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview));