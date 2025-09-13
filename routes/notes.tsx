import { Handlers, PageProps } from "$fresh/server.ts";

interface Note {
  text: string;
}

const NOTES_FILE = "./data/notes.json";

async function readNotes(): Promise<Note[]> {
  try {
    const data = await Deno.readTextFile(NOTES_FILE);
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function writeNotes(notes: Note[]) {
  await Deno.writeTextFile(NOTES_FILE, JSON.stringify(notes, null, 2));
}

export const handler: Handlers<Note[] | Note> = {
  async GET(_req, ctx) {
    const notes = await readNotes();
    return ctx.render(notes);
  },
  async POST(req) {
    const form = await req.formData();
    const text = form.get("text")?.toString().trim();
    if (!text) return new Response("", { status: 204 });
    const notes = await readNotes();
    notes.push({ text });
    await writeNotes(notes);
    return new Response(
      `<li class="list-group-item">${text}</li>`,
      { headers: { "Content-Type": "text/html" } },
    );
  },
};

export default function NotesPage({ data }: PageProps<Note[]>) {
  return (
    <div class="container py-4">
      <h1 class="h4 mb-3">Notes</h1>
      <form
        hx-post="/notes"
        hx-target="#notes"
        hx-swap="beforeend"
        class="mb-3"
      >
        <div class="input-group">
          <input name="text" class="form-control" placeholder="Write a note" />
          <button type="submit" class="btn btn-primary">Add</button>
        </div>
      </form>
      <ul id="notes" class="list-group">
        {data.map((n) => <li class="list-group-item">{n.text}</li>)}
      </ul>
    </div>
  );
}
