import { useState, useEffect, useRef } from 'react';
import { Search, Filter, Grid, List, Download, Heart, Share2, Eye, Calendar, Camera, Sparkles, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import NorthernLightsBackground from '@/components/NorthernLightsBackground';

interface GalleryImage {
  id: number;
  src: string;
  title: string;
  category: string;
  date: string;
  photographer: string;
  likes: number;
  description: string;
}

// Real gallery data from Ignitia cultural festival
const galleryImages = [
  {
    id: 1,
    src: 'http://localhost:3001/assets/image_1762513720153.png',
    title: 'Live Band Performance',
    category: 'Cultural',
    date: '2024-03-15',
    photographer: 'Ignitia Photography Team',
    likes: 245,
    description: 'Electrifying live band performance with stunning stage lighting and energetic crowd'
  },
  {
    id: 2,
    src: 'http://localhost:3001/assets/image_1762942833107.png',
    title: 'Award Ceremony',
    category: 'Awards',
    date: '2024-03-16',
    photographer: 'Ignitia Photography Team',
    likes: 189,
    description: 'Recognition ceremony honoring outstanding participants and performers'
  },
  {
    id: 3,
    src: 'http://localhost:3001/assets/image_1762942849683.png',
    title: 'Dance Performance Duo',
    category: 'Cultural',
    date: '2024-03-14',
    photographer: 'Ignitia Photography Team',
    likes: 312,
    description: 'Dynamic dance performance showcasing traditional and contemporary fusion'
  },
  {
    id: 4,
    src: 'http://localhost:3001/assets/image_1762942966096.png',
    title: 'Acoustic Solo Performance',
    category: 'Cultural',
    date: '2024-03-17',
    photographer: 'Ignitia Photography Team',
    likes: 156,
    description: 'Intimate acoustic guitar performance creating a magical atmosphere'
  },
  {
    id: 5,
    src: 'http://localhost:3001/assets/image_1762943836825.png',
    title: 'Fashion Show Finale',
    category: 'Cultural',
    date: '2024-03-18',
    photographer: 'Ignitia Photography Team',
    likes: 278,
    description: 'Grand finale of the fashion show featuring elegant evening wear'
  }
];

const categories = ['All', 'Cultural', 'Technical', 'Sports', 'Literary', 'Awards'];

export default function Gallery() {
  const [images, setImages] = useState(galleryImages);
  const [filteredImages, setFilteredImages] = useState(galleryImages);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'masonry'>('masonry');
  const [selectedImage, setSelectedImage] = useState<typeof galleryImages[0] | null>(null);
  const [likedImages, setLikedImages] = useState<Set<number>>(new Set());
  const [isLoading, setIsLoading] = useState(false);
  // Infinite scroll for loading more images
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  // Intersection Observer for infinite scroll
  useEffect(() => {
    if (!loadMoreRef.current || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoading) {
          setIsLoading(true);
          // Simulate loading more images
          setTimeout(() => {
            setPage(prev => prev + 1);
            setIsLoading(false);
            // Simulate end of data after 3 pages
            if (page >= 3) setHasMore(false);
          }, 1000);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [hasMore, isLoading, page]);

  // Filter images based on category and search term
  useEffect(() => {
    let filtered = images;
    
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(img => img.category === selectedCategory);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(img => 
        img.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        img.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        img.photographer.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredImages(filtered);
  }, [selectedCategory, searchTerm, images]);

  const handleLike = (imageId: number) => {
    const newLikedImages = new Set(likedImages);
    if (newLikedImages.has(imageId)) {
      newLikedImages.delete(imageId);
    } else {
      newLikedImages.add(imageId);
    }
    setLikedImages(newLikedImages);
  };

  const openLightbox = (image: typeof galleryImages[0]) => {
    setSelectedImage(image);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'unset';
  };

  const navigateImage = (direction: 'prev' | 'next') => {
    if (!selectedImage) return;
    
    const currentIndex = filteredImages.findIndex(img => img.id === selectedImage.id);
    let newIndex;
    
    if (direction === 'prev') {
      newIndex = currentIndex > 0 ? currentIndex - 1 : filteredImages.length - 1;
    } else {
      newIndex = currentIndex < filteredImages.length - 1 ? currentIndex + 1 : 0;
    }
    
    setSelectedImage(filteredImages[newIndex]);
  };

  // Accessibility: Handle escape key for lightbox
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!selectedImage) return;
      
      switch (e.key) {
        case 'Escape':
          closeLightbox();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          navigateImage('prev');
          break;
        case 'ArrowRight':
          e.preventDefault();
          navigateImage('next');
          break;
        case 'Home':
          e.preventDefault();
          setSelectedImage(filteredImages[0]);
          break;
        case 'End':
          e.preventDefault();
          setSelectedImage(filteredImages[filteredImages.length - 1]);
          break;
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [selectedImage, filteredImages]);

  return (
    <div className="min-h-screen relative">
      {/* Northern Lights Background */}
      <NorthernLightsBackground />
      
      {/* Content */}
      <div className="relative z-10 pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          {/* Header */}
          <div className="text-center mb-12 animate-fade-in-down">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Camera className="w-8 h-8 text-primary animate-pulse" />
              <Sparkles className="w-6 h-6 text-accent animate-pulse" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold gradient-text mb-4" style={{ fontFamily: 'Orbitron, sans-serif' }}>
              Ignitia Gallery
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Capturing the magic moments of our techno-cultural festival
            </p>
          </div>

          {/* Controls */}
          <div className="mb-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="glass p-6 rounded-2xl border border-primary/20 backdrop-blur-sm">
              <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
                {/* Search */}
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search images..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 border-primary/20 focus:border-primary bg-background/50"
                  />
                </div>

                {/* Category Filter */}
                <div className="flex gap-2 flex-wrap">
                  {categories.map((category) => (
                    <Button
                      key={category}
                      variant={selectedCategory === category ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory(category)}
                      className={`${
                        selectedCategory === category
                          ? 'bg-gradient-to-r from-primary to-accent text-white'
                          : 'border-primary/30 hover:border-primary hover:bg-primary/10'
                      } transition-all duration-300`}
                    >
                      {category}
                    </Button>
                  ))}
                </div>

                {/* View Mode Toggle */}
                <div className="flex gap-2">
                  <Button
                    variant={viewMode === 'masonry' ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode('masonry')}
                    className="border-primary/30"
                  >
                    <Grid className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'grid' ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                    className="border-primary/30"
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Gallery Grid */}
          <div className="animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            {filteredImages.length === 0 ? (
              <div className="text-center py-20">
                <Camera className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                <h3 className="text-xl font-semibold text-muted-foreground mb-2">No images found</h3>
                <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
              </div>
            ) : (
              <div className={viewMode === 'masonry' ? 'masonry-grid' : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'}>
                {filteredImages.map((image, index) => (
                  <div
                    key={image.id}
                    className={`${viewMode === 'masonry' ? 'masonry-item' : ''} stagger-animation group`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <Card className="overflow-hidden border-primary/10 bg-card/80 backdrop-blur-sm gallery-image-hover cursor-pointer">
                      <div className="relative">
                        <img
                          src={image.src}
                          alt={image.title}
                          className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-110 gallery-image"
                          onClick={() => openLightbox(image)}
                          loading="lazy"
                        />
                        
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="absolute bottom-4 left-4 right-4">
                            <h3 className="text-white font-semibold mb-1">{image.title}</h3>
                            <p className="text-white/80 text-sm">{image.description}</p>
                          </div>
                          
                          <div className="absolute top-4 right-4 flex gap-2">
                            <Button
                              size="sm"
                              variant="secondary"
                              className="bg-black/50 hover:bg-black/70 text-white border-none"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleLike(image.id);
                              }}
                            >
                              <Heart className={`w-4 h-4 ${likedImages.has(image.id) ? 'fill-red-500 text-red-500' : ''}`} />
                            </Button>
                            <Button
                              size="sm"
                              variant="secondary"
                              className="bg-black/50 hover:bg-black/70 text-white border-none"
                              onClick={(e) => {
                                e.stopPropagation();
                                openLightbox(image);
                              }}
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>

                        {/* Category Badge */}
                        <Badge 
                          className="absolute top-4 left-4 bg-primary/90 text-white"
                          variant="secondary"
                        >
                          {image.category}
                        </Badge>
                      </div>
                      
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            {new Date(image.date).toLocaleDateString()}
                          </div>
                          <div className="flex items-center gap-2">
                            <Heart className="w-4 h-4" />
                            {image.likes}
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mt-2">
                          by {image.photographer}
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                ))}
                
                {/* Loading More Indicator */}
                {hasMore && (
                  <div ref={loadMoreRef} className={`${viewMode === 'masonry' ? 'masonry-item' : 'col-span-full'} flex justify-center py-8`}>
                    {isLoading ? (
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                        <span>Loading more images...</span>
                      </div>
                    ) : (
                      <div className="text-muted-foreground">Scroll to load more</div>
                    )}
                  </div>
                )}
                
                {!hasMore && filteredImages.length > 0 && (
                  <div className={`${viewMode === 'masonry' ? 'masonry-item' : 'col-span-full'} text-center py-8 text-muted-foreground`}>
                    <Camera className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p>You've reached the end of our gallery</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="lightbox-title"
          aria-describedby="lightbox-description"
        >
          <div className="relative max-w-6xl max-h-full w-full">
            {/* Close Button */}
            <Button
              variant="secondary"
              size="icon"
              className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 text-white border-none"
              onClick={closeLightbox}
            >
              <X className="w-6 h-6" />
            </Button>

            {/* Navigation Buttons */}
            <Button
              variant="secondary"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white border-none"
              onClick={() => navigateImage('prev')}
            >
              <ChevronLeft className="w-6 h-6" />
            </Button>
            
            <Button
              variant="secondary"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white border-none"
              onClick={() => navigateImage('next')}
            >
              <ChevronRight className="w-6 h-6" />
            </Button>

            {/* Image */}
            <div className="flex flex-col lg:flex-row gap-6 h-full">
              <div className="flex-1 flex items-center justify-center">
                <img
                  src={selectedImage.src}
                  alt={selectedImage.title}
                  className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
                />
              </div>
              
              {/* Image Info */}
              <div className="lg:w-80 glass p-6 rounded-2xl border border-primary/20 backdrop-blur-sm">
                <h2 id="lightbox-title" className="text-2xl font-bold mb-4 gradient-text">{selectedImage.title}</h2>
                <p id="lightbox-description" className="text-muted-foreground mb-4">{selectedImage.description}</p>
                
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2">
                    <Camera className="w-4 h-4 text-primary" />
                    <span>by {selectedImage.photographer}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-primary" />
                    <span>{new Date(selectedImage.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Heart className="w-4 h-4 text-primary" />
                    <span>{selectedImage.likes} likes</span>
                  </div>
                </div>

                <div className="flex gap-2 mt-6">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 border-primary/30 hover:border-primary"
                    onClick={() => handleLike(selectedImage.id)}
                  >
                    <Heart className={`w-4 h-4 mr-2 ${likedImages.has(selectedImage.id) ? 'fill-red-500 text-red-500' : ''}`} />
                    {likedImages.has(selectedImage.id) ? 'Liked' : 'Like'}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-primary/30 hover:border-primary"
                  >
                    <Share2 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-primary/30 hover:border-primary"
                  >
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
