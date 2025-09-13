import { cdn } from "../utils/image.ts";

interface Props {
  images: string[];
  index?: number;
}

export default function ProductGallery({ images, index = 0 }: Props) {
  const main = cdn(images[index], 500, 250);
  return (
    <div id="gallery" class="mb-3">
      <div class="overflow-hidden rounded mb-2">
        <img
          id="main-image"
          src={main}
          alt="product"
          width="500"
          height="250"
          class="img-fluid"
          decoding="async"
        />
      </div>
      <div class="d-flex overflow-auto gap-2 mb-2">
        {images.map((img, i) => (
          <button
            key={img}
            type="button"
            class={`p-0 border ${
              i === index ? "border-primary border-2" : "border-0"
            } bg-transparent`}
            hx-get={`/gallery?index=${i}`}
            hx-target="#gallery"
            hx-swap="outerHTML"
            aria-label={`Show image ${i + 1}`}
          >
            <img
              src={cdn(img, 100, 100)}
              alt="thumb"
              width="100"
              height="100"
              class="img-thumbnail"
              loading="lazy"
            />
          </button>
        ))}
      </div>
      <div class="d-flex justify-content-between">
        <button
          class="btn btn-primary"
          hx-post="/gallery"
          hx-vals={`{"dir":"prev","index":${index}}`}
          hx-target="#gallery"
          hx-swap="outerHTML"
          hx-trigger="click, keyup[key=='ArrowLeft'] from:window"
          aria-label="Previous image"
        >
          ‹
        </button>
        <button
          class="btn btn-primary"
          hx-post="/gallery"
          hx-vals={`{"dir":"next","index":${index}}`}
          hx-target="#gallery"
          hx-swap="outerHTML"
          hx-trigger="click, keyup[key=='ArrowRight'] from:window"
          aria-label="Next image"
        >
          ›
        </button>
      </div>
    </div>
  );
}

