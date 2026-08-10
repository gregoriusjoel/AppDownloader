import PlatformBadge from "./PlatformBadge";

export default function AndroidBadge({ platform }: { platform?: string }) {
  return <PlatformBadge platform={platform || "Android"} />;
}
