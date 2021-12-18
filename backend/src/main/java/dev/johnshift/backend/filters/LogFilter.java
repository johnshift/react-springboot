package dev.johnshift.backend.filters;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.util.ContentCachingRequestWrapper;
import org.springframework.web.util.ContentCachingResponseWrapper;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public class LogFilter extends OncePerRequestFilter {

	private int maxPayloadLength = 1000;

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
		throws ServletException, IOException {

		long startTime = System.currentTimeMillis();
		StringBuilder msg = new StringBuilder()
			.append("method=")
			.append(request.getMethod())
			.append(", path=\"")
			.append(request.getRequestURI());

		String queryString = request.getQueryString();
		if (queryString != null) {
			msg.append("?").append(queryString);
		}
		msg.append("\"");

		if (request.getAuthType() != null) {
			msg.append(", authType=")
				.append(request.getAuthType());
		}
		if (request.getUserPrincipal() != null) {
			msg.append(", principal=")
				.append(request.getUserPrincipal().getName());
		}

		// this.logger.debug("=> " + msg);

		ContentCachingRequestWrapper wrappedRequest = new ContentCachingRequestWrapper(request);
		ContentCachingResponseWrapper wrappedResponse = new ContentCachingResponseWrapper(response);

		// ======== Perform the actual request ========
		filterChain.doFilter(wrappedRequest, wrappedResponse);

		// Log request body
		String requestBody = this.getContentAsString(
			wrappedRequest.getContentAsByteArray(),
			request.getCharacterEncoding());

		byte[] responseBuf = wrappedResponse.getContentAsByteArray();

		wrappedResponse.copyBodyToResponse(); // IMPORTANT: copy content of response back into original response

		// Record duration
		long duration = System.currentTimeMillis() - startTime;

		msg.append(", status=");
		msg.append(response.getStatus());
		msg.append(", duration=");
		msg.append(duration);
		msg.append("ms");

		// // request session-id
		// Cookie sessionCookie = getCookie(request, SESSION_COOKIE_NAME);
		// msg.append(", req-session-id=");
		// if (sessionCookie != null) {
		// msg.append(sessionCookie.getValue());
		// } else {
		// msg.append(request.getAttribute(SESSION_COOKIE_NAME));
		// }

		// // request csrf-token
		// String reqCsrfToken = request.getHeader(SESSION_CSRF_HEADER_KEY);
		// msg.append(", req-csrf-token=");
		// if (reqCsrfToken != null) {
		// msg.append(reqCsrfToken);
		// } else {
		// msg.append(request.getAttribute(SESSION_CSRF_HEADER_KEY));
		// }


		if (requestBody.length() > 0) {
			msg.append(", request='" + requestBody + "'");
		}

		if (responseBuf.length != 0) {
			msg.append(", response='"
				+ getContentAsString(responseBuf, response.getCharacterEncoding()) + "'");
		}

		msg.append("\n\n");
		log.debug(msg.toString());
	}

	private String getContentAsString(byte[] buf, String charsetName) {
		if (buf == null || buf.length == 0)
			return "";
		int length = Math.min(buf.length, this.maxPayloadLength);
		try {
			return new String(buf, 0, length, charsetName);
		} catch (UnsupportedEncodingException ex) {
			return "Unsupported Encoding";
		}
	}

}
