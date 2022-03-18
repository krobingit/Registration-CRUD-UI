import "./App.css";
import { ReactQueryDevtools } from "react-query/devtools";
import { QueryClient, QueryClientProvider } from "react-query";
import { useState } from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Register from "./Pages/Register";
import UpdateUser from "./Pages/EditUser";

function App() {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
          },
        },
      })
  );
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <div className="App">
        <Switch>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/update/:id">
            <UpdateUser />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </QueryClientProvider>
  );
}

export default App;
