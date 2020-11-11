import React, { useState } from "react";
import { Dialog, DialogContent, DialogActions, Button, Grid } from "@material-ui/core";
//@ts-ignore
import ImageGallery from 'react-image-gallery';
//@ts-ignore
import 'react-image-gallery/styles/css/image-gallery.css';
import { withNamespaces } from "react-i18next";
import { Body, Price, Separator, Subtitle, Title } from "../../globalStyles";
import { GetStorage } from "../../utils/functions";
import { Keys } from "../../utils/enums";
import { toast } from "react-toastify";
import { sendEmail } from "../../utils/api";

interface IModal {
    open: boolean,
    onClose: () => void,
    selectedItem: any
}

function ModalItem(props: IModal | any) {
    const [materials, setMaterials] = useState("");
    const [images, setImages] = useState([]);
    const t = (props as any).t;

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
        props.selectedItem.Schematic.forEach((item: any) => {
            images.push({
                original: item.url,
                thumbnail: item.thumbnails.small.url
            })
        })
        setMaterials(materials);
        setImages(images)
    }
    const getMoreInfo = () => {
        const email = GetStorage(Keys.email);
        if (email) {
            sendEmail(props.selectedItem, (result: any) => {
                toast[result.error ? "error" : "success"](t(result.msg));
            })
        } else {
            toast.error(t("Must be logged"))
        }
    }

    return (
        <Dialog open={props.open} onClose={props.onClose} onEntering={onEntering} maxWidth="md" fullWidth >
            <DialogContent>
                {/* <Typography>Soft Dog Pendant</Typography> */}
                <Grid container spacing={1}>
                    <Grid item sm={6}>
                        <ImageGallery items={images} />
                        <Separator size={40} />
                    </Grid>
                    <Grid item sm={6}>
                        <Title>{props.selectedItem.Name}</Title>
                        <Subtitle>Size {props.selectedItem["Size (WxLxH)"]}</Subtitle>
                        <Subtitle>{props.selectedItem.Type}</Subtitle>
                        <Price>US ${props.selectedItem['Unit Cost']}</Price>
                        <Body>{props.selectedItem.Description.substring(0, 300)}...</Body>
                        <Subtitle bold>{t("Materials")}</Subtitle>
                        <Subtitle>{materials}</Subtitle> <Separator />
                        <Button variant="contained" color="primary" onClick={getMoreInfo} >{t("Get More Information")}</Button>
                        <Separator size={10} />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button color="secondary" onClick={props.onClose} >{t("Close")}</Button>
            </DialogActions>
        </Dialog>

    )
}

export default withNamespaces()(ModalItem);