export default function ProductGallery({ images }: { images: string[] }) {
  return (
    <div>
      <img
        id="main-image"
        src={images[0]}
        alt="main"
        class="img-fluid rounded mb-2"
      />
      <div class="row row-cols-5 g-2">
        {images.map((img) => (
          <div class="col" key={img}>
            <button
              type="button"
              class="btn p-0 border-0"
              hx-get={`/image?src=${encodeURIComponent(img)}`}
              hx-target="#main-image"
              hx-swap="outerHTML"
            >
              <img src={img} alt="thumb" class="img-fluid rounded border" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
