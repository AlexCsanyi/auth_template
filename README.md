# A starter template bootstrapped with [Create React App](https://github.com/facebook/create-react-app) and [Firebase](https://firebase.google.com/).

This template comes with authentication implemented using Firebase.
There are different simple form templates you can pick and extend.
The core template implements the authentication using the email and password method.

## Get Started

1. ### Visit your Firebase console and create a new project
Get the keys and ids provdided by Firebase and in the top level folder create a new `.env.local` file.
In React the environment variables have to start witth REACT_APP and then just add the keys from Firebase.
example: 

* REACT_APP_FIREBASE_API_KEY="ThisIsYourApiKey"
* REACT_APP_FIREBASE_AUTH_DOMAIN="ThisIsYourAuthDomain"
* REACT_APP_FIREBASE_DATABASE_URL="ThisIsYourDatabaseUrl"
* etc...

This is a very important step as the `src/firebase.js` file is implemented based on this info.
**For security do NOT commit the `.env.local` file.**

*Don't forget to enable the email-password method in your Firebase console.*

2. ### Available Scripts
In the project directory, you can run: `npm start`.
Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

3. ### `src/designs`
In this folder there are different design implementations of the forms that you can use out of the box.
All you have to do is copy the files from your favourite design and paste them in the `src/components` folder (replace the other files with the same names).
Finally make sure to update the internal import statements at the top of the files you just copied.
example: 
```JS
import {useAuth} from '../../contexts/AuthContext';
```
This should be updated to:
```JS
import { useAuth } from '../contexts/AuthContext';
```

There is no need to make any changes in the App.js component - the different designs named the same way.
However a note to make is that at the top level the forms are contained within a [Bootstrap](https://react-bootstrap.netlify.app/) `Container fluid` and the padding is set to 0 using the Bootstrap class `p-0`;

You can use `<Container/>` if you do not wish to have 100% width across all viewport and device sizes.

#### Design V3
This particular design is different as it implements the login / signup in one template.

It has the auth with Google implemented - if you decide to use this method don't forget to enable it in your Firebase console.

4. ### Routes
In App.js you can see the way routes and private routes are implemented using `react-router-dom`. Any pages you do not wish to make publicly available just need to be wrapped in a PrivateRoute component which is already implemented for your convenience (these routes will redirect your website visitors to the login page).

```JS
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
    <Container fluid className="p-0">
            <BrowserRouter>
                <AuthProvider>
                    <Switch>
                        <PrivateRoute exact path="/" component={Dashboard} /> {/* Private route - redirects unauthenticated visitors to the login page */}
                        <Route path="/signup" component={SignUp} />
                        <Route path="/login" component={Login} />
                        <Route path="/forgot-password" component={ForgotPassword} />
                        <PrivateRoute path="/update-profile" component={UpdateProfile} />
                    </Switch>
                </AuthProvider>
            </BrowserRouter>
    </Container>
  );
}

export default App;
```
5. ### Packages
Some of the other packages to mention:
The core template uses basic [Bootstrap](https://getbootstrap.com/) classes and [React-Bootstrap](https://react-bootstrap.netlify.app/) components for styling.

Other designs make use of [Styled-Components](https://styled-components.com/) and [React-Icons](https://react-icons.github.io/react-icons/) therefore if you choose to create your own designs these are available for you to use.
Don't like these? just run `npm uninstall <package-name>`

[webfontloader](https://www.npmjs.com/package/webfontloader) allows you to choose any Google, Typekit, Fontdeck font easily in your project. (It is used and implemented in the V3 design.) 

6. ### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

7. ### Authentication
The main method is email-password; however 3 other options have been implementd in case you want to use any of those.
Go to the `AuthContext.js` file and the `loginWithProvider` function allows you to authenticate your website visitors with Facebook, Twitter or Google.

The Google auth method is implemented in the design V3

```JS
<SocialIcon onClick={handleLoginWithProvider} data-provider="google" href="/">
    <FaGoogle></FaGoogle>
</SocialIcon>
```

If you want to use Facebook as an example just copy the above and change the `data-provider` value to `facebook` and update the Icon.

example:
```JS
<SocialIcon onClick={handleLoginWithProvider} data-provider="facebook" href="/">
    <FaFacebook></FaFacebook>
</SocialIcon>
```
