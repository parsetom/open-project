export async function handleResponse(response) {
  if (response.ok) {
    let promise = response.json();
    promise.then(finalize); // Prior to all business side processing let's finalize system formats
    return promise;
  }
  if (response.status === 400) {
    // So, a server-side validation error occurred.
    // Server side validation returns a string error message, so parse as text instead of json.
    const error = await response.text();
    throw new Error(error);
  }
  throw new Error('Network response was not ok.');
}

// In a real app, would likely call an error logging service.
export function handleError(error) {
  // eslint-disable-next-line no-console
  console.error('API call failed. ' + error);
  throw error;
}
export function finalize(json) {
  // Upon receiving of the object from API let's finalize certain data formats
  if (json.length) {
    json.forEach(transformDates);
  } else {
    transformDates(json);
  }
}
export function transformDates(json) {
  // Let's convert any props with date keyword to javascript date
  for (let prop in json) {
    if (prop.toLowerCase().indexOf('date') > 0) {
      var dateValue = json[prop];
      if (dateValue) {
        // We will only convert if values is not null
        json[prop] = new Date(dateValue);
      }
    }
  }
}
