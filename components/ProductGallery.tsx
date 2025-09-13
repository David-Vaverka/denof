import { cdn } from "../utils/image.ts";

interface Props {
  images: string[];
  index?: number;
}

export default function ProductGallery({ images, index = 0 }: Props) {
  const main = cdn(images[index], 800, 600);
  return (
    <div id="gallery" class="space-y-2">
      <img
        id="main-image"
        src={main}
        alt="product"
        class="w-full rounded"
        loading="lazy"
        decoding="async"
      />
      <div class="flex overflow-x-auto space-x-2">
        {images.map((img, i) => (
          <button
            key={img}
            type="button"
            class={`flex-shrink-0 w-20 h-20 rounded border ${
              i === index ? "border-blue-500 border-2" : "border-transparent"
            }`}
            hx-get={`/gallery?index=${i}`}
            hx-target="#gallery"
            hx-swap="outerHTML"
            aria-label={`Show image ${i + 1}`}
          >
            <img
              src={cdn(img, 100, 100)}
              alt="thumb"
              class="w-full h-full object-cover rounded"
              loading="lazy"
            />
          </button>
        ))}
      </div>
      <div class="flex justify-between">
        <button
          class="px-4 py-2 bg-blue-500 text-white rounded"
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
          class="px-4 py-2 bg-blue-500 text-white rounded"
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

