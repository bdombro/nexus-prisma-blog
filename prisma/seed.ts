import { PrismaClient, PostStatus } from '@prisma/client'

main()

async function main() {
  const prisma = new PrismaClient()

  let postWithAuthor;

  postWithAuthor = await prisma.user.create({
    data: {
          name: 'Nancy',
          rating: 0.5,
          email: 'admin@example.com',
          roles: ['ADMIN'],
          password: '$2b$10$UAwotKUBOp8A4y5tmGIxuOpdm5fTfpSVjb2ULmEN3BYz1OkkvtVnq', // 'password' with 10 rounds bcrypt,
          posts: {
            create: [
              {
                title: 'post_1',
                status: PostStatus.PUBLISHED,
              },
            ],
          },
    },
  })
  console.log('added post with admin author:\n', postWithAuthor)

  postWithAuthor = await prisma.user.create({
    data: {
      name: 'Drew',
      rating: 0.5,
      email: 'editor@example.com',
      roles: ['EDITOR'],
      password: '$2b$10$UAwotKUBOp8A4y5tmGIxuOpdm5fTfpSVjb2ULmEN3BYz1OkkvtVnq', // 'password' with 10 rounds bcrypt,
      posts: {
        create: [
          {
            title: 'post_2',
            status: PostStatus.PUBLISHED,
          },
        ],
      },
    },
  })
  console.log('added post with editor author:\n', postWithAuthor)

  postWithAuthor = await prisma.user.create({
    data: {
      name: 'Pappy',
      rating: 0.5,
      email: 'author@example.com',
      roles: ['AUTHOR'],
      password: '$2b$10$UAwotKUBOp8A4y5tmGIxuOpdm5fTfpSVjb2ULmEN3BYz1OkkvtVnq', // 'password' with 10 rounds bcrypt,
      posts: {
        create: [
          {
            title: 'post_3',
            status: PostStatus.PUBLISHED,
          },
        ],
      },
    },
  })
  console.log('added post with author:\n', postWithAuthor)

  await prisma.disconnect()
}
