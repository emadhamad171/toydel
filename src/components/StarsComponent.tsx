import { Text } from 'react-native';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
export const Star = ({color = '#e5b600', size=16, starName = 'star'}) =><Icon name={starName} color={color} size={size} />
const Stars = ({rate, size=16}) => {
    const filledStars = new Array(Math.floor(rate)).fill('star');
    const starRate = [...filledStars]
    const unfiledStars = new Array(5-Math.round(rate)).fill('star-outline');
    if(rate%1!==0) starRate.push('star-half-full');
    unfiledStars.length && starRate.push(...unfiledStars);
    return <Text>{starRate.map((name, index)=>{if(!!name) return <Star starName={name} key={index} />} )}</Text>;
}
export default Stars;
