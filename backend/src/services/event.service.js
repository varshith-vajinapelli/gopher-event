const { check } = require('zod')
const eventRepo = require('../repositories/event.repo')
const userEventRepo = require('../repositories/userEvent.repo')
const { generateQrToken } = require("../utils/qr.utils")

async function createEvent(eventData) {
    return eventRepo.createEvent(eventData)
};

async function updateEvent(eventData) {
    return eventRepo.updateEvent(eventData)
};

async function getEvents(searchString) {
    return eventRepo.getEvents(searchString)
}

async function getEventByPublicId(publicId) {
    return eventRepo.findEventByPublicId(publicId)
}

async function registerUserForEvent({ userId, publicId }) {
    const event = await eventRepo.findByPublicId(publicId)

    if (!event) {
        const err = new Error('Event not found')
        err.code = 'EVENT_NOT_FOUND'
        throw err
    }

    const alreadyRegistered = await userEventRepo.exists(userId, event.id)

    if (alreadyRegistered) {
        const err = new Error('User already registered for this event')
        err.code = 'ALREADY_REGISTERED'
        throw err
    }
    try {
        const qrToken = generateQrToken()
        const result = await userEventRepo.createRegistration(userId, event.id, qrToken)
        return { ...result, event }

    } catch (err) {
        if (err.code === 'P2002') {
            const e = new Error('User already registered for this event')
            e.code = 'ALREADY_REGISTERED'
            throw e
        }
        throw err
    }

}

/*
async function checkin(qrToken, scannerUserId) {
    const record = await prisma.userEventRepo(qrToken)

    if (!record) {
        const err = new Error('Invalid QR token')
        err.code = 'INVALID_QR_TOKEN'
        throw err
    }

    if (scannerUserId !== record.event.creatorId) {
        // Scanner is not the owner/organizer of this event
        const err = new Error('You are not authorized to check in attendees for this event');
        err.status = 403;
        err.code = 'UNAUTHORIZED_SCANNER';
        throw err;
    }

    const now = new Date()

    if (now < event.checkInStartsAt) {
        const err = new Error('Check-in has not started yet');
        err.status = 400;
        err.code = 'CHECKIN_NOT_STARTED';
        throw err;
    }

    // Check if the event has ALREADY ended
    if (now > event.endsAt) {
        const err = new Error('Event has already ended');
        err.status = 400;
        err.code = 'EVENT_ENDED';
        throw err;
    }
}
*/

module.exports = {
    createEvent,
    updateEvent,
    getEvents,
    getEventByPublicId,
    registerUserForEvent,
}
