import React from 'react'

export default function If({ _, _then, _else }: { _: boolean; _then: React.ReactNode; _else?: React.ReactNode }) {
	return <>{!!_ ? _then : _else}</>
}
