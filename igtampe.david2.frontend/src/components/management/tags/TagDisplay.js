import React from "react";
import { TagsGet } from "../../../API/Tag";
import TagCard from "./TagCard";
import TagEditor from "./TagEditor";
import ItemDisplay from "../reusable/ItemDisplay";

export default function TagDisplay({
    Vertical = false,
    Session,
}) {
  
    return (<>
        <ItemDisplay
            ItemCard={TagCard}
            ItemEditor={TagEditor}
            Session={Session}
            apiGet={TagsGet}
            Vertical={Vertical}
        />
    </>)
}