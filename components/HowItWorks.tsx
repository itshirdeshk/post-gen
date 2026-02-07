function Card({ title, text }: { title: string; text: string }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border p-6">
      <h3 className="font-semibold text-lg">{title}</h3>
      <p className="text-gray-600 mt-2 text-sm">{text}</p>
    </div>
  );
}

export default function HowItWorks() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-semibold">How it works</h2>
        <p className="text-gray-600 mt-2">
          Let AI handle the content, while you focus on growth.
        </p>

        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <Card
            title="Describe What You Need"
            text="Describe your product and style."
          />
          <Card
            title="AI Generates Content"
            text="Creates images, videos and captions."
          />
          <Card title="Publish or Schedule" text="Auto-post at best times." />
        </div>
      </div>
    </section>
  );
}
