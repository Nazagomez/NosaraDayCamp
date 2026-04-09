import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import SiteLayout from './layouts/site-layout'
import HomePage from './pages/home-page'

export default function App(): React.JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<SiteLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
