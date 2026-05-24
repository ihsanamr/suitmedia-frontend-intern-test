import { useState, useEffect } from "react";
import axios from "axios";
import { formatDate } from "../utils/format";
import Pagination from "./Pagination";
import { ChevronDown } from "lucide-react";

function ListPost() {
  const url = new URLSearchParams(window.location.search);

  const [page, setPage] = useState(Number(url.get("page") || 1));
  const [size, setSize] = useState(Number(url.get("size") || 10));
  const [sort, setSort] = useState(url.get("sort") || "-published_at");

  const [posts, setPosts] = useState([]);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    const newUrl = `?page=${page}&size=${size}&sort=${sort}`;
    window.history.pushState({}, "", newUrl);

    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://suitmedia-backend.suitdev.com/api/ideas?page[number]=${page}&page[size]=${size}&append[]=small_image&append[]=medium_image&sort=${sort}`,
        );
        setPosts(response.data.data);
        setTotalItems(response.data.meta.total);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [page, size, sort]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Filter Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 text-sm">
        {/* Pagination info */}
        <div>
          <p className="text-gray-600">
            Showing{" "}
            <span className="font-bold text-orange-600">
              {(page - 1) * size + 1}
            </span>{" "}
            -{" "}
            <span className="font-bold text-orange-600">
              {Math.min(page * size, totalItems)}
            </span>{" "}
            of <span className="font-bold">{totalItems}</span> posts
          </p>
        </div>

        {/* Dropdown controls */}
        <div className="flex w-full md:w-auto justify-between md:justify-end gap-4 flex-wrap">
          {/* Items per page */}
          <div className="flex items-center gap-2">
            <span className="text-gray-600 font-bold">Show per page:</span>
            <div className="relative">
              <select
                value={size}
                onChange={(e) => {
                  setSize(Number(e.target.value));
                  setPage(1);
                }}
                className="appearance-none border-2 border-orange-400 bg-orange-50 text-orange-600 px-4 py-2 pr-10 rounded-full cursor-pointer shadow-sm transition-all duration-300 ease-in-out hover:border-orange-500 hover:bg-orange-100 focus:outline-none focus:ring-2 focus:ring-orange-300"
              >
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>
              <ChevronDown
                size={20}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-orange-500 pointer-events-none"
              />
            </div>
          </div>

          {/* Sorting options */}
          <div className="flex items-center gap-2">
            <span className="text-gray-600 font-bold">Sort by:</span>
            <div className="relative">
              <select
                value={sort}
                onChange={(e) => {
                  setSort(e.target.value);
                }}
                className="appearance-none border-2 border-orange-400 bg-orange-50 text-orange-600 px-4 py-2 pr-10 rounded-full cursor-pointer shadow-sm transition-all duration-300 ease-in-out hover:border-orange-500 hover:bg-orange-100 focus:outline-none focus:ring-2 focus:ring-orange-300"
              >
                <option value="-published_at">Newest (Terbaru)</option>
                <option value="published_at">Oldest (Terlama)</option>
              </select>
              <ChevronDown
                size={20}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-orange-500 pointer-events-none"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {posts.map((post) => {
          // Extract image URL with fallback to placeholder
          const imageUrl =
            post.medium_image?.[0]?.url ||
            post.small_image?.[0]?.url ||
            `https://picsum.photos/id/${post.id % 30}/400/300`;

          return (
            <div
              key={post.id}
              className="border-2 border-orange-500 rounded-lg shadow bg-white overflow-hidden flex flex-col hover:shadow-lg transition-all duration-300 ease-in-out cursor-pointer transform hover:-translate-y-1"
            >
              {/* Image wrapper */}
              <div className="w-full aspect-4/3 bg-gray-200 overflow-hidden relative">
                <img
                  src={imageUrl}
                  alt={post.title}
                  loading="lazy"
                  className="w-full absolute inset-0 h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = `https://picsum.photos/id/${post.id % 30}/400/300`;
                  }}
                />
              </div>

              {/* Content details */}
              <div className="p-4 flex flex-col grow">
                <span className="text-xs text-gray-400 font-medium mb-1">
                  {formatDate(post.published_at)}
                </span>

                <h2 className="font-bold text-gray-800 text-sm leading-snug line-clamp-3">
                  {post.title}
                </h2>
              </div>
            </div>
          );
        })}
      </div>

      <Pagination
        page={page}
        size={size}
        totalItems={totalItems}
        setPage={setPage}
      />
    </div>
  );
}

export default ListPost;
