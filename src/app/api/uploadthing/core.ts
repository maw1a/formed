/* eslint-disable @typescript-eslint/only-throw-error */
import { createUploadthing, type FileRouter } from 'uploadthing/next'
import { UploadThingError } from 'uploadthing/server'
import { getServerAuthSession } from '~/server/auth'

const f = createUploadthing()

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
	// Define as many FileRoutes as you like, each with a unique routeSlug
	fileUpload: f({})
		// Set permissions and file types for this FileRoute
		.middleware(async ({ req }) => {
			// This code runs on your server before upload
			const session = await getServerAuthSession()

			// If you throw, the user will not be able to upload
			if (!session) throw new UploadThingError('Unauthorized')

			// Whatever is returned here is accessible in onUploadComplete as `metadata`
			return { session }
		})
		.onUploadComplete(async ({ metadata, file }) => {
			// This code RUNS ON YOUR SERVER after upload
			console.log('Upload complete for userId:', metadata.session.user.id)

			console.log('file url', file.url)

			// !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
			return { uploadedBy: metadata.session.user.id }
		})
} satisfies FileRouter

export type OurFileRouter = typeof ourFileRouter
