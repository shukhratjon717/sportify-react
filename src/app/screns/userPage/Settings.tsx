import { Box } from "@mui/material";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import Button from "@mui/material/Button";
import { Messages, serverApi } from "../../../lib/config";
import MemberService from "../../services/MemberService";
import {
  sweetErrorHandling,
  sweetTopSuccessAlert,
} from "../../../lib/sweetAlerts";
import { useGlobals } from "../../hooks/useGlobals";
import { useState } from "react";
import { T } from "../../../lib/types/common";
import { UserUpdateInput } from "../../../lib/types/user";

export function Settings() {
  const { authMember, setAuthMember } = useGlobals();
  const [userImage, setUserImage] = useState<string>(
    authMember?.userImage
      ? `${serverApi}/${authMember.userImage}`
      : "/icons/default-user.svg"
  );
  const [userUpdateInput, setUserUpdateInput] = useState<UserUpdateInput>({
    userNick: authMember?.userNick,
    userPhone: authMember?.userPhone,
    userAddress: authMember?.userAddress,
    userDesc: authMember?.userDesc,
    userImage: authMember?.userImage,
  });

  /** HANDLERS **/

  const userNickHandler = (e: T) => {
    userUpdateInput.userNick = e.target.value;
    setUserUpdateInput({ ...userUpdateInput });
  };

  const userPhoneHandler = (e: T) => {
    userUpdateInput.userPhone = e.target.value;
    setUserUpdateInput({ ...userUpdateInput });
  };

  const userAddressHandler = (e: T) => {
    userUpdateInput.userAddress = e.target.value;
    setUserUpdateInput({ ...userUpdateInput });
  };

  const userDescHandler = (e: T) => {
    userUpdateInput.userDesc = e.target.value;
    setUserUpdateInput({ ...userUpdateInput });
  };

  const handleSubmitButton = async () => {
    try {
      if (!authMember) throw new Error(Messages.error2);
      if (
        userUpdateInput.userNick === "" ||
        userUpdateInput.userPhone === "" ||
        userUpdateInput.userAddress === "" ||
        userUpdateInput.userDesc === ""
      ) {
        throw new Error(Messages.error3);
      }

      const member = new MemberService();
      const result = await member.updateMember(userUpdateInput);
      setAuthMember(result);

      await sweetTopSuccessAlert("Modified successfully!", 700);
    } catch (err) {
      console.log(err);
      sweetErrorHandling(err).then();
    }
  };

  const handleImageViewver = (e: T) => {
    const file = e.target.files[0];
    const fileType = file.type,
      validateImageTypes = ["image/jpg", "image/jpeg", "image/png"];
    if (!validateImageTypes.includes(fileType)) {
      sweetErrorHandling(Messages.error5).then();
    } else {
      if (file) {
        userUpdateInput.userImage = file;
        setUserUpdateInput({ ...userUpdateInput });
        setUserImage(URL.createObjectURL(file));
      }
    }
  };

  return (
    <Box className={"settings"}>
      <Box className={"member-media-frame"}>
        <img src={userImage} className={"mb-image"} />
        <div className={"media-change-box"}>
          <span>Upload image</span>
          <p>JPG, JPEG, PNG formats only!</p>
          <div className={"up-del-box"}>
            <Button component="label" onChange={handleImageViewver}>
              <CloudDownloadIcon />
              <input type="file" hidden />
            </Button>
          </div>
        </div>
      </Box>
      <Box className={"input-frame"}>
        <div className={"long-input"}>
          <label className={"spec-label"}>Username</label>
          <input
            className={"spec-input mb-nick"}
            type="text"
            placeholder={authMember?.userNick}
            value={userUpdateInput.userNick}
            name="memberNick"
            onChange={userNickHandler}
          />
        </div>
      </Box>
      <Box className={"input-frame"}>
        <div className={"short-input"}>
          <label className={"spec-label"}>Phone</label>
          <input
            className={"spec-input mb-phone"}
            type="text"
            placeholder={authMember?.userPhone ?? "no phone"}
            value={userUpdateInput.userPhone}
            name="memberPhone"
            onChange={userPhoneHandler}
          />
        </div>
        <div className={"short-input"}>
          <label className={"spec-label"}>Address</label>
          <input
            className={"spec-input  mb-address"}
            type="text"
            placeholder={authMember?.userAddress ?? "no address"}
            value={userUpdateInput.userAddress}
            name="memberAddress"
            onChange={userAddressHandler}
          />
        </div>
      </Box>
      <Box className={"input-frame"}>
        <div className={"long-input"}>
          <label className={"spec-label"}>Description</label>
          <textarea
            className={"spec-textarea mb-description"}
            placeholder={authMember?.userDesc ?? "no description"}
            value={userUpdateInput.userDesc}
            name="memberDesc"
            onChange={userDescHandler}
          />
        </div>
      </Box>
      <Box className={"save-box"}>
        <Button variant={"contained"} onClick={handleSubmitButton}>
          Save
        </Button>
      </Box>
    </Box>
  );
}
