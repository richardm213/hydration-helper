function SimpleCalculator() {}
function APICalculator() {}
function IntakeCalculator(type) {
  switch (type) {
    case 'simple':
      return SimpleCalculator();
    case 'api':
      return APICalculator();
    default:
      return -1;
  }
}

export default IntakeCalculator;
