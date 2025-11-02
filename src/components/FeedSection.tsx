function FeedSection() {
  const updates = [
    { id: 1, title: "New Workshop Series", date: "2024-01-15", content: "Join our upcoming Python programming workshop series." },
    { id: 2, title: "Hackathon Winner", date: "2024-01-10", content: "Congratulations to our members for winning the regional hackathon!" },
    { id: 3, title: "Tech Talk", date: "2024-01-05", content: "Don't miss our guest speaker from Google next week." }
  ];

  return (
    <section className="py-20 bg-black text-white">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12 text-blue-400">Latest Updates</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {updates.map((update) => (
            <div key={update.id} className="bg-gray-800 p-6 rounded-lg border border-gray-700">
              <h3 className="text-xl font-semibold mb-2 text-blue-300">{update.title}</h3>
              <p className="text-gray-400 text-sm mb-3">{update.date}</p>
              <p className="text-gray-300">{update.content}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeedSection;