import AsyncStorage from "@react-native-async-storage/async-storage";
import { Container } from "../components/container";
import Button from "../components/button";
import Input from "../components/input";

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
            <Input 
                label='이메일'
            />
            <Input
                label='이름'
            />
            <Button
                title='정보 수정'
            />
            <Button 
                title='로그아웃'
                onPress={_onPressLogOut}
                isFilled={false}
                disabled={false}
            />
        </Container>
    );
}
export default Profile;