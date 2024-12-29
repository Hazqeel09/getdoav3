import { Prisma } from "@prisma/client"

const userQuery = Prisma.validator<Prisma.UserFindFirstArgs>()({
  select: {id: true, email: true, username: true}
})

export type User = Prisma.UserGetPayload<typeof userQuery>
