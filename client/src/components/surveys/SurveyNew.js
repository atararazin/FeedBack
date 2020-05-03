/**
 * Parent of SurveyForm and SurveyFromReview - creates them
 */
import React, {Component} from 'react';
import SurveyForm from './SurveyForm';
import SurveyFormReview from './SurveyFormReview';
import { reduxForm } from 'redux-form';

class SurveyNew extends Component{
    constructor(props){
        super(props);

        this.state = { showFormReview: false }
    }

    renderContent(){
        if (this.state.showFormReview){
            return <SurveyFormReview onCancel={() => this.setState({ showFormReview: false })}/>;
        }
        else{
            return <SurveyForm onSurveySubmit={() => this.setState({ showFormReview:true })}/>;
        }
    }

    render(){
        return (    
        <div>
            { this.renderContent() }
        </div>
        )
    };
};

//wired up redux form to the same form in SurveyForm
//we unmount it because we didn't specify otherwise
export default reduxForm({
    form: 'surveyform',
})(SurveyNew);