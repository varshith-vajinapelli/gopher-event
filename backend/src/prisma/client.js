const { PrismaClient, RsvpStatus } = require('@prisma/client')

const prisma = new PrismaClient();
prisma.RsvpStatus = RsvpStatus

module.exports = prisma;