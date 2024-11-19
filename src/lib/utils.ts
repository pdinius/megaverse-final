export const toggleArrayElement = <T>(arr: Array<T>, el: T) => {
  const res = arr.slice();
  const idx = res.indexOf(el);

  if (idx > -1) {
    res.splice(idx, 1);
  } else {
    res.push(el);
  }

  return res;
};

export const partition = <T>(arr: Array<T>, size: number) => {
  const res: Array<Array<T>> = [];
  
  for (let i = 0; i < arr.length; i += size) {
    res.push(arr.slice(i, i + size));
  }

  return res;
};
