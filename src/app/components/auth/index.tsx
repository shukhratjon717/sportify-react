import React, { useState } from "react";
import { Modal, Fade, Backdrop, Stack, TextField, Fab } from "@mui/material";
import styled from "styled-components";
import LoginIcon from "@mui/icons-material/Login";
import MemberService from "../../services/MemberService";
import { Messages } from "../../../lib/config";
import { sweetErrorHandling } from "../../../lib/sweetAlerts";
import { LoginInput, UserInput } from "../../../lib/types/user";
import { useGlobals } from "../../hooks/useGlobals";

const ModalImg = styled.img`
  width: 60%;
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

export default function AuthenticationModal({
  signupOpen,
  loginOpen,
  handleSignupClose,
  handleLoginClose,
}: AuthenticationModalProps) {
  const [userNick, setUserNick] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const { setAuthMember } = useGlobals();

  /** HANDLERS **/
  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setUserNick(e.target.value);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setUserPhone(e.target.value);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setUserPassword(e.target.value);

  const handlePasswordKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (signupOpen) handleSignupRequest();
      else if (loginOpen) handleLoginRequest();
    }
  };

  const handleSignupRequest = async () => {
    try {
      if (!userNick || !userPhone || !userPassword) throw new Error(Messages.error3);

      const signupInput: UserInput = { userNick, userPhone, userPassword };
      const memberService = new MemberService();
      const result = await memberService.signup(signupInput);

      setAuthMember(result);
      handleSignupClose();
    } catch (err) {
      handleSignupClose();
      sweetErrorHandling(err);
    }
  };

  const handleLoginRequest = async () => {
    try {
      if (!userNick || !userPassword) throw new Error(Messages.error3);

      const loginInput: LoginInput = { userNick, userPassword };
      const memberService = new MemberService();
      const result = await memberService.login(loginInput);

      setAuthMember(result);
      handleLoginClose();
    } catch (err) {
      handleLoginClose();
      sweetErrorHandling(err);
    }
  };

  const renderModalContent = (
    title: string,
    showPhone: boolean,
    handleClose: () => void,
    handleAction: () => void
  ) => (
    <Stack
      direction="row"
      sx={{
        width: showPhone ? 800 : 700,
        bgcolor: "background.paper",
        borderRadius: 2,
        p: 2,
        alignItems: "center",
      }}
    >
      <ModalImg src="/img/authentication.jpeg" alt={title} />
      <Stack sx={{ ml: 6, alignItems: "center" }}>
        <h2>{title} Form</h2>
        <TextField
          label="Username"
          variant="outlined"
          sx={{ mt: 2 }}
          onChange={handleUsernameChange}
        />
        {showPhone && (
          <TextField
            label="Phone Number"
            variant="outlined"
            sx={{ my: 2 }}
            onChange={handlePhoneChange}
          />
        )}
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          onChange={handlePasswordChange}
          onKeyDown={handlePasswordKeyDown}
        />
        <Fab
          variant="extended"
          color="secondary"
          sx={{ mt: 4, width: 140 }}
          onClick={handleAction}
        >
          <LoginIcon sx={{ mr: 1 }} />
          {title}
        </Fab>
      </Stack>
    </Stack>
  );

  return (
    <>
      <Modal
        open={signupOpen}
        onClose={handleSignupClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500 }}
      >
        <Fade in={signupOpen}>{renderModalContent("Signup", true, handleSignupClose, handleSignupRequest)}</Fade>
      </Modal>

      <Modal
        open={loginOpen}
        onClose={handleLoginClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500 }}
      >
        <Fade in={loginOpen}>{renderModalContent("Login", false, handleLoginClose, handleLoginRequest)}</Fade>
      </Modal>
    </>
  );
}
