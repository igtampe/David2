import React, { useState } from "react";
import ButtonCard from "../../reusable/ButtonCard";
import ArtistEditor from "./ArtistEditor";
import ArtistDefImage from "../../reusable/defaultImage/ArtistDefImage";

export default function ArtistCard({
    Vertical = false,
    Session,
    refreshItems,
    item= {
        "name": "",
        "url": "",
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
                <td><ArtistDefImage src={item.imageURL} height={"30px"}/></td>
                <td>{item.name}</td>
            </tr></tbody></table>
        </ButtonCard>
        <ArtistEditor Session={Session} refreshItems={refreshItems} Vertical={Vertical} item={item} open={open} setOpen={setOpen}/>
    </>)

}