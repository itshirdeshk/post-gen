export default function Hero() {
  return (
    <section className="py-20">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center px-6">
        <div>
          <h2 className="text-5xl font-semibold leading-tight">
            Create ads, content,
            <br /> and campaigns with AI
            <br /> — end to end.
          </h2>

          <p className="mt-6 text-gray-600 text-lg">
            Generate images, videos, and posts for your product or business.
            Plan and automate your entire marketing strategy.
          </p>

          <button className="mt-8 bg-primary text-white px-7 py-3 rounded-xl text-lg font-medium hover:opacity-90">
            Get Started — It's Free
          </button>
        </div>

        <div className="bg-gray-100 rounded-2xl h-[380px] flex items-center justify-center text-gray-400">
          Preview Area
        </div>
      </div>
    </section>
  );
}
