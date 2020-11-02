import { PrismaClient, PostStatus } from '@prisma/client'
import argon from 'argon2';

const prisma = new PrismaClient()

main().finally(prisma.$disconnect)

async function main() {
  let
    postWithAuthor,
    testPassword = 'password',
    testHash = await argon.hash(testPassword)

  postWithAuthor = await prisma.user.create({
    data: {
          name: 'Nancy',
          rating: 0.5,
          email: 'admin@example.com',
          roles: ['ADMIN'],
          password: testHash,
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
      password: testHash,
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
      password: testHash,
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
}
