import React, { useContext } from "react";
import {ActivityIndicator} from "react-native";
import { styled } from 'styled-components';
import { ThemeContext} from "styled-components/native";

const Container = styled.View`
    position: absolute;
    z-index: 2;
    opacity: 0.3;
    width: 100%;
    height: 100%;
    justify-content: center;
    background-color: ${({ theme }) => theme.spinnerBackground};
`;

const Spinner = () => {
    const theme = useContext(ThemeContext);
    return(
        <Container>
            <ActivityIndicator size={'large'} color={theme.spinnerBackground} />
        </Container>
    );
};

export default Spinner;