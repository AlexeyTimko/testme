import React, {Component} from 'react';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button } from "reactstrap";
import {openFM} from "../actions";
import * as icons from '@material-ui/icons';
import {Grid, Input, Paper} from "@material-ui/core/es/index";

class Home extends Component {
    state = {
        modal: false,
        search: ''
    };
    renderIcons = () => {
        let iconsArr = [];
        for (let icon in icons){
            if(icon.indexOf(this.state.search) < 0) continue;
            const Icon = icons[icon];
            iconsArr.push((
                <Grid item xs>
                    <Paper className={'p-3 text-center'}>
                        <Icon color="primary"/><br/>
                        {icon}
                    </Paper>
                </Grid>
            ));
        }
        return iconsArr;
    };
    render() {
        return (
            <div>
                <h1>Home</h1>
                <p>Welcome home!</p>
                <Button color="primary" onClick={() => this.props.changePage()}>Go to test page via redux</Button>
                <hr/>
                <Button color="warning mr-3" onClick={()=>this.props.openFM('warning', 'warning flash message')}>alert</Button>
                <Button color="info mr-3" onClick={()=>this.props.openFM('info', 'info flash message')}>alert</Button>
                <Button color="success mr-3" onClick={()=>this.props.openFM('success', 'success flash message')}>alert</Button>
                <Button color="danger" onClick={()=>this.props.openFM('danger', 'danger flash message')}>alert</Button>
                <br/>
                <Input onChange={event=>this.setState({
                    ...this.state,
                    search: event.target.value
                })} value={this.state.search} placeholder={this.props.l['Search']}/>
                <Grid container spacing={8} className={'m-2'}>
                    {this.renderIcons()}
                </Grid>
            </div>
        );
    }
}
const mapDispatchToProps = dispatch => bindActionCreators({
    changePage: () => push('/tests'),
    openFM
}, dispatch);

export default connect(
    state => ({
        l: state.lng._
    }),
    mapDispatchToProps
)(Home);