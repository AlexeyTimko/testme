import React, {Component} from 'react';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button } from "reactstrap";
import {openFM} from "../actions";

class Home extends Component {
    state = {
        modal: false
    };
    render() {
        return (
            <div>
                <h1>Home</h1>
                <p>Welcome home!</p>
                <Button color="primary" onClick={() => this.props.changePage()}>Go to test page via redux</Button>
                <hr/>
                <Button color="primary mr-3" onClick={()=>this.props.openFM('primary', 'primary flash message')}>alert</Button>
                <Button color="warning mr-3" onClick={()=>this.props.openFM('warning', 'warning flash message')}>alert</Button>
                <Button color="info mr-3" onClick={()=>this.props.openFM('info', 'info flash message')}>alert</Button>
                <Button color="light mr-3" onClick={()=>this.props.openFM('light', 'light flash message')}>alert</Button>
                <Button color="dark mr-3" onClick={()=>this.props.openFM('dark', 'dark flash message')}>alert</Button>
                <Button color="secondary mr-3" onClick={()=>this.props.openFM('secondary', 'secondary flash message')}>alert</Button>
                <Button color="success mr-3" onClick={()=>this.props.openFM('success', 'success flash message')}>alert</Button>
                <Button color="danger" onClick={()=>this.props.openFM('danger', 'danger flash message')}>alert</Button>
            </div>
        );
    }
}
const mapDispatchToProps = dispatch => bindActionCreators({
    changePage: () => push('/tests'),
    openFM
}, dispatch);

export default connect(
    null,
    mapDispatchToProps
)(Home);