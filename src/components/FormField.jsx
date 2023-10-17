
import CustomDateInput from "./CustomDateInput";
import CustomSelect from "./CustomSelect";

// Custom form field component
function FormField({
    form,
    index,
    departureArray,
    arrivalArray,
    handleFormChange,
    removeFields
}) {
    return (
        <div key={index} className="flex gap-10 justify-center">
            <CustomSelect
                name="Departure"
                value={form.Departure}
                options={departureArray}
                onChange={(event) => handleFormChange(event, index)}
            />
            <CustomSelect
                name="Arrival"
                value={form.Arrival}
                options={arrivalArray}
                onChange={(event) => handleFormChange(event, index)}
            />
            <CustomDateInput
                name="startDate"
                value={form.startDate}
                onChange={(event) => handleFormChange(event, index)}
            />
            <CustomDateInput
                name="endDate"
                value={form.endDate}
                onChange={(event) => handleFormChange(event, index)}
            />
            <button
                className="border border-red-500 rounded-md px-5 hover:text-white hover-bg-red-500 transition-all"
                onClick={() => removeFields(index)}
            >
                Remove
            </button>
        </div>
    );
}

export default FormField
