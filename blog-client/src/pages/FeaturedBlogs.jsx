import React, { useEffect, useState, useContext } from 'react';
import axiosSecure from '../api/axiosSecure';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
} from '@tanstack/react-table';
import {
  BookText,
  User,
  CalendarDays,
  ThumbsUp,
  SortAsc,
  SortDesc,
} from 'lucide-react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { ThemeContext } from '../context/ThemeProvider';

// Keep all imports the same

const FeaturedBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    axiosSecure
      .get('/api/blogs')
      .then((res) => {
        const allBlogs = res.data;
        const featuredBlogs = allBlogs.filter((blog) => blog.isFeatured);

        const blogsWithWordCount = featuredBlogs.map((blog) => {
          const text = blog.longDescription
            ? blog.longDescription.replace(/<[^>]+>/g, '')
            : '';
          const wordCount = text.trim().split(/\s+/).length;
          return { ...blog, wordCount };
        });

        const top10 = blogsWithWordCount
          .sort((a, b) => b.wordCount - a.wordCount)
          .slice(0, 10);

        setBlogs(top10);
      })
      .catch((err) => console.error('Failed to fetch blogs:', err))
      .finally(() => setLoading(false));
  }, []);

  const columns = React.useMemo(
    () => [
      {
        header: 'Title',
        accessorKey: 'title',
        cell: (info) => (
          <div className="flex items-center gap-2 max-w-[200px] sm:max-w-none truncate">
            <BookText
              className={`w-4 h-4 ${
                theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
              }`}
            />
            <span className="font-semibold truncate">{info.getValue()}</span>
          </div>
        ),
      },
      {
        header: 'Category',
        accessorKey: 'category',
        cell: (info) => (
          <span
            className={`inline-block text-xs font-medium px-2.5 py-0.5 rounded ${
              theme === 'dark'
                ? 'bg-blue-900 text-blue-300'
                : 'bg-blue-100 text-blue-800'
            }`}
          >
            {info.getValue()}
          </span>
        ),
      },
      {
        header: 'Author',
        accessorFn: (row) => row.author?.name || 'Unknown',
        cell: (info) => (
          <div className="flex items-center gap-2 truncate max-w-[150px]">
            <User
              className={`w-4 h-4 ${
                theme === 'dark' ? 'text-indigo-400' : 'text-indigo-500'
              }`}
            />
            <span className="truncate">{info.getValue()}</span>
          </div>
        ),
      },
      {
        header: 'Word Count',
        accessorKey: 'wordCount',
        cell: (info) => (
          <span
            className={`text-sm font-medium ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
            }`}
          >
            {info.getValue()}
          </span>
        ),
      },
      {
        header: 'Likes',
        accessorKey: 'likes',
        cell: (info) => (
          <div
            className={`flex items-center gap-1 ${
              theme === 'dark' ? 'text-emerald-400' : 'text-emerald-600'
            }`}
          >
            <ThumbsUp className="w-4 h-4" />
            <span>{info.getValue()}</span>
          </div>
        ),
      },
      {
        header: 'Created At',
        accessorFn: (row) =>
          new Date(row.createdAt).toLocaleDateString('en-GB'),
        cell: (info) => (
          <div
            className={`flex items-center gap-2 text-sm ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
            }`}
          >
            <CalendarDays className="w-4 h-4" />
            {info.getValue()}
          </div>
        ),
      },
    ],
    [theme]
  );

  const table = useReactTable({
    data: blogs,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    initialState: {
      sorting: [{ id: 'wordCount', desc: true }],
    },
  });

  return (
    <div
      className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 transition-all duration-500 ${
        theme === 'dark'
          ? 'bg-gradient-to-br from-gray-900 to-gray-800 text-white'
          : 'bg-gradient-to-br from-white to-gray-100 text-gray-900'
      }`}
    >
      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 text-center sm:text-left">
        🌟 Featured Blogs - Top 10 by Word Count
      </h1>

      <div
        className={`overflow-x-auto border rounded-xl shadow-lg transition duration-300 ${
          theme === 'dark'
            ? 'bg-gray-800 border-gray-700'
            : 'bg-white border-gray-200'
        }`}
      >
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className={`${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'}`}>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                    className="px-4 sm:px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide cursor-pointer select-none text-gray-600 dark:text-gray-300"
                  >
                    <div className="flex items-center gap-2">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {header.column.getIsSorted() === 'asc' ? (
                        <SortAsc className="w-4 h-4" />
                      ) : header.column.getIsSorted() === 'desc' ? (
                        <SortDesc className="w-4 h-4" />
                      ) : null}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {loading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <tr key={i} className="animate-pulse">
                  {columns.map((col, idx) => (
                    <td key={idx} className="px-4 sm:px-6 py-4 whitespace-nowrap">
                      <Skeleton height={20} />
                    </td>
                  ))}
                </tr>
              ))
            ) : table.getRowModel().rows.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="p-4 text-center text-gray-500 dark:text-gray-400"
                >
                  No featured blogs found.
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className={`transition duration-200 ${
                    theme === 'dark'
                      ? 'hover:bg-gray-700 hover:shadow-md'
                      : 'hover:bg-gray-50 hover:shadow'
                  }`}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FeaturedBlogs;
