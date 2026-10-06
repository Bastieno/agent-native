/**
 * Doing many small things at once, but not all of them at once.
 *
 * Twenty learners sitting the same paper are independent of each other, so
 * waiting for each in turn wastes most of a run. Unbounded parallelism is
 * worse than useless though: the dev server holds a socket per connection
 * and stops answering at around five hundred, which looks exactly like a
 * hang. A small pool is quick and stays well under that.
 */
export async function inPool<T, R>(
  items: T[],
  limit: number,
  work: (item: T, index: number) => Promise<R>,
): Promise<R[]> {
  const results: R[] = new Array(items.length);
  let next = 0;
  const workers = Array.from({ length: Math.min(limit, items.length) }, () =>
    (async () => {
      while (true) {
        const index = next++;
        if (index >= items.length) return;
        results[index] = await work(items[index], index);
      }
    })(),
  );
  await Promise.all(workers);
  return results;
}
