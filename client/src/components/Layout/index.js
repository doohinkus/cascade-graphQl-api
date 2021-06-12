import "./Layout.css";
function Layout({ children }) {
  return (
    <div>
      <header>Cascade Header</header>
      {children}
    </div>
  );
}
export default Layout;
