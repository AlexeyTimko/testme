import React, {Component} from 'react';
import {Tooltip} from "reactstrap";
import {connect} from "react-redux";
import './tooltip.css';

class MyTooltip extends Component {
    state = {
        tooltipOpen: false
    };
    toggle = () => this.setState({
        ...this.state,
        tooltipOpen: !this.state.tooltipOpen
    });
    render = () => (
        <Tooltip placement="top" isOpen={this.state.tooltipOpen} target={this.props.target}
                 toggle={this.toggle}>
            {this.props.l[this.props.children] || this.props.children}
        </Tooltip>
    );
}

export default connect(
    state => ({
        l: state.lng._
    }),
)(MyTooltip);