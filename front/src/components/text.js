import styled from "styled-components/native";

export const TodoText = styled.Text`
    font-size: 15px;
    text-decoration: ${({done}) => done ? 'line-through' : 'none' };
    color: ${({done}) => done? 'red' : 'black'};
`;