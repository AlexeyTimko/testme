import React, {Component} from 'react';
import {Input, InputGroup, InputGroupAddon, InputGroupText} from "reactstrap";
import FA from 'react-fontawesome';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {search} from "../tests/actions";
import { push } from 'react-router-redux';

class Search extends Component {
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
        this.props.goTests();
        this.props.search(this.state.search);
    };

    keyPressHandler = event => {
        if(event.key === 'Enter'){
            this.search();
        }
    };

    render() {
        const {l} = this.props;
        return (
            <InputGroup style={{width: "auto"}} className="my-3">
                <InputGroupAddon addonType="prepend">
                    <InputGroupText onClick={this.search}>
                        <FA name="search"/>
                    </InputGroupText>
                </InputGroupAddon>
                <Input onChange={this.inputChangeHandler} onKeyPress={this.keyPressHandler}
                       placeholder={l['Search']} value={this.state.search}/>
            </InputGroup>
        );
    }
}

export default connect(
    state => ({
        l: state.lng._
    }),
    dispatch => bindActionCreators({
        search,
        goTests: () => push('/tests')
    }, dispatch)
)(Search);