import { useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../state/reducers/loginSlice";
function useLogin() {
  const dispatch = useDispatch();

  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const loggedIn = useSelector((state) => state.login.loggedIn);

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
      setMessage(response.data.message);
      if (response.data.success === true) {
        dispatch(login(response.data.user));
      }
    } catch (error) {
      setMessage(error.message);
    }
    setIsSending(false);
  };

  return { message, isSending, loggedIn, clearErr, submitData };
}

export default useLogin;
