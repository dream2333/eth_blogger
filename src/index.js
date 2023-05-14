import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, Switch } from 'react-router-dom'
import Head from 'next/head'
import './index.css';
import { Affix, Layout } from 'antd'
import App from './App';
import Header from './components/Header'
import Home from "./components/Home"
import UpdateResult from "./components/state/UpdateResult"
import Detailed from './components/Detailed';
import Editor from "./components/Editor"
import reportWebVitals from './reportWebVitals';
import HTTP404 from './components/state/404';
import HTTP500 from './components/state/500';

const { Footer } = Layout;

ReactDOM.render(
  <React.StrictMode>
    <Head>
      <title>Index</title>
    </Head>
    <HashRouter>
      <Affix>
        <Header />
      </Affix>
      <Switch>
        <Route exact path="/" component={Home} ></Route>

        <Route path="/editor/:id" component={Editor}></Route>
        <Route path="/detailed/:id" component={Detailed}></Route>
        <Route path="/update" component={UpdateResult}></Route>
        <Route path="/ERROR500" component={HTTP500} />
        <Route path="*" component={HTTP404} />
      </Switch>
      <Footer style={{ textAlign: 'center' }}>
        <div>系统由 React+Flask+Ant Desgin+Ethereum+IPFS驱动 </div>
        <div>@Blogger</div>
      </Footer>
    </HashRouter>

  </React.StrictMode>,
  document.getElementById('root')
);


reportWebVitals();
