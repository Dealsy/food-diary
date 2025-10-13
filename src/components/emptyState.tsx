import { Grape } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

export function EmptyState({ cta }: { cta?: React.ReactNode }) {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Grape />
        </EmptyMedia>
        <EmptyTitle>No Meals Yet</EmptyTitle>
        <EmptyDescription>
          you haven't added any meals yet. Add a meal to get started.
        </EmptyDescription>
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
