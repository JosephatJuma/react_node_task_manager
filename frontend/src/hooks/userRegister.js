import { useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { register } from "../state/reducers/registerSlice";
function useRegister() {
  const dispatch = useDispatch();

  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const registered = useSelector((state) => state.register.registered);

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
        dispatch(register(response.data.user));
        console.log(response.data.user);
      }
    } catch (error) {
      setMessage(error.message);
    }
    setIsSending(false);
  };

  return { message, isSending, registered, clearErr, submitData };
}

export default useRegister;
