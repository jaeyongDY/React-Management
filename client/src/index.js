import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
//import * as serviceWorker from './serviceWorker'; 아마도 옛날 버전의 서비스 실행 방식
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  typography:{
    fontFamily:'"Noto Sans KR",serif',
  }
})

ReactDOM.render(
  <React.StrictMode>
    <MuiThemeProvider theme={theme}><App/></MuiThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
//serviceWorker.unregister(); 아마도 옛날 버전의 서비스 실행 방식
