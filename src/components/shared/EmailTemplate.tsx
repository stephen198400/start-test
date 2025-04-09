import * as React from 'react';

interface EmailTemplateProps {
	firstName: string;
}

export const EmailTemplate: React.FC<EmailTemplateProps> = ({ firstName }) => (
	<div>
		<h1>欢迎, {firstName}!</h1>
		<p>这是一封通过Resend发送的测试邮件。</p>
	</div>
);
