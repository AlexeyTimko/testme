import React from 'react';
import {connect} from "react-redux";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
    Slide,
    Divider
} from "@material-ui/core";

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

class ConfirmDialog extends React.Component {
    render() {
        const {l, open, close, confirm, title, children} = this.props;
        return (
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={close}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                {
                    title ?
                        <DialogTitle id="alert-dialog-slide-title">
                            {title}
                        </DialogTitle> : null
                }
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        {children}
                    </DialogContentText>
                </DialogContent>
                <Divider/>
                <DialogActions>
                    <Button onClick={confirm} color="primary">
                        {l['Yes']}
                    </Button>
                    <Button onClick={close} color="secondary">
                        {l['Cancel']}
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default connect(
    state => ({
        l: state.lng._,
    })
)(ConfirmDialog);