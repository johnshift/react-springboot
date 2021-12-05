package dev.johnshift.backend.register;

import java.util.UUID;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.ApplicationListener;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.mail.javamail.MimeMessagePreparator;
import org.springframework.stereotype.Component;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
@RequiredArgsConstructor
public class RegisterListener implements ApplicationListener<RegisterCompleteEvent> {

	private static final String FROM_EMAIL_ADDRESS = "noreply.veils@gmail.com";
	private static final String FROM_EMAIL_PERSONAL = "Veils App";
	private static final String SUBJECT_REGISTER_VERIFICATON = "Veils Verification";
	private static final String VERIFICATION_LINK_LANDING_URL = "https://veils.vercel.app/register/verify";

	private final RegisterService registerService;

	@Qualifier("gmail")
	private final JavaMailSender mailSender;

	@Override
	public void onApplicationEvent(RegisterCompleteEvent event) {

		log.debug("onApplicationEvent called");

		MimeMessagePreparator preparator = mimeMessage -> {
			MimeMessageHelper msg = new MimeMessageHelper(mimeMessage);
			msg.setTo(event.getEmail());
			msg.setFrom(FROM_EMAIL_ADDRESS, FROM_EMAIL_PERSONAL);
			msg.setSubject(SUBJECT_REGISTER_VERIFICATON);

			boolean htmlBody = true;
			UUID token = UUID.randomUUID();

			// save token to db
			registerService.saveVerificationToken(token, event.getCredentialId());

			String htmlText = String.format(
				"<h1>Hello %s!</h1><br/><h2>Welcome to Veils!</h2><br/><p>To complete the verification process, please proceed to <a href='%s?token=%s'><b>this link</b></a>.</p>",
				event.getName(), VERIFICATION_LINK_LANDING_URL, token.toString());

			msg.setText(htmlText, htmlBody);
		};

		mailSender.send(preparator);
		log.info("Email was sent to '{}'.", event.getEmail());

	}

}
