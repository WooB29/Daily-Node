import React from "react";
import styled from "styled-components/native";
import PropTypes from "prop-types";

const Container = styled.TouchableOpacity`
    align-items: center;
    border-radius: 4px;
    width: 30%;
    margin: 10px;
    padding : 10px;
    border : 1px solid black;
`;

const Title = styled.Text`
    height: 30px;
    line-height: 30px;
    font-size: 16px;
    color: 'black';
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