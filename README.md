# Blog

### Try It

```
docker run --detach --publish 5432:5432 -e POSTGRES_PASSWORD=postgres --name 'nexus-schema-plugin-prisma-blog' postgres:10.12
```

```
yarn migrate
yarn generate
yarn seed
```

```
yarn && yarn dev
```

Then try one of the queries in `examples.graphql`!
