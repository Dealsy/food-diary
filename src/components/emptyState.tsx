import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

export function EmptyState({
  cta,
  title,
  description,
  icon,
}: {
  cta?: React.ReactNode;
  title: string;
  description: string;
  icon: React.ReactNode;
}) {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">{icon}</EmptyMedia>
        <EmptyTitle>{title}</EmptyTitle>
        <EmptyDescription>{description}</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        {cta ?? (
          <Button variant="default" size="lg">
            Add Meal
          </Button>
        )}
      </EmptyContent>
    </Empty>
  );
}
