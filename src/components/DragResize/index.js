import {React, useState} from 'react'
import ShowCase from './ShowCase'
export default function MainLayout(){
    const [layout, setLayout] = useState([])
    const onLayoutChange = (layout) =>{
        setLayout(layout)
    }
    const stringifyLayout = () =>{
        return layout.map((item)=>{
            return(
                <div className="LayoutItem" key={item.i}>
                    <b>{item.i}</b>: [{item.x}, {item.y}, {item.w}, {item.h}]
                </div>
            )
        })
    }
    return (
        <div className="layoutJSON">
            <ShowCase onLayoutChange = {onLayoutChange()}/>
        </div>
    )
}