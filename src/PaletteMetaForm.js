import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { Picker } from "emoji-mart";
import 'emoji-mart/css/emoji-mart.css';

class PaletteMetaForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stage: "form",
            newPaletteName: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.showEmojiPicker = this.showEmojiPicker.bind(this);
        this.savePalette = this.savePalette.bind(this);
    }

    componentDidMount() {
        ValidatorForm.addValidationRule('isPaletteNameUnique', value =>
            this.props.palettes.every(
                ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
            )
        );
    }

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };
    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    showEmojiPicker(){
        this.setState({stage : 'emoji'});
    }
    savePalette(emoji){
        const newPalette ={
            paletteName: this.state.newPaletteName,
            emoji: emoji.native
        }
        this.props.handleSubmit(newPalette);
        this.setState({stage : ''});
    }
    render() {
        const { newPaletteName } = this.state;
        const { hideForm} = this.props
        return (
            <div>
                <Dialog open={this.state.stage === 'emoji'} onClose={hideForm}>
                <DialogTitle id="form-dialog-title">Choose a Palette Emoji</DialogTitle>
                    <Picker title="Pick a Palette Emoji" onSelect={this.savePalette} />
                </Dialog>

                <Dialog open={this.state.stage === 'form'} onClose={hideForm} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Choose a Palette Name</DialogTitle>
                    <ValidatorForm onSubmit={ this.showEmojiPicker} >
                        <DialogContent>
                            <DialogContentText>
                                Please enter a name for your new palette. Make sure it's Unique!
            </DialogContentText>

                            <TextValidator fullWidth margin='normal' validators={['required', 'isPaletteNameUnique']} errorMessages={["Enter Palette name", 'Name already used']} name='newPaletteName' label="Palette Name" onChange={this.handleChange} value={newPaletteName} />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={hideForm} color="primary">
                                Cancel
                        </Button>
                            <Button type='submit' variant='contained' color='primary'>
                                Save Palette
                            </Button>
                        </DialogActions>
                    </ValidatorForm>
                </Dialog>
            </div>
        );
    }
}
export default PaletteMetaForm;