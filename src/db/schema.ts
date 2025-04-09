import {
	boolean,
	pgEnum,
	pgTable,
	text,
	timestamp,
	uuid,
} from 'drizzle-orm/pg-core';

/* --------------------------------------------------------------------- auth --------------------------------------------------------------------- */
export const user = pgTable('user', {
	id: text('id').primaryKey(),
	name: text('name').notNull(),
	email: text('email').notNull().unique(),
	emailVerified: boolean('email_verified').notNull(),
	image: text('image'),
	createdAt: timestamp('created_at').notNull(),
	updatedAt: timestamp('updated_at').notNull(),
	role: text('role').notNull(),
	status: text('status').notNull(),
});

export const session = pgTable('session', {
	id: text('id').primaryKey(),
	expiresAt: timestamp('expires_at').notNull(),
	token: text('token').notNull().unique(),
	createdAt: timestamp('created_at').notNull(),
	updatedAt: timestamp('updated_at').notNull(),
	ipAddress: text('ip_address'),
	userAgent: text('user_agent'),
	userId: text('user_id')
		.notNull()
		.references(() => user.id, { onDelete: 'cascade' }),
});

export const account = pgTable('account', {
	id: text('id').primaryKey(),
	accountId: text('account_id').notNull(),
	providerId: text('provider_id').notNull(),
	userId: text('user_id')
		.notNull()
		.references(() => user.id, { onDelete: 'cascade' }),
	accessToken: text('access_token'),
	refreshToken: text('refresh_token'),
	idToken: text('id_token'),
	accessTokenExpiresAt: timestamp('access_token_expires_at'),
	refreshTokenExpiresAt: timestamp('refresh_token_expires_at'),
	scope: text('scope'),
	password: text('password'),
	createdAt: timestamp('created_at').notNull(),
	updatedAt: timestamp('updated_at').notNull(),
});

export const verification = pgTable('verification', {
	id: text('id').primaryKey(),
	identifier: text('identifier').notNull(),
	value: text('value').notNull(),
	expiresAt: timestamp('expires_at').notNull(),
	createdAt: timestamp('created_at'),
	updatedAt: timestamp('updated_at'),
});

export const allowedEmails = pgTable('allowed_emails', {
	id: uuid('id').primaryKey().defaultRandom(),
	email: text('email').notNull().unique(),
	role: text('role').notNull().default('user'),
	isActive: boolean('is_active').notNull().default(true),
	createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
	updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});

// 定义角色枚举
export type Role = 'admin' | 'boss' | 'manager' | 'designer' | 'applicant';
export const roleEnum = pgEnum('role', [
	'admin',
	'boss',
	'manager',
	'designer',
	'applicant',
]);

// 路由访问表 - 只存储权限信息，不存储完整路由配置
export const routeAccess = pgTable('route_access', {
	id: text('id').primaryKey(),
	routeId: text('route_id').notNull(), // 对应应用中定义的路由ID
	userId: text('user_id')
		.notNull()
		.references(() => user.id, { onDelete: 'cascade' }),
	role: roleEnum('role').default('designer'),
	createdAt: timestamp('created_at').notNull().defaultNow(),
	updatedAt: timestamp('updated_at').notNull().defaultNow(),
	createdBy: text('created_by').references(() => user.id),
});

/* ----------------------------------------------------------------- cecila123 submissions ----------------------------------------------------------------- */
export const cecila123Submissions = pgTable('cecila123_submissions', {
	id: uuid('id').primaryKey().defaultRandom(),
	email: text('email').notNull(),
	phone: text('phone').notNull(),
	service: text('service').notNull(),
	message: text('message'),
	quote: text('quote'),
	zipCode: text('zip_code').notNull(),
	utmSource: text('utm_source'),
	utmMedium: text('utm_medium'),
	utmCampaign: text('utm_campaign'),
	utmContent: text('utm_content'),
	ipAddress: text('ip_address'),
	userAgent: text('user_agent'),
	formSource: text('form_source'),
	submissionDate: timestamp('submission_date', {
		withTimezone: true,
	}).defaultNow(),
	status: text('status').notNull().default('pending'),
	followedBy: text('followed_by'),
	followedDate: timestamp('followed_date', { withTimezone: true }),
	createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
	updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});

export const cecilia123Updates = pgTable('cecilia123_updates', {
	id: uuid('id').primaryKey().defaultRandom(),
	submissionId: uuid('submission_id')
		.notNull()
		.references(() => cecila123Submissions.id, { onDelete: 'cascade' }),
	content: text('content').notNull(),
	updatedBy: text('updated_by').references(() => user.id),
	createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
	updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});

/* ----------------------------------------------------------------- export types ----------------------------------------------------------------- */
export type User = typeof user.$inferSelect;
export type NewUser = typeof user.$inferInsert;

export type Session = typeof session.$inferSelect;
export type NewSession = typeof session.$inferInsert;

export type Account = typeof account.$inferSelect;
export type NewAccount = typeof account.$inferInsert;

export type Verification = typeof verification.$inferSelect;
export type NewVerification = typeof verification.$inferInsert;

export type AllowedEmail = typeof allowedEmails.$inferSelect;
export type NewAllowedEmail = typeof allowedEmails.$inferInsert;

export type Cecila123Submission = typeof cecila123Submissions.$inferSelect;
export type NewCecila123Submission = typeof cecila123Submissions.$inferInsert;

export type Cecila123Update = typeof cecilia123Updates.$inferSelect;
export type NewCecila123Update = typeof cecilia123Updates.$inferInsert;
