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

export {
    RowView,
    DrawerView,
    NavigationView,
    ContentView,
    Title,
    Subtitle,
    Price,
    Body,
    Content
}