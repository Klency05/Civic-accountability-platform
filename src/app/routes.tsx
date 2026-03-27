import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { HomeDashboard } from "./pages/HomeDashboard";
import { ReportIssue } from "./pages/ReportIssue";
import { AdminDashboard } from "./pages/AdminDashboard";
import { PublicTransparency } from "./pages/PublicTransparency";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";

export const router = createBrowserRouter([
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, path: "/", element: <HomeDashboard /> },
      { path: "report", element: <ReportIssue /> },
      { path: "admin", element: <AdminDashboard /> },
      { path: "transparency", element: <PublicTransparency /> },
    ],
  },
]);