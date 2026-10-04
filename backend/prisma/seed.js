require('dotenv').config()

const prisma = require('../src/prisma/client')
const { generateEmbedding } = require('../src/utils/embedding')
const eventRepo = require('../src/repositories/event.repo')

let nextDay = 1

async function prepareEvent({ data, durationHours = 2 }) {
    const startsAt = new Date()
    startsAt.setUTCDate(startsAt.getUTCDate() + nextDay)
    startsAt.setUTCHours(23, 0, 0, 0)
    nextDay += 1
    const endsAt = new Date(startsAt.getTime() + durationHours * 60 * 60 * 1000)

    const text = 'Title: ' + data.title + ' Description: ' + data.description + ' Venue: ' + data.venue
    const embedding = await generateEmbedding(text, 'RETRIEVAL_DOCUMENT')

    console.log('Generated embedding: ' + data.title)
    return { data: { ...data, startsAt, endsAt }, embedding }
}

// Unsplash direct image URLs - free to use, no API key needed
const IMAGES = {
    techMeetup: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80',
    aiWorkshop: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&q=80',
    startupNight: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&q=80',
    leetcode: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80',
    hackathon: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80',
    careerFair: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&q=80',
    openSource: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80',
    mixer: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&q=80',
}

async function main() {
    console.log('🌱 Seeding database with dummy data...')

    // ---------- USERS ----------
    const users = await Promise.all([
        prisma.user.upsert({
            where: { email: 'vajin001@umn.edu' },
            update: {},
            create: {
                firstName: 'Varshith',
                lastName: 'Vajinapelli',
                email: 'vajin001@umn.edu',
                password: 'hashed-password-1',
                isVerified: true,
                isOrganizer: true,
            },
        }),
        prisma.user.upsert({
            where: { email: 'bob@umn.edu' },
            update: {},
            create: {
                firstName: 'Bob',
                lastName: 'Smith',
                email: 'bob@umn.edu',
                password: 'hashed-password-2',
                isVerified: true,
                isOrganizer: true,
            },
        }),
        prisma.user.upsert({
            where: { email: 'alice@umn.edu' },
            update: {},
            create: {
                firstName: 'Alice',
                lastName: 'Johnson',
                email: 'alice@umn.edu',
                password: 'hashed-password-3',
                isVerified: true,
                isOrganizer: true,
            },
        }),
        prisma.user.upsert({
            where: { email: 'rahul@umn.edu' },
            update: {},
            create: {
                firstName: 'Rahul',
                lastName: 'Kumar',
                email: 'rahul@umn.edu',
                password: 'hashed-password-4',
                isVerified: true,
                isOrganizer: true,
            },
        }),
        prisma.user.upsert({
            where: { email: 'sneha@umn.edu' },
            update: {},
            create: {
                firstName: 'Sneha',
                lastName: 'Patel',
                email: 'sneha@umn.edu',
                password: 'hashed-password-5',
                isVerified: true,
                isOrganizer: true,
            },
        }),
    ])

    const [varshith, bob, alice, rahul, sneha] = users

    // ---------- EVENTS ----------
    const events = await Promise.all([
        prepareEvent({
            data: {
                title: 'Gopher Tech Meetup',
                capacity: 80,
                description: 'A casual meetup for CS students to connect, share side projects, and talk internships and full-time opportunities. Lightning talks welcome, sign up at the door.',
                venue: 'Coffman Memorial Union, Great Hall',
                thumbnailUrl: IMAGES.techMeetup,
                bannerUrl: IMAGES.techMeetup,
                creatorId: varshith.id,
            },
        }),
        prepareEvent({
            data: {
                title: 'AI & ML Workshop',
                capacity: 30,
                description: 'Hands-on introduction to machine learning. We will build a simple classifier from scratch using Python and scikit-learn. No prior ML experience needed, just bring your laptop.',
                venue: 'Keller Hall, Room 3-180',
                thumbnailUrl: IMAGES.aiWorkshop,
                bannerUrl: IMAGES.aiWorkshop,
                creatorId: alice.id,
            },
        }),
        prepareEvent({
            data: {
                title: 'Startup Networking Night',
                capacity: 100,
                description: 'Meet founders, builders, and investors from the Twin Cities startup scene. Come with your elevator pitch or just come to listen. Drinks and snacks provided.',
                venue: 'McNamara Alumni Center',
                thumbnailUrl: IMAGES.startupNight,
                bannerUrl: IMAGES.startupNight,
                creatorId: rahul.id,
            },
        }),
        prepareEvent({
            data: {
                title: 'LeetCode Study Jam',
                capacity: 24,
                description: 'Weekly group problem solving session focused on trees and graphs this week. Bring your laptop, we work through problems together and review solutions as a group.',
                venue: 'Walter Library, Room 402',
                thumbnailUrl: IMAGES.leetcode,
                bannerUrl: IMAGES.leetcode,
                creatorId: varshith.id,
            },
        }),
        prepareEvent({
            durationHours: 24,
            data: {
                title: 'Fall Hackathon 2026',
                capacity: 160,
                description: 'A 24-hour hackathon where teams of up to 4 build projects from scratch. Prizes for best overall, best social impact, and best use of AI. Food and drinks provided throughout.',
                venue: 'Coffman Memorial Union, Mississippi Room',
                thumbnailUrl: IMAGES.hackathon,
                bannerUrl: IMAGES.hackathon,
                creatorId: bob.id,
            },
        }),
        prepareEvent({
            data: {
                title: 'CSE Career Fair Prep Workshop',
                capacity: 50,
                description: 'Learn how to craft a standout resume, nail your elevator pitch, and approach recruiters confidently. Hosted by the CSE Student Board with guest speakers from Google and Cloudflare.',
                venue: 'Keller Hall, Room 3-125',
                thumbnailUrl: IMAGES.careerFair,
                bannerUrl: IMAGES.careerFair,
                creatorId: sneha.id,
            },
        }),
        prepareEvent({
            durationHours: 6,
            data: {
                title: 'Open Source Contribution Sprint',
                capacity: 35,
                description: 'A 6-hour open source sprint where students contribute to real GitHub repositories. Startup maintainers will be on-site to review pull requests live.',
                venue: 'Shepherd Labs, Room 131',
                thumbnailUrl: IMAGES.openSource,
                bannerUrl: IMAGES.openSource,
                creatorId: alice.id,
            },
        }),
        prepareEvent({
            data: {
                title: 'International Student Mixer',
                capacity: 120,
                description: 'A casual welcome mixer for all international students. Meet peers, learn about campus resources, and connect with student organizations. Refreshments provided.',
                venue: 'Coffman Memorial Union, Sky Hall',
                thumbnailUrl: IMAGES.mixer,
                bannerUrl: IMAGES.mixer,
                creatorId: rahul.id,
            },
        }),
        prepareEvent({
            data: {
                title: 'Dosa Night: South Indian Food Social',
                description: 'Enjoy freshly made dosa, coconut chutney, and sambar with the South Asian student community. Learn about South Indian cooking and meet friends over a vegetarian dinner. Food is free for registered students.',
                venue: 'Coffman Memorial Union, Great Hall',
                thumbnailUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80',
                capacity: 90,
                creatorId: rahul.id,
            },
        }),
        prepareEvent({
            data: {
                title: 'Free Pizza and Board Games',
                description: 'Take a study break with free pizza, snacks, and tabletop games. Play Catan, chess, and cooperative board games in a relaxed student hangout. Come alone or bring friends; we will help you find a table.',
                venue: 'Coffman Memorial Union, Game Room',
                thumbnailUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&q=80',
                capacity: 70,
                creatorId: bob.id,
            },
        }),
        prepareEvent({
            data: {
                title: 'Beginner Volleyball Open Gym',
                description: 'Play friendly indoor volleyball with other students. Beginners can learn serving, passing, and teamwork before joining rotating teams. No experience needed; equipment is provided for this recreational sports session.',
                venue: 'University Recreation and Wellness Center, Court 2',
                thumbnailUrl: 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=800&q=80',
                capacity: 24,
                creatorId: sneha.id,
            },
        }),
        prepareEvent({
            durationHours: 1,
            data: {
                title: 'Morning Yoga and Mindfulness',
                description: 'Relax with gentle yoga stretches, breathing exercises, and guided meditation. This beginner wellness class focuses on stress relief and taking a calm break from school. Bring a mat and comfortable clothes.',
                venue: 'University Recreation and Wellness Center, Studio A',
                thumbnailUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80',
                capacity: 18,
                creatorId: alice.id,
            },
        }),
        prepareEvent({
            data: {
                title: 'Watercolor Painting Workshop',
                description: 'Make your own watercolor artwork in a small beginner art class. Learn color mixing, brush techniques, and painting a landscape. All supplies are included; no artistic experience is required.',
                venue: 'Regis Center for Art, Studio 120',
                thumbnailUrl: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&q=80',
                capacity: 12,
                creatorId: sneha.id,
            },
        }),
        prepareEvent({
            data: {
                title: 'Student Acoustic Open Mic',
                description: 'Hear live music, acoustic guitar, singing, and spoken-word poetry from student performers. Sign up to share a song or come enjoy a relaxed evening of local talent. All genres and experience levels are welcome.',
                venue: 'Coffman Memorial Union, Whole Music Club',
                thumbnailUrl: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=800&q=80',
                capacity: 110,
                creatorId: bob.id,
            },
        }),
        prepareEvent({
            durationHours: 3,
            data: {
                title: 'Mississippi River Trail Walk',
                description: 'Explore the river trails with a student walking group. Enjoy fresh air, easy hiking, and scenic views while meeting other outdoor enthusiasts. Wear walking shoes and bring water; this is a relaxed beginner outing.',
                venue: 'East River Flats Park, Main Entrance',
                thumbnailUrl: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80',
                capacity: 25,
                creatorId: varshith.id,
            },
        }),
        prepareEvent({
            durationHours: 3,
            data: {
                title: 'Community Food Pantry Volunteer Day',
                description: 'Help sort groceries, pack meal kits, and support neighbors experiencing food insecurity. Work with other students on a community service project. Volunteers receive a short orientation and all necessary supplies.',
                venue: 'Coffman Memorial Union, Student Food Pantry',
                thumbnailUrl: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=800&q=80',
                capacity: 20,
                creatorId: rahul.id,
            },
        }),
        prepareEvent({
            data: {
                title: 'Campus Photography Walk',
                description: 'Practice taking photos of campus architecture and nature with a student photography group. Learn composition, lighting, and creative framing. Phone cameras are welcome, and beginners can get feedback on their pictures.',
                venue: 'Northrop Mall, Front Steps',
                thumbnailUrl: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&q=80',
                capacity: 16,
                creatorId: alice.id,
            },
        }),
        prepareEvent({
            durationHours: 3,
            data: {
                title: 'International Film and Discussion Night',
                description: 'Watch an international film with fellow cinema fans, followed by a friendly discussion about storytelling and culture. Subtitles are provided. Enjoy popcorn and discover a movie you might not see at a mainstream theater.',
                venue: 'Coffman Memorial Union, Theater',
                thumbnailUrl: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&q=80',
                capacity: 200,
                creatorId: sneha.id,
            },
        }),
        prepareEvent({
            data: {
                title: 'Spanish Conversation Cafe',
                description: 'Practice speaking Spanish in a welcoming language exchange. Chat with other learners and native speakers over coffee, play vocabulary games, and build confidence. All proficiency levels are welcome.',
                venue: 'Folwell Hall, Room 108',
                thumbnailUrl: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=800&q=80',
                capacity: 28,
                creatorId: alice.id,
            },
        }),
        prepareEvent({
            data: {
                title: 'Student Book Club: Mystery and Fiction',
                description: 'Discuss mystery novels and contemporary fiction with fellow readers. Share recommendations, talk about characters and plot twists, and choose our next book. New members are welcome even if they have not finished the book.',
                venue: 'Walter Library, Reading Room',
                thumbnailUrl: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=800&q=80',
                capacity: 15,
                creatorId: bob.id,
            },
        }),
    ])

    // Replace events only after all Gemini requests succeed.
    await prisma.userEvent.deleteMany()
    await prisma.event.deleteMany()

    for (const event of events) {
        await eventRepo.createEvent(event.data, event.embedding)
        console.log('Created event: ' + event.data.title)
    }

    await prisma.event.updateMany({ data: { totalRSVPs: 0 } })

    console.log('Seed complete: ' + events.length + ' upcoming events with embeddings. User accounts preserved.')

}

main()
    .catch((e) => {
        console.error('❌ Seeding failed:', e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
