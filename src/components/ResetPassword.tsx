import { SquareX, CheckCircle, Eye, EyeOffIcon } from "lucide-react";
import ReactModal from "react-modal";
import { ButtonUI } from "./Button";
import { Input } from "./ui/input";
import axios from "axios";
import { memo, useState } from "react";
import React from "react";

const ResetPassword = ({
  emailText,
  setShowInputPasswordModal,
  showInputPasswordModal,
}: {
  emailText: string;
  setShowInputPasswordModal: React.Dispatch<React.SetStateAction<boolean>>;
  showInputPasswordModal: boolean;
}) => {
  const [otp, setOtp] = useState<string>("");
  console.log(emailText);
  const [email, setEmail] = useState<string>(emailText || "");
  const [verifyEmail, setVerifyEmail] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSettingPassword = async () => {
    try {
      if (emailVerified) {
        await axios.post(
          `${import.meta.env.VITE_API_ENDPOINT}/auth/setPassword`,
          { email: email, password: password }
        );
        setShowInputPasswordModal(false);
      }
    } catch (err) {
      console.log("Error setting user password", err);
    }
  };

  const handleConfirmEmail = async () => {
    try {
      if (email) {
        await axios.post(
          `${import.meta.env.VITE_API_ENDPOINT}/auth/confirmEmail`,
          {
            email: email,
          }
        );
        setVerifyEmail(true);
      }
    } catch (err) {
      console.log("Error login using email", err);
    }
  };

  const handleVerifyEmailOtp = async () => {
    try {
      if (email) {
        await axios.post(
          `${import.meta.env.VITE_API_ENDPOINT}/auth/verifyEmailOtp`,
          {
            otpv: otp,
            email: email,
          }
        );
        setEmailVerified(true);
        setOtp("");
      }
    } catch (err) {
      console.log("Error login using email", err);
    }
  };

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      padding: 5,
      background: "#AAB396",
      transform: "translate(-50%, -50%)",
      width: "33.33%", // Set width to 1/3 of the viewport
      overflow: "hidden",
      zIndex: 100,
    },
  };

  return (
    <ReactModal
      isOpen={showInputPasswordModal}
      contentLabel="Set Password Modal"
      style={customStyles}
      overlayClassName={"overlayStyles"}
    >
      <SquareX
        className={`text-buttonBackground2 hover:text-buttonHover2 absolute top-1 right-1 cursor-pointer z-50`}
        onClick={() => {
          setShowInputPasswordModal(false);
        }}
      />
      <div className="bg-secondaryBackground p-5 relative z-10">
        <div className="text-defaultText">Email</div>
        <Input
          type="email"
          placeholder="Email"
          value={email}
          disabled
          onChange={(e) => setEmail(e.target.value)}
          className="text-defaultText placeholder:text-defaultText focus:placeholder-defaultText placeholder:opacity-50 mb-5"
        />
        <hr className="pb-3" />
        <div className="text-defaultText">Verify Email</div>
        <div className="flex flex-row justify-between">
          <ButtonUI
            className="w-2/6"
            onClick={handleConfirmEmail}
            disabled={verifyEmail}
          >
            Send OTP
          </ButtonUI>
          <div className="w-3/6 relative flex items-center">
            <Input
              type="otp"
              disabled={!verifyEmail || emailVerified}
              placeholder="Enter OTP"
              onChange={(e) => setOtp(e.target.value)}
              className="text-defaultText placeholder:text-defaultText focus:placeholder-defaultText placeholder:opacity-50"
            />
            <CheckCircle
              className={`text-buttonBackground2 hover:text-buttonHover2 absolute right-2 cursor-pointer r-0 ${
                otp.length === 4
                  ? "text-buttonBackground2 hover:text-buttonHover2"
                  : "text-gray-300 cursor-not-allowed"
              }`}
              onClick={() => {
                if (otp.length === 4) {
                  handleVerifyEmailOtp();
                }
              }}
            />
          </div>
        </div>
        {emailVerified && (
          <>
            <div className="text-defaultText mt-5 select-none">
              Set Password
            </div>
            <div className="w-full relative flex items-center mb-4">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className="text-defaultText placeholder:text-defaultText focus:placeholder-defaultText placeholder:opacity-50"
              />
              <span className="absolute right-2 cursor-pointer">
                {showPassword ? (
                  <Eye
                    className=" text-buttonBackground2 hover:text-buttonHover2"
                    onClick={() => setShowPassword(false)}
                  />
                ) : (
                  <EyeOffIcon
                    className=" text-buttonBackground2 hover:text-buttonHover2"
                    onClick={() => setShowPassword(true)}
                  />
                )}
              </span>
            </div>
            <ButtonUI onClick={handleSettingPassword}>Submit</ButtonUI>
          </>
        )}
      </div>
    </ReactModal>
  );
};

export default memo(ResetPassword);
