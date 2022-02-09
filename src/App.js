import React from "react";
import { CarsFuel } from "./CarsFuel";
import { Alert } from "./Alert";

class App extends React.Component {
  constructor(props) {
    super(props);

    // We declare the state
    this.state = {
      x: 1,
      f: 0,
    };
  }

  updateCoordinates() {
    this.timerID = setInterval(() => {
      this.setState((prevState) => ({
        x: prevState.x + 1,
        f: 1 + prevState.f + prevState.x * 10,
      }));
    }, 1000);
  }

  componentDidMount() {
    this.updateCoordinates();
  }

  componentWillUnmount() {
    if (this.timerID) {
      clearInterval(this.timerID);
    }
  }

  render() {
    var x1 = this.state.x;
    var fuel = this.state.f;

    return (
      <section>
        <h1>Car details</h1>
        <div>
          <span aria-live="off">Position - </span>
          <span>{x1}</span>
        </div>
        <CarsFuel fuel={fuel}></CarsFuel>
        <Alert fuel={fuel} />
      </section>
    );
  }
}

export default App;
