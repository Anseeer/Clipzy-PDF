/* eslint-disable react-hooks/exhaustive-deps */
import AppRoutes from "./routes/AppRoutes"
import './App.css';
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getMe } from "./services/user.services";
import { logoutSuccess, setUser } from "./store/user.slice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const restoreUser = async () => {
      try {
        const res = await getMe();
        dispatch(setUser(res.data));
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err: unknown) {
        dispatch(logoutSuccess());
      }
    };

    restoreUser();
  }, []);
  return (
    <AppRoutes />
  )
}

export default App
