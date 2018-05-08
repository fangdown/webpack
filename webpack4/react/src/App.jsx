import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect,
} from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import Main from '@main/Main.jsx';

const history = createBrowserHistory();
class App extends React.Component {
    render() {
        return (
            <Router history={history}>
                <Switch>
                    <Route path="/" component={Main} />
                    <Redirect to="/" />
                </Switch>
            </Router>
        );
    }
}
export default App;

