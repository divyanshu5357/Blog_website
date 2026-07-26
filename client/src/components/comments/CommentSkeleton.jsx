export default function CommentSkeleton() {
  return (
    <div className="border rounded-2xl p-6 animate-pulse">

      <div className="flex gap-4">

        <div className="w-12 h-12 rounded-full bg-gray-200" />

        <div className="flex-1">

          <div className="h-4 w-40 bg-gray-200 rounded" />

          <div className="h-3 w-24 bg-gray-200 rounded mt-3" />

        </div>

      </div>

      <div className="space-y-3 mt-6">

        <div className="h-4 bg-gray-200 rounded" />

        <div className="h-4 w-3/4 bg-gray-200 rounded" />

      </div>

    </div>
  );
}