import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {search} from "../tests/actions";
import { push } from 'react-router-redux';
import {Paper} from "@material-ui/core";
import {Search} from "@material-ui/icons";
import {FormControl, Input, InputAdornment, InputLabel, withStyles} from "@material-ui/core";

const styles = theme => ({
    icon: {
        cursor: 'pointer'
    },
    paper: {
        padding: theme.spacing.unit * 2,
        marginBottom: theme.spacing.unit * 2
    },
});

class SearchBlock extends Component {
    constructor(props) {
        super(props);
        this.state = {search: ''}
    }

    inputChangeHandler = event => {
        this.setState({
                ...this.state,
                search: event.target.value
            }
        );
    };

    search = () => {
        // this.props.goTests();
        this.props.search(this.state.search);
    };

    keyPressHandler = event => {
        if(event.key === 'Enter'){
            this.search();
        }
    };

    render() {
        const {l, classes} = this.props;
        return (
            <Paper ref={this.setRootRef} className={classes.paper} elevation={4}>
                <FormControl fullWidth>
                    <InputLabel htmlFor="adornment-search">{l['Search']}</InputLabel>
                    <Input
                        id="adornment-search"
                        value={this.state.search}
                        type="search"
                        onChange={this.inputChangeHandler}
                        startAdornment={<InputAdornment position="start">
                            <Search className={classes.icon} onClick={this.search} color="primary"/>
                        </InputAdornment>}
                        onKeyPress={this.keyPressHandler}
                        placeholder={l['Search']}
                    />
                </FormControl>
            </Paper>
        );
    }
}

export default withStyles(styles)(connect(
    state => ({
        l: state.lng._
    }),
    dispatch => bindActionCreators({
        search,
        goTests: () => push('/tests')
    }, dispatch)
)(SearchBlock));