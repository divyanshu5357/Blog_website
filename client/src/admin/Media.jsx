export default function Media() {
  return (
    <div className="p-8">
      <div className="flex justify-between items-center">

        <div>
          <h1 className="text-4xl font-bold text-violet-900">
            Media Library
          </h1>

          <p className="text-gray-500 mt-2">
            Manage uploaded images for your CMS.
          </p>
        </div>

        <button className="bg-violet-700 hover:bg-violet-800 text-white px-5 py-3 rounded-lg">
          Upload Image
        </button>

      </div>

      <div className="mt-8 bg-white rounded-xl shadow p-10 border text-center">

        <div className="text-6xl">
          🖼️
        </div>

        <h2 className="text-2xl font-semibold mt-5">
          No Media Yet
        </h2>

        <p className="text-gray-500 mt-2">
          Upload images here to reuse them across posts,
          live sessions and future pages.
        </p>

      </div>
    </div>
  );
}