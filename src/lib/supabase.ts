import { createClient } from '@supabase/supabase-js';
import { Database } from 'database.types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const service_role_key = import.meta.env.VITE_SUPABASE_SERVER_ROLE_KEY;

// 普通客户端 - 使用匿名密钥
export const supabaseClient = createClient<Database>(supabaseUrl, supabaseKey);

// export function getSupabaseServerClient() {
// 	return createServerClient(supabaseUrl, supabaseKey, {
// 		cookies: {
// 			// @ts-ignore Wait till Supabase overload works
// 			getAll() {
// 				return Object.entries(parseCookies()).map(([name, value]) => ({
// 					name,
// 					value,
// 				}));
// 			},
// 			setAll(cookies) {
// 				cookies.forEach((cookie) => {
// 					setCookie(cookie.name, cookie.value);
// 				});
// 			},
// 		},
// 	});
// }
