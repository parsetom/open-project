import React from 'react';
import PropTypes from 'prop-types';
import TextInput from '../Common/TextInput';
import DatePicker from 'react-date-picker';

const ProjectForm = ({
  project,
  onChange,
  onStartDateChange,
  onEndDateChange,
  onSave,
  saving,
  isCurrent,
  errors = {},
}) => {
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
      <div className="row">
        <div className="col-md-6">
          From
          <br />
          <DatePicker
            name="startDate"
            onChange={onStartDateChange}
            value={project.startDate}
          />
        </div>
        <div className="col-md-6">
          Until or Current?{' '}
          <input
            type="checkbox"
            name="isCurrent"
            onChange={onChange}
            checked={isCurrent}
          />
          <br />
          <DatePicker
            name="endDate"
            minDate={project.startDate}
            disabled={project.startDate == null || isCurrent}
            onChange={onEndDateChange}
            value={project.endDate}
          />
        </div>
      </div>
      <br />
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
  onStartDateChange: PropTypes.func.isRequired,
  onEndDateChange: PropTypes.func.isRequired,
  saving: PropTypes.bool.isRequired,
  isCurrent: PropTypes.bool.isRequired,
};

export default ProjectForm;
