import React, { useState } from "react";
import ButtonCard from "../../reusable/ButtonCard";
import TagEditor from "./TagEditor";

export default function TagCard({
    Vertical = false,
    Session,
    refreshItems,
    item={
        "name":"",
        "color":"",
        "id":""
    }
}){

    const [open,setOpen] = useState(false)

    return(<>
        <ButtonCard 
            elevation={4}
            onClick={()=>setOpen(true)}
            style={{width:"100%", textAlign:"left", backgroundColor:item.color, padding:"15px"}} >
            {item.name}
        </ButtonCard>
        <TagEditor Session={Session} refreshItems={refreshItems} Vertical={Vertical} tag={item} open={open} setOpen={setOpen}/>
    </>)

}