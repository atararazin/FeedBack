import React, {Component} from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import {connect} from 'react-redux';
import * as actions from '../actions';

import Header from './Header';
import Landing from './Landing';
import DashBoard from './Dashboard';

//const DashBoard = () => <h2> dashbaord </h2>
const SurveyNew = () => <h2> Surveynew </h2>

class App extends Component{
    componentDidMount(){
        this.props.fetchUser();
    }

    render(){
        return(
            <div className = "container">
            <BrowserRouter>
                <div>
                    <Header/>
                    <Route exact path = "/" component={Landing}/>
                    <Route exact path = "/surveys" component={DashBoard}/>
                    <Route path = "/surveys/new" component={SurveyNew}/>
                </div>
            </BrowserRouter>
        </div>
        );
    }    
};

export default connect(null, actions)(App);