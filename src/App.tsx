import React from "react";
import "./App.css";
import Meeting from "./pages/meeting";
import { Menu } from "semantic-ui-react";

interface appState {
  activeMenu: String;
}

export default class App extends React.Component<{}, appState> {
  state: appState = {
    activeMenu: ""
  };
  setActive = (name: String) => {
    this.setState({
      activeMenu: name
    });
  };
  render() {
    return (
      <>
        <Menu size="huge" inverted>
          <Menu.Item header>Rapid Standup</Menu.Item>
          <Menu.Item
            name="Mulai Standup Meeting"
            active={this.state.activeMenu === "Mulai Standup Meeting"}
            onClick={() => this.setActive("Mulai Standup Meeting")}
            color="blue"
          >
            Mulai Standup Meeting
          </Menu.Item>
          <Menu.Item
            name="Riwayat"
            active={this.state.activeMenu === "Riwayat"}
            onClick={() => this.setActive("Riwayat")}
            color="blue"
          >
            Riwayat
          </Menu.Item>
        </Menu>
        <Meeting />
      </>
    );
  }
}
