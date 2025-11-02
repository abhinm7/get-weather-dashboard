export const celsiusToFahrenheit = (celsius) => (celsius * 9) / 5 + 32;

export const degToCompass = (num) => {
  const val = Math.floor(num / 22.5 + 0.5);
  const arr = [
    "N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE",
    "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW",
  ];
  return arr[val % 16];
};

export const formatHour = (timestamp) => {
  return new Date(timestamp * 1000).toLocaleTimeString([], {
    hour: "numeric",
    hour12: true,
  });
};

export const getDayName = (timestamp) => {
  return new Date(timestamp * 1000).toLocaleDateString("en-US", {
    weekday: "short",
  });
};