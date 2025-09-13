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
        class="w-full rounded mb-2"
      />
      <div class="grid grid-cols-5 gap-2">
        {images.map((img, i) => (
          <div key={img}>
            <button
              type="button"
              class="p-0 border-0"
              hx-get={`/gallery?index=${i}`}
              hx-target="#gallery"
              hx-swap="outerHTML"
            >
              <img
                src={img}
                alt="thumb"
                class={`w-full rounded border ${
                  i === index ? "border-blue-500 border-2" : ""
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
        class="flex justify-between mt-2"
      >
        <input type="hidden" name="index" value={index} />
        <button
          class="px-4 py-2 bg-blue-500 text-white rounded"
          name="dir"
          value="prev"
          aria-label="Previous"
        >
          ‹
        </button>
        <button
          class="px-4 py-2 bg-blue-500 text-white rounded"
          name="dir"
          value="next"
          aria-label="Next"
        >
          ›
        </button>
      </form>
    </div>
  );
}

