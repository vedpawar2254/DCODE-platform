export default function Reviews() {
  return (
    <section className="h-screen mt-35 py-24">
      <div className="text-center pt-4 pb-6 px-4">
        <div className="text-green-400 text-xl font-normal mb-2 opacity-70">
          OUR CONTRIBUTORS
        </div>
        <h1 className="text-2xl md:text-3xl pt-5 font-bold mb-3">
          <span className="text-white">What our</span>{' '}
          <span className="bg-gradient-to-r from-[#BCDD19] to-[#65770D] bg-clip-text text-transparent">
            contributors
          </span>{' '}
          <span className="text-white">say</span>
        </h1>
        <p className="text-gray-300 pt-5 text-sm max-w-2xl mx-auto opacity-70">
          A structured journey through open-source contribution, from
          exploration to production-level impact
        </p>
      </div>
    </section>
  );
}
