import type { INodeProperties } from 'n8n-workflow';
import { eventTypeGetAllDescription } from './getAll';

const showOnlyForEventTypes = {
	resource: ['eventType'],
};

export const eventTypeDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForEventTypes,
		},
		options: [
			{
				name: 'Get Many',
				value: 'getAll',
				action: 'Get many event types',
				description: 'Retrieve the event types bookable on this account',
				routing: {
					request: {
						method: 'GET',
						url: '/event-types',
						// 2024-08-13 returns 404 on this endpoint; 2024-06-14 gives
						// a flat array. Verified against the live API 2026-08-18.
						headers: { 'cal-api-version': '2024-06-14' },
					},
				},
			},
		],
		default: 'getAll',
	},
	...eventTypeGetAllDescription,
];
