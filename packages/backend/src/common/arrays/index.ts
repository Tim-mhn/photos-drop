export function zipMap<T, U, V>(
  arr1: T[],
  arr2: U[],
  callbackFn: (t: T, u: U) => V,
): V[] {
  if (arr1.length !== arr2.length)
    throw new Error(
      `[zip error]: arrays do not have the same length (${arr1.length} != ${arr2.length}`,
    );

  return arr1.map((t, index) => {
    const u = arr2[index];
    return callbackFn(t, u);
  });
}
