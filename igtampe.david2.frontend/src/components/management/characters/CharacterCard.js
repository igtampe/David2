import React, { useState } from "react";
import ButtonCard from "../../reusable/ButtonCard";
import CharacterEditor from "./CharacterEditor";
import CharacterDefImage from "../../reusable/defaultImage/CharacterDefImage";

export default function CharacterCard({
    Vertical = false,
    Session,
    refreshItems,
    item={
        "name": "",
        "imageURL": "",
        "color": "",
        "id": undefined
      }
}){

    const [open,setOpen] = useState(false)

    return(<>
        <ButtonCard 
            elevation={4}
            onClick={()=>setOpen(true)}
            style={{width:"100%", textAlign:"left", backgroundColor:item.color, padding:"15px"}} >
            <table><tbody><tr>
                <td><CharacterDefImage src={item.imageURL} height={"20px"}/></td>
                <td>{item.name}</td>
            </tr></tbody></table>
        </ButtonCard>
        <CharacterEditor Session={Session} refreshItems={refreshItems} Vertical={Vertical} item={item} open={open} setOpen={setOpen}/>
    </>)

}