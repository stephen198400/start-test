import { supabaseClient } from '@/lib/supabase';
import { queryOptions } from '@tanstack/react-query';

const getAllowedEmails = async () => {
	const emails = await supabaseClient.from('allowed_emails').select('*');
	return emails;
};

export const allowedQuery = () =>
	queryOptions({
		queryKey: ['allowed_emails'],
		queryFn: () => getAllowedEmails(),
	});
