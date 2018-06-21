import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {logOut, showAuth, showReg} from "../actions";
import { push } from 'react-router-redux';
import {Avatar, Button, ListItemIcon, ListItemText, Menu, MenuItem, withStyles} from "@material-ui/core/es/index";
import {deepPurple} from "@material-ui/core/colors";
import {LibraryBooks} from "@material-ui/icons/es/index";

const styles = theme => ({
    button: {
        margin: theme.spacing.unit
    },
    purpleAvatar: {
        margin: 10,
        color: '#fff',
        backgroundColor: deepPurple[500],
        cursor: 'pointer'
    }
});

class TopMenuAuth extends Component{
    constructor(props){
        super(props);
        this.state = {
            menu: null
        };
    }

    menuOpen = event => this.setState({
        ...this.state,
        menu: event.currentTarget
    });

    menuClose = event => this.setState({
        ...this.state,
        menu: null
    });
    render() {
        const {l, auth, classes, logOut, toMyTests} = this.props;
        const {menu} = this.state;
        return auth.user ? (
            <Fragment>
                <Avatar className={classes.purpleAvatar} onClick={this.menuOpen}>
                    {auth.user.email[0].toUpperCase()}
                </Avatar>
                <Menu anchorEl={menu}
                      open={!!menu}
                      onClose={this.menuClose}
                      onClick={this.menuClose}
                >
                    <MenuItem onClick={toMyTests}>
                        <ListItemIcon>
                            <LibraryBooks />
                        </ListItemIcon>
                        <ListItemText primary={l['My tests']} />
                    </MenuItem>
                    <MenuItem onClick={logOut}>
                        <ListItemText primary={l['Exit']} />
                    </MenuItem>
                </Menu>
            </Fragment>
        ): (
            <Fragment>
                <Button className={classes.button} variant="contained" color="primary" onClick={this.props.showAuth}>
                    {l['Log In']}
                </Button>
                <Button className={classes.button} variant="contained" color="secondary" onClick={this.props.showReg}>
                    {l['Sign Up']}
                </Button>
            </Fragment>
        );
    }
}

export default withStyles(styles)(connect(
    state => ({
        l: state.lng._,
        auth: state.auth
    }),
    dispatch => bindActionCreators({
        showAuth,
        showReg,
        logOut,
        toMyTests: ()=>push('/my/tests'),
    }, dispatch)
)(TopMenuAuth));