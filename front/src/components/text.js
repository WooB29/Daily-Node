import styled from "styled-components/native";

export const TodoText = styled.Text`
    font-size: 15px;
    text-decoration: ${({done}) => done ? 'line-through' : 'none' };
    color: ${({done}) => done? 'red' : 'black'};
`;

export const StudyText = styled.Text`
    font-size: 15px;
    color: black;
    
`;

export const ErrorText = styled.Text`
    align-items: flex-start;
    font-weight: bold;
    width: 100%;
    height: 20px;
    margin-bottom: 10px;
    line-height: 20px;
    color: red;
`;