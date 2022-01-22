const getColorFromThresholds = (thresholds: [number, number], value: number): string => {
  switch (true) {
    case value < thresholds[0]:
      return 'bg-green-300';
    case value < thresholds[1] && value > thresholds[0]:
      return 'bg-yellow-300';
    case value >= thresholds[1]:
      return 'bg-red-300';
    default:
      return 'bg-red-300';
  }
};
export default getColorFromThresholds;
