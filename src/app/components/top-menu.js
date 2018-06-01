import React, {Component} from 'react';
import {Link, withRouter} from "react-router-dom";
import {
    Collapse, DropdownItem, DropdownMenu, DropdownToggle, Nav, Navbar, NavbarToggler, NavItem, UncontrolledDropdown
} from "reactstrap";
import FA from 'react-fontawesome';
import {connect} from "react-redux";
import {setLanguage} from "../actions";
import {bindActionCreators} from "redux";
import {TopMenuAuth} from "./";

class TopMenu extends Component{
    state = {
        isOpen: false
    };
    toggle = () => this.setState({
        ...this.state,
        isOpen: !this.state.isOpen
    });
    render(){
        const l = this.props.lng._;
        return (
            <Navbar color="light" light expand="md">
                <Link to="/" className="navbar-brand text-danger">TestMe</Link>
                <NavbarToggler onClick={this.toggle} >
                    <FA name="ellipsis-v"/>
                </NavbarToggler>
                <Collapse isOpen={this.state.isOpen} navbar>
                    <Nav navbar>
                        <NavItem>
                            <Link to="/tests" className="nav-link">{l.Tests}</Link>
                        </NavItem>
                    </Nav>
                    <TopMenuAuth/>
                    <Nav navbar>
                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav caret>
                                {l.Language}
                            </DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem onClick={() => this.props.setLanguage('en')} active={this.props.lng.locale === 'en'}>
                                    {l.english}
                                </DropdownItem>
                                <DropdownItem onClick={() => this.props.setLanguage('ru')} active={this.props.lng.locale === 'ru'}>
                                    {l.russian}
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </Nav>
                </Collapse>
            </Navbar>
        )
    }
}

export default withRouter(connect(
    state => ({
        lng: state.lng
    }),
    dispatch => bindActionCreators({
        setLanguage
    }, dispatch)
)(TopMenu));
