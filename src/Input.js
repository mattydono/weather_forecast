import React, {Component} from 'react';
import styled from '@emotion/styled';

const InputContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50%;
    margin-top: 300px;
`;

const InputField = styled.input`
    display: flex;
    text-align: center;
    width: 80%;
    border: solid lightslategrey 1px;
    border-radius: 10px;
    &:focus {outline: none}
`;

const Button = styled.button`
    min-width:20%;
    &:hover {cursor: pointer}
`;

export class Input extends Component {
    state = {
        selectedCity: ''
    };

    render() {
        return (
            <InputContainer>
                <InputField placeholder="city,country code" onChange={this.onCityChange} value={this.state.selectedCity}/>
                <Button onClick={this.onSubscribe}>Subscribe</Button>
                <Button onClick={this.onRefresh}>Refresh</button>
            </InputContainer>
        )
    }

  onRefresh = () => {
    Object.keys(this.props.subscribedCities).map(this.props.onSubscribe);
  };

  onSubscribe = () => {
    this.props.onSubscribe(this.state.selectedCity);
  };

  onCityChange = event => {
    this.setState({ selectedCity: event.currentTarget.value });
  };
}
