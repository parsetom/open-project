import React from 'react';
import PropTypes from 'prop-types';
import TextInput from '../Common/TextInput';

const ProjectForm = ({ project, onChange, onSave, saving, errors = {} }) => {
  return (
    <form onSubmit={onSave}>
      <h3>{project.id ? 'Edit' : 'Add'} Project</h3>
      {errors.onSave && (
        <div className="alert alert-danger" role="alert">
          {errors.onSave}
        </div>
      )}
      <TextInput
        name="shortDesc"
        label="Title"
        value={project.shortDesc}
        onChange={onChange}
        error={errors.shortDesc}
        maxLength={50}
      ></TextInput>
      <TextInput
        name="longDesc"
        label="Description"
        value={project.longDesc}
        onChange={onChange}
        error={errors.longDesc}
        maxLength={255}
      ></TextInput>
      <br></br>
      <button type="submit" disabled={saving} className="btn btn-primary">
        {saving ? 'Saving...' : 'Save'}
      </button>
    </form>
  );
};

ProjectForm.propTypes = {
  project: PropTypes.object.isRequired,
  errors: PropTypes.object,
  onSave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  saving: PropTypes.bool.isRequired,
};

export default ProjectForm;
