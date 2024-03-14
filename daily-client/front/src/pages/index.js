import React, {useEffect} from "react";
import { Text, View } from "react-native";
import { verifyTokens } from "../utils/token";


const Index = ({navigation}) => {
    useEffect(() =>
    {
        verifyTokens(navigation);
    },[])
    
    return(
        <View style ={{padding: 50}}>
            <Text style={{padding: 10, fontSize: 42}}>
                INDEX
            </Text>
        </View>
    );
}

export default Index;