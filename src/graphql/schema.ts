import { createSchema } from "graphql-yoga";
import { desc, eq, sql } from "drizzle-orm";
import { getDb } from "@/db";
import { todos } from "@/db/schema";

type Todo = typeof todos.$inferSelect;

export const schema = createSchema({
  typeDefs: /* GraphQL */ `
    type Todo {
      id: Int!
      title: String!
      done: Boolean!
      createdAt: String!
    }

    type Query {
      todos: [Todo!]!
    }

    type Mutation {
      addTodo(title: String!): Todo!
      toggleTodo(id: Int!): Todo
      deleteTodo(id: Int!): Boolean!
    }
  `,
  resolvers: {
    Todo: {
      createdAt: (todo: Todo) => todo.createdAt.toISOString(),
    },
    Query: {
      todos: () => getDb().select().from(todos).orderBy(desc(todos.createdAt)),
    },
    Mutation: {
      addTodo: async (_: unknown, { title }: { title: string }) => {
        const [row] = await getDb().insert(todos).values({ title }).returning();
        return row;
      },
      toggleTodo: async (_: unknown, { id }: { id: number }) => {
        const [row] = await getDb()
          .update(todos)
          .set({ done: sql`not ${todos.done}` })
          .where(eq(todos.id, id))
          .returning();
        return row ?? null;
      },
      deleteTodo: async (_: unknown, { id }: { id: number }) => {
        const rows = await getDb().delete(todos).where(eq(todos.id, id)).returning();
        return rows.length > 0;
      },
    },
  },
});
