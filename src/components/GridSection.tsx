function GridSection() {
  const quickLinks = [
    { id: 1, title: "Events", icon: "📅", description: "Upcoming events and workshops" },
    { id: 2, title: "Projects", icon: "💻", description: "Student projects and innovations" },
    { id: 3, title: "Gallery", icon: "📸", description: "Photos from our activities" },
    { id: 4, title: "Contact", icon: "📞", description: "Get in touch with us" }
  ];

  return (
    <section className="py-20 bg-gray-900 text-white">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12 text-blue-400">Quick Links</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {quickLinks.map((link) => (
            <div key={link.id} className="bg-gray-800 p-6 rounded-lg border border-gray-700 hover:border-blue-500 transition-colors cursor-pointer">
              <div className="text-4xl mb-4 text-center">{link.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-center text-blue-300">{link.title}</h3>
              <p className="text-gray-400 text-center">{link.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default GridSection;