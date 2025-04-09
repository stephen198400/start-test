import { queryOptions } from '@tanstack/react-query';

import { supabaseClient } from '@/lib/supabase';

const getLeadsSP = async () => {
	const { data, error } = await supabaseClient
		.from('cecila123_submissions')
		.select('*');

	if (error) throw error;
	return data;
};

export const leadsQuery = () =>
	queryOptions({
		queryKey: ['leads'],
		queryFn: getLeadsSP,
	});
