import type {
	IAuthenticateGeneric,
	Icon,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class CalComApi implements ICredentialType {
	name = 'calComApi';

	displayName = 'Cal.com API';

	icon: Icon = { light: 'file:calcom.svg', dark: 'file:calcom.dark.svg' };

	documentationUrl = 'https://github.com/trendai-au/n8n-nodes-calcom?tab=readme-ov-file#credentials';

	properties: INodeProperties[] = [
		{
			displayName: 'Base URL',
			name: 'baseUrl',
			type: 'string',
			required: true,
			default: 'https://api.cal.com/v2',
			description:
				'Cal.com API base URL. Leave as-is for Cal.com cloud. For a self-hosted instance use https://your-cal-domain/api/v2.',
		},
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true },
			required: true,
			default: '',
			description:
				'Cal.com API key. Create one under Settings → Developer → API keys. Keys are prefixed cal_live_ (or cal_test_ for sandbox).',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				Authorization: '=Bearer {{$credentials.apiKey}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: '={{$credentials.baseUrl}}',
			url: '/me',
		},
	};
}
