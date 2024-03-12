import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";
import { Container, TouchContainer } from "../components/container";
import { StudyText } from "../components/text";
import DropDownPicker from "react-native-dropdown-picker";
import { getStudyList, getSubjectList } from "../utils/list";
import { Alert } from 'react-native';
import { DoneIcon } from "../components/icon"; 



const Home = ({navigation}) => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [studyList, setStudyList] = useState([]);
    const [dropItem, setDropItem] = useState([]);

    const studyGetData = async () => {
        const data = await getStudyList(navigation);
        setStudyList(data);
    }

    useEffect( () => {
        const getData = async () => {
            try{
                const data = await getSubjectList(navigation);
                
                const newDropItem = data.map(subject => ({
                    label: subject.name,
                    value: subject.name,
                }));
                newDropItem.unshift({ label: 'All', value: 'All' });
                setDropItem(newDropItem);
            }
            catch(err){
                console.log(err);
            }
        }
        getData();
    }, []);

    useEffect(() => {
        setValue(dropItem[0]?.value);
    }, [dropItem]);

    useEffect(() => {
        studyGetData();
    }, [value]);

    const List = ({id, subject_name, title, content}) => (
        <TouchContainer
            onPress={_onPressListTouch(id)}
            onLongPress={_onLongPressListTouch(id)}
        >
            <StudyText>
                {subject_name} - {title}
                <DoneIcon />
            </StudyText>
            
            {/* <Container>
                <StudyText>{content}</StudyText>
            </Container> */}
            
        </TouchContainer>
    );

    const _onPressListTouch = (id) => {
        return () => {
            console.log('Press List : '+id);
        }
    };

    const _onLongPressListTouch = (id) => {
        return () => {
            Alert.alert(
                '삭제',
                '해당 리스트를 삭제하시겠습니까?',
                [
                    {
                        text: '취소',
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel',
                    },
                    {
                        text: '예',
                        //onPress: () => deleteList(id),
                    },
                ],
                { cancelable: false },
            );
        }
    }



    const _onChangeValue = (value) => {
        console.log('value : '+value);
    };

    return(
        <Container>
            <DropDownPicker 
                items={dropItem}
                open={open}
                setOpen={setOpen}
                value={value}
                setValue={setValue}
                onChangeValue={_onChangeValue}
            />
            <FlatList
                data={studyList}
                renderItem={({item}) => <List {...item} />}
                style={{
                    width: '100%',
                    marginTop: 20,
                }}
            />
        </Container>
    );
}
export default Home;