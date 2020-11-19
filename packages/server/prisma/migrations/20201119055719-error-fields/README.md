# Migration `20201119055719-error-fields`

This migration has been generated by Brian at 11/18/2020, 11:57:19 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "ErrorLog" ADD COLUMN     "ip" TEXT NOT NULL,
ADD COLUMN     "userAgent" TEXT,
ADD COLUMN     "code" TEXT
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201119032442-initial..20201119055719-error-fields
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
@@ -31,10 +31,13 @@
   createdAt     DateTime @default(now())
   updatedAt     DateTime @updatedAt
   createdById   String?
   createdBy     User?    @relation(fields: [createdById], references: [id])
+  ip            String
+  userAgent     String?
   message       String
   stack         String?
+  code          String?
   reqBody       Json?
   resBody       Json?
 }
```

