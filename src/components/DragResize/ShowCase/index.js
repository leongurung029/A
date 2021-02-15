import React from 'react'
import _ from 'lodash'
import {Responsive, WidthProvider} from "react-grid-layout/index";
const ResponsiveReactGridLayout = WidthProvider(Responsive);

export default function ShowcaseLayout(props){
    const [onLayoutChange, setLayoutChange] = useState[props]
    const [state,setState] = useState({
        currentBreakpoints : "lg",
        compactType : "vertical",
        mounted : false,
        layout: {lg : onLayoutChange.initialLayout}
    })
    return (
        <div>

        </div>
    )
}