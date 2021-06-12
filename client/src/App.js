import Layout from "./components/Layout";
import ACEvents from "./components/ACEvents";
import HeaterEvents from "./components/HeaterEvents";
import HVACEvents from "./components/HVACEvents";
import Modal from "./components/Modal";

function App() {
  return (
    <div className="App">
      <Layout>
        <ACEvents />
        <HeaterEvents />
        <HVACEvents />
        <Modal />
      </Layout>
    </div>
  );
}

export default App;
