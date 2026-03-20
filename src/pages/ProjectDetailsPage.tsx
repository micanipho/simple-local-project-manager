import React from 'react';
import { useParams } from 'react-router-dom';

const ProjectDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div>
      <h2>Project Details for Project ID: {id}</h2>
      <p>This page will display the details of a specific project and its tasks.</p>
      <p>
        (Note: You can use <code>getProject('{id}')</code> and <code>getTasks('{id}')</code> from
        the data access layer to fetch and display data here.)
      </p>
    </div>
  );
};

export default ProjectDetailsPage;