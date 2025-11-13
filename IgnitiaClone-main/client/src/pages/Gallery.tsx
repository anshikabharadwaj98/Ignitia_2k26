export default function Gallery() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-4" style={{ fontFamily: 'Orbitron, sans-serif' }}>
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Gallery</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Relive the moments from past Ignitia celebrations
          </p>
        </div>
        <div className="text-center py-20">
          <p className="text-muted-foreground">Gallery coming soon...</p>
        </div>
      </div>
    </div>
  );
}
