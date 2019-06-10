import React, { Component } from 'react';
import {connect} from 'react-redux'
import "./Login.scss"
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import { submitLogin } from '../../store/authorization/AuthActions';
import {Redirect} from 'react-router-dom'

import CircularProgress from '@material-ui/core/CircularProgress';


class Login extends Component {

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      passwordError: false,
      emailError: false
    };
  }


  handleSubmit = () => {
    this.setState({
      passwordError: false,
      emailError: false,
    })

    let pass = true
    
    if (!this.state.email || !/.+@.+\.[A-Za-z]+$/.test(this.state.email)) {
      this.setState({
        emailError: true,
      })

      pass = false
    }

    if (!this.state.password) {
      this.setState({
        passwordError: true,
      })

      pass = false
    }

    if (pass) {
      this.props.submitLogin({
        email: this.state.email,
        password: this.state.password
      })
    }
  }

  handleChange = (key) => (event) => {
    let errorKey = `${key}Error`
    this.setState({
      [key]: event.target.value,
      [errorKey]: false
    })
  }

  render() {
    const {loading, token, hasError, error} = this.props

    if (token) {
      return (<Redirect to="/app" />);
    }

    return (
      <div className="login">
        <div className="login-box">
          <div className="box-top">
            <img src="/rglogo.png" alt="logo" />
            <div className="title">
              RESALE GLOBAL
            </div>
          </div>

          <div className="box-body">
            <div className="box-body-title">
              Login
            </div>
            { hasError ? (<div className="login-error">{error}</div>) : null }
            <FormControl fullWidth={true} required={true} variant="outlined" error={this.state.emailError}>
              <InputLabel htmlFor="email" >Email</InputLabel>
              <OutlinedInput
                id='email'
                labelWidth={50}
                autoFocus={true}
                type="email" 
                value={this.state.email}
                onChange={this.handleChange('email')}
                disabled={loading}>
              </OutlinedInput>
            </FormControl>
            <FormControl fullWidth={true} required={true} variant="outlined" error={this.state.passwordError}>
              <InputLabel htmlFor="password" >Password</InputLabel>
              <OutlinedInput
                id='password'
                labelWidth={80}
                type="password"
                value={this.state.password}
                onChange={this.handleChange('password')}
                disabled={loading}>
              </OutlinedInput>
            </FormControl>
            <Button
              fullWidth={true}
              color='primary'
              variant='outlined'
              onClick={this.handleSubmit}
              disabled={loading}>{loading ? <CircularProgress className="login-loader" />: 'Submit'}
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    submitLogin: (loginParam) => dispatch(submitLogin(loginParam))
  }
}

const mapStateToProps = (state) => ({
  loading: state.auth.loginLoading,
  token: state.auth.token,
  hasError: state.auth.loginError,
  error: state.auth.loginErrorMessage
})


export default connect(mapStateToProps, mapDispatchToProps)(Login);
