// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import React from 'react';
import './App.css';
import * as microsoftTeams from '@microsoft/teams-js';
import { BrowserRouter as Router, Route, useLocation, useParams } from 'react-router-dom';

import Privacy from './about/Privacy';
import TermsOfUse from './about/TermsOfUse';
import Tab from './Tab';
import TabConfig from './TabConfig';
import { Camera } from './Camera';

/**
 * The main app which handles the initialization and routing
 * of the app.
 */
function App() {
  // Check for the Microsoft Teams SDK object.
  if (microsoftTeams) {
    return (
      <Router>
        <Parent />
        <Camera />
      </Router>
    );
  } else {
    return (
      <h3>Microsoft Teams SDK not found.</h3>
    );
  }
}

function Parent() {
  const query = new URLSearchParams(useLocation().search);
  console.log(query.toString());
  return <Child messageId={query.get("messageId")} userId={query.get("userId")} convId={query.get("convId")} />
}

function Child({messageId, userId, convId}) {
  return (
    <div>
        <h1>messageId: {messageId} </h1>
        <h1>userId: {userId} </h1>
        <h1>convId: {convId} </h1>       
    </div>
  )
}

export default App;
