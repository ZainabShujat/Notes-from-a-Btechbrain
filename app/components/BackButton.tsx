"use client";
import { useRouter } from "next/navigation";
import Button from "./ui/Button";

export default function BackButton({ className = "" }: { className?: string }) {
  const router = useRouter();

  return (
    <Button
      variant="secondary"
      size="md"
      onClick={() => router.back()}
      className={className}
    >
      ← Back
    </Button>
  );
}
