import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import { GlobalContext, IGlobalContext } from "./contexts/global";
//Containers
import Container from "./routes/container";
import Login from "./routes/login";


function App() {
  const auxSetContext = (object: any) => {
    setContext({ ...context, ...object });
  }
  const [context, setContext] = useState<IGlobalContext>({
    user: { logged: true, fullname: "", rol: "" },
    setContext: auxSetContext
  })
console.log(context.user)
  return (
    <GlobalContext.Provider value={{ ...context, setContext: auxSetContext }} >
      <Container />
      <ToastContainer />
    </GlobalContext.Provider>
  )
}

export default App;