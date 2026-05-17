import React, { useEffect, useMemo, useState } from 'react';

const Activities = () => {
  const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/activities`;
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState('');
  const [rawData, setRawData] = useState(null);
  const [showRaw, setShowRaw] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchActivities = async () => {
      console.log('Activities endpoint:', endpoint);
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(endpoint);
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }
        const data = await response.json();
        console.log('Activities API response:', data);
        setRawData(data);

        const itemsArray = Array.isArray(data)
          ? data
          : Array.isArray(data.results)
          ? data.results
          : data.results || [];

        setItems(itemsArray);
      } catch (err) {
        console.error('Activities fetch error:', err);
        setError(err.message || 'Fetch error');
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, [endpoint]);

  const filteredItems = useMemo(() => {
    if (!search) return items;
    return items.filter((item) =>
      JSON.stringify(item).toLowerCase().includes(search.toLowerCase())
    );
  }, [items, search]);

  const headers = filteredItems.length ? Object.keys(filteredItems[0]).slice(0, 5) : [];

  const renderCell = (value) => {
    if (value === null || value === undefined) return '-';
    if (typeof value === 'object') return JSON.stringify(value);
    return String(value);
  };

  return (
    <div className="card mb-4 shadow-sm">
      <div className="card-header d-flex justify-content-between align-items-center">
        <h2 className="h4 mb-0">Activities</h2>
        <div>
          <button className="btn btn-primary btn-sm me-2" onClick={() => setSearch('')}>
            Reset filter
          </button>
          <button className="btn btn-outline-secondary btn-sm" onClick={() => setShowRaw(true)}>
            View raw
          </button>
        </div>
      </div>
      <div className="card-body">
        <p className="card-text">
          Loaded from <a href={endpoint} target="_blank" rel="noreferrer">{endpoint}</a>
        </p>
        <form className="row gy-2 gx-2 align-items-center mb-3" onSubmit={(e) => e.preventDefault()}>
          <div className="col-auto flex-fill">
            <input
              type="search"
              className="form-control"
              placeholder="Search activities"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>
          <div className="col-auto">
            <button type="button" className="btn btn-secondary">
              Filter
            </button>
          </div>
        </form>

        {error && <div className="alert alert-danger">{error}</div>}
        {loading && (
          <div className="d-flex align-items-center mb-3">
            <div className="spinner-border text-primary me-2" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <span>Loading activities...</span>
          </div>
        )}

        {!loading && filteredItems.length > 0 ? (
          <div className="table-responsive">
            <table className="table table-hover table-striped align-middle">
              <thead>
                <tr>
                  {headers.map((header) => (
                    <th key={header}>{header}</th>
                  ))}
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredItems.map((item, index) => (
                  <tr key={index}>
                    {headers.map((header) => (
                      <td key={header}>{renderCell(item[header])}</td>
                    ))}
                    <td>
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-primary"
                        onClick={() => setShowRaw(true)}
                      >
                        Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          !loading && <div className="alert alert-info">No activities found.</div>
        )}
      </div>

      {showRaw && (
        <>
          <div className="modal fade show d-block" tabIndex="-1" role="dialog">
            <div className="modal-dialog modal-xl modal-dialog-scrollable" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Activities Raw Data</h5>
                  <button type="button" className="btn-close" onClick={() => setShowRaw(false)} />
                </div>
                <div className="modal-body">
                  <pre>{JSON.stringify(rawData, null, 2)}</pre>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowRaw(false)}>
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show" />
        </>
      )}
    </div>
  );
};

export default Activities;
