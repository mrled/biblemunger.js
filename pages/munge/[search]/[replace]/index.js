import { useRouter } from "next/router";

export default function SearchReplace() {
  const router = useRouter();
  const { search, replace } = router.query;

  return (
    <div>
      <p className="text-xl bold">
        {search} ⇒ {replace}
      </p>
    </div>
  );
}
