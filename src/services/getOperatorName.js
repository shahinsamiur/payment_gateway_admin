export function getOperatorName(operator) {
  switch (operator) {
    case "none":
      return "None";
    case "==":
      return "Same as";
    case "!=":
      return "Not same";
    case ">":
      return "Greater than";
    case "<":
      return "Less than";
    case ">=":
      return "Greater than or equal";
    case "<=":
      return "Less than or equal";
    default:
      return "None";
  }
}
