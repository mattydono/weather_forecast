import React, {Component} from 'react';

export class Input extends Component {
    state = {
        selectedCity: ''
    };

    render() {
        return (
            <div>
                <input placeholder="city,country code" onChange={this.onCityChange} value={this.state.selectedCity}/>
                <button onClick={this.onSubscribe}>Subscribe</button>
            </div>
        )
    }

    onSubscribe = () => {
        this.props.onSubscribe(this.state.selectedCity)
    };

    onCityChange = event => {
        this.setState({selectedCity: event.currentTarget.value})
    };


}