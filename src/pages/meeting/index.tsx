import React from "react";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";
import { Segment, Button, Label, Card } from "semantic-ui-react";
import axios from "axios";

import Input from "../../components/input";
import TextEditor from "../../components/textEditor";

interface MeetingState {
  duration: number;
  isBegin: boolean;
  seconds: number;
  minutes: number;
  minutePassed: number;
  secondPassed: number;
  note: string;
}

export default class Meeting extends React.Component<{}, MeetingState> {
  state: MeetingState = {
    duration: 0,
    minutePassed: -1,
    secondPassed: 0,
    isBegin: false,
    seconds: 0,
    minutes: 0,
    note: "test"
  };

  startMeeting = (value: MeetingState) => {
    let seconds: number = 0;
    let minutes: number = value.duration;
    this.setState({
      isBegin: true, //inisial memulai Meeting
      secondPassed: 0, //mereset detik
      minutePassed: -1, // mereset menit
      duration: value.duration
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
    if (this.state.isBegin === false) {
      this.startMeeting(values);
    } else {
      this.stopMeeting();
    }
  };

  stopMeeting = () => {
    this.setState({
      isBegin: false
    });
    console.log(this.state.duration);
  };

  submitMeetingData = () => {
    axios
      .post("https://rapid-standup-backend.herokuapp.com/standup", {
        duration: this.state.duration,
        passed: {
          minutes: this.state.minutePassed,
          seconds: this.state.secondPassed
        },
        note: this.state.note
      })
      .then(res => {
        alert("data Berhasil disimpan!");
      })
      .catch(err => {
        alert(`terjadi error: ${err}`);
      });
  };

  handleEditorChange = (e: any) => {
    this.setState({
      note: e.target.getContent()
    });
  };

  checkEditor = () => {
    alert(this.state.note);
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
                  <Field
                    name="duration"
                    component={Input}
                    disabled={this.state.isBegin}
                  />
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
            {(this.state.minutePassed !== -1 || this.state.seconds !== 0) &&
            this.state.isBegin === false ? (
              <div>
                <br />
                <br />
                <br />
                <Button
                  onClick={this.submitMeetingData}
                  fluid
                  color="green"
                  size="huge"
                >
                  Simpan Data Meeting
                </Button>
              </div>
            ) : null}
          </Segment>
        </Card>
        <br />
        <br />
        <TextEditor onChange={this.handleEditorChange} />
        <Label
          size="massive"
          color="grey"
          style={{ position: "fixed", top: "50%", right: 0 }}
          attached="top right"
        >
          <p
            style={{ fontSize: "3vw" }}
          >{`${this.state.minutes} menit ${this.state.seconds} detik`}</p>
        </Label>
      </Segment>
    );
  }
}
