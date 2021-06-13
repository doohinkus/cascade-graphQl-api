import Layout from "./components/Layout";
// import ACEvents from "./components/ACEvents";
// import HeaterEvents from "./components/HeaterEvents";
import HVACDatePicker from "./components/HVACDatePicker";
// import HVACEvents from "./components/HVACEvents";
import Modal from "./components/Modal";

function App() {
  return (
    <div className="App">
      <Layout>
        {/* <ACEvents /> */}
        <HVACDatePicker />
        {/* <HeaterEvents /> */}
        {/* <HVACEvents /> */}
        <Modal />
      </Layout>
    </div>
  );
}

export default App;
