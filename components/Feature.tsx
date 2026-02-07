function Feature({ title }: { title: string }) {
  return (
    <div className="bg-white border rounded-2xl p-6 shadow-sm h-56 flex flex-col justify-between">
      <div className="text-gray-400">Preview</div>
      <h3 className="font-medium text-lg">{title}</h3>
    </div>
  );
}

export default function Features() {
  return (
    <section className="py-24">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-semibold">What you can create</h2>
        <p className="text-gray-600 mt-2">
          Generate visuals and content for any platform.
        </p>

        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <Feature title="Images" />
          <Feature title="Videos" />
          <Feature title="Auto Posts" />
        </div>
      </div>
    </section>
  );
}
