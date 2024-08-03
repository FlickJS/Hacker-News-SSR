import React from "react";
import Link from "next/link";
import { Story as StoryType } from "@/types/types";

interface StoryProps {
  story: StoryType;
}

const Story: React.FC<StoryProps> = ({ story }) => {
  return (
    <div
      key={story.id}
      data-test-id="story"
      className="bg-white shadow-md rounded-lg p-6 hover:bg-gray-100 transition cursor-pointer"
    >
      <Link href={`/story/${story.id}`}>
        <h2 className="text-xl font-semibold mb-2">{story.title}</h2>
        <p className="text-gray-700 mb-2 font-semibold">
          <span role="img" aria-label="author">
            🧑‍💻
          </span>{" "}
          Written by: <span className="font-normal">{story.by}</span>
        </p>
        <p className="text-gray-700 font-semibold">
          <span role="img" aria-label="score">
            🔥
          </span>{" "}
          Current score: <span className="font-normal">{story.score}</span>
        </p>
        <p className="text-gray-700 font-semibold">
          <span role="img" aria-label="comments">
            📰
          </span>{" "}
          Comments: <span className="font-normal">{story.descendants}</span>
        </p>
        <p className="text-gray-700 font-semibold">
          <span role="img" aria-label="calendar">
            📅
          </span>{" "}
          Posted on:{" "}
          <span className="font-normal">
            {new Date(story.time * 1000).toLocaleString()}
          </span>
        </p>
      </Link>
    </div>
  );
};

export default Story;
