import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { loadProjects, saveProject } from '../../actions/projectActions';
import PropTypes from 'prop-types';
import ProjectForm from './ProjectForm';
import { newProject } from '../../../tools/mockData';

function ManageProjectComponent({
  loadProjects,
  saveProject,
  data,
  ...props // rest operator. this allows you to import all props that hasn't been referenced yet.
}) {
  const [project, setProject] = useState({ ...props.project }); // This syntax creates a reference on object and the setter method
  const [errors, setErrors] = useState({}); // Defaulting the errors to an empty array
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    var { projectsData } = data;
    if (!projectsData.hasLoaded) {
      loadProjects();
    } else {
      setProject({ ...props.project });
    }
  }, [props.project]); // This array parameters are a set of dependencies that
  // upon change useEffect callback triggers

  function handleChange(event) {
    const { name, value } = event.target;

    setProject((prevProject) => ({
      ...prevProject,
      [name]: value, // Let's assign the new value to the property.
    }));
    // The [name] syntax allows you to reference a property as a variable.
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
        // history.push('/projects');
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
      onSave={handleSave}
      saving={saving}
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

export function getProjectBySlug(projects, slug) {
  return projects.find((project) => project.slug === slug) || null;
}

function mapStateToProps(state) {
  const slug = null;
  const project =
    slug && state.projects.length > 0
      ? getProjectBySlug(state.projects, slug)
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
