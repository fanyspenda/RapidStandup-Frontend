import React from "react";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";
import { Segment, Button, Label, Card } from "semantic-ui-react";

import Input from "../../components/input";

interface MeetingState {
  duration: number;
  isBegin: boolean;
  seconds: number;
  minutes: number;
  minutePassed: number;
  secondPassed: number;
}

export default class Meeting extends React.Component<{}, MeetingState> {
  state: MeetingState = {
    duration: 0,
    minutePassed: -1,
    secondPassed: 0,
    isBegin: false,
    seconds: 0,
    minutes: 0
  };

  startMeeting = (value: MeetingState) => {
    let seconds: number = 0;
    let minutes: number = value.duration;
    this.setState({
      isBegin: true, //inisial memulai Meeting
      secondPassed: 0, //mereset detik
      minutePassed: -1 // mereset menit
    });
    let countDown = setInterval(() => {
      if (minutes >= 0) {
        //mengatur agar menit tidak kurang dari 0
        if (seconds <= 0) {
          this.setState({
            minutePassed: this.state.minutePassed + 1,
            secondPassed: 0
          });
          //jika detik kurang dari 0, maka akan digenerate kembali ke 59
          minutes -= 1;
          seconds = 59;
        } else {
          this.setState({
            secondPassed: this.state.secondPassed + 1
          });
          // jika tidak (detik masih tersisa), maka detik dikurangi seperti biasa
          seconds -= 1;
        }

        // jika detik dan menit mencapai 0 atau hitungan dihentikan dengan tombol
        if ((minutes === 0 && seconds === 0) || this.state.isBegin === false) {
          clearInterval(countDown);
          console.log(
            `rapat telah berjalan selama ${this.state.minutePassed} menit ${this.state.secondPassed} detik`
          );
        }
        this.setState({
          minutes: minutes,
          seconds: seconds
        });
      }
    }, 1000);
  };

  handleMeeting = (values: MeetingState) => {
    if (this.state.isBegin == false) {
      this.startMeeting(values);
    } else {
      this.stopMeeting();
    }
  };

  stopMeeting = () => {
    this.setState({
      isBegin: false
    });
  };

  MeetingSchema = yup.object().shape({
    duration: yup
      .number()
      .typeError("Input Harus Angka")
      .min(5, "Meeting tidak boleh kurang dari 5 menit")
      .max(20, "Meeting tidak boleh lebih dari 20 menit")
      .required("Waktu harus Diisi")
  });

  render() {
    return (
      <Segment basic textAlign="center">
        <h1>Mau Standup Meeting berapa menit?</h1>

        <Card centered>
          <Segment basic>
            <Formik
              initialValues={this.state}
              validationSchema={this.MeetingSchema}
              onSubmit={values => this.handleMeeting(values)}
            >
              {() => (
                <Form>
                  <Field name="duration" component={Input} />
                  <br />
                  {this.state.isBegin ? (
                    <Button fluid type="submit" color="red">
                      Hentikan Meeting
                    </Button>
                  ) : (
                    <Button
                      fluid
                      type="submit"
                      disabled={this.state.isBegin}
                      color="blue"
                    >
                      Mulai Meeting
                    </Button>
                  )}
                </Form>
              )}
            </Formik>
          </Segment>
        </Card>

        <br />
        <br />
        <Label
          size="massive"
          color="grey"
          style={{ position: "fixed", bottom: 0, right: 0 }}
        >
          <p
            style={{ fontSize: "3vw" }}
          >{`${this.state.minutes} menit ${this.state.seconds} detik`}</p>
        </Label>
      </Segment>
    );
  }
}
