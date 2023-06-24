import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

import { prisma } from "~/server/db";

export const exampleRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.example.findMany();
  }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),

  getUsersDiet: protectedProcedure.query(async ({ ctx }) => {
    return ctx.prisma.diet.findFirst({
      where: {
        userId: ctx.session.user.id,
      },
      include: {
        meals: {
          include: {
            ingredients: true,
          },
        },
      },
    });
  }),

  getResponseFromOpenAi: protectedProcedure
    .input(
      z.object({
        gender: z.string(),
        age: z.string(),
        weight: z.string(),
        goal: z.string(),
        products: z.string(),
        activity: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const diet = await ctx.prisma.diet.findFirst({
        where: {
          userId: ctx.session.user.id,
        },
      });

      if (diet) {
        await ctx.prisma.diet.delete({
          where: {
            userId: ctx.session.user.id,
          },
        });
      }

      return prisma.diet.create({
        data: {
          calories: 1700,
          meals: {
            create: [
              {
                name: "Breakfast",
                calories: 450,
                ingredients: {
                  create: [
                    {
                      name: "1 cup of oatmeal cooked with water or low-fat milk",
                    },
                    {
                      name: "1 medium-sized chicken breast (grilled or baked)",
                    },
                    { name: "1 small carrot (sliced or grated)" },
                    { name: "1 small tomato (sliced)" },
                    {
                      name: "A cup of green tea or black coffee (without sugar)",
                    },
                  ],
                },
              },
              {
                name: "Lunch",
                calories: 500,
                ingredients: {
                  create: [
                    {
                      name: "1 serving of grilled chicken breast (approximately 150g)",
                    },
                    {
                      name: "1 cup of steamed vegetables (include carrots and tomatoes)",
                    },
                    { name: "1 small boiled potato (optional)" },
                    {
                      name: "A mixed green salad with a light dressing (avoid creamy dressings)",
                    },
                  ],
                },
              },
              {
                name: "Snack",
                calories: 150,
                ingredients: {
                  create: [
                    { name: "1 small plain Greek yogurt" },
                    { name: "1 tablespoon of chia seeds" },
                  ],
                },
              },
              {
                name: "Dinner",
                calories: 600,
                ingredients: {
                  create: [
                    {
                      name: "1 serving of grilled chicken breast or baked chicken thighs (approximately 150g)",
                    },
                    {
                      name: "1 cup of mixed vegetables (include carrots and tomatoes)",
                    },
                    { name: "1/2 cup of cooked brown rice or quinoa" },
                    {
                      name: "A mixed green salad with a light dressing (avoid creamy dressings)",
                    },
                  ],
                },
              },
            ],
          },
          userId: ctx.session.user.id,
        },
      });
    }),
});
