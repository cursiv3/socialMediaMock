import React, { Component } from "react";
import LoginForm from "./component.js";
const axios = require("axios");
const FormValidators = require("../../validate.js");
const validateLoginForm = FormValidators.validateLoginForm;

class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      errors: {},
      user: {
        username: "",
        password: ""
      }
    };

    this.handleChange = this.handleChange.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.submitData = this.submitData.bind(this);
  }

  handleChange(event) {
    const field = event.target.name;
    const user = this.state.user;
    user[field] = event.target.value;

    this.setState({
      user
    });
  }

  submitData() {
    var params = new URLSearchParams();
    params.append("username", this.state.user.username);
    params.append("password", this.state.user.password);

    axios
      .post("http://localhost:8000/login/submit", params)
      .then(res => {
        if (!res.data.success) {
          this.setState({
            errors: { message: res.data.message }
          });
        } else {
          localStorage.token = res.data.token;
        }
      })
      .catch(err => {
        console.log("error is: ", err);
      });
  }

  validateForm(event) {
    event.preventDefault();
    var payload = validateLoginForm(this.state.user);
    if (payload.success) {
      this.setState({
        errors: {}
      });
      this.submitData();
    } else {
      const errors = payload.errors;
      this.setState({
        errors
      });
    }
  }

  render() {
    return (
      <LoginForm
        onSubmit={this.validateForm}
        onChange={this.handleChange}
        errors={this.state.errors}
        user={this.state.user}
      />
    );
  }
}

export default LoginPage;
