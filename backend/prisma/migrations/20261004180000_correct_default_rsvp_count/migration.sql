-- New events start without registrations.
ALTER TABLE "Event" ALTER COLUMN "totalRSVPs" SET DEFAULT 0;

-- Replace placeholder totals with actual registrations, excluding cancellations.
UPDATE "Event" AS event
SET "totalRSVPs" = (
    SELECT COUNT(*)::INTEGER
    FROM "UserEvent" AS registration
    WHERE registration."eventId" = event."id"
      AND registration."status" <> 'CANCELLED'
);
