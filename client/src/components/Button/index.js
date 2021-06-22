import "./button.css";
export default function Button({ onClick, children }) {
  return (
    <button
      className="center"
      data-testid="hvac-results-button"
      onClick={onClick}
    >
      {children}
    </button>
  );
}
