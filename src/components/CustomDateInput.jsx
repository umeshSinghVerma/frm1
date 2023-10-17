function CustomDateInput({ name, value, onChange }) {
    return (
        <input
            type="date"
            name={name}
            placeholder={name}
            onChange={onChange}
            value={value}
            className="bg-slate-200 rounded-md px-2"
        />
    );
}

export default CustomDateInput