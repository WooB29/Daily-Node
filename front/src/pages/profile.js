import AsyncStorage from "@react-native-async-storage/async-storage";
import { Container } from "../components/container";
import Button from "../components/button";

const Profile = ({navigation}) => {

    const _onPressLogOut = async () => {
        try{
            await AsyncStorage.removeItem('Tokens');
            navigation.navigate('SignInPage');
        }
        catch(e){
            console.log('log out error: ' + e);
        }
    }

    return(
        <Container>
            <Button 
                title='로그아웃'
                onPress={_onPressLogOut}
                isFilled={true}
                disabled={false}
            />
        </Container>
    );
}
export default Profile;