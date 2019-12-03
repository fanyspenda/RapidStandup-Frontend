import React from "react";
import "./App.css";
import Meeting from "./pages/meeting";
import { Menu } from "semantic-ui-react";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import LogMeeting from "./pages/logMeeting";
import DetailMeeting from "./pages/detailMeeting";

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
      <Router>
        <Menu size="huge" inverted attached>
          <Menu.Item as={Link} to="/" onClick={() => this.setActive("")} header>
            Rapid Standup
          </Menu.Item>
          <Menu.Item
            as={Link}
            to="/createmeeting"
            name="Mulai Standup Meeting"
            active={this.state.activeMenu === "Mulai Standup Meeting"}
            onClick={() => this.setActive("Mulai Standup Meeting")}
            color="blue"
          >
            Mulai Standup Meeting
          </Menu.Item>
          <Menu.Item
            as={Link}
            to="/logmeeting"
            name="Log Meeting"
            active={this.state.activeMenu === "Log Meeting"}
            onClick={() => this.setActive("Log Meeting")}
            color="blue"
          >
            Log Meeting
          </Menu.Item>
        </Menu>

        <Route path="/createmeeting" component={Meeting} />
        <Route path="/logmeeting" component={LogMeeting} />
        <Route path="/detailmeeting" component={DetailMeeting} />
        <Route path="/" exact>
          <h1>Hahahaha</h1>
        </Route>
      </Router>
    );
  }
}
