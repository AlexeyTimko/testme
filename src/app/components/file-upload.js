import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import axios from 'axios';
import config from '../config';
import {
    Card, CardActions, CardContent, CardMedia, IconButton, LinearProgress,
    Tooltip, withStyles
} from "@material-ui/core";
import {PhotoCamera} from "@material-ui/icons";

const baseURL = `${config.host}/api`;

const styles = {
    card: {
        maxWidth: 345,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
};

class FileUpload extends Component{
    constructor(props){
        super(props);
        this.state = {
            selectedFile: null,
            progress: 0,
            image: null,
        };
        if(props.value){
            this.state.image = props.value;
        }
    }
    uploadChangeHandler = event => {
        this.setState({selectedFile: event.target.files[0]}, this.uploadHandler);
    };
    uploadHandler = () => {
        let data = new FormData();
        data.append('file', this.state.selectedFile);
        data.append('name', this.state.selectedFile.name);
        axios.post(`${baseURL}/file-upload`, data, {
            onUploadProgress: progressEvent => {
                this.setState({
                    ...this.state,
                    progress: progressEvent.loaded / progressEvent.total * 100
                });
            }
        })
            .then(res => {
                this.setState({
                    ...this.state,
                    image: res.data.file
                }, () => {
                    if(typeof this.props.onChange === 'function'){
                        this.props.onChange(this.state.image)
                    }
                });
            })
            .catch(err => {
                throw err;
            });
    };
    render(){
        const {l, classes, name} = this.props;
        const {image, progress} = this.state;
        return (
            <Fragment>
                <input accept="image/*" id="icon-button-file"
                       type="file" style={{display: 'none'}}
                       name={name} onChange={this.uploadChangeHandler} />
                <Card className={classes.card}>
                    {image ? (
                        <CardMedia className={classes.media} image={`${config.host}/img/${image}`} />
                    ) : null}
                    {
                        progress ? (
                            <CardContent>
                                <LinearProgress variant="determinate" value={progress} />
                            </CardContent>
                        ) : null
                    }
                    <CardActions>
                        <label htmlFor="icon-button-file">
                            <Tooltip title={l['Upload file']}>
                                <IconButton color="primary" component="span">
                                    <PhotoCamera />
                                </IconButton>
                            </Tooltip>
                        </label>
                    </CardActions>
                </Card>
            </Fragment>
        );
    }
}

export default withStyles(styles)(connect(
    state => ({
        l: state.lng._
    })
)(FileUpload));