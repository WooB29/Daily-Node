import React from "react";
import styled from "styled-components/native";

export const Container = styled.View`
    flex: 1;
    justify-content: center;
    align-items : center;
    background-color: "#FFF";
    padding: 20px;
`;

export const ListContainer = styled.View`
    padding: 10px;
    margin-bottom: 5px;
    background-color: #aaa;
    border-radius: 7px;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    opacity: ${({done}) => 
    done ? 0.3 : 1 };
`;