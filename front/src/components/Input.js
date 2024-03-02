import React, { useState, forwardRef } from "react";
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Container = styled.div`
    flex-direction: column;
    width: 100%;
    margin: 10px 0;
`;

const StyledTextInput = styled.input`
    background-color: white;
    color: black;
    padding: 7px;
    font-size: 1rem;
    border: 1px solid black;
    border-radius: 4px;
`;

const Input = forwardRef(
    (
        {
            label,
            value,
            onChangeText,
            onSubmitEditing,
            onBlur,
            placeholder,
            isPassword,
            retrunKeyType,
            maxLength,
            disabled,
        },
        ref
        ) => {

            return (
                <Container>
                    <StyledTextInput 
                        ref={ref}
                        value={ value }
                        onChangeText={ onChangeText }
                        onSubmitEditing={ onSubmitEditing }
                        placeholder={ placeholder }
                        secureTextEntry={ isPassword }
                        returnKeyType={ retrunKeyType }
                        maxLength={ maxLength }
                        autoCapitalize="none"
                        autoCorrect={ false }
                        textContentType="none"  // IOS only
                        underlineColorAndroid="transparent" // Android only
                        editable={!disabled}
                    />
                </Container>
            );
        }
);
Input.defaultProps = {
    onChangeText: () => {},
    onSubmitEditing: () => {},
};

Input.propTypes  = {
    value: PropTypes.string,
    onChangeText: PropTypes.string,
    onSubmitEditing: PropTypes.func,
    onBlur: PropTypes.func,
    placeholder: PropTypes.string,
    isPassword: PropTypes.bool,
    retrunKeyType: PropTypes.oneOf(['done', 'next']),
    maxLength: PropTypes.number,
    disabled: PropTypes.bool,
};

export default Input;