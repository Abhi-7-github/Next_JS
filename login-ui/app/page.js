export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-sky-100 text-gray-800">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">Welcome to the App 🌟</h1>
        <p className="text-gray-600 mb-6">
          Please <a href="/signin" className="text-blue-600 hover:underline">Login</a> to continue.
        </p>
      </div>
    </div>
  );
}
