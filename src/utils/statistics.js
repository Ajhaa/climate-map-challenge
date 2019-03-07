export const lastThreeDays = (location) => {
  const timeValue = location.data.t.timeValuePairs;
  const len = timeValue.length;
  const temperatureData = [timeValue[len-49], timeValue[len-25], timeValue[len-1]];
  const data = temperatureData.map(t => {
      const date = new Date(t.time);
      const hours = date.getHours();
      const day = `${date.getDate()}.${date.getMonth()+1}.`;
      return { value: t.value, day, time: hours }
  });
  return { name: location.info.name, data };
}

export const compareLastThree = (loc1, loc2) => {
  let data = [];
  const d1 = lastThreeDays(loc1);
  const d2 = lastThreeDays(loc2);
  for (let i = 0; i < 3; i++) {
    const v1 = d1.data[i];
    const v2 = d2.data[i];
    data[i] = { name: v1.name, name2: v2.name, value: v1.value, value2: v2.value, day: v1.day, time: v1.time }
  }
  
  return { name: loc1.info.name, name2: loc2.info.name, data };
}

