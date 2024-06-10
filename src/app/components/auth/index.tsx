import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { Fab, Stack, TextField } from "@mui/material";
import styled from "styled-components";
import LoginIcon from "@mui/icons-material/Login";
import MemberService from "../../services/MemberService";
import { Messages } from "../../../lib/config";
import { sweetErrorHandling } from "../../../lib/sweetAlerts";
import { T } from "../../../lib/types/common";
import { LoginInput, UserInput } from "../../../lib/types/user";
import { useGlobals } from "../../hooks/useGlobals";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 2, 2),
  },
}));

const ModalImg = styled.img`
  width: 62%;
  height: 100%;
  border-radius: 10px;
  background: #000;
  margin-top: 9px;
  margin-left: 10px;
`;

interface AuthenticationModalProps {
  signupOpen: boolean;
  loginOpen: boolean;
  handleSignupClose: () => void;
  handleLoginClose: () => void;
}

export default function AuthenticationModal(props: AuthenticationModalProps) {
  const { signupOpen, loginOpen, handleSignupClose, handleLoginClose } = props;
  const classes = useStyles();
  const [userNick, setUserNick] = useState<string>("");
  const [userPhone, setUserPhone] = useState<string>("");
  const [userPassword, setUserPassword] = useState<string>("");
  const { setAuthMember } = useGlobals();

  /** HANDLERS **/

  const handleUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserNick(e.target.value);
  };

  const handlePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserPhone(e.target.value);
  };

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserPassword(e.target.value);
  };

  const handlePasswordKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (signupOpen) {
        handleSignupRequest();
      } else if (loginOpen) {
        handleLoginRequest();
      }
    }
  };

  const handleSignupRequest = async () => {
    try {
      if (userNick === "" || userPhone === "" || userPassword === "") {
        throw new Error(Messages.error3);
      }

      const signupInput: UserInput = {
        userNick,
        userPhone,
        userPassword,
      };

      const user = new MemberService();
      const result = await user.signup(signupInput);

      setAuthMember(result);
      handleSignupClose();
    } catch (err) {
      handleSignupClose();
      sweetErrorHandling(err);
    }
  };

  const handleLoginRequest = async () => {
    try {
      if (userNick === "" || userPassword === "") {
        throw new Error(Messages.error3);
      }

      const loginInput: LoginInput = {
        userNick,
        userPassword,
      };

      const user = new MemberService();
      const result = await user.login(loginInput);

      setAuthMember(result);
      handleLoginClose();
    } catch (err) {
      handleLoginClose();
      sweetErrorHandling(err);
    }
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={signupOpen}
        onClose={handleSignupClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={signupOpen}>
          <Stack className={classes.paper} direction="row" sx={{ width: "800px" }}>
            <ModalImg src="/img/authentication.jpeg" alt="Signup" />
            <Stack sx={{ marginLeft: "69px", alignItems: "center" }}>
              <h2>Signup Form</h2>
              <TextField
                sx={{ marginTop: "7px" }}
                id="username-signup"
                label="Username"
                variant="outlined"
                onChange={handleUsername}
              />
              <TextField
                sx={{ my: "17px" }}
                id="phone-signup"
                label="Phone Number"
                variant="outlined"
                onChange={handlePhone}
              />
              <TextField
                id="password-signup"
                label="Password"
                variant="outlined"
                type="password"
                onChange={handlePassword}
                onKeyDown={handlePasswordKeyDown}
              />
              <Fab
                sx={{ marginTop: "30px", width: "120px" }}
                variant="extended"
                color="secondary"
                onClick={handleSignupRequest}
              >
                <LoginIcon sx={{ mr: 2 }} />
                Signup
              </Fab>
            </Stack>
          </Stack>
        </Fade>
      </Modal>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={loginOpen}
        onClose={handleLoginClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={loginOpen}>
          <Stack className={classes.paper} direction="row" sx={{ width: "700px" }}>
            <ModalImg src="/img/authentication.jpeg" alt="Login" />
            <Stack
              sx={{
                marginLeft: "65px",
                marginTop: "25px",
                alignItems: "center",
              }}
            >
              <h2>Login Form</h2>
              <TextField
                id="username-login"
                label="Username"
                variant="outlined"
                sx={{ my: "10px" }}
                onChange={handleUsername}
              />
              <TextField
                id="password-login"
                label="Password"
                variant="outlined"
                type="password"
                onChange={handlePassword}
                onKeyDown={handlePasswordKeyDown}
              />
              <Fab
                sx={{ marginTop: "27px", width: "120px" }}
                variant="extended"
                color="secondary"
                onClick={handleLoginRequest}
              >
                <LoginIcon sx={{ mr: 1 }} />
                Login
              </Fab>
            </Stack>
          </Stack>
        </Fade>
      </Modal>
    </div>
  );
}
