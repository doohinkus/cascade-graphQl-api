import Layout from "./components/Layout";
import HVACWidget from "./components/HVACWidget";
import Context from "./context/HVACContext";
function App() {
  return (
    <div className="App">
      <Layout>
        <Context>
          <HVACWidget />
        </Context>
      </Layout>
    </div>
  );
}

export default App;
