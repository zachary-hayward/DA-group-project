import { Routes, Route } from 'react-router-dom'

import LandingPage from './LandingPage'
import MainLayout from './MainLayout'

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/home" element={<MainLayout />}>
        {/* Replace the element with your React Component */}
        <Route index element={<div>Home</div>} />
        <Route path="register" element={<div>Register</div>} />
      </Route>
      <Route path="profiles" element={<MainLayout />}>
        <Route index element={<div>AllProfiles </div>} />
        <Route path=":username" element={<div>Profile</div>} />
      </Route>
      <Route path="post" element={<MainLayout />}>
        <Route index element={<div>AddPost</div>} />
        <Route path=":id" element={<div>Post</div>} />
      </Route>
      <Route path="groups" element={<MainLayout />}>
        <Route index element={<div>AllGroups</div>} />
        <Route path="add" element={<div>GroupProfileForm</div>} />
        <Route path=":id" element={<div>Group</div>} />
      </Route>
    </Routes>
  )
}

export default App
