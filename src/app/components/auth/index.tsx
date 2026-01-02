import React, { useState } from "react";
import {
  Modal,
  Slide,
  Backdrop,
  Stack,
  TextField,
  Button,
  Typography,
  IconButton,
  InputAdornment,
  Box,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Person,
  Phone,
  Lock,
  Visibility,
  VisibilityOff,
  Close,
} from "@mui/icons-material";
import MemberService from "../../services/MemberService";
import { Messages } from "../../../lib/config";
import { sweetErrorHandling } from "../../../lib/sweetAlerts";
import { LoginInput, UserInput } from "../../../lib/types/user";
import { useGlobals } from "../../hooks/useGlobals";

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
  const [showPassword, setShowPassword] = useState(false);
  const { setAuthMember } = useGlobals();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

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
      resetForm();
      handleSignupClose();
    } catch (err) {
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
      resetForm();
      handleLoginClose();
    } catch (err) {
      sweetErrorHandling(err);
    }
  };

  const resetForm = () => {
    setUserNick("");
    setUserPhone("");
    setUserPassword("");
    setShowPassword(false);
  };

  const handleCloseWithReset = (handleClose: () => void) => {
    resetForm();
    handleClose();
  };

  const renderModalContent = (
    title: string,
    subtitle: string,
    showPhone: boolean,
    handleClose: () => void,
    handleAction: () => void
  ) => (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        outline: "none",
      }}
    >
      <Stack
        sx={{
          width: isMobile ? "90%" : 480,
          maxWidth: "100%",
          background: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(20px)",
          borderRadius: 4,
          p: isMobile ? 3 : 5,
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
          border: "1px solid rgba(255, 255, 255, 0.3)",
          position: "relative",
        }}
      >
        {/* Close Button */}
        <IconButton
          onClick={() => handleCloseWithReset(handleClose)}
          sx={{
            position: "absolute",
            right: 16,
            top: 16,
            color: "text.secondary",
          }}
        >
          <Close />
        </IconButton>

        {/* Header */}
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            background: "linear-gradient(135deg, #2ecc71 0%, #27ae60 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            mb: 1,
            textAlign: "center",
          }}
        >
          {title}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: "text.secondary",
            mb: 4,
            textAlign: "center",
          }}
        >
          {subtitle}
        </Typography>

        {/* Form Fields */}
        <Stack spacing={2.5}>
          <TextField
            fullWidth
            label="Username"
            variant="outlined"
            value={userNick}
            onChange={handleUsernameChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Person sx={{ color: "primary.main" }} />
                </InputAdornment>
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
                "&:hover fieldset": {
                  borderColor: "primary.main",
                },
              },
            }}
          />

          {showPhone && (
            <TextField
              fullWidth
              label="Phone Number"
              variant="outlined"
              value={userPhone}
              onChange={handlePhoneChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Phone sx={{ color: "primary.main" }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                  "&:hover fieldset": {
                    borderColor: "primary.main",
                  },
                },
              }}
            />
          )}

          <TextField
            fullWidth
            label="Password"
            variant="outlined"
            type={showPassword ? "text" : "password"}
            value={userPassword}
            onChange={handlePasswordChange}
            onKeyDown={handlePasswordKeyDown}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock sx={{ color: "primary.main" }} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                    size="small"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
                "&:hover fieldset": {
                  borderColor: "primary.main",
                },
              },
            }}
          />

          {/* Action Button */}
          <Button
            fullWidth
            variant="contained"
            size="large"
            onClick={handleAction}
            sx={{
              mt: 2,
              py: 1.5,
              borderRadius: 2,
              fontSize: "1rem",
              fontWeight: 600,
              textTransform: "none",
              background: "linear-gradient(135deg, #2ecc71 0%, #27ae60 100%)",
              boxShadow: "0 4px 14px 0 rgba(46, 204, 113, 0.4)",
              transition: "all 0.3s ease",
              "&:hover": {
                background: "linear-gradient(135deg, #27ae60 0%, #229954 100%)",
                boxShadow: "0 6px 20px 0 rgba(46, 204, 113, 0.5)",
                transform: "translateY(-2px)",
              },
            }}
          >
            {title}
          </Button>
        </Stack>
      </Stack>
    </Box>
  );

  return (
    <>
      <Modal
        open={signupOpen}
        onClose={() => handleCloseWithReset(handleSignupClose)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
          sx: {
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            backdropFilter: "blur(8px)",
          },
        }}
      >
        <Slide direction="up" in={signupOpen} timeout={400}>
          {renderModalContent(
            "Sign Up",
            "Create your account to get started",
            true,
            handleSignupClose,
            handleSignupRequest
          )}
        </Slide>
      </Modal>

      <Modal
        open={loginOpen}
        onClose={() => handleCloseWithReset(handleLoginClose)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
          sx: {
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            backdropFilter: "blur(8px)",
          },
        }}
      >
        <Slide direction="up" in={loginOpen} timeout={400}>
          {renderModalContent(
            "Login",
            "Welcome back! Please login to continue",
            false,
            handleLoginClose,
            handleLoginRequest
          )}
        </Slide>
      </Modal>
    </>
  );
}
