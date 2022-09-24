const Input = (props) => {
    const {label, id, type, handleInput} = props

    return (
        <div className="input">
            <label htmlFor={id}>
                {label}
            </label>
            <input
                type={type || 'password'}
                id={id}
                name={id}
                onChange={(e)=>handleInput(e) }
            />
        </div>
    )
}

export default Input