import { Routes, Route } from "react-router-dom";
import AdminLayout from "@/components/layout/AdminLayout";
import Dashboard from "@/pages/DashboardPage";
import Products from "@/pages/ProductPage";
import Users from "@/pages/UsersPage";
import LoginPage from "@/pages/auth/LoginPage";

export default function AppRoutes({
    isDark,
    toggleTheme,
}: {
    isDark: boolean;
    toggleTheme: () => void;
}) {
    return (
        <Routes>
            {/* ✅ Route dùng layout admin */}
            <Route
                path="/"
                element={
                    <AdminLayout isDark={isDark} toggleTheme={toggleTheme} >
                        <Routes>
                            <Route index element={<Dashboard />} />
                            <Route path="products" element={<Products />} />
                            <Route path="users" element={<Users />} />
                        </Routes>
                    </AdminLayout>
                }
            />
            <Route path="/auth/login" element={<LoginPage />} />
        </Routes>
    );
}
