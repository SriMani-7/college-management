import {
  Outlet,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import "./App.css";
import "./globals.css";
import HomePage from "./features/home/home";
import DashboardHeader from "./components/DashboardHeader";
import ApplicationFormPage from "./features/admissions/applicationForm";
import { DepartmentOverview, DepartmentsPage } from "./features/departments";
import AcadamicsCoursesPage from "./features/courses";
import { ForgetPasswordPage, LoginPage } from "./features/authentication";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<HomePage />} />
      <Route path="login" element={<LoginPage />} />
      <Route path="forgetpassowrd" element={<ForgetPasswordPage />} />
      <Route path="admission-form" element={<ApplicationFormPage />} />
      {/** protected student navigation routes */}
      <Route element={<ProtectedRoute role="STUDENT" />}>
        <Route path="student">
          <Route
            index
            element={<DashboardHeader title="Student dashboard" />}
          />
        </Route>
      </Route>

      {/** protected faculty navigation routes */}
      <Route element={<ProtectedRoute role="FACULTY" />}>
        <Route path="faculty">
          <Route
            index
            element={<DashboardHeader title="Faculty dashboard" />}
          />
        </Route>
      </Route>

      {/** protected admin navigation routes */}
      <Route element={<ProtectedRoute role="ADMIN" />}>
        <Route
          path="admin"
          element={
            <DashboardHeader
              title="Admin dashboard"
              navigationItems={[
                { name: "Departments", href: "departments" },
                { name: "Courses", href: "courses" },
                { name: "Admissions", href: "admissions" },
                { name: "Student fees", href: "fees" },
                { name: "Salaries", href: "salaries" },
                { name: "Alumini", href: "alumini" },
                { name: "Feedbacks", href: "feedbacks" },
              ]}
            />
          }
        >
          <Route index element={<>Admin dashboard</>} />
          <Route path="departments">
            <Route index element={<DepartmentsPage />}/>
            <Route path=":did" element={<DepartmentOverview/>}/>
          </Route>
          <Route path="courses" element={<AcadamicsCoursesPage />} />
          <Route path="admissions" element={<>Admissions</>} />
          <Route path="fees" element={<>Student college fees</>} />
          <Route path="salaries" element={<>Staff salaries</>} />
          <Route path="alumini" element={<>alumini</>} />
          <Route path="feedbacks" element={<>Recieved Feedbacks</>} />
        </Route>
      </Route>

    </Route>
  )
);

function ProtectedRoute({ role }) {
  const ut = localStorage.getItem("userType");
  return ut === role ? (
    <Outlet />
  ) : (
    <>You are not authorized to access this page</>
  );
}

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
