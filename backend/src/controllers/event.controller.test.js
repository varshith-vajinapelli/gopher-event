jest.mock('../services/event.service', () => ({ registerUserForEvent: jest.fn() }))
jest.mock('../utils/email', () => jest.fn())

const eventService = require('../services/event.service')
const SendEmail = require('../utils/email')
const eventController = require('./event.controller')

let req
let res

beforeEach(() => {
    jest.resetAllMocks()
    req = {
        params: { publicId: '550e8400-e29b-41d4-a716-446655440000' },
        user: { userId: 2, email: 'attendee@example.com' }
    }
    res = { status: jest.fn(), json: jest.fn() }
    res.status.mockReturnValue(res)
    SendEmail.mockResolvedValue({ error: null })
})

test('returns the registration, QR token, and updated count after RSVP', async () => {
    const registeredAt = new Date('2026-10-04T18:00:00.000Z')
    eventService.registerUserForEvent.mockResolvedValue({
        status: 'REGISTERED',
        qrToken: 'A1B2C3',
        registered_at: registeredAt,
        totalRSVPs: 10,
        event: {
            publicId: req.params.publicId,
            title: 'Campus event',
            venue: 'Coffman',
            startsAt: '2026-10-05T18:00:00.000Z'
        }
    })

    await eventController.registerUserForEvent(req, res)

    expect(res.status).toHaveBeenCalledWith(201)
    expect(res.json).toHaveBeenCalledWith({
        success: true,
        message: 'Registered for event',
        registration: {
            publicId: req.params.publicId,
            status: 'REGISTERED',
            qrToken: 'A1B2C3',
            registeredAt
        },
        totalRSVPs: 10
    })
})

test.each(['EVENT_STARTED', 'EVENT_FULL'])('returns 409 for %s without sending email', async (code) => {
    const error = new Error('RSVP closed')
    error.code = code
    eventService.registerUserForEvent.mockRejectedValue(error)

    await eventController.registerUserForEvent(req, res)

    expect(res.status).toHaveBeenCalledWith(409)
    expect(res.json).toHaveBeenCalledWith({ success: false, message: 'RSVP closed' })
    expect(SendEmail).not.toHaveBeenCalled()
})
