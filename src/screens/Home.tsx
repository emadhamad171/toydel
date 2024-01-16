import {RefreshControl, ScrollView, TouchableOpacity, View, Text} from "react-native";
import Input from "../components/Input";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import {useCallback, useState} from "react";
import {useNavigation} from "@react-navigation/native";

const HeaderComponent = ({}) =>{
    const navigation = useNavigation();
    return <View style={{backgroundColor: '#a333ff',width: '100%', paddingVertical: 10, paddingHorizontal:10, flexDirection: 'row', justifyContent:'space-between'}}>
        <View style={{flexDirection: 'row', gap: 15, marginLeft: 5}}>
        <Icon name={'teddy-bear'} size={32} color={"#4f0bb2"}/>
        <TouchableOpacity style={{alignSelf:'center', backgroundColor: '#c29cff', borderRadius: 5, padding: 5}}>
            <Text>View Plans</Text>
        </TouchableOpacity>
            <TouchableOpacity >
                <MaterialIcon name={'not-listed-location'} size={28} color={"#fff2ee"}/>
            </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'row', gap: 15, marginRight: 10}}>
            <TouchableOpacity>
            <Icon name={'bell-outline'} size={28} color={'#362270'}/>
            </TouchableOpacity>
            <TouchableOpacity>
                <Icon name={'cart-outline'} size={28} color={'#362270'}/>
            </TouchableOpacity>
            <TouchableOpacity>
                <Icon name={'account-outline'} size={28} color={'#362270'}/>
            </TouchableOpacity>
        </View>
    </View>
}
const SearchComponent = () =>{

    return <View style={{backgroundColor: '#a333ff', borderBottomStartRadius:10, borderBottomEndRadius:10,width: '100%', paddingBottom: 50, paddingTop:30}}>
        <View style={{flexDirection: 'row', position:'relative', maxWidth: 330,display: 'flex',alignSelf: 'center'}}>
        <Input placeholder={"Find your toy."} onChangeAction={(text:string)=>{}} value={''} style={{backgroundColor: '#c9aaff',borderRadius: 10, width: 330, padding: 10, borderColor: '#f11'}} />
        <Icon name={'magnify'} size={24} style={{position:'absolute', right: 5, bottom: '25%'}}/>
        </View>
    </View>
}

const Home = () =>{
const [pageNumber, setPageNumber] = useState(0);
const [isRefreshing, setRefreshing] = useState(false);
    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }, []);
    return <View><HeaderComponent />
    <ScrollView refreshControl={
        <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
    }>
        <SearchComponent />
        <View style={{height: 1000}}>

        </View>
    </ScrollView>
    </View>
}

export default Home;
