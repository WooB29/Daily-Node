import React from "react";
import { styled } from 'styled-components';
import PropTypes from "prop-types";

const Container = styled.button`
    background-color: black;
    align-items: center;
    border-radius: 4px;
    width: 100%;
    padding: 5px;
    opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
    cursor: pointer;
`;

const Title = styled.text`
    height: 30px;
    line-height: 30px;
    font-size: 16px;
    color: ${({ isFilled }) => 
        isFilled ? 'white' : 'black'};
`;

const Button = ({ containerStyle, title, onPress, isFilled, disabled}) => {
    return (
        <Container 
            style={containerStyle} 
            onPress={onPress} 
            isFilled={isFilled}
            disabled={disabled}
        >
            <Title isFilled={isFilled}>{title}</Title>
        </Container>
    );
};

Button.defaultProps = {
    isFilled: true,
};

Button.propTypes = {
    containerStyle: PropTypes.object,
    title: PropTypes.string,
    onPress: PropTypes.func.isRequired,
    isFilled: PropTypes.bool,
    disabled: PropTypes.bool,
};

export default Button;