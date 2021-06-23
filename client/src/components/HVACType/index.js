export default function HvacType({ testId, ...props }) {
  return (
    <div>
      <label>Select HVAC Type (Heater or AC)</label>
      <select {...props}>
        {" "}
        <option value="ac">AC</option>
        <option value="heater">Heater</option>
      </select>
    </div>
  );
}
