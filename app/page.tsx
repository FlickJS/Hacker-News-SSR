import { fetchTopStories, fetchItems } from "@/services/firebase";
import Story from "@/components/story/story";
import Hero from "@/components/ui/hero";
import Pagination from "@/components/ui/pagination";

type SearchParams = {
  page?: string;
};

const fetchStories = async () => {
  try {
    const storiesId = await fetchTopStories();
    const stories = await fetchItems(storiesId);
    return stories;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export default async function Home({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const page = parseInt(searchParams.page || "1", 10);
  const storiesPerPage = 15;

  const allStories = await fetchStories();
  const startIndex = (page - 1) * storiesPerPage;
  const endIndex = startIndex + storiesPerPage;
  const displayedStories = allStories.slice(startIndex, endIndex);
  const totalPages = Math.ceil(allStories.length / storiesPerPage);

  return (
    <div className="container mx-auto p-4 pb-16">
      <Hero />
      <div className="grid grid-cols-1 gap-4">
        {displayedStories.length > 0 ? (
          displayedStories.map((story, index) => (
            <Story key={index} story={story} />
          ))
        ) : (
          <p>No stories available</p>
        )}
      </div>
      <div className="flex justify-center mt-4">
        <Pagination currentPage={page} totalPages={totalPages} />
      </div>
    </div>
  );
}
