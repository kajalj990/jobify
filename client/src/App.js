import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Register, Landing, Error, ProtectedRoute } from './pages'
import { SharedLayout, Profile, AllJobs, AddJobs, Stats } from './pages/dashboard';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <ProtectedRoute>
            <SharedLayout />
          </ProtectedRoute>
        }>
          <Route index element={<Stats />}></Route>
          <Route path='all-jobs' element={<AllJobs />}></Route>
          <Route path='profile' element={<Profile />}></Route>
          <Route path='add-jobs' element={<AddJobs />}></Route>

        </Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="*" element={<Error />}></Route>
        <Route path="/landing" element={<Landing />}></Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
