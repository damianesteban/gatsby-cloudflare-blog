---
title: "Constructing a Serverless GraphQL Yoga Server with TypeScript on Cloudflare Workers"
date: "2023-07-27"
template: post
---

Hello, friends! I'm thrilled to launch a series of blog posts focused on [Cloudflare Workers](https://workers.cloudflare.com/), an innovative platform that's revolutionizing the web development landscape.

Cloudflare Workers is a trailblazer in edge computing, executing code near the user for enhanced speed and security. It's like having a personal assistant and security guard for your web application, ensuring rapid and secure delivery. The next time I have the opportunity to build a platform from scratch, I plan to make heavy use of Cloudflare Workers. If you are interested in knowing more, please reach out to me 😉.

As a huge supporter of this platform, I'm eager to showcase its capabilities. In this series, we'll explore Cloudflare Workers, experiment with its features like [KV](https://developers.cloudflare.com/workers/runtime-apis/kv/), [Durable Objects](https://developers.cloudflare.com/workers/runtime-apis/durable-objects/), [Cloudflare Queues](https://developers.cloudflare.com/queues/), and [D1](https://developers.cloudflare.com/d1/).

In this inaugural post, I'll guide you through building a simple [GraphQL Yoga](https://the-guild.dev/graphql/yoga-server) server with [TypeScript](https://www.typescriptlang.org/) on Cloudflare Workers. Why? Because my passion for GraphQL is as strong as my admiration for Cloudflare Workers, and these two technologies harmonize perfectly.

Yoga, along with numerous other GraphQL Projects, is maintained by [The Guild](https://the-guild.dev/). Their approach to software design is outstanding and I am a big fan. In a subsequent post, I will integrate [GraphQL over SSE]( https://the-guild.dev/blog/graphql-over-sse) into our project.

In this tutorial, we've chosen to use 'animal rescues' as our API's data. This choice is not arbitrary; I am currently developing an open-source Animal Rescue & Shelter Management application. This project is a testament to my commitment to leveraging technology for social good, and it provides a practical context for this tutorial. By sharing this with you, I hope to inspire more engineers to contribute to open-source projects and use their skills to make a positive impact.

Let's do this.

## Step 1: Setting Up Your Project

Firstly, let's initiate our project with [c3](https://developers.cloudflare.com/pages/get-started/c3). Make sure to select "Hello World" for a blank slate and choose TypeScript.

```shell
npm create cloudflare
```

Next, install the necessary libraries:

```shell
npm install graphql graphql-yoga
```

## Step 2: Creating Your GraphQL Server

Create two new files, `src/schema.ts` and `src/data.ts`, and add the following code:

```typescript
// data.ts
// Type
export type AnimalRescue = {
	id: number;
	name: string;
	age: number;
	gender: string;
	species: 'CAT' | 'DOG';
	breed: string;
}
// Data Source
export const animalRescues: AnimalRescue[] = [
	{
		id: 1,
		name: "Max",
		age: 3,
		gender: "Male",
		species: "CAT",
		breed: "Siamese"
	},
	{
		id: 2,
		name: "Bella",
		age: 2,
		gender: "Female",
		species: "DOG",
		breed: "Labrador Retriever"
	},
	{
		id: 3,
		name: "Charlie",
		age: 1,
		gender: "Male",
		species: "CAT",
		breed: "Persian"
	},
	{
		id: 4,
		name: "Lucy",
		age: 4,
		gender: "Female",
		species: "DOG",
		breed: "Golden Retriever"
	},
];
```

```typescript
// schema.ts
import { createSchema } from "graphql-yoga";
import { animalRescues } from "./data";

// GraphQL schema w/ types and resolvers
export const schema = createSchema({
	typeDefs: `
		enum AnimalRescueSpecies {
			DOG
			CAT
		}
		
		type AnimalRescue {
			id: ID!
			name: String!
			age: Int!
			gender: String!
			species: String!
			breed: String!
		}
  
		type Query {
			animalRescue(id: ID!): AnimalRescue
			animalRescues: [AnimalRescue]
		}
	`,
	resolvers: {
		Query: {
			animalRescues: (_: any, { id }: any, {}) => {
				return animalRescues;
			},
			animalRescue: (_: any, { id }: any, {}) => {
				return animalRescues.find((animalRescue) => animalRescue.id === id);
			}
		},
	}
});
```

In `data.ts`, we've added a simple type and data source. In `schema.ts`, we've created the executable schema with the GraphQL Yoga `createSchema` function.

Finally, let's modify the existing `worker.ts` file:

```typescript
// worker.ts

import { createYoga } from 'graphql-yoga'
import { schema } from './schema';

// Yoga 
const yoga = createYoga({ schema })

export default {
	// Fetch handler
	async fetch(request: Request, ctx: ExecutionContext): Promise<Response> {
		return yoga(request, ctx);
	},
};
``` 

Here, we're creating our GraphQL Yoga server and adding it to our [fetch handler](https://developers.cloudflare.com/workers/runtime-apis/fetch/). It's amazing how easy it is to get up and running with GraphQL Yoga.

## Step 4: Deployment

Provided you're logged in with [wrangler](https://developers.cloudflare.com/workers/wrangler/), you only need to run the following:

```shell
wrangler publish
```

Our GraphQL Yoga server is now running on Cloudflare Workers. Visit `https://your-worker-name.<your-account>.workers.dev/graphql` and you'll see the [GraphiQL](https://github.com/graphql/graphiql) interface with your schema.

## Conclusion

In this tutorial, we've explored how to build a GraphQL Yoga server with TypeScript and deploy it on Cloudflare Workers. This setup leverages the power of GraphQL and the scalability of serverless computing. I hope you find this tutorial helpful, and I encourage you to delve deeper into these technologies!