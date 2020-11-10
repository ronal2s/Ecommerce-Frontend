import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { GlobalContext, IGlobalContext } from "./contexts/global";
//Containers
import Container from "./routes/container";
import { Keys } from "./utils/enums";
import { GetStorage } from "./utils/functions";


function App() {
  const auxSetContext = (object: any) => {
    setContext({ ...context, ...object });
  }
  const [context, setContext] = useState<IGlobalContext>({
    user: { logged: false, email: "" },
    setContext: auxSetContext
  })

  useEffect(() => {
    const email = GetStorage(Keys.email);
    if (email) setContext({ ...context, user: {...context.user, logged: true} })
  }, [])

  return (
    <GlobalContext.Provider value={{ ...context, setContext: auxSetContext }} >
      <Container />
      <ToastContainer />
    </GlobalContext.Provider>
  )
}

export default App;