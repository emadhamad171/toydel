import { FlatList, Text, View } from "react-native";
import { useState } from "react";
import UserButton from "../components/UserButton";
const AnswerComponent =({text, isDisplayed})=>{
    return <View style={{display:isDisplayed?'flex': 'none', marginBottom:14,marginHorizontal: 5}}>
        <Text>
            {text}
        </Text>
    </View>
}
const FaqSection = ({index,item,currentId}) =>{
    return <View style={{gap: 10,marginTop: 5}}>
        <UserButton icon={'progress-question'} chevronIcon={index===currentId ? 'chevron-down' : 'chevron-right'} iconSize={24} onPressAction={item.question.onPressAction(index===currentId ? -1 : index)} placeholder={item.question.placeholder} />
        <AnswerComponent isDisplayed={index===currentId} text={item.answer.text} />

    </View>
}

const FaqModal = () => {
    const [answerDisplayedId, setAnswerDisplayed] = useState(-1);
    const QuestionsAndAnswers = [
        {
            question: {
                placeholder: 'Why ToyDel?',
                onPressAction: (id:number)=>{
                    return ()=>setAnswerDisplayed(id);
                }
            },
            answer: {
                text: 'Because asodmdoasmdo amdoasm odmasodmoa smdoasmdo amsdom asodm asom doasmd oams odmas dmaosm doasm doasmdo amso dmaso mdaos mdoam sodmao mdosa mdoams odmas omdo asmd oamsodma somdomasomom asdma odmaosm '
            }
        },
        {
            question: {
                placeholder: 'Payments',
                onPressAction: (id:number)=>{
                    return ()=>setAnswerDisplayed(id);
                }
            },
            answer: {
                text: 'Because asodmdoasmdo amdoasm odmasodmoa smdoasmdo amsdom asodm asom doasmd oams odmas dmaosm doasm doasmdo amso dmaso mdaos mdoam sodmao mdosa mdoams odmas omdo asmd oamsodma somdomasomom asdma odmaosm '
            }
        },
        {
            question: {
                placeholder: 'Security',
                onPressAction: (id:number)=>{
                    return ()=>setAnswerDisplayed(id);
                }
            },
            answer: {
                text: 'Because asodmdoasmdo amdoasm odmasodmoa smdoasmdo amsdom asodm asom doasmd oams odmas dmaosm doasm doasmdo amso dmaso mdaos mdoam sodmao mdosa mdoams odmas omdo asmd oamsodma somdomasomom asdma odmaosm '
            }
        },
        {
            question: {
                placeholder: 'Big Bob',
                onPressAction: (id:number)=>{
                    return ()=>setAnswerDisplayed(id);
                }
            },
            answer: {
                text: 'Because asodmdoasmdo amdoasm odmasodmoa smdoasmdo amsdom asodm asom doasmd oams odmas dmaosm doasm doasmdo amso dmaso mdaos mdoam sodmao mdosa mdoams odmas omdo asmd oamsodma somdomasomom asdma odmaosm '
            }
        },
        {
            question: {
                placeholder: 'Developers',
                onPressAction: (id:number)=>{
                    return ()=>setAnswerDisplayed(id);
                }
            },
            answer: {
                text: 'Because asodmdoasmdo amdoasm odmasodmoa smdoasmdo amsdom asodm asom doasmd oams odmas dmaosm doasm doasmdo amso dmaso mdaos mdoam sodmao mdosa mdoams odmas omdo asmd oamsodma somdomasomom asdma odmaosm '
            }
        }
    ]
    return <View style={{marginTop: 24}}>
        <FlatList data={QuestionsAndAnswers} renderItem={({item,index})=><FaqSection item={item} index={index} currentId={answerDisplayedId}/>} />
    </View>
}
export default FaqModal;
