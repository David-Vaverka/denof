import { cdn } from "../utils/image.ts";

interface Props {
  images: string[];
  index?: number;
}

export default function ProductGallery({ images, index = 0 }: Props) {
  const main = cdn(images[index], 500, 250);
  return (
    <div id="gallery" class="space-y-2">
      <div class="group overflow-hidden rounded">
        <img
          id="main-image"
          src={main}
          alt="product"
          width="500"
          height="250"
          class="w-full max-h-[250px] object-contain transition-transform duration-300 group-hover:scale-150"
          decoding="async"
        />
      </div>
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
              width="100"
              height="100"
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

