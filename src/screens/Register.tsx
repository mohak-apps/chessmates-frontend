import { useNavigate } from "react-router-dom";
import { ButtonUI } from "../components/Button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [image, setImage] = useState<string>("");

  const handleUserRegistration = async () => {
    try {
      if (name && email && password) {
        console.log("email : loal");
        console.log(email);
        await axios.post(`${import.meta.env.VITE_API_ENDPOINT}/auth/register`, {
          name: name,
          email: email,
          password: password,
        });
        navigate("./login");
      }
    } catch (err) {
      console.log("Error login using email", err);
    }
  };

  return (
    <div className="flex flex-grow items-center justify-center">
      <div className="p-5 grid grid-cols-1 rounded-xl z-10 bg-secondaryBackground justify-items-center">
        <img src="/logo.png" className="w-48 h-48" />
        <div className="mt-4 w-full">
          <Input
            type="name"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="text-defaultText placeholder-defaultText focus:placeholder-gray-500"
          />
        </div>
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
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="text-defaultText placeholder-defaultText focus:placeholder-gray-500"
          />
        </div>
        <div className="mt-4 w-full">
          <ButtonUI onClick={() => handleUserRegistration()}>Register</ButtonUI>
        </div>
      </div>
    </div>
  );
};

export default Register;
