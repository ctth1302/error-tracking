import React, { useState, useEffect } from 'react';
import * as Sentry from '@sentry/react';
import axios from 'axios';

interface Issue {
  id: string;
  title: string;
  culprit: string;
  firstSeen: string;
  lastSeen: string;
}

const IssuesList: React.FC = () => {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const getSentryIssues = async () => {
      try {
        const hub = Sentry.getCurrentHub();
        const client = hub.getClient();
        

        const response = await axios.get('/issues/', {
            headers: {
              Authorization: `Bearer ${client?.getOptions()?.dsn}`
            }
          });
          
        console.log('response:', response);
        setIssues(response.data);
      } catch (error) {
        console.error('Error getting issues:', error);
        setError('Error retrieving issues');
      }
    };

    getSentryIssues();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <table className='table mt-5'>
      <thead>
        <tr>
          <th scope='col'>ID</th>
          <th scope='col'>Title</th>
          <th scope='col'>Culprit</th>
          <th scope='col'>First Seen</th>
          <th scope='col'>Last Seen</th>
        </tr>
      </thead>
      <tbody>
        {issues.map((issue) => (
          <tr key={issue.id}>
            <td>{issue.id}</td>
            <td>{issue.title}</td>
            <td>{issue.culprit}</td>
            <td>{issue.firstSeen}</td>
            <td>{issue.lastSeen}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default IssuesList;
