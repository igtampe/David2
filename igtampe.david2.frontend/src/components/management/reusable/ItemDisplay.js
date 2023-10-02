import { Divider, TextField } from "@mui/material";
import React, { useState } from "react";
import Masonry from '@mui/lab/Masonry';
import CenteredCircular from "../../reusable/CenteredCircular";
import ButtonCard from "../../reusable/ButtonCard";

export default function ItemDisplay({
    Vertical = false,
    Session,
    apiGet,
    ItemCard,
    ItemEditor
}) {

    const [loading,setLoading] = useState(false)
    const [items,setItems] = useState(undefined)
    const [error,setError] = useState(undefined)

    const [newModal, setNewModal] = useState(false)

    const [displayItems,setDisplayItems] = useState(undefined)

    const refreshItems=()=>{
        setItems(undefined)
        setQuery("")
    }

    const [query, setQuery] = useState("")
    const startSearch = (query) => { 
        setQuery(query)

        //Local search here
        setDisplayItems(items.filter(A=>A.name.toLowerCase().includes(query.toLowerCase())))
    }

    if(error){ return(<> {JSON.stringify(error)} </>) }

    if(!loading&&!items){apiGet(setLoading,Session,setItems,setError)}

    return (<>
        <table style={{ width: "100%" }}><tbody><tr>
            <td> <TextField fullWidth label="Search" value={query} onChange={(event) => { startSearch(event.target.value) }} /></td>
        </tr></tbody></table>
        <Divider style={{marginTop:"20px", marginBottom:"20px"}}/>
        { !items ? <CenteredCircular/> :
            <Masonry columns={Vertical ? 2 : 4} spacing={2}>
                { (query==="" ? items : displayItems).map(a=><ItemCard Session={Session} item={a} refreshItems={refreshItems} Vertical={Vertical}/>) }
                <ButtonCard style={{width:"100%", textAlign:"center", backgroundColor:"", padding:"15px"}} elevation={3} onClick={()=>setNewModal(true)}>
                    New
                </ButtonCard>
            </Masonry>
        }
        <ItemEditor Session={Session} refreshItems={refreshItems} Vertical={Vertical} setOpen={setNewModal} open={newModal}/>
    </>)
}