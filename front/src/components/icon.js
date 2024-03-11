import React from "react";
import { MaterialIcons } from '@expo/vector-icons';

export const DoneIcon = ({ done, onPress }) => {
    const iconName = done ? 'check-box' : 'check-box-outline-blank';
    return(
        <MaterialIcons
            name={iconName}
            size={26}
            onPress={onPress}
        />
    );
};

export const DeleteIcon = ({onPress}) => {

    return(
        <MaterialIcons
            name='delete'
            size={26}
            onPress={onPress}
        />
    );
};