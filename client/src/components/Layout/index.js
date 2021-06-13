import "./Layout.css";
import cascade_logo from "./cascade-energy-logo-2.png";
function Layout({ children }) {
  return (
    <div>
      <header>
        <img src={cascade_logo} alt="cascade energy" />
      </header>
      {children}
    </div>
  );
}
export default Layout;
