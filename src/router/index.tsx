import { Routes, Route } from "react-router-dom";
import AdminLayout from "@/components/layout/AdminLayout";
import Dashboard from "@/pages/DashboardPage";
import Products from "@/pages/ProductPage";
import Users from "@/pages/UsersPage";
import LoginPage from "@/pages/auth/LoginPage";
import SecondPasswordPage from "@/pages/auth/SecondPasswordPage";
import ErrorPage from "@/pages/ErrorPage";
import HomeLayout from "@/components/layout/HomeLayout";
import OrderPage from "@/pages/OrderPage";
export default function AppRoutes({
    isDark,
    toggleTheme,
}: {
    isDark: boolean;
    toggleTheme: () => void;
}) {
    return (
        <Routes>
            <Route path="*" element={<ErrorPage />} />
            <Route
                path="/"
                element={<AdminLayout isDark={isDark} toggleTheme={toggleTheme} children={undefined} />}
            >
                <Route index element={<Dashboard />} />
                <Route path="products" element={<Products />} />
                <Route path="users" element={<Users />} />
                <Route path="orders" element={<OrderPage />} />
            </Route>
            <Route element={<HomeLayout />}>
                <Route path="/auth/second-password" element={<SecondPasswordPage />} />
                <Route path="/auth/login" element={<LoginPage />} />
            </Route>
        </Routes>
    );
}
