# Migration `20201116223251-updatedat`

This migration has been generated by Brian at 11/16/2020, 4:32:51 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "public"."Post" ALTER COLUMN "updatedAt" DROP DEFAULT

ALTER TABLE "public"."Tag" ALTER COLUMN "updatedAt" DROP DEFAULT
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201116223236-dates..20201116223251-updatedat
--- datamodel.dml
+++ datamodel.dml
@@ -1,7 +1,7 @@
 datasource db {
   provider = "postgresql"
-  url = "***"
+  url = "***"
 }
 generator prisma_client {
   provider = "prisma-client-js"
@@ -29,9 +29,9 @@
 model Post {
   id       String     @default(cuid()) @id
   createdAt DateTime @default(now())
-  updatedAt DateTime @default(now())
+  updatedAt DateTime @updatedAt
   title    String
   tags     Tag[]
   blogId   Int?
   status   PostStatus
@@ -46,9 +46,9 @@
 model Tag {
   id     Int    @default(autoincrement()) @id
   createdAt DateTime @default(now())
-  updatedAt DateTime @default(now())
+  updatedAt DateTime @updatedAt
   value  String
   postId String?
   post   Post?  @relation(fields: [postId], references: [id])
 }
```

