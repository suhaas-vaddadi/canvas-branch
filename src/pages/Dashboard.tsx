import { invoke } from "@tauri-apps/api/core";
import { useState, useEffect } from "react";
import { Course } from "../types";

export default function Dashboard() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [hiddenCourses, setHiddenCourses] = useState<Set<number>>(new Set());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showHiddenCourses, setShowHiddenCourses] = useState(false);

  async function deleteKey() {
    try {
      await invoke("delete_key");
      setCourses([]);
      setError("Access token deleted successfully");
    } catch (err) {
      setError("Failed to delete access token");
    }
  }

  async function fetchCourses() {
    try {
      setLoading(true);
      setError(null);
      const parsedCourses = JSON.parse(await invoke("fetch_courses"));
      // Filter out courses with undefined or null names
      const filteredCourses = parsedCourses.filter(
        (course: Course) => course.name && course.name !== undefined
      );
      setCourses(filteredCourses);
    } catch (err) {
      setError("Failed to fetch courses. Please check your access token.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCourses();
    // Load hidden courses from localStorage
    const savedHiddenCourses = localStorage.getItem("hiddenCourses");
    if (savedHiddenCourses) {
      setHiddenCourses(new Set(JSON.parse(savedHiddenCourses)));
    }
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getStatusColor = (workflowState: string) => {
    switch (workflowState) {
      case "available":
        return "bg-green-500";
      case "unpublished":
        return "bg-yellow-500";
      case "completed":
        return "bg-blue-500";
      case "deleted":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  // Generate unique colors for courses based on index
  const getCourseColor = (index: number) => {
    const colors = [
      "from-blue-500 to-blue-600",
      "from-purple-500 to-purple-600",
      "from-green-500 to-green-600",
      "from-orange-500 to-orange-600",
      "from-pink-500 to-pink-600",
      "from-indigo-500 to-indigo-600",
      "from-teal-500 to-teal-600",
      "from-red-500 to-red-600",
      "from-yellow-500 to-yellow-600",
      "from-emerald-500 to-emerald-600",
      "from-cyan-500 to-cyan-600",
      "from-rose-500 to-rose-600",
      "from-violet-500 to-violet-600",
      "from-fuchsia-500 to-fuchsia-600",
      "from-sky-500 to-sky-600",
      "from-lime-500 to-lime-600",
      "from-amber-500 to-amber-600",
      "from-slate-500 to-slate-600",
      "from-zinc-500 to-zinc-600",
      "from-stone-500 to-stone-600",
    ];

    return colors[index % colors.length];
  };

  const getCourseBgColor = (index: number) => {
    const colors = [
      "bg-blue-500/10",
      "bg-purple-500/10",
      "bg-green-500/10",
      "bg-orange-500/10",
      "bg-pink-500/10",
      "bg-indigo-500/10",
      "bg-teal-500/10",
      "bg-red-500/10",
      "bg-yellow-500/10",
      "bg-emerald-500/10",
      "bg-cyan-500/10",
      "bg-rose-500/10",
      "bg-violet-500/10",
      "bg-fuchsia-500/10",
      "bg-sky-500/10",
      "bg-lime-500/10",
      "bg-amber-500/10",
      "bg-slate-500/10",
      "bg-zinc-500/10",
      "bg-stone-500/10",
    ];

    return colors[index % colors.length];
  };

  const getCourseBorderColor = (index: number) => {
    const colors = [
      "border-blue-500/30",
      "border-purple-500/30",
      "border-green-500/30",
      "border-orange-500/30",
      "border-pink-500/30",
      "border-indigo-500/30",
      "border-teal-500/30",
      "border-red-500/30",
      "border-yellow-500/30",
      "border-emerald-500/30",
      "border-cyan-500/30",
      "border-rose-500/30",
      "border-violet-500/30",
      "border-fuchsia-500/30",
      "border-sky-500/30",
      "border-lime-500/30",
      "border-amber-500/30",
      "border-slate-500/30",
      "border-zinc-500/30",
      "border-stone-500/30",
    ];

    return colors[index % colors.length];
  };

  const hideCourse = (courseId: number) => {
    const newHiddenCourses = new Set(hiddenCourses);
    newHiddenCourses.add(courseId);
    setHiddenCourses(newHiddenCourses);
    localStorage.setItem(
      "hiddenCourses",
      JSON.stringify(Array.from(newHiddenCourses))
    );
  };

  const showCourse = (courseId: number) => {
    const newHiddenCourses = new Set(hiddenCourses);
    newHiddenCourses.delete(courseId);
    setHiddenCourses(newHiddenCourses);
    localStorage.setItem(
      "hiddenCourses",
      JSON.stringify(Array.from(newHiddenCourses))
    );
  };

  const getVisibleCourses = () => {
    return courses.filter((course) => !hiddenCourses.has(course.id));
  };

  const getHiddenCourses = () => {
    return courses.filter((course) => hiddenCourses.has(course.id));
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-6xl mx-auto">
        {/* Minimal Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-light text-gray-300 mb-2">
            Canvas Courses
          </h1>
          <div className="flex justify-center gap-3 mb-4">
            <button
              onClick={fetchCourses}
              disabled={loading}
              className="px-4 py-2 bg-gray-800 hover:bg-gray-700 disabled:bg-gray-800 disabled:cursor-not-allowed rounded-lg text-sm transition-colors duration-200"
            >
              {loading ? "Loading..." : "Refresh"}
            </button>
            <button
              onClick={deleteKey}
              className="px-4 py-2 bg-red-900/30 hover:bg-red-900/50 text-red-300 rounded-lg text-sm transition-colors duration-200"
            >
              Delete Token
            </button>
          </div>

          {/* Hidden Courses Toggle */}
          {hiddenCourses.size > 0 && (
            <div className="flex justify-center">
              <button
                onClick={() => setShowHiddenCourses(!showHiddenCourses)}
                className="px-4 py-2 bg-gray-800/50 hover:bg-gray-800 rounded-lg text-sm transition-colors duration-200 flex items-center gap-2"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
                {showHiddenCourses ? "Hide" : "Show"} Hidden Courses (
                {hiddenCourses.size})
              </button>
            </div>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-8 p-4 bg-red-900/20 border border-red-500/30 rounded-lg text-red-300 text-center">
            {error}
          </div>
        )}

        {/* Visible Courses Grid */}
        {getVisibleCourses().length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {getVisibleCourses().map((course, index) => (
              <div
                key={course.id}
                className={`${getCourseBgColor(index)} ${getCourseBorderColor(
                  index
                )} rounded-xl p-6 border hover:scale-105 transition-all duration-300 group relative`}
              >
                {/* Hide Course Button */}
                <button
                  onClick={() => hideCourse(course.id)}
                  className="absolute top-3 right-3 p-1.5 bg-gray-800/80 hover:bg-gray-700 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-200"
                  title="Hide course"
                >
                  <svg
                    className="w-4 h-4 text-gray-400 hover:text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>

                {/* Course Header */}
                <div className="mb-4">
                  <h3 className="text-lg font-medium text-white mb-1 line-clamp-2">
                    {course.name}
                  </h3>
                  <p className="text-sm text-gray-400 font-mono">
                    {course.course_code}
                  </p>
                </div>

                {/* Course Details */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-300">
                    <span className="text-gray-500 mr-2">•</span>
                    Created {formatDate(course.created_at)}
                  </div>

                  {course.start_at && (
                    <div className="flex items-center text-sm text-gray-300">
                      <span className="text-gray-500 mr-2">•</span>
                      Starts {formatDate(course.start_at)}
                    </div>
                  )}

                  {course.total_students !== undefined && (
                    <div className="flex items-center text-sm text-gray-300">
                      <span className="text-gray-500 mr-2">•</span>
                      {course.total_students} students
                    </div>
                  )}
                </div>

                {/* Status Badge */}
                <div className="flex items-center justify-between">
                  <span
                    className={`px-3 py-1 text-xs font-medium rounded-full ${
                      course.workflow_state === "available"
                        ? "bg-green-900/50 text-green-300"
                        : course.workflow_state === "unpublished"
                        ? "bg-yellow-900/50 text-yellow-300"
                        : course.workflow_state === "completed"
                        ? "bg-blue-900/50 text-blue-300"
                        : "bg-gray-700 text-gray-300"
                    }`}
                  >
                    {course.workflow_state}
                  </span>

                  <div
                    className={`w-2 h-2 rounded-full ${getStatusColor(
                      course.workflow_state
                    )}`}
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Hidden Courses Grid */}
        {showHiddenCourses && getHiddenCourses().length > 0 && (
          <div className="mt-8">
            <h2 className="text-xl font-medium text-gray-400 mb-4 text-center">
              Hidden Courses
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {getHiddenCourses().map((course, index) => (
                <div
                  key={course.id}
                  className="bg-gray-800/30 rounded-xl p-6 border border-gray-700/50 hover:scale-105 transition-all duration-300 group relative"
                >
                  {/* Show Course Button */}
                  <button
                    onClick={() => showCourse(course.id)}
                    className="absolute top-3 right-3 p-1.5 bg-green-600/80 hover:bg-green-500 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-200"
                    title="Show course"
                  >
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </button>

                  {/* Course Header */}
                  <div className="mb-4">
                    <h3 className="text-lg font-medium text-gray-400 mb-1 line-clamp-2">
                      {course.name}
                    </h3>
                    <p className="text-sm text-gray-500 font-mono">
                      {course.course_code}
                    </p>
                  </div>

                  {/* Course Details */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-500">
                      <span className="text-gray-600 mr-2">•</span>
                      Created {formatDate(course.created_at)}
                    </div>

                    {course.start_at && (
                      <div className="flex items-center text-sm text-gray-500">
                        <span className="text-gray-600 mr-2">•</span>
                        Starts {formatDate(course.start_at)}
                      </div>
                    )}

                    {course.total_students !== undefined && (
                      <div className="flex items-center text-sm text-gray-500">
                        <span className="text-gray-600 mr-2">•</span>
                        {course.total_students} students
                      </div>
                    )}
                  </div>

                  {/* Status Badge */}
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 text-xs font-medium rounded-full bg-gray-700 text-gray-400">
                      {course.workflow_state}
                    </span>

                    <div className="w-2 h-2 rounded-full bg-gray-500" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* No Courses Message */}
        {getVisibleCourses().length === 0 && !loading && (
          <div className="text-center py-20">
            <div className="w-20 h-20 mx-auto mb-6 bg-gray-800 rounded-full flex items-center justify-center border border-gray-700">
              <svg
                className="w-10 h-10 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-300 mb-2">
              {hiddenCourses.size > 0
                ? "All courses are hidden"
                : "No courses found"}
            </h3>
            <p className="text-gray-500 mb-4">
              {hiddenCourses.size > 0
                ? "You've hidden all your courses. Use the toggle above to show hidden courses."
                : "Get started by fetching your courses."}
            </p>
            {!loading && hiddenCourses.size === 0 && (
              <button
                onClick={fetchCourses}
                className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm transition-colors duration-200"
              >
                Fetch Courses
              </button>
            )}
            {hiddenCourses.size > 0 && (
              <button
                onClick={() => setShowHiddenCourses(true)}
                className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm transition-colors duration-200"
              >
                Show Hidden Courses
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
