import React from "react";
import { Segment, Card } from "semantic-ui-react";
import axios from "axios";
import { RouteComponentProps } from "react-router-dom";

interface passedObject {
  minutes: number;
  seconds: number;
}

interface logMeetingObject {
  _id: number;
  duration: number;
  passed: passedObject;
}

interface logMeetingState {
  meetings: Array<logMeetingObject>;
  isLoading: boolean;
}

interface LogMeetingProps extends RouteComponentProps {}

class LogMeeting extends React.Component<LogMeetingProps, logMeetingState> {
  state: logMeetingState = {
    meetings: [],
    isLoading: true
  };

  componentDidMount = () => {
    axios
      .get("https://rapid-standup-backend.herokuapp.com/standup")
      .then(res => {
        this.setState({
          meetings: res.data,
          isLoading: false
        });
      });
  };

  handleCardClick = (meeting: Object) => {
    this.props.history.push("/detailmeeting", meeting);
  };

  render() {
    return (
      <Segment basic loading={this.state.isLoading}>
        <Card.Group centered>
          {this.state.meetings.map((meeting, index) => (
            <Card
              key={meeting._id}
              onClick={() => this.handleCardClick(meeting)}
            >
              <Card.Content>
                {`Meeting ke-${index + 1} dijadwalkan berjalan selama ${
                  meeting.duration
                } menit, selesai dalam ${meeting.passed.minutes} menit ${
                  meeting.passed.seconds
                } detik`}
              </Card.Content>
            </Card>
          ))}
        </Card.Group>
      </Segment>
    );
  }
}

export default LogMeeting;
