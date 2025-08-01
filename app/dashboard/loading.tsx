// TODO: Improve this loading

export default function Loading() {
  return (
    <div className="flex items-center justify-center h-full w-full min-h-[60vh]">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent" />
    </div>
  );
}
