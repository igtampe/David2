import React from "react";
import ItemDisplay from "../reusable/ItemDisplay";
import CharacterCard from "./CharacterCard";
import CharacterEditor from "./CharacterEditor";
import { CharsGet } from "../../../API/Character";

export default function CharacterDisplay({
    Vertical=false,
    Session
}){

    return(
        <ItemDisplay
            ItemCard={CharacterCard}
            ItemEditor={CharacterEditor}
            Session={Session}
            apiGet={CharsGet}
            Vertical={Vertical}
        />
    )
}