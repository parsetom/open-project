import React from 'react';
import PropTypes from 'prop-types';
import { toDateString } from '../../utils/dateUtil';
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
            <label>From:</label> {toDateString(project.startDate)} {' - '}
            <label>{project.endDate == null ? 'Present' : 'Until:'}</label>
            {project.endDate && ' ' + toDateString(project.endDate)}
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
