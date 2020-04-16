import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';


const Header = () => <h2> Header </h2>
const DashBoard = () => <h2> dashboard </h2>
const SurveyNew = () => <h2> Surveynew </h2>
const Landing = () => <h2> landing </h2>


const App = () => {
    return(
        <div>
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
};

export default App;