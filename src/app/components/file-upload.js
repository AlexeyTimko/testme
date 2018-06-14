import React, {Component} from 'react';
import {Button, Card, CardBody, CardImg, Progress} from "reactstrap";
import {connect} from "react-redux";
import axios from 'axios';

const baseURL = 'http://test-me.com/api';

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
    uploadClickHandler = () => {
        this.inputElement.click();
    };
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
        const {l} = this.props;
        return (
            <div>
                <input ref={input => this.inputElement = input} type="file" style={{display: 'none'}}
                       name={this.props.name} onChange={this.uploadChangeHandler}/>
                <Card>
                    {this.state.image ? (
                        <CardImg top width="100%" src={`http://test-me.com/img/${this.state.image}`} />
                    ) : null}
                    <CardBody>
                        {this.state.progress > 0? (
                            <Progress className="mb-2" color="info" value={this.state.progress}/>
                        ) : null}
                        <Button color="outline-info" onClick={this.uploadClickHandler}>{l['Upload file']}</Button>
                    </CardBody>
                </Card>
            </div>
        );
    }
}

export default connect(
    state => ({
        l: state.lng._
    })
)(FileUpload);