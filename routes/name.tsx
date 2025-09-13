import { Handlers, PageProps } from "$fresh/server.ts";
import { FUNNY_NAMES } from "../data/funny_names.ts";

interface Data { nick?: string }

export const handler: Handlers<Data> = {
  POST(req) {
    const idx = Math.floor(Math.random() * FUNNY_NAMES.length);
    const nick = FUNNY_NAMES[idx];
    const url = new URL(req.url);
    return Response.redirect(`${url.origin}/funny/${encodeURIComponent(nick)}`, 302);
  },
  GET(_req, ctx) {
    return ctx.render({});
  }
};

export default function NamePage(_props: PageProps<Data>) {
  return (
    <div class="p-6 space-y-4">
      <h1 class="text-2xl font-bold">Zadej své jméno</h1>
      <form method="POST" class="space-y-2">
        <input type="text" name="name" class="border p-2" placeholder="Tvé jméno" />
        <button type="submit" class="bg-blue-600 text-white px-3 py-1 rounded">Odeslat</button>
      </form>
    </div>
  );
}
