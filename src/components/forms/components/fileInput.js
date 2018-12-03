import React, { Component } from 'react';
import './index.css'

class FileInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imageUrl: '',
            saveFun: props.saveFun
        };

        this.handleChange = this.handleChange.bind(this);
        FileInput.handleDrag = FileInput.handleDrag.bind(this);
        this.handleDrop = this.handleDrop.bind(this);
    }

    handleChange (files) {
        this.state.saveFun(files[0]);
        const url = URL.createObjectURL(files[0]);
        this.setState({
            imageUrl: url
        });
    }

    static handleDrag (event) {
        event.stopPropagation();
        event.preventDefault();
    }

    handleDrop (event) {
        this.handleChange(event.dataTransfer.files);
        event.preventDefault();
    }

    render() {
        return (
            <div
                onDrag={ FileInput.handleDrag }
                onDrop={ this.handleDrop }
            >
                <img
                    src={ this.state.imageUrl }
                    alt=''
                    className="image"
                    height="100px"
                />
                <input
                    type="file"
                    onChange={ (event) => this.handleChange(event.target.files) }
                    onLoad={ () => URL.revokeObjectURL(this.state.imageUrl) }
                />
            </div>
        )
    }
}

export default FileInput;