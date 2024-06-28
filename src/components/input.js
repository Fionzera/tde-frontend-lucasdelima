const input = ({label, placeholder, type, onChange}) => {
    return (
        <div>
             <label>{label}</label>
             <input type={type} placeholder={placeholder} onChange={onChange}></input>
        </div>

    );
}

export default input;