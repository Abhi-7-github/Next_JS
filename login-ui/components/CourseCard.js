export default function CourseCard({ title, description }) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition">
      <h2 className="text-lg font-semibold mb-2 text-gray-800">{title}</h2>
      <p className="text-gray-600 text-sm">{description}</p>
      <button className="mt-4 px-3 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition">
        View Course
      </button>
    </div>
  );
}
