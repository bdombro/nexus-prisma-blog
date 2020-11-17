# Migration `20201117172154-sdf`

This migration has been generated by Brian at 11/17/2020, 11:21:54 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "User" ALTER COLUMN "password" DROP NOT NULL
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201117005659-remove-rating..20201117172154-sdf
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
@@ -14,9 +14,9 @@
   name      String?
   posts     Post[]
   roles     UserRole[]
   email     String @unique
-  password  String
+  password  String?
   @@index([email])
 }
```

