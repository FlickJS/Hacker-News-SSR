import { describe, it, expect } from "vitest";
import { fetchItem, fetchTopStories } from "./firebase";

describe("API tests", () => {
  let storyIds: number[];

  it("fetches top stories", async () => {
    const data = await fetchTopStories();
    expect(Array.isArray(data)).toBe(true);
    expect(data.every((item: number) => typeof item === "number")).toBe(true);
    storyIds = data.sort(() => 0.5 - Math.random()).slice(0, 5);
    expect(storyIds.length).toBe(5);
  });

  it("fetches and validates 5 random stories", async () => {
    if (!storyIds || storyIds.length === 0) {
      throw new Error("No story IDs available from the top stories test.");
    }

    for (const storyId of storyIds) {
      const data = await fetchItem(storyId);

      if (data.type === "story") {
        expect(data).toMatchObject({
          by: expect.any(String),
          descendants: expect.any(Number),
          id: storyId,
          score: expect.any(Number),
          time: expect.any(Number),
          title: expect.any(String),
          type: "story",
        });

        if (data.url) {
          expect(data.url).toEqual(expect.any(String));
        }
      } else {
        expect(data).toMatchObject({
          id: storyId,
          type: expect.any(String),
        });
      }
    }
  });
});
