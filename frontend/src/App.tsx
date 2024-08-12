import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import ErrorPage from "./pages/ErrorPage";
import Article from "./pages/Article";
import News from "./pages/News";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Cgu from "./pages/Cgu";
import LegalMentions from "./pages/LegalMentions";
import Calendar from "./pages/Calendar";
import Contact from "./pages/Contact";
import Dashboard from "./pages/Dashboard";
import Games from "./pages/Games";
import GameDetail from "./pages/GameDetail";
import Subscription from "./pages/Subscription";
import Tournaments from "./pages/Tournaments";
import TournamentDetail from "./pages/TournamentDetail";
import Documentation from "./pages/Documentation";
import RulesFormat from "./pages/RulesFormat";

function App() {
  return (
    <Routes>
      <Route>
        <Route path="/">
          {/*Access: always*/}
          <Route path="" element={<Home />} />
          <Route path="rules-formats" element={<RulesFormat />} />
          <Route path="documentation" element={<Documentation />} />
          <Route path="news" element={<News />} />
          <Route path="articles" element={<Navigate to="../news" replace />} />
          <Route path="articles/:id" element={<Article />} />
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
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />

          {/*Access: logged*/}
          <Route path="dashboard" element={<Dashboard />} />
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Route>
    </Routes>
  );
}

export default App;
