import { useState } from "react";
import "./App.css";
import Table from "./components/Table";
import Navbar from "./components/Navbar";
import Title from "./components/Title";
import Hero from "./components/Hero";
import Footer from "./components/Footer";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Navbar />
      <Title />
      <Hero />
      <Table />
      <Footer />
    </>
  );
}

export default App;
