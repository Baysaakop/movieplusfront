import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './containers/Home/Home';
import Login from './account/Login';
import Signup from './account/Signup';
import Profile from './account/Profile';
import Logout from './account/Logout';
import PasswordReset from './account/PasswordReset';
import PasswordResetConfirm from './account/PasswordResetConfirm';
import FilmList from './containers/Film/FilmList';
import FilmDetail from './containers/Film/FilmDetail';
import ArtistList from './containers/Artist/ArtistList';

function BaseRouter () {
    return (
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/films" component={FilmList} />
            <Route exact path="/films/:id" component={FilmDetail} />            
            <Route exact path="/people" component={ArtistList} />
            {/* User urls */}
            <Route exact path="/login" component={Login} />
            <Route exact path="/logout" component={Logout} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/password/reset" component={PasswordReset} />         
            <Route exact path="/rest-auth/password/reset/confirm/:uid/:token" component={PasswordResetConfirm} />            
            <Route exact path="/profile" component={Profile} />                        
        </Switch>
    )    
}
export default BaseRouter;