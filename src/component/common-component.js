import React from "react"

export const InputBox = (props) => {
    return (
        <input style={props.style} className="form-control" name={props.name} type={props.type} onChange={(e) => props.changeFun(e)} value={props.value} placeholder={props.placeholder} />
    )
}

export const ButtonComp = (props) => {
    return (
        <button onClick={() => props.clickFun()}>{props.label}</button>
    )
}

export const SelectBox = (props) => {
    return (
        <>
            <span style={{fondtSize: "14px"}}>{props.label}</span>
            <select id={props.id}>
                {
                    props.data && props.data.map((ele) => (
                        <option value={ele.value}>{ele.label}</option>
                    ))
                }
            </select>
        </>
    )
}