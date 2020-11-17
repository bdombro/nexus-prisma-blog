import { PrismaClient, PostStatus, UserRole } from '@prisma/client'

const prisma = new PrismaClient()

main().finally(prisma.$disconnect)

const passwordHash = '9b39911c178b3f399b5a8b4b2a57aee3f7c92de94ebadee6413e79ff977684dacb2542c1ebd631f824987bf7ae0ccf1212e0aa013b60b0efdbf5fff9737ff89c' // CoolPassword9

async function main() {
  let postWithAuthor;

  postWithAuthor = await prisma.user.create({
    data: {
          name: 'Nancy',
          email: 'admin@example.com',
          roles: [UserRole.ADMIN],
          password: passwordHash,
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
      email: 'editor@example.com',
      roles: [UserRole.EDITOR],
      password: passwordHash,
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
      email: 'author@example.com',
      roles: [UserRole.AUTHOR],
      password: passwordHash,
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
