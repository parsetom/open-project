export function getSlug(path) {
  if (!path) {
    return path; // Just relay if path is empty
  }
  var tmpPath = path.split('/');

  if (tmpPath && tmpPath.length > 0) {
    tmpPath = tmpPath[tmpPath.length - 1]; // Let's return the last occurence which is the slug
  }

  return tmpPath;
}
