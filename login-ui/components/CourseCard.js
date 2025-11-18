import MaterialButton from "./MaterialButton";

export default function CourseCard({ title, description }) {
  return (
    <div
      className="bg-white/5 backdrop-blur-xl 
      rounded-2xl p-6 
      border border-white/10 
      shadow-lg 
      transition-all duration-300 
      hover:-translate-y-1 
      hover:border-cyan-400/40 
      hover:shadow-cyan-500/20"
    >
      <h2
        className="text-xl font-semibold mb-2 
        bg-gradient-to-r from-cyan-300 to-purple-300 
        bg-clip-text text-transparent"
      >
        {title}
      </h2>

      <p className="text-gray-300 text-sm leading-relaxed">
        {description}
      </p>

      <div className="mt-5">
        <MaterialButton
          color="indigo"
          className="text-sm shadow-indigo-500/30 hover:shadow-indigo-500/50 w-full"
        >
          View Course
        </MaterialButton>
      </div>
    </div>
  );
}
