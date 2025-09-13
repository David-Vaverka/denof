export default function ProductGallery({ images }: { images: string[] }) {
  return (
    <div>
      <img src={images[0]} alt="main" class="img-fluid rounded mb-2" />
      <div class="row row-cols-5 g-2">
        {images.slice(1).map((img) => (
          <div class="col">
            <img src={img} alt="thumb" class="img-fluid rounded border" />
          </div>
        ))}
      </div>
    </div>
  );
}
