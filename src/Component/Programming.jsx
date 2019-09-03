/*Component for Programming section of website (similar to Projects section), Contains sidebar,
* pictures, and modal gallery view. */

import React, {Component} from 'react';
import {Container, Row, Col, Image, Button} from 'react-bootstrap';
import './Main_content.css';
import Sidebar from "./Sidebar.jsx";
import Toolbar from "./SideDrawer/Toolbar";
import Backdrop from "./Backdrop/Backdrop";
import * as firebase from 'firebase';
import {Link} from "react-router-dom";
import Footer from "./Footer/Footer";

class Programming extends Component {
    /*Initializes state to default values*/
    constructor(props) {
        super(props);

        this.state = {
            //identifies what section of the website
            option: "Prog",
            //used to open or close the sidebar
            sideDrawerOpen: false,
            //Path for firebase folder that contains pictures
            fire_path: ' ',
            //picture retrieved from firebase storage
            pic: ' ',
            //random boolean to stop image retrial after one iteration
            bool: true,
            //General description of project
            desc: " ",
            //Github to project
            git: " ",
            //Website to project
            website: " ",
            //Specific features of the project
            specs: " ",
            //Tech stack to make the project
            techStack: " ",
            //Time line for project
            time: " "
        };
        this.childHandler = this.childHandler.bind(this);
    }

    //Method to open sidebar or close sidebar through hamburger menu
    drawerToggleClickHandler = () => {
        this.setState((prevState) => {
            return{sideDrawerOpen: !prevState.sideDrawerOpen}
        });
    };

    // resets the firebase path, the array of pictures and the boolean value
    childHandler(dataFromChild) {
        this.setState({
            fire_path: dataFromChild,
            image: "",
            bool: true
        });
    }
    //Pulls information from Sidebar.jsx's Routes array for the specific project and displays it in this component
    descriptionUpdater = (description, github, web, features, tech, duration) => {
        this.setState({
            desc: description,
            git: github,
            website: web,
            specs: features,
            techStack: tech,
            time: duration,
        });
    };

    //Method to open sidebar through a button
    buttonClickHandler = () => {
        this.setState({sideDrawerOpen: true});
    };

    //Method to close sidebar when outside space is clicked on
    backdropClickHandler = () => {
        this.setState({sideDrawerOpen: false});
    };

    /*This code runs every time there is an update in state( in this case,
   * fire_path) it creates a reference to the firebase storage and
   * lists the file from the specific storage folder. Then it
   * gets its url which is later added to the src tag of images.
   * Bool value is set to false to prevent infinite storage retrieval*/
    componentDidUpdate() {
        if (this.state.bool) {
            // Get a reference to the storage service, which is used to create references in your storage bucket
            let storage = firebase.storage();
            // Create a reference to the file we want to download
            let starsRef = storage.ref().child(this.state.fire_path);
            // Get the download URL
            starsRef.getDownloadURL().then((url) => {
                console.log(url);
                this.setState({pic: url})
            }).catch(function (error) {
                console.log(error);
            });
        }
        this.state.bool = false;
    }

    render() {

        let backdrop;
        let imgClass;
        let Gitlabel;
        let Weblabel;
        let body;

        //Backdrop is only called when Sidedrawer is open
        if(this.state.sideDrawerOpen) {backdrop = <Backdrop click={this.backdropClickHandler}/>;}
        //Different styling for image of Holisitic image
        if (this.state.fire_path === "Programming/Holistic.png") {imgClass = "Promo-image-tall"}
        //Styling for all other images
        else {imgClass = "Promo-image"}
        //No weblabel for drone folder
        if(this.state.fire_path === "Programming/Drone.png") {Gitlabel = "Available upon Request"; Weblabel = "None"}
        //weblabel defined for all other projects
        else {Gitlabel = "Here"; Weblabel = "Here"}
        //Content for empty firebase path
        if(this.state.fire_path === " ") {
            body =
                (<div className="Info-wrapper">
                    <Row className="Info-wrap">
                        <h1 className="Title">Programming Projects</h1>
                        <p className="Text-description">
                            This section is a portfolio containing a combination of paid, school,
                            and self-interest programming projects. The details of some of the projects I have
                            worked on are available here, such as: the project's purpose, features,
                            project completion time etc. The Github link and original website link
                            is also available. but please note that my contribution to the
                            project is only the code found in my github, any further changes
                            may ave been made by the owner themselves. You can find my list
                            of projects by clicking the side menu button. To come back to this
                            page, click on "Programming" in the navigation bar above. If any of
                            projects are of interest to you, then please do not hesitate
                            to <Link to="/About">contact</Link> me for more information
                        </p>
                    </Row>
                </div>); }
        // Content for non empty firebase path
        else {
            body =
                (<div>
                    <Row className="Promo-image-wrap">
                        <div className="Image-wrap">
                            <Image className={imgClass} src={this.state.pic} />
                        </div>
                    </Row>
                    {/*populated through values from the updater method*/}
                    <Row className="Info-wrap">
                        <h1 className="Title">Project Description</h1>
                        <p className="Text-description">{this.state.desc}</p>
                        <h4 className="Extra-info"><b>Github Link: </b><a href={this.state.git} target="_blank" rel="noopener noreferrer">{Gitlabel}</a></h4>
                        <h4 className="Extra-info"><b>Original Website: </b><a href={this.state.website} target="_blank" rel="noopener noreferrer">{Weblabel}</a></h4>
                        <h4 className="Extra-info"><b>Features: </b>{this.state.specs} </h4>
                        <h4 className="Extra-info"><b>Tech Stack: </b>{this.state.techStack}</h4>
                        <h4 className="Extra-info"><b>Completion time for project:</b> {this.state.time}</h4>
                    </Row>
                </div>); }

        return (
            <div className="Programming-wrap">
                {/*Toolbar called with hamburger menu handler and path updater*/}
                <Toolbar
                    drawerClick={this.drawerToggleClickHandler}
                    path={this.childHandler}/>
                <Container className="Programming" fluid>
                    <Row className="Image-and-sidebar">
                        <Col className="Sidebar-area">
                            {/*Sidebar called with section indicator, path updater,
                            description updater, sidebar toggler and sidebar opener*/}
                            <Sidebar
                                choice={this.state.option}
                                action={this.childHandler}
                                show={this.state.sideDrawerOpen}
                                hide={this.drawerToggleClickHandler}
                                description={this.descriptionUpdater} />
                            {/*backdrop called*/}
                            {backdrop}
                        </Col>
                    </Row>
                    {/*content based on firebase path called*/}
                    {body}
                    <Row className="btn-wrapper-wrap">
                        <Col lg={4}/>
                        <Col lg={4} className="btn-wrapper">
                            <Button className="btn" block onClick={this.buttonClickHandler}>Show More</Button>
                        </Col>
                        <Col lg={4}/>
                    </Row>
                </Container>
                {/*Footer called here*/}
                <Footer/>
            </div>
        );
    }
}

export default Programming;
