export function getRemainingDays(endDateStr) {
  const now = new Date();
  const endDate = new Date(endDateStr);
  const diffTime = endDate - now;

  if (diffTime <= 0) {
    return "Expired";
  }

  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const diffHours = Math.floor(
    (diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );

  if (diffDays === 0) {
    return `${diffHours} Hour${diffHours !== 1 ? "s" : ""}`;
  }

  if (diffHours === 0) {
    return `${diffDays} Day${diffDays !== 1 ? "s" : ""}`;
  }

  return `${diffDays} Day${diffDays !== 1 ? "s" : ""} ${diffHours} Hour${
    diffHours !== 1 ? "s" : ""
  }`;
}
