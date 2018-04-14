import React from 'react'
import ReactDOM from 'react-dom'

import 'font-awesome/css/font-awesome.min.css';
import './styles/style.scss'

const title = 'React Webpack Docker'

ReactDOM.render(
  <div>{title} <i className="fa fa-code"></i></div>,
  document.getElementById('root')
);

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  module.hot.accept()
}