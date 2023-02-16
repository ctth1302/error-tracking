import React, { useState } from 'react';
import * as Sentry from '@sentry/react';
import IssuesList from './issuesList';

function App() {
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Track the error using Sentry
    Sentry.captureException(new Error(errorMessage));

    // Reset the form
    setErrorMessage('');
  };

  return (
    <div className='container'>
      <h1 className='m-5'>Error Tracking App</h1>
      <form onSubmit={handleSubmit} className='m-5'>
        <div>
        <label className='form-label w-100'>
          Error message:
          <input type="text" className='form-control' value={errorMessage} onChange={(e) => setErrorMessage(e.target.value)} />
        </label>
        </div>
        <button type="submit" className='btn btn-primary'>Submit</button>
      </form>
      <section className='m-5'>
        <IssuesList />
      </section>
    </div>
  );
}

export default App;
