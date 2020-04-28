import React, { useState } from "react";
import { Card, makeStyles, createStyles, Theme, FormControl, InputLabel, Input, InputAdornment, IconButton, Typography, Button } from "@material-ui/core";
import clsx from "clsx";
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Axios from "axios";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    margin: {
      margin: theme.spacing(3),
    },
    root: {
      width: '360px',
      height: '330px',
      position: 'absolute',
      left: '50%',
      top: '45%',
      transform: 'translate(-50%,-50%)'
    },
    withoutLabel: {
      marginTop: theme.spacing(3),
    },
    textField: {
      width: '310px',
    },
    header: {
      paddingTop: '5%'
    },
    button: {
      textAlign: 'center'
    }
  }),
);

interface State {
  username: string;
  password: string;
  showPassword: boolean;
}

export default function Login(props: any) {

  const classes = useStyles();
  const [values, setValues] = useState<State>({
    username: '',
    password: '',
    showPassword: false,
  });

  const history = useHistory();

  const handleChange = (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const login = () => {
    Axios.post('/api/public/login', values)
      .then(res => {
        console.log(res.data)
        history.push('/admin')
      })
      .catch(err => alert(err))
  }


  return (
    <Card className={classes.root}>
      <Typography align="center" variant="h5" className={classes.header}>登录博客后台</Typography>
      <FormControl className={clsx(classes.margin, classes.textField)}>
        <InputLabel htmlFor="input-with-icon-adornment">Username</InputLabel>
        <Input
          id="input-with-icon-adornment"
          placeholder="visitor"
          value={values.username}
          onChange={handleChange('username')}
        />
      </FormControl>
      <FormControl className={clsx(classes.margin, classes.textField)}>
        <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
        <Input
          id="standard-adornment-password"
          placeholder="123456"
          type={values.showPassword ? 'text' : 'password'}
          value={values.password}
          onChange={handleChange('password')}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
              >
                {values.showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
      <div className={clsx(classes.margin, classes.button)}>
        <Button variant="contained" color="primary" onClick={login}>登陆</Button>
      </div>
    </Card>
  )
}