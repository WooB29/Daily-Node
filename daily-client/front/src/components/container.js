import React from "react";
import styled from "styled-components/native";

export const Container = styled.View`
    flex: 1;
    justify-content: center;
    align-items : center;
    background-color: #FFF;
    padding: 20px;
`;

export const ListContainer = styled.View`
    padding: 10px;
    margin-bottom: 5px;
    background-color: #364954;
    border-radius: 7px;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    opacity: ${({done}) => 
    done ? 0.2 : 1 };
`;

export const TouchContainer = styled.TouchableOpacity`
    padding: 15px;
    margin: 2px 0;
    background-color: #DDF2FF;
    border-radius: 5px;
    width: 100%;
    display:  flex;
`;

export const TouchContentContainer = styled.TouchableOpacity`
    padding: 15px;
    margin: 2px 0;
    background-color: #C1D9EF;
    border-radius: 5px;
    width: 100%;
    display: ${({ contentList, kid }) => contentList[kid] ? 'flex' : 'none'};
`;

export const TitleContainer = styled.View`
    flexDirection: row;
    justifyContent: space-between;
    alignItems: center;
    width: 100%;
`;
