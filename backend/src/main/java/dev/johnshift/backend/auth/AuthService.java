package dev.johnshift.backend.auth;

/** AuthService should handle all Authentication and Authorization permissions. */
public interface AuthService {

	/** Checks if principal is authorized to create a post.
	 * <p>
	 * Owner payload should match user.name.
	 * <p>
	 * UserId payload should match user.id
	 * 
	 * @throws {@link AuthException} if not authorized
	 * @return <code>true</code> if has access. <code>false</code> otherwise */
	void authPostCreate(String principal, String owner, int userId);
}
