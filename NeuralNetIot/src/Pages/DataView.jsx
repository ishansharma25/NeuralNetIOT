import React from 'react';

function DataView() {
  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Streamlit Application</h1>
      </div>
      <div style={styles.iframeWrapper}>
        <iframe
          src="https://network-dashboard-project.streamlit.app/?embedded=true"
          title="Streamlit App"
          style={styles.iframe}
        />
      </div>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: "'Roboto', sans-serif",
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f9f9f9',
    minHeight: '100vh',
    margin: 0,
    padding: 0,
  },
  header: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  title: {
    color: '#2c3e50',
    fontSize: '2.5rem',
    fontWeight: 'bold',
  },
  iframeWrapper: {
    width: '100%',
    height: '100vh', // Make iframe cover full screen height
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    borderRadius: '0',
    overflow: 'hidden',
    backgroundColor: '#ffffff',
  },
  iframe: {
    border: 'none',
    width: '100%',
    height: '100%',
  },
};

export default DataView;
