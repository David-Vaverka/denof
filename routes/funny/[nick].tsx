import { PageProps } from "$fresh/server.ts";

export default function FunnyNamePage(props: PageProps) {
  const { nick } = props.params;
  return (
    <div class="p-6 space-y-4">
      <h1 class="text-2xl font-bold">Tvé vtipné jméno</h1>
      <p class="text-xl">{nick}</p>
      <a href="/name" class="text-blue-600 underline">Zkus jiné</a>
    </div>
  );
}
