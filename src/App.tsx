import React, { Component } from 'react';
import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { debounce } from "debounce";

import { windowResize } from 'actions';
import * as pages from 'pages';
import 'antd/dist/antd.css';
import './article-item.css';
import './article.css';

interface Props {
  windowResize(): ReturnType<typeof windowResize>;
  token: string;
}

interface State {
  
}

class App extends Component<Props, State> {
  componentDidMount() {
    window.onresize = debounce(this.props.windowResize, 500);
  }
  
  render() {
    let inner = (this.props.token)
      ? (
        <Switch>
          <Route path="/login" render={ props => <Redirect to="/home" /> } />
          <Route path="/register" render={ props => <Redirect to="/home" /> } />
          <Route exact path="/" render={ props => <Redirect to="/home" /> } />
          <Route path="/home" component={pages.HomePage} />
          
          <Route path="/articles/videos/:articleId" component={pages.VideoArticleContent} />
          <Route path="/articles/videos" component={pages.VideoArticleList} />
          <Route path="/articles/musics" component={pages.MusicArticleList} />
          
          <Route path="/admin" component={pages.AdminPage} />
          
          <Route component={pages.NotFoundPage} />
        </Switch>
      ) : (
        <Switch>
          <Route path="/login" component={pages.LoginPage} />
          <Route path="/register" component={pages.RegisterPage} />
          <Route render={ props => <Redirect to="/login" /> } />
        </Switch>
      );
    
    return (
      <BrowserRouter>
        {inner}
      </BrowserRouter>
    )
  }
}

const mapDispatchToProps = {
  windowResize,
}

const mapStateToProps = (state) => {
  return {
    token: state.auth.token
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
