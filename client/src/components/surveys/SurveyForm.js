//form for user to add input
import React, {Component} from 'react';
import { reduxForm, Field } from 'redux-form';
import SurveyField from './SurveyField';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import validateEmails from '../../utils/validateEmail';

const FIELDS = [
    { label:'Survey Title', name:'title', noValueError: 'title'},
    { label:'Subject Line', name:'subject', noValueError: 'subject'},
    { label:'Email Body', name:'body', noValueError: 'body'},
    { label:'Recipients', name:'recipients', noValueError:'list of recipients'}
]

class SurveyForm extends Component{

    //helper method
    renderFields(){
        return _.map(FIELDS, ({ label, name }) => {
            return <Field key={name} type="text" component={SurveyField} label={label} name={name}/>
        });
    }

    render(){
        return (    
        <div>
            <form onSubmit={this.props.handleSubmit(values => console.log(values))}>
                {this.renderFields()}
                
                <Link to="/surveys" className="teal btn-flat white-text">
                    Cancel
                </Link>
                <button type="submit" className="teal btn-flat right white-text">
                    Next
                    <i className="material-icons right">
                        done
                    </i>
                </button>
            </form>
        </div>
        )
    };
};

//make sure input is valid
function validate(values) {
    const errors = {};
   
    //checks that emails are valid
    errors.recipients = validateEmails(values.recipients || '');
   
    //check to make sure there is a value
    _.each(FIELDS, ({ name, noValueError }) => {
        if(!values[name]){
            errors[name] = "You must provide a " + noValueError;
        }
    });

    return errors;
}
  

export default reduxForm({
    validate,
    form:'survey form',
})(SurveyForm);