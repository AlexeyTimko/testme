import React from 'react';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {Button} from "reactstrap";

const Home = props => (
    <div>
        <h1>Home</h1>
        <p>Welcome home!</p>
        <Button color="primary" onClick={() => props.changePage()}>Go to test page via redux</Button>
    </div>
);

const mapDispatchToProps = dispatch => bindActionCreators({
    changePage: () => push('/tests')
}, dispatch);

export default connect(
    null,
    mapDispatchToProps
)(Home);