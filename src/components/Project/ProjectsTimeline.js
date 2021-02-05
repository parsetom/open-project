import React from 'react';
import PropTypes from 'prop-types';

const ProjectsTimeline = ({ projects }) => {
  return (
    <div>
      {projects.map((project) => {
        return (
          <div key={project.id}>
            <label>Project Title:</label> {project.shortDesc}
            <br />
            <label>Description:</label> {project.longDesc}
            <br />
            <label>Project Date:</label> {project.createdDate}
          </div>
        );
      })}
    </div>
  );
};

ProjectsTimeline.propTypes = {
  projects: PropTypes.array.isRequired,
};

export default ProjectsTimeline;
