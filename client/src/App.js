import Layout from "./components/Layout";
// import ACEvents from "./components/ACEvents";
// import HeaterEvents from "./components/HeaterEvents";
import HVACWidget from "./components/HVACWidget";
// import HVACEvents from "./components/HVACEvents";
import Modal from "./components/Modal";

function App() {
  return (
    <div className="App">
      <Layout>
        <HVACWidget />
      </Layout>
    </div>
  );
}

export default App;
