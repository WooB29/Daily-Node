import { Text } from "react-native";
import { Container } from "../components/container";
import DropDownPicker from "react-native-dropdown-picker";
import { useEffect, useState } from "react";

const Home = () => {
    const [open, setOpen] = useState(false);
    const [items, setItems] = useState([]);
    const [value, setValue] = useState(null);
    useEffect(() => {
        const initialItems = [
            { label: "All", value: "0" },
            { label: "Todo", value: "1" },
            { label: "Profile", value: "2" },
            { label: "Settings", value: "3" },
            { label: "Logout", value: "4" },
        ];
        setItems(initialItems);
        setValue(initialItems[0].value);
    }, []);

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
        </Container>
    );
}
export default Home;