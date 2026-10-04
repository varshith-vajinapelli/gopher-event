const prisma = require('../prisma/client')

async function findByEmail(email) {
    return await prisma.user.findUnique({
        where: { email }
    })
}

async function updateUserVerifiedStatus(email, isVerified) {
    return await prisma.user.update({
        where: { email },
        data: { isVerified }
    })
}

async function createUser(data) {
    return await prisma.user.create({
        data
    })
}

module.exports = {
    findByEmail, createUser, updateUserVerifiedStatus
}
