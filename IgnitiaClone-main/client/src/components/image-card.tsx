import type { ImagePlaceholder } from "@/lib/placeholder-images";

type ImageCardProps = {
  image: ImagePlaceholder;
};

export default function ImageCard({ image }: ImageCardProps) {
  return (
    <img
      src={image.imageUrl}
      alt={image.title}
      className="w-full h-full object-cover"
      data-ai-hint={image.imageHint}
    />
  );
}