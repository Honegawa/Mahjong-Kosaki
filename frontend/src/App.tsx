import { Navigate, Route, Routes } from "react-router-dom";
import "./styles/App.css";
import Home from "./pages/Home";
import ErrorPage from "./pages/ErrorPage";
import ArticleDetail from "./pages/ArticleDetail";
import News from "./pages/News";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Cgu from "./pages/Cgu";
import LegalMentions from "./pages/LegalMentions";
import Calendar from "./pages/Calendar";
import Contact from "./pages/ContactForm";
import Dashboard from "./pages/Dashboard";
import Games from "./pages/Games";
import GameDetail from "./pages/GameDetail";
import Subscription from "./pages/Subscription";
import Tournaments from "./pages/Tournaments";
import TournamentDetail from "./pages/TournamentDetail";
import Documentation from "./pages/Documentation";
import RulesFormat from "./pages/RulesFormat";
import BaseTemplate from "./templates/BaseTemplate";
import UnLoggedRoute from "./components/routes/UnLoggedRoute";
import PrivateRoute from "./components/routes/PrivateRoute";
import { USER_ROLE } from "./interfaces/user";
import { TABS } from "./utils/contants/dashboard";

function App() {
  return (
    <Routes>
      <Route>
        <Route path="/" element={<BaseTemplate />}>
          {/*Access: always*/}
          <Route path="" element={<Home />} />
          <Route path="rules-formats" element={<RulesFormat />} />
          <Route path="documentation" element={<Documentation />} />
          <Route path="news" element={<News />} />
          <Route path="articles" element={<Navigate to="../news" replace />} />
          <Route path="articles/:id" element={<ArticleDetail />} />
          <Route path="games" element={<Games />} />
          <Route path="games/:id" element={<GameDetail />} />
          <Route path="tournaments" element={<Tournaments />} />
          <Route path="tournaments/:id" element={<TournamentDetail />} />
          <Route path="calendar" element={<Calendar />} />
          <Route path="subscription" element={<Subscription />} />
          <Route path="contact" element={<Contact />} />
          <Route path="mentions-legales" element={<LegalMentions />} />
          <Route path="conditions-generales-utilisation" element={<Cgu />} />

          {/*Access: not logged*/}
          <Route element={<UnLoggedRoute />}>
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
          </Route>

          {/*Access: logged*/}
          <Route
            element={<PrivateRoute roles={[USER_ROLE.USER, USER_ROLE.ADMIN]} />}
          >
            <Route path="dashboard">
              <Route path="" element={<Navigate to="./account" replace />} />
              {Object.entries(TABS.user).map(([userTabKey, userTabValue]) => (
                <Route
                  path={userTabKey.toLowerCase()}
                  element={<Dashboard tabIndex={userTabValue.index} />}
                  key={`tab-${userTabKey}`}
                />
              ))}

              {/*Access dashboard admin tabs */}
              <Route element={<PrivateRoute roles={[USER_ROLE.ADMIN]} />}>
                {Object.entries(TABS.admin).map(
                  ([adminTabKey, adminTabValue]) => (
                    <Route
                      path={adminTabKey.toLowerCase()}
                      element={<Dashboard tabIndex={adminTabValue.index} />}
                      key={`tab-${adminTabKey}`}
                    />
                  )
                )}
              </Route>
              <Route path="*" element={<Navigate to="./account" replace />} />
            </Route>
          </Route>

          <Route path="forbidden" element={<div>a</div>} />
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
