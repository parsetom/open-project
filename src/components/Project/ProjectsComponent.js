import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { loadProjects, saveProject } from '../../actions/projectActions';
import { push as pushToHistory } from 'connected-react-router';
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
    if (date) {
      let currentErrors = { ...errors };
      currentErrors.startDate = null;
      setErrors(currentErrors);
    }
    setProject((prevProject) => ({
      ...prevProject,
      startDate: date,
    }));
  }

  function handleEndDateChange(date) {
    if (date) {
      let currentErrors = { ...errors };
      currentErrors.endDate = null;
      setErrors(currentErrors);
    }
    setProject((prevProject) => ({
      ...prevProject,
      endDate: date,
    }));
  }

  function handleAddExposure(event) {
    if (event.charCode == 13 && event.key == 'Enter') {
      let existingExposure = project.exposures.find((exp) => {
        return exp.toLowerCase() == exposure.toLowerCase();
      });

      if (!existingExposure) {
        project.exposures.push(exposure);
      }
      setExposure('');
      event.preventDefault();
    }
  }

  function handleRemoveExposure(event) {
    let { name } = event.target;
    let filteredExposures = project.exposures.filter((exposure) => {
      return exposure != name;
    });
    setProject((prevProject) => ({
      ...prevProject,
      exposures: filteredExposures,
    }));
    event.preventDefault();
  }

  function handleChange(event) {
    const { name } = event.target;

    if (name == 'isCurrent') {
      const { checked } = event.target;
      setIsCurrent(checked);

      if (checked) {
        // We don't need errors for end date if project is current.
        let currentErrors = { ...errors };
        currentErrors.endDate = null;
        setErrors(currentErrors);
      }
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
    const { shortDesc, longDesc, startDate, endDate } = project;
    const errors = {};

    if (!shortDesc) errors.shortDesc = 'Project name is required.';
    if (!longDesc) errors.longDesc = 'Project description is required.';

    if (!startDate) {
      errors.startDate = 'Start date is required.';
    }

    if (!isCurrent && !endDate) {
      errors.endDate = 'End date is required if not current.';
    }

    if (project.exposures.length == 0) {
      errors.exposures = 'Add atleast 1 exposure.';
    }

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
        props.pushToHistory('/background/' + project.id);
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
      onAddExposure={handleAddExposure}
      onRemoveExposure={handleRemoveExposure}
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
  pushToHistory: PropTypes.func.isRequired,
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
  pushToHistory,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageProjectComponent);
