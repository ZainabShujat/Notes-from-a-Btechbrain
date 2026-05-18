"use client";

import { useState, useMemo, useEffect } from "react";
import PostCard from "./PostCard";
import type { PostMeta } from "../../lib/posts";

type Props = {
  posts: PostMeta[];
  initialTag?: string;
};

export default function ArticleSearch({ posts,
  initialTag = "",
 }: Props) {
  const [searchQuery, setSearchQuery] = useState(initialTag);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest" | "alphabetical" | "relevance">("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const [viewsMap, setViewsMap] = useState<Record<string, number>>({});
  const resultsPerPage = 12;

  // Fetch views for all posts on mount
  useEffect(() => {
    let cancelled = false;
    async function fetchViews() {
      const entries: [string, number][] = [];
      for (const post of posts) {
        try {
          const res = await fetch(`/api/views/${post.slug}`);
          const data = await res.json();
          entries.push([post.slug, typeof data.views === 'number' ? data.views : 0]);
        } catch {
          entries.push([post.slug, 0]);
        }
      }
      if (!cancelled) setViewsMap(Object.fromEntries(entries));
    }
    fetchViews();
    return () => { cancelled = true; };
  }, [posts]);

  // Extract unique categories
  const categories = useMemo(() => {
    const cats = new Set(posts.map((p) => p.category));
    return ["all", ...Array.from(cats).sort()];
  }, [posts]);

  // Filter and sort posts
  const filteredAndSortedPosts = useMemo(() => {
    let filtered = posts;

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((post) => {
        return (
          post.title.toLowerCase().includes(query) ||
          post.excerpt?.toLowerCase().includes(query) ||
          post.category.toLowerCase().includes(query) ||
          post.content?.toLowerCase().includes(query) ||
          (post.tags || []).some((tag) => tag.toLowerCase().includes(query))  
        );
      });
    }

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter((post) => post.category === selectedCategory);
    }

    // Sort
    const sorted = [...filtered];
    if (sortOrder === "newest") {
      sorted.sort((a, b) => {
        const dateB = +new Date(b.date || b.created_at);
        const dateA = +new Date(a.date || a.created_at);
        return dateB - dateA;
      });
    } else if (sortOrder === "oldest") {
      sorted.sort((a, b) => {
        const dateA = +new Date(a.date || a.created_at);
        const dateB = +new Date(b.date || b.created_at);
        return dateA - dateB;
      });
    } else if (sortOrder === "alphabetical") {
      sorted.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortOrder === "relevance") {
      sorted.sort((a, b) => (viewsMap[b.slug] || 0) - (viewsMap[a.slug] || 0));
    }
    return sorted;
  }, [posts, searchQuery, selectedCategory, sortOrder, viewsMap]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedPosts.length / resultsPerPage);
  const paginatedPosts = useMemo(() => {
    const startIndex = (currentPage - 1) * resultsPerPage;
    return filteredAndSortedPosts.slice(startIndex, startIndex + resultsPerPage);
  }, [filteredAndSortedPosts, currentPage]);

  // Reset to page 1 when filters change
  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    setCurrentPage(1);
  };

  const handleSortChange = (value: "newest" | "oldest" | "alphabetical" | "relevance") => {
    setSortOrder(value);
    setCurrentPage(1);
  };

  return (
    <div>
      {/* Filters Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search Input */}
          <div className="md:col-span-3">
            <label htmlFor="search" className="block text-sm font-medium text-slate-700 mb-2">
              Search Articles
            </label>
            <input
              id="search"
              type="text"
              placeholder="Search by title, keywords, category, or content..."
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
            />
          </div>

          {/* Category Filter */}
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-slate-700 mb-2">
              Category
            </label>
            <select
              id="category"
              value={selectedCategory}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none bg-white"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat === "all" ? "All Categories" : cat.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")}
                </option>
              ))}
            </select>
          </div>

          {/* Sort Order */}
          <div>
            <label htmlFor="sort" className="block text-sm font-medium text-slate-700 mb-2">
              Sort By
            </label>
            <select
              id="sort"
              value={sortOrder}
              onChange={(e) => handleSortChange(e.target.value as "newest" | "oldest" | "alphabetical" | "relevance")}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none bg-white"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="alphabetical">Alphabetical</option>
              <option value="relevance">Most Viewed (Relevance)</option>
            </select>
          </div>

          {/* Results Count */}
          <div className="flex items-end">
            <p className="text-sm text-slate-600">
              Showing <span className="font-semibold text-purple-600">{filteredAndSortedPosts.length}</span> article{filteredAndSortedPosts.length !== 1 ? "s" : ""}
            </p>
          </div>
        </div>
      </div>

      {/* Results Grid */}
      {paginatedPosts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-slate-600 text-lg">No articles found matching your criteria.</p>
          <p className="text-slate-500 text-sm mt-2">Try adjusting your search or filters.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 place-items-center">
            {paginatedPosts.map((post) => (
              <PostCard
                key={post.slug}
                title={post.title}
                slug={post.slug}
                excerpt={post.excerpt}
                date={post.date}
                created_at={post.created_at}
                category={post.category}
                banner={post.banner}
                tags={post.tags}
              />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-12 flex justify-center items-center gap-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Previous
              </button>

              <div className="flex gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      currentPage === page
                        ? "bg-purple-600 text-white"
                        : "border border-slate-300 hover:bg-slate-50"
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
