import React, {Component} from 'react';
import {withStyles} from "@material-ui/core";
import {connect} from "react-redux";
import {Card, CardContent, CardMedia, Hidden, IconButton, Tooltip, Typography} from "@material-ui/core";
import {Link, withRouter} from "react-router-dom";
import config from '../../config';
import {Edit, Remove} from "@material-ui/icons/es/index";

const styles = theme => ({
    card: {
        display: 'flex',
        marginBottom: theme.spacing.unit * 2
    },
    content: {
        flex: 1,
    },
    title: {
        display: 'flex',
        alignItems: 'center',
    },
    cover: {
        width: 200,
        height: 100,
    },
    icon: {
        width: theme.spacing.unit * 2,
        height: theme.spacing.unit * 2
    },
    iconButton: {
        width: theme.spacing.unit * 4,
        height: theme.spacing.unit * 4
    }
});

class TestListItem extends Component {
    render() {
        const {classes, l, test, auth, i, edit, deleteTest} = this.props;
        return (
            <Card className={classes.card}>
                <CardContent className={classes.content}>
                    <Typography variant="title" className={classes.title}>
                        <Link to={`/tests/${test.id}`}>{test.name}</Link>
                        {
                            (auth.user && test.user === auth.user.id)
                                ? (
                                    <span>
                                        <Tooltip title={l['Edit']}>
                                            <IconButton className={classes.iconButton} onClick={() => edit(i)}>
                                                <Edit className={classes.icon}/>
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title={l['Delete']}>
                                            <IconButton className={classes.iconButton} onClick={() => deleteTest(i)}>
                                                <Remove className={classes.icon}    />
                                            </IconButton>
                                        </Tooltip>
                                    </span>
                                ) : null
                        }
                    </Typography>
                    <Typography variant="body1" color="textSecondary">
                        {test.description}
                    </Typography>
                </CardContent>
                {
                    !!test.image &&
                        <Hidden only="xs">
                            <CardMedia
                                className={classes.cover}
                                image={`${config.host}/img/${test.image}`}
                                title={test.name}
                            />
                        </Hidden>
                }
            </Card>
        );
    }
}

export default withRouter(withStyles(styles)(connect(
    state => ({
        l: state.lng._,
        auth: state.auth
    })
)(TestListItem)));