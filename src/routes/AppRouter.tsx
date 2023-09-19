import { Header } from '../pages/Header/Header'
import type React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Home } from '../pages/Home/Home'
import { Users } from '../pages/Users/Users'
import { Error404 } from '../pages/404/Error404'

const AppRouter: React.FC = () => {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route index element={<Home />} />
                <Route path="home" element={<Home />} />
                <Route path="users" element={<Users />} />

                <Route path="error404" element={<Error404 />} />
                <Route path="*" element={<Error404 />} />
                {/* with parameters */}
            </Routes>
        </BrowserRouter>
    )
}

export default AppRouter
