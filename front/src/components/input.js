import React, { useState, forwardRef } from "react";
import styled from "styled-components/native";
import PropTypes from 'prop-types';

const Container = styled.View`
    flex-direction: colum;
    width: 100%;
    margin: 10px 0;
`;

const Label = styled.Text`
    font-size : 16px;
    font-weight: 600;
    margin: 10px 0;
    color: ${({ isFocused }) => (isFocused ? '#041213' : '#899495' )};
`;

const StyledTextInput = styled.TextInput.attrs({
    placeholderTextColor: '#ccc',
})`
    padding : 20px 10px;
    font-size: 16px;
    border: 1px solid black;
    border-radius : 7px;
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
            const [isFocused, setIsFocused ] = useState(false);

            return (
                <Container>
                    <Label isFocused={isFocused}>{ label }</Label>
                    <StyledTextInput 
                        ref={ref}
                        isFocused={ isFocused }
                        value={ value }
                        onChangeText={ onChangeText }
                        onSubmitEditing={ onSubmitEditing }
                        onFocus={ () => setIsFocused(true)}
                        onBlur={() => {
                            setIsFocused(false);
                            onBlur();
                        }}
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
    onBlur: () => {},
    onChangeText: () => {},
    onSubmitEditing: () => {},
};

Input.propTypes  = {
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChangeText: PropTypes.func,
    onSubmitEditing: PropTypes.func,
    onBlur: PropTypes.func,
    placeholder: PropTypes.string,
    isPassword: PropTypes.bool,
    retrunKeyType: PropTypes.oneOf(['done', 'next']),
    maxLength: PropTypes.number,
    disabled: PropTypes.bool,
};

export default Input;