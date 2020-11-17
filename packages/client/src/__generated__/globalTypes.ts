/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum PostStatus {
  DRAFT = "DRAFT",
  PUBLISHED = "PUBLISHED",
}

export enum UserRole {
  ADMIN = "ADMIN",
  AUTHOR = "AUTHOR",
  EDITOR = "EDITOR",
}

export interface PostCreateManyWithoutAuthorInput {
  create?: PostCreateWithoutAuthorInput[] | null;
  connect?: PostWhereUniqueInput[] | null;
}

export interface PostCreateWithoutAuthorInput {
  id?: string | null;
  createdAt?: any | null;
  updatedAt?: any | null;
  title: string;
  blogId?: number | null;
  status: PostStatus;
  tags?: TagCreateManyWithoutPostInput | null;
}

export interface PostWhereUniqueInput {
  id?: string | null;
}

export interface TagCreateManyWithoutPostInput {
  create?: TagCreateWithoutPostInput[] | null;
  connect?: TagWhereUniqueInput[] | null;
}

export interface TagCreateWithoutPostInput {
  createdAt?: any | null;
  updatedAt?: any | null;
  value: string;
}

export interface TagWhereUniqueInput {
  id?: number | null;
}

export interface UserCreateInput {
  id?: string | null;
  createdAt?: any | null;
  updatedAt?: any | null;
  name?: string | null;
  email: string;
  password: string;
  roles?: UserCreaterolesInput | null;
  posts?: PostCreateManyWithoutAuthorInput | null;
}

export interface UserCreaterolesInput {
  set: UserRole[];
}

//==============================================================
// END Enums and Input Objects
//==============================================================
