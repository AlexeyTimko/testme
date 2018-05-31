import React, {Component} from 'react';
import Home from './home';
import Tests from './tests';
import About from './about';
import './App.css';
import {Link, Route} from "react-router-dom";
import {
    Collapse, Nav, Navbar, NavbarToggler, NavItem
} from "reactstrap";
import FA from 'react-fontawesome';

export default class App extends Component{
    state = {
        isOpen: false
    };
    toggle = () => this.setState({
        ...this.state,
        isOpen: !this.state.isOpen
    });
    render(){
        return (
            <div className="container-fluid">
                <header>
                    <Navbar color="light" light expand="md">
                        <Link to="/" className="navbar-brand text-danger">TestMe</Link>
                        <NavbarToggler onClick={this.toggle} >
                            <FA name="ellipsis-v"/>
                        </NavbarToggler>
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className="ml-auto" navbar>
                                <NavItem>
                                    <Link to="/" className="nav-link">Home</Link>
                                </NavItem>
                                <NavItem>
                                    <Link to="/tests" className="nav-link">Tests</Link>
                                </NavItem>
                                <NavItem>
                                    <Link to="/about-us" className="nav-link">About</Link>
                                </NavItem>
                            </Nav>
                        </Collapse>
                    </Navbar>
                </header>

                <main>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/tests" component={Tests} />
                    <Route exact path="/about-us" component={About} />
                </main>
            </div>
        )
    }
}
