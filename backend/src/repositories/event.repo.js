const prisma = require('../prisma/client')


async function createEvent(eventData) {
    return prisma.event.create({
        data: {
            title: eventData.title,
            description: eventData.description,
            venue: eventData.venue,
            thumbnailUrl: eventData.thumbnailUrl,
            bannerUrl: eventData.bannerUrl,
            startsAt: new Date(eventData.startsAt),
            endsAt: eventData.endsAt ? new Date(eventData.endsAt) : undefined,
            capacity: eventData.capacity,
            creatorId: eventData.creatorId
        },
        select: {
            publicId: true,
            title: true,
            description: true,
            venue: true,
            thumbnailUrl: true,
            bannerUrl: true,
            startsAt: true,
            endsAt: true,
            creator: {
                select: {
                    firstName: true,
                    lastName: true
                }
            }
        }
    })
}
async function updateEvent(eventData) {
    const event = await findByPublicIdAndCreatorId(eventData.publicId, eventData.creatorId)

    if (!event) {
        const err = new Error('Event not found')
        err.code = 'EVENT_NOT_FOUND'
        throw err
    }

    return prisma.event.update({
        where: {
            id: event.id
        },
        data: {
            title: eventData.title,
            description: eventData.description,
            venue: eventData.venue,
            thumbnailUrl: eventData.thumbnailUrl,
            bannerUrl: eventData.bannerUrl,
            startsAt: new Date(eventData.startsAt),
            endsAt: eventData.endsAt ? new Date(eventData.endsAt) : null
        },
        select: {
            publicId: true,
            title: true,
            description: true,
            venue: true,
            thumbnailUrl: true,
            bannerUrl: true,
            startsAt: true,
            endsAt: true
        }
    })
}

/*
Please change the lse to gte or else you will only see past events not current events

*/
async function getEvents(searchString) {
    return prisma.event.findMany({
        where: {
            startsAt: {
                gte: new Date()
            },
            title: {
                contains: searchString,
                mode: 'insensitive'
            }

        },
        orderBy: {
            startsAt: 'asc'
        },
        select: {
            publicId: true,
            title: true,
            venue: true,
            thumbnailUrl: true,
            startsAt: true,
            endsAt: true,

        }
    })
}

async function findEventByPublicId(publicId) {
    return prisma.event.findUnique({
        where: {
            publicId: publicId
        },
        select: {
            id: false,
            publicId: true,
            title: true,
            description: true,
            venue: true,
            thumbnailUrl: true,
            bannerUrl: true,
            startsAt: true,
            endsAt: true,
            createdAt: true,
            creator: {
                select: {
                    id: true,
                    firstName: true,
                    lastName: true
                }
            },
            capacity: true,
            totalRSVPs: true
        }
    })
}
async function findByPublicId(publicId) {
    return prisma.event.findUnique({
        where: { publicId }
    })
}

async function findByPublicIdAndCreatorId(publicId, creatorId) {
    return prisma.event.findFirst({
        where: {
            publicId,
            creatorId
        }
    })
}


module.exports = {
    createEvent,
    updateEvent,
    getEvents,
    findEventByPublicId,
    findByPublicId,
    findByPublicIdAndCreatorId
};
