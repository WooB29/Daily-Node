import { useEffect, useState } from "react";
import { FlatList } from "react-native";
import { Container, TouchContainer } from "../components/container";
import { StudyText } from "../components/text";
import DropDownPicker from "react-native-dropdown-picker";
import { getStudyList } from "../utils/list";

const Home = ({navigation}) => {
    const [open, setOpen] = useState(false);
    const [items, setItems] = useState([]);
    const [value, setValue] = useState(null);
    const [studyList, setStudyList] = useState([]);
    const [dropItem, setDropItem] = useState();

    const studyGetData = async () => {
        const data = await getStudyList(navigation);
        setStudyList(data);
    }

    useEffect(() => {
        const initialItems = [
            { label: "All", value: "0" },
            { label: "Todo", value: "1" },
            { label: "Profile", value: "2" },
        ];
        setItems(initialItems);
        setValue(initialItems[0].value);
    }, []);

    useEffect(() => {
        studyGetData();
    }, [value]);

    

    const List = ({id, subject_name, title, content}) => (
        <TouchContainer onPress={_onPressListTouch(id)}>
            <StudyText>{subject_name} - {title}</StudyText>
        </TouchContainer>
    );

    const _onPressListTouch = (id) => {
        console.log('Press List : '+id);
    };

    const _onChangeValue = (value) => {
        console.log('value : '+value);
    };

    return(
        <Container>
            <DropDownPicker 
                items={items}
                open={open}
                setOpen={setOpen}
                value={value}
                setValue={setValue}
                onChangeValue={_onChangeValue}
            />
            <FlatList
                data={studyList}
                renderItem={({item}) => <List {...item} />}
            />
        </Container>
    );
}
export default Home;