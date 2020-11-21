import { Container } from "react-bootstrap";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { AuthProvider } from "../contexts/AuthContext";
import Dashboard from "./Dashboard";
import Login from "./Login";
import PrivateRoute from "./PrivateRoute";
import SignUp from "./SignUp";
import ForgotPassword from "./ForgotPassword"
import UpdateProfile from "./UpdateProfile";

function App() {
  return (
    <Container className="d-flex align-items-center justify-content-center" style={{minHeight: "100vh"}}>
        <div className="w-100" style={{maxWidth: "400px"}}>
            <BrowserRouter>
                <AuthProvider>
                    <Switch>
                        <PrivateRoute exact path="/" component={Dashboard} />
                        <Route path="/signup" component={SignUp} />
                        <Route path="/login" component={Login} />
                        <Route path="/forgot-password" component={ForgotPassword} />
                        <PrivateRoute path="/update-profile" component={UpdateProfile} />
                    </Switch>
                </AuthProvider>
            </BrowserRouter>
        </div>
    </Container>
  );
}

export default App;
