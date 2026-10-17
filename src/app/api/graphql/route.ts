import { createYoga } from "graphql-yoga";
import { schema } from "@/graphql/schema";

export const dynamic = "force-dynamic";

const yoga = createYoga({
  schema,
  graphqlEndpoint: "/api/graphql",
  fetchAPI: { Request, Response },
});

const handle = (request: Request) => yoga.fetch(request);

export { handle as GET, handle as POST, handle as OPTIONS };
