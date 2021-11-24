package dev.johnshift.backend.auth;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

import static org.springframework.web.util.WebUtils.getCookie;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class AuthController {

    public static final String CSRF_HEADER_KEY = "x-veils-csrf-token";
    public static final String SESSION_COOKIE_NAME = "X-VEILS-SESSION";
    public static final String SESSION_COOKIE_NAME_PUBLIC = "X-VEILS-SESSION-PUB";

    private final AuthService authService;

    @GetMapping("/expired-sessions")
    public List<AuthSessionEntity> getExpiredSessions() {

        return authService.getExpiredSessions();
    }

    @GetMapping("/csrf-token")
    public AuthCsrfDTO getCsrfToken(HttpServletRequest request, HttpServletResponse response) {

        // todo: if already logged in, return csrf token from session in db
        // todo: if not logged in, create pub session, store in cookie and return token

        // check if already has session cookie, also if session in db, then return csrf token
        Cookie sessionCookie = getCookie(request, SESSION_COOKIE_NAME);
        if (sessionCookie != null) {
            String sessionId = sessionCookie.getValue();
            AuthSessionDTO session = authService.getSessionBySessionId(sessionId);
            if (session != null) {
               return new AuthCsrfDTO(session.getCsrfToken());
            }

        }

        // check if already has public session, also if session in db, then return csrf token
        Cookie sessionCookiePub = getCookie(request, SESSION_COOKIE_NAME_PUBLIC);
        if (sessionCookiePub != null) {
            String sessionId = sessionCookiePub.getValue();
            AuthSessionDTO session = authService.getSessionBySessionId(sessionId);
            if (session != null) {
                return new AuthCsrfDTO(session.getCsrfToken());
            }
        }

        // if no actie session, create pub session
        AuthSessionDTO sessionDTO = authService.createSession();
        Cookie pubSessionCookie = new Cookie(SESSION_COOKIE_NAME_PUBLIC, sessionDTO.getSessionId());
        pubSessionCookie.setMaxAge(60 * 60); // expire 1 hour
        pubSessionCookie.setHttpOnly(true); // unreadable in JS
        response.addCookie(pubSessionCookie);
        return AuthCsrfDTO.of(sessionDTO);
    }

    @GetMapping("/public")
    public String getPublic() {
        return "Welcome to public page";
    }

    @GetMapping("/protected")
    public String getIndex() {
        return "Welcome to protected page";
    }

}
