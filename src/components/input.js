import "./input.css";

const Input = ({ label, placeholder, type, onChange }) => {
  return (
    <div className="input-container">
      <label className="input-label">{label}</label>
      <input className="input-field" type={type} placeholder={placeholder} onChange={onChange} />
    </div>
  );
};

export default Input;