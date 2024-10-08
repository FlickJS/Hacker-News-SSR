import { initializeApp } from "firebase/app";
import { getDatabase, ref, query, get, child } from "firebase/database";

const firebaseConfig = {
  databaseURL: "https://hacker-news.firebaseio.com",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const version = "/v0";
const apiRef = ref(database, version);

export const fetchItem = (id: number): Promise<any> => {
  const itemRef = child(apiRef, `item/${id}`);
  return get(itemRef).then((snapshot) => snapshot.val());
};

export const fetchItems = (ids: number[]): Promise<any[]> => {
  const promises = ids.map((id) => fetchItem(id));
  return Promise.all(promises).then((results) =>
    results.filter((item) => item !== null)
  );
};

export const fetchTopStories = (): Promise<number[]> => {
  const topStoriesQuery = query(ref(database, "v0/topstories"));
  return get(topStoriesQuery).then((snapshot) => {
    const stories = snapshot.val();
    return stories.filter((storyId: number) => storyId !== null);
  });
};
