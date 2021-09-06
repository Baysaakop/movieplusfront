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
import ArtistDetail from './containers/Artist/ArtistDetail';
import ArticleList from './containers/Article/ArticleList';
import ArticleDetail from './containers/Article/ArticleDetail';
import PageNotFound from './components/PageNotFound';
import Moderator from './containers/Moderator/Moderator';

function BaseRouter () {
    return (
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/films" component={FilmList} />
            <Route exact path="/films/:id" component={FilmDetail} />            
            <Route exact path="/artists" component={ArtistList} />
            <Route exact path="/artists/:id" component={ArtistDetail} />
            <Route exact path="/articles" component={ArticleList} />
            <Route exact path="/articles/:id" component={ArticleDetail} />
            {/* <Route exact path="/writereview/" component={ArticleDetail} /> */}
            {/* User urls */}
            <Route exact path="/login" component={Login} />
            <Route exact path="/logout" component={Logout} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/password/reset" component={PasswordReset} />         
            <Route exact path="/rest-auth/password/reset/confirm/:uid/:token" component={PasswordResetConfirm} />            
            <Route exact path="/profile" component={Profile} />                
            <Route exact path="/moderator" component={Moderator} />                
            <Route exact path='*' component={PageNotFound} />        
        </Switch>
    )    
}
export default BaseRouter;