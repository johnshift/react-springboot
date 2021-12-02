package dev.johnshift.backend.utils;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Random;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import dev.johnshift.backend.constants.Role;
import dev.johnshift.backend.credential.Credential;
import dev.johnshift.backend.session.Session;
import dev.johnshift.backend.session.SessionDTO;
import dev.johnshift.backend.user.UserVeil;
import dev.johnshift.backend.user.UserVeilId;

public class Generator {

	public static SessionDTO sessionDTO() {

		return new SessionDTO(
			UUID.randomUUID().toString(),
			UUID.randomUUID().toString(),
			genString(),
			genStringList());
	}

	public static Session session() {

		Session newSession = new Session();
		newSession.setId(UUID.randomUUID());
		newSession.setCsrfToken(UUID.randomUUID());
		newSession.setPrincipal(genString());
		newSession.setRecentTs(new Date());
		newSession.setAuthorities(genStringList());

		return newSession;
	}

	public static Credential credential() {
		// EasyRandom er = new EasyRandom();
		// Credential credential = er.nextObject(Credential.class);


		Credential newCredential = new Credential();
		newCredential.setId(genLong());
		newCredential.setUsername(genString());
		newCredential.setEmail(genString());
		newCredential.setPassword(genString());

		UserVeil uv = new UserVeil();
		UserVeilId uvId = new UserVeilId();
		uvId.setUserId(genInt());
		uvId.setVeilId(genInt());
		uv.setId(uvId);

		newCredential.setUserVeil(uv);

		return newCredential;
	}

	public static String randomString() {

		return genString();
	}

	public static UUID uuid() {

		return UUID.randomUUID();
	}

	public static SessionDTO pubSessionDTO() {
		String sessionId = uuid().toString();
		String csrfToken = uuid().toString();
		String principal = randomString();
		return new SessionDTO(
			sessionId,
			csrfToken,
			principal,
			Collections.emptyList());
	}

	public static SessionDTO activeSessionDTO() {
		return new SessionDTO(
			UUID.randomUUID().toString(),
			UUID.randomUUID().toString(),
			genString(),
			Role.USER.getAuthoritiesAsString());
	}

	public static SessionDTO promotedSessionDTO(String sessionId, String csrfToken, String principal) {
		return new SessionDTO(
			sessionId, csrfToken, principal,
			Role.USER.getAuthoritiesAsString());
	}

	public static Authentication userPassToken(String principal, String password) {
		return new UsernamePasswordAuthenticationToken(
			principal, password);
	}

	public static Authentication userRoleAuth(String principal, String password) {

		Set<GrantedAuthority> grantedAuthorities = new HashSet<>();
		grantedAuthorities.addAll(Role.USER.getGrantedAuthorities());

		return new UsernamePasswordAuthenticationToken(
			principal, password, grantedAuthorities);
	}

	public static Authentication userWithWritesAuth(String principal, String password, List<String> auths) {

		Set<GrantedAuthority> grantedAuthorities = new HashSet<>();
		grantedAuthorities.addAll(Role.USER.getGrantedAuthorities());
		grantedAuthorities.addAll(
			auths.stream()
				.map(a -> new SimpleGrantedAuthority(a))
				.collect(Collectors.toSet()));

		return new UsernamePasswordAuthenticationToken(
			principal, password, grantedAuthorities);
	}

	public static String genString() {

		int n = 12;

		// chose a Character random from this String
		String AlphaNumericString = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
			+ "0123456789"
			+ "abcdefghijklmnopqrstuvxyz";

		// create StringBuffer size of AlphaNumericString
		StringBuilder sb = new StringBuilder(n);

		for (int i = 0; i < n; i++) {

			// generate a random number between
			// 0 to AlphaNumericString variable length
			int index = (int) (AlphaNumericString.length()
				* Math.random());

			// add Character one by one in end of sb
			sb.append(AlphaNumericString
				.charAt(index));
		}

		return sb.toString();
	}

	private static List<String> genStringList() {

		int numElements = 3;

		List<String> result = new ArrayList<String>();
		for (int i = 0; i < numElements; i++) {
			result.add(genString());
		}

		return result;
	}

	private static Long genLong() {

		return new Random().nextLong();
	}

	private static int genInt() {

		return new Random().nextInt();
	}

}
