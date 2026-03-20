import React from 'react';

const HomePage: React.FC = () => {
  return (
    <div>
      <h2>Welcome to Simple Project Manager!</h2>
      <p>This is the home page. You'll see a list of projects here.</p>
      <p>Navigate to <code>/projects/:id</code> to see project details.</p>
      <p>
        (Note: Project and Task data access functions are available in <code>src/data/projects.ts</code> and <code>src/data/tasks.ts</code>.
        You can use them in your components to build the UI.)
      </p>
    </div>
  );
};

export default HomePage;