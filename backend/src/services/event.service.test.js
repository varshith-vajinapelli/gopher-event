jest.mock('../repositories/event.repo', () => ({ findByPublicId: jest.fn() }))
jest.mock('../repositories/userEvent.repo', () => ({
    exists: jest.fn(),
    createRegistration: jest.fn()
}))

const eventRepo = require('../repositories/event.repo')
const userEventRepo = require('../repositories/userEvent.repo')
const eventService = require('./event.service')

let event

beforeEach(() => {
    jest.resetAllMocks()
    event = {
        id: 1,
        publicId: 'event-public-id',
        startsAt: new Date(Date.now() + 60000),
        capacity: 10,
        totalRSVPs: 9
    }
    eventRepo.findByPublicId.mockResolvedValue(event)
    userEventRepo.exists.mockResolvedValue(false)
})

test('registers for the last available seat and returns the updated count and token', async () => {
    userEventRepo.createRegistration.mockImplementation(async (userId, eventId, qrToken) => ({
        status: 'REGISTERED',
        qrToken,
        registered_at: new Date(),
        totalRSVPs: 10
    }))

    const result = await eventService.registerUserForEvent({ userId: 2, publicId: event.publicId })

    expect(result.totalRSVPs).toBe(10)
    expect(result.status).toBe('REGISTERED')
    expect(result.qrToken).toMatch(/^[A-Z0-9]{6}$/)
    expect(userEventRepo.createRegistration).toHaveBeenCalledTimes(1)
    expect(userEventRepo.createRegistration).toHaveBeenCalledWith(2, 1, result.qrToken)
})

test.each(['at start time', 'after start time'])('rejects RSVP %s without writing', async (timing) => {
    jest.useFakeTimers()
    try {
        event.startsAt = new Date(Date.now() - (timing === 'after start time' ? 1000 : 0))
        await expect(eventService.registerUserForEvent({ userId: 2, publicId: event.publicId }))
            .rejects.toMatchObject({ code: 'EVENT_STARTED' })
        expect(userEventRepo.createRegistration).not.toHaveBeenCalled()
    } finally {
        jest.useRealTimers()
    }
})

test.each([10, 11])('rejects RSVP with %i seats filled without writing', async (count) => {
    event.totalRSVPs = count
    await expect(eventService.registerUserForEvent({ userId: 2, publicId: event.publicId }))
        .rejects.toMatchObject({ code: 'EVENT_FULL' })
    expect(userEventRepo.createRegistration).not.toHaveBeenCalled()
})

test('rejects an existing registration without incrementing the count', async () => {
    userEventRepo.exists.mockResolvedValue(true)
    await expect(eventService.registerUserForEvent({ userId: 2, publicId: event.publicId }))
        .rejects.toMatchObject({ code: 'ALREADY_REGISTERED' })
    expect(userEventRepo.createRegistration).not.toHaveBeenCalled()
})

test('rejects a missing event without writing', async () => {
    eventRepo.findByPublicId.mockResolvedValue(null)
    await expect(eventService.registerUserForEvent({ userId: 2, publicId: event.publicId }))
        .rejects.toMatchObject({ code: 'EVENT_NOT_FOUND' })
    expect(userEventRepo.createRegistration).not.toHaveBeenCalled()
})
