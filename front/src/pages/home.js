import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";
import { Container, TouchContainer, TitleContainer, TouchContentContainer } from "../components/container";
import { StudyText } from "../components/text";
import DropDownPicker from "react-native-dropdown-picker";
import { getStudyList, getSubjectList, deleteList } from "../utils/list";
import { Alert } from 'react-native';
import { ListIcon } from "../components/icon"; 



const Home = ({navigation}) => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [studyList, setStudyList] = useState([]);
    const [dropItem, setDropItem] = useState([]);
    const [iconState, setIconState] = useState({});
    const [containersState, setContainersState] = useState({});
    
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

    useEffect(() => {
        setValue(dropItem[0]?.value);
    }, [dropItem]);

    const studyGetData = async () => {
        const data = await getStudyList(value, navigation);
        setStudyList(data);
    }

    useEffect(() => {
        studyGetData();
    }, [value]);




    
    const _reloadData = async () => {
        await getData();
        await studyGetData();
    };

    const _onPressListTouch = (clickedId) => {
        return () => {
            setContainersState(prevState => ({
                ...prevState,
                [clickedId]: !prevState[clickedId]
            }));
            setIconState(prevState => ({
             ...prevState,
                [clickedId]:!prevState[clickedId]
            }));
        };
    };

    const _onLongPressListTouch = (id, subject_name) => {
        return () => {
            Alert.alert(
                id +'번 - 삭제',
                '해당 항목을 삭제하시겠습니까?',
                [
                    {
                        text: '취소',
                        style: 'cancel',
                    },
                    // {
                    //     text: '수정',
                    //     onPress: () => {
                    //         console.log('press modify');
                    //     }
                    // },
                    {
                        text: '삭제',
                        onPress: async () => {
                            await deleteList(id, subject_name, navigation);
                            await _reloadData();
                        },
                        style: 'destructive',
                    },
                ],
                { cancelable: false },
            );
        }
    }

    const List = ({id, subject_name, title, content}) => (
        <TouchContainer
            onPress={_onPressListTouch(id)}
            onLongPress={_onLongPressListTouch(id, subject_name)}
        >
            <TitleContainer>
                <StudyText>
                    {id} - {subject_name} - {title}
                </StudyText>
                <ListIcon 
                    kid={id}
                    contentList={iconState}
                />
            </TitleContainer>
            <TouchContentContainer
                key={id}
                onPress={_onPressListTouch(id)}
                onLongPress={_onLongPressListTouch(id, subject_name)}
                contentList={containersState}
                kid={id}
            >
                <StudyText>{content}</StudyText>
            </TouchContentContainer>
        </TouchContainer>
    );

    useEffect( () => {
        const unsubscribe = navigation.addListener('focus', async () => {
            await _reloadData();
          });
        return unsubscribe;
    }, []);

    return(
        <Container>
            <DropDownPicker 
                items={dropItem}
                open={open}
                setOpen={setOpen}
                value={value}
                setValue={setValue}
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