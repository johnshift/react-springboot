package dev.johnshift.backend.security.filters;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.util.ContentCachingRequestWrapper;
import org.springframework.web.util.ContentCachingResponseWrapper;

// https://stackoverflow.com/a/42023374
public class LoggingFilter extends OncePerRequestFilter {

	private boolean includeResponsePayload = true;
	private int maxPayloadLength = 1000;

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

	/** Log each request and respponse with full Request URI, content payload and duration of the
	 * request in ms.
	 * 
	 * @param request the request
	 * @param response the response
	 * @param filterChain chain of filters
	 * @throws ServletException
	 * @throws IOException */
	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
		throws ServletException, IOException {

		long startTime = System.currentTimeMillis();

		// ========= Log request and response payload ("body") ========
		// We CANNOT simply read the request payload here, because then the InputStream would be consumed
		// and cannot be read again by the actual processing/server.
		// String reqBody = DoogiesUtil._stream2String(request.getInputStream()); // THIS WOULD NOT WORK!
		// So we need to apply some stronger magic here :-)
		ContentCachingRequestWrapper wrappedRequest = new ContentCachingRequestWrapper(request);
		ContentCachingResponseWrapper wrappedResponse = new ContentCachingResponseWrapper(response);

		filterChain.doFilter(wrappedRequest, wrappedResponse); // ======== This performs the actual request!
		long duration = System.currentTimeMillis() - startTime;

		// I can only log the request's body AFTER the request has been made and
		// ContentCachingRequestWrapper did its work.
		String requestBody = this.getContentAsString(
			wrappedRequest.getContentAsByteArray(), request.getCharacterEncoding());

		StringBuilder log = new StringBuilder()
			.append("\n   [ ")
			.append(response.getStatus())
			.append(" ] ")
			.append(request.getMethod())
			.append(" \"")
			.append(request.getRequestURI())
			.append("\" | ")
			.append(duration)
			.append("ms   ");

		if (requestBody.length() > 0) {
			log.append("\n\trequest = \"")
				.append(requestBody)
				.append("\"  ");
		}

		if (includeResponsePayload) {
			byte[] buf = wrappedResponse.getContentAsByteArray();
			log.append("\n\tresponse: ")
				.append(getContentAsString(buf, response.getCharacterEncoding()))
				.append("\n");
		}

		System.out.println(log);

		wrappedResponse.copyBodyToResponse(); // IMPORTANT: copy content of response back into original response

	}


}
