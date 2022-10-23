interface CheckboxProps{
    value: boolean
    onChange: (checked: boolean) => void
}

export function Checkbox({value, onChange}: CheckboxProps){

    const handleChange = (event: any) => {
        onChange(event.currentTarget.checked)
    }

    return(
        <input className={''} type="checkbox" onChange={handleChange} checked={value}/>
    )
}