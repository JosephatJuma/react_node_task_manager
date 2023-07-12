import { useState } from "react";
import axios from "axios";

function useLogin() {
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  const clearErr = () => {
    setMessage("");
  };
  const submitData = async (url, formData) => {
    clearErr();
    if (!formData.email) {
      setMessage("Email is required");
      return;
    }
    if (!formData.password) {
      setMessage("Password is required");
      return;
    }
    try {
      setIsSending(true);
      const response = await axios.post(url, formData);
      setMessage(response.data);
      setLoggedIn(true);
    } catch (error) {
      setMessage(error.message);
    }
    setIsSending(false);
  };

  return { message, isSending, loggedIn, clearErr, submitData };
}

export default useLogin;
