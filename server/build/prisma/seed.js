import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
    await prisma.post.deleteMany();
    await prisma.user.deleteMany();
    const alice = await prisma.user.create({
        data: { name: 'Alice' },
    });
    const bob = await prisma.user.create({
        data: {
            name: 'Bob',
        },
    });
    const post1 = await prisma.post.create({
        data: {
            body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque justo augue, feugiat vitae pulvinar a, euismod eu leo. Curabitur accumsan, risus vel sodales finibus, eros arcu efficitur enim, viverra ullamcorper velit tortor vitae nunc. Phasellus est tellus, porttitor sed condimentum vitae, rutrum at eros. Ut tristique malesuada porta.',
            title: 'Post 1',
        },
    });
    const post2 = await prisma.post.create({
        data: {
            body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque justo augue, feugiat vitae pulvinar a, euismod eu leo. Curabitur accumsan, risus vel sodales finibus, eros arcu efficitur enim, viverra ullamcorper velit tortor vitae nunc. Phasellus est tellus, porttitor sed condimentum vitae, rutrum at eros. Ut tristique malesuada porta.',
            title: 'Post 2',
        },
    });
    const comment1 = await prisma.comment.create({
        data: {
            message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            userId: alice.id,
            postId: post1.id,
        },
    });
    const comment2 = await prisma.comment.create({
        data: {
            message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            userId: bob.id,
            postId: post2.id,
        },
    });
}
main()
    .then(async () => {
    await prisma.$disconnect();
})
    .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
});
//# sourceMappingURL=seed.js.map