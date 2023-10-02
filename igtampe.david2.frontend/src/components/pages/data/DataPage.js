import { Card, CardContent } from "@mui/material";
import React from "react";
import ManagementTabs from "../../management/ManagementTabs";

export default function DataPage({
    Session,
    Vertical = false
}){
    return(<>
        <Card>
            <CardContent>
                <ManagementTabs Vertical={Vertical} Session={Session}/>
            </CardContent>
        </Card>
    </>)
}