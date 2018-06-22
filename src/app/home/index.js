import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {Button, Grid, Paper, Typography, withStyles} from "@material-ui/core";
import {lightBlue, blueGrey} from "@material-ui/core/colors";
import TestList from '../tests/components/test-list';
import Test from '../tests/components/test';
import {editFormOpen} from "../tests/actions";
import {Link, withRouter} from "react-router-dom";

const styles = theme => ({
    blockTop: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        minHeight: 200,
        backgroundColor: lightBlue[100],
        color: blueGrey[600],
        marginBottom: theme.spacing.unit * 2
    },
    paper: {
        padding: theme.spacing.unit * 2,
        marginBottom: theme.spacing.unit * 2
    }
});

class Home extends Component {
    render() {
        const {l, classes, editFormOpen} = this.props;
        return (
            <Grid container justify="space-around">
                <Grid item xs={12} className={classes.blockTop}>
                    <Typography variant="display2" gutterBottom>
                        {l['Online test maker']}
                    </Typography>
                </Grid>
                <Grid item xs={12} md={5}>
                    <Paper className={classes.paper} elevation={4} square>
                        <Typography variant="display1" gutterBottom>
                            {l['New Tests']}
                        </Typography>
                        <TestList new/>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={5}>
                    <Paper className={classes.paper} elevation={4} square>
                        <Typography variant="display1" gutterBottom>
                            {l['Random test']}
                        </Typography>
                        <Test id={0}/>
                    </Paper>
                </Grid>
                <Grid item xs={12} className={classes.blockTop}>
                    <Button component={Link} to="/my/tests" onClick={editFormOpen} size="large" variant="outlined" color={'primary'}>{l['Add new test']}</Button>
                </Grid>
            </Grid>
        );
    }
}

export default withRouter(withStyles(styles)(connect(
    state => ({
        l: state.lng._,
        auth: state.auth
    }),
    dispatch => bindActionCreators({
        editFormOpen
    }, dispatch)
)(Home)));