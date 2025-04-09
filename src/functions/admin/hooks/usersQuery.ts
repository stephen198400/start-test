import { queryOptions } from '@tanstack/react-query';

import { supabaseClient } from '@/lib/supabase';

const getAllUsers = async () => {
	const users = await supabaseClient.from('user').select('*');
	return users;
};

export const usersQuery = () =>
	queryOptions({
		queryKey: ['users'],
		queryFn: () => getAllUsers(),
	});
