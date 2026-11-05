/**
 * The body of a response as JSON, or undefined when there is none.
 *
 * Some hosts send an empty body, not the text `null`, for a handler that
 * returns nothing, and `res.json()` throws on that. A poll that finds nothing
 * waiting is a normal answer, not a failed load.
 */
export async function readJson<T>(res: Response): Promise<T> {
  const text = await res.text();
  return (text ? JSON.parse(text) : undefined) as T;
}
