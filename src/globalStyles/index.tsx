import styled from '@emotion/styled'
import { Drawer_size } from '../utils/constants';
import { COLORS } from '../utils/enums';


const RowView = styled.div({
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap"
})

const DrawerView = styled.div({
    width: Drawer_size
})

const NavigationView = styled.div({
    flex: 1,
})

const ContentView = styled.div({
    padding: 10
})

const Subtitle = styled.h5((props: any) => ({
    margin: 0, color: COLORS.PRIMARY_DARK, fontWeight: 400,
    marginLeft: props.marginLeft
}))

const Price = styled.h5({
    margin: 0, color: COLORS.CASH, fontWeight: 500, fontSize: 18
})

const Body = styled.p({
    margin: 0, fontWeight: 400, fontSize: 18
})

const Title = styled.h1((props: { centered?: boolean, bold?: boolean, color?: string, margin?: string | number, size?: string | number, clickeable?: boolean }) => ({
    textAlign: props.centered ? "center" : "left",
    fontWeight: props.bold ? 'bold' : 400,
    color: props.color ? props.color : "black",
    margin: props.margin ? `${props.margin}px` : 0,
    fontSize: props.size ? `${props.size}px` : 22,
    ":hover": props.clickeable ? {
        color: COLORS.PRIMARY,
        cursor: "pointer"
    } : {}
}))

const Content = styled.div((props: any) => ({
    display: props.flex ? "flex" : undefined,
    alignItems: props.alignItems,
    justifyContent: props.justifyContent
}))

const View = styled.div((props: { centered?: boolean, column?: boolean, row?: boolean, justifyContent?: string, alignItems?: string, color?: any, height?: number | string, width?: string | number, fullsize?: boolean, borderRadius?: number, opacity?: number, marginLeft?: number, marginRight?: number, button?: boolean, wrap?: boolean }) => ({
    display: props.centered || props.column || props.row ? "flex" : "",
    justifyContent: props.centered ? "center" : props.justifyContent ? props.justifyContent : "",
    alignItems: props.centered ? "center" : props.alignItems ? props.alignItems : undefined,
    backgroundColor: props.color ? props.color : "white",
    height: props.fullsize ? "100vh" : props.height ? `${props.height}px` : "",
    width: props.fullsize ? "100%" : props.width ? `${props.width}px` : "",
    flexDirection: props.column ? "column" : props.row ? "row" : "column",
    borderRadius: props.borderRadius ? `${props.borderRadius}px` : "",
    opacity: props.opacity ? props.opacity : 1,
    marginLeft: props.marginLeft ? `${props.marginLeft}px` : 0,
    marginRight: props.marginRight ? `${props.marginRight}px` : 0,
    cursor: props.button ? "pointer" : "",
    flexWrap: props.wrap ? "wrap" : undefined

}))

const SquareView = styled.div((props: any) => ({
    width: 300, height: 250,
    backgroundColor: "white",
    borderRadius: 10,
    boxShadow: "2px 3px 16px 3px",
}))

const Separator = styled.div((props: { size?: number }) => ({
    marginTop: props.size ? `${props.size}px` : "10px"
}))


export {
    RowView,
    DrawerView,
    NavigationView,
    ContentView,
    Title,
    Subtitle,
    Price,
    Body, Separator,
    Content, View, SquareView
}