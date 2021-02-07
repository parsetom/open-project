import React from 'react';
import PropTypes from 'prop-types';
import TextInput from '../Common/TextInput';
import Badge from '../Common/Badge';
import DatePicker from 'react-date-picker';

const ProjectForm = ({
  project,
  onChange,
  onStartDateChange,
  onEndDateChange,
  onSave,
  onAddExposure,
  onRemoveExposure,
  exposure,
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
        disabled={saving}
      ></TextInput>
      <TextInput
        name="longDesc"
        label="Description"
        value={project.longDesc}
        onChange={onChange}
        error={errors.longDesc}
        maxLength={255}
        disabled={saving}
      ></TextInput>
      <div className="row form-group">
        <div className="col-md-6">
          From
          <br />
          <DatePicker
            name="startDate"
            onChange={onStartDateChange}
            value={project.startDate}
            disabled={saving}
          />
          {errors.startDate && (
            <div className="alert alert-danger">{errors.startDate}</div>
          )}
        </div>
        <div className="col-md-6">
          Until or Present?{' '}
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
            disabled={project.startDate == null || isCurrent || saving}
            onChange={onEndDateChange}
            value={project.endDate}
          />
          {errors.endDate && (
            <div className="alert alert-danger">{errors.endDate}</div>
          )}
        </div>
      </div>
      <TextInput
        name="exposure"
        label="Add Exposure"
        value={exposure}
        onChange={onChange}
        onKeyPress={onAddExposure}
        maxLength={50}
        error={errors.exposures}
        disabled={saving}
      ></TextInput>
      <div className="form-group">
        {project.exposures.length > 0 && 'Project Exposures: '}
        {project.exposures.length > 0 &&
          project.exposures.map((exposure) => {
            return (
              <Badge
                key={exposure}
                name={exposure}
                disabled={saving}
                onRemove={onRemoveExposure}
              />
            );
          })}
      </div>
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
  onAddExposure: PropTypes.func.isRequired,
  onRemoveExposure: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onStartDateChange: PropTypes.func.isRequired,
  onEndDateChange: PropTypes.func.isRequired,
  exposure: PropTypes.string.isRequired,
  saving: PropTypes.bool.isRequired,
  isCurrent: PropTypes.bool.isRequired,
};

export default ProjectForm;
