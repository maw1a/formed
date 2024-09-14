import { z } from 'zod'
import { QuestionTypes } from '~/components/editor/questions/types'

import { createTRPCRouter, protectedProcedure, publicProcedure } from '~/server/api/trpc'

export const formRouter = createTRPCRouter({
	create: protectedProcedure
		.input(
			z
				.object({
					name: z.string(),
					title: z.string(),
					description: z.string(),
					questions: z.array(z.object({}))
				})
				.optional()
		)
		.mutation(async ({ ctx, input }) => {
			if (!ctx.session.user.email) throw new Error('no user session found')

			return ctx.db.form.create({
				data: {
					name: input?.name ?? 'My New Form',
					title: input?.title ?? 'Untitled',
					description: input?.description,
					questions: input?.questions ?? [
						{ type: QuestionTypes.ShortText, question: '...', placeholder: 'Type your answer here...' }
					],
					user: { connect: { email: ctx.session.user.email } }
				}
			})
		}),
	getForm: protectedProcedure.input(z.object({ id: z.string() })).query(({ ctx, input }) => {
		return ctx.db.form.findFirst({ where: { id: input.id } })
	})
})
