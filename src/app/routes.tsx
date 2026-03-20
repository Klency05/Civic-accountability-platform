import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { HomeDashboard } from "./pages/HomeDashboard";
import { ReportIssue } from "./pages/ReportIssue";
import { AdminDashboard } from "./pages/AdminDashboard";
import { PublicTransparency } from "./pages/PublicTransparency";
import { DesignSystemPage } from "./pages/DesignSystemPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, path: "/", element: <HomeDashboard /> },
      { path: "report", element: <ReportIssue /> },
      { path: "admin", element: <AdminDashboard /> },
      { path: "transparency", element: <PublicTransparency /> },
      { path: "design-system", element: <DesignSystemPage /> },
    ],
  },
]);