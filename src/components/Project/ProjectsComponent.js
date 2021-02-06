import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { loadProjects, saveProject } from '../../actions/projectActions';
import PropTypes from 'prop-types';
import ProjectForm from './ProjectForm';
import { newProject } from '../../../tools/mockData';
import { getSlug } from '../../utils/stringUtil';

function ManageProjectComponent({
  loadProjects,
  saveProject,
  data,
  ...props // rest operator. this allows you to import all props that hasn't been referenced yet.
}) {
  const [project, setProject] = useState({ ...props.project }); // This syntax creates a reference on props object and the setter method
  const [errors, setErrors] = useState({}); // Defaulting the errors to an empty object
  const [saving, setSaving] = useState(false);
  const [isCurrent, setIsCurrent] = useState(false);
  const [exposure, setExposure] = useState('');

  useEffect(() => {
    let { projectsData } = data;
    if (!projectsData.hasLoaded) {
      loadProjects();
    } else {
      setProject({ ...props.project });
    }
  }, [props.project]); // This array parameters are a set of dependencies that upon change useEffect callback triggers

  function handleStartDateChange(date) {
    setProject((prevProject) => ({
      ...prevProject,
      startDate: date,
    }));
  }

  function handleEndDateChange(date) {
    setProject((prevProject) => ({
      ...prevProject,
      endDate: date,
    }));
  }

  function handleChange(event) {
    const { name } = event.target;

    if (name == 'isCurrent') {
      const { checked } = event.target;
      setIsCurrent(checked);
    } else if (name == 'exposure') {
      const { value } = event.target;
      setExposure(value);
    } else {
      const { value } = event.target;
      setProject((prevProject) => ({
        ...prevProject,
        [name]: value, // Let's assign the new value to the property.
      }));
      // The [name] syntax allows you to reference a property as a variable.
    }
  }

  function formIsValid() {
    const { shortDesc, longDesc } = project;
    const errors = {};

    if (!shortDesc) errors.shortDesc = 'Project name is required.';
    if (!longDesc) errors.longDesc = 'Project description is required.';

    setErrors(errors);
    return Object.keys(errors).length === 0;
  }

  function handleSave(event) {
    event.preventDefault();
    if (!formIsValid()) {
      return;
    }

    setSaving(true);
    saveProject(project)
      .then(() => {
        setSaving(false);
      })
      .catch((error) => {
        setSaving(false);
        setErrors({ onSave: error.message });
      });
  }

  return (
    <ProjectForm
      project={project}
      errors={errors}
      onChange={handleChange}
      onStartDateChange={handleStartDateChange}
      onEndDateChange={handleEndDateChange}
      onSave={handleSave}
      exposure={exposure}
      saving={saving}
      isCurrent={isCurrent}
    />
  );
}

ManageProjectComponent.propTypes = {
  data: PropTypes.object.isRequired,
  projects: PropTypes.array.isRequired,
  project: PropTypes.object.isRequired,
  loadProjects: PropTypes.func.isRequired,
  saveProject: PropTypes.func.isRequired,
};

function getProjectById(projects, id) {
  return projects.find((p) => p.id == id) || null;
}

function mapStateToProps(state) {
  const path = state.router.location.pathname;
  let id = getSlug(path);

  if (isNaN(id)) {
    // If slug is non numeric we would rather send a new project
    id = null;
  }
  const project =
    id && state.projects.length > 0
      ? getProjectById(state.projects, id)
      : { ...newProject };

  return {
    data: state.data,
    project,
    projects: state.projects,
  };
}

const mapDispatchToProps = {
  loadProjects,
  saveProject,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageProjectComponent);
