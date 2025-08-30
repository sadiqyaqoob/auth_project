import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";

const InputField = ({ icon, type, placeholder, autoFocus, value, onChange }) => (
  <div className="flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C] focus-within:ring-2 focus-within:ring-blue-400">
    <img src={icon} alt="" className="w-5 h-5" />
    <input
      className="bg-transparent outline-none w-full text-sm"
      type={type}
      placeholder={placeholder}
      autoFocus={autoFocus}
      value={value}
      onChange={onChange}
      required
    />
  </div>
);

function Login() {
  const navigate = useNavigate();
  const { backendUrl, setisLoggedin, getUserData } = useContext(AppContext);

  const [isSignup, setIsSignup] = useState(true);
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    axios.defaults.withCredentials = true;

    try {
      setLoading(true);

      if (isSignup) {
        const { data } = await axios.post(`${backendUrl}/api/auth/register`, { name, email, password });

        if (data.success) {
          toast.success("Account created successfully!");
          setIsSignup(false);
        } else toast.error(data.message || "Signup failed");
      } else {
        const { data } = await axios.post(`${backendUrl}/api/auth/login`, { email, password });

        if (data.success) {
          toast.success("Login successful!");
          setisLoggedin(true);
          await getUserData(); // ✅ login ke baad user data fetch karo
          navigate("/");
        } else toast.error(data.message || "Login failed");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-blue-200 to-purple-400">
      <img onClick={() => navigate("/")} src={assets.logo} alt="logo" className="absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer" />

      <div className="bg-slate-900 text-center text-white p-10 rounded-lg shadow-lg w-full sm:w-[400px]">
        <h2 className="text-2xl font-bold mb-2">{isSignup ? "Create Account" : "Login"}</h2>
        <p className="text-gray-400 mb-6">{isSignup ? "Create your account" : "Login to your account"}</p>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {isSignup && <InputField value={name} onChange={(e) => setname(e.target.value)} icon={assets.person_icon} type="text" placeholder="Full Name" autoFocus={true} />}
          <InputField value={email} onChange={(e) => setemail(e.target.value)} icon={assets.mail_icon} type="email" placeholder="Email" autoFocus={!isSignup} />
          <InputField value={password} onChange={(e) => setpassword(e.target.value)} icon={assets.lock_icon} type="password" placeholder="Password" />

          {!isSignup && <p className="text-left mb-2 text-indigo-400 cursor-pointer hover:underline text-sm" onClick={() => navigate("/resetPassword")}>Forgot password?</p>}

          <button type="submit" disabled={loading} className={`w-full ${loading ? "bg-gray-500" : "bg-blue-500 hover:bg-blue-600"} transition text-white py-2.5 rounded-full font-semibold`}>
            {loading ? "Loading..." : isSignup ? "Sign Up" : "Login"}
          </button>
        </form>

        <p className="text-center text-sm mt-4">
          {isSignup ? "Already have an account?" : "Don’t have an account?"}{" "}
          <span className="text-blue-400 font-semibold cursor-pointer hover:underline" onClick={() => setIsSignup(!isSignup)}>
            {isSignup ? "Login" : "Sign Up"}
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;
