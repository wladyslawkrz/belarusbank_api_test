import React, { Component } from "react";
// import Axios from "axios";

const requestURL = "https://belarusbank.by/api/kursExchange?city=Могилев";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      isLoaded: false,
    };
  }

  handleClick() {
    var { isLoaded, items } = this.state;
    const selectCurrency = document.getElementById("select_currency");
    const selectAddress = document.getElementById("select_address");

    document.getElementById("exchange_in").innerHTML =
      "Покупка " +
      selectCurrency.value + ": "+
      items[selectAddress.selectedIndex][selectCurrency.value + "_in"];
    document.getElementById("exchange_out").innerHTML =
      "Продажа " +
      selectCurrency.value + ": "+
      items[selectAddress.selectedIndex][selectCurrency.value + "_out"];
  }

  componentDidMount() {
    fetch(requestURL)
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        this.setState({ isLoaded: true, items: json });
      });
  }

  render() {
    var { isLoaded, items } = this.state;

    if (!isLoaded) {
      return <div>Loading....</div>;
    } else {
      return (
        <>
          <div className="App">
            <select id="select_currency">
              <option>USD</option>
              <option>EUR</option>
              <option>CNY</option>
              <option>RUB</option>
            </select>
            <select id="select_address">
              {items.map((item) => (
                <option key={item.filial_id}>
                  {item.name_type} {item.name}, {item.street_type} {item.street}
                  , {item.home_number}
                </option>
              ))}
            </select>
          </div>
          <input
            id="submit_button"
            type="submit"
            onClick={() => this.handleClick()}
          ></input>
          <div id="exchange_in"></div>
          <div id="exchange_out"></div>
        </>
      );
    }
  }
}
export default App;
