import React, {Component} from 'react';

export default class Timer extends Component {
    timer = null;
    constructor(props){
        super(props);
        const now = (new Date()).getTime();
        this.state = {
            finish: now + props.timeout * 1000,
            now
        };
        if(props.timeout > 0) this.timer = setInterval(this.tick, 50);
    }
    tick = () => {
        const now = (new Date()).getTime();
        if(now >= this.state.finish) {
            this.props.onFinish();
        }else{
            this.setState({
                ...this.state,
                now
            });
        }
    };
    componentWillUnmount = () => {
        if(this.timer) clearInterval(this.timer);
    };
    render(){
        const secTotal = Math.round((this.state.finish - this.state.now)/1000);
        let s = secTotal % 60;
        let i = Math.floor(secTotal / 60) % 60;
        let H = Math.floor(secTotal / 3600);
        s = (s <= 0) ? '00' : (s < 10) ? `0${s}` : s;
        i = (i === 0) ? '00' : (i < 10) ? `0${i}` : i;
        H = (H === 0) ? '00' : (H < 10) ? `0${H}` : H;

        return this.props.timeout > 0 ? (
            <h5 className="text-info">
                {`${this.props.children} - ${H}:${i}:${s}`}
            </h5>
        ) : null;
    }
}