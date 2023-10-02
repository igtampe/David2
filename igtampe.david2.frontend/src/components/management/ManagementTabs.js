import { Box, Tab, Tabs } from "@mui/material";
import React from "react";
import TagDisplay from "./tags/TagDisplay";
import CharacterDisplay from "./characters/CharacterDisplay";
import ArtistDisplay from "./artists/ArtistDisplay";


function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div role="tabpanel" hidden={value !== index} id={`vertical-tabpanel-${index}`} aria-labelledby={`vertical-tab-${index}`} {...other} style={{ width: "100%" }}>
            <Box sx={{ p: 3 }}>{children}</Box>
        </div>
    );
}

function DavidTabs({
    value, handleChange, iconHeight = "40px",
}) {

    const DavidTabHeader = ({icon, iconHeight, label}) => {
        return(<table><tbody><tr>
            <td><img src={icon} alt={label} height={iconHeight} /></td>
            <td>{label}</td>
        </tr></tbody></table>)
    }

    return (
        <Tabs variant="scrollable" value={value} onChange={handleChange} sx={{ borderRight: 1, borderColor: 'divider' }}>
            <Tab label={<DavidTabHeader icon={"/icons/artist.png"} iconHeight={iconHeight} label={"Artists"}/>} />
            <Tab label={<DavidTabHeader icon={"/icons/chars.png"} iconHeight={iconHeight} label={"Characters"}/>} />
            <Tab label={<DavidTabHeader icon={"/icons/tag.png"} iconHeight={iconHeight} label={"Tags"}/>} />
        </Tabs>

    )
}

export default function ManagementTabs({
    Session,
    Vertical = false
}) {

    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => { setValue(newValue); };

    return (<>
        <DavidTabs orientation="horizontal" value={value} handleChange={handleChange}/>
        <Box sx={{ bgcolor: 'background.paper', display: 'flex' }} >
           <TabPanel value={value} index={0}>
                <ArtistDisplay Session={Session} Vertical={Vertical}/>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <CharacterDisplay Session={Session} Vertical={Vertical}/>
            </TabPanel>
            <TabPanel value={value} index={2}>
                <TagDisplay Session={Session} Vertical={Vertical}/>
            </TabPanel>
        </Box>
    </>)

}