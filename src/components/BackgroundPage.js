import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ProjectsComponent from './Project/ProjectsComponent';
import ProjectsTimeline from './Project/ProjectsTimeline';
import { loadProjects } from '../actions/projectActions';

function BackgroundPage({ projects, data, ...props }) {
  useEffect(() => {
    var { projectsData } = data;
    if (!projectsData.hasLoaded) {
      loadProjects();
    }
  }, [props.projects]);
  return (
    <div className="maximize">
      <h1>Work Background</h1>
      <div className="row">
        <div className="col-md-3">
          <ProjectsComponent />
        </div>
        <div className="col-md-3">
          <ProjectsTimeline projects={projects} />
        </div>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    projects: state.projects,
    data: state.data,
  };
}

BackgroundPage.propTypes = {
  data: PropTypes.object.isRequired,
  projects: PropTypes.array.isRequired,
};

export default connect(mapStateToProps)(BackgroundPage);
