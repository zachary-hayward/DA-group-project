import { createRoutesFromElements, Route } from 'react-router-dom'

import LandingPage from './components/LandingPage'
import App from './components/App'
import Home from './components/Home'

import AllGroups from './components/AllGroups'

import Register from './components/Register'
import UserProfilePage from './components/UserProfilePage'


export const routes = createRoutesFromElements(
  <>
    <Route path="/" element={<App />}>
      <Route index element={<Home />} />
      {/* Replace the element with your React Component */}
      <Route path="post">
        <Route index element={<div>AddPost</div>} />
        <Route path=":id" element={<div>Post</div>} />
      </Route>
      <Route path="/register" element={<Register />} />
      <Route path="profiles">
        <Route index element={<div>AllProfiles </div>} />
        <Route path=":username" element={<UserProfilePage />} />
      </Route>
      <Route path="groups">
        <Route index element={<AllGroups />} />
        <Route path="add" element={<div>GroupProfileForm</div>} />
        <Route path=":id" element={<div>Group</div>} />
      </Route>
    </Route>
    <Route path="/login" element={<LandingPage />} />
  </>,
)
