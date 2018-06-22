import React, {Component, Fragment} from 'react';
import {
    Collapse, Divider, List, ListItem, ListItemIcon, ListItemText
} from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";
import {Link, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {
    ExpandLess, ExpandMore, Home, Language, LibraryBooks, PlaylistAddCheck,
    Star
} from "@material-ui/icons";
import {bindActionCreators} from "redux";
import {setLanguage} from "../actions";
import {logOut, showAuth, showReg} from "../auth/actions";
import { push } from 'react-router-redux';

const styles = theme => ({
    list: {
        width: 250,
    },
    nested: {
        paddingLeft: theme.spacing.unit * 4,
    },
});

class LeftMenu extends Component {
    constructor(props){
        super(props);
        this.state = {
            languageMenu: null
        };
    }

    languageMenuOpen = event => this.setState({
        ...this.state,
        languageMenu: true
    });

    languageMenuClose = event => this.setState({
        ...this.state,
        languageMenu: false
    });

    setLanguage = locale => {
        this.props.close();
        this.props.setLanguage(locale);
    };
    render(){
        const {lng, auth, classes, close, showAuth, showReg, logOut, toMyTests} = this.props;
        const l = lng._;
        const {languageMenu} = this.state;
        return (
            <div className={classes.list}>
                <List component="nav">
                    <ListItem button component={Link} to="/" onClick={close}>
                        <ListItemIcon>
                            <Home />
                        </ListItemIcon>
                        <ListItemText primary={l['Home']} />
                    </ListItem>
                    <ListItem button component={Link} to="/tests" onClick={close}>
                        <ListItemIcon>
                            <PlaylistAddCheck />
                        </ListItemIcon>
                        <ListItemText primary={l['Tests']} />
                    </ListItem>
                    <Divider />
                    <ListItem button onClick={this.languageMenuOpen}>
                        <ListItemIcon>
                            <Language />
                        </ListItemIcon>
                        <ListItemText primary={l['Language']} />
                        {languageMenu ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse in={languageMenu} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItem button className={classes.nested}
                                      onClick={() => this.setLanguage('en')}
                            >
                                {
                                    lng.locale === 'en' ? (
                                        <ListItemIcon>
                                            <Star />
                                        </ListItemIcon>
                                    ) : null
                                }
                                <ListItemText inset primary={l['english']} />
                            </ListItem>
                            <ListItem button className={classes.nested}
                                      onClick={() => this.setLanguage('ru')}
                            >
                                {
                                    lng.locale === 'ru' ? (
                                        <ListItemIcon>
                                            <Star />
                                        </ListItemIcon>
                                    ) : null
                                }
                                <ListItemText inset primary={l['russian']} />
                            </ListItem>
                        </List>
                    </Collapse>
                    <Divider />
                    {
                        auth.user ? (
                            <Fragment>
                                <ListItem button onClick={() => {
                                    close();
                                    toMyTests();
                                }}>
                                    <ListItemIcon>
                                        <LibraryBooks />
                                    </ListItemIcon>
                                    <ListItemText primary={l['My tests']} />
                                </ListItem>
                                <ListItem button onClick={() => {
                                    close();
                                    logOut();
                                }}>
                                    <ListItemText primary={l['Exit']} />
                                </ListItem>
                            </Fragment>
                        ) : (
                            <Fragment>
                                <ListItem button onClick={() => {
                                    close();
                                    showAuth();
                                }}>
                                    <ListItemText primary={l['Log In']} />
                                </ListItem>
                                <ListItem button onClick={() => {
                                    close();
                                    showReg();
                                }}>
                                    <ListItemText primary={l['Sign Up']} />
                                </ListItem>
                            </Fragment>
                        )
                    }
                </List>
            </div>
        );
    }
}

export default withStyles(styles)(withRouter(connect(
    state => ({
        lng: state.lng,
        auth: state.auth
    }),
    dispatch => bindActionCreators({
        setLanguage,
        showAuth,
        showReg,
        logOut,
        toMyTests: ()=>push('/my/tests'),
    }, dispatch)
)(LeftMenu)));