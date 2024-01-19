import {FlatList, Image, Text, TouchableOpacity, View} from "react-native";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import {styles} from "../styles/authorization";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const Star = ({color = '#e5b600', size=16, starName = 'star'}) =><Icon name={starName} color={color} size={size} />


const ReviewComponent = ({item})=>{
    const filledStars = new Array(Math.floor(item.rate)).fill(<Star />);
    const starRate = [...filledStars]
    const unfiledStars = new Array(5-Math.round(item.rate)).fill(<Star starName={'star-outline'} />);
    if(item.rate%1) starRate.push(<Star starName={'star-half-full'}/>)
    starRate.push(unfiledStars);
    return <View style={{flexDirection: 'row', gap :18, marginTop: 24}}>
        <Image source={{uri: item.photo}} style={{borderRadius: 50, width: 50, height: 50}} />
        <View style={{backgroundColor:'#e0e0e0', borderRadius: 30, padding: 15, width: 270}}>
            <View style={{flexGrow:1, flexDirection:'row', justifyContent:'space-between'}}>
                <Text style={{color: '#5d5d5d'}}>{item.date}</Text>
                <TouchableOpacity onPress={()=>{}}>
                    <MaterialIcon name={'more-horiz'} size={24} style={{padding: 0, margin: 0}}/>
                </TouchableOpacity>
            </View>
            <Text style={{...styles.subHeaderText, marginBottom: 2}}>{item.name}</Text>
            <Text>{starRate}</Text>
            <Text>{item.text}</Text>
        </View>
    </View>
}
const ReviewModal = ()=>{
    const reviews =[
        {
            date: '2023/03/16',
            photo: 'https://www.siasat.com/wp-content/uploads/2022/02/IMG_18022022_181903_1200_x_900_pixel.jpg',
            rate: 4.5,
            name: 'Huan',
            text: 'Very good!'
        },
        {
            date: '2023/03/19',
            photo: 'https://www.siasat.com/wp-content/uploads/2022/02/IMG_18022022_181903_1200_x_900_pixel.jpg',
            rate: 4,
            name: 'Samir',
            text: 'I was a poor and hungry man, but after this app came into my life, I became a multi-millionaire! Thank you!'
        },
        {
            date: '2023/03/15',
            photo: 'https://www.siasat.com/wp-content/uploads/2022/02/IMG_18022022_181903_1200_x_900_pixel.jpg',
            rate: 5,
            name: 'Roman',
            text: 'Very nice!'
        }
    ]
    return <View style={{marginTop: 24}}>
        <FlatList data={reviews} renderItem={({item})=><ReviewComponent item={item}/>} />
    </View>
}

export default ReviewModal;
