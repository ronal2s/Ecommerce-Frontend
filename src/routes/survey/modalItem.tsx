import React from "react";
import { Dialog, DialogContent, DialogActions, Button, Grid } from "@material-ui/core";
import AwesomeSlider from 'react-awesome-slider';
//@ts-ignore
import AwsSliderStyles from 'react-awesome-slider/dist/styles.css';
import { Body, Price, Separator, Subtitle, Title } from "../../globalStyles";

interface IModal {
    open: boolean,
    onClose: () => void,
}
const url = "https://images.contentful.com/5de70he6op10/7KotRtmFAvP7OWLTE7PHjH/93bacf07d554c2f56531e16af54a3cd4/FurnitureGateway_03_sectionals.jpg";

function ModalItem(props: IModal) {

    const getMoreInfo = () => {

    }

    return (
        <Dialog open={props.open} onClose={props.onClose} maxWidth="md" fullWidth >
            <DialogContent>
                {/* <Typography>Soft Dog Pendant</Typography> */}
                <Grid container spacing={1}>
                    <Grid item sm={6}>
                        <AwesomeSlider cssModule={AwsSliderStyles} mobileTouch media={[{ source: url }]} />
                        {/* <div data-src={url} />
                            <div data-src={url} />
                            <div data-src={url} />
                        </AwesomeSlider> */}
                        <Separator size={40} />
                    </Grid>
                    <Grid item sm={6}>
                        <Title>Soft Dog Pendant</Title>
                        <Subtitle>Lighting</Subtitle>
                        <Price>US $249</Price>
                        <Body>Turquoise and ombre brown meld in glossy elliptical base, handcrafted of richly glazed ceramic. Linen shade gently tapers with complementary texture and neutral color.</Body>
                        <Subtitle bold>Materials</Subtitle>
                        <Subtitle>Red, White, Matte Black, Shiny Black</Subtitle> <Separator />
                        <Button variant="contained" color="primary" onClick={getMoreInfo} >Get more information</Button>
                        <Separator size={10} />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button color="secondary" onClick={props.onClose} >Close</Button>
            </DialogActions>
        </Dialog>

    )
}

export default ModalItem;