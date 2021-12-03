package dev.johnshift.backend.post;

import java.util.Date;
import lombok.Data;

@Data
public class PostDTO {

	private final int id;
	private final int userId;
	private final String owner;
	private final Date created;
	private final String body;
	private final int votes;

	public static PostDTO of(Post post) {

		return new PostDTO(
			post.getId(),
			post.getUserId(),
			post.getOwner(),
			post.getCreated(),
			post.getBody(),
			post.getVotes());
	}

	public static PostDTO of(PostCreateRequest reqPost) {
		return new PostDTO(
			-1,
			reqPost.getUserId(),
			reqPost.getOwner(),
			new Date(),
			reqPost.getBody(),
			0);
	}
}
