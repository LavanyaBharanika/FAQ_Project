//single selection
//multiple selection

import { useState } from "react"
import data from "./data"
import './style.css'
export default function Accordian(){
    const [selected, setSelected] = useState(null)
    const [enableMultiSelection, setEnableMultiSelection] = useState(false)
    const [multiple, setMultiple] = useState([])

    function handleSingleSelection(getCurrentId){
        setSelected(getCurrentId === selected ? null : getCurrentId);

    } 
    function handleMultiSelection(getCurrentId){
        let cpyMultiSelection = [...multiple];
        const findIndexOfCurrentId = cpyMultiSelection.indexOf(getCurrentId)
        console.log(findIndexOfCurrentId)
        if(findIndexOfCurrentId === -1) {
            cpyMultiSelection.push(getCurrentId)
        }
        else {
            cpyMultiSelection.splice(findIndexOfCurrentId, 1)
        }

        setMultiple(cpyMultiSelection)
    }
    console.log(selected, multiple)
    return(
        <div className="wrapper">
            <button onClick={()=>setEnableMultiSelection(!enableMultiSelection)}>
            {enableMultiSelection ? "Disable Multi selection" : "Enable Multi selection"}
                </button>
            <div className="accordian">
               { 
               data && data.length > 0 ? data.map(dataItem =>( <div key={dataItem.id} className="item">
                <div  onClick={enableMultiSelection ? 
                ()=>handleMultiSelection(dataItem.id) :
                ()=>handleSingleSelection(dataItem.id)} 
                className="title">
                    <h3>Q.{dataItem.question}</h3>
                    <span>+</span>
                </div>
                {
                    selected === dataItem.id || 
                    multiple.includes(dataItem.id) !== -1 ?( 
                    <div className="content">{dataItem.answer}</div> 
                   ) : null
                }
               </div>)): 
               <div>No data found !</div>
               }
            </div>
        </div>
    )
}