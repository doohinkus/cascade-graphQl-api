export default function HvacType({ testId, ...props }) {
  return (
    <div>
      <label>Select HVAC Type (Heater or AC)</label>
      <select data-testid={testId} {...props}>
        {" "}
        <option data-testid="ac" value="ac">
          AC
        </option>
        <option data-testid="heater" value="heater">
          Heater
        </option>
      </select>
    </div>
  );
}
