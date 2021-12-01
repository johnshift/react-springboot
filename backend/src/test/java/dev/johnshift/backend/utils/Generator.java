package dev.johnshift.backend.utils;

import java.util.UUID;
import org.jeasy.random.EasyRandom;
import org.jeasy.random.EasyRandomParameters;
import dev.johnshift.backend.credential.Credential;
import dev.johnshift.backend.session.Session;
import dev.johnshift.backend.session.SessionDTO;

public class Generator {

	public static SessionDTO sessionDTO() {
		return (new EasyRandom()).nextObject(SessionDTO.class);
	}

	public static Session session() {
		EasyRandom er = new EasyRandom();
		return er.nextObject(Session.class);
	}

	public static Credential credential() {
		EasyRandom er = new EasyRandom();
		Credential credential = er.nextObject(Credential.class);
		return credential;
	}

	public static String randomString() {

		EasyRandomParameters params = new EasyRandomParameters()
			.seed((long) Math.random())
			.stringLengthRange(8, 64);

		EasyRandom er = new EasyRandom(params);
		return er.nextObject(String.class);
	}

	public static UUID uuid() {

		return UUID.randomUUID();
	}

}
