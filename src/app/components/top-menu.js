import React, {Component} from 'react';
import {Link, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {setLanguage} from "../actions";
import {bindActionCreators} from "redux";
import {TopMenuAuth, LeftMenu} from "./";
import {withStyles} from "@material-ui/core";
import {
    AppBar, Button, Drawer, Hidden, IconButton, Menu, MenuItem, Toolbar, Tooltip
} from "@material-ui/core";
import {Home, Language, MoreVert} from "@material-ui/icons";

const styles = {
    root: {
        flexGrow: 1,
    },
    toolbar: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    menu: {
        display: 'flex',
        alignItems: 'center'
    },
    list: {
        width: 250,
    },
};

class TopMenu extends Component{
    constructor(props){
        super(props);
        this.state = {
            menu: false,
            languageMenu: null
        };
    }

    languageMenuOpen = event => this.setState({
        ...this.state,
        languageMenu: event.currentTarget
    });

    languageMenuClose = event => this.setState({
        ...this.state,
        languageMenu: null
    });

    setLanguage = locale => {
        this.languageMenuClose();
        this.props.setLanguage(locale);
    };

    menuToggle = () => this.setState({
        ...this.state,
        menu: !this.state.menu
    });

    render(){
        const {lng, classes} = this.props;
        const l = lng._;
        const {languageMenu, menu} = this.state;
        return (
            <div className={classes.root}>
                <AppBar position="static" color="secondary">
                    <Toolbar className={classes.toolbar}>
                        <div className={classes.menu}>
                            <Tooltip title={l['Home']}>
                                <IconButton component={Link} to="/" color="inherit">
                                    <Home />
                                </IconButton>
                            </Tooltip>
                            <Hidden xsDown={true}>
                                <Button component={Link} to="/tests" color="inherit">
                                    {l['Tests']}
                                </Button>
                            </Hidden>
                        </div>
                        <div className={classes.menu}>
                            <Hidden xsDown={true}>
                                <TopMenuAuth/>
                                <Tooltip title={l['Language']}>
                                    <IconButton color="inherit" onClick={this.languageMenuOpen}>
                                        <Language />
                                    </IconButton>
                                </Tooltip>
                                <Menu anchorEl={languageMenu}
                                      open={!!languageMenu}
                                      onClose={this.languageMenuClose}
                                >
                                    <MenuItem
                                        selected={lng.locale === 'en'}
                                        onClick={() => this.setLanguage('en')}
                                    >
                                        {l['english']}
                                    </MenuItem>
                                    <MenuItem
                                        selected={lng.locale === 'ru'}
                                        onClick={() => this.setLanguage('ru')}
                                    >
                                        {l['russian']}
                                    </MenuItem>
                                </Menu>
                            </Hidden>
                            <Hidden smUp={true}>
                                <IconButton onClick={this.menuToggle} color="inherit" aria-label="Menu">
                                    <MoreVert />
                                </IconButton>
                            </Hidden>
                        </div>
                    </Toolbar>
                </AppBar>
                <Drawer open={menu} onClose={this.menuToggle}>
                    <div
                        tabIndex={0}
                        role="button"
                    >
                        <LeftMenu close={this.menuToggle}/>
                    </div>
                </Drawer>
            </div>
        );
    }
}

export default withStyles(styles)(withRouter(connect(
    state => ({
        lng: state.lng
    }),
    dispatch => bindActionCreators({
        setLanguage
    }, dispatch)
)(TopMenu)));
