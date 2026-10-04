# Event routes

Base path: `/events`

## GET `/events`

Returns upcoming events ordered by start date. Authentication is not required.

Optional query parameter: `search` searches event titles.

**Success: `200`**

```json
{
  "success": true,
  "events": []
}
```

## GET `/events/:publicId`

Returns one event by its UUID public ID. Authentication is not required.

Returns `400` for an invalid UUID and `404` if the event does not exist.

## POST `/events`

Creates an event. Requires a valid access token **and** an account with organizer status.

```json
{
  "title": "Startup Networking Night",
  "description": "Meet founders, students, and builders from across campus.",
  "venue": "Coffman Memorial Union",
  "thumbnailUrl": "https://example.com/thumbnail.jpg",
  "bannerUrl": "https://example.com/banner.jpg",
  "startsAt": "2026-08-15T17:00:00.000Z",
  "endsAt": "2026-08-15T20:00:00.000Z"
}
```

`bannerUrl` may be omitted or `null`. `endsAt` must be at or after `startsAt`, and the start time cannot be more than one hour in the past. Returns `201` with `{ "success": true, "event": {} }`.

Returns `400` for validation errors, `401` for missing/invalid authentication, and `403` for a non-organizer.

## PUT `/events/:publicId`

Updates an event. Requires a valid access token and the caller must own the event. The request body uses the same fields and validation as event creation.

Returns `200` with the updated event, `400` for invalid input or ID, and `404` when the event is not found for the current user.

## POST `/events/:publicId/rsvp`

Registers the authenticated user for an event. The request body is empty.

RSVP closes at the event start time or when `totalRSVPs` reaches `capacity`. Registration creation and the count increment use one Prisma nested write. Capacity is checked before the write; concurrent requests can still exceed capacity.

**Success: `201`**

```json
{
  "success": true,
  "message": "Registered for event",
  "registration": {
    "publicId": "550e8400-e29b-41d4-a716-446655440000",
    "status": "REGISTERED",
    "qrToken": "A1B2C3",
    "registeredAt": "2026-10-04T18:00:00.000Z"
  },
  "totalRSVPs": 1
}
```

Returns `400` for an invalid UUID, `401` for missing/invalid authentication, `404` when the event does not exist, and `409` when the user is already registered, the event has started, or the event is full.
