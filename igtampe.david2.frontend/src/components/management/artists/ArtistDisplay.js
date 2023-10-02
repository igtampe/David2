import React from "react";
import ArtistCard from "./ArtistCard";
import ArtistEditor from "./ArtistEditor";
import { ArtistsGet } from "../../../API/Artist";
import ItemDisplay from "../reusable/ItemDisplay";

export default function ArtistDisplay({
    Vertical = false,
    Session
}) {

    return (
        <ItemDisplay
            ItemCard={ArtistCard}
            ItemEditor={ArtistEditor}
            Session={Session}
            apiGet={ArtistsGet}
            Vertical={Vertical}
        />
    )
}