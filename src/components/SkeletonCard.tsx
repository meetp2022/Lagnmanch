export default function SkeletonCard() {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
      {/* Photo placeholder */}
      <div className="aspect-[3/4] animate-shimmer" />
      {/* Text placeholders */}
      <div className="p-4 space-y-2.5">
        <div className="h-5 w-3/4 rounded animate-shimmer" />
        <div className="h-4 w-1/2 rounded animate-shimmer" />
        <div className="h-4 w-2/3 rounded animate-shimmer" />
        <div className="h-4 w-1/3 rounded animate-shimmer" />
      </div>
    </div>
  );
}
