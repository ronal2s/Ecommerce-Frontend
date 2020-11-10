import React, { useState } from "react";
import { Dialog, DialogContent, DialogActions, Button, Grid } from "@material-ui/core";
//@ts-ignore
import ImageGallery from 'react-image-gallery';
//@ts-ignore
import  'react-image-gallery/styles/css/image-gallery.css';
import { Body, Price, Separator, Subtitle, Title } from "../../globalStyles";

interface IModal {
    open: boolean,
    onClose: () => void,
    selectedItem: any
}

function ModalItem(props: IModal) {
    const [materials, setMaterials] = useState("");
    const [images, setImages] = useState([]);
    const onEntering = () => {
        let materials = "";
        let images: any = [];
        props.selectedItem["Materials and Finishes"].forEach((item: any) => {
            materials += `${item}, `;
        })
        props.selectedItem.Picture.forEach((item: any) => {
            images.push({
                original: item.url,
                thumbnail: item.thumbnails.small.url
            })
        })
        setMaterials(materials);
        setImages(images)
    }
    const getMoreInfo = () => {

    }

    return (
        <Dialog open={props.open} onClose={props.onClose} onEntering={onEntering} maxWidth="md" fullWidth >
            <DialogContent>
                {/* <Typography>Soft Dog Pendant</Typography> */}
                <Grid container spacing={1}>
                    <Grid item sm={6}>
                    <ImageGallery items={images} />;
                        {/* <AwesomeSlider cssModule={AwsSliderStyles} mobileTouch >
                            {props.selectedItem.Picture.map((item: any, key: number) => {
                                return <div data-src={item.thumbnails.small.url} />
                            })}
                        </AwesomeSlider> */}
                        <Separator size={40} />
                    </Grid>
                    <Grid item sm={6}>
                        <Title>{props.selectedItem.Name}</Title>
                        <Subtitle>{props.selectedItem.Type}</Subtitle>
                        <Price>US ${props.selectedItem['Unit Cost']}</Price>
                        <Body>{props.selectedItem.Description.substring(0, 300)}...</Body>
                        <Subtitle bold>Materials</Subtitle>
                        <Subtitle>{materials}</Subtitle> <Separator />
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