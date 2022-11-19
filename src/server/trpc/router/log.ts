import { z } from 'zod';
import { router, publicProcedure, protectedProcedure } from '../trpc';
import { Prisma } from '@prisma/client';

const defaultLogSelect = Prisma.validator<Prisma.LogSelect>()({
  id: true,
  createdAt: true,
  updatedAt: true,
  exercise: true,
  user: true
});

interface LogInput {
  exerciseId: string;
  userId: string;
  [key: string]: any;
}

export const logRouter = router({
  insertOne: protectedProcedure
    .input(
      z.object({
        exerciseId: z.string(),
        userId: z.string(),
        weight: z.number().optional(),
        completePec: z.number().optional(),
        level: z.number().optional(),
        comment: z.string().optional()
      })
    )
    .mutation(({ ctx, input }) => {
      const data: LogInput = {
        exerciseId: input.exerciseId,
        userId: input.userId
      };

      if (input.weight) {
        data['weight'] = input.weight;
      }
      if (input.completePec) {
        data['completePec'] = input.completePec;
      }
      if (input.level) {
        data['level'] = input.level;
      }
      if (input.comment) {
        data['comment'] = input.comment;
      }

      console.log('Data in router', data);

      const log = ctx.prisma.log.create({
        data: data
      });

      return log;
    }),
  getById: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.prisma.log.findFirst({
      where: {
        id: input
      },
      include: {
        user: true
      }
    });
  }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.log.findMany({
      select: defaultLogSelect,
      where: {},
      orderBy: {
        createdAt: 'desc'
      }
    });
  })
});
