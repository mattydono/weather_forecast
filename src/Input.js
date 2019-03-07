import React, { Component } from 'react';
import styled from '@emotion/styled';

const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 20%;
  justify-content: center;
  width: 60%;
  min-width: 400px;
  óposition: relative;
`;

const InputField = styled.input`
  display: flex;
  outline: none;
  border: solid lightgrey 1px;
  border-radius: 25px;
  text-align: center;
  width: 80%;
  font-size: 1.25rem;
  box-shadow: 0 3px 10px darkslategrey;
  font-family: 'Times New Roman';
`;

const Button = styled.button`
  background-color: transparent;
  border: none;
  outline: none;
  font-size: 25px;
  position: relative;
  left: ${props => (props.right ? '-50px' : '50px')};
  top: 2px;
  &:hover {
    cursor: pointer;
  }
`;

export class Input extends Component {
  state = {
    selectedCity: undefined,
  };

  render() {
    return (
      <InputContainer>
        <Button onClick={this.onRefresh}>🔄</Button>
        <InputField
          placeholder='Search...'
          onChange={this.onCityChange}
          value={this.state.selectedCity}
        />
        <Button right onClick={this.onSubscribe}>
          🔍
        </Button>
      </InputContainer>
    );
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
