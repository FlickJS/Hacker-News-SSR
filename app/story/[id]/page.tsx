import { fetchItem as fetchStoryById } from "@/services/firebase";
import { Story as StoryParams, CommentType } from "@/types/types";
import BackToHome from "@/components/ui/back-to-home";
import Link from "next/link";
import { fetchComments } from "./actions";
import Comment from "@/components/story/comment";
import { Suspense } from "react";
import CommentsLoading from "@/components/ui/comments-loading";
import { sanitizeHtml } from "../../../utils/sanitize-html";

interface StoryPageProps {
  params: { id: number };
  searchParams: { id: number };
}

async function CommentsSection({ storyId }: { storyId: number }) {
  let comments: CommentType[] = [];
  try {
    const story = await fetchStoryById(storyId);
    if (story && story.kids) {
      comments = await fetchComments(story.kids);
    }
  } catch (error) {
    console.error("Failed to fetch comments:", error);
  }

  if (comments.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
        <h2 className="text-2xl font-extrabold text-gray-800 mb-4 mt-4">
          No comments available.
        </h2>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
      <h2 className="text-2xl font-extrabold text-gray-800 mb-4 mt-4">
        Comments
      </h2>
      <ul className="space-y-4">
        {comments.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))}
      </ul>
    </div>
  );
}

export default async function StoryPage({ params }: StoryPageProps) {
  const { id } = params;

  let story: StoryParams | null = null;

  try {
    story = await fetchStoryById(id);
  } catch (error) {
    console.error("Failed to fetch story:", error);
  }

  if (!story) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4 sm:px-6 lg:px-8">
        <h1 className="text-1xl sm:text-2xl lg:text-3xl font-bold mb-4">
          {id} - Story with this id cannot be found.
        </h1>
        <Link
          href="/"
          scroll={true}
          className="inline-block px-4 sm:px-6 py-2 sm:py-3 bg-white text-primary font-semibold rounded-md shadow-md hover:bg-gray-100 transition duration-300"
        >
          Go to Homepage
        </Link>
      </div>
    );
  }

  return (
    <>
      <BackToHome />
      <div className="container mx-auto p-4 pb-6">
        <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
          <h1 className="text-3xl font-extrabold text-gray-800 mb-4 mt-4">
            {story.title}
          </h1>
          {story.url && (
            <p className="my-4 font-semibold">
              <span role="img" aria-label="link">
                🔗
              </span>{" "}
              Link to: &nbsp;
              <a
                href={story.url}
                className="text-blue-600 hover:text-blue-800 text-lg font-normal"
                target="_blank"
                rel="noopener noreferrer"
              >
                {story.title}
              </a>
            </p>
          )}
          <p className="my-4 text-gray-700 text-lg font-semibold">
            <span role="img" aria-label="score">
              🔥
            </span>{" "}
            Score: <span className="font-normal"> {story.score}</span>
          </p>
          <p className="my-4 text-gray-700 text-lg font-semibold">
            <span role="img" aria-label="author">
              🧑‍💻
            </span>{" "}
            By:<span className="font-normal"> {story.by}</span>
          </p>
          <p className="my-4 text-gray-700 text-lg font-semibold">
            <span role="img" aria-label="comments">
              📰
            </span>{" "}
            Comments: <span className="font-normal"> {story.descendants}</span>
          </p>
          <p className="my-4 text-gray-700 text-lg font-semibold">
            <span role="img" aria-label="calendar">
              📅
            </span>{" "}
            Posted on:
            <span className="font-normal">
              {" "}
              {new Date(story.time * 1000).toLocaleString()}
            </span>
          </p>
        </div>
        <Suspense fallback={<CommentsLoading />}>
          <CommentsSection storyId={id} />
        </Suspense>
      </div>
    </>
  );
}
