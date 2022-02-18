package dev.johnshift.backend.domains.dtos;

import java.util.Date;
import java.util.List;
import lombok.Data;

@Data
public class PostDTO {
	private int id;
	private Date created;
	private String body;
	private String owner;
	private String route;
	private List<Integer> reactionIds;
	private List<Integer> voteIds;
	private List<Integer> commentIds;
}
