function calculateNeed(helpful, bad) {
  let need = Math.max(0, bad * 2 - helpful);
  return Math.min(1, need);
}

function calculateHealthState(need, environment, healthState, stepSize) {
  const baseDecline = 0.001;
  let step = Math.max(0, need - environment) * stepSize;
  let health = Math.min(1, Math.max(0, healthState - step));
  return health === healthState ? health - baseDecline : health;
}

export { calculateNeed, calculateHealthState };
