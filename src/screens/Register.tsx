import { useNavigate } from "react-router-dom";
import { ButtonUI } from "../components/Button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [otpv, setOtpv] = useState<string>("");
  const [verifyEmail, setVerifyEmail] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleEmailVerification = async () => {
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

  const handleOTPVerification = async () => {
    try {
      if (email) {
        await axios.post(
          `${import.meta.env.VITE_API_ENDPOINT}/auth/verifyEmailOtp`,
          {
            otpv: otpv,
            email: email,
          }
        );
        setEmailVerified(true);
      }
    } catch (err) {
      console.log("Error login using email", err);
    }
  };

  const handleRegistration = async () => {
    try {
      if (email) {
        await axios.post(
          `${import.meta.env.VITE_API_ENDPOINT}/auth/registerUser`,
          {
            email: email,
            name: name,
            password: password,
          }
        );
        navigate("/login", { state: { email: email } });
      }
    } catch (err) {
      console.log("Error login using email", err);
    }
  };

  return (
    <div className="flex flex-grow items-center justify-center">
      <div className="p-5 grid grid-cols-1 rounded-xl z-10 bg-secondaryBackground justify-items-center">
        <img src="/logo.png" className="w-48 h-48" />
        {!emailVerified ? (
          <>
            <div className="mt-4 w-full">
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="text-defaultText placeholder-defaultText focus:placeholder-gray-500"
              />
            </div>
            <div className="mt-4 w-full">
              <Input
                type="otp"
                placeholder="Enter OTP"
                value={otpv.trim()}
                disabled={!verifyEmail}
                onChange={(e) => setOtpv(e.target.value)}
                className="text-defaultText placeholder-defaultText focus:placeholder-gray-500"
              />
            </div>
          </>
        ) : (
          <>
            <div className="mt-4 w-full">
              <Input
                type="email"
                disabled
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="text-defaultText placeholder-defaultText focus:placeholder-gray-500"
              />
            </div>
            <div className="mt-4 w-full">
              <Input
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="text-defaultText placeholder-defaultText focus:placeholder-gray-500"
              />
            </div>
            <div className="mt-4 w-full">
              <Input
                placeholder="Enter Password"
                value={password}
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                className="text-defaultText placeholder-defaultText focus:placeholder-gray-500"
              />
            </div>
            <div className="mt-4 w-full">
              <Input
                placeholder="Confirm Password"
                value={confirmPassword}
                type="password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="text-defaultText placeholder-defaultText focus:placeholder-gray-500"
              />
            </div>
          </>
        )}
        <div className="mt-4 w-full">
          {!verifyEmail && !emailVerified ? (
            <ButtonUI onClick={() => handleEmailVerification()}>
              Register
            </ButtonUI>
          ) : !emailVerified ? (
            <ButtonUI onClick={() => handleOTPVerification()}>
              Verify OTP
            </ButtonUI>
          ) : (
            <ButtonUI
              disabled={
                !name &&
                !password.length &&
                !confirmPassword.length &&
                password === confirmPassword
              }
              onClick={() => handleRegistration()}
            >
              Register
            </ButtonUI>
          )}
        </div>
      </div>
    </div>
  );
};

export default Register;
