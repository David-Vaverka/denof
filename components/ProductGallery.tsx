export default function ProductGallery({ images }: { images: string[] }) {
  return (
    <div class="space-y-2">
      <img src={images[0]} alt="main" class="w-full rounded shadow" />
      <div class="grid grid-cols-5 gap-2">
        {images.slice(1).map((img) => (
          <img src={img} alt="thumb" class="w-full h-20 object-cover rounded border" />
        ))}
      </div>
    </div>
  );
}
