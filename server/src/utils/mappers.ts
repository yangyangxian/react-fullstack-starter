export function mapObject<TSource extends object, TTarget extends object>(
  source: TSource,
  target: TTarget,
  mapRules?: Record<string, string>
): TTarget {
  const targetKeys = Object.keys(target);

  for (const sourceKey in source) {
    if (mapRules && sourceKey in mapRules) {
      const targetKey = mapRules[sourceKey];
      if (targetKeys.includes(targetKey)) {
        (target as any)[targetKey] = (source as any)[sourceKey];
      }
    } else {
      // If no mapRules or sourceKey not mapped, try direct matching
      if (targetKeys.includes(sourceKey)) {
        (target as any)[sourceKey] = (source as any)[sourceKey];
      }
    }
  }

  return target;
}