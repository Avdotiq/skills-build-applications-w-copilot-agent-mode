import React, { useEffect, useState } from 'react';

const Dashboard = () => {
  const baseApiUrl = process.env.REACT_APP_CODESPACE_NAME
    ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api`
    : 'http://localhost:8000/api';
  
  const [stats, setStats] = useState({
    users: 0,
    teams: 0,
    activities: 0,
    leaderboard: 0,
    workouts: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllData = async () => {
      console.log('Dashboard: Fetching all API endpoints from', baseApiUrl);
      setLoading(true);
      setError(null);

      try {
        const endpoints = ['users', 'teams', 'activities', 'leaderboard', 'workouts'];
        const newStats = {};

        for (const endpoint of endpoints) {
          const url = `${baseApiUrl}/${endpoint}/`;
          console.log(`Dashboard: Fetching ${url}`);
          
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error(`Failed to fetch ${endpoint}: HTTP ${response.status}`);
          }
          
          const data = await response.json();
          console.log(`Dashboard: ${endpoint} response:`, data);
          
          const itemsArray = Array.isArray(data)
            ? data
            : Array.isArray(data.results)
            ? data.results
            : data.results || [];
          
          newStats[endpoint] = itemsArray.length;
        }

        setStats(newStats);
        console.log('Dashboard: All endpoints loaded successfully', newStats);
      } catch (err) {
        console.error('Dashboard fetch error:', err);
        setError(err.message || 'Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, [baseApiUrl]);

  return (
    <div className="row">
      <div className="col-md-12">
        <div className="card shadow-sm mb-4">
          <div className="card-header">
            <h2 className="h4 mb-0">Dashboard Overview</h2>
          </div>
          <div className="card-body">
            {error && (
              <div className="alert alert-danger" role="alert">
                <strong>Error:</strong> {error}
              </div>
            )}

            {loading ? (
              <div className="d-flex align-items-center">
                <div className="spinner-border text-primary me-2" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <span>Loading dashboard data...</span>
              </div>
            ) : (
              <div className="row">
                <div className="col-md-4 mb-3">
                  <div className="card bg-light">
                    <div className="card-body">
                      <h5 className="card-title">Users</h5>
                      <p className="card-text display-4">{stats.users}</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 mb-3">
                  <div className="card bg-light">
                    <div className="card-body">
                      <h5 className="card-title">Teams</h5>
                      <p className="card-text display-4">{stats.teams}</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 mb-3">
                  <div className="card bg-light">
                    <div className="card-body">
                      <h5 className="card-title">Activities</h5>
                      <p className="card-text display-4">{stats.activities}</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 mb-3">
                  <div className="card bg-light">
                    <div className="card-body">
                      <h5 className="card-title">Leaderboard</h5>
                      <p className="card-text display-4">{stats.leaderboard}</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 mb-3">
                  <div className="card bg-light">
                    <div className="card-body">
                      <h5 className="card-title">Workouts</h5>
                      <p className="card-text display-4">{stats.workouts}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
