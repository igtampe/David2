//The hamburger has been restored
import { Box, Divider, Drawer, List, ListItem, ListItemIcon, ListItemText, Typography } from "@mui/material";
import React from "react";


export default function Hamburger(props) {

  const GenerateListItem = (props) => {
    return (
      <ListItem button key={props.text} onClick={() => props.PushTo(props.url)}>
        <ListItemIcon><img src={`/icons/${props.image}`} alt={props.imageAlt} width="30px" style={{ margin: "5px", marginLeft: "10px" }} /></ListItemIcon>
        <ListItemText>{props.text}</ListItemText>
      </ListItem>
    );
  }

  const PushTo = (url) => {
    props.history.push(url);
    props.setMenuOpen(false)
  }

  return (
    <Drawer open={props.menuOpen} onClose={() => props.setMenuOpen(false)}>
      <Box
        sx={{ width: 250 }}
        role="presentation"
      >
        <List>
          <ListItem key="Logo">
            <div style={{ textAlign: 'center', width: '100%' }}><table><tbody><tr>
              <td width={'20px'}><a href="/"><img src="/media/david.png" alt="Logo" height="40" style={{ marginTop: '7px' }} /></a></td>
              <td><Typography style={{ fontSize: "30px", fontFamily: "oswald" }}>David</Typography></td>
            </tr></tbody></table></div>
          </ListItem>
          <Divider style={{marginTop:"10px", marginBottom:"10px"}}/>
          <GenerateListItem text='Dashboard' url='/' image='statistics.png' imageAlt='Dashboard' PushTo={PushTo} />
          <GenerateListItem text='Commissions' url='/Board' image='images.png' imageAlt='Image' PushTo={PushTo} />
          <GenerateListItem text='Data' url='/Data' image='book.png' imageAlt='Image' PushTo={PushTo} />
        </List>

      </Box>
    </Drawer>
  )


}
