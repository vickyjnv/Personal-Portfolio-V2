import React, {Component} from 'react';
import './Home.jsx'
import './Continue.css';
import {Route, Router, Switch} from "react-router";
import Continue from "./Continue";
import Options from "./Options";
import Photography from "./Photography";
import Programming from "./Programming";
import Projects from "./Projects";
import About from "./About";
import Pricing from "./Pricing/Pricing";
import {CSSTransition, TransitionGroup} from "react-transition-group";

class Routes extends Component {

    componentDidUpdate() {
        window.scrollTo(0,0);
    }

    render() {
        return (
            <div className="Router">
                <Switch>
                    <Route exact path='/' component={Continue}/>
                    <Route exact path='/Options' component={Options}/>
                    <Route exact path='/Photography' component={Photography}/>
                    <Route exact path='/Programming' component={Programming}/>
                    <Route exact path='/Projects' component={Projects}/>
                    <Route exact path='/About' component={About}/>
                    {/*<Route exact path='/Pricing' component={Pricing}/>*/}
                </Switch>
            </div>
        );
    }
}

export default Routes;
