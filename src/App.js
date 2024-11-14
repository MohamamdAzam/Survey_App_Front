import React, { useState } from 'react';
// import SurveyForm from './SurveyForm';
// import SurveyResult from './SurveyResult';
import './App.css';

// import React, { useState } from 'react';
// import './App.css';

function App() {
  const [userId, setUserId] = useState('');
  const [surveyResults, setSurveyResults] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const parsedSurveyResults = JSON.parse(surveyResults);

      const response = await fetch('https://survey-app-1-i37j.onrender.com/process-survey', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: userId,
          survey_results: parsedSurveyResults,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to process survey');
      }

      const responseData = await response.json();
      setResult(responseData);
      setError('');
    } catch (err) {
      setError(err.message);
      setResult(null);
    }
  };

  return (
    <div className="container">
      <h1>Survey Processor</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="userId">User ID:</label>
        <input
          type="text"
          id="userId"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          required
        />

        <label htmlFor="surveyResults">Survey Results (JSON format):</label>
        <textarea
          id="surveyResults"
          value={surveyResults}
          onChange={(e) => setSurveyResults(e.target.value)}
          required
        ></textarea>

        <button type="submit">Submit</button>
      </form>

      {result && (
        <div className="result">
          <h3>Processed Result:</h3>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}

      {error && <div className="error">{error}</div>}
    </div>
  );
}

export default App;