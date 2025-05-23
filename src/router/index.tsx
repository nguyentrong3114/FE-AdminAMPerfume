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
import CategoryPage from "@/pages/CategoriesPage"
import TeamsPage from "@/pages/TeamsPage";
import MessagesPage from "@/pages/MessagesPage";
import PromotionsPage from "@/pages/PromotionsPage";
import CalendarPage from "@/pages/CalendarPage";
import AnalyticsPage from "@/pages/AnalyticsPage";
import ReportsPage from "@/pages/ReportsPage";
import NotificationPage from "@/pages/NotificationPage";
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
                <Route path="categories" element={<CategoryPage />} />
                <Route path="teams" element={<TeamsPage />} />
                <Route path="messages" element={<MessagesPage />} />
                <Route path="promotions" element={<PromotionsPage />} />
                <Route path="calendar" element={<CalendarPage />} />
                <Route path="reports" element={<ReportsPage />} />
                <Route path="analytics" element={<AnalyticsPage />} />
                <Route path="notifications" element={<NotificationPage />} />
            </Route>
            <Route element={<HomeLayout />}>
                <Route path="/auth/second-password" element={<SecondPasswordPage />} />
                <Route path="/auth/login" element={<LoginPage />} />
            </Route>
        </Routes>
    );
}
