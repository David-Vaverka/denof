interface Props {
  images: string[];
  index?: number;
}

export default function ProductGallery({ images, index = 0 }: Props) {
  return (
    <div id="gallery">
      <img
        id="main-image"
        src={images[index]}
        alt="main"
        class="img-fluid rounded mb-2"
      />
      <div class="row row-cols-5 g-2">
        {images.map((img, i) => (
          <div class="col" key={img}>
            <button
              type="button"
              class="btn p-0 border-0"
              hx-get={`/gallery?index=${i}`}
              hx-target="#gallery"
              hx-swap="outerHTML"
            >
              <img
                src={img}
                alt="thumb"
                class={`img-fluid rounded border ${
                  i === index ? "border-2 border-warning" : ""
                }`}
              />
            </button>
          </div>
        ))}
      </div>
      <form
        hx-post="/gallery"
        hx-target="#gallery"
        hx-swap="outerHTML"
        class="d-flex justify-content-between mt-2"
      >
        <input type="hidden" name="index" value={index} />
        <button
          class="btn btn-warning"
          name="dir"
          value="prev"
          aria-label="Previous"
        >
          <i class="bi bi-chevron-left text-white"></i>
        </button>
        <button
          class="btn btn-warning"
          name="dir"
          value="next"
          aria-label="Next"
        >
          <i class="bi bi-chevron-right text-white"></i>
        </button>
      </form>
    </div>
  );
}

