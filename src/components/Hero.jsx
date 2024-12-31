import { FaArrowDown } from "react-icons/fa";

function Hero() {
  return (
    <div className="hero">
      <h4>Turn Your Project Data into Instant Insights</h4>
      <p className="sub">
        Effortlessly generate PERT diagrams to streamline your project planning
        and execution. Simplify complexity and stay ahead with a single click.
      </p>
      <p className="call">
        <p>Generate PERT now</p> <FaArrowDown className="arrow" />
      </p>
    </div>
  );
}

export default Hero;
