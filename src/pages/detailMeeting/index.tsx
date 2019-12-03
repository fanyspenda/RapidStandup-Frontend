import React from "react";
import { Segment, Card } from "semantic-ui-react";
import { RouteComponentProps } from "react-router-dom";

class DetailMeeting extends React.Component<RouteComponentProps> {
  render() {
    return (
      <Segment basic>
        <Card fluid>
          <Card.Content>
            <div
              dangerouslySetInnerHTML={{
                __html: this.props.location.state.note
              }}
            />
          </Card.Content>
          <Card.Content>
            {`Meeting dijadwalkan berjalan selama ${this.props.location.state.duration} menit, selesai dalam `}
            <b>{`${this.props.location.state.passed.minutes} menit ${this.props.location.state.passed.seconds} detik`}</b>
          </Card.Content>
        </Card>
      </Segment>
    );
  }
}

export default DetailMeeting;
