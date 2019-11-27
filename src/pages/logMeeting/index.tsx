import React from "react";
import { Segment, Card } from "semantic-ui-react";
import axios from "axios";

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

class LogMeeting extends React.Component<{}, logMeetingState> {
  state: logMeetingState = {
    meetings: [
      // {
      //   duration: 10,
      //   passed: {
      //     minutes: 3,
      //     seconds: 26
      //   }
      // },
      // {
      //   duration: 15,
      //   passed: {
      //     minutes: 10,
      //     seconds: 27
      //   }
      // }
    ],
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

  render() {
    return (
      <Segment basic loading={this.state.isLoading}>
        <Card.Group>
          {this.state.meetings.map((meeting, index) => (
            <Card fluid key={meeting._id}>
              <Segment basic>{`Meeting ke-${index +
                1} dijadwalkan berjalan selama ${
                meeting.duration
              } menit, selesai dalam ${meeting.passed.minutes} menit ${
                meeting.passed.seconds
              } detik`}</Segment>
            </Card>
          ))}
        </Card.Group>
      </Segment>
    );
  }
}

export default LogMeeting;
