import { NavLink, Route, Routes } from 'react-router-dom';
import './App.css';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';
import Dashboard from './components/Dashboard';
import logo from './octofitapp-small.svg';

function App() {
  const baseApiUrl = process.env.REACT_APP_CODESPACE_NAME
    ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api`
    : 'http://localhost:8000/api';

  console.log('React app using API base URL:', baseApiUrl);

  return (
    <div className="App container py-4">
      <nav className="navbar navbar-expand-lg navbar-light bg-light rounded shadow-sm mb-4">
        <div className="container-fluid">
          <NavLink className="navbar-brand d-flex align-items-center text-dark fw-bold" to="/">
            <img src={logo} alt="OctoFit logo" className="me-2 app-navbar-logo" />
            OctoFit Tracker
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="#navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink className={({ isActive }) => isActive ? 'nav-link active text-dark' : 'nav-link text-dark'} to="/users">
                  Users
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className={({ isActive }) => isActive ? 'nav-link active text-dark' : 'nav-link text-dark'} to="/teams">
                  Teams
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className={({ isActive }) => isActive ? 'nav-link active text-dark' : 'nav-link text-dark'} to="/activities">
                  Activities
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className={({ isActive }) => isActive ? 'nav-link active text-dark' : 'nav-link text-dark'} to="/workouts">
                  Workouts
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className={({ isActive }) => isActive ? 'nav-link active text-dark' : 'nav-link text-dark'} to="/leaderboard">
                  Leaderboard
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <h1 className="card-title">OctoFit Tracker</h1>
          <p className="card-text lead">
            Browse backend data using the navigation menu. Each page uses the configured REST API endpoint.
          </p>
          <p className="mb-0">
            API base: <a href={baseApiUrl} target="_blank" rel="noreferrer">{baseApiUrl}</a>
          </p>
        </div>
      </div>

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/users" element={<Users />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/workouts" element={<Workouts />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
      </Routes>
    </div>
  );
}

export default App;
