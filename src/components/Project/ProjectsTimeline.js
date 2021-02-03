import React from 'react';
import PropTypes from 'prop-types';

const ProjectsTimeline = ({ projects }) => {
  return (
    <div>
      {projects &&
        projects.forEach((project) => {
          return (
            <div>
              Project Title {project.shortDesc}
              <br />
              Description {project.longDesc}
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
