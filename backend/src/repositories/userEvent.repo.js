const prisma = require('../prisma/client')

async function exists(userId, eventId) {
    const record = await prisma.userEvent.findUnique({
        where: {
            userId_eventId: {
                userId, eventId
            }
        }
    })
    return !!record
}
// TODO: Still need to complete? QrToken is optional right?
async function createRegistration(userId, eventId, qrToken) {
    return prisma.userEvent.create({
        data: {
            userId, eventId, qrToken, status: prisma.RsvpStatus.REGISTERED
        }
    })

}

// Ownership
/*
async function checkin(qrToken) {
    return prisma.userEvent.findUnique({
        where: { qrToken },
        include: {
            event: true
        }
    })
}
*/

module.exports = {
    exists,
    createRegistration
}
