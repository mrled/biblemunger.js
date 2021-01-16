import Link from "next/link";

export function InternalLink({ href, children }) {
  return (
    <Link href={href}>
      <a className="text-blue-600">{children}</a>
    </Link>
  );
}

export function ExternalLink({ href, children }) {
  return (
    <a href={href} className="text-blue-600">
      {children}
    </a>
  );
}
