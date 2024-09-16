'use client'

import { useState } from 'react'

import { PersonIcon, TokensIcon } from '@radix-ui/react-icons'
import type { Session } from 'next-auth'
import type { Form } from '@prisma/client'
import { signOut } from 'next-auth/react'
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar'
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator
} from '~/components/ui/breadcrumb'
import { Button } from '~/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from '~/components/ui/dropdown-menu'
import { Separator } from '~/components/ui/separator'
import { Tabs, TabsList, TabsTrigger } from '~/components/ui/tabs'
import { useRouter } from 'next/navigation'
import type { UseFormReturn } from 'react-hook-form'

export default function Header({ session, form }: { session: Session; form: UseFormReturn<Form> }) {
	const router = useRouter()
	const [tab, setTab] = useState<'create' | 'share' | 'connect'>('create')

	const { getValues } = form
	const formValues = getValues()

	const handleLogout = async () => {
		await signOut()
		router.refresh()
	}

	return (
		<header className="flex w-full select-none items-center justify-between text-sm">
			<Breadcrumb className="my-3.5 font-medium">
				<BreadcrumbList>
					<BreadcrumbItem>
						<BreadcrumbLink href="/" className="flex items-center gap-1.5">
							<TokensIcon className="h-4 w-4" /> Home
						</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator />
					<BreadcrumbItem>
						<BreadcrumbLink href="/form">Form</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator />
					<BreadcrumbPage>{formValues.name}</BreadcrumbPage>
				</BreadcrumbList>
			</Breadcrumb>
			<Tabs value={tab} onValueChange={(value) => setTab(value as 'create' | 'share' | 'connect')}>
				<TabsList defaultValue="create">
					<TabsTrigger value="create">Create</TabsTrigger>
					<TabsTrigger value="share">Share</TabsTrigger>
					<TabsTrigger value="connect">Connect</TabsTrigger>
				</TabsList>
			</Tabs>
			<div className="flex items-center gap-3 mx-3">
				<Button size="sm">Publish</Button>
				<Button variant="secondary" size="sm">
					Save Draft
				</Button>
				<Separator orientation="vertical" className="h-4" />
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" className="relative h-8 w-8 rounded-full">
							<Avatar className="h-8 w-8">
								<AvatarImage src={session.user.image ?? undefined} alt={`@${session.user.name ?? 'username'}`} />
								<AvatarFallback>
									<PersonIcon />
								</AvatarFallback>
							</Avatar>
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent className="w-56" align="end" forceMount>
						<DropdownMenuLabel className="font-normal">
							<div className="flex flex-col space-y-1">
								<p className="text-sm font-medium leading-none">{session.user.name}</p>
								<p className="text-xs leading-none text-muted-foreground">{session.user.email}</p>
							</div>
						</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuGroup>
							<DropdownMenuItem>Profile</DropdownMenuItem>
							<DropdownMenuItem>Settings</DropdownMenuItem>
						</DropdownMenuGroup>
						<DropdownMenuSeparator />
						<DropdownMenuItem onClick={handleLogout}>Log out</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</header>
	)
}
