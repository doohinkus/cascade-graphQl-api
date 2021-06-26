import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
export default function SelectDate({ label, testId, ...props }) {
  return (
    <div data-testid={testId}>
      <label>{label}</label>
      <DatePicker {...props} />
    </div>
  );
}
