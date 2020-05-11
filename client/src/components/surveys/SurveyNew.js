/**
 * Parent of SurveyForm and SurveyFromReview - creates them
 */
import React, {Component} from 'react';
import SurveyForm from './SurveyForm';
import SurveyFormReview from './SurveyFormReview';
import { reduxForm } from 'redux-form';
import ConfirmWindow from './ConfirmWindow';

class SurveyNew extends Component{
    constructor(props){
        super(props);

        //this.state = { showFormReview: false }
        this.state = { showFormReview: 0 }

    }

      

    renderContent(){
        console.log(this.state.showFormReview);
        switch(this.state.showFormReview){
            case 1:
                return <SurveyFormReview onConfirm={() => this.setState({ showFormReview: this.state.showFormReview + 1  })}  
                                         onCancel={() => this.setState({ showFormReview: this.state.showFormReview - 1  })}/>;
            case 0:
                return <SurveyForm onSurveySubmit={() => this.setState({ showFormReview: this.state.showFormReview + 1 })}/>;
            case 2://case 2
                console.log("confirming");
                return <ConfirmWindow onCancel={() => this.setState({ showFormReview: this.state.showFormReview - 1 })}/>;

        }
        
        /*
        if (this.state.showFormReview){
            return <SurveyFormReview onCancel={() => this.setState({ showFormReview: false })}/>;
        }
        else{
            return <SurveyForm onSurveySubmit={() => this.setState({ showFormReview: true })}/>;
        }*/
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