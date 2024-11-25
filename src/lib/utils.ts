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

export const TypedKeys = <T extends string, U>(o: { [key in T]?: U }) => {
  return Object.keys(o) as Array<T>;
};

export const TypedEntries = <T extends string, U>(o: { [key in T]?: U }) => {
  return Object.entries(o) as Array<[T, U]>;
};

export const setAdder =
  <T>(el: T) =>
  (curr: Set<T>) => {
    const res = new Set(curr);
    res.add(el);
    return res;
  };

export const setToggler =
  <T>(el: T) =>
  (curr: Set<T>) => {
    const res = new Set(curr);
    if (res.has(el)) {
      res.delete(el);
    } else {
      res.add(el);
    }
    return res;
  };

export const setRemover =
  <T>(el: T) =>
  (curr: Set<T>) => {
    const res = new Set(curr);
    res.delete(el);
    return res;
  };

export const arrayAdder =
  <T>(el: T) =>
  (curr: Array<T>) =>
    [...curr, el];

export const arrayToggler =
  <T>(el: T) =>
  (curr: Array<T>) => {
    const res = curr.slice();
    const idx = res.indexOf(el);
    if (idx > -1) {
      res.splice(idx, 1);
    } else {
      res.push(el);
    }
    return res;
  };

export const arrayRemover =
  <T>(el: T) =>
  (curr: Array<T>) => {
    const res = curr.slice();
    const idx = res.indexOf(el);
    if (idx > -1) {
      res.splice(idx, 1);
    }
    return res;
  };
