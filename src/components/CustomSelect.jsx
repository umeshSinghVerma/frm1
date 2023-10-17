function CustomSelect({ name, value, options, onChange }) {
    return (
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-40 px-2 py-1 rounded-md bg-slate-200"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    );
    
  }

  export default CustomSelect