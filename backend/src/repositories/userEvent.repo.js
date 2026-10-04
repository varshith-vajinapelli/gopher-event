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
async function createRegistration(userId, eventId, qrToken) {
    const event = await prisma.event.update({
        where: { id: eventId },
        data: {
            totalRSVPs: { increment: 1 },
            userLinks: {
                create: {
                    userId,
                    qrToken,
                    status: prisma.RsvpStatus.REGISTERED
                }
            }
        },
        select: {
            totalRSVPs: true,
            userLinks: {
                where: { userId },
                select: {
                    status: true,
                    qrToken: true,
                    registered_at: true
                }
            }
        }
    })

    return { ...event.userLinks[0], totalRSVPs: event.totalRSVPs }
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
