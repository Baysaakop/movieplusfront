import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './containers/Home/Home';
import Login from './account/Login';
import Signup from './account/Signup';
import Profile from './account/Profile';
import Logout from './account/Logout';
import PasswordReset from './account/PasswordReset';
import PasswordResetConfirm from './account/PasswordResetConfirm';
import PostCreate from './posts/PostCreate';
import FilmList from './containers/Film/FilmList';
import FilmDetail from './containers/Film/FilmDetail';

function BaseRouter () {
    return (
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/films" component={FilmList} />
            <Route exact path="/films/:id" component={FilmDetail} />
            {/* Posts urls */}
            <Route exact path="/newpost" component={PostCreate} />
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