import "./button.css";

const button = ({text, onClick}) => {
    return (
        <div className="content-button">
            <button className="button" onClick={onClick}>{text}</button>
        </div>
    );
}

export default button;