
import './App.css';
import Layout from './components/layout';
import Header from './components/navbar';

function App() {
  return (
    <div className="App">
      <header>
        <Header />
      </header>
      <section>
        <Layout />
      </section>
    </div>
  );
}

export default App;
