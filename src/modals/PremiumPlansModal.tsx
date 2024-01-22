import {FlatList, StyleProp, Text, View} from "react-native";
import profileStyles from "../styles/profile";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import ContinueButton from "../components/ContinueButton";
import {useState} from "react";

const PlanComponent = ({backgroundColor, price, name, description, features, style, PlanSign,...props}:{backgroundColor:string, price:number, name:string, description:string, features:string[], style?:StyleProp<View>, PlanSign?:any})=>{


    return <View style={{...profileStyles.defaultPlanContainer, backgroundColor: backgroundColor || '#999'}}>
        <Text style={{...profileStyles.headerText, alignSelf: 'center'}}>{name}</Text>
        <View style={{flexDirection: 'row', justifyContent:'space-between',marginTop: 14}}>
            <FlatList data={features} renderItem={({item})=><Text style={{fontSize: 16}}><Icon name={"check"} color={'#4c4'} size={16} /> {item} </Text>} />
            <View>
                <Text style={{...profileStyles.baseText,alignSelf:'flex-end', textDecorationLine:'line-through', fontSize:12, color:'#555'}}>{price}$</Text>
                <Text style={{...profileStyles.baseText,alignSelf:'flex-end', fontWeight:'400', color:'#111'}}>{price*0.85}$</Text>
            </View>
        </View>
        <Text style={{...profileStyles.subText, marginTop: 12}}>{description}</Text>
        <ContinueButton handleContinueClick={()=>{}} text={'Buy'} style={{marginTop: 14,marginBottom: 0, borderRadius:15, backgroundColor: '#4d4d4d'}}  />
        {!!PlanSign && <PlanSign />}
    </View>
}
const PlanTopSign = ({backgroundColor, text, iconName,iconSize, style, ...props}:{backgroundColor?:string, text?:'string', iconName?:string,iconSize?:number, style?:any})=>{
    return <View style={{...profileStyles.defaultPlanSign, backgroundColor: backgroundColor || '#cca732'}}>
        {!!iconName && <Text style={{marginRight: -2}}><Icon name={iconName} style={{margin: 0, padding: 0}} padding={0} size={iconSize || 18} /> </Text>}
    </View>
}
const PlansModal = ({user}) => {
    //TODO: Get current user plan
    const [currentPlan,setCurrentPlan] = useState(null);
    //TODO: Get plans from database
    const plans = [
        {
        price: 400,
        backgroundColor: '#d29f6c',
        name: 'Bronze',
        description: 'Regular plan and blablabla bla blabla blaalb a lab blabla. Some bla bla bla and blablabla.',
        features: ['1 toy per month', 'Change toys some times', 'Big boss required'],
        Sign: ()=><PlanTopSign iconName={'star-outline'}/>
    },{
        price: 960,
        backgroundColor: '#ffe44b',
        name: 'Gold',
        description: 'Regular plan and blablabla bla blabla blaalb a lab blabla. Some bla bla bla and blablabla.',
        features: ['4 toy per month', 'Change toys every week', 'You are big boss'],
        Sign: ()=><PlanTopSign backgroundColor={"#d66"} iconName={'check-decagram-outline'}/>
    },{
        price: 780,
        backgroundColor: '#d6e1e3',
        name: 'Silver',
        description: 'Regular plan and blablabla bla blabla blaalb a lab blabla. Some bla bla bla and blablabla.',
        features: ['2 toy per month', 'Change toys some times', 'Big boss required'],
        Sign: ()=><PlanTopSign iconName={'star'}/>
    }]

    return <View style={{marginTop: 14, paddingBottom: 34}}>
        <FlatList style={{paddingBottom:14}} data={plans} renderItem={({item})=><PlanComponent backgroundColor={item.backgroundColor} price={item.price} name={item.name} description={item.description} features={item.features} PlanSign={item.Sign} />} />
    </View>
}
export default PlansModal;
